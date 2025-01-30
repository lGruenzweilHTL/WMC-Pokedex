async function pushMessage(message) {
    const hidden = hideAll();

    let messageBox = document.getElementById('message-display');
    messageBox.innerText = message;

    console.log("Waiting for player to click spacebar...");

    // Wait until player has clicked spacebar
    await new Promise(resolve => {
        document.addEventListener('keydown', event => {
            if (event.key === ' ') {
                resolve();
            }
        });
    });

    console.log("Player clicked spacebar");

    // Re-display the previously hidden elements
    hidden.forEach(select => select.style.display = "block");
}