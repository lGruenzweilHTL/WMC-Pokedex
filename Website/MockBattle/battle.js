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
 */

class Pokemon {
    constructor(string) {
        const data = pokemon[string];
        this.name = data.display_name;
        this.level = data.level;
        this.base_stats = data.stats;
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
    constructor(action, move, pokemon) {
        this.action = action;
        this.move = move;
        this.pokemon = pokemon;
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
let playerChosenMove;
let opponentChosenMove;

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

        // Opponent selects move automatically (at random)
        const opponentAction = selectOpponentMove();

        // Determine turn order
        calculateTurnOrder(playerAction, opponentAction);

        // Execute moves 1 by 1
            // Handle status effects (apply, then decrement)
            // Calculate damage
            // Apply status effects
        executeActions();
    }
}

function isGameOver() {
    return playerTeam.length > 0 && opponentTeam.length > 0;
}

function calculateTurnOrder(playerAction, opponentAction) {
    turnOrder = playerAction.goesBefore(opponentAction)
        ? [playerAction, opponentAction]
        : [opponentAction, playerAction];
}

function selectOpponentMove() {
    const idx = Math.floor(Math.random() * 4);
    return new GameAction("attack", opponentActivePokemon.moves[idx], opponentActivePokemon);
}

async function waitForPlayerAction() {
    showPlayerActionSelect();

    // Wait for action button to be clicked

    // Continue based on the selected action


    // TEMP
    return new GameAction("run", null, null);
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
            // TODO
            break;
        case "attack":
            // TODO
            break;
        default:
            console.error("Invalid action: " + action.action);
            break;
    }
}