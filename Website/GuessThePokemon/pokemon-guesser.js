let correctNames = []; // Names in all languages

document.addEventListener("DOMContentLoaded", async function () {
    const guessInput = document.getElementById("guess-input");
    const guessButton = document.getElementById("submit-guess");
    const nextButton = document.getElementById("next-button");

    // Event listeners
    guessButton.addEventListener("click", submit);
    guessInput.addEventListener("keydown", (event) => {
        if (event.key === "Enter") submit();
    });
    nextButton.addEventListener("click", function () {
        guessInput.value = "";
        guessInput.focus();
        getBlackoutImage();
    });

    // Load the first Pokémon image
    await getBlackoutImage();

    // Submit guess logic
    function submit() {
        const userGuess = guessInput.value.trim().toLowerCase();

        if (correctNames.includes(userGuess)) {
            revealImage();
            console.log("Correct guess:", userGuess);
        } else {
            alert("Wrong guess. Try again!");
        }
    }
});

// Fetch and display a new Pokémon image
async function getBlackoutImage() {
    const randomIndex = getRandomIndex(1, 151);
    const pokemonImage = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${randomIndex}.png?timestamp=${Date.now()}`;

    const image = document.getElementById("blackout-image");
    image.src = pokemonImage;
    image.onload = hideImage;

    await fetchPokemonNames(randomIndex);
}

// Fetch Pokémon names in all languages
async function fetchPokemonNames(id) {
    const url = `https://pokeapi.co/api/v2/pokemon/${id}`;
    const data = await (await fetch(url)).json();

    const speciesData = await (await fetch(data.species.url)).json();
    correctNames = speciesData.names.map((name) => name.name.toLowerCase());
}

// Hide the image (blackout effect)
function hideImage() {
    const image = document.getElementById("blackout-image");
    image.style.transition = "none";
    image.style.filter = "brightness(0)";
}

// Reveal the image
function revealImage() {
    const image = document.getElementById("blackout-image");
    image.style.transition = "filter 0.5s ease-in-out";
    image.style.filter = "none";
}

// Generate a random index within a range
function getRandomIndex(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}