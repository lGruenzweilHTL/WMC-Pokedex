const url = 'http://localhost:5052/battle/start/bot';
let battleGuid = null;
let websocketUrl = null;
let socket = null;

const data = {
    "player": {
        "name": "Player1",
        "pokemon": [
            {
                "name": "Charizard",
                "level": 50,
                "moves": [
                    "Flamethrower"
                ]
            }
        ]
    },
    "bot": {
        "name": "Bot1",
        "behaviour": "max",
        "pokemon": [
            {
                "name": "Blastoise",
                "level": 50,
                "moves": [
                    "Flamethrower"
                ]
            }
        ]
    }
};

function createBattle() {
    fetch(url, {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json'
        },
    })
        .then(response => response.json())
        .then(data => {
            console.log('Success:', data);
            websocketUrl = data.websocket_url;
            battleGuid = data.battle_guid;
        })
    .catch(error => console.error('Error:', error));
}

function connectWebSocket() {
    socket = new WebSocket(websocketUrl);

    socket.onopen = () => {
        console.log('WebSocket connection established');
    };

    socket.onmessage = (event) => {
        const message = JSON.parse(event.data);

        // Log as a table if it's an array or object
        if (Array.isArray(message) || typeof message === 'object') {
            console.table(message);
        } else {
            // Log as a string for other types
            console.log(message);
        }

        // Optionally, log the full object for debugging
        console.dir(message, { depth: null });
    };

    socket.onerror = (error) => {
        console.error('WebSocket error:', error);
    };

    socket.onclose = () => {
        console.log('WebSocket connection closed');
    };
}

function sendMessage() {
    const actionType = document.getElementById('type').value;
    const actionObject = document.getElementById('object').value;
    const message = {
        "type": actionType,
        "object": actionObject,
        "battle_guid": battleGuid
    };
    socket.send(JSON.stringify(message));
}





