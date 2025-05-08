// Push a message and wait for the player to click spacebar
async function pushMessage(message) {
    const hidden = hideAll();

    displayMessage(message);

    console.log("Waiting for player to click spacebar or enter...");

    // Wait until player has clicked spacebar
    await new Promise(resolve => {
        document.addEventListener('keydown', event => {
            if (event.key === ' ' || event.key === 'Enter') {
                resolve();
            }
        });
    });

    console.log("Player clicked spacebar");

    // Re-display the previously hidden elements
    hidden.forEach(select => select.style.display = "block");
}

// Display a message without waiting for player input
function displayMessage(message) {
    let messageBox = document.getElementById('message-display');
    messageBox.innerText = message;
}