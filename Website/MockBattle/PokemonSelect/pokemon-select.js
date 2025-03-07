document.addEventListener("DOMContentLoaded", () => {
    const selectionBody = document.querySelector(".pokemon-selection-body");
    const confirmButton = document.getElementById("confirm-selection");
    const selectedPokemon = [];
    let pokemonNames = [];

    fetchBattlePokemon()
        .then(pokemonData => populatePokemonSelection(pokemonData))
        .catch(error => console.error("Error loading Pokémon data:", error));

    function populatePokemonSelection(pokemonData) {
        pokemonNames = Object.keys(pokemonData);
        pokemonNames.forEach(name => {
            const pokemon = pokemonData[name];
            const pokemonOption = createPokemonOption(pokemon, name);
            selectionBody.appendChild(pokemonOption);
        });
    }

    function createPokemonOption(pokemon, name) {
        const pokemonOption = document.createElement("div");
        pokemonOption.classList.add("pokemon-option");
        pokemonOption.innerHTML = `
            <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.id}.png" alt="${pokemon["display_name"]}">
            <p>${pokemon["display_name"]}</p>
        `;
        pokemonOption.addEventListener("click", () => togglePokemonSelection(pokemon, pokemonOption, name));
        return pokemonOption;
    }

    function togglePokemonSelection(pokemon, element, name) {
        const index = selectedPokemon.indexOf(name);
        if (index > -1) {
            selectedPokemon.splice(index, 1);
            element.classList.remove("selected");
        } else if (selectedPokemon.length < 6) {
            selectedPokemon.push(name);
            element.classList.add("selected");
        }
        confirmButton.disabled = selectedPokemon.length !== 6;
    }

    confirmButton.addEventListener("click", () => {
        console.log("Selected Pokémon:", selectedPokemon);

        const urlParams = new URLSearchParams();
        selectedPokemon.forEach(name => urlParams.append('player', name));

        const opponentPokemon = pokemonNames.filter(name => !selectedPokemon.includes(name));
        opponentPokemon.forEach(name => urlParams.append('opponent', name));

        window.location.href = `../mock-battle.html?${urlParams.toString()}`;
    });
});