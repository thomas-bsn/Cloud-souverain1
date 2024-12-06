const { fetchDocumentTitle } = require('./documentService');

async function handleMessage(messageBody) {
    try {
        const message = JSON.parse(messageBody);

        if (message.data) {
            const subject = message.data;
            const relativePath = subject.subject.relativePath;
            const sourceUrl = message.source;

            let nom_doc = 'Titre non disponible';
            // if (relativePath && sourceUrl) {
            //     nom_doc = await fetchDocumentTitle(relativePath, sourceUrl);
            // } else {
            //     console.warn('Chemin relatif ou source introuvable dans le message.');
            // }

            console.log(`Titre du document : ${nom_doc}`);
            console.log(`Type du document : ${subject.subject.type}`);
            console.log(`Auteur du document : ${subject.user}`);
            console.log(`ID du document : ${subject.subject.identifier}`);
            console.log(`Chemin relatif du document : ${subject.subject.relativePath}`);
            console.log(`Type d'événement : ${subject.eventType}`);
        } else {
            console.log("Le message ne contient pas les champs 'data'.");
        }
    } catch (error) {
        console.error("Erreur lors du traitement du message :", error.message);
    }
}

module.exports = { handleMessage };
