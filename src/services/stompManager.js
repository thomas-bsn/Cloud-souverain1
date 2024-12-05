const stompit = require('stompit');
const { connectionHeaders, servers, subscribeHeaders } = require('../config/stompConfig');
const { handleMessage } = require('./messageHandler');

function connectToStomp() {
    const manager = new stompit.ConnectFailover(
        servers.map(server => ({ ...server, connectHeaders: connectionHeaders })),
        {
            initialReconnectDelay: 100,
            maxReconnectDelay: 30000,
            useExponentialBackOff: true,
            maxReconnects: 30,
            randomize: false
        }
    );

    manager.connect((error, client) => {
        if (error) {
            console.error('Erreur de connexion STOMP:', error.message);
            return;
        }
        console.log('Connecté au serveur STOMP');
        subscribeToTopic(client);
    });
}

function subscribeToTopic(client) {
    client.subscribe(subscribeHeaders, (error, message) => {
        if (error) {
            console.error('Erreur de souscription:', error.message);
            return;
        }

        message.readString('utf-8', (error, body) => {
            if (error) {
                console.error('Erreur de lecture du message:', error.message);
                return;
            }
            console.log('Message reçu:', body);
            handleMessage(body);
            client.ack(message); // Accuser réception du message
        });
    });
}

module.exports = { connectToStomp };
