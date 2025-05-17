const url = 'http://localhost:5052/battle/start/new';

const data = {
    "players": [
        {
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
        {
            "name": "Player 2",
            "human": false,
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
    ],
};

fetch(url, {
    method: 'POST',
    body: JSON.stringify(data),
    headers: {
        'Content-Type': 'application/json'
    },
})
    .then(response => response.json())
    .then(data => {
        console.log("Players: ", data.players);

        const socketUrl = data.websocket_url;
        const battleGuid = data.battle_guid;
        // You need to know the player_guid for the player you want to control.
        // This should be returned by the server or tracked after join.
        const player1Guid = data.players[0].guid;

        const socket = new WebSocket(socketUrl);

        socket.onopen = () => {
            console.log('WebSocket connection established');

            sendAttackMessage();
        };

        socket.onmessage = (event) => {
            console.log('Message received:', event.data);

            if (event.data === "done") // if the turn is completed
                sendAttackMessage(); // send the next move
        };

        socket.onerror = (error) => {
            console.error('WebSocket error:', error);
        };

        socket.onclose = () => {
            console.log('WebSocket connection closed');
        };

        function sendAttackMessage() {
            const message = {
                "type": "attack",
                "object": "Flamethrower",
                "battle_guid": battleGuid,
                "player_guid": player1Guid
            };
            socket.send(JSON.stringify(message));
        }
    })
    .catch(error => console.error('Error:', error));