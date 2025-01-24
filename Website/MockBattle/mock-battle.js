const charizard = {
    "level": 50,
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
};

const moves = {
    "flamethrower": {
        "type": "fire",
        "special": true,
        "power": 90,
        "accuracy": 100,
    },
    "dragon-claw": {
        "type": "dragon",
        "special": false,
        "power": 80,
        "accuracy": 100
    },
    "air-slash": {
        "type": "flying",
        "special": false,
        "power": 75,
        "accuracy": 95
    },
    "fire-blast": {
        "type": "fire",
        "special": true,
        "power": 110,
        "accuracy": 85
    },
    "shadow-ball": {
        "type": "ghost",
        "special": true,
        "power": 80,
        "accuracy": 100
    },
    "dark-pulse": {
        "type": "dark",
        "special": true,
        "power": 80,
        "accuracy": 100
    },
    "sludge-bomb": {
        "type": "poison",
        "special": true,
        "power": 90,
        "accuracy": 100
    },
    "destiny-bond": {
        "type": "ghost",
        "special": false,
        "power": 0,
        "accuracy": 100,
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

    const buttons = document.getElementById("action-select");
    if (playerTurn) {
        // Player's turn
        console.log("Player's turn");
        console.table(playerActivePokemon);

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
        return  true;
    } else if (opponentTeam.every(pokemon => pokemon.hp <= 0)) {
        console.log("Player won");
        return  true;
    }
    return false;
}

function attack() {
    console.log("i attac");

    // Select attack

    // Calculate damage

    // Apply damage

    // Check if opponent is dead

    // Switch turns
    playerTurn = !playerTurn;
    turn();
}
function bag() {
    console.log("i bag");

    // Switch turns
    playerTurn = !playerTurn;
    turn();
}
function run() {
    console.log("i run");
    document.location.href = "../mockbattle.html";
}
function changePokemon() {
    console.log("i pokemon");

    // Switch turns
    playerTurn = !playerTurn;
    turn();
}

function calculateHp(pokemon) {
    // Hp = 2 * Level + 10 + Base
    return 2 * pokemon.level + 10 + pokemon.stats.hp;
}

function opponentAttack() {
    console.log("Opponent attacks");

    // Select attack
    const attackIdx = Math.floor(Math.random() * opponentActivePokemon.pokemon.moves.length);
    const attack = opponentActivePokemon.pokemon.moves[attackIdx];

    // Calculate damage
    const damage = calculateAttack(opponentActivePokemon.pokemon, attack, playerActivePokemon.pokemon);

    // Apply damage
    playerActivePokemon.hp -= damage;

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