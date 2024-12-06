const axios = require('axios');
const { connectionHeaders } = require('../config/stompConfig');

async function fetchDocument(relativePath, sourceUrl) {
    try {

        const url = `${sourceUrl}${relativePath}`;

        const headers = {
            Authorization: `Basic ${Buffer.from(`${connectionHeaders.login}:${connectionHeaders.passcode}`).toString('base64')}`
        };

        const response = await axios.get(url, { headers });
        const documentData = response.data;

        // console.log(documentData.data[0].dataelements);

        return documentData
    } catch (error) {
        console.error('Erreur lors de la récupération du body:', error.message);
        return null;
    }
}

module.exports = { fetchDocument };
