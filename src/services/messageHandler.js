const { fetchDocument } = require('./documentService');
const { broadcastEvent } = require('../websocketServer');


function createDisplayData(requete) {
    const dataelements = requete?.data[0]?.dataelements || {};
    const ownerInfo = requete?.data[0]?.relateddata?.ownerInfo?.[0]?.dataelements || {};

    return {
        title: dataelements.title || "",
        name: dataelements.name || "",
        type: dataelements.typeNLS || "",
        state: dataelements.stateNLS || "",
        revision: dataelements.revision || "",
        description: dataelements.description || "",
        collabSpace: dataelements.collabSpaceTitle || "",
        created: new Date(dataelements.originated).toLocaleString() || "",
        modified: new Date(dataelements.modified).toLocaleString() || "",
        owner: `${ownerInfo.firstname || ""} ${ownerInfo.lastname || ""}`.trim() || "",
        relativePath: `${requete?.data[0]?.source}${requete?.data[0]?.relativePath}` || "",
    };
}

function prettyPrintDocumentData(documentData) 
{
    console.log("===== Détails du document =====");
    console.log(`Titre : ${documentData.title}`);
    console.log(`Nom : ${documentData.name}`);
    console.log(`Type : ${documentData.type}`);
    console.log(`État : ${documentData.state}`);
    console.log(`Révision : ${documentData.revision}`);
    console.log(`Description : ${documentData.description}`);
    console.log(`Espace collaboratif : ${documentData.collabSpace}`);
    console.log(`Créé le : ${documentData.created}`);
    console.log(`Modifié le : ${documentData.modified}`);
    console.log(`Propriétaire : ${documentData.owner}`);
    console.log(`Chemin relatif : ${documentData.relativePath}`);
    console.log("================================");
    console.log("\n");
}


async function handleMessage(messageBody) {
    try {
        const message = JSON.parse(messageBody);

        if (message.data) {
            const subject = message.data;
            const relativePath = subject.subject.relativePath;
            const sourceUrl = message.source;

            var requete = await fetchDocument(relativePath, sourceUrl);
            if (!requete) 
            {
                console.error("Erreur lors de la récupération entiere de la requete");
                return;    
            }

            // Créer la structure de données
            const documentData = createDisplayData(requete);

            // Afficher les données parsées
            prettyPrintDocumentData(documentData);

            broadcastEvent(documentData);

        } else {
            console.log("Le message ne contient pas les champs 'data'.");
        }
    } catch (error) {
        console.error("Erreur lors du traitement du message :", error.message);
    }
}

module.exports = { handleMessage };