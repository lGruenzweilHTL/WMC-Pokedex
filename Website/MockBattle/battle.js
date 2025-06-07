class GameAction {
    constructor(type, object) {
        this.actionType = type; // e.g. "attack", "bag", "pokemon", "run"
        this.object = object; // e.g. move, item, pokemon
    }
}
class Pokemon {
    constructor(name, id, level, moves, currentHp, maxHp, statusEffects) {
        this.name = name;
        this.id = id;
        this.moves = moves;
        this.level = level;
        this.hp = currentHp;
        this.maxHp = maxHp;
        this.statusEffects = statusEffects;
    }
}

const defaultNavTip = "Navigate using arrows key or wasd\nSelect with enter or spacebar\nPress escape to cancel";
const url = 'http://localhost:5052/battle/start/bot';
let battleGuid = null;
let websocketUrl = null;
let socket = null;
let connectionClosed = false;

let playerActivePokemon = new Pokemon("Charizard", 6, 50, ["Flamethrower"], 150, 150, []);
let opponentActivePokemon = new Pokemon("Blastoise", 9, 50, ["Flamethrower"], 150, 150, []);
let playerSwitches;
let playerItems;
let gameState = "NotStarted";

// TODO: Get JSON from pokemon select page
const battleData = {
    "player": {
        "name": "Player1",
        "pokemon": [
            {
                "name": "Charizard",
                "level": 50,
                "moves": [
                    "Flamethrower", "Dragon Claw", "Air Slash", "Fire Blast"
                ]
            }
        ]
    },
    "bot": {
        "name": "Bot1",
        "behaviour": "max",
        "pokemon": [
            {
                "name": "Gengar",
                "level": 50,
                "moves": [
                    "Shadow Ball", "Sludge Bomb", "Dark Pulse", "Destiny Bond"
                ]
            }
        ]
    }
};

document.addEventListener("DOMContentLoaded", async () => {
    await createBattle();
    await connectWebSocket();

    await pushMessage("The battle begins!\n\n(Press spacebar or enter to continue)");

    gameState = "InProgress";

    await gameLoop();
});

async function createBattle() {
    try {
        const response = await fetch(url, {
            method: 'POST',
            body: JSON.stringify(battleData),
            headers: {
                'Content-Type': 'application/json'
            },
        });
        const json = await response.json();
        console.log("Successfully created battle");
        websocketUrl = json["websocket_url"];
        battleGuid = json.battle_guid;
    }
    catch(e) {
        console.error('Error:', e);
    }
}

async function connectWebSocket() {
    await new Promise(resolve => {
        socket = new WebSocket(websocketUrl);

        socket.onopen = () => {
            console.log('WebSocket connection established');
            resolve();
        };

        socket.onmessage = (event) => {
            const message = JSON.parse(event.data);
            console.log('Received message', message);
            processMessage(message);
        };

        socket.onerror = (error) => {
            console.error('WebSocket error:', error);
        };

        socket.onclose = () => {
            console.log('WebSocket connection closed');
            connectionClosed = true;
        };
    });
}

function sendMessage(actionType, actionObject) {
    const message = {
        "type": actionType,
        "object": actionObject,
        "battle_guid": battleGuid
    };
    socket.send(JSON.stringify(message));
}

async function processMessage(message) {
    const json = JSON.parse(message);
    const messages = json["messages"];
    const player1 = json["player1"];
    const player2 = json["player2"];
    const state = json["game_state"];

    console.log(json);

    gameState = state;
    if (gameState !== "InProgress") endGame();

    playerSwitches = player1["switches"];
    playerItems = player1["items"];

    // Update player and opponent active Pokémon
    playerActivePokemon = new Pokemon(
        player1.pokemon.name,
        player1.pokemon.id,
        player1.pokemon.level,
        player1.pokemon.moves,
        player1.pokemon["current_hp"],
        player1.pokemon["max_hp"],
        player1.pokemon["effects"]);
    opponentActivePokemon = new Pokemon(
        player2.pokemon.name,
        player2.pokemon.id,
        player2.pokemon.level,
        player2.pokemon.moves,
        player2.pokemon["current_hp"],
        player2.pokemon["max_hp"],
        player2.pokemon["effects"]);

    for (const msg of messages) {
        await pushMessage(msg);
    }

    updateDisplay();
}

async function gameLoop() {
    while (!connectionClosed && gameState === "InProgress") {
        displayMessage(`What will ${playerActivePokemon.name.toUpperCase()} do?\n\n${defaultNavTip}`);

        // Let player select an action
        const playerAction = await waitForPlayerAction();
        if (playerAction.actionType === "run") {
            await pushMessage("You ran away from the battle!");
            document.location.href = "../mockbattle.html"; // Redirect to battle page
        }

        sendMessage(playerAction.actionType, playerAction.object);
    }
    endGame();
}

function endGame() {
    hideAll();
    // TODO: win or lose screen
}

async function waitForPlayerAction() {
    showPlayerActionSelect();
    focusFirstElement();

    return new Promise((resolve) => {
        function handleAction(action) {
            // Remove all event listeners
            runButton.removeEventListener("click", runHandler);
            Array.from(itemButtons).forEach((button, idx) => {
                button.removeEventListener("click", itemHandlers[idx]);
            });
            Array.from(pokemonButtons).forEach((button, idx) => {
                button.removeEventListener("click", pokemonHandlers[idx]);
            });
            Array.from(moveButtons).forEach((button, idx) => {
                button.removeEventListener("click", moveHandlers[idx]);
            });

            resolve(action);
        }

        document.addEventListener("keydown", (event) => {
            if (event.key === "Escape") {
                hideTooltip();
                showPlayerActionSelect();
                displayMessage(`What will ${playerActivePokemon.name.toUpperCase()} do?\n\n${defaultNavTip}`);
            }
        });

        const runButton = document.getElementById("run-button");
        const runHandler = () => handleAction(runClicked());
        runButton.addEventListener("click", runHandler, {once: true});

        const itemButtons = document.getElementsByClassName("item-button");
        const itemHandlers = Array.from(itemButtons).map((button, idx) => {
            const handler = () => handleAction(itemSelected(idx));
            button.addEventListener("click", handler, {once: true});
            return handler;
        });

        const pokemonButtons = document.getElementsByClassName("pokemon-button");
        const pokemonHandlers = Array.from(pokemonButtons).map((button, idx) => {
            const handler = () => handleAction(pokemonSelected(idx));
            button.addEventListener("click", handler, {once: true});
            return handler;
        });

        const moveButtons = document.getElementsByClassName("move-button");
        const moveHandlers = Array.from(moveButtons).map((button, idx) => {
            const handler = () => handleAction(moveSelected(idx));
            button.addEventListener("click", handler, {once: true});
            return handler;
        });
    });
}

// Called by button
function attackClicked() {
    displayMessage(`Which move will ${playerActivePokemon.name.toUpperCase()} use?\n\n${defaultNavTip}`);
    showPlayerMoveSelect();

    // Populate move buttons with the player's moves
    const buttons = document.getElementsByClassName("move-button");
    Array.from(buttons).forEach((button, idx) => {
        button.innerText = (playerActivePokemon.moves[idx] || "").toUpperCase();
    });
    highlightMoveButtons(playerActivePokemon.moves, buttons);
    updateMoveTooltipData(playerActivePokemon.moves, buttons);
    buttons[0].focus();
}

function moveSelected(idx) {
    hidePlayerMoveSelect();
    return new GameAction("attack", playerActivePokemon.moves[idx]);
}

function runClicked() {
    hidePlayerActionSelect();
    return new GameAction("run", null);
}

// Called by button
function bagClicked() {
    displayMessage(`Which item will you use?\n\n${defaultNavTip}`);
    if (playerItems.length === 0) {
        return; // Can't use items if there are none
    }

    showPlayerItemSelect();
    populateButtonList(playerItems.map(i => (name = i)), "item-button");
}

function itemSelected(idx) {
    hidePlayerItemSelect();
    return new GameAction("bag", playerItems[idx]);
}

// Called by button
function pokemonClicked() {
    displayMessage(`Which Pokémon will you switch to?\n\n${defaultNavTip}`);
    if (playerSwitches.length <= 1) {
        return; // Can't switch pokemon if there's only 1 left
    }

    showPlayerPokemonSelect();

    // Populate pokemon buttons with the player's pokemon
    populateButtonList(playerSwitches.map(s => (name = s)), "pokemon-button");
}

function highlightMoveButtons(moves, buttons) {
    for (let i = 0; i < moves.length; i++) {
        const moveClasses = Array.from(buttons[i].classList).filter(entry => entry.startsWith("move-") && !entry.startsWith("move-button"));
        if (moveClasses && moveClasses.length > 0) {
            buttons[i].classList.remove(moveClasses[0]);
        }
        buttons[i].classList.add(`move-${moves[i].type}`);
    }
}
function updateMoveTooltipData(moves, buttons) {
    for (let i = 0; i < moves.length; i++) {
        buttons[i].setAttribute("data-title", (moves[i].name || "").toUpperCase());
        buttons[i].setAttribute("data-description", moves[i].description);
    }
}

// List must be an array of objects with 'name' and optionally 'description' properties
function populateButtonList(list, buttonClass) {
    const buttons = document.getElementsByClassName(buttonClass);
    for (let i = 0; i < list.length && i < buttons.length; i++) {
        buttons[i].style.display = "block";
        buttons[i].innerText = list[i].name.toUpperCase();

        // Tooltip data
        buttons[i].setAttribute("data-title", list[i].name.toUpperCase());
        buttons[i].setAttribute("data-description", list[i].description || "No description available");
    }

    buttons[0].focus();

    // Hide all unused buttons
    for (let i = list.length; i < buttons.length; i++) {
        buttons[i].style.display = "none";
    }
}

function pokemonSelected(idx) {
    hidePlayerPokemonSelect();
    return new GameAction("switch", filterPlayerPokemon()[idx]);
}