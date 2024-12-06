const ws = new WebSocket('ws://localhost:4242'); // Connexion au WebSocket

ws.onopen = () => {
    console.log('Connecté au WebSocket.');
};

ws.onmessage = (event) => {
    const data = JSON.parse(event.data);

    const eventsDiv = document.getElementById('events');
    const eventDiv = document.createElement('div');
    eventDiv.className = 'event';
    eventDiv.innerHTML = `
        <strong>Titre :</strong> ${data.title}<br>
        <strong>Nom :</strong> ${data.name}<br>
        <strong>Type :</strong> ${data.type}<br>
        <strong>État :</strong> ${data.state}<br>
        <strong>Révision :</strong> ${data.revision}<br>
        <strong>Espace collaboratif :</strong> ${data.collabSpace}<br>
        <strong>Créé le :</strong> ${data.created}<br>
        <strong>Modifié le :</strong> ${data.modified}<br>
        <strong>Propriétaire :</strong> ${data.owner}
    `;
    eventsDiv.prepend(eventDiv);
};


ws.onclose = () => {
    console.log('Déconnecté du WebSocket.');
};

ws.onerror = (error) => {
    console.error('Erreur WebSocket :', error);
};
