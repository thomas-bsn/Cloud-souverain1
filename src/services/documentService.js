const axios = require('axios');
const { connectionHeaders } = require('../config/stompConfig');

async function fetchDocumentTitle(relativePath, sourceUrl) {
    try {

        const url = `${sourceUrl}${relativePath}`;

        const headers = {
            Authorization: `Basic ${Buffer.from(`${connectionHeaders.login}:${connectionHeaders.passcode}`).toString('base64')}`
        };

        const response = await axios.get(url, { headers });
        const documentData = response.data;

        // console.log(documentData.data[0].dataelements);

        return documentData.data[0].dataelements.title || 'Titre non disponible';
    } catch (error) {
        console.error('Erreur lors de la récupération du titre:', error.message);
        return null;
    }
}

module.exports = { fetchDocumentTitle };
