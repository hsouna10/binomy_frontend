
import { useContext } from "react";
import { LangContext } from "@/context/LangContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight, CheckCircle, Star } from "lucide-react";
import matchingSuccess from "@/assets/matching-success.jpg";

const translations = {
  fr: {
    sectionTitle: "Trouvez votre",
    sectionHighlight: "colocataire idéal",
    sectionDesc: "Comme Sarah & Yassine : 92% de compatibilité ! Notre algorithme intelligent analyse budget, habitudes de vie et localisation pour un matching parfait.",
    howItWorks: "Comment ça marche ?",
    steps: [
      {
        number: "01",
        title: "Créez votre profil détaillé",
        description: "Université, filière, budget, habitudes de vie (sommeil, propreté, fumeur), préférences de colocation et photo."
      },
      {
        number: "02",
        title: "Matching intelligent (92% de compatibilité)",
        description: "Notre algorithme compare vos habitudes, budget, localisation et profil psychologique pour vous proposer le colocataire idéal."
      },
      {
        number: "03",
        title: "Like & Match comme sur Tinder",
        description: "Consultez les profils suggérés, likez ceux qui vous plaisent. En cas de match mutuel, la messagerie s'active !"
      },
      {
        number: "04",
        title: "Cherchez un logement ensemble",
        description: "Discutez via notre chat intégré, partagez des annonces et contactez les propriétaires à deux."
      }
    ],
    startMatching: "Commencer le matching",
    criteriaTitle: "Critères analysés",
    criteriaDesc: "Nous évaluons ces aspects pour un matching optimal",
    traits: [
      "Budget & loyer",
      "Fumeur / Non fumeur",
      "Habitudes de sommeil",
      "Ordre et propreté",
      "Localisation université",
      "Préférence sexe colocataire",
      "Animaux domestiques",
      "Sociabilité & lifestyle"
    ]
  },
  tn: {
    sectionTitle: "لقاو",
    sectionHighlight: "شريك السكن المثالي",
    sectionDesc: "كيف سارة وياسين: ٩٢٪ نسبة تطابق! الخوارزمية الذكية متاعنا تحلل الميزانية، العادات اليومية والموقع باش تلقالك الشريك المناسب.",
    howItWorks: "كيفاش تخدم؟",
    steps: [
      {
        number: "٠١",
        title: "كوّن بروفيلك بالتفصيل",
        description: "جامعة، اختصاص، ميزانية، عادات الحياة (النوم، النظافة، التدخين)، تفضيلات السكن وصورة."
      },
      {
        number: "٠٢",
        title: "مطابقة ذكية (٩٢٪ نسبة تطابق)",
        description: "الخوارزمية تقارن العادات، الميزانية، الموقع والبروفيل النفسي باش تقترحلك الشريك المثالي."
      },
      {
        number: "٠٣",
        title: "Like & Match كيف Tinder",
        description: "شوف البروفيلات المقترحة، اعمل Like للي يعجبك. إذا صارت مطابقة، تتفعل المراسلة!"
      },
      {
        number: "٠٤",
        title: "قلبو على دار مع بعضكم",
        description: "تواصلو عبر الشات، شاركو الإعلانات وتصلو بالمالكين مع بعضكم."
      }
    ],
    startMatching: "إبدا المطابقة",
    criteriaTitle: "المعايير المدروسة",
    criteriaDesc: "نقيمو الجوانب هاذي باش المطابقة تكون مثالية",
    traits: [
      "الميزانية والكراء",
      "مدخن / غير مدخن",
      "عادات النوم",
      "النظافة والترتيب",
      "موقع الجامعة",
      "تفضيل جنس الشريك",
      "الحيوانات الأليفة",
      "الاجتماعية ونمط الحياة"
    ]
  }
};


const MatchingSection = () => {
  const { lang } = useContext(LangContext);
  const t = translations[lang] || translations.fr;

  return (
    <section id="matching" className="py-20">
      <div className="container">
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-3xl md:text-4xl font-bold">
            {t.sectionTitle}{" "}
            <span className="bg-gradient-primary bg-clip-text text-transparent">
              {t.sectionHighlight}
            </span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            {t.sectionDesc}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
          {/* Left side - Process */}
          <div className="space-y-8">
            <h3 className="text-2xl font-semibold">{t.howItWorks}</h3>
            {t.steps.map((step, index) => (
              <div key={index} className="flex items-start space-x-4 group">
                <div className="flex-shrink-0 w-12 h-12 bg-gradient-primary rounded-full flex items-center justify-center text-white font-bold group-hover:scale-110 transition-transform">
                  {step.number}
                </div>
                <div className="space-y-2">
                  <h4 className="text-lg font-medium">{step.title}</h4>
                  <p className="text-muted-foreground">{step.description}</p>
                </div>
              </div>
            ))}

            <Button variant="gradient" size="lg" className="group">
              <Star className="w-5 h-5 mr-2" />
              {t.startMatching}
              <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>

          {/* Right side - Image and traits */}
          <div className="space-y-6">
            <Card variant="glow">
              <CardContent className="p-0">
                <img
                  src={matchingSuccess}
                  alt={t.sectionHighlight}
                  className="w-full rounded-lg"
                />
              </CardContent>
            </Card>

            <Card variant="elevated">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <CheckCircle className="w-5 h-5 mr-2 text-success" />
                  {t.criteriaTitle}
                </CardTitle>
                <CardDescription>
                  {t.criteriaDesc}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-3">
                  {t.traits.map((trait, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-primary rounded-full" />
                      <span className="text-sm">{trait}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MatchingSection;