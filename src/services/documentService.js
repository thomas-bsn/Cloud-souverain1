const axios = require('axios');
const { connectionHeaders } = require('../config/stompConfig');

async function fetchDocumentTitle(relativePath, sourceUrl) {
    try {
        const baseUrl = sourceUrl.replace(/\/enovia$/, '');

        const url = `${baseUrl}${relativePath}`;

        const headers = {
            Authorization: `Basic ${Buffer.from(`${connectionHeaders.login}:${connectionHeaders.passcode}`).toString('base64')}`
        };

        const response = await axios.get(url, { headers });
        const documentData = response.data;
        // On print le documentData pour voir ce qu'il contient avec retour a la ligne \n\n
        console.log(`documentData : ${documentData}\n\n`);
        console.log(`documentData : ${response}\n\n`);

        return documentData.data?.title || 'Titre non disponible';
    } catch (error) {
        console.error('Erreur lors de la récupération du titre:', error.message);
        return null;
    }
}

module.exports = { fetchDocumentTitle };
