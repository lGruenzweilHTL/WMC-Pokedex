// navbar.js
class CustomNavbar extends HTMLElement {
    constructor() {
        super();

        // Attach a shadow DOM
        const shadow = this.attachShadow({ mode: 'open' });

        // Add styles
        const style = document.createElement('style');
        style.textContent = `
            body::-webkit-scrollbar {
    display: none;
}

.navigation-bar:not(.active) {
    background-color: #333;
    width: 100%;
    margin-top: 1%;
    position: fixed;
    top: 0;
    left: 0;
    padding: 10px 0;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.3);
    display: flex;
    justify-content: center;
    z-index: 2;
    border-radius: 10px;
    font-family: Verdana, sans-serif;
}

.navigation-bar ul:not(.active) {
    list-style: none;
    margin: 0;
    padding: 0;
    display: flex;
}

.navigation-bar ul li:not(.active) {
    margin: 0 20px;
}

.navigation-bar ul li a:not(.active) {
    text-decoration: none;
    color: white;
    font-size: 20px;
    padding: 5px 10px;
    border-radius: 5px;
    transition: background-color 0.3s, color 0.3s;
}

.navigation-bar ul li a:hover:not(.active) {
    background-color: wheat;
    color: black;
}

.active {
    text-decoration: underline;
    color: black;
    font-size: 20px;
    padding: 5px 10px;
    border-radius: 5px;
    transition: background-color 0.3s, color 0.3s;
    background-color: wheat;
}

.active:hover {
    background-color: #333;
    color: white;
}

.navPokeball {
    position: absolute;
    left: 5px;
    top: 7%;
    width: 40px;
}

.navPokeball:hover {
    animation: spin 1.5s linear infinite;
}

@keyframes spin {
    from {
        transform: rotate(0deg);
    }

    to {
        transform: rotate(360deg);
    }
}


@media (max-width: 768px) {
    .navigation-bar ul {
        display: none;
        flex-direction: column;
        width: 70%;
        text-align: center;
        padding: 0;
        margin: 0;
    }
}

.navigation-bar.hide {
    visibility: hidden;
}
.navigation-bar.hide .pokeball-icon {
    visibility: visible;
}
#toggle-navbar {
    display: none;
}
        `;

        // Add HTML structure
        const navbar = document.createElement('nav');
        navbar.classList.add('navigation-bar');
        navbar.innerHTML = `
            <label for="toggle-navbar" class="pokeball-icon">
                <img src="/Website/Images/pokeball.png" class="navPokeball" alt="Pokéball">
            </label>
            <ul>
                <li><strong><a href="/WMC-Pokedex/index.html">Home</a></strong></li>
                <li><strong><a href="/WMC-Pokedex/Website/pokedex.html">Pokédex</a></strong></li>
                <li><strong><a href="/WMC-Pokedex/Website/types.html">Types</a></strong></li>
                <li><strong><a href="/WMC-Pokedex/Website/items.html">Items</a></strong></li>
                <li><strong><a href="/WMC-Pokedex/Website/KindOfPokemonSubpage/kinds-of-pokemon.html">Kinds</a></strong></li>
                <li><strong><a href="/WMC-Pokedex/Website/FavoritePokemon/favoritepokemon.html">Favorites</a></strong></li>
                <li><strong><a href="/WMC-Pokedex/Website/PokemonCards/pokemon-cards.html">Cards</a></strong></li>
                <li><strong><a href="/WMC-Pokedex/Website/games.html">Games</a></strong></li>
                <li><strong><a href="/WMC-Pokedex/Website/mockbattle.html">Battle</a></strong></li>
                <li><strong><a href="/WMC-Pokedex/Website/anime.html">TV series</a></strong></li>
            </ul>
        `;

        // Append styles and navbar to shadow DOM
        shadow.appendChild(style);
        shadow.appendChild(navbar);

        // Highlight current page
        const currentPage = window.location.pathname;
        const links = shadow.querySelectorAll('a');

        // Sortiere nach längstem Pfad zuerst, um spezifischere Übereinstimmungen zu bevorzugen
        const sortedLinks = Array.from(links).sort((a, b) => b.getAttribute('href').length - a.getAttribute('href').length);

        for (const link of sortedLinks) {
            const href = link.getAttribute('href');

            // Markiere als aktiv, wenn href Teil des aktuellen Pfads ist
            if (currentPage.startsWith(href)) {
                link.classList.add('active');
                break; // Nur den ersten passenden Link markieren
            }
        }

        function toggleNavbar() {
            const nav = shadow.querySelector('.navigation-bar');
            nav.classList.toggle('hide');
        }
        shadow.querySelector('.navPokeball').addEventListener('click', toggleNavbar);
    }
}


// Define the custom element
customElements.define('custom-navbar', CustomNavbar);