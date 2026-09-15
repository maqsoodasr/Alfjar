import React from 'react';
import { ArrowRight, Calendar, Flame, Award, Users, Sparkles, Clock, MapPin } from 'lucide-react';
import { RESTAURANT_INFO } from '../data/restaurantData';

interface HeroProps {
  onExploreMenu: () => void;
  onReserveTable: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onExploreMenu, onReserveTable }) => {
  return (
    <section id="home" className="relative min-h-[92vh] flex items-center justify-center overflow-hidden">
      {/* Background Image with warm rich dark grading */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=2000&q=85"
          alt="Al Fajr signature Chicken Makhni Handi and sizzling BBQ spread"
          className="w-full h-full object-cover object-center transform scale-105 animate-in fade-in zoom-in-95 duration-1000"
        />
        {/* Layered luxury overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#121212] via-[#121212]/80 to-[#121212]/50" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-amber-950/25 via-transparent to-black/80" />
      </div>

      {/* Decorative Golden Pattern / Ambient glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-[#d4af37]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center flex flex-col items-center">
        {/* Top Heritage Pill */}
        <div
          id="hero-heritage-badge"
          className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-neutral-900/80 border border-[#d4af37]/40 backdrop-blur-md mb-6 shadow-lg shadow-black/40"
        >
          <Sparkles className="w-3.5 h-3.5 text-[#d4af37]" />
          <span className="text-xs sm:text-sm font-medium text-amber-200 tracking-wide">
            North Nazimabad's Premier Family Dining Tradition
          </span>
        </div>

        {/* Headline */}
        <h1
          id="hero-headline"
          className="text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-white font-serif leading-[1.15] max-w-4xl drop-shadow-md"
        >
          Exquisite Flavors, <br className="hidden sm:inline" />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#f3d77e] via-[#d4af37] to-[#e5c158] italic font-serif">
            Family Moments.
          </span>
        </h1>

        {/* Sub-headline */}
        <p
          id="hero-subheadline"
          className="mt-6 text-base sm:text-xl text-neutral-300 max-w-2xl font-light leading-relaxed drop-shadow"
        >
          Experience the finest Pakistani, BBQ, and Chinese dining in the heart of North Nazimabad, Karachi.
          Slow-cooked clay handis, charcoal-grilled skewers, and generous hospitality.
        </p>

        {/* Dual CTAs */}
        <div className="mt-9 flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
          <button
            id="hero-explore-menu-btn"
            onClick={onExploreMenu}
            className="w-full sm:w-auto inline-flex items-center justify-center space-x-2.5 px-8 py-3.5 rounded-xl bg-gradient-to-r from-[#d4af37] to-[#b89324] hover:from-[#e5c158] hover:to-[#d4af37] text-black font-semibold text-base shadow-xl shadow-[#d4af37]/25 hover:shadow-[#d4af37]/40 transition-all duration-300 transform active:scale-95 cursor-pointer group"
          >
            <span>Explore Menu</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>

          <button
            id="hero-reserve-table-btn"
            onClick={onReserveTable}
            className="w-full sm:w-auto inline-flex items-center justify-center space-x-2.5 px-8 py-3.5 rounded-xl bg-neutral-900/90 hover:bg-neutral-800 text-white font-medium text-base border border-[#d4af37]/50 hover:border-[#d4af37] backdrop-blur-md shadow-lg transition-all duration-300 transform active:scale-95 cursor-pointer"
          >
            <Calendar className="w-4 h-4 text-[#d4af37]" />
            <span>Reserve a Table</span>
          </button>
        </div>

        {/* Quick Highlights Grid */}
        <div
          id="hero-highlights-grid"
          className="mt-14 pt-8 border-t border-neutral-800/80 grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 w-full max-w-4xl text-left"
        >
          <div className="p-3.5 rounded-xl bg-neutral-900/60 border border-neutral-800 backdrop-blur-xs flex items-center space-x-3">
            <div className="p-2 rounded-lg bg-amber-500/10 text-[#d4af37]">
              <Flame className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs text-neutral-400 font-normal">Authentic</p>
              <p className="text-sm font-semibold text-neutral-200">Charcoal BBQ</p>
            </div>
          </div>

          <div className="p-3.5 rounded-xl bg-neutral-900/60 border border-neutral-800 backdrop-blur-xs flex items-center space-x-3">
            <div className="p-2 rounded-lg bg-amber-500/10 text-[#d4af37]">
              <Award className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs text-neutral-400 font-normal">Slow Cooked</p>
              <p className="text-sm font-semibold text-neutral-200">Clay Pot Handis</p>
            </div>
          </div>

          <div className="p-3.5 rounded-xl bg-neutral-900/60 border border-neutral-800 backdrop-blur-xs flex items-center space-x-3">
            <div className="p-2 rounded-lg bg-amber-500/10 text-[#d4af37]">
              <Users className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs text-neutral-400 font-normal">Family Comfort</p>
              <p className="text-sm font-semibold text-neutral-200">Rooftop & AC Hall</p>
            </div>
          </div>

          <div className="p-3.5 rounded-xl bg-neutral-900/60 border border-neutral-800 backdrop-blur-xs flex items-center space-x-3">
            <div className="p-2 rounded-lg bg-amber-500/10 text-[#d4af37]">
              <Clock className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs text-neutral-400 font-normal">Late Dining</p>
              <p className="text-sm font-semibold text-neutral-200">1:00 PM – 1:00 AM</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
