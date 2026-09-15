import React from 'react';
import { Calendar, Clock, CheckCircle2, Sparkles, Star, Users } from 'lucide-react';
import { BUFFET_DEALS } from '../data/restaurantData';

interface BuffetDealsProps {
  onReserveBuffet: (dealTitle: string) => void;
}

export const BuffetDeals: React.FC<BuffetDealsProps> = ({ onReserveBuffet }) => {
  return (
    <section id="buffet" className="py-24 bg-[#121212] relative overflow-hidden border-t border-b border-neutral-800">
      {/* Subtle background glow */}
      <div className="absolute top-1/2 left-1/3 -translate-y-1/2 w-96 h-96 bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center space-x-2 text-[#d4af37] text-xs font-semibold uppercase tracking-widest mb-2">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Lavish Family Feasts</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-bold text-white font-serif tracking-tight">
            Grand Buffet & Seasonal Deals
          </h2>
          <p className="mt-3 text-neutral-400 text-sm sm:text-base font-light">
            Indulge in an endless spread of live charcoal BBQ, sizzling handis, aromatic biryanis, Chinese wok specialties, and royal Mughlai desserts.
          </p>
        </div>

        {/* Buffet Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {BUFFET_DEALS.map((deal) => (
            <div
              key={deal.id}
              id={`buffet-card-${deal.id}`}
              className="rounded-3xl bg-[#181818] border border-neutral-800 hover:border-[#d4af37]/60 transition-all duration-300 overflow-hidden shadow-2xl flex flex-col justify-between"
            >
              {/* Banner with Tag */}
              <div className="relative h-64 overflow-hidden">
                <img
                  src={deal.bannerImage}
                  alt={deal.title}
                  className="w-full h-full object-cover object-center transform hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#181818] via-[#181818]/60 to-transparent" />

                {/* Deal Tag */}
                <div className="absolute top-4 left-4">
                  <span className="px-3.5 py-1 rounded-full text-xs font-bold bg-[#d4af37] text-black shadow-lg">
                    {deal.tag}
                  </span>
                </div>

                {/* Timings on Banner */}
                <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-xs text-neutral-200">
                  <span className="flex items-center bg-black/60 backdrop-blur-md px-3 py-1.5 rounded-lg border border-white/10">
                    <Clock className="w-3.5 h-3.5 text-[#d4af37] mr-1.5" />
                    {deal.timing}
                  </span>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-6 sm:p-8 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="text-2xl sm:text-3xl font-bold text-white font-serif tracking-tight">
                    {deal.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-neutral-300 mt-2 font-light leading-relaxed">
                    {deal.subtitle}
                  </p>

                  {/* Highlights List */}
                  <div className="mt-6 space-y-2.5">
                    <h4 className="text-xs font-semibold text-[#d4af37] uppercase tracking-wider">
                      Included in the Grand Spread:
                    </h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-neutral-300">
                      {deal.features.map((feature, idx) => (
                        <div key={idx} className="flex items-start space-x-2">
                          <CheckCircle2 className="w-4 h-4 text-[#d4af37] flex-shrink-0 mt-0.5" />
                          <span>{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Pricing Box & CTA */}
                <div className="mt-8 pt-6 border-t border-neutral-800 flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div className="flex items-center space-x-4 w-full sm:w-auto justify-between sm:justify-start">
                    <div>
                      <span className="text-[10px] uppercase tracking-wider text-neutral-400 block">Adult Per Head</span>
                      <span className="text-xl sm:text-2xl font-bold text-[#d4af37] font-mono">
                        PKR {deal.priceAdult.toLocaleString()}
                      </span>
                      <span className="text-[10px] text-neutral-500 block">+ tax</span>
                    </div>

                    <div className="h-8 w-px bg-neutral-800" />

                    <div>
                      <span className="text-[10px] uppercase tracking-wider text-neutral-400 block">Kids (Under 10)</span>
                      <span className="text-lg font-semibold text-neutral-300 font-mono">
                        PKR {deal.priceChild.toLocaleString()}
                      </span>
                      <span className="text-[10px] text-neutral-500 block">+ tax</span>
                    </div>
                  </div>

                  <button
                    onClick={() => onReserveBuffet(deal.title)}
                    className="w-full sm:w-auto inline-flex items-center justify-center space-x-2 px-6 py-3 rounded-xl bg-gradient-to-r from-[#d4af37] to-[#b89324] hover:from-[#e5c158] hover:to-[#d4af37] text-black font-semibold text-xs sm:text-sm shadow-lg shadow-[#d4af37]/20 active:scale-95 transition-all cursor-pointer whitespace-nowrap"
                  >
                    <Calendar className="w-4 h-4" />
                    <span>Reserve Buffet Table</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Group / Corporate Dawat Callout */}
        <div className="mt-12 p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-neutral-900 via-neutral-900/90 to-amber-950/20 border border-[#d4af37]/30 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 rounded-2xl bg-[#d4af37]/15 border border-[#d4af37]/30 flex items-center justify-center text-[#d4af37] flex-shrink-0">
              <Users className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-lg font-bold text-white font-serif">Planning a Family Dawat, Birthday or Corporate Feast?</h4>
              <p className="text-xs sm:text-sm text-neutral-300 mt-1 font-light">
                Customized buffet menus, private rooftop sections, and stage setups available for gatherings of 25 to 250 guests.
              </p>
            </div>
          </div>
          <button
            onClick={() => onReserveBuffet('Private Group / Corporate Buffet Event')}
            className="px-6 py-3 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-amber-200 border border-[#d4af37]/40 text-xs font-semibold whitespace-nowrap cursor-pointer transition-colors"
          >
            Inquire Group Packages
          </button>
        </div>
      </div>
    </section>
  );
};
