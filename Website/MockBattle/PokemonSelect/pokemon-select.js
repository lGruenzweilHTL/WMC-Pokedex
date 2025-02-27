document.addEventListener("DOMContentLoaded", () => {
    const selectionBody = document.querySelector(".pokemon-selection-body");
    const confirmButton = document.getElementById("confirm-selection");
    const selectedPokemon = [];

    fetch("../pokemon.json")
        .then(response => response.json())
        .then(pokemonData => populatePokemonSelection(pokemonData))
        .catch(error => console.error("Error loading Pokémon data:", error));

    function populatePokemonSelection(pokemonData) {
        const pokemonList = Object.values(pokemonData);
        pokemonList.forEach(pokemon => {
            const pokemonOption = createPokemonOption(pokemon);
            selectionBody.appendChild(pokemonOption);
        });
    }

    function createPokemonOption(pokemon) {
        const pokemonOption = document.createElement("div");
        pokemonOption.classList.add("pokemon-option");
        pokemonOption.innerHTML = `
            <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.id}.png" alt="${pokemon.display_name}">
            <p>${pokemon.display_name}</p>
        `;
        pokemonOption.addEventListener("click", () => togglePokemonSelection(pokemon, pokemonOption));
        return pokemonOption;
    }

    function togglePokemonSelection(pokemon, element) {
        const index = selectedPokemon.indexOf(pokemon);
        if (index > -1) {
            selectedPokemon.splice(index, 1);
            element.classList.remove("selected");
        } else if (selectedPokemon.length < 6) {
            selectedPokemon.push(pokemon);
            element.classList.add("selected");
        }
        confirmButton.disabled = selectedPokemon.length !== 6;
    }

    confirmButton.addEventListener("click", () => {
        console.log("Selected Pokémon:", selectedPokemon);
        // Redirect to the battle page or perform other actions
    });
});