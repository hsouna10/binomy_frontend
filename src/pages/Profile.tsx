import { useState, useEffect } from "react";
import { getProfile, updateProfile } from "@/lib/profileApi";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Header from "@/components/Header";
import { 
  User, 
  GraduationCap, 
  MapPin, 
  Euro, 
  Clock, 
  Cigarette, 
  CigaretteOff, 
  Dog, 
  Volume2, 
  VolumeX,
  Camera,
  Save
} from "lucide-react";

const Profile = () => {
  const [profile, setProfile] = useState({
    firstName: "",
    lastName: "", 
    university: "",
    field: "",
    budget: "",
    isSmoker: false,
    allowsPets: false,
    sleepTime: "",
    wakeTime: "",
    socialLevel: "",
    cleanliness: "",
    description: ""
  });
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
        setProfile({ ...profile, ...data });
      } catch (err: any) {
        setError(err?.response?.data?.message || err.message || "Erreur lors du chargement du profil");
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
    // eslint-disable-next-line
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="container py-8">
        <div className="max-w-4xl mx-auto space-y-8">
          <div className="text-center space-y-4">
            <h1 className="text-3xl font-bold">Mon Profil</h1>
            <p className="text-muted-foreground">
              Complétez votre profil pour améliorer votre matching
            </p>
          </div>

          <Tabs defaultValue="personal" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="personal">Informations personnelles</TabsTrigger>
              <TabsTrigger value="preferences">Préférences</TabsTrigger>
              <TabsTrigger value="lifestyle">Mode de vie</TabsTrigger>
            </TabsList>

            <TabsContent value="personal" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <User className="w-5 h-5 mr-2" />
                    Informations de base
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex items-center space-x-6">
                    <Avatar className="w-24 h-24">
                      <AvatarImage src="" />
                      <AvatarFallback className="text-lg">SD</AvatarFallback>
                    </Avatar>
                    <Button variant="outline" size="sm">
                      <Camera className="w-4 h-4 mr-2" />
                      Changer la photo
                    </Button>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="firstName">Prénom</Label>
                      <Input 
                        id="firstName" 
                        value={profile.firstName}
                        onChange={(e) => setProfile({...profile, firstName: e.target.value})}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="lastName">Nom</Label>
                      <Input 
                        id="lastName" 
                        value={profile.lastName}
                        onChange={(e) => setProfile({...profile, lastName: e.target.value})}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="university">Université</Label>
                    <Select value={profile.university} onValueChange={(value) => setProfile({...profile, university: value})}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Université de Tunis El Manar">Université de Tunis El Manar</SelectItem>
                        <SelectItem value="ENIS Sfax">ENIS Sfax</SelectItem>
                        <SelectItem value="INSAT">INSAT</SelectItem>
                        <SelectItem value="ESPRIT">ESPRIT</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="field">Filière d'études</Label>
                    <Input 
                      id="field" 
                      value={profile.field}
                      onChange={(e) => setProfile({...profile, field: e.target.value})}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="description">Description</Label>
                    <Textarea 
                      id="description" 
                      placeholder="Parlez de vous..."
                      value={profile.description}
                      onChange={(e) => setProfile({...profile, description: e.target.value})}
                    />
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="preferences" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <MapPin className="w-5 h-5 mr-2" />
                    Préférences de logement
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="budget">Budget mensuel (TND)</Label>
                    <div className="relative">
                      <Euro className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input 
                        id="budget" 
                        type="number"
                        placeholder="400"
                        className="pl-10"
                        value={profile.budget}
                        onChange={(e) => setProfile({...profile, budget: e.target.value})}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label>Préférences de quartier</Label>
                    <div className="flex flex-wrap gap-2">
                      <Badge variant="secondary">Proche université</Badge>
                      <Badge variant="outline">Transport en commun</Badge>
                      <Badge variant="outline">Centre-ville</Badge>
                      <Badge variant="outline">Calme</Badge>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label>Type de logement préféré</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Sélectionnez" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="studio">Studio partagé</SelectItem>
                        <SelectItem value="2pieces">2 pièces</SelectItem>
                        <SelectItem value="3pieces">3 pièces</SelectItem>
                        <SelectItem value="maison">Maison</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="lifestyle" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Clock className="w-5 h-5 mr-2" />
                    Habitudes de vie
                  </CardTitle>
                  <CardDescription>
                    Ces informations nous aident à trouver le colocataire le plus compatible
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="sleepTime">Heure de coucher</Label>
                      <Input 
                        id="sleepTime" 
                        type="time"
                        value={profile.sleepTime}
                        onChange={(e) => setProfile({...profile, sleepTime: e.target.value})}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="wakeTime">Heure de réveil</Label>
                      <Input 
                        id="wakeTime" 
                        type="time"
                        value={profile.wakeTime}
                        onChange={(e) => setProfile({...profile, wakeTime: e.target.value})}
                      />
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        {profile.isSmoker ? <Cigarette className="w-5 h-5" /> : <CigaretteOff className="w-5 h-5" />}
                        <Label htmlFor="smoking">Je fume</Label>
                      </div>
                      <Switch 
                        id="smoking"
                        checked={profile.isSmoker}
                        onCheckedChange={(checked) => setProfile({...profile, isSmoker: checked})}
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <Dog className="w-5 h-5" />
                        <Label htmlFor="pets">J'accepte les animaux</Label>
                      </div>
                      <Switch 
                        id="pets"
                        checked={profile.allowsPets}
                        onCheckedChange={(checked) => setProfile({...profile, allowsPets: checked})}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label>Niveau de sociabilité</Label>
                    <Select value={profile.socialLevel} onValueChange={(value) => setProfile({...profile, socialLevel: value})}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="faible">
                          <div className="flex items-center">
                            <VolumeX className="w-4 h-4 mr-2" />
                            Plutôt discret
                          </div>
                        </SelectItem>
                        <SelectItem value="moyen">
                          <div className="flex items-center">
                            <Volume2 className="w-4 h-4 mr-2" />
                            Sociable modéré
                          </div>
                        </SelectItem>
                        <SelectItem value="haut">
                          <div className="flex items-center">
                            <Volume2 className="w-4 h-4 mr-2" />
                            Très sociable
                          </div>
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label>Niveau de propreté</Label>
                    <Select value={profile.cleanliness} onValueChange={(value) => setProfile({...profile, cleanliness: value})}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="normale">Normale</SelectItem>
                        <SelectItem value="haute">Très propre</SelectItem>
                        <SelectItem value="perfectionniste">Perfectionniste</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </CardContent>
              </Card>

              <div className="flex flex-col items-end space-y-2">
                {error && <span className="text-red-500 text-sm">{error}</span>}
                {success && <span className="text-green-600 text-sm">Profil mis à jour !</span>}
                <Button
                  variant="gradient"
                  size="lg"
                  disabled={loading}
                  onClick={async () => {
                    setError(null);
                    setSuccess(false);
                    try {
                      const token = localStorage.getItem("binomiToken");
                      if (!token) throw new Error("Token manquant");
                      await updateProfile(token, profile);
                      setSuccess(true);
                    } catch (err: any) {
                      setError(err?.response?.data?.message || err.message || "Erreur lors de la mise à jour");
                    }
                  }}
                >
                  <Save className="w-4 h-4 mr-2" />
                  {loading ? "Chargement..." : "Sauvegarder le profil"}
                </Button>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}

export default Profile;

