import { useState, useEffect } from "react";
import { getProfile, updateProfile } from "@/lib/profileApi";
import Header from "@/components/Header";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { User, GraduationCap, MapPin, Euro, Clock, Cigarette, Dog, Volume2, VolumeX, Languages, Star, HeartHandshake, Users, BookOpen, Home, Info, Calendar, Smile, ShieldCheck, CheckCircle, XCircle } from "lucide-react";

const Profile = () => {
  const [profile, setProfile] = useState<any>(null);
  const [editMode, setEditMode] = useState(false);
  const [editData, setEditData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  useEffect(() => {
    const fetchProfile = async () => {
      setLoading(true);
      setError(null);
      try {
        const token = sessionStorage.getItem("binomiToken");
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

  // Pour édition, on clone le profil au premier passage en mode édition
  const startEdit = () => {
    setEditData({ ...profile });
    setEditMode(true);
    setSuccess(false);
  };

  const cancelEdit = () => {
    setEditMode(false);
    setEditData(null);
  };

  const handleEditChange = (field: string, value: any) => {
    setEditData((prev: any) => ({ ...prev, [field]: value }));
  };

  const handleSave = async () => {
    setLoading(true);
    setError(null);
    try {
      const token = sessionStorage.getItem("binomiToken");
      if (!token) throw new Error("Token manquant");
      await updateProfile(token, editData);
      setProfile(editData);
      setEditMode(false);
      setSuccess(true);
    } catch (err: any) {
      setError(err?.response?.data?.message || err.message || "Erreur lors de la mise à jour");
    } finally {
      setLoading(false);
    }
  };

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
            {!editMode && (
              <button className="mt-2 px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700 transition" onClick={startEdit}>Modifier</button>
            )}
          </div>

          {/* Section Académique */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-blue-700"><GraduationCap className="w-5 h-5" /> Infos académiques</CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {editMode ? (
                <>
                  <div>
                    <span className="font-semibold">Université :</span>
                    <input className="input input-bordered w-full mt-1" value={editData.university || ''} onChange={e => handleEditChange('university', e.target.value)} />
                  </div>
                  <div>
                    <span className="font-semibold">Niveau d'études :</span>
                    <input className="input input-bordered w-full mt-1" value={editData.study_level || ''} onChange={e => handleEditChange('study_level', e.target.value)} />
                  </div>
                  <div>
                    <span className="font-semibold">Domaine :</span>
                    <input className="input input-bordered w-full mt-1" value={editData.field_of_study || ''} onChange={e => handleEditChange('field_of_study', e.target.value)} />
                  </div>
                  <div>
                    <span className="font-semibold">Année académique :</span>
                    <input className="input input-bordered w-full mt-1" value={editData.academic_year || ''} onChange={e => handleEditChange('academic_year', e.target.value)} />
                  </div>
                </>
              ) : (
                <>
                  <div><span className="font-semibold">Université :</span> {profile.university}</div>
                  <div><span className="font-semibold">Niveau d'études :</span> {profile.study_level}</div>
                  <div><span className="font-semibold">Domaine :</span> {profile.field_of_study}</div>
                  <div><span className="font-semibold">Année académique :</span> {profile.academic_year}</div>
                </>
              )}
            </CardContent>
          </Card>

          {/* Section Logement */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-green-700"><Home className="w-5 h-5" /> Logement & Budget</CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {editMode ? (
                <>
                  <div><Euro className="inline w-4 h-4 mr-1 text-green-600" /> <span className="font-semibold">Budget :</span> <input type="number" className="input input-bordered w-full mt-1" value={editData.housing_budget || ''} onChange={e => handleEditChange('housing_budget', e.target.value)} /></div>
                  <div><span className="font-semibold">Budget min-max :</span> <input type="number" className="input input-bordered w-20 mr-2" value={editData.budget_min || ''} onChange={e => handleEditChange('budget_min', e.target.value)} /> - <input type="number" className="input input-bordered w-20 ml-2" value={editData.budget_max || ''} onChange={e => handleEditChange('budget_max', e.target.value)} /> TND</div>
                  <div><span className="font-semibold">Type de chambre :</span> <input className="input input-bordered w-full mt-1" value={editData.housing_room_type || ''} onChange={e => handleEditChange('housing_room_type', e.target.value)} /></div>
                  <div><span className="font-semibold">Type de logement :</span> <input className="input input-bordered w-full mt-1" value={editData.housing_type || ''} onChange={e => handleEditChange('housing_type', e.target.value)} /></div>
                  <div><span className="font-semibold">Durée :</span> <input className="input input-bordered w-full mt-1" value={editData.housing_duration || ''} onChange={e => handleEditChange('housing_duration', e.target.value)} /></div>
                  <div><span className="font-semibold">Date d'emménagement :</span> <input type="date" className="input input-bordered w-full mt-1" value={editData.housing_move_in ? editData.housing_move_in.slice(0,10) : ''} onChange={e => handleEditChange('housing_move_in', e.target.value)} /></div>
                  <div><span className="font-semibold">Localisation :</span> <input className="input input-bordered w-full mt-1" value={editData.housing_location || ''} onChange={e => handleEditChange('housing_location', e.target.value)} /></div>
                  <div><span className="font-semibold">Localisation préférée :</span> <input className="input input-bordered w-full mt-1" value={editData.preferred_location || ''} onChange={e => handleEditChange('preferred_location', e.target.value)} /></div>
                </>
              ) : (
                <>
                  <div><Euro className="inline w-4 h-4 mr-1 text-green-600" /> <span className="font-semibold">Budget :</span> {profile.housing_budget} TND</div>
                  <div><span className="font-semibold">Budget min-max :</span> {profile.budget_min} - {profile.budget_max} TND</div>
                  <div><span className="font-semibold">Type de chambre :</span> {profile.housing_room_type}</div>
                  <div><span className="font-semibold">Type de logement :</span> {profile.housing_type}</div>
                  <div><span className="font-semibold">Durée :</span> {profile.housing_duration}</div>
                  <div><span className="font-semibold">Date d'emménagement :</span> {profile.housing_move_in ? new Date(profile.housing_move_in).toLocaleDateString() : ''}</div>
                  <div><span className="font-semibold">Localisation :</span> {profile.housing_location}</div>
                  <div><span className="font-semibold">Localisation préférée :</span> {profile.preferred_location}</div>
                </>
              )}
            </CardContent>
          </Card>

          {/* Section Préférences & Valeurs */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-pink-700"><HeartHandshake className="w-5 h-5" /> Préférences & valeurs</CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {editMode ? (
                <>
                  <div><Star className="inline w-4 h-4 mr-1 text-pink-600" /> <span className="font-semibold">Centres d'intérêt :</span> <input className="input input-bordered w-full mt-1" value={Array.isArray(editData.interests) ? editData.interests.join(', ') : (editData.interests || '')} onChange={e => handleEditChange('interests', e.target.value.split(',').map((i: string) => i.trim()))} /></div>
                  <div><Languages className="inline w-4 h-4 mr-1 text-pink-600" /> <span className="font-semibold">Langues :</span> <input className="input input-bordered w-full mt-1" value={typeof editData.languages === 'string' ? editData.languages.replace(/[{}"\\]/g, '') : Array.isArray(editData.languages) ? editData.languages.join(', ') : ''} onChange={e => handleEditChange('languages', e.target.value)} /></div>
                  <div><span className="font-semibold">Bio :</span> <input className="input input-bordered w-full mt-1" value={editData.bio || ''} onChange={e => handleEditChange('bio', e.target.value)} /></div>
                  <div><span className="font-semibold">Étudiant ou travailleur :</span> <input className="input input-bordered w-full mt-1" value={editData.study_or_work || ''} onChange={e => handleEditChange('study_or_work', e.target.value)} /></div>
                  <div><span className="font-semibold">Genre :</span> <input className="input input-bordered w-full mt-1" value={editData.gender_identity || ''} onChange={e => handleEditChange('gender_identity', e.target.value)} /></div>
                  <div><span className="font-semibold">Préférence de genre :</span> <input className="input input-bordered w-full mt-1" value={editData.roommate_gender_preference || ''} onChange={e => handleEditChange('roommate_gender_preference', e.target.value)} /></div>
                  <div><span className="font-semibold">Préférences culturelles :</span> <input className="input input-bordered w-full mt-1" value={editData.cultural_dietary_notes || ''} onChange={e => handleEditChange('cultural_dietary_notes', e.target.value)} /></div>
                </>
              ) : (
                <>
                  <div><Star className="inline w-4 h-4 mr-1 text-pink-600" /> <span className="font-semibold">Centres d'intérêt :</span> {Array.isArray(profile.interests) ? profile.interests.join(', ') : profile.interests}</div>
                  <div><Languages className="inline w-4 h-4 mr-1 text-pink-600" /> <span className="font-semibold">Langues :</span> {typeof profile.languages === 'string' ? profile.languages.replace(/[{}"\\]/g, '').split(',').join(', ') : Array.isArray(profile.languages) ? profile.languages.join(', ') : ''}</div>
                  <div><span className="font-semibold">Bio :</span> {profile.bio}</div>
                  <div><span className="font-semibold">Étudiant ou travailleur :</span> {profile.study_or_work}</div>
                  <div><span className="font-semibold">Genre :</span> {profile.gender_identity}</div>
                  <div><span className="font-semibold">Préférence de genre :</span> {profile.roommate_gender_preference}</div>
                  <div><span className="font-semibold">Préférences culturelles :</span> {profile.cultural_dietary_notes}</div>
                </>
              )}
            </CardContent>
          </Card>

          {/* Section Mode de vie */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-purple-700"><Smile className="w-5 h-5" /> Mode de vie</CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {editMode ? (
                <>
                  <div><Clock className="inline w-4 h-4 mr-1 text-purple-600" /> <span className="font-semibold">Heure de coucher :</span> <input className="input input-bordered w-full mt-1" value={editData.sleep_time || ''} onChange={e => handleEditChange('sleep_time', e.target.value)} /></div>
                  <div><span className="font-semibold">Sociabilité :</span> <input className="input input-bordered w-full mt-1" value={editData.social_behavior || ''} onChange={e => handleEditChange('social_behavior', e.target.value)} /></div>
                  <div><span className="font-semibold">Fréquence de ménage :</span> <input className="input input-bordered w-full mt-1" value={editData.clean_frequency || ''} onChange={e => handleEditChange('clean_frequency', e.target.value)} /></div>
                  <div><span className="font-semibold">Niveau de bruit :</span> <input className="input input-bordered w-full mt-1" value={editData.noise_level || ''} onChange={e => handleEditChange('noise_level', e.target.value)} /></div>
                  <div><span className="font-semibold">Fumeur :</span> <select className="input input-bordered w-full mt-1" value={editData.smoke_status || ''} onChange={e => handleEditChange('smoke_status', e.target.value)}><option value="">Non</option><option value="oui">Oui</option></select></div>
                  <div><span className="font-semibold">Accepte coloc fumeur :</span> <select className="input input-bordered w-full mt-1" value={editData.accept_smoking_roommate || ''} onChange={e => handleEditChange('accept_smoking_roommate', e.target.value)}><option value="">Non</option><option value="true">Oui</option></select></div>
                  <div><span className="font-semibold">Animaux :</span> <input className="input input-bordered w-full mt-1" value={editData.pets_preference || ''} onChange={e => handleEditChange('pets_preference', e.target.value)} /></div>
                  <div><span className="font-semibold">Respect :</span> <input type="number" min={1} max={5} className="input input-bordered w-full mt-1" value={editData.importance_respect || ''} onChange={e => handleEditChange('importance_respect', e.target.value)} /></div>
                  <div><span className="font-semibold">Communication :</span> <input type="number" min={1} max={5} className="input input-bordered w-full mt-1" value={editData.importance_communication || ''} onChange={e => handleEditChange('importance_communication', e.target.value)} /></div>
                  <div><span className="font-semibold">Vie privée :</span> <input type="number" min={1} max={5} className="input input-bordered w-full mt-1" value={editData.importance_privacy || ''} onChange={e => handleEditChange('importance_privacy', e.target.value)} /></div>
                  <div><span className="font-semibold">Vie partagée :</span> <input type="number" min={1} max={5} className="input input-bordered w-full mt-1" value={editData.importance_shared_activities || ''} onChange={e => handleEditChange('importance_shared_activities', e.target.value)} /></div>
                  <div><span className="font-semibold">Environnement calme :</span> <input type="number" min={1} max={5} className="input input-bordered w-full mt-1" value={editData.importance_quiet || ''} onChange={e => handleEditChange('importance_quiet', e.target.value)} /></div>
                </>
              ) : (
                <>
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
                </>
              )}
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

          {/* Boutons édition */}
          {editMode && (
            <div className="flex gap-4 justify-end mt-4">
              <button className="px-4 py-2 rounded bg-green-600 text-white hover:bg-green-700 transition" onClick={handleSave}>Enregistrer</button>
              <button className="px-4 py-2 rounded bg-gray-300 text-gray-800 hover:bg-gray-400 transition" onClick={cancelEdit}>Annuler</button>
            </div>
          )}
          {success && <div className="text-green-600 text-center mt-2">Profil mis à jour avec succès !</div>}
          {error && <div className="text-red-500 text-center mt-2">{error}</div>}
        </div>
      </div>
    </div>
  );
}

export default Profile;

