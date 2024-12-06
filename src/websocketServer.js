const WebSocket = require('ws');

const wss = new WebSocket.Server({ port: 4242 }); // Serveur WebSocket

// Gestion des nouvelles connexions
wss.on('connection', (ws) => {
    console.log('Client connecté au WebSocket.');
    ws.send(JSON.stringify({ message: 'Bienvenue sur le WebSocket' }));
});

// Fonction pour diffuser les événements à tous les clients connectés
function broadcastEvent(event) {
    wss.clients.forEach((client) => {
        if (client.readyState === WebSocket.OPEN) {
            client.send(JSON.stringify(event)); // Envoie de l'événement au client
        }
    });
}

module.exports = { broadcastEvent };
