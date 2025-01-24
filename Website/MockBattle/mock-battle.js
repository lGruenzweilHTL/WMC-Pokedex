const charizard = {
    "level": 50,
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
        "display_name": "Flamethrower"
    },
    "dragon-claw": {
        "type": "dragon",
        "special": false,
        "power": 80,
        "accuracy": 100,
        "display_name": "Dragon Claw"
    },
    "air-slash": {
        "type": "flying",
        "special": false,
        "power": 75,
        "accuracy": 95,
        "display_name": "Air Slash"
    },
    "fire-blast": {
        "type": "fire",
        "special": true,
        "power": 110,
        "accuracy": 85,
        "display_name": "Fire Blast"
    },
    "shadow-ball": {
        "type": "ghost",
        "special": true,
        "power": 80,
        "accuracy": 100,
        "display_name": "Shadow Ball"
    },
    "dark-pulse": {
        "type": "dark",
        "special": true,
        "power": 80,
        "accuracy": 100,
        "display_name": "Dark Pulse"
    },
    "sludge-bomb": {
        "type": "poison",
        "special": true,
        "power": 90,
        "accuracy": 100,
        "display_name": "Sludge Bomb"
    },
    "destiny-bond": {
        "type": "ghost",
        "special": false,
        "power": 0,
        "accuracy": 100,
        "display_name": "Destiny Bond"
    }
};

let playerTurn = true;
let playerTeam = [
    {
        "pokemon": charizard,
        "hp": calculateHp(charizard)
    },
    {
        "pokemon": gengar,
        "hp": calculateHp(gengar)
    }
];
let opponentTeam = [
    {
        "pokemon": charizard,
        "hp": calculateHp(charizard)
    },
    {
        "pokemon": gengar,
        "hp": calculateHp(gengar)
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
    initContainers();
    turn();
});

function turn() {
    if (checkGameOver()) {
        return;
    }
    handlePokemonFainted();

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
        console.log("Player lost");
        return true;
    } else if (opponentTeam.every(pokemon => pokemon.hp <= 0)) {
        console.log("Player won");
        return true;
    }
    return false;
}

function handlePokemonFainted() {
    if (playerActivePokemon.hp <= 0) {
        console.log("Player's active Pokemon fainted");
        changePokemon(); // Prompt player to switch Pokémon
    }
    if (opponentActivePokemon.hp <= 0) {
        console.log("Opponent's active Pokemon fainted");
        switchOpponentPokemon();
    }
}
function switchOpponentPokemon() {
    // Simple for now because opponent only has 2 Pokemon
    opponentActivePokemon = opponentActivePokemon === opponentTeam[0] ? opponentTeam[1] : opponentTeam[0];
    console.log(`Opponent switched to ${opponentActivePokemon.pokemon.display_name}`);
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
    const damage = calculateAttack(playerActivePokemon.pokemon, moveName, opponentActivePokemon.pokemon);

    // Apply damage
    opponentActivePokemon.hp -= damage;
    console.log(`Opponent took ${damage} damage and has ${opponentActivePokemon.hp} HP left`);

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
            // <div class="col-6">
            //                 <div class="focusable card p-3 pokemon-button" tabindex="0" onclick="selectPokemon(0)"></div>
            //             </div>
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
    console.log(`Player switched to ${playerActivePokemon.pokemon.display_name}`);

    // Switch turns
    playerTurn = !playerTurn;
    turn();
}

function calculateHp(pokemon) {
    // Hp = 2 * Level + 10 + Base
    return 2 * pokemon.level + 10 + pokemon.stats.hp;
}

function opponentAttack() {
    // Select attack
    const attackIdx = Math.floor(Math.random() * opponentActivePokemon.pokemon.moves.length);
    const attack = opponentActivePokemon.pokemon.moves[attackIdx];
    console.log(`Opponent used ${attack}`);

    // Calculate damage
    const damage = calculateAttack(opponentActivePokemon.pokemon, attack, playerActivePokemon.pokemon);

    // Apply damage
    playerActivePokemon.hp -= damage;
    console.log(`Player took ${damage} damage and has ${playerActivePokemon.hp} HP left`);

    // Switch turns
    playerTurn = !playerTurn;
    turn();
}

function calculateAttack(pokemon, moveName, target) {
    // Damage = (((2 * Level + 10) / 250) * (Attack / Defense) * Base + 2) * Modifier
    const move = moves[moveName];
    const level = pokemon.level;
    const attack = move.special ? pokemon.stats.spAttack : pokemon.stats.attack;
    const defense = move.special ? target.stats.spDefense : target.stats.defense
    const base = move.power;
    const targetWeaknesses = calculateTypeMultiplier(target.types);
    const modifier = targetWeaknesses[move.type];

    return (((2 * level + 10) / 250) * (attack / defense) * base + 2) * modifier;
}