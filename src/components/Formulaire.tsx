// src/components/PropertyForm.tsx
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { ImagePlus, MapPin, Euro, Home, FileText, Upload, Wifi, Snowflake, Sofa, Car, Bed } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

// --- Schéma Zod ---
const propertyFormSchema = z.object({
  title: z.string().min(5, "Le titre doit contenir au moins 5 caractères").max(255),
  description: z.string().optional(),
  price: z.string().refine((val) => !isNaN(Number(val)) && Number(val) > 0, "Le prix doit être un nombre positif"),
  location: z.string().min(2, "La localisation est requise"),
  bedrooms: z.string().refine((val) => !isNaN(Number(val)) && Number(val) >= 0, "Nombre de chambres invalide"),
  amenities: z.object({
    wifi: z.boolean().default(false),
    airConditioning: z.boolean().default(false),
    furnished: z.boolean().default(false),
    parking: z.boolean().default(false),
  }),
});

type PropertyFormValues = z.infer<typeof propertyFormSchema>;

// --- Composant ---
export function PropertyForm({ onSuccess }: { onSuccess?: () => void }) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]); // ✅ Garder les fichiers bruts
  const { toast } = useToast();

  const getOwnerId = () => {
    const userStr = localStorage.getItem("binomiUser");
    if (!userStr) throw new Error("Utilisateur non connecté");
    const user = JSON.parse(userStr);
    return user.id;
  };

  const form = useForm<PropertyFormValues>({
    resolver: zodResolver(propertyFormSchema),
    defaultValues: {
      title: "",
      description: "",
      price: "",
      location: "",
      bedrooms: "",
      amenities: { wifi: false, airConditioning: false, furnished: false, parking: false },
    },
  });

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      const fileArray = Array.from(files);
      setUploadedFiles(prev => [...prev, ...fileArray]);
    }
  };

  const removeImage = (index: number) => {
    setUploadedFiles(prev => prev.filter((_, i) => i !== index));
  };

  const onSubmit = async (values: PropertyFormValues) => {
    setIsSubmitting(true);
    try {
      const ownerId = getOwnerId();
      const formData = new FormData();

      // Champs requis
      formData.append("owner_id", ownerId);
      formData.append("title", values.title.trim());
      formData.append("description", values.description?.trim() || "");
      formData.append("price", parseFloat(values.price).toString());
      formData.append("location", values.location.trim());
      formData.append("nombre_chambres", parseInt(values.bedrooms, 10).toString());

      // Équipements
      formData.append("wifi", values.amenities.wifi.toString());
      formData.append("climatisation", values.amenities.airConditioning.toString());
      formData.append("meuble", values.amenities.furnished.toString());
      formData.append("parking", values.amenities.parking.toString());

      // Photos
      uploadedFiles.forEach(file => {
        formData.append("photos", file); // Nom du champ attendu par multer
      });

      // Envoi
      await axios.post("http://localhost:5000/properties/", formData, {
        headers: {
          "Content-Type": "multipart/form-data", // 🔥 Obligatoire
        },
      });

      toast({
        title: "Logement ajouté avec succès !",
        description: "Votre annonce est maintenant en ligne.",
      });

      form.reset();
      setUploadedFiles([]);
      onSuccess?.();
    } catch (error: any) {
      console.error("Erreur lors de l'ajout du logement:", error);

      const errorMsg =
        error.response?.data?.message ||
        error.response?.data?.error ||
        error.message ||
        "Échec de l'envoi";

      toast({
        title: "Erreur",
        description: errorMsg,
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card className="w-full max-w-2xl mx-auto shadow-elegant border-0 bg-card/50 backdrop-blur-sm">
      <CardHeader className="space-y-4">
        <div className="flex items-center gap-3">
          <div className="p-3 rounded-full bg-gradient-primary">
            <Home className="h-6 w-6 text-primary-foreground" />
          </div>
          <div>
            <CardTitle className="text-2xl font-bold bg-gradient-primary bg-clip-text text-transparent">
              Créer un nouveau logement
            </CardTitle>
            <CardDescription className="text-muted-foreground">
              Ajoutez les détails de votre propriété pour commencer à recevoir des réservations
            </CardDescription>
          </div>
        </div>
      </CardHeader>

      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            {/* Titre */}
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex items-center gap-2 text-base font-medium">
                    <FileText className="h-4 w-4 text-primary" />
                    Titre du logement
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Ex: Appartement moderne avec vue sur mer"
                      className="h-12 border-border/50 focus:border-primary transition-smooth"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Description */}
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-base font-medium">Description</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Décrivez votre logement..."
                      className="min-h-[120px] border-border/50 focus:border-primary transition-smooth resize-none"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    Une description attrayante augmente vos chances de réservation
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Prix et Localisation */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="price"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center gap-2 text-base font-medium">
                      <Euro className="h-4 w-4 text-primary" />
                      Prix par mois (TND)
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        placeholder="800"
                        className="h-12 border-border/50 focus:border-primary transition-smooth"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="location"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center gap-2 text-base font-medium">
                      <MapPin className="h-4 w-4 text-primary" />
                      Localisation
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Ariana, Tunis"
                        className="h-12 border-border/50 focus:border-primary transition-smooth"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Photos */}
            <div className="space-y-4">
              <FormLabel className="flex items-center gap-2 text-base font-medium">
                <ImagePlus className="h-4 w-4 text-primary" />
                Photos du logement
              </FormLabel>
              <div className="border-2 border-dashed border-border/50 rounded-lg p-6 hover:border-primary/50 transition-smooth">
                <input
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                  id="image-upload"
                />
                <label htmlFor="image-upload" className="cursor-pointer">
                  <div className="flex flex-col items-center gap-3 text-center">
                    <Upload className="h-8 w-8 text-muted-foreground" />
                    <div>
                      <p className="text-sm font-medium">Cliquez pour ajouter des photos</p>
                      <p className="text-xs text-muted-foreground">PNG, JPG jusqu'à 10MB</p>
                    </div>
                  </div>
                </label>
              </div>

              {uploadedFiles.length > 0 && (
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {uploadedFiles.map((file, index) => (
                    <div key={index} className="relative group">
                      <img
                        src={URL.createObjectURL(file)}
                        alt={`Upload ${index + 1}`}
                        className="w-full h-24 object-cover rounded-lg border border-border/50"
                      />
                      <button
                        type="button"
                        onClick={() => removeImage(index)}
                        className="absolute -top-2 -right-2 bg-destructive text-destructive-foreground rounded-full w-6 h-6 flex items-center justify-center text-xs opacity-0 group-hover:opacity-100 transition-smooth"
                      >
                        ×
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Chambres et Équipements */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="bedrooms"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center gap-2 text-base font-medium">
                      <Bed className="h-4 w-4 text-primary" />
                      Nombre de chambres
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        placeholder="2"
                        min="0"
                        className="h-12 border-border/50 focus:border-primary transition-smooth"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="space-y-4">
                <FormLabel className="text-base font-medium">Équipements</FormLabel>
                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="amenities.wifi"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                        <FormControl>
                          <Checkbox
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                        <div className="space-y-1 leading-none">
                          <FormLabel className="flex items-center gap-2 text-sm font-medium cursor-pointer">
                            <Wifi className="h-4 w-4 text-primary" />
                            WiFi
                          </FormLabel>
                        </div>
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="amenities.airConditioning"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                        <FormControl>
                          <Checkbox
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                        <div className="space-y-1 leading-none">
                          <FormLabel className="flex items-center gap-2 text-sm font-medium cursor-pointer">
                            <Snowflake className="h-4 w-4 text-primary" />
                            Climatisation
                          </FormLabel>
                        </div>
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="amenities.furnished"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                        <FormControl>
                          <Checkbox
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                        <div className="space-y-1 leading-none">
                          <FormLabel className="flex items-center gap-2 text-sm font-medium cursor-pointer">
                            <Sofa className="h-4 w-4 text-primary" />
                            Meublé
                          </FormLabel>
                        </div>
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="amenities.parking"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                        <FormControl>
                          <Checkbox
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                        <div className="space-y-1 leading-none">
                          <FormLabel className="flex items-center gap-2 text-sm font-medium cursor-pointer">
                            <Car className="h-4 w-4 text-primary" />
                            Parking
                          </FormLabel>
                        </div>
                      </FormItem>
                    )}
                  />
                </div>
              </div>
            </div>

            <Button
              type="submit"
              className="w-full h-12 bg-gradient-primary hover:opacity-90 transition-smooth font-medium"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Envoi en cours..." : "Créer le logement"}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
//hethi teb3a il creation de logement 