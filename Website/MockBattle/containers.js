let playerActionSelect;
let playerMoveSelect;
let playerPokemonSelect;
let selectGroup;

document.addEventListener("DOMContentLoaded", initContainers);

function initContainers() {
    playerActionSelect = document.getElementById("action-select");
    playerMoveSelect = document.getElementById("move-select");
    playerPokemonSelect = document.getElementById("pokemon-select");
    selectGroup = [playerActionSelect, playerMoveSelect, playerPokemonSelect];
}

function showPlayerActionSelect() {
    hideAll();
    playerActionSelect.style.display = "block";
}

function hidePlayerActionSelect() {
    playerActionSelect.style.display = "none";
    showPlayerActionSelect();
}

function showPlayerMoveSelect() {
    hideAll();
    playerMoveSelect.style.display = "block";
}

function hidePlayerMoveSelect() {
    playerMoveSelect.style.display = "none";
    showPlayerActionSelect();
}

function showPlayerPokemonSelect() {
    hideAll();
    playerPokemonSelect.style.display = "block";
}

function hidePlayerPokemonSelect() {
    playerPokemonSelect.style.display = "none";
    showPlayerActionSelect();
}

function hideAll() {
    // A little inefficient, but it's needed for the message box to work
    const elementsToHide = selectGroup.filter(select => select.style.display === "block");
    elementsToHide.forEach(select => select.style.display = "none");
    return elementsToHide;
}