# DONT DELETE THIS FILE OR I WILL TICKLE UR FEET

HTML

<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Pokedex</title>
    <link rel="stylesheet" href="pokedex.css">
    <link rel="stylesheet" href="navbar.css">
    <script src="pokedex.js" defer></script>
</head>

<body>
<nav class="navigation-bar">
    <img src="Images/pokeball.png" class="navPokeball" alt="Pokéball">
    <ul>
        <li><strong><a href="../index.html">Home</a></strong></li>
        <li><strong><a href="pokedex.html" class="active">Pokédex</a></strong></li>
        <li><strong><a href="types.html">Types</a></strong></li>
        <li><strong><a href="items.html">Items</a></strong></li>
        <li><strong><a href="KindOfPokemonSubpage/kinds-of-pokemon.html">Kinds</a></strong></li>
        <li><strong><a href="FavoritePokemon/favoritepokemon.html">Favorites</a></strong></li>
        <li><strong><a href="PokemonCards/pokemon-cards.html">Cards</a></strong></li>
        <li><strong><a href="games.html">Games</a></strong></li>
        <li><strong><a href="mockbattle.html">Battle</a></strong></li>
        <li><strong><a href="anime.html">TV series</a></strong></li>
    </ul>
</nav>

<h1 style="text-align: center; margin-top: 5%;">Pokedex</h1>

<div style="text-align: center; margin: 20px;">
    <input 
        type="text" 
        id="searchBar" 
        placeholder="Search Pokémon by name or ID..." 
        onkeyup="filterPokemon()" 
        style="padding: 10px; width: 50%; font-size: 16px;"
    />
</div>

<div id="tableContainer">
</div>

</body>
</html>

CSS

#searchBar {
    border: 3px solid #b8b8b8;
    border-radius: 8px;
    margin-bottom: 20px;
}

#tableContainer table {
    width: 80%;
    margin: 0 auto;
    border-collapse: collapse;
    background: #fff;
    border-radius: 10px;
    box-shadow: 0 8px 15px rgba(0, 0, 0, 0.1);
}

#tableContainer table tr:nth-child(even) {
    background-color: #f9f9f9;
}

#tableContainer table tr:hover {
    background-color: #f1f1f1;
}

#tableContainer table td {
    padding: 12px;
    text-align: center;
    border: 1px solid #ddd;
    font-size: 20px;
    transition: background-color 0.3s ease;
}



img:not(.navPokeball) {
    width: 100px;
    height: 100px;
}

li {
    list-style-type: none;
}

body {
    font-family: 'Arial', sans-serif;
    line-height: 1.6;
    background: linear-gradient(135deg, #fdf7f7, #d6ebff);
    margin: 0;
    padding: 0;

    
}
body::-webkit-scrollbar {
    display:none;
}

h1 {
    margin-top: 20px;
    text-align: center;
    color: #333;
    font-size: 36px;
}

p {
    text-align: center;
    color: #555;
    font-size: 18px;
}

tr:nth-child(even) {
    background-color: #f9f9f9;
}

tr:hover {
    background-color: #f1f1f1;
}

tr {
    transition: background-color 0.3s ease;
}

@media (max-width: 768px) {
    table {
        width: 95%;
    }

    td {
        font-size: 16px;
        padding: 8px;
    }

    h1 {
        font-size: 28px;
    }

    p {
        font-size: 16px;
    }
}

JS
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
