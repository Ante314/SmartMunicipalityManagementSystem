/**
 * Database Seed Script
 * Crée des données de démonstration pour tester l'application
 *
 * Usage: npm run seed
 */

import 'dotenv/config'
import mongoose from 'mongoose'
import { User, Post, Event, Comment, Notification } from './src/models/index.js'

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/smms'

// Données de démonstration
const users = [
  {
    firstName: 'Admin',
    lastName: 'Système',
    email: 'admin@smms.fr',
    password: 'admin123',
    role: 'admin',
    bio: 'Administrateur principal de la plateforme SMMS',
    location: 'Mairie centrale'
  },
  {
    firstName: 'Marie',
    lastName: 'Dupont',
    email: 'marie.dupont@smms.fr',
    password: 'staff123',
    role: 'staff',
    bio: 'Responsable communication municipale',
    location: 'Service Communication'
  },
  {
    firstName: 'Jean',
    lastName: 'Martin',
    email: 'jean.martin@email.com',
    password: 'user1234',
    role: 'citizen',
    bio: 'Habitant du quartier centre',
    location: 'Quartier Centre'
  },
  {
    firstName: 'Sophie',
    lastName: 'Bernard',
    email: 'sophie.bernard@email.com',
    password: 'user1234',
    role: 'citizen',
    bio: 'Passionnée de la vie locale',
    location: 'Quartier Nord'
  },
  {
    firstName: 'Pierre',
    lastName: 'Dubois',
    email: 'pierre.dubois@email.com',
    password: 'user1234',
    role: 'citizen',
    bio: 'Membre actif de la communauté',
    location: 'Quartier Sud'
  }
]

// Categories disponibles: 'announcement', 'discussion', 'question', 'suggestion', 'alert'

const posts = [
  {
    title: 'Bienvenue sur le nouveau portail citoyen SMMS',
    content: `Chers citoyens,

Nous sommes ravis de vous présenter le nouveau Système de Gestion Municipale Intelligente (SMMS). Cette plateforme a été conçue pour faciliter la communication entre la municipalité et ses habitants.

Fonctionnalités principales :
- Publiez des annonces et participez aux discussions
- Découvrez et participez aux événements locaux
- Signalez des problèmes ou faites des suggestions
- Recevez des notifications en temps réel

N'hésitez pas à explorer toutes les fonctionnalités et à contribuer à la vie de notre communauté !

L'équipe SMMS`,
    category: 'announcement',
    isPinned: true
  },
  {
    title: 'Travaux de voirie : Rue de la République',
    content: `Informations importantes concernant les travaux de réfection de la chaussée :

📍 Lieu : Rue de la République (entre les n°15 et n°45)
📅 Période : Du 15 au 30 du mois en cours
⏰ Horaires : 8h - 17h du lundi au vendredi

Impacts sur la circulation :
- Circulation alternée durant les travaux
- Stationnement interdit sur la zone de chantier
- Déviation mise en place via la rue des Fleurs

Nous vous remercions pour votre compréhension.`,
    category: 'alert'
  },
  {
    title: 'Que pensez-vous du nouveau marché du samedi ?',
    content: `Bonjour à tous,

Depuis l'ouverture du nouveau marché le samedi matin sur la place centrale, je voulais savoir ce que vous en pensez ?

Personnellement, je trouve :
✅ Les produits sont très frais
✅ Bonne ambiance conviviale
✅ Parking facile à trouver

Par contre :
❌ Manque de variété dans les stands
❌ Les horaires pourraient être plus étendus

Et vous, qu'en pensez-vous ? Avez-vous des suggestions pour l'améliorer ?`,
    category: 'discussion'
  },
  {
    title: 'Proposition : Créer un jardin partagé',
    content: `Chers voisins,

Je propose la création d'un jardin partagé dans notre quartier ! 🌱

L'idée serait d'utiliser le terrain vacant derrière l'école primaire pour créer un espace où les habitants pourraient :
- Cultiver leurs propres légumes
- Partager des conseils de jardinage
- Créer du lien social entre générations

Si cette initiative vous intéresse, manifestez-vous dans les commentaires ! 
Nous pourrions organiser une première réunion pour en discuter.

Ensemble, rendons notre quartier plus vert ! 🌿`,
    category: 'discussion'
  },
  {
    title: 'Collecte des déchets : Nouveau calendrier',
    content: `📢 INFORMATION IMPORTANTE

Suite à la réorganisation du service de collecte, voici les nouveaux horaires :

🗑️ Ordures ménagères : Mardi et Vendredi (avant 7h)
♻️ Tri sélectif : Mercredi (avant 7h)
🌿 Déchets verts : 1er et 3ème samedi du mois

⚠️ Ces changements entrent en vigueur dès la semaine prochaine.

Pour toute question, contactez le service Environnement au 01 23 45 67 89.`,
    category: 'announcement'
  }
]

// Categories disponibles: 'community', 'sports', 'culture', 'education', 'health', 'government', 'environment'

const events = [
  {
    title: 'Fête de quartier annuelle',
    description: `Venez nombreux à notre grande fête de quartier !

Au programme :
🎵 Concert de musique locale
🍔 Food trucks et restauration
🎪 Animations pour enfants
🎁 Tombola avec de nombreux lots

Ambiance garantie pour petits et grands !`,
    category: 'community',
    location: { name: 'Place de la Mairie', city: 'Ville' },
    maxAttendees: 500
  },
  {
    title: 'Tournoi de football inter-quartiers',
    description: `Grand tournoi de football ouvert à tous !

Format : Équipes de 5 joueurs
Catégories : Enfants (8-12 ans), Ados (13-17 ans), Adultes

Inscriptions ouvertes jusqu'à 48h avant l'événement.
Trophées et médailles pour les vainqueurs !`,
    category: 'sports',
    location: { name: 'Stade Municipal', city: 'Ville' },
    maxAttendees: 100
  },
  {
    title: 'Exposition : Histoire de notre ville',
    description: `Découvrez l'histoire fascinante de notre ville à travers une exposition exceptionnelle.

• Photos d'archives inédites
• Objets historiques
• Témoignages d'anciens habitants
• Visite guidée à 15h et 17h

Entrée libre - Tout public`,
    category: 'culture',
    location: { name: 'Médiathèque municipale', city: 'Ville' }
  },
  {
    title: 'Atelier informatique pour seniors',
    description: `Vous souhaitez apprendre à utiliser un ordinateur ou une tablette ?

Nos bénévoles sont là pour vous accompagner !

Au programme :
- Créer et gérer sa boîte email
- Naviguer sur internet en sécurité
- Utiliser les services en ligne de la mairie
- Appels vidéo avec vos proches

Inscription obligatoire - Places limitées à 15 personnes`,
    category: 'education',
    location: { name: 'Maison des Associations', city: 'Ville' },
    maxAttendees: 15
  },
  {
    title: 'Journée de nettoyage citoyen',
    description: `🌍 Participez à la journée de nettoyage de notre ville !

Ensemble, ramassons les déchets et embellissons nos espaces publics.

Matériel fourni : gants, sacs, pinces
Point de rendez-vous : Parvis de la mairie à 9h

Collation offerte à tous les participants à la fin de l'événement.

Inscrivez-vous et faites partie du changement ! ♻️`,
    category: 'environment',
    location: { name: 'Parvis de la Mairie', city: 'Ville' }
  },
  {
    title: 'Conseil municipal public',
    description: `Le prochain conseil municipal se tiendra en séance publique.

Ordre du jour :
1. Budget prévisionnel 2024
2. Projet de rénovation du centre-ville
3. Plan local d'urbanisme
4. Questions diverses

Les citoyens peuvent assister aux débats dans la limite des places disponibles.`,
    category: 'government',
    location: { name: 'Salle du Conseil - Mairie', city: 'Ville' },
    maxAttendees: 50
  }
]

async function seed () {
  try {
    console.log('🌱 Connexion à la base de données...')
    await mongoose.connect(MONGODB_URI)
    console.log('✅ Connecté à MongoDB')

    // Nettoyer la base de données
    console.log('\n🧹 Nettoyage des données existantes...')
    await Promise.all([
      User.deleteMany({}),
      Post.deleteMany({}),
      Event.deleteMany({}),
      Comment.deleteMany({}),
      Notification.deleteMany({})
    ])
    console.log('✅ Base de données nettoyée')

    // Créer les utilisateurs
    console.log('\n👥 Création des utilisateurs...')
    const createdUsers = []
    for (const userData of users) {
      const user = await User.create({
        ...userData,
        password: userData.password,
        status: 'active'
      })
      createdUsers.push(user)
      console.log(`  ✓ ${user.firstName} ${user.lastName} (${user.role})`)
    }

    // Créer les publications
    console.log('\n📝 Création des publications...')
    const createdPosts = []
    for (let i = 0; i < posts.length; i++) {
      const authorIndex = i % createdUsers.length
      const post = await Post.create({
        ...posts[i],
        author: createdUsers[authorIndex]._id,
        status: 'published'
      })
      createdPosts.push(post)
      console.log(`  ✓ ${post.title.substring(0, 40)}...`)
    }

    // Créer les événements
    console.log('\n📅 Création des événements...')
    const now = new Date()
    for (let i = 0; i < events.length; i++) {
      const organizerIndex = i % 2 // Admin ou Staff
      const daysOffset = (i + 1) * 7 // Événements espacés d'une semaine
      const startDate = new Date(now.getTime() + daysOffset * 24 * 60 * 60 * 1000)
      startDate.setHours(14, 0, 0, 0)

      const endDate = new Date(startDate)
      endDate.setHours(18, 0, 0, 0)

      const event = await Event.create({
        ...events[i],
        organizer: createdUsers[organizerIndex]._id,
        startDate,
        endDate,
        status: 'published'
      })
      console.log(`  ✓ ${event.title.substring(0, 40)}...`)
    }

    // Créer quelques commentaires
    console.log('\n💬 Création des commentaires...')
    const comments = [
      { content: 'Excellente nouvelle ! Hâte de découvrir toutes les fonctionnalités.', post: 0, author: 2 },
      { content: 'Merci pour ces informations. Savez-vous si une déviation piétonne est aussi prévue ?', post: 1, author: 3 },
      { content: 'Je suis d\'accord, les produits sont vraiment de qualité !', post: 2, author: 4 },
      { content: 'Super idée ! Je serais intéressé pour participer.', post: 3, author: 2 },
      { content: 'Merci pour le rappel, je l\'avais oublié !', post: 4, author: 3 }
    ]

    for (const commentData of comments) {
      await Comment.create({
        content: commentData.content,
        post: createdPosts[commentData.post]._id,
        author: createdUsers[commentData.author]._id
      })
    }
    console.log(`  ✓ ${comments.length} commentaires créés`)

    // Résumé
    console.log('\n' + '='.repeat(50))
    console.log('🎉 SEED TERMINÉ AVEC SUCCÈS !')
    console.log('='.repeat(50))
    console.log('\n📊 Résumé :')
    console.log(`  • ${createdUsers.length} utilisateurs`)
    console.log(`  • ${createdPosts.length} publications`)
    console.log(`  • ${events.length} événements`)
    console.log(`  • ${comments.length} commentaires`)

    console.log('\n🔐 Comptes de test :')
    console.log('  Admin    : admin@smms.fr / admin123')
    console.log('  Staff    : marie.dupont@smms.fr / staff123')
    console.log('  Citoyen  : jean.martin@email.com / user1234')

    console.log('\n✨ Vous pouvez maintenant démarrer l\'application !\n')
  } catch (error) {
    console.error('❌ Erreur lors du seed:', error)
  } finally {
    await mongoose.disconnect()
    process.exit(0)
  }
}

seed()
