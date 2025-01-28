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

function changePlayerPokemonImage(idx) {
    const img = document.getElementById("player-pokemon");
    img.src = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${idx}.png`;
}

function changeOpponentPokemonImage(idx) {
    const img = document.getElementById("opponent-pokemon");
    img.src = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${idx}.png`;
}