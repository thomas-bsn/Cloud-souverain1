function handleMessage(messageBody) {
    try {
        const message = JSON.parse(messageBody);

        if (message.data) {
            const subject = message.data;

            if (subject.subject.title) {
                console.log(`Titre du document : ${subject.title}`);
            }
            if (subject.subject.type) {
                console.log(`Type du document : ${subject.author}`);
            }
            if (subject.user) {
                console.log(`Auteur du document : ${subject.user}`);
            }
            if (subject.subject.identifier) {
                console.log(`ID du document : ${subject.identifier}`);
            }
            if (subject.subject.relativePath) {
                console.log(`Chemin relatif du document : ${subject.relativePath}`);
            }
            if (subject.eventType) {
                console.log(`Type d'événement : ${subject.eventType}`);
            }
        } else {
            console.log("Le message ne contient pas les champs 'data'.");
        }
    } catch (error) {
        console.error("Erreur lors du traitement du message :", error.message);
    }
}


module.exports = { handleMessage };
