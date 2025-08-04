import { useState, useContext } from "react";
import StudentRegistration from "./StudentRegistration";
import api from "@/lib/api";
import { LangContext } from "@/context/LangContext";
import { useToast } from "@/components/ui/use-toast";
import { useNavigate } from "react-router-dom";
import { matchingScenario } from "../static/matchingScenario";
import { Button } from "@/components/ui/button";
// import { Card } from "@/components/ui/card"; // doublon supprimé
import { Progress } from "@/components/ui/progress";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Users, GraduationCap, Home, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

const translations = {
  fr: {
    login: "Connexion",
    register: "Inscription",
    welcome: "Rejoignez la communauté étudiante",
    email: "Email",
    password: "Mot de passe",
    forgot: "Mot de passe oublié ?",
    createAccount: "Créer mon compte",
    confirmPassword: "Confirmer le mot de passe",
    firstName: "Prénom",
    lastName: "Nom",
    age: "Âge",
    student: "Étudiant",
    owner: "Propriétaire",
    selectUniversity: "Sélectionnez votre université",
    accountCreated: "Votre compte a bien été créé.",
    error: "Erreur",
    passwordsDontMatch: "Les mots de passe ne correspondent pas",
    alreadyHaveAccount: "Vous avez déjà un compte ?",
    toLogin: "Se connecter",
    toRegister: "Créer un compte"
  },
  tn: {
    login: "دخول",
    register: "تسجيل",
    welcome: "انضم إلى مجتمع الطلبة",
    email: "البريد الإلكتروني",
    password: "كلمة السر",
    forgot: "نسيت كلمة السر؟",
    createAccount: "إنشاء حساب",
    confirmPassword: "تأكيد كلمة السر",
    firstName: "الاسم",
    lastName: "اللقب",
    age: "العمر",
    student: "طالب",
    owner: "مالك",
    selectUniversity: "اختر جامعتك",
    accountCreated: "تم إنشاء حسابك بنجاح.",
    error: "خطأ",
    passwordsDontMatch: "كلمتا السر غير متطابقتين",
    alreadyHaveAccount: "لديك حساب بالفعل؟",
    toLogin: "دخول",
    toRegister: "تسجيل"
  }
};

const Auth = () => {
  const { lang, setLang } = useContext(LangContext);
  const t = translations[lang];
  const [userType, setUserType] = useState<"student" | "owner">("student");
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [loginError, setLoginError] = useState("");
  const [registerNom, setRegisterNom] = useState("");
  const [registerPrenom, setRegisterPrenom] = useState("");
  const [registerAge, setRegisterAge] = useState("");
  const [registerEmail, setRegisterEmail] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");
  const [registerConfirmPassword, setRegisterConfirmPassword] = useState("");
  const [registerPhone, setRegisterPhone] = useState("");
  const [registerBirth, setRegisterBirth] = useState("");
  const [registerProfilePic, setRegisterProfilePic] = useState<File | null>(null);
  const [registerError, setRegisterError] = useState("");
  const [showStudentRegistration, setShowStudentRegistration] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-secondary/5 to-accent/5 flex items-center justify-center p-4">
      <div className="w-full max-w-md space-y-6">
        <div className="text-center space-y-2">
          <div className="flex justify-end mb-2">
            <button
              className={`px-2 py-1 rounded text-xs mr-2 ${lang === 'fr' ? 'bg-primary text-white' : 'bg-gray-200'}`}
              onClick={() => setLang('fr')}
            >FR</button>
            <button
              className={`px-2 py-1 rounded text-xs ${lang === 'tn' ? 'bg-primary text-white' : 'bg-gray-200'}`}
              onClick={() => setLang('tn')}
            >TN</button>
          </div>
          <Link to="/" className="inline-flex items-center text-sm text-muted-foreground hover:text-primary transition-colors mb-4">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Retour à l'accueil
          </Link>
          <div className="flex items-center justify-center space-x-2">
            <div className="w-10 h-10 bg-gradient-primary rounded-lg flex items-center justify-center">
              <Users className="w-6 h-6 text-white" />
            </div>
            <span className="text-2xl font-bold bg-gradient-primary bg-clip-text text-transparent">
              Binomi
            </span>
          </div>
          <p className="text-muted-foreground">{t.welcome}</p>
        </div>

        {/* Barre d'étapes du profil (sans Informations personnelles) */}
        <Card className="mb-6 p-4">
          <Progress value={0} className="h-3 rounded-full" />
          <div className="flex justify-between text-xs mt-2 text-muted-foreground">
            <span>Test de personnalité</span>
            <span>Préférences logement</span>
            <span>Style de vie</span>
          </div>
        </Card>
        {!showStudentRegistration ? (
          <Tabs defaultValue="login" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="login">{t.login}</TabsTrigger>
              <TabsTrigger value="register">{t.register}</TabsTrigger>
            </TabsList>
            <TabsContent value="login">
              {/* ...existing code for login... */}
              <Card>
                <CardHeader>
                  <CardTitle>{t.login}</CardTitle>
                  <CardDescription>{t.login}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="email">{t.email}</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="votre@email.com"
                      value={loginEmail}
                      onChange={e => setLoginEmail(e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="password">{t.password}</Label>
                    <Input
                      id="password"
                      type="password"
                      value={loginPassword}
                      onChange={e => setLoginPassword(e.target.value)}
                    />
                  </div>
                  {loginError && (
                    <div className="text-red-500 text-sm text-center">{loginError}</div>
                  )}
                  <Button
                    className="w-full"
                    variant="gradient"
                    onClick={async e => {
                      e.preventDefault();
                      setLoginError("");
                      try {
                        const res = await api.post("/signin", { email: loginEmail, password: loginPassword });
                        const data = res.data;
                        localStorage.setItem("binomiUser", JSON.stringify(data.user));
                        localStorage.setItem("binomiToken", data.token);
                        navigate("/matching");
                      } catch (err) {
                        setLoginError("Erreur serveur");
                      }
                    }}
                  >
                    Se connecter
                  </Button>
                  <Button
                    className="w-full mt-2 flex items-center justify-center gap-2 border border-gray-300 bg-white text-gray-700 hover:bg-gray-50"
                    variant="outline"
                    onClick={() => {
                      window.location.href = "http://localhost:5000/api/google";
                    }}
                  >
                    <img src="https://upload.wikimedia.org/wikipedia/commons/4/4a/Logo_2013_Google.png" alt="Google" className="w-5 h-5 mr-2" />
                    Connexion avec Google
                  </Button>
                  <p className="text-center text-sm text-muted-foreground">
                    <a href="#" className="hover:text-primary transition-colors">
                      {t.forgot}
                    </a>
                  </p>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="register">
              {/* ...existing code for register... */}
              <Card>
                <CardHeader>
                  <CardTitle>{t.register}</CardTitle>
                  <CardDescription>{t.createAccount}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label>Je suis</Label>
                    <Select value={userType} onValueChange={(value: "student" | "owner") => setUserType(value)}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="student">
                          <div className="flex items-center">
                            <GraduationCap className="w-4 h-4 mr-2" />
                            {t.student}
                          </div>
                        </SelectItem>
                        <SelectItem value="owner">
                          <div className="flex items-center">
                            <Home className="w-4 h-4 mr-2" />
                            {t.owner}
                          </div>
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="firstName">{t.firstName}</Label>
                      <Input id="firstName" placeholder="Sarah" value={registerPrenom} onChange={e => setRegisterPrenom(e.target.value)} />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="lastName">{t.lastName}</Label>
                      <Input id="lastName" placeholder="Dupont" value={registerNom} onChange={e => setRegisterNom(e.target.value)} />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="birth">Date de naissance</Label>
                    <Input id="birth" type="date" placeholder="2000-01-01" value={registerBirth} onChange={e => setRegisterBirth(e.target.value)} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Téléphone</Label>
                    <Input id="phone" type="tel" placeholder="+21620000000" value={registerPhone} onChange={e => setRegisterPhone(e.target.value)} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="profilePic">Photo de profil</Label>
                    <Input id="profilePic" type="file" accept="image/*" onChange={e => setRegisterProfilePic(e.target.files?.[0] || null)} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">{t.email}</Label>
                    <Input id="email" type="email" placeholder="sarah@exemple.com" value={registerEmail} onChange={e => setRegisterEmail(e.target.value)} />
                    {registerError && registerError.includes('email') && (
                      <div className="text-red-500 text-xs mt-1">{registerError}</div>
                    )}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="password">{t.password}</Label>
                    <Input id="password" type="password" value={registerPassword} onChange={e => setRegisterPassword(e.target.value)} />
                    {registerError && registerError.includes('mot de passe') && (
                      <div className="text-red-500 text-xs mt-1">{registerError}</div>
                    )}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="confirmPassword">{t.confirmPassword}</Label>
                    <Input id="confirmPassword" type="password" value={registerConfirmPassword} onChange={e => setRegisterConfirmPassword(e.target.value)} />
                  </div>
                  {registerError && (
                    <div className="text-red-500 text-sm text-center">{registerError}</div>
                  )}
                  <Button className="w-full mt-6" variant="gradient" onClick={async e => {
                    e.preventDefault();
                    setRegisterError("");
                    // Email validation
                    const emailRegex = /^[\w.-]+@(gmail\.com|yahoo\.com)$/i;
                    if (!registerEmail.match(emailRegex)) {
                      setRegisterError("L'email doit être @gmail.com ou @yahoo.com");
                      return;
                    }
                    // Password strength validation
                    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=[\]{};':\"\\|,.<>/?]).{8,}$/;
                    if (!registerPassword.match(passwordRegex)) {
                      setRegisterError("Le mot de passe doit contenir au moins 8 caractères, une majuscule, une minuscule, un chiffre et un caractère spécial.");
                      return;
                    }
                    if (registerPassword !== registerConfirmPassword) {
                      setRegisterError(t.passwordsDontMatch);
                      toast({ title: t.error, description: t.passwordsDontMatch, variant: "destructive" });
                      return;
                    }
                    try {
                      const formData = new FormData();
                      formData.append("first_name", registerPrenom);
                      formData.append("last_name", registerNom);
                      formData.append("email", registerEmail);
                      formData.append("password", registerPassword);
                      formData.append("user_type", userType);
                      if (registerPhone) formData.append("phone", registerPhone);
                      if (registerBirth) formData.append("date_of_birth", registerBirth);
                      if (registerProfilePic) formData.append("profile_picture", registerProfilePic);
                      const res = await api.post("/signup", formData, {
                        headers: { "Content-Type": "multipart/form-data" },
                      });
                      const data = res.data;
                      localStorage.setItem("binomiUser", JSON.stringify(data.user));
                      localStorage.setItem("binomiToken", data.token);
                      toast({ title: t.register, description: t.accountCreated, variant: "default" });
                      setShowStudentRegistration(true);
                    } catch (err) {
                      setRegisterError("Erreur serveur");
                      toast({ title: t.error, description: "Erreur serveur", variant: "destructive" });
                    }
                  }}>
                    Créer mon compte
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        ) : (
          <div className="w-full max-w-2xl mx-auto">
            <StudentRegistration />
          </div>
        )}
      </div>
    </div>
  );
};

export default Auth;