# Utiliser une image de base pour Node.js
FROM node:18

# Définir le répertoire de travail
WORKDIR /app

# Copier les fichiers package.json et package-lock.json pour installer les dépendances du backend
COPY ./package*.json ./
COPY ./src ./src

# Installer les dépendances du backend
RUN npm install

# Copier le frontend dans un sous-dossier
COPY ./frontend ./frontend

# Installer les dépendances du frontend
WORKDIR /app/frontend
RUN npm install

# Revenir au répertoire de travail du backend
WORKDIR /app

# Exposer les ports utilisés (par exemple, 4242 pour le WebSocket backend, 3000 pour React frontend)
EXPOSE 4242 3000

# Commande pour lancer à la fois le backend et le frontend
CMD ["sh", "-c", "npm start & cd frontend && npm start"]
