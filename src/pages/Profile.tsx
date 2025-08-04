import { useState, useEffect } from "react";
import { getProfile } from "@/lib/profileApi";
import Header from "@/components/Header";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { User, GraduationCap, MapPin, Euro, Clock, Cigarette, Dog, Volume2, VolumeX, Languages, Star, HeartHandshake, Users, BookOpen, Home, Info, Calendar, Smile, ShieldCheck, CheckCircle, XCircle } from "lucide-react";

const Profile = () => {
  const [profile, setProfile] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  useEffect(() => {
    const fetchProfile = async () => {
      setLoading(true);
      setError(null);
      try {
        const token = localStorage.getItem("binomiToken");
        if (!token) throw new Error("Token manquant");
        const data = await getProfile(token);
        setProfile(data);
      } catch (err: any) {
        setError(err?.response?.data?.message || err.message || "Erreur lors du chargement du profil");
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, []);

  if (loading) return <div className="min-h-screen flex items-center justify-center text-lg">Chargement...</div>;
  if (error) return <div className="min-h-screen flex items-center justify-center text-red-500">{error}</div>;
  if (!profile) return null;

  // Helper for boolean display
  const YesNo = ({value}: {value: any}) => value === true || value === "true" || value === "oui" ? <Badge className="bg-green-100 text-green-700">Oui</Badge> : <Badge className="bg-red-100 text-red-700">Non</Badge>;

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="container py-8">
        <div className="max-w-3xl mx-auto space-y-8">
          <div className="text-center space-y-2">
            <h1 className="text-3xl font-bold flex items-center justify-center gap-2"><User className="w-7 h-7 text-blue-600" /> Mon Profil</h1>
            <p className="text-muted-foreground">Voici toutes vos informations enregistrées</p>
          </div>

          {/* Section Académique */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-blue-700"><GraduationCap className="w-5 h-5" /> Infos académiques</CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div><span className="font-semibold">Université :</span> {profile.university}</div>
              <div><span className="font-semibold">Niveau d'études :</span> {profile.study_level}</div>
              <div><span className="font-semibold">Domaine :</span> {profile.field_of_study}</div>
              <div><span className="font-semibold">Année académique :</span> {profile.academic_year}</div>
            </CardContent>
          </Card>

          {/* Section Logement */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-green-700"><Home className="w-5 h-5" /> Logement & Budget</CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div><Euro className="inline w-4 h-4 mr-1 text-green-600" /> <span className="font-semibold">Budget :</span> {profile.housing_budget} TND</div>
              <div><span className="font-semibold">Budget min-max :</span> {profile.budget_min} - {profile.budget_max} TND</div>
              <div><span className="font-semibold">Type de chambre :</span> {profile.housing_room_type}</div>
              <div><span className="font-semibold">Type de logement :</span> {profile.housing_type}</div>
              <div><span className="font-semibold">Durée :</span> {profile.housing_duration}</div>
              <div><span className="font-semibold">Date d'emménagement :</span> {profile.housing_move_in ? new Date(profile.housing_move_in).toLocaleDateString() : ''}</div>
              <div><span className="font-semibold">Localisation :</span> {profile.housing_location}</div>
              <div><span className="font-semibold">Localisation préférée :</span> {profile.preferred_location}</div>
            </CardContent>
          </Card>

          {/* Section Préférences & Valeurs */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-pink-700"><HeartHandshake className="w-5 h-5" /> Préférences & valeurs</CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div><Star className="inline w-4 h-4 mr-1 text-pink-600" /> <span className="font-semibold">Centres d'intérêt :</span> {Array.isArray(profile.interests) ? profile.interests.join(', ') : profile.interests}</div>
              <div><Languages className="inline w-4 h-4 mr-1 text-pink-600" /> <span className="font-semibold">Langues :</span> {typeof profile.languages === 'string' ? profile.languages.replace(/[{}"\\]/g, '').split(',').join(', ') : Array.isArray(profile.languages) ? profile.languages.join(', ') : ''}</div>
              <div><span className="font-semibold">Bio :</span> {profile.bio}</div>
              <div><span className="font-semibold">Étudiant ou travailleur :</span> {profile.study_or_work}</div>
              <div><span className="font-semibold">Genre :</span> {profile.gender_identity}</div>
              <div><span className="font-semibold">Préférence de genre :</span> {profile.roommate_gender_preference}</div>
              <div><span className="font-semibold">Préférences culturelles :</span> {profile.cultural_dietary_notes}</div>
            </CardContent>
          </Card>

          {/* Section Mode de vie */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-purple-700"><Smile className="w-5 h-5" /> Mode de vie</CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div><Clock className="inline w-4 h-4 mr-1 text-purple-600" /> <span className="font-semibold">Heure de coucher :</span> {profile.sleep_time}</div>
              <div><span className="font-semibold">Sociabilité :</span> {profile.social_behavior}</div>
              <div><span className="font-semibold">Fréquence de ménage :</span> {profile.clean_frequency}</div>
              <div><span className="font-semibold">Niveau de bruit :</span> {profile.noise_level}</div>
              <div><span className="font-semibold">Fumeur :</span> <YesNo value={profile.smoke_status} /></div>
              <div><span className="font-semibold">Accepte coloc fumeur :</span> <YesNo value={profile.accept_smoking_roommate} /></div>
              <div><span className="font-semibold">Animaux :</span> {profile.pets_preference}</div>
              <div><span className="font-semibold">Respect :</span> {profile.importance_respect}/5</div>
              <div><span className="font-semibold">Communication :</span> {profile.importance_communication}/5</div>
              <div><span className="font-semibold">Vie privée :</span> {profile.importance_privacy}/5</div>
              <div><span className="font-semibold">Vie partagée :</span> {profile.importance_shared_activities}/5</div>
              <div><span className="font-semibold">Environnement calme :</span> {profile.importance_quiet}/5</div>
            </CardContent>
          </Card>

          {/* Section Infos */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-gray-700"><Info className="w-5 h-5" /> Infos techniques</CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs text-gray-500">
              <div><span className="font-semibold">ID :</span> {profile.id}</div>
              <div><span className="font-semibold">User ID :</span> {profile.user_id}</div>
              <div><span className="font-semibold">Créé le :</span> {profile.created_at ? new Date(profile.created_at).toLocaleString() : ''}</div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

export default Profile;

