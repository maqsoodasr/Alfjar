import React from 'react';
import { ArrowRight, Sparkles } from 'lucide-react';
import { FEATURED_CATEGORIES } from '../data/restaurantData';
import { CategoryId } from '../types';

interface FeaturedCategoriesProps {
  onSelectCategory: (category: CategoryId) => void;
  onNavigateToBuffet: () => void;
}

export const FeaturedCategories: React.FC<FeaturedCategoriesProps> = ({
  onSelectCategory,
  onNavigateToBuffet,
}) => {
  const handleCategoryClick = (id: string) => {
    if (id === 'buffet') {
      onNavigateToBuffet();
    } else {
      onSelectCategory(id as CategoryId);
    }
  };

  return (
    <section id="categories" className="py-20 bg-[#121212] relative border-b border-neutral-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center space-x-2 text-[#d4af37] text-xs font-semibold uppercase tracking-widest mb-2">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Culinary Masterpieces</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-white font-serif tracking-tight">
            Explore Our Signature Specialties
          </h2>
          <p className="mt-3 text-neutral-400 text-sm sm:text-base font-light">
            From simmering earthen handis to smouldering charcoal pits, every dish is prepared with fresh local ingredients and generations of culinary mastery.
          </p>
        </div>

        {/* Categories Grid (4 cards) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {FEATURED_CATEGORIES.map((cat, idx) => (
            <div
              key={cat.id}
              id={`category-card-${cat.id}`}
              onClick={() => handleCategoryClick(cat.id)}
              className="group relative h-96 rounded-2xl overflow-hidden cursor-pointer border border-neutral-800 hover:border-[#d4af37]/60 transition-all duration-500 shadow-xl flex flex-col justify-end p-6 bg-neutral-900"
            >
              {/* Background Image with Hover Zoom */}
              <div className="absolute inset-0 z-0 overflow-hidden">
                <img
                  src={cat.image}
                  alt={cat.title}
                  className="w-full h-full object-cover object-center transform group-hover:scale-110 transition-transform duration-700 ease-out"
                />
                {/* Gradient tint */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#0d0d0d] via-[#121212]/75 to-black/30 group-hover:via-[#121212]/60 transition-colors duration-500" />
              </div>

              {/* Tag / Count Badge */}
              <div className="absolute top-4 right-4 z-10">
                <span className="px-3 py-1 rounded-full text-xs font-semibold bg-black/70 backdrop-blur-md text-[#d4af37] border border-[#d4af37]/30">
                  {cat.count}
                </span>
              </div>

              {/* Card Content */}
              <div className="relative z-10 flex flex-col">
                <span className="text-[11px] font-semibold text-[#d4af37] uppercase tracking-wider mb-1">
                  Category 0{idx + 1}
                </span>
                <h3 className="text-2xl font-bold text-white font-serif tracking-tight group-hover:text-amber-200 transition-colors">
                  {cat.title}
                </h3>
                <p className="text-xs text-neutral-300 mt-2 line-clamp-2 leading-relaxed font-light">
                  {cat.subtitle}
                </p>

                <div className="mt-3 pt-3 border-t border-neutral-700/60 flex items-center justify-between text-xs font-medium text-amber-300/90 group-hover:text-[#d4af37]">
                  <span className="truncate pr-2 font-mono text-[11px] text-neutral-400">
                    {cat.popularItem}
                  </span>
                  <span className="inline-flex items-center space-x-1 flex-shrink-0 text-xs font-semibold text-[#d4af37]">
                    <span>View</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
