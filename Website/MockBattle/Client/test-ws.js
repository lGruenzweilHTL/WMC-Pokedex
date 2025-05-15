const url = 'http://localhost:5052/battle/start';

const data = {
    "player1": {
        "name": "Player 1",
        "human": true,
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
    "player2": {
        "name": "Player 2",
        "human": false,
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
}

fetch(url, {
    method: 'POST',
    body: JSON.stringify(data),
    headers: {
        'Content-Type': 'application/json'
    },
})
    .then(response => response.json())
    .then(data => {
        console.log("Player 1: ", data.player1);
        console.log("Player 2: ", data.player2);

        const socketUrl = data.websocket_url;
        const socket = new WebSocket(socketUrl);

        // Handle WebSocket events
        socket.onopen = () => {
            console.log('WebSocket connection established');

            // Send a message to the server
            const message = {
                type: 'message',
                content: 'Hello from the client!'
            };
            socket.send(JSON.stringify(message));
        };

        socket.onmessage = (event) => {
            console.log('Message received:', event.data);
        };

        socket.onerror = (error) => {
            console.error('WebSocket error:', error);
        };

        socket.onclose = () => {
            console.log('WebSocket connection closed');
        };
    })
    .catch(error => console.error('Error:', error));