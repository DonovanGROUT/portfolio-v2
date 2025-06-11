# 🚀 Phase 2 : Configuration CI/CD Portfolio

**Statut :** ✅ **TERMINÉE**  
**Objectif :** Mise en place d'un pipeline CI/CD professionnel avec déploiement automatique vers PlanetHoster

## 📋 Configuration retenue

### Pipeline CI/CD simplifié et pratique

✅ **2 workflows GitHub Actions** :

- `ci.yml` - Tests qualité et sécurité (< 5 min)
- `deploy.yml` - Déploiement PlanetHoster via SSH/SFTP sécurisé

✅ **Tests de qualité** :

- Formatage Prettier ✅
- Linting ESLint strict ✅
- Tests unitaires Vitest (100% réussite) ✅
- Build Next.js ✅
- Coverage code ≥ 80% ✅

✅ **Audit sécurité** :

- Vulnérabilités npm audit ✅
- Scan audit-ci des dépendances ✅

✅ **Performance** (optionnel) :

- Tests Lighthouse informatifs ✅

## 🔑 Configuration PlanetHoster

### Secrets GitHub requis

Dans `Settings > Secrets and variables > Actions` :

```bash
PLANETHOSTER_HOST = [serveur].n0c.com
PLANETHOSTER_USERNAME = [nom-utilisateur-planethoster]
PLANETHOSTER_SSH_PRIVATE_KEY = [votre clé SSH privée]
PLANETHOSTER_PORT = 5022
PLANETHOSTER_PATH = /public_html
```

### Test de connexion SSH

```bash
# Tester manuellement la connexion SSH avant config GitHub
ssh -p 5022 [nom-utilisateur-planethoster]@[serveur].n0c.com
# Vérifier accès au répertoire /public_html
```

## 🔄 Workflow GitFlow

```bash
main        → Déploiement automatique PlanetHoster
  ↑
develop     → Tests CI obligatoires
  ↑
feature/*   → Tests CI sur Pull Request
```

## 📊 Quality Gates

### ✅ Obligatoires (bloquent le merge)

- Tests unitaires : 100% réussite
- ESLint strict : 0 warning
- Prettier : Code formaté
- TypeScript : 0 erreur
- Build : Compilation OK
- Sécurité : Vulnérabilités critiques/importantes = 0

### 📈 Informatifs (non-bloquants)

- Coverage : Affiché (≥ 80% recommandé)
- Lighthouse : Scores performance/accessibilité
- Bundle size : Surveillance

## 🛠️ Commands locales

```bash
# Reproduire le CI en local
npm run check              # Quality check complet
npm audit --audit-level high  # Security check
npm run build             # Test compilation

# Tests individuels
npm run format:check      # Prettier
npm run lint:strict       # ESLint
npm run test:run          # Tests unitaires
npm run test:coverage     # Coverage
```

## 🚨 Résolution problèmes

### ❌ CI échoue

1. **Tests** : `npm run test:run`
2. **Format** : `npm run format`
3. **Lint** : `npm run lint:fix`
4. **Build** : `npm run build`

### ❌ Déploiement échoue

1. Vérifier secrets PlanetHoster dans GitHub
2. Tester connexion SSH manuellement (port 5022)
3. Vérifier permissions dossier /public_html

## 🎯 Prochaines étapes

1. **✅ Phase 2 terminée** - Pipeline CI/CD opérationnel
2. **Configurer secrets** PlanetHoster dans GitHub
3. **Premier test** de déploiement
4. **Commencer Phase 3** - Développement composants TDD

---

**🚀 Configuration simple, efficace et adaptée à nos vrais besoins !**
