class GameAction {
    constructor(type, object) {
        this.actionType = type; // e.g. "attack", "bag", "pokemon", "run"
        this.object = object; // e.g. move, item, pokemon
    }
}
class Pokemon {
    constructor(name, id, moves) {
        this.name = name;
        this.id = id;
        this.moves = moves;
    }
}

const defaultNavTip = "Navigate using arrows key or wasd\nSelect with enter or spacebar\nPress escape to cancel";
const url = 'http://localhost:5052/battle/start/bot';
let battleGuid = null;
let websocketUrl = null;
let socket = null;
let connectionClosed = false;

let playerActivePokemon = new Pokemon("Charizard", 6, ["Flamethrower"]);

const battleData = {
    "player": {
        "name": "Player1",
        "pokemon": [
            {
                "name": "Charizard",
                "level": 50,
                "moves": [
                    "Flamethrower"
                ]
            }
        ]
    },
    "bot": {
        "name": "Bot1",
        "behaviour": "max",
        "pokemon": [
            {
                "name": "Blastoise",
                "level": 50,
                "moves": [
                    "Flamethrower"
                ]
            }
        ]
    }
};

document.addEventListener("DOMContentLoaded", async () => {
    await createBattle();
    await connectWebSocket();

    await pushMessage("The battle begins!\n\n(Press spacebar or enter to continue)");

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
        websocketUrl = json.websocket_url;
        battleGuid = json.battle_guid;
    }
    catch(e) {
        console.error('Error:', error);
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

function processMessage(message) {
    const json = JSON.parse(message);
    const messages = json.messages;
    console.table(messages);

    // TODO: Update the updateDisplay method to handle message content
}

async function gameLoop() {
    while (!connectionClosed) {
        displayMessage(`What will ${playerActivePokemon.name.toUpperCase()} do?\n\n${defaultNavTip}`);

        // Let player select an action
        const playerAction = await waitForPlayerAction();
        sendMessage(playerAction.actionType, playerAction.object);
    }
    hideAll();
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
        button.innerText = playerActivePokemon.moves[idx].toUpperCase();
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
    populateButtonList(playerItems, "item-button");
}

function itemSelected(idx) {
    hidePlayerItemSelect();
    return new GameAction("bag", playerItems[idx]);
}

// Called by button
function pokemonClicked() {
    displayMessage(`Which Pokémon will you switch to?\n\n${defaultNavTip}`);
    if (playerTeam.length <= 1) {
        return; // Can't switch pokemon if there's only 1 left
    }

    showPlayerPokemonSelect();

    // Populate pokemon buttons with the player's pokemon
    const pokemonToShow = filterPlayerPokemon();
    populateButtonList(pokemonToShow, "pokemon-button");
}

function filterPlayerPokemon() {
    return playerTeam.filter(pokemon => pokemon !== playerActivePokemon);
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
        buttons[i].setAttribute("data-title", moves[i].name.toUpperCase());
        buttons[i].setAttribute("data-description", moves[i].description);
    }
}

function populateButtonList(list, buttonClass) {
    const buttons = document.getElementsByClassName(buttonClass);
    for (let i = 0; i < list.length && i < buttons.length; i++) {
        buttons[i].style.display = "block";
        buttons[i].innerText = list[i].name.toUpperCase();

        // Tooltip data
        buttons[i].setAttribute("data-title", list[i].name.toUpperCase());
        buttons[i].setAttribute("data-description", list[i].description);
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