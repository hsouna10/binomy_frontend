import { useState, useEffect } from "react";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import Header from "@/components/Header";
import { Search, MapPin, Bed, Shield, Heart, SlidersHorizontal, Plus, X } from "lucide-react";
import { PropertyForm } from "@/components/Formulaire";
import { PropertyModal } from "@/components/PropertyModal";  // Import modal

const Housing = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [priceRange, setPriceRange] = useState("");
  const [location, setLocation] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [listings, setListings] = useState([]);

  // Etats pour le modal détails
  const [selectedProperty, setSelectedProperty] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const response = await axios.get("http://localhost:5000/properties/");
        setListings(response.data);
      } catch (error) {
        console.error("Erreur chargement propriétés:", error);
      }
    };
    fetchProperties();
  }, []);

  const parseAmenities = (conditions) => {
    if (!conditions) return [];
    const amenities = [];
    if (conditions.wifi) amenities.push("WiFi");
    if (conditions.climatisation) amenities.push("Climatisation");
    if (conditions.meuble) amenities.push("Meublé");
    if (conditions.parking) amenities.push("Parking");
    if (conditions.balcon) amenities.push("Balcon");
    return amenities;
  };

  const availableListings = listings.filter(listing => listing.available !== false);

  const filteredListings = availableListings.filter(listing =>
    listing.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    listing.location.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredByLocation = location
    ? filteredListings.filter(listing => listing.location.toLowerCase().includes(location.toLowerCase()))
    : filteredListings;

  const filteredByPrice = priceRange ? filteredByLocation.filter(listing => {
    const price = parseFloat(listing.price);
    switch (priceRange) {
      case "0-300": return price <= 300;
      case "300-500": return price > 300 && price <= 500;
      case "500-800": return price > 500 && price <= 800;
      case "800+": return price > 800;
      default: return true;
    }
  }) : filteredByLocation;

  // Ouvrir modal et charger détails propriété
  const openPropertyModal = async (id) => {
    try {
      const res = await axios.get(`http://localhost:5000/properties/${id}`);
      setSelectedProperty(res.data);
      setModalOpen(true);
    } catch (error) {
      console.error("Erreur chargement détail propriété:", error);
    }
  };

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

          {/* Bouton Ajouter un logement */}
          <div className="flex justify-end">
            <Button variant="gradient" onClick={() => setShowForm(true)}>
              <Plus className="w-4 h-4 mr-2" />
              Ajouter un logement
            </Button>
          </div>

          {/* Modal PropertyForm */}
          {showForm && (
            <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
              <div className="relative bg-background rounded-lg shadow-xl max-w-2xl w-full max-h-screen overflow-y-auto">
                <button
                  onClick={() => setShowForm(false)}
                  className="absolute top-4 right-4 z-10 p-2 rounded-full bg-gray-100 hover:bg-gray-200"
                >
                  <X className="w-5 h-5" />
                </button>
                <PropertyForm onSuccess={() => {
                  setShowForm(false);
                  // Recharger la liste après ajout
                  axios.get("http://localhost:5000/properties/")
                    .then(res => setListings(res.data))
                    .catch(err => console.error(err));
                }} />
              </div>
            </div>
          )}

          {/* Listings Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredByPrice.map((listing) => (
              <Card key={listing.id} className="group hover:shadow-lg transition-shadow">
                <div className="relative">
                  <img
                    src={
                      listing.photos && listing.photos.length > 0
                        ? listing.photos[0]
                        : "https://via.placeholder.com/400x300?text=Pas+de+photo"
                    }
                    alt={listing.title}
                    className="w-full h-48 object-cover rounded-t-lg"
                  />
                  <div className="absolute top-3 left-3">
                    <Badge variant={listing.conditions?.verified ? "default" : "secondary"}>
                      {listing.conditions?.verified ? (
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
                  {listing.available === false && (
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
                  <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                    <div className="flex items-center">
                      <Bed className="w-4 h-4 mr-1" />
                      {listing.conditions?.nombre_chambres || 0}
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-1">
                    {parseAmenities(listing.conditions).slice(0, 3).map((amenity, index) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        {amenity}
                      </Badge>
                    ))}
                    {parseAmenities(listing.conditions).length > 3 && (
                      <Badge variant="outline" className="text-xs">
                        +{parseAmenities(listing.conditions).length - 3}
                      </Badge>
                    )}
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="text-sm">
                      <span className="text-muted-foreground">Propriétaire: </span>
                      <span className="font-medium">{listing.owner_id || "Inconnu"}</span>
                    </div>
                    <div className="flex items-center">
                      <span className="text-sm font-medium mr-1">⭐ {listing.rating || "N/A"}</span>
                    </div>
                  </div>

                  <div className="flex space-x-2">
                    <Button
                      variant="outline"
                      className="flex-1"
                      onClick={() => openPropertyModal(listing.id)}  // ouverture modal ici
                    >
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

          {filteredByPrice.length === 0 && (
            <div className="text-center py-12">
              <h3 className="text-lg font-medium mb-2">Aucun logement trouvé</h3>
              <p className="text-muted-foreground">
                Essayez de modifier vos critères de recherche
              </p>
            </div>
          )}

          {filteredByPrice.length > 0 && (
            <div className="text-center">
              <Button variant="outline">Voir plus de logements</Button>
            </div>
          )}
        </div>
      </div>

      {/* Modal détail propriété */}
      <PropertyModal
        property={selectedProperty}
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
      />
    </div>
  );
};

export default Housing;
