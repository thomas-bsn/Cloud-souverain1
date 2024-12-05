// Définir les en-têtes de connexion
const connectionHeaders = {
    'heart-beat': '5000,0',
    host: '/',
    'client-id': 'thomas-david',
    login: 'b3935f56-98da-4d38-ab19-6a44660cdb11',
    passcode: "$h~$7p4!:q=LtCuNHqG4G%q\\"
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

// Définir les en-têtes de souscription
const subscribeHeaders = {
    destination: '/topic/3dsevents.R1132102747346.3DSpace.user',
    'activemq.subscriptionName': 'thomas-david-subscription',
    ack: 'client-individual'
};

// Exporter les configurations
module.exports = {
    connectionHeaders,
    servers,
    subscribeHeaders
};
