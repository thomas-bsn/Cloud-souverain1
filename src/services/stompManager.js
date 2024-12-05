const stompit = require('stompit');
const { servers, subscribeHeaders } = require('../config/stompConfig');
const { handleMessage } = require('./messageHandler');

function connectToStomp() {
    console.log("Connexion au serveur STOMP...");

    const manager = new stompit.ConnectFailover(servers, {
        initialReconnectDelay: 100, 
        maxReconnectDelay: 30000, 
        useExponentialBackOff: true, 
        maxReconnects: 1,
        randomize: false 
    });

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
    console.log("Souscription au topic...");
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
