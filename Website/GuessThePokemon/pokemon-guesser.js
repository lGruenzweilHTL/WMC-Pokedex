const allPokemonNames = [
  "bulbasaur", "ivysaur", "venusaur",
  "charmander", "charmeleon", "charizard",
  "squirtle", "wartortle", "blastoise",
  "caterpie", "metapod", "butterfree",
  "weedle", "kakuna", "beedrill",
  "pidgey", "pidgeotto", "pidgeot",
  "rattata", "raticate", "spearow", "fearow",
  "ekans", "arbok", "pikachu", "raichu",
  "sandshrew", "sandslash", "nidoran♀", "nidorina", "nidoqueen",
  "nidoran♂", "nidorino", "nidoking", "clefairy", "clefable",
  "vulpix", "ninetales", "jigglypuff", "wigglytuff", "zubat", "golbat",
  "oddish", "gloom", "vileplume", "paras", "parasect",
  "venonat", "venomoth", "diglett", "dugtrio", "meowth", "persian",
  "psyduck", "golduck", "mankey", "primeape", "growlithe", "arcanine",
  "poliwag", "poliwhirl", "poliwrath", "abra", "kadabra", "alakazam",
  "machop", "machoke", "machamp", "bellsprout", "weepinbell", "victreebel",
  "tentacool", "tentacruel", "geodude", "graveler", "golem", "ponyta",
  "rapidash", "slowpoke", "slowbro", "magnemite", "magneton",
  "farfetch’d", "doduo", "dodrio", "seel", "dewgong", "grimer", "muk",
  "shellder", "cloyster", "gastly", "haunter", "gengar", "onix", "drowzee",
  "hypno", "krabby", "kingler", "voltorb", "electrode", "exeggcute",
  "exeggutor", "cubone", "marowak", "hitmonlee", "hitmonchan", "lickitung",
  "koffing", "weezing", "rhyhorn", "rhydon", "chansey", "tangela",
  "kangaskhan", "horsea", "seadra", "goldeen", "seaking", "staryu",
  "starmie", "mr. mime", "scyther", "jynx", "electabuzz", "magmar",
  "pinsir", "tauros", "magikarp", "gyarados", "lapras", "ditto",
  "eevee", "vaporeon", "jolteon", "flareon", "porygon", "omanyte",
  "omastar", "kabuto", "kabutops", "aerodactyl", "snorlax", "articuno",
  "zapdos", "moltres", "dratini", "dragonair", "dragonite", "mewtwo", "mew"
];

let correctNames = [];
let englishName = "";
let correct = false;

document.addEventListener("DOMContentLoaded", async function () {
    const guessInput = document.getElementById("guess-input");
    const guessButton = document.getElementById("submit-guess");
    const revealButton = document.getElementById("reveal-button");
    const nextButton = document.getElementById("next-button");
    const hintButton = document.getElementById("hint");
    const ghostText = document.getElementById("ghost-text");

    let isLoading = false;
    let hintIndex = 0;

    guessButton.addEventListener("click", submit);
    nextButton.addEventListener("click", newImage);
    revealButton.addEventListener("click", reveal);
    hintButton.addEventListener("click", showHint);

    guessInput.addEventListener("input", () => {
        const input = guessInput.value.toLowerCase();
        const match = allPokemonNames.find(name => name.startsWith(input) && name !== input);
        if (input && match) {
            ghostText.textContent = match;
        } else {
            ghostText.textContent = "";
        }
    });

    guessInput.addEventListener("keydown", (event) => {
        if (event.key === "Enter") {
            if (correct || guessInput.value === "") newImage();
            else submit();
        } else if (event.key === "Tab") {
            event.preventDefault();
            const input = guessInput.value.toLowerCase();
            const match = allPokemonNames.find(name => name.startsWith(input) && name !== input);
            if (match) {
                guessInput.value = match;
                ghostText.textContent = "";
            }
        }
    });

    await getBlackoutImage();

    function submit() {
        const userGuess = guessInput.value.trim().toLowerCase();

        if (correctNames.includes(userGuess)) {
            revealImage();
            console.log("Correct guess:", userGuess);
        } else {
            triggerShake(document.body);
            guessInput.value = "";
        }
    }

    function reveal() {
        revealImage();
        guessButton.disabled = true;
        guessInput.disabled = true;
        guessInput.value = "It's a " + englishName;
        ghostText.textContent = "";
    }

    function showHint() {
        if (hintIndex < englishName.length) {
            let hint = englishName
                .split('')
                .map((char, idx) => (idx <= hintIndex ? char : '_'))
                .join('');
            guessInput.value = hint;
            ghostText.textContent = "";
            hintIndex++;
        }
    }

    async function newImage() {
        if (isLoading) return;
        isLoading = true;

        guessButton.disabled = false;

        guessInput.value = "";
        ghostText.textContent = "";
        guessInput.disabled = true;
        nextButton.disabled = true;

        correct = false;
        await getBlackoutImage();

        guessInput.disabled = false;
        nextButton.disabled = false;
        guessInput.focus();

        isLoading = false;
        hintIndex = 0;
    }
});

async function getBlackoutImage() {
    const randomIndex = getRandomIndex(1, 151);
    const pokemonImage = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${randomIndex}.png?timestamp=${Date.now()}`;

    const image = document.getElementById("blackout-image");
    image.src = pokemonImage;
    image.onload = hideImage;

    await fetchPokemonNames(randomIndex);
}

async function fetchPokemonNames(id) {
    const url = `https://pokeapi.co/api/v2/pokemon/${id}`;
    const data = await (await fetch(url)).json();

    const speciesData = await (await fetch(data.species.url)).json();
    correctNames = speciesData.names.map((name) => name.name.toLowerCase());
    englishName = speciesData.names.find((name) => name.language.name === "en").name.toLowerCase();
}

function hideImage() {
    const image = document.getElementById("blackout-image");
    image.style.transition = "none";
    image.style.filter = "brightness(0)";
}

function revealImage() {
    correct = true;
    const image = document.getElementById("blackout-image");
    image.style.transition = "filter 0.5s ease-in-out";
    image.style.filter = "none";
}

function triggerShake(element) {
    element.classList.add('shake');
    element.addEventListener('animationend', () => {
        element.classList.remove('shake');
    }, { once: true });
}

function getRandomIndex(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
