import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";

const initialState = {
  university: "",
  study_level: "",
  field_of_study: "",
  academic_year: "",
  sleep: "",
  social: "",
  clean: "",
  smoke: "",
  housingBudget: "",
  budget_min: "",
  budget_max: "",
  housingLocation: "",
  preferred_location: "",
  housingRoomType: "",
  housing_type: "",
  housingDuration: "",
  housingMoveIn: "",
  interests: [] as string[],
  languages: "",
  bio: "",
  pets: "",
  is_smoker: false,
  is_drinker: false,
  accepts_smoker: false,
  accepts_drinker: false,
  accepts_pets: false,
  noise_level: "",
  cleaning_schedule: "",
  conflict_handling: "",
  guest_frequency: "",
  sharing_items: "",
  study_or_work: "",
  quiet_for_study: "",
  gender_identity: "",
  preferred_gender: "",
  cultural_preferences: "",
  privacy: 3,
  respect: 3,
  communication: 3,
  shared_activities: 3,
  quiet_environment: 3,
};


export default function StudentRegistration() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState(initialState);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const totalSteps = 4;
  const progress = (step / totalSteps) * 100;
  const navigate = useNavigate();

  const handleChange = (field: string, value: any) => {
    setFormData(f => ({ ...f, [field]: value }));
  };

  const handleFinalSubmit = async () => {
    try {
      const token = sessionStorage.getItem("binomiToken");
      const payload = {
        university: formData.university,
        study_level: formData.study_level,
        field_of_study: formData.field_of_study,
        academic_year: formData.academic_year,
        sleep_time: formData.sleep,
        social_behavior: formData.social,
        clean_frequency: formData.clean,
        noise_level: formData.noise_level,
        cleanliness_importance: formData.respect || null,
        cleaning_schedule: formData.cleaning_schedule === 'Yes' || formData.cleaning_schedule === 'true',
        conflict_resolution: formData.conflict_handling,
        smoke_status: formData.smoke,
        accept_smoking_roommate: formData.accepts_smoker,
        pets_preference: formData.pets,
        housing_budget: formData.housingBudget ? Number(formData.housingBudget) : null,
        budget_min: formData.budget_min ? Number(formData.budget_min) : null,
        budget_max: formData.budget_max ? Number(formData.budget_max) : null,
        housing_room_type: formData.housingRoomType,
        housing_type: formData.housing_type,
        housing_duration: formData.housingDuration,
        housing_move_in: formData.housingMoveIn,
        housing_location: formData.housingLocation,
        preferred_location: formData.preferred_location,
        languages: Array.isArray(formData.languages) ? formData.languages : formData.languages.split(',').map(l => l.trim()).filter(l => l),
        interests: Array.isArray(formData.interests) ? formData.interests : (formData.interests || '').split(',').map(i => i.trim()).filter(i => i),
        bio: formData.bio,
        roommate_gender_preference: formData.preferred_gender,
        cultural_dietary_notes: formData.cultural_preferences,
        importance_respect: formData.respect,
        importance_communication: formData.communication,
        importance_privacy: formData.privacy,
        importance_shared_activities: formData.shared_activities,
        importance_quiet: formData.quiet_environment,
        is_smoker: formData.is_smoker,
        is_drinker: formData.is_drinker,
        accepts_smoker: formData.accepts_smoker,
        accepts_drinker: formData.accepts_drinker,
        accepts_pets: formData.accepts_pets,
        guest_frequency: formData.guest_frequency,
        sharing_items: formData.sharing_items,
        study_or_work: formData.study_or_work,
        quiet_for_study: formData.quiet_for_study,
        gender_identity: formData.gender_identity,
      };
      await axios.post(
        "http://localhost:5000/student/",
        payload,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setSubmitSuccess(true);
      setTimeout(() => {
        navigate("/matching");
      }, 1000);
    } catch (err) {
      // Erreur d'envoi, mais pas de blocage sur les champs
    }
  };

  return (
    <div className="w-full max-w-xl md:max-w-2xl lg:max-w-3xl mx-auto p-4 sm:p-6 bg-white rounded-lg shadow-lg mt-4 sm:mt-8">
      <div className="mb-6">
        <Progress value={progress} className="h-3 rounded-full" />
        <div className="flex flex-col sm:flex-row sm:justify-between text-xs mt-2 text-muted-foreground gap-1">
          <span>Étape {step} sur 4</span>
          <span>{Math.round(progress)}% complété</span>
        </div>
      </div>

      {/* Card 1: Infos académiques */}
      {step === 1 && (
        <div className="bg-white rounded-2xl shadow-xl p-6 sm:p-10 border border-gray-200 mb-8">
          <h2 className="text-2xl font-bold mb-6 text-blue-700 flex items-center gap-2">🎓 Profil académique</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Université</label>
              <input className="w-full rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-400 focus:border-blue-400 px-4 py-2 transition" value={formData.university} onChange={e => handleChange('university', e.target.value)} />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Niveau d'études</label>
              <input className="w-full rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-400 focus:border-blue-400 px-4 py-2 transition" value={formData.study_level} onChange={e => handleChange('study_level', e.target.value)} />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Domaine d’études</label>
              <input className="w-full rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-400 focus:border-blue-400 px-4 py-2 transition" value={formData.field_of_study} onChange={e => handleChange('field_of_study', e.target.value)} />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Année académique</label>
              <input className="w-full rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-400 focus:border-blue-400 px-4 py-2 transition" value={formData.academic_year} onChange={e => handleChange('academic_year', e.target.value)} />
            </div>
          </div>
        </div>
      )}

      {/* Card 2: Routine & mode de vie */}
      {step === 2 && (
        <div className="bg-white rounded-2xl shadow-xl p-6 sm:p-10 border border-gray-200 mb-8">
          <h2 className="text-2xl font-bold mb-6 text-purple-700 flex items-center gap-2">🛏️ Routine & mode de vie</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Heure de coucher</label>
              <input className="w-full rounded-lg border border-gray-300 focus:ring-2 focus:ring-purple-400 focus:border-purple-400 px-4 py-2 transition" value={formData.sleep} onChange={e => handleChange('sleep', e.target.value)} placeholder="Before 10 PM" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Sociabilité</label>
              <input className="w-full rounded-lg border border-gray-300 focus:ring-2 focus:ring-purple-400 focus:border-purple-400 px-4 py-2 transition" value={formData.social} onChange={e => handleChange('social', e.target.value)} placeholder="Occasionally socialize with roommates" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Fréquence de ménage</label>
              <input className="w-full rounded-lg border border-gray-300 focus:ring-2 focus:ring-purple-400 focus:border-purple-400 px-4 py-2 transition" value={formData.clean} onChange={e => handleChange('clean', e.target.value)} placeholder="Weekly" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Fumeur ?</label>
              <input className="w-full rounded-lg border border-gray-300 focus:ring-2 focus:ring-purple-400 focus:border-purple-400 px-4 py-2 transition" value={formData.smoke} onChange={e => handleChange('smoke', e.target.value)} placeholder="No" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Niveau de bruit</label>
              <input className="w-full rounded-lg border border-gray-300 focus:ring-2 focus:ring-purple-400 focus:border-purple-400 px-4 py-2 transition" value={formData.noise_level} onChange={e => handleChange('noise_level', e.target.value)} placeholder="Moderate noise" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Animaux de compagnie</label>
              <input className="w-full rounded-lg border border-gray-300 focus:ring-2 focus:ring-purple-400 focus:border-purple-400 px-4 py-2 transition" value={formData.pets} onChange={e => handleChange('pets', e.target.value)} placeholder="Okay with certain pets" />
            </div>
          </div>
        </div>
      )}

      {/* Card 3: Logement */}
      {step === 3 && (
        <div className="bg-white rounded-2xl shadow-xl p-6 sm:p-10 border border-green-300 mb-8">
          <h2 className="text-2xl font-bold mb-6 text-green-700 flex items-center gap-2">🏠 Logement & Budget</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center gap-2">💶 Budget (€)</label>
              <input className="w-full rounded-lg border border-green-300 focus:ring-2 focus:ring-green-400 focus:border-green-400 px-4 py-2 transition" type="number" value={formData.housingBudget} onChange={e => handleChange('housingBudget', e.target.value)} placeholder="500" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center gap-2">🔻 Budget min</label>
              <input className="w-full rounded-lg border border-green-300 focus:ring-2 focus:ring-green-400 focus:border-green-400 px-4 py-2 transition" type="number" value={formData.budget_min} onChange={e => handleChange('budget_min', e.target.value)} placeholder="400" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center gap-2">🔺 Budget max</label>
              <input className="w-full rounded-lg border border-green-300 focus:ring-2 focus:ring-green-400 focus:border-green-400 px-4 py-2 transition" type="number" value={formData.budget_max} onChange={e => handleChange('budget_max', e.target.value)} placeholder="600" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center gap-2">📍 Localisation</label>
              <input className="w-full rounded-lg border border-green-300 focus:ring-2 focus:ring-green-400 focus:border-green-400 px-4 py-2 transition" value={formData.housingLocation} onChange={e => handleChange('housingLocation', e.target.value)} placeholder="Centre-ville" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center gap-2">📌 Localisation préférée</label>
              <input className="w-full rounded-lg border border-green-300 focus:ring-2 focus:ring-green-400 focus:border-green-400 px-4 py-2 transition" value={formData.preferred_location} onChange={e => handleChange('preferred_location', e.target.value)} placeholder="Centre-ville ou Ariana" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center gap-2">🛏️ Type de chambre</label>
              <select className="w-full rounded-lg border border-green-300 focus:ring-2 focus:ring-green-400 focus:border-green-400 px-4 py-2 transition" value={formData.housingRoomType} onChange={e => handleChange('housingRoomType', e.target.value)}>
                <option value="">Sélectionnez</option>
                <option value="Private room">Chambre privée</option>
                <option value="Shared room">Chambre partagée</option>
                <option value="Studio">Studio</option>
                <option value="Autre">Autre</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center gap-2">🏢 Type de logement</label>
              <select className="w-full rounded-lg border border-green-300 focus:ring-2 focus:ring-green-400 focus:border-green-400 px-4 py-2 transition" value={formData.housing_type} onChange={e => handleChange('housing_type', e.target.value)}>
                <option value="">Sélectionnez</option>
                <option value="studio">Studio</option>
                <option value="colocation">Colocation</option>
                <option value="residence">Résidence</option>
                <option value="chambre">Chambre</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center gap-2">⏳ Durée</label>
              <select className="w-full rounded-lg border border-green-300 focus:ring-2 focus:ring-green-400 focus:border-green-400 px-4 py-2 transition" value={formData.housingDuration} onChange={e => handleChange('housingDuration', e.target.value)}>
                <option value="">Sélectionnez</option>
                <option value="3 mois">3 mois</option>
                <option value="6 mois">6 mois</option>
                <option value="12 mois">12 mois</option>
                <option value="Autre">Autre</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center gap-2">📅 Date d'emménagement</label>
              <input className="w-full rounded-lg border border-green-300 focus:ring-2 focus:ring-green-400 focus:border-green-400 px-4 py-2 transition" type="date" value={formData.housingMoveIn} onChange={e => handleChange('housingMoveIn', e.target.value)} />
            </div>
          </div>
        </div>
      )}

      {/* Card 4: Préférences, valeurs, bio */}
      {step === 4 && (
        <div className="bg-white rounded-2xl shadow-xl p-6 sm:p-10 border border-gray-200 mb-8">
          <h2 className="text-2xl font-bold mb-6 text-pink-700 flex items-center gap-2">🧬 Préférences & valeurs</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Centres d'intérêt</label>
              <input className="w-full rounded-lg border border-gray-300 focus:ring-2 focus:ring-pink-400 focus:border-pink-400 px-4 py-2 transition" value={formData.interests.join(", ")} onChange={e => handleChange('interests', e.target.value.split(',').map(i => i.trim()))} placeholder="Sport, Cuisine, Lecture" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Langues</label>
              <input className="w-full rounded-lg border border-gray-300 focus:ring-2 focus:ring-pink-400 focus:border-pink-400 px-4 py-2 transition" value={formData.languages} onChange={e => handleChange('languages', e.target.value)} placeholder="Français, Anglais" />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">Bio</label>
              <textarea className="w-full rounded-lg border border-gray-300 focus:ring-2 focus:ring-pink-400 focus:border-pink-400 px-4 py-2 transition" value={formData.bio} onChange={e => handleChange('bio', e.target.value)} placeholder="Je suis calme, j’aime la propreté et je recherche une bonne ambiance." />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Étudiant ou travailleur</label>
              <input className="w-full rounded-lg border border-gray-300 focus:ring-2 focus:ring-pink-400 focus:border-pink-400 px-4 py-2 transition" value={formData.study_or_work} onChange={e => handleChange('study_or_work', e.target.value)} placeholder="Student" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Genre</label>
              <input className="w-full rounded-lg border border-gray-300 focus:ring-2 focus:ring-pink-400 focus:border-pink-400 px-4 py-2 transition" value={formData.gender_identity} onChange={e => handleChange('gender_identity', e.target.value)} placeholder="Male" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Préférence de genre</label>
              <input className="w-full rounded-lg border border-gray-300 focus:ring-2 focus:ring-pink-400 focus:border-pink-400 px-4 py-2 transition" value={formData.preferred_gender} onChange={e => handleChange('preferred_gender', e.target.value)} placeholder="No preference" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Préférences culturelles</label>
              <input className="w-full rounded-lg border border-gray-300 focus:ring-2 focus:ring-pink-400 focus:border-pink-400 px-4 py-2 transition" value={formData.cultural_preferences} onChange={e => handleChange('cultural_preferences', e.target.value)} placeholder="Végétarien, respecte les horaires de prière" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Respect (1-5)</label>
              <input type="number" min={1} max={5} className="w-full rounded-lg border border-gray-300 focus:ring-2 focus:ring-pink-400 focus:border-pink-400 px-4 py-2 transition" value={formData.respect} onChange={e => handleChange('respect', Number(e.target.value))} />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Communication (1-5)</label>
              <input type="number" min={1} max={5} className="w-full rounded-lg border border-gray-300 focus:ring-2 focus:ring-pink-400 focus:border-pink-400 px-4 py-2 transition" value={formData.communication} onChange={e => handleChange('communication', Number(e.target.value))} />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Vie partagée (1-5)</label>
              <input type="number" min={1} max={5} className="w-full rounded-lg border border-gray-300 focus:ring-2 focus:ring-pink-400 focus:border-pink-400 px-4 py-2 transition" value={formData.shared_activities} onChange={e => handleChange('shared_activities', Number(e.target.value))} />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Environnement calme (1-5)</label>
              <input type="number" min={1} max={5} className="w-full rounded-lg border border-gray-300 focus:ring-2 focus:ring-pink-400 focus:border-pink-400 px-4 py-2 transition" value={formData.quiet_environment} onChange={e => handleChange('quiet_environment', Number(e.target.value))} />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Vie privée (1-5)</label>
              <input type="number" min={1} max={5} className="w-full rounded-lg border border-gray-300 focus:ring-2 focus:ring-pink-400 focus:border-pink-400 px-4 py-2 transition" value={formData.privacy} onChange={e => handleChange('privacy', Number(e.target.value))} />
            </div>
          </div>
        </div>
      )}

      {/* Navigation & submit */}
      <div className="flex flex-col gap-2 mt-8">
        <div className="sticky bottom-0 left-0 right-0 z-20 bg-white/90 pt-2 pb-4 px-2 border-t flex flex-col sm:flex-row sm:justify-between gap-2 shadow-[0_-2px_8px_-4px_rgba(0,0,0,0.08)]">
          <Button variant="outline" className="w-full sm:w-auto" disabled={step === 1} onClick={() => setStep(s => Math.max(1, s - 1))}>Précédent</Button>
          {step < totalSteps ? (
            <Button variant="gradient" className="w-full sm:w-auto" onClick={() => setStep(s => Math.min(totalSteps, s + 1))}>Suivant</Button>
          ) : (
            <Button variant="gradient" className="w-full sm:w-auto" onClick={handleFinalSubmit}>Créer mon profil</Button>
          )}
        </div>
        {submitSuccess && <div className="text-green-600 text-sm text-center mt-2">Profil enregistré avec succès !</div>}
      </div>
    </div>
  );
}
