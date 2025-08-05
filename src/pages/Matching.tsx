import { useState, useEffect } from "react";
import axios from "axios";
import Header from "@/components/Header";
import { Button } from "@/components/ui/button";

const Matching = () => {
  const [user, setUser] = useState(null);
  const [matches, setMatches] = useState([]);
  const [loading, setLoading] = useState(true);
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const u = localStorage.getItem("binomiUser");
    if (u) setUser(JSON.parse(u));
  }, []);

  useEffect(() => {
    async function fetchMatches() {
      try {
        setLoading(true);
        const res = await axios.get("http://localhost:5000/api/matches");
        setMatches(res.data);
      } catch (err) {
        setMatches([]);
      } finally {
        setLoading(false);
      }
    }
    fetchMatches();
  }, []);

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center space-y-4">
          <p className="text-lg">Veuillez vous connecter pour accéder au matching.</p>
          <Button variant="gradient" onClick={() => window.location.href = '/auth'}>Se connecter</Button>
        </div>
      </div>
    );
  }

  // Gestion du passage au profil suivant
  const handleNext = () => setCurrent((prev) => prev + 1);

  // Fonction pour gérer l'envoi d'un like
  const handleLike = async () => {
    if (!match || !user || !matchedUser) return;
    try {
      await axios.post("http://localhost:5000/matches/matches/", {
        student1_id: user.id,
        student2_id: matchedUser.id,
        match_score: match.score,
      });
      setCurrent((prev) => prev + 1); // Passe au profil suivant
    } catch (err) {
      alert("Erreur lors de l'envoi du match !");
      setCurrent((prev) => prev + 1); // Passe quand même au suivant
    }
  };

  // Trouver le profil à afficher
  let match = matches[current];
  let matchedUser = null;
  if (match && user && match.user1 && match.user2) {
    if (match.user1.id === user.id) {
      matchedUser = match.user2;
    } else if (match.user2.id === user.id) {
      matchedUser = match.user1;
    }
  }
  if (match && !matchedUser) matchedUser = match.user2 || match.user1 || {};

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-pink-50">
      <Header />
      <div className="container py-8 flex flex-col items-center">
        <h1 className="text-3xl font-bold text-center mb-8">Mes correspondances</h1>
        {loading ? (
          <div className="text-center py-12">Chargement...</div>
        ) : !match || current >= matches.length ? (
          <div className="text-center py-12 text-muted-foreground">Aucune autre correspondance trouvée.</div>
        ) : (
          <div className="relative w-full max-w-md mx-auto bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col animate-fade-in">
            {/* Image de profil */}
            <div className="bg-gradient-to-br from-gray-200 to-gray-100 h-72 flex items-center justify-center">
              {matchedUser.image ? (
                <img
                  src={matchedUser.image}
                  alt={matchedUser.prenom}
                  className="object-cover w-full h-full"
                />
              ) : (
                <div className="rounded-full bg-gray-300 w-24 h-24 flex items-center justify-center text-gray-400 text-4xl">
                  <span>
                    {matchedUser.prenom?.[0] || '?'}
                    {matchedUser.nom?.[0] || ''}
                  </span>
                </div>
              )}
            </div>
            {/* Infos */}
            <div className="p-6">
              <div className="flex items-center gap-2">
                <h2 className="text-2xl font-bold">{matchedUser.prenom} {matchedUser.nom}</h2>
                {matchedUser.age && <span className="text-gray-500 font-medium">• {matchedUser.age} ans</span>}
              </div>
              {matchedUser.universite && (
                <div className="text-gray-500 mt-1">{matchedUser.universite}</div>
              )}
              {/* Tags */}
              <div className="flex flex-wrap gap-2 mt-3">
                {matchedUser.tags?.map((tag, idx) => (
                  <span key={idx} className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-xs font-semibold">{tag}</span>
                ))}
              </div>
              {/* Description */}
              {matchedUser.description && (
                <p className="mt-4 text-gray-700">{matchedUser.description}</p>
              )}
              {/* Compétences */}
              {matchedUser.competences && matchedUser.competences.length > 0 && (
                <div className="mt-4">
                  <div className="font-semibold mb-1">Compétences</div>
                  <div className="flex flex-wrap gap-2">
                    {matchedUser.competences.map((c, idx) => (
                      <span key={idx} className="bg-gray-200 text-gray-700 px-2 py-1 rounded-full text-xs">{c}</span>
                    ))}
                  </div>
                </div>
              )}
              <div className="text-muted-foreground text-sm mt-4">Score de compatibilité : {match.score ?? 'N/A'}</div>
            </div>
            {/* Boutons */}
            <div className="flex justify-center gap-16 pb-8">
              <button
                type="button"
                className="w-16 h-16 rounded-full border-2 border-gray-200 flex items-center justify-center text-red-400 bg-white hover:bg-red-50 hover:scale-110 transition-all duration-200 shadow"
                title="Refuser"
                onClick={handleNext}
              >
                <svg width="32" height="32" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M6 18L18 6M6 6l12 12"/></svg>
              </button>
              <button
  type="button"
  className="w-16 h-16 rounded-full border-2 border-blue-600 flex items-center justify-center text-white bg-blue-600 hover:bg-blue-700 hover:scale-110 transition-all duration-200 shadow"
  title="Accepter"
  onClick={handleLike}
>
  <svg width="32" height="32" fill="none" stroke="white" strokeWidth="2" viewBox="0 0 24 24"><path d="M12 21C12 21 4 13.5 4 8.5C4 5.42 6.42 3 9.5 3C11.24 3 12.91 3.81 14 5.08C15.09 3.81 16.76 3 18.5 3C21.58 3 24 5.42 24 8.5C24 13.5 16 21 16 21H12Z"/></svg>
</button>
            </div>
          </div>
        )}
      </div>
      <style>
        {`
          .animate-fade-in {
            animation: fadeIn 0.5s;
          }
          @keyframes fadeIn {
            from { opacity: 0; transform: translateY(40px);}
            to { opacity: 1; transform: translateY(0);}
          }
        `}
      </style>
    </div>
  );
};

export default Matching;