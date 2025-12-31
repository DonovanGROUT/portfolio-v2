# ===================================================================

# GUIDE DE TEST - INTÉGRATION PORTFOLIO → COMMITSHIFT

# ===================================================================

# Instructions pour tester le formulaire Contact avec le workflow n8n

# ===================================================================

## 🎯 Objectif

Tester l'intégration bout en bout : Formulaire Portfolio → API Contact → n8n CommitShift → Baserow/InvoiceNinja/Mailhog

---

## ⚙️ Configuration Prérequise

### 1. **Variables d'environnement**

```bash
# Fichier: .env.local (déjà créé)
COMMITSHIFT_WEBHOOK_URL=http://localhost:5678/webhook/portfolio-contact
DEBUG_API_CONTACT=true
```

### 2. **Démarrage des services CommitShift**

```bash
# Dans le terminal CommitShift (J:\Freelance\CommitShift\infra)
cd J:\Freelance\CommitShift\infra

# CONFIGURATION RECOMMANDÉE - Services essentiels uniquement :
docker-compose -f docker-compose.local.yml up -d

# OU avec limites mémoire (recommandé si ressources limitées) :
# docker-compose -f docker-compose.local.yml -f docker-compose.memory.yml up -d

# NE PAS utiliser docker-compose.mcp.yml sauf si vous testez le serveur MCP base de données

# Vérifier que tous les services fonctionnent :
# - n8n: http://localhost:5678
# - Baserow: http://localhost:8080
# - InvoiceNinja: http://localhost:8000
# - Mailhog: http://localhost:8025
```

### 3. **Configuration du workflow n8n**

- Ouvrir n8n : http://localhost:5678
- Créer ou importer le workflow "portfolio-contact"
- Configurer le webhook avec l'URL : `/webhook/portfolio-contact`
- Activer le workflow

---

## 🚀 Démarrage du Portfolio

### 1. **Terminal Portfolio**

```bash
# Dans le terminal portfolio (J:\Freelance\portfolio-v2)
cd J:\Freelance\portfolio-v2
npm run dev

# Le portfolio sera accessible sur : http://localhost:3000
```

---

## 🧪 Tests d'Intégration

### 1. **Test de la page Contact**

1. Ouvrir : http://localhost:3000/contact
2. Vérifier que le formulaire s'affiche correctement
3. Tester la validation (champs requis, formats email, etc.)

### 2. **Test de l'API Contact**

```bash
# Test direct de l'API avec curl
curl -X POST http://localhost:3000/api/contact \
  -H "Content-Type: application/json" \
  -d '{
    "firstName": "Test",
    "lastName": "Portfolio",
    "email": "test@example.com",
    "subject": "technical",
    "message": "Test d'\''intégration Portfolio → CommitShift"
  }'
```

### 3. **Test bout en bout complet**

1. **Remplir le formulaire Contact :**
   - Nom : "Grout"
   - Prénom : "Donovan"
   - Email : "donovan.test@example.com"
   - Sujet : "Question technique"
   - Message : "Test d'intégration CommitShift"
   - ✅ Accepter la politique de confidentialité

2. **Cliquer "Envoyer le message"**

3. **Vérifier la chaîne complète :**
   - ✅ Message de succès dans le portfolio
   - ✅ Log API dans la console Next.js
   - ✅ Exécution du workflow dans n8n
   - ✅ Création d'entrée dans Baserow
   - ✅ Génération de facture dans InvoiceNinja
   - ✅ Email reçu dans Mailhog

---

## 🔍 Points de Vérification

### 1. **Console Next.js (Terminal portfolio)**

```bash
# Doit afficher :
Contact traité: {
  timestamp: "2025-09-19T...",
  subject: "technical",
  company: "N/A",
  success: true
}
```

### 2. **n8n Workflow (http://localhost:5678)**

- Aller dans "Executions"
- Vérifier qu'une nouvelle exécution apparaît
- Vérifier que tous les nœuds sont verts (succès)

### 3. **Baserow (http://localhost:8080)**

- Aller dans la table "Contacts" ou équivalent
- Vérifier qu'une nouvelle ligne a été ajoutée
- Vérifier que toutes les données sont correctes

### 4. **InvoiceNinja (http://localhost:8000)**

- Aller dans "Clients" ou "Factures"
- Vérifier qu'un nouveau client/facture a été créé

### 5. **Mailhog (http://localhost:8025)**

- Vérifier qu'un email de notification a été reçu
- Vérifier le contenu de l'email

---

## 🐛 Dépannage

### Erreur "COMMITSHIFT_WEBHOOK_URL non configuré"

- Vérifier que `.env.local` existe et contient la variable
- Redémarrer `npm run dev`

### Erreur de connexion webhook

- Vérifier que n8n fonctionne : `curl http://localhost:5678`
- Vérifier que le workflow est actif
- Vérifier l'URL du webhook dans n8n

### Pas de données dans Baserow/InvoiceNinja

- Vérifier les logs n8n pour les erreurs
- Vérifier les connexions aux bases de données
- Tester chaque nœud individuellement dans n8n

---

## 📊 URL de Test

### Portfolio

- **Page Contact** : http://localhost:3000/contact
- **API Contact** : http://localhost:3000/api/contact

### CommitShift Services

- **n8n** : http://localhost:5678
- **Baserow** : http://localhost:8080
- **InvoiceNinja** : http://localhost:8000
- **Mailhog** : http://localhost:8025

---

## ✅ Critères de Réussite

1. ✅ Formulaire Portfolio fonctionnel
2. ✅ API Portfolio valide et sécurise les données
3. ✅ Webhook n8n reçoit les données
4. ✅ Workflow n8n s'exécute sans erreur
5. ✅ Données créées dans Baserow
6. ✅ Client/Facture créé dans InvoiceNinja
7. ✅ Email de notification envoyé via Mailhog
8. ✅ Feedback utilisateur correct dans le portfolio

Une fois tous ces points validés, l'intégration Portfolio → CommitShift sera opérationnelle ! 🎉
