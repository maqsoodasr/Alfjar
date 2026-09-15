import React from 'react';
import { ShieldCheck, HeartHandshake, Flame, Sparkles, Star, Award, CheckCircle } from 'lucide-react';
import { TESTIMONIALS } from '../data/restaurantData';

export const AboutSection: React.FC = () => {
  return (
    <section id="about" className="py-24 bg-[#0d0d0d] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Narrative & Visual Split */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left: Visual Collage */}
          <div className="lg:col-span-6 relative">
            <div className="relative z-10 rounded-3xl overflow-hidden border border-neutral-800 shadow-2xl">
              <img
                src="https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?auto=format&fit=crop&w=1000&q=80"
                alt="Al Fajr Restaurant elegant family dining hall"
                className="w-full h-[460px] object-cover object-center"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />

              {/* Floating Highlight Card */}
              <div className="absolute bottom-6 left-6 right-6 p-5 rounded-2xl bg-neutral-900/90 backdrop-blur-md border border-neutral-700/80">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="p-2 rounded-xl bg-[#d4af37]/20 text-[#d4af37]">
                      <ShieldCheck className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-white">100% Hygienic Kitchen</h4>
                      <p className="text-xs text-neutral-400">Strict safety & quality standards in North Nazimabad</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="text-xs font-bold text-[#d4af37]">Zabiha Halal</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Decorative offset border */}
            <div className="absolute -bottom-4 -right-4 w-full h-full rounded-3xl border-2 border-[#d4af37]/20 -z-0 hidden sm:block" />
          </div>

          {/* Right: Narrative & Core Pillars */}
          <div className="lg:col-span-6 flex flex-col justify-center">
            <div className="inline-flex items-center space-x-2 text-[#d4af37] text-xs font-semibold uppercase tracking-widest mb-3">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Taste the Tradition</span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white font-serif tracking-tight leading-tight">
              A Family Dining Sanctuary in North Nazimabad
            </h2>

            <p className="mt-4 text-neutral-300 text-sm sm:text-base leading-relaxed font-light">
              Founded with an uncompromising passion for authentic Pakistani flavors, <strong className="text-white font-semibold">Al Fajr Restaurant</strong> has grown into one of Karachi’s most cherished culinary destinations. Located conveniently in Block A, North Nazimabad, we bridge rich Mughal culinary heritage with contemporary dining luxury.
            </p>

            <p className="mt-3 text-neutral-400 text-sm leading-relaxed font-light">
              Whether you are craving slow-cooked Chicken Makhni Handi simmered in traditional clay pots, smouldering Lebanese boti fresh off live charcoal pits, or our beloved family weekend buffets, every recipe is crafted to turn meals into lasting memories.
            </p>

            {/* 4 Pillars Grid */}
            <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-4 rounded-xl bg-neutral-900/70 border border-neutral-800">
                <div className="flex items-center space-x-2.5 text-[#d4af37] mb-1.5">
                  <HeartHandshake className="w-4 h-4" />
                  <h4 className="text-sm font-bold text-white">Family-First Ambiance</h4>
                </div>
                <p className="text-xs text-neutral-400">
                  Dedicated family privacy sections, plush booths, and attentive captains serving with genuine warmth.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-neutral-900/70 border border-neutral-800">
                <div className="flex items-center space-x-2.5 text-[#d4af37] mb-1.5">
                  <Flame className="w-4 h-4" />
                  <h4 className="text-sm font-bold text-white">Clay Pots & Charcoal</h4>
                </div>
                <p className="text-xs text-neutral-400">
                  Real unglazed earthen handis and acacia charcoal for that unmatched smoky aroma and tender texture.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-neutral-900/70 border border-neutral-800">
                <div className="flex items-center space-x-2.5 text-[#d4af37] mb-1.5">
                  <ShieldCheck className="w-4 h-4" />
                  <h4 className="text-sm font-bold text-white">Fresh Farm Meat</h4>
                </div>
                <p className="text-xs text-neutral-400">
                  Strictly 100% daily hand-slaughtered poultry and prime mutton. No frozen shortcuts.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-neutral-900/70 border border-neutral-800">
                <div className="flex items-center space-x-2.5 text-[#d4af37] mb-1.5">
                  <Award className="w-4 h-4" />
                  <h4 className="text-sm font-bold text-white">Open Kitchen Hygiene</h4>
                </div>
                <p className="text-xs text-neutral-400">
                  Food safety audits and filtered water for complete peace of mind for you and your children.
                </p>
              </div>
            </div>

            {/* Quick Metrics */}
            <div className="mt-8 pt-6 border-t border-neutral-800 flex items-center justify-between text-center sm:text-left">
              <div>
                <span className="text-2xl sm:text-3xl font-bold text-[#d4af37] font-serif">15+</span>
                <span className="text-xs text-neutral-400 block">Years of Heritage</span>
              </div>
              <div className="h-8 w-px bg-neutral-800" />
              <div>
                <span className="text-2xl sm:text-3xl font-bold text-[#d4af37] font-serif">50,000+</span>
                <span className="text-xs text-neutral-400 block">Families Hosted</span>
              </div>
              <div className="h-8 w-px bg-neutral-800" />
              <div>
                <span className="text-2xl sm:text-3xl font-bold text-[#d4af37] font-serif">4.8 ★</span>
                <span className="text-xs text-neutral-400 block">Diner Rating</span>
              </div>
            </div>
          </div>
        </div>

        {/* Guest Testimonials */}
        <div className="mt-20 pt-16 border-t border-neutral-800/80">
          <div className="text-center max-w-xl mx-auto mb-10">
            <h3 className="text-2xl font-bold text-white font-serif">What Karachi Families Say</h3>
            <p className="text-xs text-neutral-400 mt-1">Honest feedback from regular diners in North Nazimabad & beyond</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {TESTIMONIALS.map((t) => (
              <div
                key={t.id}
                className="p-6 rounded-2xl bg-neutral-900/60 border border-neutral-800 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center space-x-1 text-[#d4af37] mb-3">
                    {[...Array(t.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-[#d4af37]" />
                    ))}
                  </div>
                  <p className="text-xs sm:text-sm text-neutral-300 italic leading-relaxed font-light">
                    "{t.comment}"
                  </p>
                </div>

                <div className="mt-5 pt-3 border-t border-neutral-800/80 flex items-center justify-between text-xs">
                  <div>
                    <h5 className="font-semibold text-white">{t.name}</h5>
                    <span className="text-neutral-500 text-[11px]">{t.location}</span>
                  </div>
                  <span className="px-2 py-0.5 rounded text-[10px] bg-amber-500/10 text-amber-300 border border-amber-500/20">
                    {t.dish}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
