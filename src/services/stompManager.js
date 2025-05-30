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

            // console.log('Message reçu:', body);

            try {
                handleMessage(body);

                client.ack(message);
                console.log('Message accusé de réception.');
            } catch (processingError) {
                console.error('Erreur pendant le traitement du message:', processingError.message);
            }
        });
    });

    console.log("Abonnement prêt. En attente des messages...");
}


module.exports = { connectToStomp };
