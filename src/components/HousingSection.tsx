
import { useContext } from "react";
import { LangContext } from "@/context/LangContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MapPin, Euro, Users, Wifi, Car, Coffee, ArrowRight } from "lucide-react";
import housingImage from "@/assets/housing-image.jpg";

const translations = {
  fr: {
    sectionTitle: "Trouvez votre",
    sectionHighlight: "logement idéal",
    sectionDesc: "Découvrez notre sélection de logements étudiants vérifiés dans toute la France.",
    categories: [
      { name: "Studio", count: 245 },
      { name: "Colocation", count: 180 },
      { name: "2 pièces", count: 320 },
      { name: "3 pièces+", count: 95 }
    ],
    annonces: "annonces",
    featuredTitle: "Logements recommandés",
    seeAll: "Voir tout",
    available: "Disponible",
    occupied: "Occupé",
    perMonth: "/mois",
    details: "Voir les détails",
    propose: "Proposer mon logement"
  },
  tn: {
    sectionTitle: "لقاو",
    sectionHighlight: "داركم المثالية",
    sectionDesc: "إكتشفو إختيارنا لسكن الطلبة الموثوق في كامل تونس.",
    categories: [
      { name: "ستوديو", count: 245 },
      { name: "سكن مشترك", count: 180 },
      { name: "غرفتين", count: 320 },
      { name: "3 غرف+", count: 95 }
    ],
    annonces: "إعلان",
    featuredTitle: "سكنات مقترحة",
    seeAll: "شوف الكل",
    available: "متوفر",
    occupied: "محجوز",
    perMonth: "/شهر",
    details: "شوف التفاصيل",
    propose: "عرض منزلي"
  }
};


const HousingSection = () => {
  const { lang } = useContext(LangContext);
  const t = translations[lang] || translations.fr;

  // Demo properties, could be translated if needed
  const properties = [
    {
      id: 1,
      title: lang === "tn" ? "ستوديو عصري - وسط المدينة" : "Studio moderne - Centre ville",
      location: lang === "tn" ? "تونس العاصمة" : "Paris 11ème",
      price: 850,
      type: t.categories[0].name,
      amenities: lang === "tn" ? ["واي فاي", "مفروش", "قريب من المترو"] : ["Wifi", "Meublé", "Proche métro"],
      image: housingImage,
      available: true
    },
    {
      id: 2,
      title: lang === "tn" ? "سكن مشترك 3 غرف - الحرم الجامعي" : "Colocation 3 pièces - Campus",
      location: lang === "tn" ? "صفاقس" : "Lyon 7ème",
      price: 450,
      type: t.categories[1].name,
      amenities: lang === "tn" ? ["باركينغ", "مطبخ مجهز", "حديقة"] : ["Parking", "Cuisine équipée", "Jardin"],
      image: housingImage,
      available: true
    },
    {
      id: 3,
      title: lang === "tn" ? "غرفتين منورين - حي الطلبة" : "2 pièces lumineux - Quartier étudiant",
      location: lang === "tn" ? "سوسة" : "Montpellier",
      price: 650,
      type: t.categories[2].name,
      amenities: lang === "tn" ? ["شرفة", "قريب من الجامعة", "محلات"] : ["Balcon", "Proche fac", "Commerces"],
      image: housingImage,
      available: false
    }
  ];

  // Add icon property to categories for rendering
  const categories = [
    { ...t.categories[0], icon: Users },
    { ...t.categories[1], icon: Users },
    { ...t.categories[2], icon: Users },
    { ...t.categories[3], icon: Users }
  ];

  return (
    <section id="housing" className="py-20 bg-muted/30">
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

        {/* Categories */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
          {categories.map((category, index) => (
            <Card key={index} variant="elevated" className="text-center cursor-pointer hover:bg-primary/5 transition-colors">
              <CardContent className="p-6">
                <category.icon className="w-8 h-8 mx-auto mb-2 text-primary" />
                <h3 className="font-semibold">{category.name}</h3>
                <p className="text-sm text-muted-foreground">{category.count} {t.annonces}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Featured Properties */}
        <div className="space-y-8">
          <div className="flex items-center justify-between">
            <h3 className="text-2xl font-semibold">{t.featuredTitle}</h3>
            <Button variant="outline">
              {t.seeAll}
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {properties.map((property) => (
              <Card key={property.id} variant="elevated" className="overflow-hidden group cursor-pointer">
                <div className="relative">
                  <img
                    src={property.image}
                    alt={property.title}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-4 left-4">
                    <Badge variant={property.available ? "default" : "secondary"}>
                      {property.available ? t.available : t.occupied}
                    </Badge>
                  </div>
                  <div className="absolute top-4 right-4">
                    <Badge variant="outline" className="bg-white/90">
                      {property.type}
                    </Badge>
                  </div>
                </div>

                <CardHeader>
                  <CardTitle className="text-lg">{property.title}</CardTitle>
                  <CardDescription className="flex items-center">
                    <MapPin className="w-4 h-4 mr-1" />
                    {property.location}
                  </CardDescription>
                </CardHeader>

                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-1">
                      <Euro className="w-4 h-4 text-primary" />
                      <span className="text-xl font-bold text-primary">{property.price}€</span>
                      <span className="text-sm text-muted-foreground">{t.perMonth}</span>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {property.amenities.map((amenity, index) => (
                      <Badge key={index} variant="secondary" className="text-xs">
                        {amenity}
                      </Badge>
                    ))}
                  </div>

                  <Button variant="outline" className="w-full group">
                    {t.details}
                    <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        <div className="text-center mt-12">
          <Button variant="gradient" size="lg" className="group">
            <Coffee className="w-5 h-5 mr-2" />
            {t.propose}
            <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
          </Button>
        </div>
      </div>
    </section>
  );
};

export default HousingSection;