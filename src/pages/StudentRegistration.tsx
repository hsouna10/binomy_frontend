import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";

export default function StudentRegistration() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    age: "",
    university: "",
    major: "",
    bio: "",
    photo: undefined as File | undefined,
    budget: "",
    is_smoker: false,
    sleeps_early: false,
    is_clean: false,
    has_pets: false,
    preferred_gender: "",
  });

  const totalSteps = 4;
  const progress = (step / totalSteps) * 100;
  const [submitError, setSubmitError] = useState("");
  const [submitSuccess, setSubmitSuccess] = useState(false);

  // Récupère le token JWT du localStorage (stocké après signup)
  const token = localStorage.getItem("binomiToken");
  const navigate = useNavigate();

  // Soumission finale du formulaire
  const handleFinalSubmit = async () => {
    setSubmitError("");
    setSubmitSuccess(false);
    try {
      // Préparer les données à envoyer (hors photo)
      const dataToSend = {
        age: Number(formData.age),
        university: formData.university,
        major: formData.major,
        budget: Number(formData.budget),
        is_smoker: formData.is_smoker,
        sleeps_early: formData.sleeps_early,
        is_clean: formData.is_clean,
        has_pets: formData.has_pets,
        preferred_gender: formData.preferred_gender
      };
      let config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        withCredentials: true,
      };
      await axios.post("http://localhost:5000/api/students", dataToSend, config);
      setSubmitSuccess(true);
      setTimeout(() => navigate("/matching"), 1000);
    } catch (err) {
      setSubmitError("Erreur lors de l'envoi du profil. Veuillez réessayer.");
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-lg mt-8">
      <div className="mb-6">
        <Progress value={progress} className="h-3 rounded-full" />
        <div className="flex justify-between text-xs mt-2 text-muted-foreground">
          <span>Informations personnelles</span>
          <span>Test de personnalité</span>
          <span>Préférences logement</span>
          <span>Style de vie</span>
        </div>
      </div>
      {/* Step 1: Personal Info */}
      {step === 1 && (
        <div className="bg-white rounded-xl shadow-lg p-8 border mb-4">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-lg"><svg width="20" height="20" fill="none" viewBox="0 0 24 24"><path stroke="#222" strokeWidth="2" d="M12 12a5 5 0 1 0 0-10 5 5 0 0 0 0 10Zm0 2c-4.418 0-8 1.79-8 4v2a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1v-2c0-2.21-3.582-4-8-4Z"/></svg></span>
            <h2 className="text-xl font-bold">Informations personnelles</h2>
          </div>
          <div className="text-muted-foreground mb-4">Parlez-nous de vous</div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label>Prénom</label>
              <input className="input" placeholder="Votre prénom" value={formData.firstName} onChange={e => setFormData(f => ({ ...f, firstName: e.target.value }))} />
            </div>
            <div>
              <label>Nom</label>
              <input className="input" placeholder="Votre nom" value={formData.lastName} onChange={e => setFormData(f => ({ ...f, lastName: e.target.value }))} />
            </div>
            <div>
              <label>Email</label>
              <input className="input" placeholder="votre@email.com" value={formData.email} onChange={e => setFormData(f => ({ ...f, email: e.target.value }))} />
            </div>
            <div>
              <label>Âge</label>
              <input className="input" type="number" min="16" max="99" placeholder="23" value={formData.age} onChange={e => setFormData(f => ({ ...f, age: e.target.value }))} />
            </div>
            <div>
              <label>Université</label>
              <input className="input" placeholder="Université de Tunis" value={formData.university} onChange={e => setFormData(f => ({ ...f, university: e.target.value }))} />
            </div>
            <div>
              <label>Spécialité / Filière</label>
              <input className="input" placeholder="Informatique" value={formData.major} onChange={e => setFormData(f => ({ ...f, major: e.target.value }))} />
            </div>
            <div className="md:col-span-2">
              <label>Bio <span className="text-xs text-muted-foreground">(optionnel)</span></label>
              <textarea className="input" placeholder="Parlez-nous de vous en quelques mots..." value={formData.bio} onChange={e => setFormData(f => ({ ...f, bio: e.target.value }))} />
            </div>
            <div className="md:col-span-2 mt-4 border border-dashed rounded-lg p-4 flex flex-col items-center justify-center text-center">
              <svg width="32" height="32" fill="none" viewBox="0 0 24 24"><path stroke="#888" strokeWidth="2" d="M12 16v-8m0 0-3 3m3-3 3 3M4 16v2a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-2"/></svg>
              <div className="mb-2 text-muted-foreground">Ajoutez une photo de profil (optionnel)</div>
              <input type="file" accept="image/*" className="hidden" id="profilePhoto" onChange={e => {
                const file = e.target.files?.[0];
                if (file) setFormData(f => ({ ...f, photo: file }));
              }} />
              <label htmlFor="profilePhoto">
                <Button type="button" variant="outline">Choisir une photo</Button>
              </label>
              {formData.photo && <div className="mt-2 text-xs">{formData.photo.name}</div>}
            </div>
          </div>
        </div>
      )}
      {/* Step 2: Personality Test */}
      {step === 2 && (
        <div className="bg-white rounded-xl shadow-lg p-8 border mb-4">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-lg"><svg width="20" height="20" fill="none" viewBox="0 0 24 24"><path stroke="#222" strokeWidth="2" d="M12 2a10 10 0 1 1 0 20 10 10 0 0 1 0-20Zm0 6v4l3 3"/></svg></span>
            <h2 className="text-xl font-bold">Test de personnalité</h2>
          </div>
          <div className="text-muted-foreground mb-4">Aidez-nous à mieux vous connaître</div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="font-medium">Fumez-vous ?</label>
              <div className="flex gap-4 mt-1">
                <label className="flex items-center gap-1">
                  <input type="radio" name="is_smoker" checked={formData.is_smoker === false} onChange={() => setFormData(f => ({ ...f, is_smoker: false }))} /> Non
                </label>
                <label className="flex items-center gap-1">
                  <input type="radio" name="is_smoker" checked={formData.is_smoker === true} onChange={() => setFormData(f => ({ ...f, is_smoker: true }))} /> Oui
                </label>
              </div>
            </div>
            <div>
              <label className="font-medium">Vous couchez-vous tôt ?</label>
              <div className="flex gap-4 mt-1">
                <label className="flex items-center gap-1">
                  <input type="radio" name="sleeps_early" checked={formData.sleeps_early === true} onChange={() => setFormData(f => ({ ...f, sleeps_early: true }))} /> Oui
                </label>
                <label className="flex items-center gap-1">
                  <input type="radio" name="sleeps_early" checked={formData.sleeps_early === false} onChange={() => setFormData(f => ({ ...f, sleeps_early: false }))} /> Non
                </label>
              </div>
            </div>
            <div>
              <label className="font-medium">Êtes-vous ordonné(e) ?</label>
              <div className="flex gap-4 mt-1">
                <label className="flex items-center gap-1">
                  <input type="radio" name="is_clean" checked={formData.is_clean === true} onChange={() => setFormData(f => ({ ...f, is_clean: true }))} /> Oui
                </label>
                <label className="flex items-center gap-1">
                  <input type="radio" name="is_clean" checked={formData.is_clean === false} onChange={() => setFormData(f => ({ ...f, is_clean: false }))} /> Non
                </label>
              </div>
            </div>
            <div>
              <label className="font-medium">Avez-vous des animaux ?</label>
              <div className="flex gap-4 mt-1">
                <label className="flex items-center gap-1">
                  <input type="radio" name="has_pets" checked={formData.has_pets === false} onChange={() => setFormData(f => ({ ...f, has_pets: false }))} /> Non
                </label>
                <label className="flex items-center gap-1">
                  <input type="radio" name="has_pets" checked={formData.has_pets === true} onChange={() => setFormData(f => ({ ...f, has_pets: true }))} /> Oui
                </label>
              </div>
            </div>
            <div className="md:col-span-2">
              <label className="font-medium">Genre de colocataire préféré</label>
              <select className="input mt-1" value={formData.preferred_gender} onChange={e => setFormData(f => ({ ...f, preferred_gender: e.target.value }))}>
                <option value="">Indifférent</option>
                <option value="female">Femme</option>
                <option value="male">Homme</option>
                <option value="other">Autre</option>
              </select>
            </div>
          </div>
        </div>
      )}
      {/* Step 3: Housing Preferences */}
      {step === 3 && (
        <div className="bg-white rounded-xl shadow-lg p-8 border mb-4">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-lg"><svg width="20" height="20" fill="none" viewBox="0 0 24 24"><path stroke="#222" strokeWidth="2" d="M4 21v-2a4 4 0 0 1 4-4h8a4 4 0 0 1 4 4v2M16 7a4 4 0 1 1-8 0 4 4 0 0 1 8 0Z"/></svg></span>
            <h2 className="text-xl font-bold">Préférences logement</h2>
          </div>
          <div className="text-muted-foreground mb-4">Aidez-nous à cibler votre recherche</div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="font-medium">💶 Budget (€)</label>
              <input className="input mt-1" type="number" min="0" value={formData.budget} onChange={e => setFormData(f => ({ ...f, budget: e.target.value }))} placeholder="Ex: 500" />
            </div>
            {/* Champs logement supprimés car non utilisés dans l'API */}
          </div>
        </div>
      )}
      {/* Step 4: Lifestyle */}
      {step === 4 && (
        <div className="bg-white rounded-xl shadow-lg p-8 border mb-4 text-center text-muted-foreground">
          <div className="flex items-center gap-2 mb-4 justify-center">
            <span className="text-lg"><svg width="20" height="20" fill="none" viewBox="0 0 24 24"><path stroke="#222" strokeWidth="2" d="M12 2a10 10 0 1 1 0 20 10 10 0 0 1 0-20Zm0 6v4l3 3"/></svg></span>
            <h2 className="text-xl font-bold">Merci !</h2>
          </div>
          <div>Votre profil est presque prêt. Cliquez sur "Terminer" pour valider.</div>
        </div>
      )}
      <div className="flex flex-col gap-2 mt-8">
        <div className="flex justify-between">
          <Button
            variant="outline"
            disabled={step === 1}
            onClick={() => setStep(s => Math.max(1, s - 1))}
          >
            Précédent
          </Button>
          {step < totalSteps ? (
            <Button
              variant="gradient"
              onClick={() => setStep(s => Math.min(totalSteps, s + 1))}
            >
              Suivant
            </Button>
          ) : (
            <Button
              variant="gradient"
              onClick={handleFinalSubmit}
              disabled={submitSuccess}
            >
              Terminer
            </Button>
          )}
        </div>
        {submitError && <div className="text-red-500 text-sm text-center mt-2">{submitError}</div>}
        {submitSuccess && <div className="text-green-600 text-sm text-center mt-2">Profil enregistré avec succès !</div>}
      </div>
    </div>
  );
}
