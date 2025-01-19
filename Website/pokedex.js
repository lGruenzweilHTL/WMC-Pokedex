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
        row.appendChild(document.createElement("td")).innerHTML = `<a href="Sub/pokemon.html?pokemon=${pokemon.name}">${formatName(pokemon.name)}</a>`;
        pokemonTable.appendChild(row);
    });

    document.body.appendChild(pokemonTable);
});

function formatName(name) {
    return name.charAt(0).toUpperCase() + name.slice(1);
}