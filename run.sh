#!/bin/bash

# Nom du conteneur
CONTAINER_NAME="cloud-souverain-container"

# Vérifier si le conteneur existe déjà
if [ "$(docker ps -aq -f name=$CONTAINER_NAME)" ]; then
    echo "Un conteneur existant avec le nom $CONTAINER_NAME a été trouvé. Suppression en cours..."
    docker rm -f $CONTAINER_NAME
    if [ $? -eq 0 ]; then
        echo "Conteneur $CONTAINER_NAME supprimé avec succès."
    else
        echo "Erreur lors de la suppression du conteneur $CONTAINER_NAME."
        exit 1
    fi
fi

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
docker run -p 4242:4242 -p 3000:3000 --name $CONTAINER_NAME -d cloud-souverain

# Vérifier si le conteneur s'est lancé avec succès
if [ $? -eq 0 ]; then
    echo "Conteneur Docker lancé avec succès."
    echo "Frontend accessible sur http://localhost:3000"
    echo "Backend accessible sur http://localhost:4242"
else
    echo "Erreur lors du lancement du conteneur Docker."
    exit 1
fi
