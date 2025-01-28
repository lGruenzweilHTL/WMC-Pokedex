document.addEventListener("DOMContentLoaded", async function () {
    const numberOfPokemon = 151;
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=${numberOfPokemon}`);
    const data = await response.json();

    const pokemonData = data.results.map((pokemon, index) => ({
        id: index + 1,
        name: pokemon.name,
        image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${index + 1}.png`,
    }));

    const tableContainer = document.getElementById("tableContainer");

    // Funktion: Tabelle generieren
    function generateTable(filteredData) {
        tableContainer.innerHTML = ""; // Vorherigen Inhalt entfernen

        const pokemonTable = document.createElement("table");

        // Tabelle mit Daten füllen
        filteredData.forEach((pokemon) => {
            const row = document.createElement("tr");
            row.innerHTML = `
                <td>#${pokemon.id.toString().padStart(3, "0")}</td>
                <td><img src="${pokemon.image}" alt="${pokemon.name}"></td>
                <td><a href="PokemonSubpage/pokemon.html?pokemon=${pokemon.name}">${formatName(pokemon.name)}</a></td>
            `;
            pokemonTable.appendChild(row);
        });

        tableContainer.appendChild(pokemonTable);
    }

    // Funktion: Filtern basierend auf Suchbegriff
    window.filterPokemon = function () {
        const searchTerm = document.getElementById("searchBar").value.toLowerCase();
        const filteredData = pokemonData.filter(pokemon =>
            pokemon.name.toLowerCase().includes(searchTerm) || // Name enthält den Suchbegriff
            `#${pokemon.id.toString().padStart(3, "0")}`.includes(searchTerm) // Nummer enthält den Suchbegriff
        );
        generateTable(filteredData);
    };

    // Beim Laden der Seite: Alle Pokémon anzeigen
    generateTable(pokemonData);

    // Hilfsfunktion: Name formatieren
    function formatName(name) {
        return name.charAt(0).toUpperCase() + name.slice(1);
    }

    
});
