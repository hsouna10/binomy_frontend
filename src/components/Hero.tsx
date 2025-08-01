import { Button } from "@/components/ui/button";
import { ArrowRight, Heart, Home } from "lucide-react";
import heroStudents from "@/assets/hero-students.jpg";
import { useContext } from "react";
import { LangContext } from "@/context/LangContext";

const translations = {
  fr: {
    title1: "Trouvez votre",
    title2: "binôme parfait",
    title3: "et votre",
    title4: "logement idéal",
    desc: "Binomi met en relation les étudiants selon leurs affinités pour former des binômes et facilite la recherche de logements en colocation.",
    findBuddy: "Trouver mon binôme",
    exploreHousing: "Explorer les logements",
    students: "Étudiants actifs",
    matches: "Binômes formés",
    housings: "Logements"
  },
  tn: {
    title1: "إبحث عن",
    title2: "شريكك المثالي",
    title3: "و",
    title4: "منزلك المناسب",
    desc: "Binomi يربط الطلبة حسب اهتماماتهم لتكوين ثنائيات ويسهّل البحث عن سكن مشترك.",
    findBuddy: "إيجاد شريك",
    exploreHousing: "إستكشاف السكن",
    students: "طلبة نشيطون",
    matches: "ثنائيات مكونة",
    housings: "مساكن"
  }
};

const Hero = () => {
  const { lang } = useContext(LangContext);
  const t = translations[lang];
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-hero opacity-10" />
      
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-primary/10 rounded-full blur-3xl animate-pulse-glow" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-info/10 rounded-full blur-3xl animate-float" />
      </div>

      <div className="container relative z-10 flex flex-col lg:flex-row items-center gap-12 py-20">
        {/* Content */}
        <div className="flex-1 text-center lg:text-left space-y-8">
          <div className="space-y-4">
            <h1 className="text-4xl md:text-6xl font-bold leading-tight">
              {t.title1} {" "}
              <span className="bg-gradient-primary bg-clip-text text-transparent">
                {t.title2}
              </span>{" "}
              {t.title3} {" "}
              <span className="bg-gradient-primary bg-clip-text text-transparent">
                {t.title4}
              </span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl">
              {t.desc}
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
            <Button variant="hero" size="lg" className="group">
              <Heart className="w-5 h-5 mr-2 group-hover:animate-pulse" />
              {t.findBuddy}
              <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button variant="outline" size="lg" className="group">
              <Home className="w-5 h-5 mr-2" />
              {t.exploreHousing}
              <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-6 pt-8">
            <div className="text-center">
              <div className="text-2xl font-bold text-primary">2,500+</div>
              <div className="text-sm text-muted-foreground">{t.students}</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-primary">1,200+</div>
              <div className="text-sm text-muted-foreground">{t.matches}</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-primary">850+</div>
              <div className="text-sm text-muted-foreground">{t.housings}</div>
            </div>
          </div>
        </div>

        {/* Hero Image */}
        <div className="flex-1">
          <div className="relative">
            <img
              src={heroStudents}
              alt="Étudiants collaborant ensemble"
              className="w-full max-w-lg mx-auto rounded-2xl shadow-2xl animate-float"
            />
            <div className="absolute -top-4 -left-4 w-24 h-24 bg-primary/20 rounded-full blur-xl animate-pulse-glow" />
            <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-info/20 rounded-full blur-xl animate-pulse-glow" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;