const stompit = require('stompit');
const { servers, subscribeHeaders } = require('../config/stompConfig');
const { handleMessage } = require('./messageHandler');

function connectToStomp() {
    console.log("Connexion au serveur STOMP...");

    const manager = new stompit.ConnectFailover(servers, 
    {
        initialReconnectDelay: 100,
        maxReconnectDelay: 30000,
        useExponentialBackOff: true,
        maxReconnects: 30,
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

function subscribeToTopic(client) 
{
    // TODO: Souscrire au topic
}

module.exports = { connectToStomp };
