import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { 
  Mail, 
  Phone, 
  MapPin, 
  Clock, 
  MessageCircle, 
  Send,
  HelpCircle,
  Bug,
  Lightbulb,
  Heart
} from "lucide-react";

const Contact = () => {
  const contactInfo = [
    {
      icon: Mail,
      title: "Email",
      info: "contact@binomi.tn",
      description: "Nous répondons sous 24h"
    },
    {
      icon: Phone, 
      title: "Téléphone",
      info: "+216 XX XXX XXX",
      description: "Lun-Ven 9h-18h"
    },
    {
      icon: MapPin,
      title: "Adresse",
      info: "Tunis, Tunisie",
      description: "Technopole El Ghazala"
    },
    {
      icon: Clock,
      title: "Horaires",
      info: "9h - 18h",
      description: "Support technique disponible"
    }
  ];

  const faqItems = [
    {
      question: "Comment fonctionne l'algorithme de matching ?",
      answer: "Notre algorithme analyse vos habitudes de vie, budget, préférences de localisation et traits de personnalité pour calculer un score de compatibilité avec d'autres étudiants."
    },
    {
      question: "Est-ce que Binomi est gratuit ?",
      answer: "L'inscription et les fonctionnalités de base sont gratuites. Des fonctionnalités premium seront disponibles prochainement."
    },
    {
      question: "Comment vérifiez-vous les logements ?",
      answer: "Nous vérifions chaque annonce grâce à notre équipe dédiée qui contrôle les documents de propriété et visite les logements."
    },
    {
      question: "Que faire en cas de problème avec un colocataire ?",
      answer: "Contactez notre équipe support qui vous aidera à résoudre le conflit ou à trouver une nouvelle solution de logement."
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="container py-16">
        <div className="max-w-6xl mx-auto space-y-16">
          {/* Hero Section */}
          <div className="text-center space-y-6">
            <h1 className="text-4xl md:text-5xl font-bold">
              Contactez{" "}
              <span className="bg-gradient-primary bg-clip-text text-transparent">
                Binomi
              </span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Une question ? Un problème ? Une suggestion ? Notre équipe est là pour vous aider !
            </p>
          </div>

          {/* Contact Info Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {contactInfo.map((info, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="w-12 h-12 bg-gradient-primary rounded-lg mx-auto mb-4 flex items-center justify-center">
                    <info.icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="font-bold text-lg mb-2">{info.title}</h3>
                  <p className="text-primary font-medium mb-1">{info.info}</p>
                  <p className="text-sm text-muted-foreground">{info.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <MessageCircle className="w-5 h-5 mr-2" />
                  Envoyez-nous un message
                </CardTitle>
                <CardDescription>
                  Remplissez le formulaire et nous vous répondrons rapidement
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">Prénom</Label>
                    <Input id="firstName" placeholder="Sarah" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName">Nom</Label>
                    <Input id="lastName" placeholder="Dupont" />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" placeholder="sarah@exemple.com" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="subject">Type de demande</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Sélectionnez le type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="support">
                        <div className="flex items-center">
                          <HelpCircle className="w-4 h-4 mr-2" />
                          Support technique
                        </div>
                      </SelectItem>
                      <SelectItem value="bug">
                        <div className="flex items-center">
                          <Bug className="w-4 h-4 mr-2" />
                          Signaler un bug
                        </div>
                      </SelectItem>
                      <SelectItem value="suggestion">
                        <div className="flex items-center">
                          <Lightbulb className="w-4 h-4 mr-2" />
                          Suggestion d'amélioration
                        </div>
                      </SelectItem>
                      <SelectItem value="partnership">
                        <div className="flex items-center">
                          <Heart className="w-4 h-4 mr-2" />
                          Partenariat
                        </div>
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="subject">Sujet</Label>
                  <Input id="subject" placeholder="Résumé de votre demande" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="message">Message</Label>
                  <Textarea 
                    id="message" 
                    placeholder="Décrivez votre demande en détail..."
                    rows={5}
                  />
                </div>

                <Button className="w-full" variant="gradient">
                  <Send className="w-4 h-4 mr-2" />
                  Envoyer le message
                </Button>

                <p className="text-sm text-muted-foreground text-center">
                  Nous nous engageons à répondre sous 24h maximum
                </p>
              </CardContent>
            </Card>

            {/* FAQ Section */}
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <HelpCircle className="w-5 h-5 mr-2" />
                    Questions Fréquentes
                  </CardTitle>
                  <CardDescription>
                    Peut-être que votre question a déjà une réponse !
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {faqItems.map((item, index) => (
                    <div key={index} className="border-b last:border-b-0 pb-4 last:pb-0">
                      <h4 className="font-medium mb-2">{item.question}</h4>
                      <p className="text-sm text-muted-foreground">{item.answer}</p>
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* Emergency Contact */}
              <Card variant="elevated">
                <CardHeader>
                  <CardTitle className="text-red-600">Contact d'urgence</CardTitle>
                  <CardDescription>
                    Pour les situations urgentes nécessitant une intervention immédiate
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm mb-4">
                    Si vous rencontrez un problème de sécurité ou une situation d'urgence 
                    liée à votre logement ou colocataire, contactez-nous immédiatement :
                  </p>
                  <Button variant="destructive" className="w-full">
                    <Phone className="w-4 h-4 mr-2" />
                    Ligne d'urgence : +216 XX XXX XXX
                  </Button>
                </CardContent>
              </Card>

              {/* Social Links */}
              <Card>
                <CardHeader>
                  <CardTitle>Suivez-nous</CardTitle>
                  <CardDescription>
                    Restez connecté avec la communauté Binomi
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-3">
                    <Button variant="outline">
                      📘 Facebook
                    </Button>
                    <Button variant="outline">
                      📷 Instagram
                    </Button>
                    <Button variant="outline">
                      💼 LinkedIn
                    </Button>
                    <Button variant="outline">
                      🐦 Twitter
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Contact;