import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { 
  Users, 
  Target, 
  Shield, 
  Heart, 
  TrendingUp, 
  Award,
  CheckCircle,
  Star
} from "lucide-react";

const About = () => {
  const stats = [
    { label: "Étudiants inscrits", value: "2,500+", icon: Users },
    { label: "Matches réussis", value: "850+", icon: Heart },
    { label: "Logements vérifiés", value: "400+", icon: Shield },
    { label: "Taux de satisfaction", value: "96%", icon: Star }
  ];

  const team = [
    {
      name: "Sarah Ben Ahmed",
      role: "CEO & Co-fondatrice",
      description: "Étudiante en informatique passionnée par l'innovation sociale",
      image: ""
    },
    {
      name: "Yassine Hammadi", 
      role: "CTO & Co-fondateur",
      description: "Développeur full-stack spécialisé en algorithmes de matching",
      image: ""
    },
    {
      name: "Amine Trabelsi",
      role: "Head of Product",
      description: "Expert UX/UI focalisé sur l'expérience utilisateur",
      image: ""
    }
  ];

  const values = [
    {
      icon: Shield,
      title: "Sécurité",
      description: "Vérification des profils et logements pour une expérience sûre"
    },
    {
      icon: Target,
      title: "Précision",
      description: "Algorithme de matching avancé pour des compatibilités optimales"
    },
    {
      icon: Heart,
      title: "Communauté",
      description: "Créer des liens durables entre étudiants tunisiens"
    },
    {
      icon: TrendingUp,
      title: "Innovation",
      description: "Solutions technologiques adaptées aux besoins étudiants"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="container py-16">
        <div className="max-w-4xl mx-auto space-y-16">
          {/* Hero Section */}
          <div className="text-center space-y-6">
            <h1 className="text-4xl md:text-5xl font-bold">
              À propos de{" "}
              <span className="bg-gradient-primary bg-clip-text text-transparent">
                Binomi
              </span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              La première plateforme tunisienne qui révolutionne la recherche de colocataires étudiants grâce à un matching intelligent et des logements vérifiés.
            </p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <Card key={index} className="text-center">
                <CardContent className="p-6">
                  <div className="w-12 h-12 bg-gradient-primary rounded-lg mx-auto mb-4 flex items-center justify-center">
                    <stat.icon className="w-6 h-6 text-white" />
                  </div>
                  <div className="text-2xl font-bold text-primary mb-1">{stat.value}</div>
                  <div className="text-sm text-muted-foreground">{stat.label}</div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Mission */}
          <Card className="text-center">
            <CardHeader>
              <CardTitle className="text-2xl">Notre Mission</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-lg">
                Chez Binomi, nous croyons que trouver le bon colocataire ne devrait pas être un casse-tête. 
                Inspirés par notre propre expérience étudiante, nous avons créé une solution qui combine technologie 
                avancée et compréhension des besoins réels des étudiants tunisiens.
              </p>
              <p className="text-muted-foreground">
                Notre plateforme utilise un algorithme de matching sophistiqué qui analyse les habitudes de vie, 
                les préférences et la personnalité pour créer des binômes parfaits, comme Sarah et Yassine qui 
                ont trouvé leur compatibilité de 92% grâce à notre système.
              </p>
            </CardContent>
          </Card>

          {/* Values */}
          <div className="space-y-8">
            <h2 className="text-3xl font-bold text-center">Nos Valeurs</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {values.map((value, index) => (
                <Card key={index}>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <div className="w-10 h-10 bg-gradient-primary rounded-lg mr-3 flex items-center justify-center">
                        <value.icon className="w-5 h-5 text-white" />
                      </div>
                      {value.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">{value.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Story */}
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">Notre Histoire</CardTitle>
              <CardDescription>Comment tout a commencé</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <p>
                L'idée de Binomi est née en 2023 quand Sarah, étudiante en informatique à l'UTM, 
                a passé des mois à chercher une colocataire compatible. Après plusieurs expériences 
                difficiles avec des plateformes génériques, elle s'est rendu compte qu'il manquait 
                une solution spécialement conçue pour les étudiants tunisiens.
              </p>
              <p>
                En collaborant avec Yassine et Amine, tous trois étudiants passionnés de technologie, 
                ils ont développé un algorithme qui va au-delà des critères basiques pour analyser 
                réellement la compatibilité entre colocataires potentiels.
              </p>
              <div className="flex items-center space-x-2 p-4 bg-muted rounded-lg">
                <CheckCircle className="w-5 h-5 text-green-500" />
                <span className="font-medium">Résultat :</span>
                <span>92% de taux de satisfaction sur nos premiers 850 matches !</span>
              </div>
            </CardContent>
          </Card>

          {/* Team */}
          <div className="space-y-8">
            <h2 className="text-3xl font-bold text-center">L'Équipe Fondatrice</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {team.map((member, index) => (
                <Card key={index} className="text-center">
                  <CardContent className="p-6">
                    <div className="w-20 h-20 bg-gradient-primary rounded-full mx-auto mb-4 flex items-center justify-center">
                      <span className="text-2xl text-white font-bold">
                        {member.name.split(' ').map(n => n[0]).join('')}
                      </span>
                    </div>
                    <h3 className="font-bold text-lg">{member.name}</h3>
                    <Badge variant="secondary" className="mb-3">{member.role}</Badge>
                    <p className="text-sm text-muted-foreground">{member.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Future */}
          <Card className="text-center">
            <CardHeader>
              <CardTitle className="text-2xl">Le Futur de Binomi</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p>
                Nous ne nous arrêtons pas là ! Nos prochaines fonctionnalités incluront :
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-left">
                <div className="flex items-center space-x-2">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  <span>Système de paiement intégré pour le loyer</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  <span>Planificateur de tâches ménagères</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  <span>Système d'évaluation entre colocataires</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  <span>Extension vers d'autres universités</span>
                </div>
              </div>
              <Button variant="gradient" size="lg" className="mt-6">
                Rejoindre l'aventure Binomi
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default About;