const WebSocket = require('ws');

const wss = new WebSocket.Server({ port: 4242 }); 

wss.on('connection', (ws) => {
    console.log('Client connecté au WebSocket.');
    ws.send(JSON.stringify({ message: 'Bienvenue sur le WebSocket' }));
});

function broadcastEvent(event) {
    wss.clients.forEach((client) => {
        if (client.readyState === WebSocket.OPEN) {
            client.send(JSON.stringify(event));
        }
    });
}

module.exports = { broadcastEvent };
