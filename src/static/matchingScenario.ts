// Scénario statique de matching binôme étudiant pour présentation/demo

export const matchingScenario = {
  users: [
    {
      name: "Sarah",
      role: "Étudiante",
      university: "Université de Tunis El Manar",
      year: "1ère année",
      habits: ["Calme", "Non fumeuse", "Se couche tôt"],
      preferences: [
        "Colocataire sérieuse et respectueuse",
        "Proche de l’université",
        "Max 1 coloc",
        "Même sexe",
        "Quartier proche de la fac"
      ],
      photo: "sarah.jpg",
      email: "sarah@test.com",
      password: "Test1234!"
    },
    {
      name: "Yassine",
      role: "Étudiant",
      university: "Université de Tunis El Manar",
      field: "Informatique",
      habits: ["Non fumeur", "Adore cuisiner", "Propre"],
      preferences: [
        "Cherche quelqu’un de posé",
        "Flexible sur les horaires",
        "Environnement tranquille"
      ],
      photo: "yassine.jpg",
      email: "yassine@test.com",
      password: "Test1234!"
    }
  ],
  matching: {
    compatibility: 92,
    steps: [
      "Inscription et création de profil",
      "Matching automatique (habitudes, budget, localisation, etc.)",
      "Proposition de match et like mutuel",
      "Messagerie privée pour échanger",
      "Recherche de logement ensemble",
      "Réservation et avis après colocation"
    ],
    messages: [
      {
        from: "Sarah",
        text: "Salut ! J’ai vu qu’on avait beaucoup de points en commun. Tu veux qu’on se capte autour d’un café pour parler logement ?"
      },
      {
        from: "Yassine",
        text: "Oui, avec plaisir ! J’ai déjà repéré quelques annonces, on peut en discuter."
      }
    ],
    housing: {
      link: "https://unimatch.com/logement/123",
      photos: ["logement1.jpg", "logement2.jpg"],
      price: 600,
      location: "Proche université",
      conditions: "2 mois de caution, non fumeur"
    },
    result: {
      matched: true,
      reserved: true,
      review: "Binôme parfait, expérience positive !"
    }
  }
};
