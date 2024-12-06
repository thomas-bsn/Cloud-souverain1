const { connectToStomp } = require('./services/stompManager');

console.log("Application démarrée");
connectToStomp();
