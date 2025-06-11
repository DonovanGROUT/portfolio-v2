# Glossaire Technique - Portfolio TDD

## 📚 Lexique des Tests et Développement

### A

**AAA Pattern** (Arrange-Act-Assert)
Structure recommandée pour écrire des tests :

- **Arrange** : Préparer les données et l'environnement
- **Act** : Exécuter l'action à tester
- **Assert** : Vérifier le résultat attendu

**Accessibility Testing**
Tests vérifiant que l'application est utilisable par les personnes en situation de handicap (respect WCAG).

**API (Application Programming Interface)**
Interface permettant à différents logiciels de communiquer entre eux.

**Assertion**
Vérification dans un test qui confirme qu'une condition est vraie. Ex: `expect(result).toBe(5)`

### B

**Black Box Testing**
Test où le testeur ne connaît pas l'implémentation interne du code testé.

**Browser Testing**
Tests exécutés dans un vrai navigateur web pour vérifier le comportement réel.

### C

#### CI/CD (Continuous Integration/Continuous Deployment)

- **CI** : Intégration continue des changements de code avec tests automatiques
- **CD** : Déploiement continu des changements validés en production

**Continuous Integration (CI)**
Pratique de développement où les changements de code sont intégrés fréquemment avec validation automatique.

**Continuous Deployment (CD)**
Extension du CI où les changements validés sont automatiquement déployés en production.

**Continuous Delivery**
Approche où le code est toujours dans un état déployable, mais le déploiement reste manuel.

**Code Coverage (Couverture de Code)**
Métrique indiquant le pourcentage de code exécuté par les tests :

- **Lines** : Pourcentage de lignes exécutées
- **Branches** : Pourcentage de branches conditionnelles testées
- **Functions** : Pourcentage de fonctions appelées
- **Statements** : Pourcentage d'instructions exécutées

**Component Testing**
Tests qui vérifient le comportement d'un composant React isolé.

**CSP (Content Security Policy)**
Mécanisme de sécurité empêchant l'exécution de scripts malveillants (protection XSS).

**CSRF (Cross-Site Request Forgery)**
Attaque où un site malveillant exécute des actions sur un autre site où l'utilisateur est connecté.

### D

**DOM (Document Object Model)**
Représentation en mémoire de la structure HTML d'une page web.

**Dummy Object**
Objet simple utilisé pour remplir des paramètres requis mais non utilisés dans le test.

### E

**E2E Testing (End-to-End)**
Tests qui simulent un parcours utilisateur complet, de l'interface jusqu'à la base de données.

**ESLint**
Outil d'analyse statique qui détecte et corrige les problèmes dans le code JavaScript/TypeScript.

### F

**Fake Object**
Objet avec une implémentation simplifiée qui fonctionne mais n'est pas adapté à la production.

**Flaky Test**
Test qui échoue de manière aléatoire sans changement de code (problème de stabilité).

### G

**GitHub Actions**
Service d'intégration continue et de déploiement continu intégré à GitHub permettant d'automatiser les workflows.

**GitFlow**
Modèle de workflow Git avec branches spécialisées :

- **main** : Production stable
- **develop** : Intégration des nouvelles fonctionnalités
- **feature/** : Développement de fonctionnalités
- **hotfix/** : Corrections urgentes en production

**Green Build**
État où tous les tests passent et le pipeline CI/CD est en succès (oppose de "Red Build").

### H

**Happy Path**
Scénario de test où tout se passe comme prévu, sans erreurs ni cas exceptionnels.

**Husky**
Outil qui permet d'exécuter des scripts lors des événements Git (pre-commit, pre-push hooks).

### I

**Integration Testing**
Tests vérifiant que plusieurs composants fonctionnent correctement ensemble.

**IntersectionObserver**
API du navigateur qui observe quand un élément entre ou sort de la zone visible (viewport).

### J

**Job (GitHub Actions)**
Ensemble d'étapes qui s'exécutent sur la même machine virtuelle dans un workflow CI/CD.

**jsdom**
Implémentation JavaScript du DOM, permettant de simuler un navigateur dans Node.js.

**Jest**
Framework de test JavaScript populaire (remplacé par Vitest dans notre projet).

### L

**Lighthouse**
Outil d'audit automatisé de Google pour mesurer les performances, l'accessibilité et le SEO des sites web.

**Linting**
Analyse statique du code pour détecter les erreurs, inconsistances et violations des standards de codage.

### M

**Matcher**
Fonction qui vérifie une condition dans un test. Ex: `toBeInTheDocument()`, `toHaveClass()`

**Mock**
Objet simulé qui remplace une dépendance réelle pendant les tests :

```javascript
// Mock d'une API
const mockFetch = vi.fn().mockResolvedValue({ data: "test" });
```

**Mocking**
Action de remplacer des dépendances réelles par des objets simulés pour isoler le code testé.

### P

**Pipeline**
Séquence automatisée d'étapes pour construire, tester et déployer une application.

**Playwright**
Framework pour les tests E2E qui automatise les navigateurs (Chrome, Firefox, Safari).

**Prettier**
Outil de formatage automatique du code pour maintenir un style cohérent.

**Pull Request (PR)**
Mécanisme pour proposer des changements de code et déclencher une revue avant fusion dans la branche principale.

### Q

**Quality Gate**
Point de contrôle dans le pipeline CI/CD qui vérifie que certains critères de qualité sont respectés avant de continuer.

### R

**Red Build**
État où le pipeline CI/CD échoue à cause de tests qui ne passent pas ou d'erreurs de build.

**Red-Green-Refactor**
Cycle TDD en 3 étapes :

1. **Red** : Écrire un test qui échoue
2. **Green** : Écrire le code minimal qui fait passer le test
3. **Refactor** : Améliorer le code sans casser les tests

**Regression Testing**
Tests qui vérifient que les nouvelles modifications n'ont pas cassé les fonctionnalités existantes.

**Rollback**
Action de revenir à une version précédente stable en cas de problème après déploiement.

### S

**Secret (GitHub)**
Variable chiffrée stockée de manière sécurisée pour les tokens d'API, mots de passe, etc.

**Snapshot Testing**
Test qui compare le rendu actuel d'un composant avec une "photo" sauvegardée.

**Spy**
Mock qui enregistre les appels (paramètres, nombre d'appels) sans remplacer l'implémentation.

**Stage**
Étape dans un pipeline de déploiement (ex: dev, staging, production).

**Stub**
Mock qui retourne des valeurs prédéfinies pour des appels de méthodes spécifiques.

### T

**TDD (Test-Driven Development)**
Méthodologie où les tests sont écrits avant le code de production.

**Test Double**
Terme générique pour tous les objets de test (mock, stub, spy, fake, dummy).

**Test Runner**
Outil qui exécute les tests et affiche les résultats (Vitest, Jest, etc.).

**Test Suite**
Groupe de tests liés, généralement organisés dans un bloc `describe()`.

**Testing Library**
Ensemble d'utilitaires pour tester les composants React de manière proche de l'utilisation réelle.

**TypeScript**
Sur-ensemble de JavaScript qui ajoute le typage statique pour détecter les erreurs avant l'exécution.

### U

**Unit Testing**
Tests qui vérifient le comportement d'une unité de code isolée (fonction, composant).

**User Event**
Simulation d'interactions utilisateur réalistes (clic, frappe, navigation).

### V

**Vercel**
Plateforme de déploiement optimisée pour les applications frontend (Next.js, React, etc.).

**Vitest**
Framework de test moderne et rapide, compatible avec Vite et similaire à Jest.

**Visual Regression Testing**
Tests qui détectent les changements visuels non désirés dans l'interface.

### W

**WCAG (Web Content Accessibility Guidelines)**
Standards internationaux pour l'accessibilité web (niveaux A, AA, AAA).

**Workflow (GitHub Actions)**
Fichier YAML définissant une série d'actions automatisées déclenchées par des événements Git.

**White Box Testing**
Test où le testeur connaît l'implémentation interne du code testé.

### X

**XSS (Cross-Site Scripting)**
Attaque où du code malveillant est injecté dans une page web pour voler des données.

---

## 🎯 Exemples Pratiques

### Mock vs Stub vs Spy

```javascript
// MOCK - Remplace complètement l'objet
const mockApi = vi.fn().mockReturnValue({ data: "mocked" });

// SPY - Observe les appels sans changer le comportement
const spy = vi.spyOn(console, "log");

// STUB - Retourne des valeurs prédéfinies
const stub = vi
  .fn()
  .mockReturnValueOnce("first call")
  .mockReturnValueOnce("second call");
```

### Types de Tests par Scope

```bash
┌─────────────────────────────────────┐
│            E2E Tests                │  ← Peu nombreux, lents, haute confiance
│         (Playwright)                │
├─────────────────────────────────────┤
│        Integration Tests            │  ← Moyennement nombreux, moyennement rapides
│     (Testing Library)               │
├─────────────────────────────────────┤
│          Unit Tests                 │  ← Très nombreux, très rapides, faible confiance
│         (Vitest)                    │
└─────────────────────────────────────┘
```

### Pyramid of Testing

```bash
        E2E
       /   \
    Integration
   /           \
  Unit Tests
 (Foundation)
```

---

## 📝 Conventions de Nommage

### Fichiers de Test

- `component.test.tsx` - Tests unitaires
- `component.spec.tsx` - Tests de spécification
- `component.e2e.ts` - Tests E2E
- `__tests__/component.test.tsx` - Alternative avec dossier

### Fonctions de Test

```javascript
// ✅ Bon - Descriptif et clair
it("should display error message when form is invalid");
it("renders navigation menu with correct links");
it("calls onSubmit when form is submitted");

// ❌ Mauvais - Trop vague
it("works correctly");
it("test 1");
it("should work");
```

---

## 🔗 Relations entre Concepts

**TDD** utilise → **Unit Tests** + **Integration Tests**
**CI/CD** exécute → **Tous les types de tests**
**Mocks** permettent → **Isolation** des **Unit Tests**
**E2E Tests** vérifient → **Happy Path** + **Edge Cases**
**Code Coverage** mesure → **Qualité des Tests**

---

## 🌐 Termes Spécifiques au Projet

**PlanetHoster**
Hébergeur web utilisé pour notre projet, avec serveurs N0c supportant SSH.

**Public_html**
Répertoire racine web où sont placés les fichiers accessibles publiquement sur le serveur.

**SSH (Secure Shell)**
Protocole de communication sécurisé qui permet de se connecter à distance à un serveur.

**SFTP (Secure File Transfer Protocol)**
Protocole de transfert de fichiers sécurisé qui fonctionne via SSH.

**Artifacts (GitHub Actions)**
Fichiers générés par un job et conservés temporairement (builds, rapports de tests, etc.).

**Quality Gate**
Point de contrôle dans le pipeline CI/CD qui vérifie que certains critères de qualité sont respectés avant de continuer.

---

**Dernière mise à jour :** Phase 2 CI/CD - Portfolio TDD
