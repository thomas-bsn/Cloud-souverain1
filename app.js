const stompit = require('stompit');

// Fonction principale pour gérer la connexion STOMP
function handleStompit() {
    // Définir les en-têtes de connexion
    const connectionHeaders = {
        'heart-beat': '5000,0',
        host: '/',
        'client-id': 'thomas-david', // Remplacez par votre ID unique
        login: 'b3935f56-98da-4d38-ab19-6a44660cdb11',
        passcode: "$h~$7p4!:q=LtCuNHqG4G%q\""
    };

    // Définir les serveurs STOMP
    const servers = [
        {
            ssl: true,
            host: 'eu1-msgbus.3dexperience.3ds.com',
            port: 80,
            connectHeaders: connectionHeaders
        },
        {
            ssl: true,
            host: 'eu1-msgbus-1.3dexperience.3ds.com',
            port: 80,
            connectHeaders: connectionHeaders
        }
    ];

    // Initialiser la connexion STOMP
    const manager = new stompit.ConnectFailover(servers, {
        initialReconnectDelay: 100, // Délai initial de reconnexion
        maxReconnectDelay: 30000,  // Délai max de reconnexion
        useExponentialBackOff: true,
        maxReconnects: 30,         // Nombre maximum de tentatives
        randomize: false           // Pas de randomisation des connexions
    });

    // Ouvrir une session STOMP
    manager.connect((error, client, reconnect) => {
        if (error) {
            console.error('Erreur de connexion STOMP:', error.message);
            return;
        }
        console.log('Connecté au serveur STOMP');

        // Appeler la fonction pour s'abonner et gérer les messages
        subscribeToTopic(client);
    });
}

// Fonction pour souscrire à un topic et lire les messages
function subscribeToTopic(client) {
    const subscribeHeaders = {
        destination: '/topic/3dsevents.R1132102747346.3DSpace.user', // Le topic à écouter
        'activemq.subscriptionName': 'thomas-david-subscription', // Nom unique de la souscription
        ack: 'client-individual' // Mode d'accusé de réception
    };

    client.subscribe(subscribeHeaders, (error, message) => {
        if (error) {
            console.error('Erreur de souscription:', error.message);
            return;
        }

        // Lire le contenu du message reçu
        message.readString('utf-8', (error, body) => {
            if (error) {
                console.error('Erreur de lecture du message:', error.message);
                return;
            }
            console.log('Message reçu:', body);

            // Traiter le message ici (exemple : extraire un champ spécifique)
            processMessage(body);

            // Accuser réception
            client.ack(message);
        });
    });
}

// Fonction pour traiter les messages
function processMessage(messageBody) {
    try {
        // Convertir le message JSON en objet
        const message = JSON.parse(messageBody);

        // Extraire un champ spécifique, par exemple "title"
        if (message.title) {
            console.log(`Titre du message : ${message.title}`);
        } else {
            console.log("Le message ne contient pas de champ 'title'.");
        }
    } catch (error) {
        console.error("Erreur lors du traitement du message :", error.message);
    }
}

// Lancer la fonction principale
handleStompit();
