# GROUPOMANIA_Vrs2

Réseau social interne d'entreprise.

Les logiciels ci-dessous sont nécessaire au bon fonctionnement de l’application

- Node.js
- Express.js
- Sequelize
- Dotenv
- Vue.js
- Vue-router
- Vuex
- Axios
- Bootstrap 5
- @popperjs/core
- Sweetalert2


## Mise en place et installation de l'application

### 1.	Cloner l’application
```bash
 git clone https://github.com/CyD21/Groupomania.git
```

### 2.	Mise en place du backend

#### 2.1	Ce placer à la racine du dossier backend
```bash
cd Backend
```
#### 2.2	Lancer l’installation des modules Node.js
```bash
npm install
```
#### 2.3	Renommer le fichier env-exemple en .env

Insérer vos variables d’environnements comme décris à l’intérieur du fichier

#### 2.4	Démarrer le serveur backend
```bash
npm start
```

### 3.	Mise en place du frontend

#### 3.1	Ce placer à la racine du dossier frontend
```bash
cd Frontend
```
#### 3.2	Lancer l’installation des modules Node.js
```bash
npm install
```
#### 3.3	Renommer le fichier env-exemple en .env

Insérer votre variable d’environnement pour le serveur.
Une variable est déjà définie par défaut dans le fichier mais vous pouvez la modifier si nécessaire.

#### 3.4	Démarrer le serveur frontend
```bash
npm run dev
```

### 4. Lancement du serveur Sass (optionnel)

Sass est utilisé dans l'application pour la création de style personnalisé pour Bootstrap 5.
Si vous désirez modifier les styles, vous devrez donc démarrer le serveur Sass et modifier la
feuille de style custom.scss situé dans le répertoire frontend.

Frontend/src/assets/styles/custom.scss

#### 4.1 Ce placer à la racine du répertoire Frontend
```bash
cd Frontend
```
#### 4.2 Démarrage du serveur Sass
```bash
npm run sass
```

## Informations complémentaires

L’application utilise l’ORM (Object-Relational Mapping) Sequelize, par conséquent il n’est pas donc nécessaire de créer l’ensemble des tables pour la base de données.
Il suffit de créer une nouvelle base de données sur votre serveur et de remplir correctement les variables d’environnement dans le backend comme décris dans l’étape 2.3 ci-dessus. Séquelize se chargera lui-même de créer l’intégralité des tables et celle-ci seront systématiquement synchronisé à chaque redémarrage du serveur backend.
Toutefois ci besoin vous trouverez l’export de la base de données dans le répertoire
/backend/db_Sql

L'application dispose de 3 types de comptes

- Administrateur
- Modérateur
- Utilisateur

Tout les nouveaux comptes crées, sont par défaut des comptes utilisateurs. Il appartient à l'administrateur de l'application de modifier le type de compte directement dans la base de données afin de définir l'administrateur et le ou les modérateurs.

## Auteur
Cyrille DUTOIT

## Projet
Formation Développeur Web d’OpenClassrooms – projet n° 7
