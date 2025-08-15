import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { MapPin, Bed, Wifi, Car, Wind, Home, Heart, Share2 } from "lucide-react";
import { motion } from "framer-motion";
import { BookingModal } from "./BookingModal";
import { ThemeContext } from "../App"; // ou là où est défini ThemeContext
import { useContext } from "react";

interface PropertyModalProps {
  property: any;
  isOpen: boolean;
  onClose: () => void;
}

export const PropertyModal = ({ property, isOpen, onClose }: PropertyModalProps) => {
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const { theme } = useContext(ThemeContext); // 🔥 Récupérer le thème

  if (!property) return null;

  const isDark = theme === "dark";

  const features = [
    property.conditions?.wifi && { icon: Wifi, label: "Internet haut débit" },
    property.conditions?.parking && { icon: Car, label: "Parking privé" },
    property.conditions?.climatisation && { icon: Wind, label: "Climatisation" },
    property.conditions?.meuble && { icon: Home, label: "Meublé" },
  ].filter(Boolean) as { icon: any; label: string }[];

  return (
    <>
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent
          className={`sm:max-w-3xl md:max-w-5xl max-h-[95vh] overflow-y-auto p-0 border-0 shadow-2xl rounded-2xl
            ${isDark 
              ? "bg-gray-900 text-gray-100 shadow-black/40" 
              : "bg-white text-gray-800 shadow-gray-200/60"
            }`}
        >
          <DialogTitle className="sr-only">{property.title}</DialogTitle>
          <DialogDescription className="sr-only">
            {property.description?.slice(0, 150) || "Détails du logement"}
          </DialogDescription>

          <div className="relative">
            {/* Image principale */}
            <div className="relative h-60 sm:h-80 md:h-96 overflow-hidden rounded-t-2xl">
              <motion.img
                src={property.photos?.[0] || "https://via.placeholder.com/800x600?text=No+Photo"}
                alt={property.title}
                className="w-full h-full object-cover"
                initial={{ scale: 1.05 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
              />
              <div className={`absolute inset-0 ${isDark 
                ? "bg-gradient-to-t from-black/80 via-black/40 to-transparent" 
                : "bg-gradient-to-t from-black/60 via-black/20 to-transparent"
              }`} />

              {/* Badges */}
              <div className="absolute top-4 left-4 right-4 flex justify-between items-start">
                <Badge className={`backdrop-blur-md px-3 py-1 rounded-full text-sm shadow
                  ${isDark 
                    ? "bg-white/20 text-white" 
                    : "bg-white/80 text-gray-800"
                  }`}>
                  Logement
                </Badge>
                <div className="flex gap-2">
                  <Button
                    size="icon"
                    variant="secondary"
                    className={`rounded-full shadow
                      ${isDark 
                        ? "bg-white/10 hover:bg-white/20 text-white" 
                        : "bg-white/80 hover:bg-white text-gray-800"
                      }`}
                  >
                    <Heart className="h-4 w-4" />
                  </Button>
                  <Button
                    size="icon"
                    variant="secondary"
                    className={`rounded-full shadow
                      ${isDark 
                        ? "bg-white/10 hover:bg-white/20 text-white" 
                        : "bg-white/80 hover:bg-white text-gray-800"
                      }`}
                  >
                    <Share2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              {/* Titre et localisation */}
              <div className="absolute bottom-4 left-4">
                <h2 className="text-white text-2xl sm:text-3xl font-bold drop-shadow">
                  {property.title}
                </h2>
                <div className="flex items-center text-white/90 mt-1">
                  <MapPin className="w-4 h-4 mr-1" />
                  <span className="text-sm">{property.location}</span>
                </div>
              </div>
            </div>

            {/* Contenu */}
            <div className={`p-5 sm:p-6 ${isDark ? "text-gray-200" : "text-gray-700"}`}>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
                {/* Colonne principale */}
                <div className="md:col-span-2 space-y-6">
                  {/* Prix et chambres */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div className="text-3xl sm:text-4xl font-extrabold text-primary">
                      {property.price} TND
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="flex items-center gap-2">
                        <Bed className="w-5 h-5 text-primary" />
                        <span className="font-medium">
                          {property.conditions?.nombre_chambres || 0} chambre(s)
                        </span>
                      </div>
                    </div>
                  </div>

                  <Separator className={isDark ? "bg-gray-700" : ""} />

                  {/* Description */}
                  <div>
                    <h3 className={`text-xl font-semibold mb-3 ${isDark ? "text-white" : ""}`}>
                      Description
                    </h3>
                    <p className="leading-relaxed">{property.description}</p>
                  </div>

                  <Separator className={isDark ? "bg-gray-700" : ""} />

                  {/* Équipements */}
                  <div>
                    <h3 className={`text-xl font-semibold mb-3 ${isDark ? "text-white" : ""}`}>
                      Équipements & Services
                    </h3>
                    {features.length > 0 ? (
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {features.map((feature, index) => (
                          <motion.div
                            key={index}
                            whileHover={{ scale: 1.02 }}
                            className={`flex items-center gap-3 p-3 rounded-lg 
                              ${isDark 
                                ? "bg-gray-800 hover:bg-primary/10 text-white" 
                                : "bg-gray-50 hover:bg-primary/5 text-gray-800"
                              } transition`}
                          >
                            <feature.icon className={`w-5 h-5 text-primary`} />
                            <span className="text-sm font-medium">{feature.label}</span>
                          </motion.div>
                        ))}
                      </div>
                    ) : (
                      <p className={`text-gray-500 text-sm ${isDark ? "text-gray-400" : ""}`}>
                        Aucun équipement renseigné
                      </p>
                    )}
                  </div>
                </div>

                {/* Sidebar - Contact & Infos */}
                <div className="space-y-5 mt-2">
                  {/* Contact */}
                  <div className={`rounded-xl p-5 shadow-lg border
                    ${isDark 
                      ? "bg-gray-800 border-gray-700 text-white" 
                      : "bg-gradient-to-br from-primary/10 to-primary/5 border-primary/20 text-gray-800"
                    }`}>
                    <h3 className="text-lg font-semibold mb-3">Contactez-nous</h3>
                    <div className="space-y-3">
                      <Button
                        className="w-full"
                        variant="outline"
                        onClick={() => setIsBookingOpen(true)}
                      >
                        Prendre rendez-vous
                      </Button>
                      <Button className="w-full" variant="outline">
                        Demander des infos
                      </Button>
                      <p className="text-center text-xs pt-1 opacity-70">
                        Réponse garantie sous 24h
                      </p>
                    </div>
                  </div>

                  {/* Informations supplémentaires */}
                  <div className={`rounded-xl p-5 shadow-md border
                    ${isDark 
                      ? "bg-gray-800 border-gray-700 text-white" 
                      : "bg-white border-gray-200 text-gray-800"
                    }`}>
                    <h3 className="text-lg font-semibold mb-3">Informations</h3>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className={isDark ? "text-gray-400" : "text-gray-500"}>
                          Chambres
                        </span>
                        <span className="font-medium">{property.conditions?.nombre_chambres || 0}</span>
                      </div>
                      <Separator className={`my-2 ${isDark ? "bg-gray-700" : ""}`} />
                      <div className="flex justify-between">
                        <span className={isDark ? "text-gray-400" : "text-gray-500"}>
                          Publié le
                        </span>
                        <span className="font-medium">
                          {new Date(property.created_at).toLocaleDateString("fr-TN")}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* BookingModal (à rendre aussi dark-mode compatible) */}
      <BookingModal
        property={property}
        isOpen={isBookingOpen}
        onClose={() => setIsBookingOpen(false)}
      />
    </>
  );
};