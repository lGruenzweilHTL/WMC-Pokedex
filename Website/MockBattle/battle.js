/*
    Game loop:

    1. Both players select a move
    2. The turn order is determined based on the chosen moves and the speed of the pokemon
    3. The moves are executed in order
        3.1. Damage is calculated and applied
        3.2. Status effects are applied
        3.3. Status effect counters are decremented
        3.4. The game checks if a pokemon has fainted
    4. The game checks if the battle is over


    Usually, status effects are applied at the end of the affected pokemon's turn
    Status effects that need to meet a condition to do something are checked at the beginning of the affected pokemon's turn
    Status effects with a duration of 0 are immediately applied and are not added to the status effects list

    Order of actions: run, pokemon, bag, attack

    Requires code from scripts: damage.js, containers.js, ui.js, calculator-methods.js

    TODO:
    - Implement status effects
    - Implement bag
    - Handle fainted pokemon
 */

class Pokemon {
    constructor(string) {
        const data = pokemon[string];
        this.id = data.id;
        this.name = data.display_name;
        this.level = data.level;
        this.stats = data.stats;
        this.types = data.types;
        this.hp = calculateHp(data);
        this.moves = data.moves.map(move => new Move(move));
        this.statusEffects = []; // Status effect (like burn, poison) are applied every turn of that pokemon
        this.conditionalEffects = []; // Conditional effects (like faint from destiny bond) are triggered by events
    }
}
class Move {
    constructor(string) {
        const data = moves[string];
        this.name = data.display_name;
        this.type = data.type;
        this.special = data.special;
        this.priority = data.priority;
        this.status = data.status;
        this.power = data.power;
        this.accuracy = data.accuracy;
        this.effect = new Effect(data.effect);
    }
}
class Effect {
    constructor(json) {
        if (json === null) {
            return;
        }
        this.name = json.name;
        this.duration = json.duration;
        this.chance = json.chance;
    }
}
class GameAction {
    constructor(action, move, pokemon, target) {
        this.action = action;
        this.move = move;
        this.pokemon = pokemon;
        this.target = target;
    }

    goesBefore(otherAction) {
        const actionPriorities = {
            "attack": 0,
            "bag": 1,
            "pokemon": 2,
            "run": 3
        };

        const actionPriority = actionPriorities[this.action];
        const otherPriority = actionPriorities[otherAction.action];

        if (actionPriority !== otherPriority) {
            return actionPriority > otherPriority;
        }

        if (this.move.priority !== otherAction.move.priority) {
            return this.move.priority === true;
        }

        return this.pokemon.stats.speed > otherAction.pokemon.stats.speed;
    }
}

let turnOrder = [];

const playerPokemon = ["charizard", "gengar"];
const opponentPokemon = ["gengar", "charizard"];

let playerTeam;
let opponentTeam;
let playerActivePokemon;
let opponentActivePokemon;

let pokemon = [];
let moves = [];

document.addEventListener("DOMContentLoaded", async () => {
    await initJson();
    initTeams();

    console.log("Game initialized successfully");

    updateDisplay();

    await gameLoop();
});

async function initJson() {
    let response = await fetch("pokemon.json");
    pokemon = await response.json();

    response = await fetch("moves.json");
    moves = await response.json();
}
function initTeams() {
    playerTeam = playerPokemon.map(pokemon => new Pokemon(pokemon));
    opponentTeam = opponentPokemon.map(pokemon => new Pokemon(pokemon));

    playerActivePokemon = playerTeam[0];
    opponentActivePokemon = opponentTeam[0];
}

async function gameLoop() {
    while (!isGameOver()) {
        // Let player select an action
        const playerAction = await waitForPlayerAction();
        console.log(`Received "${playerAction.action}" action from player${playerAction.move ? ". Move: " + playerAction.move.name : ""}`);

        // Opponent selects move automatically (at random)
        const opponentAction = selectOpponentMove();

        // Determine turn order
        calculateTurnOrder(playerAction, opponentAction);

        // Execute moves 1 by 1
            // Handle status effects (apply, then decrement)
            // Calculate damage
            // Apply new status effects
        executeActions();
    }
}

function isGameOver() {
    return playerTeam.length === 0 || opponentTeam.length === 0;
}

function calculateTurnOrder(playerAction, opponentAction) {
    turnOrder = playerAction.goesBefore(opponentAction)
        ? [playerAction, opponentAction]
        : [opponentAction, playerAction];
}

function selectOpponentMove() {
    const idx = Math.floor(Math.random() * 4);
    return new GameAction("attack", opponentActivePokemon.moves[idx], opponentActivePokemon, playerActivePokemon);
}

async function waitForPlayerAction() {
    showPlayerActionSelect();

    return new Promise((resolve) => {
        function handleAction(action) {
            // Remove all event listeners
            runButton.removeEventListener("click", runHandler);
            bagButton.removeEventListener("click", bagHandler);
            Array.from(pokemonButtons).forEach((button, idx) => {
                button.removeEventListener("click", pokemonHandlers[idx]);
            });
            Array.from(moveButtons).forEach((button, idx) => {
                button.removeEventListener("click", moveHandlers[idx]);
            });

            resolve(action);
        }

        const runButton = document.getElementById("run-button");
        const runHandler = () => handleAction(runClicked());
        runButton.addEventListener("click", runHandler, { once: true });

        const bagButton = document.getElementById("bag-button");
        const bagHandler = () => handleAction(bagClicked());
        bagButton.addEventListener("click", bagHandler, { once: true });

        const pokemonButtons = document.getElementsByClassName("pokemon-button");
        const pokemonHandlers = Array.from(pokemonButtons).map((button, idx) => {
            const handler = () => handleAction(pokemonSelected(idx));
            button.addEventListener("click", handler, { once: true });
            return handler;
        });

        const moveButtons = document.getElementsByClassName("move-button");
        const moveHandlers = Array.from(moveButtons).map((button, idx) => {
            const handler = () => handleAction(moveSelected(idx));
            button.addEventListener("click", handler, { once: true });
            return handler;
        });
    });
}

// Called by button
function attackClicked() {
    showPlayerMoveSelect();

    // Populate move buttons with the player's moves
    const buttons = document.getElementsByClassName("move-button");
    Array.from(buttons).forEach((button, idx) => {
        button.innerText = playerActivePokemon.moves[idx].name;
    });
}
function moveSelected(idx) {
    hidePlayerMoveSelect();
    return new GameAction("attack", playerActivePokemon.moves[idx], playerActivePokemon, opponentActivePokemon);
}

function runClicked() {
    hidePlayerActionSelect();
    return new GameAction("run", null, null, null);
}

function bagClicked() {
    return new GameAction("bag", null, null, null);
}

// Called by button
function pokemonClicked() {
    if (playerTeam.length <= 1) {
        return; // Can't switch pokemon if there's only 1 left
    }

    showPlayerPokemonSelect();

    // Populate pokemon buttons with the player's pokemon
    const buttons = document.getElementsByClassName("pokemon-button");
    Array.from(buttons).forEach((button, idx) => {
        button.innerText = playerTeam[idx].name;
    });
}
function pokemonSelected(idx) {
    hidePlayerPokemonSelect();
    return new GameAction("pokemon", null, playerTeam[idx], null);
}

function executeActions() {
    for (const action of turnOrder) {
        executeAction(action);
    }
}
function executeAction(action) {
    switch (action.action) {
        case "run":
            document.location.href = "../mockbattle.html";
            break;
        case "bag":
            // TODO
            break;
        case "pokemon":
            playerActivePokemon = action.pokemon;
            updatePlayerDisplay();
            break;
        case "attack":
            handleAttack(action);
            break;
        default:
            console.error("Invalid action: " + action.action);
            break;
    }
}

function handleAttack(action) {
    const move = action.move;
    const damage = calculateAttack(action.pokemon, move, action.target);
    action.target.hp -= damage;

    updateDisplay();
}

function calculateAttack(user, move, target) {
    // Check if it hits
    const random = Math.floor(Math.random() * 100);
    if (random > move.accuracy) {
        console.log(`${user.name}'s ${move.name} missed!`);
        return 0;
    }

    const level = user.level;
    const attack = move.special ? user.stats.spAttack : user.stats.attack;
    const defense = move.special ? target.stats.spDefense : target.stats.defense;
    const power = move.power;
    const type1 = typeEffectiveness(move.type, target.types[0]);
    const type2 = target.types.length > 1 ? typeEffectiveness(move.type, target.types[1]) : 1;
    const stab = user.types.includes(move.type) ? 1.5 : 1;
    const critical = isCritical(user.stats.speed) ? 2 : 1;

    console.log(`${user.name} used ${move.name}!`);
    return calculateDamage(level, critical, power, attack, defense, stab, type1, type2);
}