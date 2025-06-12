# 🌐 Template de Configuration DNS Hébergeur → Vercel

> **📋 Template anonymisé** : Guide générique pour configurer un domaine personnalisé avec Vercel  
> **🔒 Sécurité** : Toutes les informations sensibles ont été remplacées par des variables

## 🎯 Architecture finale

```bash
[YOUR-DOMAIN].com → [PROJECT-NAME] (Portfolio TDD Next.js)
www.[YOUR-DOMAIN].com → redirection automatique vers domaine principal
```

## 📋 Étapes de Configuration

### 1. Ajout du domaine dans Vercel

**Actions sur vercel.com** :

1. Aller sur le projet `[PROJECT-NAME]` : <https://vercel.com/dashboard>
2. Onglet **Settings** → **Domains**
3. Cliquer **Add Domain**
4. Saisir : `[YOUR-DOMAIN].com`
5. Vercel fournit automatiquement les enregistrements DNS requis

### 2. Configuration DNS chez l'Hébergeur

**Se connecter au panneau de contrôle de votre hébergeur** :

1. Aller dans **Gestion des domaines**
2. Sélectionner `[YOUR-DOMAIN].com`
3. Accéder à **Zone DNS** ou **DNS Management**
4. Vérifier que les enregistrements pointent vers Vercel

### 3. Enregistrements DNS typiques

Après configuration, la zone DNS devrait contenir :

```dns
# Domaine principal → [PROJECT-NAME]
@    A    [VERCEL-IP-ADDRESS]  # IP fournie par Vercel
www  CNAME  cname.vercel-dns.com
```

**⚠️ IMPORTANT** : Vercel gère automatiquement la plupart des enregistrements lors de l'ajout du domaine.

### 4. Validation SSL automatique

- ✅ **Automatique** : Vercel génère automatiquement le certificat SSL
- ✅ **Let's Encrypt** : Renouvellement automatique
- ⏱️ **Délai** : 24-48h pour propagation DNS complète

## 🔧 Guide Étape par Étape

### Étape 1 : Ajouter le domaine dans Vercel

1. **Vercel Dashboard** : Aller sur `[PROJECT-NAME]`
2. **Settings** → **Domains** → **Add Domain**
3. **Saisir** : `[YOUR-DOMAIN].com`
4. **CONFIRMER** l'ajout du domaine
5. ✅ Le domaine principal pointe maintenant vers le portfolio

### Étape 2 : Vérification DNS (si nécessaire)

Si problèmes de DNS, vérifier avec votre hébergeur :

```bash
# Tester la résolution DNS
dig [YOUR-DOMAIN].com

# Vérifier le certificat SSL
curl -I https://[YOUR-DOMAIN].com
```

## 📊 Timeline de Configuration

- **0-5min** : Ajout du domaine dans Vercel
- **5-30min** : Propagation DNS et vérification automatique
- **2-24h** : Propagation DNS complète mondiale
- **24h** : Certificat SSL automatique actif

## 🎯 Résultat Final

✅ **Portfolio Principal** : `https://[YOUR-DOMAIN].com` ([PROJECT-NAME])  
✅ **Redirection www** : `www.[YOUR-DOMAIN].com` → `[YOUR-DOMAIN].com`  
✅ **SSL** : Certificat HTTPS automatique Let's Encrypt  
✅ **Performance** : CDN Vercel mondial avec Edge Network

## 📝 Variables à Remplacer

Lors de l'utilisation de ce template, remplacez :

- `[YOUR-DOMAIN]` → Votre nom de domaine (ex: monportfolio)
- `[PROJECT-NAME]` → Nom de votre projet sur Vercel
- `[VERCEL-IP-ADDRESS]` → IP fournie par Vercel lors de l'ajout du domaine

## 🔧 Hébergeurs Compatibles

Ce template fonctionne avec la plupart des hébergeurs DNS :

- **PlanetHoster** (panneau World Lite)
- **OVH** (interface DNS)
- **Gandi** (zone DNS)
- **Cloudflare** (DNS management)
- **GoDaddy** (DNS settings)
- **Namecheap** (advanced DNS)

---

**🚀 Configuration optimale : Domaine personnalisé avec performance Vercel maximale !**

> **📚 Usage** : Ce template peut être réutilisé pour des projets Next.js déployés sur Vercel  
> **🔒 Sécurité** : Version anonymisée - aucune information sensible exposée  
> **⏱️ Gain de temps** : Configuration DNS standardisée en moins de 30 minutes
