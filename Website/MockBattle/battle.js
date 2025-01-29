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
        this.maxHp = this.hp;
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
        this.effect = data.effect === null ? null : new Effect(data.effect);
    }
}

class Effect {
    constructor(json) {
        this.name = json.name;
        this.duration = json.duration;
        this.chance = json.chance;
        this.options = null;
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

    updateDisplay();

    await pushMessage("The battle begins!");

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
        await executeActions();
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
    focusFirstElement();

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
        runButton.addEventListener("click", runHandler, {once: true});

        const bagButton = document.getElementById("bag-button");
        const bagHandler = () => handleAction(bagClicked());
        bagButton.addEventListener("click", bagHandler, {once: true});

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
    showPlayerMoveSelect();

    // Populate move buttons with the player's moves
    const buttons = document.getElementsByClassName("move-button");
    Array.from(buttons).forEach((button, idx) => {
        button.innerText = playerActivePokemon.moves[idx].name;
    });
    buttons[0].focus();
}

function moveSelected(idx) {
    hidePlayerMoveSelect();
    return new GameAction("attack", playerActivePokemon.moves[idx], playerActivePokemon, opponentActivePokemon);
}

function runClicked() {
    hidePlayerActionSelect();
    return new GameAction("run", null, playerActivePokemon, null);
}

function bagClicked() {
    return new GameAction("bag", null, playerActivePokemon, null);
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

    buttons[0].focus();
}

function pokemonSelected(idx) {
    hidePlayerPokemonSelect();
    return new GameAction("pokemon", null, playerTeam[idx], "player");
}

async function executeActions() {
    for (const action of turnOrder) {
        // Execute action
        await executeAction(action);

        // Handle conditional effects (like faint from destiny bond)
        await handleConditionalEffects(action.pokemon);
        decrementConditionalEffects(action.pokemon);

        // Handle status effects
        await handleStatusEffects(action.pokemon);
        updateDisplay();
    }
}

async function executeAction(action) {
    switch (action.action) {
        case "run":
            await pushMessage("You ran away!");
            document.location.href = "../mockbattle.html";
            break;
        case "bag":
            await pushMessage("You reached into your bag!");
            // TODO
            break;
        case "pokemon":
            switch (action.target) {
                case "player":
                    playerActivePokemon = action.pokemon;
                    break;
                case "opponent":
                    opponentActivePokemon = action.pokemon;
                    break;
                default:
                    console.error("Invalid switch target: " + action.target);
                    break;
            }
            break;
        case "attack":
            await handleAttack(action);
            break;
        default:
            console.error("Invalid action: " + action.action);
            break;
    }
}

async function handleAttack(action) {
    const move = action.move;
    const damage = await calculateAttack(action.pokemon, move, action.target);
    action.target.hp -= damage;

    if (move.effect !== null && move.effect.name === "faint") {
        move.effect.options = {
            target: action.pokemon
        }
    }

    updateDisplay();
    await pushMessage(`${action.pokemon.name} used ${action.move.name}!`);
    await applyStatusEffect(action.target, move.effect);
}

async function calculateAttack(user, move, target) {
    // Check if it hits
    const random = Math.floor(Math.random() * 100);
    if (random > move.accuracy) {
        await pushMessage(`${user.name}'s ${move.name} missed!`);
        return 0;
    }

    // Check if it should flinch
    if (user.conditionalEffects.includes("flinch")) {
        await pushMessage(`${user.name} flinched!`);
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

async function applyStatusEffect(pokemon, effect) {
    if (effect === null) {
        return;
    }

    // Check if the effect should be applied
    const random = Math.floor(Math.random() * 100);
    if (random > effect.chance) {
        return;
    }

    if (effect.name === "faint" || effect.name === "flinch") {
        // faint and flinch are not status effects
        pokemon.conditionalEffects.push(effect);
    }
    else if (effect.duration === 0) {
        // Apply immediately
        await calculateStatusEffect(pokemon, effect);
    }
    else {
        pokemon.statusEffects.push(effect);
        console.log(effect);
        await pushMessage(`${pokemon.name} was affected by ${effect.name}!`);
    }

    updateDisplay();
}

async function handleStatusEffects(pokemon) {
    for (const effect of pokemon.statusEffects) {
        // Calculate effects
        await calculateStatusEffect(pokemon, effect);

        // Decrement counters
        effect.duration--;
    }

    // Remove expired effects
    pokemon.statusEffects = pokemon.statusEffects.filter(effect => effect.duration > 0);
}

async function calculateStatusEffect(pokemon, effect) {
    switch (effect.name) {
        case "burn":
            await pushMessage(`${pokemon.name} was burned!`);
            pokemon.hp -= Math.floor(pokemon.maxHp / 16);
            break;
        case "poison":
            await pushMessage(`${pokemon.name} was hurt by poison!`);
            pokemon.hp -= Math.floor(pokemon.maxHp / 8);
            break;
        case "lower-sp-defense":
            await pushMessage(`${pokemon.name}'s special defense was lowered!`);
            pokemon.stats.spDefense -= 1;
            break;
        default:
            console.error("Unknown status effect: " + effect.name);
            break;
    }
}

async function handleConditionalEffects(pokemon) {
    for (const effect of pokemon.conditionalEffects) {
        await handleConditionalEffect(pokemon, effect);
    }
}
function decrementConditionalEffects(pokemon) {
    pokemon.conditionalEffects.forEach(effect => effect.duration--);
    pokemon.conditionalEffects = pokemon.conditionalEffects.filter(effect => effect.duration > 0);
}

async function handleConditionalEffect(pokemon, effect) {
    switch (effect.name) {
        case "faint":
            // Check if target has fainted
            if (effect.options.target.hp <= 0) {
                await pushMessage(`${pokemon.name} has fainted!`);
                pokemon.hp = 0;
            }
            break;
        case "flinch":
            // Flinch is checked before the pokemon's turn
            break;
    }
}