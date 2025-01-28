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

    return new Promise((resolve) => {
        function handleAction(action) {
            resolve(action);
        }

        document.getElementById("run-button").addEventListener("click", () => {
            handleAction(runClicked());
        }, { once: true });

        // TODO: Implement bag
        document.getElementById("bag-button").addEventListener("click", () => {
            handleAction(bagClicked());
        }, { once: true });

        const pokemonButtons = document.getElementsByClassName("pokemon-button");
        Array.from(pokemonButtons).forEach((button, idx) => {
            button.addEventListener("click", () => {
                handleAction(pokemonSelected(idx));
            }, { once: true });
        });

        const moveButtons = document.getElementsByClassName("move-button");
        Array.from(moveButtons).forEach((button, idx) => {
            button.addEventListener("click", () => {
                handleAction(moveSelected(idx));
            }, { once: true });
        });
    });
}

// Called by button
function attackClicked() {
    showPlayerMoveSelect();

    // Populate move buttons with the player's moves
    const buttons = document.getElementsByClassName("move-button");
    Array.from(buttons).forEach((button, idx) => {
        button.innerText = moves[playerActivePokemon.pokemon.moves[idx]].display_name;
    });
}
function moveSelected(idx) {
    hidePlayerMoveSelect();
    return new GameAction("attack", playerActivePokemon.moves[idx], playerActivePokemon);
}

function runClicked() {
    hidePlayerActionSelect();
    return new GameAction("run", null, null);
}

function bagClicked() {
    // TODO
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
        button.innerText = playerTeam[idx].display_name;
    });
}
function pokemonSelected(idx) {
    hidePlayerPokemonSelect();
    return new GameAction("pokemon", null, playerTeam[idx]);
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
            handlePlayerAttack(action);
            break;
        default:
            console.error("Invalid action: " + action.action);
            break;
    }
}

function handlePlayerAttack(action) {
    const move = action.move;
    const damage = calculateAttack(playerActivePokemon, move, opponentActivePokemon);
    damageOpponent(damage);

    updateOpponentDisplay();
}

function calculateAttack(user, move, target) {
    const pokemon = user.pokemon;
    const targetPokemon = target.pokemon;

    // Check if it hits
    const random = Math.floor(Math.random() * 100);
    if (random > move.accuracy) {
        console.log(`${pokemon.display_name}'s ${move.display_name} missed!`);
        return 0;
    }

    const level = pokemon.level;
    const attack = move.special ? pokemon.stats.spAttack : pokemon.stats.attack;
    const defense = move.special ? targetPokemon.stats.spDefense : targetPokemon.stats.defense;
    const power = move.power;
    const type1 = typeEffectiveness(move.type, targetPokemon.types[0]);
    const type2 = targetPokemon.types.length > 1 ? typeEffectiveness(move.type, targetPokemon.types[1]) : 1;
    const stab = pokemon.types.includes(move.type) ? 1.5 : 1;
    const critical = isCritical(pokemon.stats.speed) ? 2 : 1;

    console.log(`${pokemon.display_name} used ${move.display_name}!`);
    return calculateDamage(level, critical, power, attack, defense, stab, type1, type2);
}