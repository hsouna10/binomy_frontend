import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import Header from "@/components/Header";
import { 
  Heart, 
  MessageCircle, 
  Home, 
  Users, 
  TrendingUp, 
  Calendar,
  Bell,
  Settings,
  Target,
  Star,
  MapPin
} from "lucide-react";

const Dashboard = () => {
  const userStats = {
    profileComplete: 85,
    matches: 12,
    messages: 8,
    favorites: 5,
    views: 34
  };

  const recentMatches = [
    {
      name: "Yassine Hammadi",
      compatibility: 92,
      university: "UTM",
      status: "active"
    },
    {
      name: "Amine Ben Salah", 
      compatibility: 87,
      university: "UTM",
      status: "pending"
    },
    {
      name: "Sami Trabelsi",
      compatibility: 78,
      university: "INSAT", 
      status: "viewed"
    }
  ];

  const recentActivity = [
    {
      type: "match",
      message: "Nouveau match avec Yassine (92% compatibilité)",
      time: "Il y a 2h"
    },
    {
      type: "message",
      message: "Nouveau message de Amine",
      time: "Il y a 4h"
    },
    {
      type: "view",
      message: "Votre profil a été consulté 3 fois",
      time: "Hier"
    },
    {
      type: "housing",
      message: "Nouveau logement dans vos critères",
      time: "Il y a 2 jours"
    }
  ];

  const favoriteHousings = [
    {
      title: "Studio moderne près UTM",
      price: 300,
      location: "Ariana",
      status: "available"
    },
    {
      title: "Appartement 2 pièces",
      price: 600,
      location: "Tunis Centre",
      status: "contacted"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="container py-8">
        <div className="max-w-6xl mx-auto space-y-6">
          {/* Welcome Header */}
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold">Bonjour Sarah ! 👋</h1>
              <p className="text-muted-foreground">
                Voici un résumé de votre activité Binomi
              </p>
            </div>
            <div className="flex items-center space-x-3">
              <Button variant="outline" size="sm">
                <Bell className="w-4 h-4 mr-2" />
                Notifications
              </Button>
              <Button variant="outline" size="sm">
                <Settings className="w-4 h-4 mr-2" />
                Paramètres
              </Button>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                    <Target className="w-4 h-4 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Profil</p>
                    <p className="text-xl font-bold">{userStats.profileComplete}%</p>
                  </div>
                </div>
                <Progress value={userStats.profileComplete} className="mt-2" />
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 bg-red-100 rounded-lg flex items-center justify-center">
                    <Heart className="w-4 h-4 text-red-600" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Matches</p>
                    <p className="text-xl font-bold">{userStats.matches}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                    <MessageCircle className="w-4 h-4 text-green-600" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Messages</p>
                    <p className="text-xl font-bold">{userStats.messages}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 bg-yellow-100 rounded-lg flex items-center justify-center">
                    <Home className="w-4 h-4 text-yellow-600" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Favoris</p>
                    <p className="text-xl font-bold">{userStats.favorites}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
                    <TrendingUp className="w-4 h-4 text-purple-600" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Vues profil</p>
                    <p className="text-xl font-bold">{userStats.views}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Recent Matches */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Heart className="w-5 h-5 mr-2 text-red-500" />
                  Matches récents
                </CardTitle>
                <CardDescription>Vos dernières compatibilités</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {recentMatches.map((match, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <Avatar className="w-10 h-10">
                        <AvatarFallback>
                          {match.name.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium text-sm">{match.name}</p>
                        <p className="text-xs text-muted-foreground">{match.university}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <Badge variant="secondary" className="text-xs">
                        {match.compatibility}%
                      </Badge>
                      <div className="text-xs text-muted-foreground mt-1">
                        {match.status === "active" && "💬 Actif"}
                        {match.status === "pending" && "⏳ En attente"}
                        {match.status === "viewed" && "👀 Vu"}
                      </div>
                    </div>
                  </div>
                ))}
                <Button variant="outline" className="w-full" size="sm">
                  Voir tous les matches
                </Button>
              </CardContent>
            </Card>

            {/* Activity Feed */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Calendar className="w-5 h-5 mr-2 text-blue-500" />
                  Activité récente
                </CardTitle>
                <CardDescription>Ce qui se passe dans votre réseau</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {recentActivity.map((activity, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-primary rounded-full mt-2" />
                    <div className="flex-1">
                      <p className="text-sm">{activity.message}</p>
                      <p className="text-xs text-muted-foreground">{activity.time}</p>
                    </div>
                  </div>
                ))}
                <Button variant="outline" className="w-full" size="sm">
                  Voir toute l'activité
                </Button>
              </CardContent>
            </Card>

            {/* Favorite Housings */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Star className="w-5 h-5 mr-2 text-yellow-500" />
                  Logements favoris
                </CardTitle>
                <CardDescription>Vos logements sauvegardés</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {favoriteHousings.map((housing, index) => (
                  <div key={index} className="border rounded-lg p-3">
                    <div className="flex items-start justify-between">
                      <div>
                        <h4 className="font-medium text-sm">{housing.title}</h4>
                        <div className="flex items-center space-x-2 mt-1">
                          <MapPin className="w-3 h-3 text-muted-foreground" />
                          <span className="text-xs text-muted-foreground">{housing.location}</span>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-primary">{housing.price} TND</p>
                        <Badge 
                          variant={housing.status === "available" ? "default" : "secondary"}
                          className="text-xs"
                        >
                          {housing.status === "available" ? "Disponible" : "Contacté"}
                        </Badge>
                      </div>
                    </div>
                  </div>
                ))}
                <Button variant="outline" className="w-full" size="sm">
                  Voir tous les favoris
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle>Actions rapides</CardTitle>
              <CardDescription>Continuez votre recherche de binôme et logement</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <Button variant="gradient" className="h-12">
                  <Users className="w-4 h-4 mr-2" />
                  Découvrir des binômes
                </Button>
                <Button variant="outline" className="h-12">
                  <Home className="w-4 h-4 mr-2" />
                  Parcourir les logements
                </Button>
                <Button variant="outline" className="h-12">
                  <MessageCircle className="w-4 h-4 mr-2" />
                  Mes conversations
                </Button>
                <Button variant="outline" className="h-12">
                  <Settings className="w-4 h-4 mr-2" />
                  Modifier mon profil
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;