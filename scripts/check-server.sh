#!/bin/bash
# Script pour vérifier si le serveur Next.js tourne sur localhost:3000
# Si non, affiche un message d'erreur et quitte

set -e

echo "🔍 Vérification du serveur localhost:3000..."

if curl -s --connect-timeout 2 http://localhost:3000 > /dev/null 2>&1; then
    echo "✅ Serveur détecté sur localhost:3000"
    exit 0
else
    echo ""
    echo "❌ ERREUR: Aucun serveur détecté sur localhost:3000"
    echo ""
    echo "📋 Actions requises:"
    echo "   1. Lancer le build production: npm run build"
    echo "   2. Démarrer le serveur: npm start"
    echo "   3. Relancer cette commande"
    echo ""
    echo "💡 Commande rapide:"
    echo "   npm run build && npm start"
    echo ""
    exit 1
fi
