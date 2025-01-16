document.addEventListener("DOMContentLoaded", function () {
    // Create a new element to insert
    let newElement = document.createElement("nav");
    newElement.classList.add("navigation-bar");
    newElement.innerHTML = `
        <img src="../Images/pokeball.png" class="navPokeball" alt="Pokéball">
        <ul>
            <li><strong><a href="../../index.html">Home</a></strong></li>
            <li><strong><a href="../pokedex.html">Pokédex</a></strong></li>
            <li><strong><a href="../types.html">Types</a></strong></li>
            <li><strong><a href="../items.html">Items</a></strong></li>
            <li><strong><a href="../KindOfPokemons-Subpage/kindOfPokemon.html">Kinds</a></strong></li>           
            <li><strong><a href="../PokemonCards/pokemonCards.html">Cards</a></strong></li>       
            <li><strong><a href="../Games.html">Games</a></strong></li>
            <li><strong><a href="../mockbattle.html">Battle</a></strong></li>
        </ul>
    `;

    // Get the body element
    let body = document.body;

    // Insert the new element at the very start of the body
    body.insertBefore(newElement, body.firstChild);
});