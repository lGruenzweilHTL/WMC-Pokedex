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

document.addEventListener("DOMContentLoaded", turn);

function turn() {
    if (checkGameOver()) {
        return;
    }
    handlePokemonFainted();

    const buttons = document.getElementById("action-select");
    if (playerTurn) {
        // Player's turn
        console.log("Player's turn");

        // Enable player buttons
        buttons.style.display = "block";
    } else {
        // Opponent's turn
        console.log("Opponent's turn");

        // Disable player buttons
        buttons.style.display = "none";

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
    const moveSelect = document.getElementById("move-select");
    moveSelect.style.display = "block";

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
    const moveSelect = document.getElementById("move-select");
    moveSelect.style.display = "none";

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
    // TODO

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