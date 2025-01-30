let playerActionSelect;
let playerMoveSelect;
let playerPokemonSelect;
let playerItemSelect;
let selectGroup;

document.addEventListener("DOMContentLoaded", initContainers);

function initContainers() {
    playerActionSelect = document.getElementById("action-select");
    playerMoveSelect = document.getElementById("move-select");
    playerPokemonSelect = document.getElementById("pokemon-select");
    playerItemSelect = document.getElementById("item-select");
    selectGroup = [playerActionSelect, playerMoveSelect, playerPokemonSelect, playerItemSelect];
}

function showPlayerActionSelect() {
    hideAll();
    playerActionSelect.style.display = "block";
}

function hidePlayerActionSelect() {
    showPlayerActionSelect();
}

function showPlayerMoveSelect() {
    hideAll();
    playerMoveSelect.style.display = "block";
}

function hidePlayerMoveSelect() {
    showPlayerActionSelect();
}

function showPlayerPokemonSelect() {
    hideAll();
    playerPokemonSelect.style.display = "block";
}

function hidePlayerPokemonSelect() {
    showPlayerActionSelect();
}

function showPlayerItemSelect() {
    hideAll();
    playerItemSelect.style.display = "block";
}

function hidePlayerItemSelect() {
    showPlayerActionSelect();
}

function hideAll() {
    // A little inefficient, but it's needed for the message box to work
    const elementsToHide = selectGroup.filter(select => select.style.display === "block");
    elementsToHide.forEach(select => select.style.display = "none");
    return elementsToHide;
}