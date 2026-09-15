import React, { useState, useMemo } from 'react';
import { Search, Eye, Plus, Flame, Clock, Users, Sparkles, Filter } from 'lucide-react';
import { MENU_ITEMS } from '../data/restaurantData';
import { MenuItem, CategoryId } from '../types';

interface MenuSectionProps {
  selectedCategory: CategoryId;
  onSelectCategory: (category: CategoryId) => void;
  onOpenQuickView: (item: MenuItem) => void;
  onQuickAdd: (item: MenuItem) => void;
}

export const MenuSection: React.FC<MenuSectionProps> = ({
  selectedCategory,
  onSelectCategory,
  onOpenQuickView,
  onQuickAdd,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [spiceFilter, setSpiceFilter] = useState<'all' | 'mild' | 'spicy'>('all');

  const filterTabs: { id: CategoryId; label: string }[] = [
    { id: 'all', label: 'All Dishes' },
    { id: 'handi', label: 'Handi & Karahi' },
    { id: 'bbq', label: 'BBQ Specials' },
    { id: 'chinese', label: 'Chinese' },
    { id: 'fastfood', label: 'Fast Food' },
    { id: 'desserts', label: 'Desserts & Drinks' },
  ];

  const filteredItems = useMemo(() => {
    return MENU_ITEMS.filter((dish) => {
      // Category match
      const matchesCategory =
        selectedCategory === 'all' ||
        (selectedCategory === 'handi' && dish.category === 'handi') ||
        (selectedCategory === 'bbq' && dish.category === 'bbq') ||
        (selectedCategory === 'chinese' && dish.category === 'chinese') ||
        (selectedCategory === 'fastfood' && dish.category === 'fastfood') ||
        (selectedCategory === 'desserts' && dish.category === 'desserts');

      // Search match
      const matchesSearch =
        searchQuery.trim() === '' ||
        dish.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (dish.urduName && dish.urduName.includes(searchQuery)) ||
        dish.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        dish.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()));

      // Spice filter
      const matchesSpice =
        spiceFilter === 'all' ||
        (spiceFilter === 'mild' && (dish.spiceLevel === 0 || dish.spiceLevel === 1)) ||
        (spiceFilter === 'spicy' && dish.spiceLevel !== undefined && dish.spiceLevel >= 2);

      return matchesCategory && matchesSearch && matchesSpice;
    });
  }, [selectedCategory, searchQuery, spiceFilter]);

  return (
    <section id="menu" className="py-24 bg-[#0e0e0e] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center space-x-2 text-[#d4af37] text-xs font-semibold uppercase tracking-widest mb-2">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Culinary Menu Preview</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-bold text-white font-serif tracking-tight">
            Authentic Karachi Flavors
          </h2>
          <p className="mt-3 text-neutral-400 text-sm sm:text-base font-light">
            Crafted fresh to order in our hygienic kitchens. Select any specialty to customize portion, spice level, or add to your test order tray.
          </p>
        </div>

        {/* Filter Navigation Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mb-8">
          {filterTabs.map((tab) => {
            const isActive = selectedCategory === tab.id;
            return (
              <button
                key={tab.id}
                id={`menu-tab-${tab.id}`}
                onClick={() => onSelectCategory(tab.id)}
                className={`px-4 sm:px-5 py-2.5 rounded-full text-xs sm:text-sm font-semibold transition-all duration-300 cursor-pointer ${
                  isActive
                    ? 'bg-gradient-to-r from-[#d4af37] to-[#b89324] text-black shadow-lg shadow-[#d4af37]/25 scale-105'
                    : 'bg-neutral-900/90 text-neutral-300 hover:text-white hover:bg-neutral-800 border border-neutral-800'
                }`}
              >
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Search Bar & Spice Preferences */}
        <div className="max-w-2xl mx-auto mb-12 flex flex-col sm:flex-row items-center gap-3">
          <div className="relative w-full">
            <Search className="w-4 h-4 text-neutral-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search by dish name, Urdu title, or ingredient (e.g. Makhni, Boti, Biryani)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-neutral-900/90 border border-neutral-800 text-sm text-neutral-200 placeholder-neutral-500 focus:outline-none focus:border-[#d4af37] transition-all"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-neutral-400 hover:text-white"
              >
                Clear
              </button>
            )}
          </div>

          <div className="flex items-center space-x-1.5 self-end sm:self-center bg-neutral-900 border border-neutral-800 p-1 rounded-xl text-xs flex-shrink-0">
            <span className="px-2 text-neutral-400 font-medium flex items-center">
              <Filter className="w-3 h-3 mr-1 text-[#d4af37]" /> Spice:
            </span>
            <button
              onClick={() => setSpiceFilter('all')}
              className={`px-2.5 py-1 rounded-lg transition-colors ${
                spiceFilter === 'all' ? 'bg-[#d4af37] text-black font-semibold' : 'text-neutral-400'
              }`}
            >
              All
            </button>
            <button
              onClick={() => setSpiceFilter('mild')}
              className={`px-2.5 py-1 rounded-lg transition-colors ${
                spiceFilter === 'mild' ? 'bg-[#d4af37] text-black font-semibold' : 'text-neutral-400'
              }`}
            >
              Mild
            </button>
            <button
              onClick={() => setSpiceFilter('spicy')}
              className={`px-2.5 py-1 rounded-lg transition-colors ${
                spiceFilter === 'spicy' ? 'bg-[#d4af37] text-black font-semibold' : 'text-neutral-400'
              }`}
            >
              Spicy
            </button>
          </div>
        </div>

        {/* Menu Grid */}
        {filteredItems.length === 0 ? (
          <div className="text-center py-16 bg-neutral-900/40 rounded-2xl border border-neutral-800/80 max-w-lg mx-auto">
            <p className="text-base text-neutral-300 font-serif">No dishes found matching your query.</p>
            <p className="text-xs text-neutral-500 mt-1">Try searching for "Handi", "Kebab", "Biryani" or reset filters.</p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSpiceFilter('all');
                onSelectCategory('all');
              }}
              className="mt-4 px-4 py-2 rounded-lg bg-[#d4af37] text-black font-semibold text-xs cursor-pointer hover:bg-[#e5c158]"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredItems.map((dish) => (
              <div
                key={dish.id}
                id={`menu-item-${dish.id}`}
                className="group rounded-2xl bg-neutral-900/90 border border-neutral-800/90 hover:border-[#d4af37]/50 transition-all duration-300 overflow-hidden flex flex-col justify-between shadow-lg hover:shadow-2xl hover:shadow-black/60"
              >
                {/* Image Container with Badges */}
                <div className="relative h-56 overflow-hidden bg-neutral-950">
                  <img
                    src={dish.image}
                    alt={dish.name}
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500 ease-out"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-neutral-900 via-transparent to-transparent opacity-80" />

                  {/* Top Badges */}
                  <div className="absolute top-3 left-3 flex items-center gap-1.5">
                    {dish.badge && (
                      <span className="px-2.5 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wider bg-[#d4af37] text-black shadow-md">
                        {dish.badge}
                      </span>
                    )}
                    {dish.spiceLevel !== undefined && (
                      <span className="px-2 py-0.5 rounded-md text-[10px] font-semibold bg-black/70 backdrop-blur-xs text-neutral-200 border border-white/10 flex items-center">
                        <Flame className={`w-3 h-3 mr-0.5 ${dish.spiceLevel > 1 ? 'text-red-400' : 'text-amber-400'}`} />
                        {dish.spiceLevel === 0 ? 'Mild' : dish.spiceLevel === 1 ? 'Medium' : 'Spicy'}
                      </span>
                    )}
                  </div>

                  {/* Quick View Floating Button on Hover */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/40 backdrop-blur-[2px]">
                    <button
                      onClick={() => onOpenQuickView(dish)}
                      className="inline-flex items-center space-x-1.5 px-4 py-2 rounded-xl bg-neutral-900/90 hover:bg-neutral-800 text-white text-xs font-semibold border border-neutral-700 shadow-xl cursor-pointer transform translate-y-2 group-hover:translate-y-0 transition-all"
                    >
                      <Eye className="w-3.5 h-3.5 text-[#d4af37]" />
                      <span>Quick View Details</span>
                    </button>
                  </div>
                </div>

                {/* Body Content */}
                <div className="p-5 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <span className="text-[10px] font-semibold text-[#d4af37] uppercase tracking-wider">
                          {dish.categoryLabel}
                        </span>
                        <h3 className="text-lg font-bold text-white font-serif tracking-tight mt-0.5 group-hover:text-amber-200 transition-colors">
                          {dish.name}
                        </h3>
                      </div>
                      {dish.urduName && (
                        <span className="text-xs font-serif text-neutral-400 font-medium whitespace-nowrap pt-1">
                          {dish.urduName}
                        </span>
                      )}
                    </div>

                    <p className="text-xs text-neutral-300 mt-2 line-clamp-2 leading-relaxed font-light">
                      {dish.description}
                    </p>

                    {/* Metadata tags */}
                    <div className="mt-3 flex flex-wrap gap-1.5">
                      {dish.tags.slice(0, 3).map((tag, idx) => (
                        <span
                          key={idx}
                          className="px-2 py-0.5 rounded text-[10px] bg-neutral-950 text-neutral-400 border border-neutral-800/80"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Bottom Price & Add Actions */}
                  <div className="mt-5 pt-3 border-t border-neutral-800/90 flex items-center justify-between">
                    <div>
                      <span className="text-[10px] text-neutral-400 block font-normal">Price</span>
                      <div className="flex items-baseline space-x-1.5">
                        <span className="text-base sm:text-lg font-bold text-[#d4af37] font-mono">
                          PKR {dish.price.toLocaleString()}
                        </span>
                        {dish.halfPrice && (
                          <span className="text-[11px] text-neutral-400">
                            / Half: PKR {dish.halfPrice.toLocaleString()}
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => onOpenQuickView(dish)}
                        className="p-2 rounded-lg bg-neutral-800/80 hover:bg-neutral-800 text-neutral-300 hover:text-white border border-neutral-700/60 transition-colors cursor-pointer"
                        title="View portion options"
                      >
                        <Eye className="w-4 h-4" />
                      </button>

                      <button
                        onClick={() => onQuickAdd(dish)}
                        className="inline-flex items-center space-x-1 px-3.5 py-2 rounded-lg bg-gradient-to-r from-[#d4af37] to-[#b89324] hover:from-[#e5c158] hover:to-[#d4af37] text-black text-xs font-bold shadow-md shadow-[#d4af37]/20 active:scale-95 transition-all cursor-pointer"
                      >
                        <Plus className="w-3.5 h-3.5 text-black stroke-[3]" />
                        <span>Add</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Bottom Menu Guarantee Pill */}
        <div className="mt-14 text-center">
          <div className="inline-flex flex-col sm:flex-row items-center gap-3 px-6 py-3 rounded-2xl bg-neutral-900/60 border border-neutral-800 text-xs text-neutral-300">
            <span className="text-[#d4af37] font-semibold">Al Fajr Kitchen Guarantee:</span>
            <span>All our poultry and meat are slaughtered strictly 100% Zabiha Halal daily and prepared in hygienic stainless-steel stations.</span>
          </div>
        </div>
      </div>
    </section>
  );
};
