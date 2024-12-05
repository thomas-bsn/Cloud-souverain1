const { connectToStomp } = require('./services/stompManager');

// Lancer l'application
console.log("Application démarrée");
connectToStomp();
