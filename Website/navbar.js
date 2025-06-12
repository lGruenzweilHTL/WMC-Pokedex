class CustomNavbar extends HTMLElement {
  static get observedAttributes() {
    return ['active']; // watch for changes to 'active' attribute
  }

  constructor() {
    super();

    this.shadow = this.attachShadow({ mode: 'open' });

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
          cursor: pointer;
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

    this.shadow.appendChild(style);
    this.shadow.appendChild(navbar);

    this.navbar = navbar;
  }

  connectedCallback() {
    this.updateActiveLink();
    this.shadow.querySelector('.navPokeball').addEventListener('click', () => {
      this.navbar.classList.toggle('hide');
    });
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (name === 'active' && oldValue !== newValue) {
      this.updateActiveLink();
    }
  }

  updateActiveLink() {
    const activePath = this.getAttribute('active') || window.location.pathname;

    this.shadow.querySelectorAll('a').forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === activePath) {
        link.classList.add('active');
      }
    });
  }
}

customElements.define('custom-navbar', CustomNavbar);
