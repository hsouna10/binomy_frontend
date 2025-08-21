"use client";

import type React from "react";
import { useState, useEffect, useContext } from "react";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import {
  CalendarIcon,
  Clock,
  MapPin,
  Send,
  Home,
  Euro,
  Check,
  Edit3,
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import axios from "axios";
import { ThemeContext } from "../App"; // Assure-toi du bon chemin

interface Property {
  id: number;
  title: string;
  location: string;
  price: string;
}

interface BookingModalProps {
  property: Property | null;
  isOpen: boolean;
  onClose: () => void;
}

export const BookingModal = ({ property, isOpen, onClose }: BookingModalProps) => {
  const [selectedDate, setSelectedDate] = useState<Date>();
  const [selectedTime, setSelectedTime] = useState("");
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [bookedSlots, setBookedSlots] = useState<{ date: string; time: string }[]>([]);
  const { toast } = useToast();
  const { theme } = useContext(ThemeContext); // 🔥 Récupère le thème
  const isDark = theme === "dark";

  if (!property) return null;

  const timeSlots = [
    "09:00", "09:30", "10:00", "10:30", "11:00", "11:30",
    "14:00", "14:30", "15:00", "15:30", "16:00", "16:30", "17:00",
  ];

  const morningSlots = timeSlots.slice(0, 6);
  const afternoonSlots = timeSlots.slice(6);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/reservations");
        setBookedSlots(res.data);
      } catch (error) {
        console.error("Erreur lors du chargement des réservations", error);
      }
    };
    if (isOpen) fetchBookings();
  }, [isOpen]);

  const isSlotBooked = (date: Date, time: string) => {
    const dateStr = format(date, "yyyy-MM-dd");
    return bookedSlots.some((b) => b.date === dateStr && b.time === time);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!selectedDate || !selectedTime) {
      toast({
        title: "Erreur",
        description: "Veuillez sélectionner une date et une heure",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);

    const formattedDate = format(selectedDate, "yyyy-MM-dd", { locale: fr });

    const storedUser = sessionStorage.getItem("binomiUser");
    const user = storedUser ? JSON.parse(storedUser) : null;
    if (!user) {
      toast({
        title: "Erreur",
        description: "Utilisateur non trouvé. Veuillez vous reconnecter.",
        variant: "destructive",
      });
      setIsLoading(false);
      return;
    }

    const bookingData = {
      property_id: property.id,
      user_id: user.id,
      date: formattedDate,
      time: selectedTime,
      message: message || "Aucun message particulier",
    };

    try {
      await axios.post("http://localhost:5000/api/reservations", bookingData);

      toast({
        title: "Demande envoyée !",
        description: `Votre demande de visite pour le ${format(
          selectedDate,
          "EEEE dd MMMM yyyy",
          { locale: fr }
        )} à ${selectedTime} a été envoyée.`,
      });

      setSelectedDate(undefined);
      setSelectedTime("");
      setMessage("");
      onClose();

      const bookingsRes = await axios.get("http://localhost:5000/api/reservations");
      setBookedSlots(bookingsRes.data);
    } catch (error: any) {
      toast({
        title: "Erreur",
        description: error.response?.data?.error || "Une erreur est survenue.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent
        className={`max-w-5xl max-h-[95vh] overflow-y-auto p-0 border-0 shadow-2xl rounded-2xl
          ${isDark ? "bg-gray-900 text-gray-100" : "bg-white text-gray-800"}`}
      >
        <div className="relative">
          {/* Header Gradient */}
          <div
            className={`relative p-8 sm:p-12 ${
              isDark
                ? "bg-gradient-to-br from-violet-900 via-purple-900 to-indigo-950"
                : "bg-gradient-to-br from-violet-600 via-purple-700 to-indigo-800"
            } text-white overflow-hidden`}
          >
            <div
              className="absolute inset-0 bg-cover bg-center opacity-10"
              style={{
                backgroundImage: "url('/placeholder.svg?height=400&width=800')",
                filter: "blur(2px)",
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-br from-black/40 to-transparent" />
            <div className="relative z-10">
              <DialogHeader>
                <DialogTitle className="text-2xl sm:text-3xl font-bold text-center flex flex-col items-center gap-3">
                  <CalendarIcon className="w-10 h-10 animate-pulse text-white" />
                  Réserver une visite
                </DialogTitle>
                <div className="text-center space-y-4 mt-6">
                  <div className="flex items-center justify-center gap-3">
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center ${
                        isDark ? "bg-white/20" : "bg-white/30"
                      } backdrop-blur-sm`}
                    >
                      <Home className="w-5 h-5" />
                    </div>
                    <p className="font-semibold text-lg sm:text-xl">{property.title}</p>
                  </div>
                  <div className="flex items-center justify-center gap-3 text-white/90">
                    <div
                      className={`w-7 h-7 rounded-full flex items-center justify-center ${
                        isDark ? "bg-white/15" : "bg-white/25"
                      } backdrop-blur-sm`}
                    >
                      <MapPin className="w-4 h-4" />
                    </div>
                    <p className="text-sm sm:text-base">{property.location}</p>
                  </div>
                  <div
                    className={`inline-flex items-center gap-3 px-5 py-2 rounded-full text-white border ${
                      isDark ? "bg-white/20 border-white/30" : "bg-white/25 border-white/20"
                    }`}
                  >
                    <div
                      className={`w-6 h-6 rounded-full flex items-center justify-center ${
                        isDark ? "bg-white/20" : "bg-white/30"
                      }`}
                    >
                      <Euro className="w-4 h-4" />
                    </div>
                    <span className="font-bold text-base sm:text-lg">{property.price}</span>
                  </div>
                </div>
              </DialogHeader>
            </div>
          </div>

          {/* Form Content */}
          <div className="p-6 sm:p-8">
            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Date */}
              <div className="space-y-6">
                <div className="flex items-center gap-3">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center shadow-lg ${
                      isDark
                        ? "bg-gradient-to-br from-emerald-600 to-teal-700"
                        : "bg-gradient-to-br from-emerald-500 to-teal-600"
                    }`}
                  >
                    <CalendarIcon className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <Label className={`text-lg font-bold ${isDark ? "text-white" : "text-gray-900"}`}>
                      Choisissez une date
                    </Label>
                    <p className={`text-sm ${isDark ? "text-gray-300" : "text-gray-600"}`}>
                      Sélectionnez votre jour de visite
                    </p>
                  </div>
                </div>
                <div
                  className={`rounded-2xl p-4 sm:p-6 border shadow-lg ${
                    isDark
                      ? "bg-gray-800 border-gray-700"
                      : "bg-white border-gray-200"
                  }`}
                >
                  <Calendar
                    mode="single"
                    selected={selectedDate}
                    onSelect={setSelectedDate}
                    disabled={(date) => date < new Date() || date.getDay() === 0}
                    className="w-full [&_.rdp-button]:h-10 [&_.rdp-button]:w-10 [&_.rdp-button]:text-sm [&_.rdp-button]:rounded-lg"
                  />
                </div>
              </div>

              {/* Time Slots */}
              <div className="space-y-6">
                <div className="flex items-center gap-3">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center shadow-lg ${
                      isDark
                        ? "bg-gradient-to-br from-blue-600 to-indigo-700"
                        : "bg-gradient-to-br from-blue-500 to-indigo-600"
                    }`}
                  >
                    <Clock className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <Label className={`text-lg font-bold ${isDark ? "text-white" : "text-gray-900"}`}>
                      Choisissez un créneau
                    </Label>
                    <p className={`text-sm ${isDark ? "text-gray-300" : "text-gray-600"}`}>
                      Sélectionnez une heure disponible
                    </p>
                  </div>
                </div>

                <div
                  className={`rounded-2xl p-5 border space-y-8 ${
                    isDark
                      ? "bg-gray-800 border-gray-700"
                      : "bg-white border-gray-200"
                  }`}
                >
                  <div>
                    <h4 className={`text-base font-bold mb-4 flex items-center gap-2 ${isDark ? "text-white" : "text-gray-800"}`}>
                      <div className="w-3 h-3 rounded-full bg-gradient-to-r from-yellow-400 to-orange-500"></div>
                      Matin
                    </h4>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                      {morningSlots.map((time) => (
                        <Button
                          key={time}
                          type="button"
                          variant="outline"
                          onClick={() => setSelectedTime(time)}
                          disabled={selectedDate ? isSlotBooked(selectedDate, time) : false}
                          className={`h-12 rounded-full text-sm font-medium transition-all ${
                            selectedTime === time
                              ? "bg-gradient-to-r from-emerald-500 to-teal-600 text-white border-0 shadow-md scale-105"
                              : isDark
                              ? "border-gray-600 hover:bg-gray-700"
                              : "hover:bg-emerald-50 hover:border-emerald-300 border-2"
                          }`}
                        >
                          {selectedTime === time && <Check className="w-4 h-4 mr-1" />}
                          {time}
                        </Button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 className={`text-base font-bold mb-4 flex items-center gap-2 ${isDark ? "text-white" : "text-gray-800"}`}>
                      <div className="w-3 h-3 rounded-full bg-gradient-to-r from-blue-400 to-indigo-500"></div>
                      Après-midi
                    </h4>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                      {afternoonSlots.map((time) => (
                        <Button
                          key={time}
                          type="button"
                          variant="outline"
                          onClick={() => setSelectedTime(time)}
                          disabled={selectedDate ? isSlotBooked(selectedDate, time) : false}
                          className={`h-12 rounded-full text-sm font-medium transition-all ${
                            selectedTime === time
                              ? "bg-gradient-to-r from-emerald-500 to-teal-600 text-white border-0 shadow-md scale-105"
                              : isDark
                              ? "border-gray-600 hover:bg-gray-700"
                              : "hover:bg-emerald-50 hover:border-emerald-300 border-2"
                          }`}
                        >
                          {selectedTime === time && <Check className="w-4 h-4 mr-1" />}
                          {time}
                        </Button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Message */}
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center shadow-lg ${
                      isDark
                        ? "bg-gradient-to-br from-purple-600 to-pink-700"
                        : "bg-gradient-to-br from-purple-500 to-pink-600"
                    }`}
                  >
                    <Edit3 className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <Label
                      htmlFor="message"
                      className={`text-lg font-bold ${isDark ? "text-white" : "text-gray-900"}`}
                    >
                      Message (optionnel)
                    </Label>
                    <p className={`text-sm ${isDark ? "text-gray-300" : "text-gray-600"}`}>
                      Ajoutez des détails pour votre visite
                    </p>
                  </div>
                </div>
                <div className="relative">
                  <Textarea
                    id="message"
                    placeholder="Ex: Je voudrais voir la cuisine en priorité..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    maxLength={500}
                    className={`min-h-[100px] pl-10 pt-4 text-sm rounded-xl border ${
                      isDark
                        ? "bg-gray-800 border-gray-700 text-gray-100 focus:border-purple-500"
                        : "bg-gray-50 border-gray-200 focus:border-purple-500"
                    }`}
                  />
                  <Edit3 className="absolute left-3 top-3 w-5 h-5 text-gray-500" />
                  <div className="absolute bottom-2 right-2 text-xs text-gray-500">
                    {message.length}/500
                  </div>
                </div>
              </div>

              <Separator className={isDark ? "bg-gray-700" : ""} />

              {/* Actions */}
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={onClose}
                  disabled={isLoading}
                  className={`h-12 rounded-xl ${
                    isDark
                      ? "border-gray-600 hover:bg-red-900/30 hover:border-red-600 text-red-300"
                      : "border-gray-300 hover:bg-red-50 hover:border-red-300 hover:text-red-600"
                  }`}
                >
                  Annuler
                </Button>

                <Button
                  type="submit"
                  className="h-12 rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-700 hover:to-indigo-700 text-white flex items-center justify-center gap-2 disabled:opacity-60"
                  disabled={isLoading || !selectedDate || !selectedTime}
                >
                  {isLoading ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Envoi...
                    </>
                  ) : (
                    <>
                      <Send className="w-5 h-5" />
                      Confirmer
                    </>
                  )}
                </Button>
              </div>
            </form>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};