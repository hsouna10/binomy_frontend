import { useState, useEffect } from "react";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Header from "@/components/Header";

const Matching = () => {


  const [user, setUser] = useState(null);
  const [matches, setMatches] = useState([]);
  const [loading, setLoading] = useState(true);

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


  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="container py-8">
        <div className="max-w-2xl mx-auto space-y-6">
          <h1 className="text-3xl font-bold text-center mb-6">Mes correspondances</h1>
          {loading ? (
            <div className="text-center py-12">Chargement...</div>
          ) : matches.length === 0 ? (
            <div className="text-center py-12 text-muted-foreground">Aucune correspondance trouvée.</div>
          ) : (
            <div className="grid gap-6">
              {matches.map((match, i) => {
                // Determine which user is the current user, and which is the match
                let matchedUser = null;
                if (user && match.user1 && match.user2) {
                  if (match.user1.id === user.id) {
                    matchedUser = match.user2;
                  } else if (match.user2.id === user.id) {
                    matchedUser = match.user1;
                  }
                }
                // Fallback if not found
                if (!matchedUser) matchedUser = match.user2 || match.user1 || {};
                return (
                  <Card
                    key={i}
                    className="flex items-center justify-between gap-4 p-4 bg-white rounded-xl shadow-lg hover:shadow-2xl transition-shadow duration-200"
                  >
                    <div className="flex items-center gap-6">
                      <Avatar className="w-20 h-20 border-2 border-primary">
                        <AvatarImage src={matchedUser.image || undefined} />
                        <AvatarFallback>
                          {matchedUser.prenom?.[0] || '?'}{matchedUser.nom?.[0] || ''}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <CardTitle className="text-xl font-bold mb-1">
                          {(matchedUser.prenom || matchedUser.nom) ? `${matchedUser.prenom || ''} ${matchedUser.nom || ''}`.trim() : 'Nom inconnu'}
                        </CardTitle>
                        {matchedUser.desc || matchedUser.description ? (
                          <div className="text-muted-foreground text-sm mb-1">
                            {matchedUser.desc || matchedUser.description}
                          </div>
                        ) : null}
                        <div className="text-muted-foreground text-sm mb-1">Score de compatibilité : {match.score ?? 'N/A'}</div>
                        {(!matchedUser.prenom && !matchedUser.nom) && (
                          <div className="text-muted-foreground text-sm">Aucune information sur ce profil</div>
                        )}
                      </div>
                    </div>
                    <div className="flex flex-col gap-2 items-center ml-4">
                      <button
                        type="button"
                        className="w-10 h-10 flex items-center justify-center rounded-full bg-red-100 hover:bg-red-200 text-red-500 text-2xl shadow transition-colors duration-150"
                        title="Refuser"
                        tabIndex={0}
                      >
                        ❌
                      </button>
                      <button
                        type="button"
                        className="w-10 h-10 flex items-center justify-center rounded-full bg-pink-100 hover:bg-pink-200 text-pink-500 text-2xl shadow transition-colors duration-150"
                        title="Accepter"
                        tabIndex={0}
                      >
                        ❤️
                      </button>
                    </div>
                  </Card>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Matching;