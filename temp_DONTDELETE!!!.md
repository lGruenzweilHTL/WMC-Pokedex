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
    <script src="pokedex.js"></script>
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
        <li><strong><a href="PokemonCards/pokemon-cards.html">Cards</a></strong></li>
        <li><strong><a href="games.html">Games</a></strong></li>
        <li><strong><a href="mockbattle.html">Battle</a></strong></li>
        <li><strong><a href="anime.html">TV series</a></strong></li>
    </ul>
</nav>
    <h1 style="text-align: center; margin-top: 5%;">Pokedex</h1>
</body>
</html>

-------------------------------------------------------------------------------------------------------------------------------------

CSS

img:not(.navPokeball) {
    width: 100px;
    height: 100px;
}

td {
    border: 1px solid #ddd;
    text-align: center;
    font-size: 18px;
    padding: 12px;
    transition: background-color 0.3s ease;
}

table {
    border: none;
    width: 80%;
    margin: 20px auto;
    border-collapse: collapse;
    background-color: #ffffff;
    border-radius: 10px;
    overflow: hidden;
    box-shadow: 0 8px 15px rgba(0, 0, 0, 0.1);
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

-------------------------------------------------------------------------------------------------------------------------------------

JS
document.addEventListener("DOMContentLoaded", async function() {
    const numberOfPokemon = 151;
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=${numberOfPokemon}`);
    const data = await response.json();
    console.log(data);

    const pokemonTable = document.createElement("table");
    Object.entries(data.results).forEach(([index, pokemon]) => {
        const idx = parseInt(index) + 1;

        const row = document.createElement("tr");
        row.appendChild(document.createElement("td")).innerHTML = `#${idx.toString().padStart(3, "0")}`;
        row.appendChild(document.createElement("td")).innerHTML = `<img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${idx}.png" alt="${pokemon.name}">`;
        row.appendChild(document.createElement("td")).innerHTML = `<a href="PokemonSubpage/pokemon.html?pokemon=${pokemon.name}">${formatName(pokemon.name)}</a>`;
        pokemonTable.appendChild(row);
    });

    document.body.appendChild(pokemonTable);
});

function formatName(name) {
    return name.charAt(0).toUpperCase() + name.slice(1);
}