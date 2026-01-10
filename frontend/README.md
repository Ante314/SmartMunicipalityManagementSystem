# 🏛️ Smart Municipality Management System (SMMS)

Système de Gestion Municipale Intelligente - Une plateforme complète pour la communication entre les municipalités et leurs citoyens.

![Version](https://img.shields.io/badge/version-1.0.0-blue.svg)
![License](https://img.shields.io/badge/license-MIT-green.svg)
![Node](https://img.shields.io/badge/node-%3E%3D18-brightgreen.svg)

## 📋 Table des matières

- [Présentation](#-présentation)
- [Fonctionnalités](#-fonctionnalités)
- [Architecture](#-architecture)
- [Prérequis](#-prérequis)
- [Installation](#-installation)
- [Configuration](#-configuration)
- [Utilisation](#-utilisation)
- [API Documentation](#-api-documentation)
- [Structure du projet](#-structure-du-projet)
- [Comptes de test](#-comptes-de-test)
- [Technologies](#-technologies)

## 🎯 Présentation

SMMS est une application web moderne conçue pour faciliter la communication entre les municipalités et leurs citoyens. Elle permet de :

- Publier et consulter des annonces municipales
- Organiser et participer à des événements communautaires
- Engager des discussions entre citoyens
- Gérer les signalements de contenus
- Administrer les utilisateurs et les contenus

## ✨ Fonctionnalités

### Pour les Citoyens
- 📝 Créer et partager des publications
- 📅 Découvrir et s'inscrire aux événements
- 💬 Commenter et interagir avec la communauté
- 🔔 Recevoir des notifications en temps réel
- 👤 Gérer son profil et ses préférences

### Pour le Personnel Municipal
- 📢 Publier des annonces officielles
- 🎉 Organiser des événements municipaux
- 📊 Accéder aux statistiques de la plateforme
- 🚩 Gérer les signalements

### Pour les Administrateurs
- 👥 Gestion complète des utilisateurs
- 🛡️ Modération des contenus
- 📈 Tableau de bord analytique
- ⚙️ Configuration de la plateforme

## 🏗️ Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                        Frontend                              │
│            React + Vite + Tailwind CSS                       │
│                 (Port: 5173)                                 │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│                        Backend                               │
│              Express.js + Socket.io                          │
│                   (Port: 5000)                               │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│                       Database                               │
│                    MongoDB                                   │
│                 (Port: 27017)                                │
└─────────────────────────────────────────────────────────────┘
```

## 📦 Prérequis

Avant de commencer, assurez-vous d'avoir installé :

- **Node.js** (version 18 ou supérieure)
- **npm** ou **yarn**
- **MongoDB** (version 6 ou supérieure)
- **Git**

## 🚀 Installation

### 1. Cloner le projet

```bash
git clone https://github.com/votre-username/SmartMunicipalityManagementSystem.git
cd SmartMunicipalityManagementSystem
```

### 2. Installation du Backend

```bash
cd backend
npm install
```

### 3. Installation du Frontend

```bash
cd ../frontend
npm install
```

## ⚙️ Configuration

### Backend

Créez un fichier `.env` dans le dossier `backend/` :

```env
# Server
PORT=5000
NODE_ENV=development

# Database
MONGODB_URI=mongodb://localhost:27017/smms

# Authentication
JWT_SECRET=votre_cle_secrete_jwt_tres_longue_et_securisee
JWT_EXPIRE=7d

# Email (optionnel)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=votre.email@gmail.com
SMTP_PASS=votre_mot_de_passe_app

# Frontend URL (pour CORS)
FRONTEND_URL=http://localhost:5173
```

### Frontend

Le fichier `.env` du frontend (optionnel) :

```env
VITE_API_URL=http://localhost:5000/api
VITE_SOCKET_URL=http://localhost:5000
```

## 🎮 Utilisation

### Démarrer MongoDB

```bash
# Sur Windows
mongod

# Sur macOS/Linux
sudo systemctl start mongod
```

### Initialiser la base de données

```bash
cd backend
npm run seed
```

Cette commande crée des données de démonstration (utilisateurs, publications, événements).

### Démarrer le Backend

```bash
cd backend
npm run dev
```

Le serveur démarre sur `http://localhost:5000`

### Démarrer le Frontend

Dans un nouveau terminal :

```bash
cd frontend
npm run dev
```

L'application est accessible sur `http://localhost:5173`

## 📚 API Documentation

### Endpoints principaux

| Méthode | Endpoint | Description |
|---------|----------|-------------|
| **Authentification** | | |
| POST | `/api/auth/register` | Inscription |
| POST | `/api/auth/login` | Connexion |
| GET | `/api/auth/me` | Utilisateur courant |
| **Publications** | | |
| GET | `/api/posts` | Liste des publications |
| POST | `/api/posts` | Créer une publication |
| GET | `/api/posts/:id` | Détail d'une publication |
| PUT | `/api/posts/:id` | Modifier une publication |
| DELETE | `/api/posts/:id` | Supprimer une publication |
| **Événements** | | |
| GET | `/api/events` | Liste des événements |
| POST | `/api/events` | Créer un événement |
| GET | `/api/events/:id` | Détail d'un événement |
| POST | `/api/events/:id/attend` | S'inscrire à un événement |
| **Notifications** | | |
| GET | `/api/notifications` | Mes notifications |
| PUT | `/api/notifications/:id/read` | Marquer comme lu |
| **Administration** | | |
| GET | `/api/admin/users` | Liste des utilisateurs |
| GET | `/api/admin/reports` | Liste des signalements |
| PUT | `/api/admin/reports/:id` | Traiter un signalement |

## 📂 Structure du projet

```
SmartMunicipalityManagementSystem/
├── backend/
│   ├── src/
│   │   ├── config/         # Configuration (DB, Socket.io)
│   │   ├── middleware/     # Middlewares Express
│   │   ├── models/         # Modèles Mongoose
│   │   ├── routes/         # Routes API
│   │   ├── services/       # Logique métier
│   │   ├── app.js          # Configuration Express
│   │   └── index.js        # Point d'entrée
│   ├── seed.js             # Script de données de test
│   ├── package.json
│   └── .env.example
│
├── frontend/
│   ├── src/
│   │   ├── components/     # Composants React
│   │   │   ├── auth/       # Composants d'authentification
│   │   │   ├── common/     # Composants réutilisables
│   │   │   ├── events/     # Composants événements
│   │   │   ├── layout/     # Layout (Navbar, Footer)
│   │   │   └── posts/      # Composants publications
│   │   ├── pages/          # Pages de l'application
│   │   │   ├── admin/      # Pages administration
│   │   │   ├── auth/       # Pages connexion/inscription
│   │   │   ├── events/     # Pages événements
│   │   │   └── posts/      # Pages publications
│   │   ├── services/       # Services (API, Socket)
│   │   ├── stores/         # État global (Zustand)
│   │   ├── App.jsx         # Routes principales
│   │   ├── main.jsx        # Point d'entrée
│   │   └── index.css       # Styles globaux
│   ├── index.html
│   ├── package.json
│   ├── vite.config.js
│   └── tailwind.config.js
│
└── README.md
```

## 🔐 Comptes de test

Après avoir exécuté `npm run seed`, vous pouvez utiliser ces comptes :

| Rôle | Email | Mot de passe |
|------|-------|--------------|
| Admin | admin@smms.fr | admin123 |
| Personnel | marie.dupont@smms.fr | staff123 |
| Citoyen | jean.martin@email.com | user1234 |

## 🛠️ Technologies

### Backend
- **Express.js** - Framework web Node.js
- **MongoDB** - Base de données NoSQL
- **Mongoose** - ODM pour MongoDB
- **Socket.io** - Communication temps réel
- **JWT** - Authentification
- **bcryptjs** - Hashage des mots de passe

### Frontend
- **React 18** - Bibliothèque UI
- **Vite** - Build tool
- **Tailwind CSS** - Framework CSS
- **Zustand** - Gestion d'état
- **React Router** - Routing
- **Axios** - Client HTTP
- **Heroicons** - Icônes
- **Headless UI** - Composants accessibles
- **date-fns** - Manipulation des dates

## 📝 Scripts disponibles

### Backend

```bash
npm run dev      # Démarrage en mode développement
npm start        # Démarrage en production
npm run seed     # Initialiser la base de données
npm run test     # Lancer les tests
npm run lint     # Vérifier le code
```

### Frontend

```bash
npm run dev      # Démarrage en mode développement
npm run build    # Build de production
npm run preview  # Prévisualiser le build
npm run lint     # Vérifier le code
```

## 🤝 Contribution

Les contributions sont les bienvenues ! Pour contribuer :

1. Forkez le projet
2. Créez une branche (`git checkout -b feature/AmazingFeature`)
3. Committez vos changements (`git commit -m 'Add AmazingFeature'`)
4. Pushez sur la branche (`git push origin feature/AmazingFeature`)
5. Ouvrez une Pull Request

## 📄 Licence

Ce projet est sous licence MIT. Voir le fichier `LICENSE` pour plus de détails.

## 📧 Contact

Pour toute question ou suggestion, n'hésitez pas à ouvrir une issue sur GitHub.

---

<p align="center">
  Fait avec ❤️ pour une meilleure communication municipale
</p>
