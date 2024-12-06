import React, { useEffect, useState } from 'react';

function App() {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const ws = new WebSocket('ws://localhost:4242');
    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);

      // Filtrer les événements invalides
      if (data.title && data.title !== "Non disponible") {
        setEvents((prev) => [...prev, data]);
      } else {
        console.warn('Événement invalide reçu et ignoré :', data);
      }
    };

    ws.onerror = (error) => console.error('WebSocket Error:', error);
    ws.onclose = () => console.log('WebSocket fermé.');

    return () => ws.close();
  }, []);

  const handleDeleteEvent = (indexToRemove) => {
    setEvents((prev) => prev.filter((_, index) => index !== indexToRemove));
  };

  return (
    <div className="app">
      <h1>Événements reçus</h1>
      <ul>
        {events.map((event, index) => (
          <li
            key={index}
            style={{
              marginBottom: '20px',
              padding: '10px',
              border: '1px solid #ccc',
              borderRadius: '5px',
            }}
          >
            <h3>Détails du document :</h3>
            <p><strong>Titre :</strong> {event.title}</p>
            <p><strong>Nom :</strong> {event.name}</p>
            <p><strong>Type :</strong> {event.type}</p>
            <p><strong>État :</strong> {event.state}</p>
            <p><strong>Révision :</strong> {event.revision}</p>
            <p><strong>Description :</strong> {event.description}</p>
            <p><strong>Espace collaboratif :</strong> {event.collabSpace}</p>
            <p><strong>Créé le :</strong> {event.created}</p>
            <p><strong>Modifié le :</strong> {event.modified}</p>
            <p><strong>Propriétaire :</strong> {event.owner}</p>
            <div style={{ display: 'flex', gap: '10px' }}>
              {/* Bouton bleu pour rediriger vers le fichier */}
              <a
                href={event.relativePath}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  textDecoration: 'none',
                  backgroundColor: '#3498db',
                  color: 'white',
                  padding: '5px 10px',
                  borderRadius: '5px',
                  cursor: 'pointer',
                }}
              >
                Voir le fichier
              </a>

              {/* Bouton rouge pour supprimer l'événement */}
              <button
                onClick={() => handleDeleteEvent(index)}
                style={{
                  backgroundColor: '#e74c3c',
                  color: 'white',
                  border: 'none',
                  padding: '5px 10px',
                  borderRadius: '5px',
                  cursor: 'pointer',
                }}
              >
                Supprimer
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
