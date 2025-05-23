let correctNames = []; // Names in all languages
let englishName = ""; // English name (used only for reveal)
let correct = false;

document.addEventListener("DOMContentLoaded", async function () {
    const guessInput = document.getElementById("guess-input");
    const guessButton = document.getElementById("submit-guess");
    const revealButton = document.getElementById("reveal-button");
    const nextButton = document.getElementById("next-button");
    const hintButton = document.getElementById("hint");

    let isLoading = false; // Prevent spamming
    let hintIndex = 0; 

    // Event listeners
    guessButton.addEventListener("click", submit);
    guessInput.addEventListener("keydown", (event) => {
        if (event.key === "Enter") {
            if (correct || guessInput.value === "") newImage();
            else submit();
        }
    });
    nextButton.addEventListener("click", newImage);
    revealButton.addEventListener("click", reveal);
    hintButton.addEventListener("click", showHint);

    // Load the first Pokémon image
    await getBlackoutImage();

    // Submit guess logic
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
    }

    function showHint() {
        if (hintIndex < englishName.length) {
            let hint = englishName
                .split('')
                .map((char, idx) => (idx <= hintIndex ? char : '_'))
                .join('');
            guessInput.value = hint;
            hintIndex++;
        }
    }

    async function newImage() {
        if (isLoading) return; // Prevent multiple triggers
        isLoading = true;

        guessButton.disabled = false;

        guessInput.value = "";
        guessInput.disabled = true;
        nextButton.disabled = true;

        correct = false;
        await getBlackoutImage();

        guessInput.disabled = false;
        nextButton.disabled = false;
        guessInput.focus();

        isLoading = false;
        hintIndex = 0; // Reset hint index
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
    englishName = speciesData.names.find((name) => name.language.name === "en").name.toLowerCase();
}

// Hide the image (blackout effect)
function hideImage() {
    const image = document.getElementById("blackout-image");
    image.style.transition = "none";
    image.style.filter = "brightness(0)";
}

// Reveal the image
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

// Generate a random index within a range
function getRandomIndex(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}