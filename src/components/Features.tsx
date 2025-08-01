import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Heart, Home, MessageCircle, Shield, Users, Zap } from "lucide-react";
import { useContext } from "react";
import { LangContext } from "@/context/LangContext";

const translations = {
  fr: {
    title: "Pourquoi choisir Binomi ?",
    desc: "Nous simplifions la vie étudiante en connectant les personnes qui partagent les mêmes valeurs et objectifs.",
    features: [
      {
        icon: Heart,
        title: "Matching Intelligent",
        description: "Notre algorithme analyse vos préférences et traits de caractère pour vous proposer les binômes les plus compatibles.",
        color: "text-red-500"
      },
      {
        icon: Home,
        title: "Logements Vérifiés",
        description: "Découvrez une sélection de logements en colocation vérifiés par nos équipes avec photos et descriptions détaillées.",
        color: "text-blue-500"
      },
      {
        icon: MessageCircle,
        title: "Chat Sécurisé",
        description: "Communiquez en toute sécurité avec vos futurs colocataires grâce à notre système de messagerie intégré.",
        color: "text-green-500"
      },
      {
        icon: Shield,
        title: "Profils Vérifiés",
        description: "Tous les profils sont vérifiés pour garantir votre sécurité et des rencontres authentiques.",
        color: "text-purple-500"
      },
      {
        icon: Users,
        title: "Communauté Active",
        description: "Rejoignez une communauté de plus de 2500 étudiants actifs dans toute la France.",
        color: "text-orange-500"
      },
      {
        icon: Zap,
        title: "Réponse Rapide",
        description: "Trouvez votre binôme ou votre logement en quelques clics grâce à notre interface intuitive.",
        color: "text-yellow-500"
      }
    ]
  },
  tn: {
    title: "لماذا Binomi؟",
    desc: "نسهّل حياة الطلبة عبر ربط الأشخاص الذين يتقاسمون نفس القيم والأهداف.",
    features: [
      {
        icon: Heart,
        title: "مطابقة ذكية",
        description: "خوارزمية تحلل تفضيلاتك وسماتك الشخصية لتقترح عليك الشريك الأنسب.",
        color: "text-red-500"
      },
      {
        icon: Home,
        title: "سكن موثوق",
        description: "اكتشف مجموعة من السكن المشترك الموثوق به مع صور ووصف دقيق.",
        color: "text-blue-500"
      },
      {
        icon: MessageCircle,
        title: "دردشة آمنة",
        description: "تواصل بأمان مع زملائك عبر نظام المراسلة المدمج.",
        color: "text-green-500"
      },
      {
        icon: Shield,
        title: "ملفات موثقة",
        description: "كل الملفات موثقة لضمان الأمان ولقاءات حقيقية.",
        color: "text-purple-500"
      },
      {
        icon: Users,
        title: "مجتمع نشيط",
        description: "انضم إلى مجتمع يضم أكثر من 2500 طالب نشيط في تونس.",
        color: "text-orange-500"
      },
      {
        icon: Zap,
        title: "استجابة سريعة",
        description: "اعثر على شريكك أو سكنك في بضع نقرات بفضل واجهتنا السهلة.",
        color: "text-yellow-500"
      }
    ]
  }
};

const Features = () => {
  const { lang } = useContext(LangContext);
  const t = translations[lang];
  return (
    <section id="about" className="py-20 bg-muted/30">
      <div className="container">
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-3xl md:text-4xl font-bold">
            {t.title}
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            {t.desc}
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {t.features.map((feature, index) => (
            <Card key={index} variant="elevated" className="group">
              <CardHeader>
                <div className={`w-12 h-12 rounded-lg bg-gradient-primary/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                  <feature.icon className={`w-6 h-6 ${feature.color}`} />
                </div>
                <CardTitle className="text-xl">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base leading-relaxed">
                  {feature.description}
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;