import { Button } from "@/components/ui/button";
import { Users, Home, LogIn, UserPlus, Sun, Moon, UserCircle, LogOut, Send, Menu, X, Briefcase, Phone } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import React, { useContext, useEffect, useRef, useState } from "react";
import axios from "axios";

// Avatar avec fallback
const Avatar = ({ name, src }: { name?: string; src?: string }) => {
  if (src) {
    return (
      <img
        src={src}
        alt={name || "avatar"}
        className="w-8 h-8 rounded-full object-cover border border-gray-200"
        onError={(e) => {
          (e.target as HTMLImageElement).src =
            "https://ui-avatars.com/api/?name=" +
            encodeURIComponent(name || "U") +
            "&background=cccccc&color=222222&size=64";
        }}
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
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = sessionStorage.getItem("binomiToken");
    if (token) {
      axios
        .get("http://localhost:5000/api/me", {
          headers: { Authorization: `Bearer ${token.replace(/['"]+/g, '')}` },
        })
        .then((res) => setUser(res.data.user || res.data))
        .catch(() => setUser(null));
    } else {
      setUser(null);
    }
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    sessionStorage.removeItem("binomiUser");
    sessionStorage.removeItem("binomiToken");
    setUser(null);
    setMenuOpen(false);
    navigate("/auth");
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        {/* Logo */}
        <div className="flex items-center space-x-2">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center">
              <Users className="w-5 h-5 text-white" />
            </div>
            <Link to="/" className="text-xl font-bold bg-gradient-primary bg-clip-text text-transparent">
              Binomi
            </Link>
          </div>
        </div>

        {/* Navigation Desktop */}
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
          <Link to="/contact" className="text-sm font-medium hover:text-primary transition-colors">
            Contact
          </Link>
          {user && (
            <Link to="/dashboard" className="text-sm font-medium hover:text-primary transition-colors">
              Dashboard
            </Link>
          )}
        </nav>

        {/* Right Side: Theme, Lang, User Actions */}
        <div className="flex items-center gap-3">
          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            className="p-2 rounded-full hover:bg-accent transition-colors"
            aria-label="Changer le mode"
          >
            {theme === "dark" ? (
              <Sun className="w-5 h-5 text-yellow-400" />
            ) : (
              <Moon className="w-5 h-5 text-gray-800" />
            )}
          </button>

          {/* Language Switcher */}
          <div className="flex items-center space-x-1">
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

          {/* User Actions */}
          {user ? (
            <div className="relative flex items-center gap-2">
              {/* Profile Button */}
              <button
                className="flex items-center focus:outline-none"
                onClick={() => setMenuOpen((v) => !v)}
                aria-label="Profil utilisateur"
              >
                <Avatar
                  name={user.first_name ? user.first_name + (user.last_name ? ' ' + user.last_name : '') : user.email}
                  src={user.profile_picture_url}
                />
              </button>

              {/* Dropdown Menu */}
              {menuOpen && (
                <div
                  ref={menuRef}
                  className="absolute right-0 mt-2 w-48 bg-white border rounded-lg shadow-lg z-50"
                >
                  <div className="px-4 py-2 font-semibold text-center text-primary border-b">
                    {user.first_name} {user.last_name}
                  </div>
                  <Link
                    to="/profile"
                    className="flex items-center px-4 py-2 hover:bg-accent text-sm"
                    onClick={() => setMenuOpen(false)}
                  >
                    <UserCircle className="w-4 h-4 mr-2" />
                    Profil
                  </Link>
                  <Link
                    to="/dashboard"
                    className="flex items-center px-4 py-2 hover:bg-accent text-sm"
                    onClick={() => setMenuOpen(false)}
                  >
                    <Briefcase className="w-4 h-4 mr-2" />
                    Dashboard
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

              {/* Messages Button */}
              <Button
                variant="outline"
                size="sm"
                onClick={() => navigate("/messages")}
                className="hidden md:flex items-center gap-2"
              >
                <Send className="w-4 h-4" />
                Messages
              </Button>
            </div>
          ) : (
            <>
              <Link to="/auth">
                <Button variant="ghost" size="sm" className="hidden md:flex">
                  <LogIn className="w-4 h-4 mr-2" />
                  Connexion
                </Button>
              </Link>
              <Link to="/auth">
                <Button variant="gradient" size="sm" className="hidden md:flex">
                  <UserPlus className="w-4 h-4 mr-2" />
                  S'inscrire
                </Button>
              </Link>
            </>
          )}

          {/* Hamburger Menu for Mobile */}
          <button
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            className="md:hidden p-2 rounded-lg hover:bg-accent"
            aria-label="Menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-background border-t">
          <nav className="flex flex-col p-4 space-y-3">
            <Link
              to="/matching"
              className="text-sm font-medium hover:text-primary transition-colors py-2"
              onClick={() => setMobileMenuOpen(false)}
            >
              Matching
            </Link>
            <Link
              to="/housing"
              className="text-sm font-medium hover:text-primary transition-colors py-2"
              onClick={() => setMobileMenuOpen(false)}
            >
              Logements
            </Link>
            <Link
              to="/about"
              className="text-sm font-medium hover:text-primary transition-colors py-2"
              onClick={() => setMobileMenuOpen(false)}
            >
              À propos
            </Link>
            <Link
              to="/contact"
              className="text-sm font-medium hover:text-primary transition-colors py-2"
              onClick={() => setMobileMenuOpen(false)}
            >
              Contact
            </Link>

            {user ? (
              <>
                <Link
                  to="/profile"
                  className="text-sm font-medium hover:text-primary transition-colors py-2"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Profil
                </Link>
                <Link
                  to="/dashboard"
                  className="text-sm font-medium hover:text-primary transition-colors py-2"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Dashboard
                </Link>
                <button
                  onClick={() => {
                    handleLogout();
                    setMobileMenuOpen(false);
                  }}
                  className="text-sm text-left hover:text-primary transition-colors py-2"
                >
                  Déconnexion
                </button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    navigate("/messages");
                    setMobileMenuOpen(false);
                  }}
                  className="w-fit"
                >
                  <Send className="w-4 h-4 mr-2" />
                  Messages
                </Button>
              </>
            ) : (
              <div className="flex flex-col space-y-2 pt-2">
                <Link to="/auth">
                  <Button variant="ghost" size="sm" className="w-full justify-start">
                    <LogIn className="w-4 h-4 mr-2" />
                    Connexion
                  </Button>
                </Link>
                <Link to="/auth">
                  <Button variant="gradient" size="sm" className="w-full">
                    <UserPlus className="w-4 h-4 mr-2" />
                    S'inscrire
                  </Button>
                </Link>
              </div>
            )}
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;