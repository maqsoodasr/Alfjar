import React, { useState } from 'react';
import { X, Flame, Clock, Users, Plus, Minus, ShoppingBag, Check } from 'lucide-react';
import { MenuItem } from '../types';

interface DishQuickViewModalProps {
  item: MenuItem | null;
  onClose: () => void;
  onAddToCart: (item: MenuItem, portion: 'half' | 'full', quantity: number, instructions?: string) => void;
}

export const DishQuickViewModal: React.FC<DishQuickViewModalProps> = ({ item, onClose, onAddToCart }) => {
  if (!item) return null;

  const [portion, setPortion] = useState<'half' | 'full'>('full');
  const [quantity, setQuantity] = useState(1);
  const [instructions, setInstructions] = useState('');
  const [addedAnimation, setAddedAnimation] = useState(false);

  const currentPrice = portion === 'half' && item.halfPrice ? item.halfPrice : item.price;
  const totalPrice = currentPrice * quantity;

  const handleAdd = () => {
    onAddToCart(item, portion, quantity, instructions);
    setAddedAnimation(true);
    setTimeout(() => {
      setAddedAnimation(false);
      onClose();
    }, 600);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div
        id="dish-quickview-modal"
        className="relative w-full max-w-2xl bg-[#181818] border border-neutral-800 rounded-2xl overflow-hidden shadow-2xl flex flex-col md:flex-row max-h-[90vh]"
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 p-2 rounded-full bg-black/60 hover:bg-black/90 text-neutral-300 hover:text-white transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Left Side: Dish Image */}
        <div className="w-full md:w-1/2 h-56 md:h-auto relative overflow-hidden bg-neutral-900">
          <img
            src={item.image}
            alt={item.name}
            className="w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#181818] via-transparent to-transparent md:hidden" />
          {item.badge && (
            <span className="absolute top-4 left-4 px-3 py-1 rounded-full text-xs font-bold bg-[#d4af37] text-black shadow-md">
              {item.badge}
            </span>
          )}
        </div>

        {/* Right Side: Details & Order Controls */}
        <div className="w-full md:w-1/2 p-6 flex flex-col justify-between overflow-y-auto">
          <div>
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold uppercase text-[#d4af37] tracking-wider">
                {item.categoryLabel}
              </span>
              {item.urduName && (
                <span className="text-sm font-serif text-neutral-400 font-medium">
                  {item.urduName}
                </span>
              )}
            </div>

            <h3 className="text-2xl font-bold text-white font-serif mt-1">
              {item.name}
            </h3>

            <p className="text-sm text-neutral-300 mt-2.5 font-light leading-relaxed">
              {item.description}
            </p>

            {/* Meta Tags */}
            <div className="mt-4 flex flex-wrap items-center gap-2 text-xs text-neutral-400">
              {item.prepTime && (
                <span className="flex items-center px-2 py-1 rounded-md bg-neutral-900 border border-neutral-800">
                  <Clock className="w-3.5 h-3.5 text-[#d4af37] mr-1" />
                  {item.prepTime}
                </span>
              )}
              {item.serves && (
                <span className="flex items-center px-2 py-1 rounded-md bg-neutral-900 border border-neutral-800">
                  <Users className="w-3.5 h-3.5 text-[#d4af37] mr-1" />
                  {item.serves}
                </span>
              )}
              {item.spiceLevel !== undefined && (
                <span className="flex items-center px-2 py-1 rounded-md bg-neutral-900 border border-neutral-800">
                  <Flame className={`w-3.5 h-3.5 mr-1 ${item.spiceLevel > 1 ? 'text-red-400' : 'text-amber-400'}`} />
                  {item.spiceLevel === 0 ? 'Mild' : item.spiceLevel === 1 ? 'Medium Spice' : 'Karachi Spicy'}
                </span>
              )}
            </div>

            {/* Portion Option (if half price available) */}
            {item.halfPrice && (
              <div className="mt-5">
                <label className="block text-xs font-semibold text-neutral-300 mb-2 uppercase tracking-wide">
                  Choose Portion Size
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setPortion('half')}
                    className={`py-2 px-3 rounded-lg text-xs font-semibold border transition-all cursor-pointer ${
                      portion === 'half'
                        ? 'border-[#d4af37] bg-[#d4af37]/15 text-amber-200'
                        : 'border-neutral-800 bg-neutral-900 text-neutral-400 hover:border-neutral-700'
                    }`}
                  >
                    Half Handi — PKR {item.halfPrice.toLocaleString()}
                  </button>
                  <button
                    type="button"
                    onClick={() => setPortion('full')}
                    className={`py-2 px-3 rounded-lg text-xs font-semibold border transition-all cursor-pointer ${
                      portion === 'full'
                        ? 'border-[#d4af37] bg-[#d4af37]/15 text-amber-200'
                        : 'border-neutral-800 bg-neutral-900 text-neutral-400 hover:border-neutral-700'
                    }`}
                  >
                    Full Handi — PKR {item.price.toLocaleString()}
                  </button>
                </div>
              </div>
            )}

            {/* Special Instructions */}
            <div className="mt-4">
              <label className="block text-xs font-semibold text-neutral-300 mb-1.5 uppercase tracking-wide">
                Special Requests / Preparation Notes
              </label>
              <input
                type="text"
                placeholder="e.g. Less oil, extra ginger julienne, well-done naan..."
                value={instructions}
                onChange={(e) => setInstructions(e.target.value)}
                className="w-full text-xs px-3 py-2 rounded-lg bg-neutral-900 border border-neutral-800 text-neutral-200 focus:outline-none focus:border-[#d4af37] placeholder-neutral-500"
              />
            </div>
          </div>

          {/* Bottom Bar: Quantity & Add Button */}
          <div className="mt-6 pt-4 border-t border-neutral-800">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs text-neutral-400">Total Price</span>
              <span className="text-xl font-bold text-[#d4af37] font-mono">
                PKR {totalPrice.toLocaleString()}
              </span>
            </div>

            <div className="flex items-center space-x-3">
              {/* Quantity Counter */}
              <div className="flex items-center rounded-lg bg-neutral-900 border border-neutral-800 p-1">
                <button
                  type="button"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="p-1.5 text-neutral-400 hover:text-white rounded transition-colors cursor-pointer"
                  disabled={quantity <= 1}
                >
                  <Minus className="w-4 h-4" />
                </button>
                <span className="w-8 text-center text-sm font-semibold text-neutral-200">
                  {quantity}
                </span>
                <button
                  type="button"
                  onClick={() => setQuantity(quantity + 1)}
                  className="p-1.5 text-neutral-400 hover:text-white rounded transition-colors cursor-pointer"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>

              {/* Add to Tray Button */}
              <button
                type="button"
                onClick={handleAdd}
                className="flex-1 flex items-center justify-center space-x-2 py-2.5 px-4 rounded-lg bg-gradient-to-r from-[#d4af37] to-[#b89324] hover:from-[#e5c158] hover:to-[#d4af37] text-black font-semibold text-sm shadow-lg shadow-[#d4af37]/20 active:scale-95 transition-all cursor-pointer"
              >
                {addedAnimation ? (
                  <>
                    <Check className="w-4 h-4 text-black animate-bounce" />
                    <span>Added to Tray!</span>
                  </>
                ) : (
                  <>
                    <ShoppingBag className="w-4 h-4 text-black" />
                    <span>Add to Order Tray</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
