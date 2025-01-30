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

    // Method: Generate Table
    function generateTable(filteredData) 
    {
        tableContainer.innerHTML = ""; // Delete the prior contents of table

        const pokemonTable = document.createElement("table"); 

        // Fill Table with Data
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

    // Method: Filter based on input of search bar 
    window.filterPokemon = function () 
    {
        const searchTerm = document.getElementById("searchBar").value.toLowerCase(); // Gets data of search bar

        const filteredData = pokemonData.filter(pokemon => 
            pokemon.name.toLowerCase().includes(searchTerm) ||                       // search data contains name
            `#${pokemon.id.toString().padStart(3, "0")}`.includes(searchTerm)        // search data contains number
        );
        generateTable(filteredData); //generate table with filtered data
    };

    

    // When loading the page display every pokemon
    generateTable(pokemonData);

    function formatName(name) 
    {
        return name.charAt(0).toUpperCase() + name.slice(1);
    }

});
