import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import Header from "@/components/Header";
import housingImage from "@/assets/housing-image.jpg";
import { 
  Search, 
  MapPin, 
  Euro, 
  Bed, 
  Bath, 
  Wifi, 
  Car, 
  Shield, 
  Heart, 
  Filter,
  SlidersHorizontal,
  Plus
} from "lucide-react";

const Housing = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [priceRange, setPriceRange] = useState("");
  const [location, setLocation] = useState("");

  const housingListings = [
    {
      id: 1,
      title: "Studio moderne près de l'université",
      price: 300,
      location: "Ariana, 2kkkm de l'UTM",
      type: "Studio",
      bedrooms: 1,
      bathrooms: 1,
      area: 35,
      images: [housingImage],
      amenities: ["WiFi", "Climatisation", "Meublé", "Balcon"],
      ownerName: "Mme Fatouma Ben Ali",
      verified: true,
      rating: 4.8,
      description: "Studio entièrement meublé et équipé, proche des transports en commun et de l'université.",
      rules: ["Non fumeur", "Pas d'animaux", "Pas de fêtes"],
      available: true
    },
    {
      id: 2,
      title: "Appartement 2 pièces pour colocation",
      price: 600,
      location: "Tunis Centre, 3km de l'UTM", 
      type: "2 pièces",
      bedrooms: 2,
      bathrooms: 1,
      area: 65,
      images: [housingImage],
      amenities: ["WiFi", "Parking", "Ascenseur", "Garde"],
      ownerName: "M. Ahmed Trabelsi",
      verified: true,
      rating: 4.5,
      description: "Appartement lumineux idéal pour 2 étudiants, dans un quartier calme et sécurisé.",
      rules: ["Non fumeur", "Animaux autorisés", "Calme requis"],
      available: true
    },
    {
      id: 3,
      title: "Chambre dans villa avec jardin",
      price: 250,
      location: "Manouba, 1km de l'INSAT",
      type: "Chambre",
      bedrooms: 1,
      bathrooms: 1,
      area: 20,
      images: [housingImage],
      amenities: ["WiFi", "Jardin", "Parking", "Cuisine équipée"],
      ownerName: "Mme Sonia Najar",
      verified: false,
      rating: 4.2,
      description: "Chambre confortable dans villa familiale avec accès au jardin et à la cuisine.",
      rules: ["Non fumeur", "Étudiants uniquement", "Respect des horaires"],
      available: false
    },
    {
      id: 4,
      title: "Appartement 3 pièces spacieux",
      price: 800,
      location: "Bardo, 4km de l'UTM",
      type: "3 pièces", 
      bedrooms: 3,
      bathrooms: 2,
      area: 90,
      images: [housingImage],
      amenities: ["WiFi", "Climatisation", "Parking", "Terrasse", "Ascenseur"],
      ownerName: "M. Karim Bouazizi",
      verified: true,
      rating: 4.9,
      description: "Grand appartement moderne parfait pour 3 étudiants, avec terrasse et vue dégagée.",
      rules: ["Non fumeur", "Pas d'animaux", "Caution 2 mois"],
      available: true
    }
  ];

  const availableListings = housingListings.filter(listing => listing.available);
  const filteredListings = availableListings.filter(listing => 
    listing.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    listing.location.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="container py-8">
        <div className="max-w-6xl mx-auto space-y-6">
          {/* Header */}
          <div className="text-center space-y-4">
            <h1 className="text-3xl font-bold">
              Trouvez votre{" "}
              <span className="bg-gradient-primary bg-clip-text text-transparent">
                logement idéal
              </span>
            </h1>
            <p className="text-muted-foreground">
              Des logements vérifiés près de votre université
            </p>
          </div>

          {/* Search and Filters */}
          <Card>
            <CardContent className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="relative">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Rechercher un logement..."
                    className="pl-10"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                <Select value={location} onValueChange={setLocation}>
                  <SelectTrigger>
                    <SelectValue placeholder="Localisation" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="ariana">Ariana</SelectItem>
                    <SelectItem value="tunis">Tunis Centre</SelectItem>
                    <SelectItem value="manouba">Manouba</SelectItem>
                    <SelectItem value="bardo">Bardo</SelectItem>
                  </SelectContent>
                </Select>
                <Select value={priceRange} onValueChange={setPriceRange}>
                  <SelectTrigger>
                    <SelectValue placeholder="Budget" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="0-300">0 - 300 TND</SelectItem>
                    <SelectItem value="300-500">300 - 500 TND</SelectItem>
                    <SelectItem value="500-800">500 - 800 TND</SelectItem>
                    <SelectItem value="800+">800+ TND</SelectItem>
                  </SelectContent>
                </Select>
                <Button variant="outline">
                  <SlidersHorizontal className="w-4 h-4 mr-2" />
                  Plus de filtres
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Add Listing Button for Owners */}
          <div className="flex justify-end">
            <Button variant="gradient">
              <Plus className="w-4 h-4 mr-2" />
              Ajouter un logement
            </Button>
          </div>

          {/* Listings Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredListings.map((listing) => (
              <Card key={listing.id} className="group hover:shadow-lg transition-shadow">
                <div className="relative">
                  <img
                    src={listing.images[0]}
                    alt={listing.title}
                    className="w-full h-48 object-cover rounded-t-lg"
                  />
                  <div className="absolute top-3 left-3">
                    <Badge variant={listing.verified ? "default" : "secondary"}>
                      {listing.verified ? (
                        <>
                          <Shield className="w-3 h-3 mr-1" />
                          Vérifié
                        </>
                      ) : (
                        "Non vérifié"
                      )}
                    </Badge>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/80 hover:bg-white"
                  >
                    <Heart className="w-4 h-4" />
                  </Button>
                  {!listing.available && (
                    <div className="absolute inset-0 bg-black/50 rounded-t-lg flex items-center justify-center">
                      <Badge variant="destructive">Plus disponible</Badge>
                    </div>
                  )}
                </div>

                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-lg line-clamp-1">{listing.title}</CardTitle>
                      <CardDescription className="flex items-center">
                        <MapPin className="w-4 h-4 mr-1" />
                        {listing.location}
                      </CardDescription>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-primary">{listing.price}</div>
                      <div className="text-sm text-muted-foreground">TND/mois</div>
                    </div>
                  </div>
                </CardHeader>

                <CardContent className="space-y-4">
                  {/* Property Info */}
                  <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                    <div className="flex items-center">
                      <Bed className="w-4 h-4 mr-1" />
                      {listing.bedrooms}
                    </div>
                    <div className="flex items-center">
                      <Bath className="w-4 h-4 mr-1" />
                      {listing.bathrooms}
                    </div>
                    <div>{listing.area}m²</div>
                  </div>

                  {/* Amenities */}
                  <div className="flex flex-wrap gap-1">
                    {listing.amenities.slice(0, 3).map((amenity, index) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        {amenity}
                      </Badge>
                    ))}
                    {listing.amenities.length > 3 && (
                      <Badge variant="outline" className="text-xs">
                        +{listing.amenities.length - 3}
                      </Badge>
                    )}
                  </div>

                  {/* Owner Info */}
                  <div className="flex items-center justify-between">
                    <div className="text-sm">
                      <span className="text-muted-foreground">Propriétaire: </span>
                      <span className="font-medium">{listing.ownerName}</span>
                    </div>
                    <div className="flex items-center">
                      <span className="text-sm font-medium mr-1">⭐ {listing.rating}</span>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex space-x-2">
                    <Button variant="outline" className="flex-1">
                      Voir détails
                    </Button>
                    <Button variant="gradient" className="flex-1">
                      Contacter
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredListings.length === 0 && (
            <div className="text-center py-12">
              <h3 className="text-lg font-medium mb-2">Aucun logement trouvé</h3>
              <p className="text-muted-foreground">
                Essayez de modifier vos critères de recherche
              </p>
            </div>
          )}

          {/* Load More */}
          {filteredListings.length > 0 && (
            <div className="text-center">
              <Button variant="outline">Voir plus de logements</Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Housing;