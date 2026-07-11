#!/bin/sh

echo "=================================================="
echo "Initialisation du modèle d'IA pour le Portfolio..."
echo "=================================================="

# Attendre que le service Ollama réponde
echo "Attente du démarrage du service Ollama sur le conteneur 'ollama'..."
until env OLLAMA_HOST=ollama ollama list >/dev/null 2>&1; do
  sleep 2
done

echo "Service Ollama actif !"

echo "1. Synchronisation du modèle de base llama3.2:3b..."
env OLLAMA_HOST=ollama ollama pull llama3.2:3b

echo "2. Création / Mise à jour du modèle personnalisé 'justin-ia' avec le Modelfile..."
env OLLAMA_HOST=ollama ollama create justin-ia -f /tmp/Modelfile

echo "=================================================="
echo "Modèle 'justin-ia' mis à jour et prêt !"
echo "=================================================="
