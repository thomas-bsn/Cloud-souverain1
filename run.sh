#!/bin/bash

# Construire l'image Docker
echo "Construction de l'image Docker..."
docker build -t cloud-souverain .

# Vérifier si la construction a réussi
if [ $? -eq 0 ]; then
    echo "Image Docker construite avec succès."
else
    echo "Erreur lors de la construction de l'image Docker."
    exit 1
fi

# Lancer le conteneur Docker
echo "Lancement du conteneur Docker..."
docker run -p 4242:4242 -p 3000:3000 --name cloud-souverain-container -d cloud-souverain

# Vérifier si le conteneur s'est lancé avec succès
if [ $? -eq 0 ]; then
    echo "Conteneur Docker lancé avec succès."
    echo "Frontend accessible sur http://localhost:3000"
else
    echo "Erreur lors du lancement du conteneur Docker."
    exit 1
fi
