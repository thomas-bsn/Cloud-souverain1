function handleMessage(messageBody) {
    try {
        const message = JSON.parse(messageBody);

        // Exemple de traitement : extraire le champ "title"
        if (message.title) {
            console.log(`Titre du message : ${message.title}`);
        } else {
            console.log("Le message ne contient pas de champ 'title'.");
        }

        // Vous pouvez ajouter d'autres traitements ici
    } catch (error) {
        console.error("Erreur lors du traitement du message :", error.message);
    }
}

module.exports = { handleMessage };
