function updateDisplay() {
    updatePlayerDisplay();
    updateOpponentDisplay();
}

function updatePlayerDisplay() {
    updatePlayerHpBar();
    document.getElementById("player-pokemon-name").innerText = playerActivePokemon.name.toUpperCase();
    document.getElementById("player-pokemon-level").innerText = `Level ${playerActivePokemon.level}`;
    changePlayerPokemonImage(playerActivePokemon.id);
    displayPlayerStatusEffects();
    //updatePlayerTeamDisplay(); TODO: Uncomment when team display is implemented
}

function updateOpponentDisplay() {
    updateOpponentHpBar();
    document.getElementById("opponent-pokemon-name").innerText = opponentActivePokemon.name.toUpperCase();
    document.getElementById("opponent-pokemon-level").innerText = `Level ${opponentActivePokemon.level}`;
    changeOpponentPokemonImage(opponentActivePokemon.id);
    displayOpponentStatusEffects();
    //updateOpponentTeamDisplay(); TODO: Uncomment when team display is implemented
}

function updatePlayerHpBar() {
    const playerMaxHp = playerActivePokemon.maxHp;
    const playerHpBar = document.getElementById("player-hp-bar-fill");
    playerHpBar.style.width = `${Math.max(playerActivePokemon.hp, 0) / playerMaxHp * 100}%`;

    document.getElementById("player-pokemon-hp-text").innerText = `${Math.max(0, playerActivePokemon.hp)} / ${playerMaxHp}`;
}

function updateOpponentHpBar() {
    const opponentMaxHp = opponentActivePokemon.maxHp;
    const opponentHpBar = document.getElementById("opponent-hp-bar-fill");
    opponentHpBar.style.width = `${Math.max(opponentActivePokemon.hp, 0) / opponentMaxHp * 100}%`;

    document.getElementById("opponent-pokemon-hp-text").innerText = `${Math.max(0, opponentActivePokemon.hp)} / ${opponentMaxHp}`;
}

function changePlayerPokemonImage(idx) {
    const img = document.getElementById("player-pokemon");
    img.src = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${idx}.png`;
}

function changeOpponentPokemonImage(idx) {
    const img = document.getElementById("opponent-pokemon");
    img.src = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${idx}.png`;
}

function clearStatusEffect(container) {
    while (container.firstChild) {
        container.removeChild(container.firstChild);
    }
}

function displayPlayerStatusEffects() {
    const container = document.getElementById("player-status-container");
    clearStatusEffect(container);

    playerActivePokemon.statusEffects.forEach(status => {
        const effect = document.createElement("span");
        effect.innerText = status.name;
        effect.classList.add('status', 'status-' + status.name);
        container.appendChild(effect);
    });
}
function displayOpponentStatusEffects() {
    const container = document.getElementById("opponent-status-container");
    clearStatusEffect(container);

    opponentActivePokemon.statusEffects.forEach(status => {
        const effect = document.createElement("span");
        effect.innerText = status.name;
        effect.classList.add('status', 'status-' + status.name);
        container.appendChild(effect);
    });
}

function updatePlayerTeamDisplay() {
    const container = document.getElementById("player-team-container");
    while (container.firstChild) {
        container.removeChild(container.firstChild);
    }

    playerTeam.forEach(pokemon => {
        const img = document.createElement("img");
        img.src = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.id}.png`;
        img.alt = pokemon.display_name;
        img.title = pokemon.display_name;

        container.appendChild(img);
    });
}
function updateOpponentTeamDisplay() {
    const container = document.getElementById("opponent-team-container");
    while (container.firstChild) {
        container.removeChild(container.firstChild);
    }

    opponentTeam.forEach(pokemon => {
        const img = document.createElement("img");
        img.src = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.id}.png`;
        img.alt = pokemon.display_name;
        img.title = pokemon.display_name;

        container.appendChild(img);
    });
}