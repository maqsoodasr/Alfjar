import React from 'react';
import { UtensilsCrossed, MapPin, Phone, Mail, Clock, Instagram, Facebook, Youtube, Send, ArrowUp } from 'lucide-react';
import { RESTAURANT_INFO } from '../data/restaurantData';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer id="contact" className="bg-[#080808] border-t border-neutral-800 text-neutral-300 relative">
      {/* Upper Main Footer Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10">
          {/* Col 1: Brand & Identity */}
          <div className="lg:col-span-4">
            <div className="flex items-center space-x-3 group mb-4">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#d4af37] to-[#8c7017] p-0.5 flex items-center justify-center">
                <div className="w-full h-full bg-[#121212] rounded-full flex items-center justify-center">
                  <UtensilsCrossed className="w-4 h-4 text-[#d4af37]" />
                </div>
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-bold text-white font-serif tracking-tight">
                  Al Fajr <span className="text-[#d4af37] text-base font-sans font-normal">Restaurant</span>
                </span>
                <span className="text-[10px] text-[#d4af37]/90 tracking-widest uppercase font-medium">
                  Taste the Tradition
                </span>
              </div>
            </div>

            <p className="text-xs text-neutral-400 font-light leading-relaxed mb-6">
              North Nazimabad's premier family dining destination. Renowned for authentic clay pot handis, charcoal-grilled BBQ, Indo-Chinese favorites, and grand celebratory buffets.
            </p>

            {/* Social handles */}
            <div className="flex items-center space-x-3">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-lg bg-neutral-900 border border-neutral-800 flex items-center justify-center text-neutral-400 hover:text-[#d4af37] hover:border-[#d4af37]/40 transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="w-4 h-4" />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-lg bg-neutral-900 border border-neutral-800 flex items-center justify-center text-neutral-400 hover:text-[#d4af37] hover:border-[#d4af37]/40 transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-lg bg-neutral-900 border border-neutral-800 flex items-center justify-center text-neutral-400 hover:text-[#d4af37] hover:border-[#d4af37]/40 transition-colors"
                aria-label="YouTube"
              >
                <Youtube className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Col 2: Quick Links */}
          <div className="lg:col-span-2">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-4 border-b border-neutral-800 pb-2">
              Quick Links
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <a href="#home" className="hover:text-[#d4af37] transition-colors">Home</a>
              </li>
              <li>
                <a href="#menu" className="hover:text-[#d4af37] transition-colors">Our Menu</a>
              </li>
              <li>
                <a href="#about" className="hover:text-[#d4af37] transition-colors">About Us</a>
              </li>
              <li>
                <a href="#buffet" className="hover:text-[#d4af37] transition-colors">Buffet & Ramadan Deals</a>
              </li>
              <li>
                <a href="#gallery" className="hover:text-[#d4af37] transition-colors">Ambiance Gallery</a>
              </li>
              <li>
                <a href="#reservations" className="hover:text-[#d4af37] transition-colors">Book a Table</a>
              </li>
            </ul>
          </div>

          {/* Col 3: Operating Hours */}
          <div className="lg:col-span-3">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-4 border-b border-neutral-800 pb-2">
              Dining Hours
            </h4>
            <div className="space-y-3 text-xs">
              <div className="flex items-start space-x-2.5">
                <Clock className="w-4 h-4 text-[#d4af37] flex-shrink-0 mt-0.5" />
                <div>
                  <span className="font-semibold text-white block">Monday – Thursday</span>
                  <span className="text-neutral-400">1:00 PM – 1:00 AM</span>
                </div>
              </div>

              <div className="flex items-start space-x-2.5">
                <Clock className="w-4 h-4 text-[#d4af37] flex-shrink-0 mt-0.5" />
                <div>
                  <span className="font-semibold text-white block">Friday</span>
                  <span className="text-neutral-400">2:30 PM – 1:00 AM (Post-Jummah)</span>
                </div>
              </div>

              <div className="flex items-start space-x-2.5">
                <Clock className="w-4 h-4 text-[#d4af37] flex-shrink-0 mt-0.5" />
                <div>
                  <span className="font-semibold text-white block">Saturday & Sunday</span>
                  <span className="text-neutral-400">1:00 PM – 1:30 AM (Buffet 8 PM - 11:30 PM)</span>
                </div>
              </div>
            </div>
          </div>

          {/* Col 4: Location & Contact */}
          <div className="lg:col-span-3">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-4 border-b border-neutral-800 pb-2">
              Location & Contact
            </h4>
            <div className="space-y-3 text-xs">
              <div className="flex items-start space-x-2.5">
                <MapPin className="w-4 h-4 text-[#d4af37] flex-shrink-0 mt-0.5" />
                <div>
                  <strong className="text-white block font-semibold">Al Fajr Restaurant</strong>
                  <span className="text-neutral-400">{RESTAURANT_INFO.address}</span>
                </div>
              </div>

              <div className="flex items-center space-x-2.5">
                <Phone className="w-4 h-4 text-[#d4af37] flex-shrink-0" />
                <a
                  href={`tel:${RESTAURANT_INFO.phone}`}
                  className="text-white hover:text-[#d4af37] transition-colors font-medium"
                >
                  {RESTAURANT_INFO.phone}
                </a>
              </div>

              <div className="flex items-center space-x-2.5">
                <Mail className="w-4 h-4 text-[#d4af37] flex-shrink-0" />
                <a
                  href={`mailto:${RESTAURANT_INFO.email}`}
                  className="text-white hover:text-[#d4af37] transition-colors"
                >
                  {RESTAURANT_INFO.email}
                </a>
              </div>

              {/* Karachi Map Direction link */}
              <div className="pt-2">
                <a
                  href="https://www.google.com/maps/search/Al+Fajr+Restaurant+North+Nazimabad+Karachi"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-neutral-900 border border-neutral-800 text-[11px] text-amber-200 hover:border-[#d4af37]/40 transition-colors"
                >
                  <MapPin className="w-3 h-3 text-[#d4af37]" />
                  <span>Get Directions on Google Maps</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-neutral-900 bg-black/60 py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between text-xs text-neutral-500 gap-4">
          <p>
            © {new Date().getFullYear()} Al Fajr Restaurant – Taste the Tradition. Block A, North Nazimabad Town, Karachi. All rights reserved.
          </p>

          <div className="flex items-center space-x-4">
            <span className="text-neutral-400">Authentic Pakistani & BBQ Dining</span>
            <button
              onClick={scrollToTop}
              className="p-2 rounded-lg bg-neutral-900 text-neutral-400 hover:text-white hover:bg-neutral-800 transition-colors cursor-pointer"
              aria-label="Scroll back to top"
            >
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
