import { Button } from "@/components/ui/button";
import { Users, Home, LogIn, UserPlus, Sun, Moon, UserCircle, LogOut, Send } from "lucide-react";
import { Link } from "react-router-dom";
import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
// Avatar with image fallback
const Avatar = ({ name, src }: { name?: string, src?: string }) => {
  if (src) {
    return (
      <img
        src={src}
        alt={name || "avatar"}
        className="w-8 h-8 rounded-full object-cover border border-gray-200"
        onError={e => { (e.target as HTMLImageElement).src = "https://ui-avatars.com/api/?name=" + encodeURIComponent(name || "U") + "&background=cccccc&color=222222&size=64"; }}
      />
    );
  }
  return (
    <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-white font-bold">
      {name ? name[0].toUpperCase() : <UserCircle className="w-6 h-6" />}
    </div>
  );
};
import { ThemeContext } from "../App";
import { LangContext } from "@/context/LangContext";
import { LanguageIcon } from "@/components/ui/LanguageIcon";

const Header = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);
  const { lang, setLang } = useContext(LangContext);
  const [user, setUser] = useState<any>(null);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("binomiToken");
    if (token) {
      axios.get("http://localhost:5000/api/me", {
        headers: { Authorization: `Bearer ${token.replace(/['"]+/g, '')}` }
      })
        .then(res => setUser(res.data.user || res.data))
        .catch(() => setUser(null));
    } else {
      setUser(null);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("binomiUser");
    localStorage.removeItem("binomiToken");
    setUser(null);
    window.location.href = "/auth";
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center space-x-2">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center">
              <Users className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold bg-gradient-primary bg-clip-text text-transparent">
              Binomi
            </span>
          </div>
        </div>

        <nav className="hidden md:flex items-center space-x-6">
          <Link to="/matching" className="text-sm font-medium hover:text-primary transition-colors">
            Matching
          </Link>
          <Link to="/housing" className="text-sm font-medium hover:text-primary transition-colors">
            Logements
          </Link>
          <Link to="/about" className="text-sm font-medium hover:text-primary transition-colors">
            À propos
          </Link>
        </nav>

        <div className="flex items-center gap-4">
          <button
            onClick={toggleTheme}
            className="p-2 rounded-full hover:bg-accent transition-colors"
            aria-label="Changer le mode sombre/clair"
          >
            {theme === "dark" ? (
              <Sun className="w-5 h-5 text-yellow-400" />
            ) : (
              <Moon className="w-5 h-5 text-gray-800" />
            )}
          </button>
          <div className="flex items-center space-x-1 ml-2">
            <button
              onClick={() => setLang('fr')}
              className={`p-1 rounded-full border ${lang === 'fr' ? 'border-primary' : 'border-transparent'}`}
              aria-label="Français"
            >
              <LanguageIcon lang="fr" />
            </button>
            <button
              onClick={() => setLang('tn')}
              className={`p-1 rounded-full border ${lang === 'tn' ? 'border-primary' : 'border-transparent'}`}
              aria-label="Tunisien"
            >
              <LanguageIcon lang="tn" />
            </button>
          </div>
          {user ? (
            <div className="relative">
              <button
                className="flex items-center focus:outline-none"
                onClick={() => setMenuOpen(v => !v)}
                aria-label="Profil utilisateur"
              >
                <Avatar
                  name={user.first_name ? user.first_name + (user.last_name ? ' ' + user.last_name : '') : user.email}
                  src={user.profile_picture_url}
                />
              </button>
              {menuOpen && (
                <div className="absolute right-0 mt-2 w-40 bg-white border rounded shadow-lg z-50">
                  <div className="px-4 py-2 font-semibold text-center text-primary">
                    {user.first_name} {user.last_name}
                  </div>
                  <Link to="/profile" className="flex items-center px-4 py-2 hover:bg-accent text-sm">
                    <UserCircle className="w-4 h-4 mr-2" />
                    Profil
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="flex items-center w-full px-4 py-2 hover:bg-accent text-sm text-left"
                  >
                    <LogOut className="w-4 h-4 mr-2" />
                    Déconnexion
                  </button>
                </div>
              )}
            </div>
          ) : (
            <>
              <Link to="/auth">
                <Button variant="ghost" size="sm">
                  <LogIn className="w-4 h-4 mr-2" />
                  Connexion
                </Button>
              </Link>
              <Link to="/auth">
                <Button variant="gradient" size="sm">
                  <UserPlus className="w-4 h-4 mr-2" />
                  S'inscrire
                </Button>
              </Link>
            </>
          )}
          <Button
            variant="outline"
            size="sm"
            onClick={() => window.location.href = "/messages"}
            className="flex items-center gap-2"
          >
            <Send className="w-4 h-4" />
            Messages
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;