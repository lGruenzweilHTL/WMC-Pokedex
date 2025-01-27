const charizard = {
    "level": 50,
    "id": 6,
    "display_name": "Charizard",
    "stats": {
        "hp": 78,
        "attack": 84,
        "defense": 78,
        "spAttack": 109,
        "spDefense": 85,
        "speed": 100
    },
    "moves": [
        "flamethrower",
        "air-slash",
        "dragon-claw",
        "fire-blast"
    ],
    "types": [
        "fire",
        "flying"
    ]
};
const gengar = {
    "level": 50,
    "id": 94,
    "display_name": "Gengar",
    "stats": {
        "hp": 60,
        "attack": 65,
        "defense": 60,
        "spAttack": 130,
        "spDefense": 75,
        "speed": 110
    },
    "moves": [
        "shadow-ball",
        "dark-pulse",
        "sludge-bomb",
        "destiny-bond"
    ],
    "types": [
        "ghost",
        "poison"
    ]
};

const moves = {
    "flamethrower": {
        "type": "fire",
        "special": true,
        "power": 90,
        "accuracy": 100,
        "display_name": "Flamethrower",
        "effect": "burn",
        "effect_chance": 10,
        "effect_duration": 2
    },
    "dragon-claw": {
        "type": "dragon",
        "special": false,
        "power": 80,
        "accuracy": 100,
        "display_name": "Dragon Claw",
        "effect": null
    },
    "air-slash": {
        "type": "flying",
        "special": false,
        "power": 75,
        "accuracy": 95,
        "display_name": "Air Slash",
        "effect": "flinch",
        "effect_chance": 30,
        "effect_duration": 1
    },
    "fire-blast": {
        "type": "fire",
        "special": true,
        "power": 110,
        "accuracy": 85,
        "display_name": "Fire Blast",
        "effect": "burn",
        "effect_chance": 10,
        "effect_duration": 2
    },
    "shadow-ball": {
        "type": "ghost",
        "special": true,
        "power": 80,
        "accuracy": 100,
        "display_name": "Shadow Ball",
        "effect": "lower-sp-defense",
        "effect_chance": 20,
        "effect_duration": 0 // Instant effect
    },
    "dark-pulse": {
        "type": "dark",
        "special": true,
        "power": 80,
        "accuracy": 100,
        "display_name": "Dark Pulse",
        "effect": "flinch",
        "effect_chance": 20,
        "effect_duration": 1
    },
    "sludge-bomb": {
        "type": "poison",
        "special": true,
        "power": 90,
        "accuracy": 100,
        "display_name": "Sludge Bomb",
        "effect": "poison",
        "effect_chance": 30,
        "effect_duration": 2
    },
    "destiny-bond": {
        "type": "ghost",
        "special": false,
        "power": 0,
        "accuracy": 100,
        "display_name": "Destiny Bond",
        "effect": "faint", // Faints both Pokémon if user faints as direct result of an attack
        "effect_chance": 100,
        "effect_duration": 1
    }
};

let playerTurn = true;
let playerTeam = [
    {
        "pokemon": charizard,
        "hp": calculateHp(charizard),
        "status": []
    },
    {
        "pokemon": gengar,
        "hp": calculateHp(gengar),
        "status": []
    }
];
let opponentTeam = [
    {
        "pokemon": charizard,
        "hp": calculateHp(charizard),
        "status": []
    },
    {
        "pokemon": gengar,
        "hp": calculateHp(gengar),
        "status": []
    }
];
let playerActivePokemon = playerTeam[0]; // Player starts with Charizard
let opponentActivePokemon = opponentTeam[1]; // Opponent starts with Gengar

// Containers
let playerActionSelect;
let playerMoveSelect;
let playerPokemonSelect;
let selectGroup;

function initContainers() {
    playerActionSelect = document.getElementById("action-select");
    playerMoveSelect = document.getElementById("move-select");
    playerPokemonSelect = document.getElementById("pokemon-select");
    selectGroup = [playerActionSelect, playerMoveSelect, playerPokemonSelect];
}

function showPlayerActionSelect() {
    hideAll();
    playerActionSelect.style.display = "block";
}

function hidePlayerActionSelect() {
    playerActionSelect.style.display = "none";
    showPlayerActionSelect();
}

function showPlayerMoveSelect() {
    hideAll();
    playerMoveSelect.style.display = "block";
}

function hidePlayerMoveSelect() {
    playerMoveSelect.style.display = "none";
    showPlayerActionSelect();
}

function showPlayerPokemonSelect() {
    hideAll();
    playerPokemonSelect.style.display = "block";
}

function hidePlayerPokemonSelect() {
    playerPokemonSelect.style.display = "none";
    showPlayerActionSelect();
}

function hideAll() {
    selectGroup.forEach(select => select.style.display = "none");
}

document.addEventListener("DOMContentLoaded", () => {
    updatePlayerDisplay();
    updateOpponentDisplay();

    initContainers();
    turn();
});

function turn() {
    if (checkGameOver()) {
        hideAll();
        return;
    }
    handleStatusEffects();
    decrementStatusEffects();
    if (handlePokemonFainted()) {
        changePokemon(); // Prompt player to switch Pokémon
        return;
    }

    if (playerTurn) {
        // Player's turn
        console.log("Player's turn");

        // Enable player buttons
        showPlayerActionSelect();
    } else {
        // Opponent's turn
        console.log("Opponent's turn");

        // Disable player buttons
        hidePlayerActionSelect();

        // Opponent attacks
        opponentAttack();
    }
}

function checkGameOver() {
    if (playerTeam.every(pokemon => pokemon.hp <= 0)) {
        pushMessage("You lost!");
        return true;
    } else if (opponentTeam.every(pokemon => pokemon.hp <= 0)) {
        pushMessage("You won!");
        return true;
    }
    return false;
}

function handlePokemonFainted() {
    let playerFainted = false;
    if (playerActivePokemon.hp <= 0) {
        pushMessage(`${playerActivePokemon.pokemon.display_name} fainted\nSelect a new Pokémon`);
        playerFainted = true;
    }
    if (opponentActivePokemon.hp <= 0) {
        pushMessage(`${opponentActivePokemon.pokemon.display_name} fainted`);
        switchOpponentPokemon();
    }
    return playerFainted;
}

function handleStatusEffects() {
    playerActivePokemon.status.forEach(status => {
        handleEffect(playerActivePokemon, status);
    });

    opponentActivePokemon.status.forEach(status => {
        handleEffect(opponentActivePokemon, status);
    });

    displayStatusEffects();
}

function displayStatusEffects() {
    const playerContainer = document.getElementById("player-status-container");
    const opponentContainer = document.getElementById("opponent-status-container");

    clearStatusEffect(playerContainer);
    clearStatusEffect(opponentContainer);

    playerActivePokemon.status.forEach(status => {
        const effect = document.createElement("span");
        effect.innerText = status.effect;
        effect.classList.add('status', 'status-' + status.effect);
        playerContainer.appendChild(effect);
    });
    opponentActivePokemon.status.forEach(status => {
        const effect = document.createElement("span");
        effect.innerText = status.effect;
        effect.classList.add('status', 'status-' + status.effect);
        opponentContainer.appendChild(effect);
    })
}
function clearStatusEffect(container) {
    while (container.firstChild) {
        container.removeChild(container.firstChild);
    }
}

function handleEffect(pokemon, effect) {
    const maxHp = calculateHp(pokemon.pokemon); // A lot of effects are based on max HP
    switch (effect.effect) {
        case "burn":
            // https://the-episodes-and-movie-yveltal-and-more.fandom.com/wiki/Burn_(Pokémon_Status_Condition)
            pushMessage(`${pokemon.pokemon.display_name} was hurt by burn!`);
            pokemon.hp -= Math.floor(maxHp / 16);
            updateHpBars();
            break;
        case "poison":
            // https://bulbapedia.bulbagarden.net/wiki/Poison_(status_condition)#Generation_I
            pushMessage(`${pokemon.pokemon.display_name} was hurt by poison!`);
            pokemon.hp -= Math.floor(maxHp / 8);
            updateHpBars();
            break;
        case "flinch":
            // https://bulbapedia.bulbagarden.net/wiki/Flinch
            pushMessage(`${pokemon.pokemon.display_name} flinched!`);
            console.log("Flinch effect");
            playerTurn = !playerTurn; // Skip turn
            break;
        case "faint":
            // https://bulbapedia.bulbagarden.net/wiki/Destiny_Bond_(move)
            if (effect.target.hp <= 0) {
                pushMessage(`${effect.target.pokemon.display_name} fainted due to Destiny Bond!`);
                pokemon.hp = 0;
            }
            break;
    }
}

function decrementStatusEffects() {
    // We decrement every action, because that is less buggy
    // That is also why we multiply the duration by 2, so the times still match up
    playerActivePokemon.status.forEach(status => {
        status.duration -= 1;
    });
    playerActivePokemon.status = playerActivePokemon.status.filter(status => status.duration > 0);

    opponentActivePokemon.status.forEach(status => {
        status.duration -= 1;
    });
    opponentActivePokemon.status = opponentActivePokemon.status.filter(status => status.duration > 0);
}

function switchOpponentPokemon() {
    // Simple for now because opponent only has 2 Pokemon
    opponentActivePokemon = opponentActivePokemon === opponentTeam[0] ? opponentTeam[1] : opponentTeam[0];
    pushMessage(`Opponent switched to ${opponentActivePokemon.pokemon.display_name}`);
    updateOpponentDisplay();
}

function attack() {
    // Select attack
    showPlayerMoveSelect();

    // Display moves
    const buttons = document.getElementsByClassName("move-button");
    Array.from(buttons).forEach((button, idx) => {
        button.innerText = moves[playerActivePokemon.pokemon.moves[idx]].display_name;
    });

    // Rest of the attack logic is in selectMove()
}

function selectMove(idx) {
    const moveName = playerActivePokemon.pokemon.moves[idx];

    // Hide move select
    hidePlayerMoveSelect();

    // Calculate damage
    const damage = calculateAttack(playerActivePokemon, moveName, opponentActivePokemon);

    // Apply damage
    damageOpponent(damage);

    // Switch turns
    playerTurn = !playerTurn;
    turn();
}

function bag() {
    // TODO

    // Switch turns
    playerTurn = !playerTurn;
    turn();
}

function run() {
    document.location.href = "../mockbattle.html";
}

function changePokemon() {
    // Display Pokemon select
    showPlayerPokemonSelect();

    // Find all Pokemon that are not fainted
    const pokemonList = playerTeam.filter(pokemon => pokemon.hp > 0 && pokemon !== playerActivePokemon);
    clearPokemonList();
    showPokemonList(pokemonList);

    // Rest of the logic is in selectPokemon()
}

function clearPokemonList() {
    const container = document.getElementById("pokemon-container");
    while (container.firstChild) {
        container.removeChild(container.firstChild);
    }
}

function showPokemonList(pokemonList) {
    // Separate into groups of two
    const pokemonGroups = [];
    for (let i = 0; i < pokemonList.length; i += 2) {
        pokemonGroups.push(pokemonList.slice(i, i + 2));
    }

    // Display Pokemon
    const container = document.getElementById("pokemon-container");

    pokemonGroups.forEach(group => {
        const row = document.createElement("div");
        row.className = "row";
        group.forEach(pokemon => {
            const col = document.createElement("div");
            col.className = "col-6";
            const card = document.createElement("div");
            card.className = "focusable card p-3 pokemon-button";
            card.tabIndex = 0;
            card.onclick = () => selectPokemon(pokemon);
            card.innerText = pokemon.pokemon.display_name;
            col.appendChild(card);
            row.appendChild(col);
        });
        container.appendChild(row);
    });
}

function selectPokemon(pokemon) {
    // Hide Pokemon select
    hidePlayerPokemonSelect();

    playerActivePokemon = pokemon
    pushMessage(`You switched to ${playerActivePokemon.pokemon.display_name}`);
    updatePlayerDisplay();

    // Switch turns
    playerTurn = !playerTurn;
    turn();
}

function calculateHp(pokemon) {
    // Hp = 2 * Level + 10 + Base
    return 2 * pokemon.level + 10 + pokemon.stats.hp;
}

function opponentAttack() {
    // Wait a bit before attacking
    setTimeout(() => {
        // Select attack
        const attackIdx = Math.floor(Math.random() * opponentActivePokemon.pokemon.moves.length);
        const attack = opponentActivePokemon.pokemon.moves[attackIdx];
        console.log(`Opponent used ${moves[attack].display_name}`);
        pushMessage(`Opponent used ${moves[attack].display_name}`);

        // Calculate damage
        const damage = calculateAttack(opponentActivePokemon, attack, playerActivePokemon);

        // Apply damage
        damagePlayer(damage);

        // Switch turns
        playerTurn = !playerTurn;
        turn();
    }, 1000);
}

function calculateAttack(user, moveName, target) {
    const pokemon = user.pokemon;
    const targetPokemon = target.pokemon;
    const move = moves[moveName];

    // Check if it hits
    const random = Math.floor(Math.random() * 100);
    if (random > move.accuracy) {
        pushMessage(`${pokemon.display_name}'s ${move.display_name} missed!`);
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

    pushMessage(`${pokemon.display_name} used ${move.display_name}!`);

    applyStatusEffect(user, move, target);
    return calculateDamage(level, critical, power, attack, defense, stab, type1, type2);
}

function damagePlayer(damage) {
    playerActivePokemon.hp -= damage;
    console.log(`Player took ${damage} damage and has ${playerActivePokemon.hp} HP left`);
    updateHpBars();
}

function damageOpponent(damage) {
    opponentActivePokemon.hp -= damage;
    console.log(`Opponent took ${damage} damage and has ${opponentActivePokemon.hp} HP left`);
    updateHpBars();
}

/*
Whether a move scores a critical hit is determined by comparing a 1-byte random number (0 to 255) against a 1-byte threshold value (also 0 to 255).
If the random number is strictly less than the threshold, the Pokémon scores a critical hit.

If the threshold would exceed 255, it instead becomes 255. Consequently, the maximum possible chance of landing a critical hit is 255/256.
(If the generated random number is 255, that number can never be less than the threshold, regardless of the value of the threshold.)

In the Generation I core series games, the threshold is normally equal to half the user's base Speed.
 */
function isCritical(baseSpeed) {
    const threshold = Math.min(baseSpeed / 2, 255);
    const random = Math.floor(Math.random() * 256);
    return random < threshold;
}

function typeEffectiveness(moveType, targetType) {
    const effectiveness = calculateTypeMultiplier([targetType]);
    return effectiveness[moveType];
}

/*
Level is the level of the attacking Pokémon.
Critical is 2 for a critical hit, and 1 otherwise.
A is the effective Attack stat of the attacking Pokémon if the used move is a physical move, or the effective Special stat of the attacking Pokémon if the used move is a special move (for a critical hit, all modifiers are ignored, and the unmodified Attack or Special is used instead). If either this or D are greater than 255, both are divided by 4 and rounded down.
D is the effective Defense stat of the target if the used move is a physical move, or the effective Special stat of the target if the used move is an other special move (for a critical hit, all modifiers are ignored, and the unmodified Defense or Special is used instead). If the move is physical and the target has Reflect up, or if the move is special and the target has Light Screen up, this value is doubled (unless it is a critical hit). If the move is Explosion or Selfdestruct, this value is halved (rounded down, with a minimum of 1). If either this or A are greater than 255, both are divided by 4 and rounded down. Unlike future Generations, if this is 0, the division is not made equal to 0; rather, the game will try to divide by 0 and softlock, hanging indefinitely until it is turned off.
Power is the power of the used move.
STAB is the same-type attack bonus. This is equal to 1.5 if the move's type matches any of the user's types, and 1 if otherwise. Internally, it is recognized as an addition of the damage calculated thus far divided by 2, rounded down, then added to the damage calculated thus far.
Type1 is the type effectiveness of the used move against the target's type that comes first in the type matchup table, or only type if it only has one type. This can be 0.5 (not very effective), 1 (normally effective), 2 (super effective).
Type2 is the type effectiveness of the used move against the target's type that comes second in the type matchup table. This can be 0.5 (not very effective), 1 (normally effective), 2 (super effective). If the target only has one type, Type2 is 1. If this would result in 0 damage, the calculation ends here and the move is stated to have missed, even if it would've hit.
random is realized as a multiplication by a random uniformly distributed integer between 217 and 255 (inclusive), followed by an integer division by 255. If the calculated damage thus far is 1, random is always 1.
 */
function calculateDamage(level, critical, power, a, d, stab, type1, type2) {
    const calc1 = (2 * level * critical / 5) + 2
    const calc2 = calc1 * power * a / d
    const calc3 = calc2 / 50 + 2
    const random = Math.floor(Math.random() * (255 - 217 + 1) + 217) / 255;
    const calc4 = calc3 * stab * type1 * type2 * random;

    return Math.floor(calc4);
}

function applyStatusEffect(user, move, target) {
    if (move.effect === null) {
        return;
    }

    const random = Math.floor(Math.random() * 100);
    if (random > move.effect_chance) {
        return;
    }

    console.log(`${user.pokemon.display_name}'s ${move.display_name} applied ${move.effect} to ${target.pokemon.display_name}`);

    switch (move.effect) {
        case "burn":
            target.status.push({
                "effect": "burn",
                "duration": move.effect_duration * 2
            });
            pushMessage(`${target.pokemon.display_name} was burned!`);
            break;
        case "flinch":
            target.status.push({
                "effect": "flinch",
                "duration": move.effect_duration * 2
            });
            // Flinch is applied when the affected Pokémon is about to use a move, that's why we don't need to push a message here
            break;
        case "poison":
            target.status.push({
                "effect": "poison",
                "duration": move.effect_duration * 2
            });
            pushMessage(`${target.pokemon.display_name} was poisoned!`);
            break;
        case "lower-sp-defense":
            target.pokemon.stats.spDefense -= 1;
            pushMessage(`${target.pokemon.display_name}'s Special Defense was lowered!`);
            break;
        case "faint":
            target.status.push({
                "effect": "faint",
                "duration": move.effect_duration * 2,
                "target": user
            });
            pushMessage(`A bond of fate has been established with ${target.pokemon.display_name}!`);
            break;
        default:
            console.error("Unknown effect: " + move.effect);
    }
}

function pushMessage(message) {
    document.getElementById("message-display").innerText = message;
}

function changePlayerPokemonImage(idx) {
    const img = document.getElementById("player-pokemon");
    img.src = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${idx}.png`;
}

function changeOpponentPokemonImage(idx) {
    const img = document.getElementById("opponent-pokemon");
    img.src = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${idx}.png`;
}

function updatePlayerDisplay() {
    updateHpBars();
    document.getElementById("player-pokemon-name").innerText = playerActivePokemon.pokemon.display_name;
    document.getElementById("player-pokemon-level").innerText = `Level ${playerActivePokemon.pokemon.level}`;
    changePlayerPokemonImage(playerActivePokemon.pokemon.id);
}

function updateOpponentDisplay() {
    updateHpBars();
    document.getElementById("opponent-pokemon-name").innerText = opponentActivePokemon.pokemon.display_name;
    document.getElementById("opponent-pokemon-level").innerText = `Level ${opponentActivePokemon.pokemon.level}`;
    changeOpponentPokemonImage(opponentActivePokemon.pokemon.id);
}

function updateHpBars() {
    updatePlayerHpBar();
    updateOpponentHpBar();
}

function updatePlayerHpBar() {
    const playerMaxHp = calculateHp(playerActivePokemon.pokemon);
    const playerHpBar = document.getElementById("player-hp-bar-fill");
    playerHpBar.style.width = `${Math.max(playerActivePokemon.hp, 0) / playerMaxHp * 100}%`;

    document.getElementById("player-pokemon-hp-text").innerText = `${playerActivePokemon.hp} / ${playerMaxHp}`;
}

function updateOpponentHpBar() {
    const opponentMaxHp = calculateHp(opponentActivePokemon.pokemon);
    const opponentHpBar = document.getElementById("opponent-hp-bar-fill");
    opponentHpBar.style.width = `${Math.max(opponentActivePokemon.hp, 0) / opponentMaxHp * 100}%`;

    document.getElementById("opponent-pokemon-hp-text").innerText = `${opponentActivePokemon.hp} / ${opponentMaxHp}`;
}