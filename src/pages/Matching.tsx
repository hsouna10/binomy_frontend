import { useState, useEffect, useContext } from "react";
import axios from "axios";
import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import { ThemeContext } from "../App"; // Ajuste le chemin si nécessaire
import { motion } from "framer-motion";
import { House, X } from "lucide-react"; // On utilise House à la place du cœur

const Matching = () => {
  const { theme } = useContext(ThemeContext);
  const isDark = theme === "dark";

  const [user, setUser] = useState<any>(null);
  const [matches, setMatches] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const u = sessionStorage.getItem("binomiUser");
    if (u) setUser(JSON.parse(u));
  }, []);

  useEffect(() => {
    async function fetchMatches() {
      try {
        setLoading(true);
        const res = await axios.get("http://localhost:5000/api/matches");
        setMatches(res.data);
      } catch (err) {
        console.error("Erreur lors du chargement des matches", err);
        setMatches([]);
      } finally {
        setLoading(false);
      }
    }
    fetchMatches();
  }, []);

  // Gérer le "like" (ajouter aux favoris)
  const handleLike = async () => {
    if (!match || !user || !matchedUser) return;

    try {
      await axios.post("http://localhost:5000/matches/matches/", {
        student1_id: user.id,
        student2_id: matchedUser.id,
        match_score: match.score,
      });
      setCurrent((prev) => prev + 1); // Passe au suivant
    } catch (err) {
      alert("Échec de l'enregistrement. Passage au profil suivant.");
      setCurrent((prev) => prev + 1);
    }
  };

  // Passer au profil suivant (refuser)
  const handleSkip = () => {
    setCurrent((prev) => prev + 1);
  };

  // Trouver le profil actuel
  const match = matches[current];
  let matchedUser = null;
  if (match && user && match.user1 && match.user2) {
    matchedUser = match.user1.id === user.id ? match.user2 : match.user1;
  } else if (match) {
    matchedUser = match.user2 || match.user1 || {};
  }

  if (!user) {
    return (
      <div className={`min-h-screen flex items-center justify-center p-6 ${isDark ? "bg-gray-900" : "bg-gray-50"}`}>
        <div className="text-center space-y-6 max-w-sm">
          <h2 className={`text-2xl font-bold ${isDark ? "text-white" : "text-gray-800"}`}>
            Accès réservé
          </h2>
          <p className={isDark ? "text-gray-400" : "text-gray-600"}>
            Connectez-vous pour découvrir vos correspondances.
          </p>
          <Button
            variant="gradient"
            size="lg"
            onClick={() => (window.location.href = "/auth")}
            className="w-full"
          >
            Se connecter
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen ${isDark ? "bg-gray-900 text-gray-100" : "bg-gradient-to-br from-blue-50 via-white to-pink-50 text-gray-800"}`}>
      <Header />
      <div className="container py-8 px-4 sm:px-6 md:px-8 flex flex-col items-center">
        <h1 className="text-3xl font-bold text-center mb-8">Mes correspondances</h1>

        {loading ? (
          <div className="text-center py-12">
            <div className="inline-block animate-spin w-8 h-8 border-4 border-primary border-t-transparent rounded-full"></div>
            <p className={`mt-4 ${isDark ? "text-gray-400" : "text-muted-foreground"}`}>
              Recherche de correspondances...
            </p>
          </div>
        ) : !match || current >= matches.length ? (
          <div className="text-center py-16 px-6 max-w-md">
            <div className="w-24 h-24 mx-auto mb-6 bg-primary/10 rounded-full flex items-center justify-center">
              <House className="w-12 h-12 text-primary" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Plus de correspondances</h3>
            <p className={isDark ? "text-gray-400" : "text-gray-600"}>
              Revenez plus tard ! Nous analysons de nouveaux profils chaque jour.
            </p>
            <Button
              variant="outline"
              className="mt-6"
              onClick={() => window.location.reload()}
            >
              Actualiser
            </Button>
          </div>
        ) : (
          <motion.div
            key={matchedUser.id}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -30 }}
            transition={{ duration: 0.4 }}
            className={`w-full max-w-md mx-auto bg-card rounded-3xl shadow-2xl overflow-hidden flex flex-col border ${isDark ? "border-gray-700" : "border-gray-200"}`}
          >
            {/* Image du profil */}
            <div className="h-64 sm:h-72 bg-gradient-to-br from-gray-200 to-gray-100 dark:from-gray-700 dark:to-gray-800 relative">
              {matchedUser.image ? (
                <img
                  src={matchedUser.image}
                  alt={matchedUser.prenom}
                  className="object-cover w-full h-full"
                />
              ) : (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="rounded-full bg-gray-300 dark:bg-gray-600 w-28 h-28 flex items-center justify-center text-gray-500 dark:text-gray-300 text-4xl font-bold">
                    {matchedUser.prenom?.[0] || "?"}
                    {matchedUser.nom?.[0] || ""}
                  </div>
                </div>
              )}
            </div>

            {/* Informations */}
            <div className="p-6 space-y-4">
              <div className="flex items-center gap-2">
                <h2 className="text-2xl font-bold">{matchedUser.prenom} {matchedUser.nom}</h2>
                {matchedUser.age && (
                  <span className={`text-sm font-medium ${isDark ? "text-gray-300" : "text-gray-500"}`}>
                    • {matchedUser.age} ans
                  </span>
                )}
              </div>

              {matchedUser.universite && (
                <p className={`text-sm ${isDark ? "text-gray-400" : "text-gray-500"}`}>
                  {matchedUser.universite}
                </p>
              )}

              {/* Tags */}
              {matchedUser.tags && matchedUser.tags.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-2">
                  {matchedUser.tags.map((tag: string, idx: number) => (
                    <span
                      key={idx}
                      className="bg-primary/10 text-primary text-xs font-semibold px-3 py-1 rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}

              {/* Description */}
              {matchedUser.description && (
                <p className={`mt-3 text-sm ${isDark ? "text-gray-300" : "text-gray-700"}`}>
                  {matchedUser.description}
                </p>
              )}

              {/* Compétences */}
              {matchedUser.competences && matchedUser.competences.length > 0 && (
                <div className="mt-4">
                  <div className={`text-xs font-semibold uppercase ${isDark ? "text-gray-400" : "text-muted-foreground"}`}>
                    Compétences
                  </div>
                  <div className="flex flex-wrap gap-2 mt-1">
                    {matchedUser.competences.map((c: string, idx: number) => (
                      <span
                        key={idx}
                        className={`text-xs px-2 py-1 rounded-full ${
                          isDark
                            ? "bg-gray-700 text-gray-300"
                            : "bg-gray-200 text-gray-700"
                        }`}
                      >
                        {c}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Score de compatibilité */}
              <div className={`text-sm mt-4 ${isDark ? "text-gray-400" : "text-muted-foreground"}`}>
                Score de compatibilité :{" "}
                <span className="font-bold text-primary">{match.score ?? "N/A"}</span>
              </div>
            </div>

            {/* Boutons d'action */}
            <div className="flex justify-center gap-16 py-8 px-4">
              {/* Refuser */}
              <button
                type="button"
                className="w-14 h-14 sm:w-16 sm:h-16 rounded-full border-2 border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 flex items-center justify-center text-red-500 hover:text-red-600 hover:scale-110 transition-all duration-200 shadow"
                title="Passer"
                onClick={handleSkip}
              >
                <X className="w-7 h-7 sm:w-8 sm:h-8" />
              </button>

              {/* "Liker" le profil (avec icône maison) */}
              <button
                type="button"
                className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white flex items-center justify-center hover:scale-110 transition-all duration-200 shadow"
                title="Sauvegarder ce logement"
                onClick={handleLike}
              >
                <House className="w-7 h-7 sm:w-8 sm:h-8 fill-white" />
              </button>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default Matching;