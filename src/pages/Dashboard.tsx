import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
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
  MapPin,
} from "lucide-react";
import axios from "axios";

// === Types ===
interface Match {
  id: string;
  student1_id: string;
  student2_id: string;
  match_score: number;
  status: "pending" | "accepted" | "rejected";
  created_at: string;
  updated_at: string;
}

interface Activity {
  type: string;
  message: string;
  time: string;
}

const Dashboard = () => {
  const [userStats, setUserStats] = useState({
    profileComplete: 85, // Peut venir d’un endpoint plus tard
    matches: 0,
    messages: 0,
    favorites: 5, // À lier à une API plus tard
    views: 0,
  });

  const [recentMatches, setRecentMatches] = useState<Match[]>([]);
  const [recentActivity, setRecentActivity] = useState<Activity[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // 🔐 Récupérer les données utilisateur
  const storedUser = localStorage.getItem("binomiUser");
  const user = storedUser ? JSON.parse(storedUser) : null;
  const token = localStorage.getItem("binomiToken")?.replace(/['"]+/g, "");
  const currentStudentId = user?.id;

  useEffect(() => {
    const fetchDashboardData = async () => {
      if (!currentStudentId || !token) {
        setError("Utilisateur non authentifié.");
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError(null);

        // 📥 Récupérer les matches
        const matchesRes = await axios.get(
          `http://localhost:5000/matches/matches/${currentStudentId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const matches: Match[] = matchesRes.data.matches || [];

        setRecentMatches(matches);

        // 📊 Mettre à jour les stats
        const acceptedMatches = matches.filter((m) => m.status === "accepted").length;
        const pendingMatches = matches.filter((m) => m.status === "pending").length;

        setUserStats((prev) => ({
          ...prev,
          matches: matches.length,
          messages: pendingMatches * 2, // Exemple simulé
          views: Math.min(30, matches.length * 3), // Simulé
        }));

        // 📝 Générer l’activité récente
        const activity: Activity[] = [];

        if (acceptedMatches > 0) {
          activity.push({
            type: "match",
            message: `Vous avez ${acceptedMatches} match${
              acceptedMatches > 1 ? "s" : ""
            } accepté${acceptedMatches > 1 ? "s" : ""} !`,
            time: "Aujourd'hui",
          });
        }

        if (pendingMatches > 0) {
          activity.push({
            type: "pending",
            message: `Vous avez ${pendingMatches} demande${
              pendingMatches > 1 ? "s" : ""
            } en attente.`,
            time: "Récemment",
          });
        }

        activity.push({
          type: "view",
          message: "Votre profil a été consulté plusieurs fois cette semaine.",
          time: "Hier",
        });

        setRecentActivity(activity);
      } catch (err: any) {
        console.error("Erreur lors du chargement du dashboard :", err);
        setError(
          err.response?.data?.error ||
            err.message ||
            "Impossible de charger les données."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, [currentStudentId, token]);

  // 🧩 Fonction utilitaire pour déterminer l'autre utilisateur
  const getOtherStudentId = (match: Match) => {
    return match.student1_id === currentStudentId
      ? match.student2_id
      : match.student1_id;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container py-8 flex items-center justify-center">
          <div className="text-center">
            <div className="inline-block animate-spin w-8 h-8 border-4 border-primary border-t-transparent rounded-full"></div>
            <p className="mt-4 text-muted-foreground">Chargement du tableau de bord...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container py-8">
          <Card className="max-w-lg mx-auto">
            <CardHeader>
              <CardTitle className="text-red-500 flex items-center">
                <Bell className="w-5 h-5 mr-2" />
                Erreur
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">{error}</p>
              <Button variant="outline" onClick={() => window.location.reload()}>
                Réessayer
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <div className="container py-8">
        <div className="max-w-6xl mx-auto space-y-6">
          {/* En-tête */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold">
                Bonjour {user?.first_name || "Étudiant"} ! 👋
              </h1>
              <p className="text-muted-foreground">
                Voici un résumé de votre activité Binomi.
              </p>
            </div>
            <div className="flex items-center space-x-2">
              <Button variant="outline" size="sm">
                <Bell className="w-4 h-4 mr-2" />
                Notifications
              </Button>
              <Button variant="outline" size="sm" onClick={() => (window.location.href = "/profile")}>
                <Settings className="w-4 h-4 mr-2" />
                Paramètres
              </Button>
            </div>
          </div>

          {/* Stats */}
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

          {/* Grille principale */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Matches récents */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Heart className="w-5 h-5 mr-2 text-red-500" />
                  Matches récents
                </CardTitle>
                <CardDescription>Vos dernières compatibilités</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {recentMatches.length === 0 ? (
                  <p className="text-sm text-muted-foreground">Aucun match pour le moment.</p>
                ) : (
                  recentMatches.map((match) => (
                    <div key={match.id} className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <Avatar className="w-10 h-10">
                          <AvatarFallback className="bg-primary text-white">
                            {getOtherStudentId(match).slice(0, 2).toUpperCase()}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium text-sm">Étudiant {getOtherStudentId(match).slice(-4)}</p>
                          <p className="text-xs text-muted-foreground">Score : {match.match_score}%</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <Badge
                          variant={
                            match.status === "accepted"
                              ? "default"
                              : match.status === "pending"
                              ? "secondary"
                              : "destructive"
                          }
                          className="text-xs"
                        >
                          {match.status === "accepted" && "Accepté"}
                          {match.status === "pending" && "En attente"}
                          {match.status === "rejected" && "Rejeté"}
                        </Badge>
                      </div>
                    </div>
                  ))
                )}
                <Button
                  variant="outline"
                  className="w-full"
                  size="sm"
                  onClick={() => (window.location.href = "/matching")}
                >
                  Voir tous les matches
                </Button>
              </CardContent>
            </Card>

            {/* Activité */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Calendar className="w-5 h-5 mr-2 text-blue-500" />
                  Activité récente
                </CardTitle>
                <CardDescription>Ce qui se passe dans votre réseau</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {recentActivity.length === 0 ? (
                  <p className="text-sm text-muted-foreground">Aucune activité.</p>
                ) : (
                  recentActivity.map((act, index) => (
                    <div key={index} className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-primary rounded-full mt-2" />
                      <div>
                        <p className="text-sm">{act.message}</p>
                        <p className="text-xs text-muted-foreground">{act.time}</p>
                      </div>
                    </div>
                  ))
                )}
                <Button variant="outline" className="w-full" size="sm">
                  Voir tout
                </Button>
              </CardContent>
            </Card>

            {/* Favoris */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Star className="w-5 h-5 mr-2 text-yellow-500" />
                  Logements favoris
                </CardTitle>
                <CardDescription>Vos logements sauvegardés</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  Fonctionnalité en cours de développement.
                </p>
                <Button
                  variant="outline"
                  className="w-full"
                  size="sm"
                  onClick={() => (window.location.href = "/housing")}
                >
                  Parcourir les logements
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Actions rapides */}
          <Card>
            <CardHeader>
              <CardTitle>Actions rapides</CardTitle>
              <CardDescription>Continuez votre recherche</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <Button
                  variant="gradient"
                  className="h-12"
                  onClick={() => (window.location.href = "/matching")}
                >
                  <Users className="w-4 h-4 mr-2" />
                  Découvrir des binômes
                </Button>
                <Button
                  variant="outline"
                  className="h-12"
                  onClick={() => (window.location.href = "/housing")}
                >
                  <Home className="w-4 h-4 mr-2" />
                  Logements
                </Button>
                <Button
                  variant="outline"
                  className="h-12"
                  onClick={() => (window.location.href = "/messages")}
                >
                  <MessageCircle className="w-4 h-4 mr-2" />
                  Messages
                </Button>
                <Button
                  variant="outline"
                  className="h-12"
                  onClick={() => (window.location.href = "/profile")}
                >
                  <Settings className="w-4 h-4 mr-2" />
                  Profil
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