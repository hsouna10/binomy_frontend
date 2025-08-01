import { useState, useEffect } from "react";
import { matchingScenario } from "../static/matchingScenario";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Header from "@/components/Header";
import { 
  Heart, 
  X, 
  MapPin, 
  GraduationCap, 
  Euro, 
  Clock, 
  CigaretteOff, 
  Dog, 
  MessageCircle,
  Sparkles,
  Filter
} from "lucide-react";

const Matching = () => {

  // Récupérer l'utilisateur connecté
  const [user, setUser] = useState(null);
  const [matched, setMatched] = useState(false);
  const [step, setStep] = useState(0);

  useEffect(() => {
    const u = localStorage.getItem("binomiUser");
    if (u) setUser(JSON.parse(u));
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

  // Trouver l'autre binôme
  const other = matchingScenario.users.find(u => u.email !== user.email);
  const compat = matchingScenario.matching.compatibility;
  const scenarioSteps = [
    "Inscription et création de profil",
    "Matching automatique (habitudes, budget, localisation, etc.)",
    "Proposition de match et like mutuel",
    "Messagerie privée pour échanger",
    "Recherche de logement ensemble",
    "Réservation et avis après colocation"
  ];


  // Simuler le like mutuel
  const handleLike = () => {
    setMatched(true);
    setStep(3); // Aller à la messagerie
  };

  // Simuler le passage à l'étape suivante
  const nextStep = () => {
    setStep(s => Math.min(s + 1, scenarioSteps.length - 1));
  };


  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="container py-8">
        <div className="max-w-2xl mx-auto space-y-6">
          <div className="text-center space-y-4">
            <h1 className="text-3xl font-bold">
              Scénario Binôme :
              <span className="bg-gradient-primary bg-clip-text text-transparent ml-2">
                {user.name} & {other?.name}
              </span>
            </h1>
            <p className="text-muted-foreground">
              Compatibilité : <b>{compat}%</b>
            </p>
          </div>

          <Card className="relative overflow-hidden">
            <div className="absolute top-4 right-4 z-10">
              <Badge variant="secondary" className="bg-gradient-primary text-white">
                <Sparkles className="w-3 h-3 mr-1" />
                {compat}% compatible
              </Badge>
            </div>
            <CardHeader className="text-center pb-4">
              <Avatar className="w-32 h-32 mx-auto">
                <AvatarImage src={other?.photo || ''} />
                <AvatarFallback className="text-2xl">
                  {other?.name.split(' ').map(n => n[0]).join('')}
                </AvatarFallback>
              </Avatar>
              <CardTitle className="text-2xl">
                {other?.name}
              </CardTitle>
              <CardDescription className="flex items-center justify-center">
                <GraduationCap className="w-4 h-4 mr-2" />
                {other?.university}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <h4 className="font-medium">À propos</h4>
                <p className="text-sm text-muted-foreground">
                  {other?.role === 'Étudiant' ? `Étudiant(e) à ${other.university}` : ''}
                </p>
              </div>
              <div className="space-y-3">
                <h4 className="font-medium">Préférences</h4>
                <div className="flex flex-wrap gap-2">
                  {other?.preferences?.map((p, i) => (
                    <Badge key={i} variant="outline">{p}</Badge>
                  ))}
                </div>
              </div>
              <div className="space-y-3">
                <h4 className="font-medium">Habitudes</h4>
                <div className="flex flex-wrap gap-2">
                  {other?.habits?.map((h, i) => (
                    <Badge key={i} variant="secondary">{h}</Badge>
                  ))}
                </div>
              </div>
              {!matched ? (
                <div className="flex justify-center space-x-6 pt-4">
                  <Button 
                    variant="outline" 
                    size="lg" 
                    className="w-16 h-16 rounded-full border-green-200 hover:border-green-300 hover:bg-green-50"
                    onClick={handleLike}
                  >
                    <Heart className="w-6 h-6 text-green-500" />
                  </Button>
                </div>
              ) : (
                <div className="text-center py-4">
                  <div className="text-green-600 font-bold text-lg mb-2">Match réussi !</div>
                  <Button variant="gradient" onClick={nextStep}>Continuer le scénario</Button>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Étapes du scénario */}
          <Card variant="elevated">
            <CardContent className="text-center py-6">
              <h4 className="font-medium mb-2">🪜 Étapes du scénario</h4>
              <ol className="list-decimal list-inside text-left max-w-md mx-auto">
                {scenarioSteps.map((s, i) => (
                  <li key={i} className={i <= step ? 'font-bold text-primary' : ''}>{s}</li>
                ))}
              </ol>
              {step === 3 && (
                <div className="mt-4">
                  <h4 className="font-medium mb-2">💬 Messagerie</h4>
                  <div className="bg-muted rounded p-3 text-left space-y-2">
                    {matchingScenario.matching.messages.map((m, i) => (
                      <div key={i}><b>{m.from} :</b> {m.text}</div>
                    ))}
                  </div>
                  <Button className="mt-4" variant="gradient" onClick={nextStep}>Étape suivante</Button>
                </div>
              )}
              {step === 4 && (
                <div className="mt-4">
                  <h4 className="font-medium mb-2">🏠 Logement proposé</h4>
                  <div className="bg-muted rounded p-3 text-left">
                    <div><b>Lien :</b> <a href={matchingScenario.matching.housing.link} className="text-primary underline" target="_blank" rel="noopener noreferrer">Voir l'annonce</a></div>
                    <div><b>Prix :</b> {matchingScenario.matching.housing.price} TND</div>
                    <div><b>Localisation :</b> {matchingScenario.matching.housing.location}</div>
                    <div><b>Conditions :</b> {matchingScenario.matching.housing.conditions}</div>
                  </div>
                  <Button className="mt-4" variant="gradient" onClick={nextStep}>Étape suivante</Button>
                </div>
              )}
              {step === 5 && (
                <div className="mt-4">
                  <div className="text-green-600 font-bold text-lg mb-2">🎯 Binôme formé avec compatibilité vérifiée</div>
                  <div className="text-green-600 font-bold text-lg mb-2">🤝 Logement réservé ensemble</div>
                  <div className="text-primary font-bold">Merci d'avoir testé le scénario complet !</div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Matching;