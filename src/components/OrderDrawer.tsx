import React, { useState } from 'react';
import { X, Trash2, Plus, Minus, Send, ShoppingBag, CheckCircle, ArrowRight } from 'lucide-react';
import { CartItem } from '../types';
import { RESTAURANT_INFO } from '../data/restaurantData';

interface OrderDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (index: number, newQty: number) => void;
  onRemoveItem: (index: number) => void;
  onClearCart: () => void;
  onNavigateToMenu: () => void;
}

export const OrderDrawer: React.FC<OrderDrawerProps> = ({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
  onNavigateToMenu,
}) => {
  if (!isOpen) return null;

  const [orderType, setOrderType] = useState<'dine-in' | 'takeaway'>('dine-in');
  const [tableOrAddress, setTableOrAddress] = useState('');
  const [orderSubmitted, setOrderSubmitted] = useState(false);

  const subtotal = items.reduce((acc, item) => acc + item.unitPrice * item.quantity, 0);
  const gst = Math.round(subtotal * 0.13); // 13% Sindh Sales Tax
  const grandTotal = subtotal + gst;

  const handleWhatsAppOrder = () => {
    let message = `*Al Fajr Restaurant Order Request*\n`;
    message += `Order Type: ${orderType.toUpperCase()}\n`;
    if (tableOrAddress) {
      message += `Note / Table: ${tableOrAddress}\n`;
    }
    message += `-------------------------\n`;
    items.forEach((ci, i) => {
      message += `${i + 1}. ${ci.item.name} (${ci.portion.toUpperCase()}) x${ci.quantity} - PKR ${(ci.unitPrice * ci.quantity).toLocaleString()}\n`;
      if (ci.specialInstructions) {
        message += `   _Note: ${ci.specialInstructions}_\n`;
      }
    });
    message += `-------------------------\n`;
    message += `Subtotal: PKR ${subtotal.toLocaleString()}\n`;
    message += `GST (13%): PKR ${gst.toLocaleString()}\n`;
    message += `*Total Amount: PKR ${grandTotal.toLocaleString()}*\n\n`;
    message += `Please confirm my order at Al Fajr Restaurant North Nazimabad. Thank you!`;

    const encoded = encodeURIComponent(message);
    window.open(`https://wa.me/923161071375?text=${encoded}`, '_blank');
  };

  const handleSimulateOrder = () => {
    setOrderSubmitted(true);
    setTimeout(() => {
      onClearCart();
      setOrderSubmitted(false);
      onClose();
    }, 2500);
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/75 backdrop-blur-xs animate-in fade-in duration-200">
      <div
        id="order-tray-drawer"
        className="relative w-full max-w-md bg-[#161616] border-l border-neutral-800 h-full flex flex-col shadow-2xl animate-in slide-in-from-right duration-300"
      >
        {/* Header */}
        <div className="p-5 border-b border-neutral-800 flex items-center justify-between bg-[#121212]">
          <div className="flex items-center space-x-2.5">
            <div className="p-2 rounded-lg bg-[#d4af37]/10 text-[#d4af37]">
              <ShoppingBag className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white font-serif">Your Order Tray</h3>
              <p className="text-xs text-neutral-400">
                {items.length} {items.length === 1 ? 'item' : 'items'} selected
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-neutral-800 text-neutral-400 hover:text-white transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        {orderSubmitted ? (
          <div className="flex-1 p-8 flex flex-col items-center justify-center text-center">
            <div className="w-16 h-16 rounded-full bg-emerald-500/10 text-emerald-400 flex items-center justify-center mb-4">
              <CheckCircle className="w-10 h-10" />
            </div>
            <h4 className="text-xl font-bold text-white font-serif">Order Received!</h4>
            <p className="text-sm text-neutral-300 mt-2">
              Our North Nazimabad kitchen has received your tray details. Our captain will verify items shortly.
            </p>
            <div className="mt-6 p-4 rounded-xl bg-neutral-900 border border-neutral-800 w-full text-xs text-neutral-400">
              Estimated Preparation Time: <span className="text-[#d4af37] font-semibold">20-25 Mins</span>
            </div>
          </div>
        ) : items.length === 0 ? (
          <div className="flex-1 p-8 flex flex-col items-center justify-center text-center">
            <div className="w-16 h-16 rounded-full bg-neutral-900 border border-neutral-800 flex items-center justify-center mb-4 text-neutral-500">
              <ShoppingBag className="w-8 h-8" />
            </div>
            <h4 className="text-lg font-bold text-white font-serif">Your Tray is Empty</h4>
            <p className="text-xs text-neutral-400 mt-2 max-w-xs leading-relaxed">
              Explore our mouth-watering selection of Chicken Makhni Handi, BBQ kebabs, and Chinese platters to begin.
            </p>
            <button
              onClick={() => {
                onClose();
                onNavigateToMenu();
              }}
              className="mt-6 inline-flex items-center space-x-2 px-5 py-2.5 rounded-lg bg-[#d4af37] text-black font-semibold text-xs hover:bg-[#e5c158] transition-colors cursor-pointer"
            >
              <span>Explore Menu</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        ) : (
          <>
            {/* Items List */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3">
              {items.map((cartItem, index) => (
                <div
                  key={`${cartItem.item.id}-${cartItem.portion}-${index}`}
                  className="p-3.5 rounded-xl bg-neutral-900/80 border border-neutral-800/90 flex gap-3 relative"
                >
                  <img
                    src={cartItem.item.image}
                    alt={cartItem.item.name}
                    className="w-16 h-16 rounded-lg object-cover flex-shrink-0"
                  />

                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between">
                      <h5 className="text-xs sm:text-sm font-semibold text-white truncate pr-2">
                        {cartItem.item.name}
                      </h5>
                      <button
                        onClick={() => onRemoveItem(index)}
                        className="text-neutral-500 hover:text-red-400 transition-colors p-1"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <div className="flex items-center space-x-2 text-[11px] text-neutral-400 mt-0.5">
                      <span className="capitalize text-[#d4af37]">{cartItem.portion} Portion</span>
                      <span>•</span>
                      <span>PKR {cartItem.unitPrice.toLocaleString()}</span>
                    </div>

                    {cartItem.specialInstructions && (
                      <p className="text-[10px] text-neutral-400 italic mt-1 truncate">
                        "{cartItem.specialInstructions}"
                      </p>
                    )}

                    <div className="flex items-center justify-between mt-2.5">
                      <div className="flex items-center rounded-md bg-neutral-950 border border-neutral-800">
                        <button
                          onClick={() => onUpdateQuantity(index, cartItem.quantity - 1)}
                          className="px-2 py-0.5 text-neutral-400 hover:text-white"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="px-2 text-xs font-semibold text-neutral-200">
                          {cartItem.quantity}
                        </span>
                        <button
                          onClick={() => onUpdateQuantity(index, cartItem.quantity + 1)}
                          className="px-2 py-0.5 text-neutral-400 hover:text-white"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>

                      <span className="text-xs font-bold text-[#d4af37] font-mono">
                        PKR {(cartItem.unitPrice * cartItem.quantity).toLocaleString()}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Footer Summary & Actions */}
            <div className="p-4 border-t border-neutral-800 bg-[#121212] space-y-3">
              {/* Dining Mode Toggle */}
              <div className="grid grid-cols-2 gap-2 p-1 rounded-lg bg-neutral-900 border border-neutral-800 text-xs">
                <button
                  type="button"
                  onClick={() => setOrderType('dine-in')}
                  className={`py-1.5 rounded-md font-medium transition-all ${
                    orderType === 'dine-in' ? 'bg-[#d4af37] text-black font-semibold' : 'text-neutral-400'
                  }`}
                >
                  Dine-In Table
                </button>
                <button
                  type="button"
                  onClick={() => setOrderType('takeaway')}
                  className={`py-1.5 rounded-md font-medium transition-all ${
                    orderType === 'takeaway' ? 'bg-[#d4af37] text-black font-semibold' : 'text-neutral-400'
                  }`}
                >
                  Takeaway / Parcel
                </button>
              </div>

              <input
                type="text"
                placeholder={orderType === 'dine-in' ? 'Table Number / Seating Area (e.g. Table 14 Rooftop)' : 'Customer Name & Contact Number'}
                value={tableOrAddress}
                onChange={(e) => setTableOrAddress(e.target.value)}
                className="w-full text-xs px-3 py-2 rounded-lg bg-neutral-900 border border-neutral-800 text-neutral-200 focus:outline-none focus:border-[#d4af37] placeholder-neutral-500"
              />

              {/* Price Details */}
              <div className="space-y-1 text-xs pt-1 border-t border-neutral-800/80">
                <div className="flex justify-between text-neutral-400">
                  <span>Subtotal</span>
                  <span>PKR {subtotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-neutral-400">
                  <span>Sindh Sales Tax (13%)</span>
                  <span>PKR {gst.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-sm font-bold text-white pt-1 border-t border-neutral-800">
                  <span>Grand Total</span>
                  <span className="text-[#d4af37] font-mono">PKR {grandTotal.toLocaleString()}</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col gap-2 pt-1">
                <button
                  onClick={handleWhatsAppOrder}
                  className="w-full py-2.5 px-4 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs flex items-center justify-center space-x-2 transition-colors cursor-pointer"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Send Order via WhatsApp (+92 316 1071375)</span>
                </button>

                <button
                  onClick={handleSimulateOrder}
                  className="w-full py-2.5 px-4 rounded-lg bg-gradient-to-r from-[#d4af37] to-[#b89324] hover:from-[#e5c158] hover:to-[#d4af37] text-black font-semibold text-xs transition-all cursor-pointer"
                >
                  Place Test Order Simulation
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};
