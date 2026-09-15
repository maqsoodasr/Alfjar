import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { FeaturedCategories } from './components/FeaturedCategories';
import { MenuSection } from './components/MenuSection';
import { BuffetDeals } from './components/BuffetDeals';
import { AboutSection } from './components/AboutSection';
import { GallerySection } from './components/GallerySection';
import { ReservationSection } from './components/ReservationSection';
import { Footer } from './components/Footer';
import { DishQuickViewModal } from './components/DishQuickViewModal';
import { OrderDrawer } from './components/OrderDrawer';
import { ReservationSuccessModal } from './components/ReservationSuccessModal';
import { MenuItem, CategoryId, CartItem, ReservationData } from './types';
import { CheckCircle } from 'lucide-react';

export default function App() {
  const [selectedCategory, setSelectedCategory] = useState<CategoryId>('all');
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [quickViewItem, setQuickViewItem] = useState<MenuItem | null>(null);
  const [reservationModalData, setReservationModalData] = useState<ReservationData | null>(null);
  const [prefillRequest, setPrefillRequest] = useState<string>('');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (message: string) => {
    setToastMessage(message);
    setTimeout(() => {
      setToastMessage(null);
    }, 3000);
  };

  const scrollToSection = (sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Add item to cart tray
  const handleAddToCart = (
    item: MenuItem,
    portion: 'half' | 'full',
    quantity: number,
    instructions?: string
  ) => {
    const unitPrice = portion === 'half' && item.halfPrice ? item.halfPrice : item.price;
    setCartItems((prev) => {
      const existingIdx = prev.findIndex(
        (ci) => ci.item.id === item.id && ci.portion === portion
      );
      if (existingIdx > -1) {
        const updated = [...prev];
        updated[existingIdx].quantity += quantity;
        if (instructions) {
          updated[existingIdx].specialInstructions = instructions;
        }
        return updated;
      } else {
        return [...prev, { item, portion, quantity, unitPrice, specialInstructions: instructions }];
      }
    });

    showToast(`Added ${quantity}x ${item.name} (${portion}) to Order Tray`);
  };

  const handleQuickAdd = (item: MenuItem) => {
    handleAddToCart(item, 'full', 1);
  };

  const handleUpdateQuantity = (index: number, newQty: number) => {
    if (newQty <= 0) {
      handleRemoveItem(index);
      return;
    }
    setCartItems((prev) => {
      const updated = [...prev];
      updated[index].quantity = newQty;
      return updated;
    });
  };

  const handleRemoveItem = (index: number) => {
    setCartItems((prev) => prev.filter((_, i) => i !== index));
  };

  const handleClearCart = () => {
    setCartItems([]);
  };

  const handleCategorySelect = (category: CategoryId) => {
    setSelectedCategory(category);
    scrollToSection('menu');
  };

  const handleNavigateToBuffet = () => {
    scrollToSection('buffet');
  };

  const handleReserveBuffet = (dealTitle: string) => {
    setPrefillRequest(`Buffet Reservation Request: ${dealTitle} for family`);
    scrollToSection('reservations');
  };

  const totalCartCount = cartItems.reduce((acc, curr) => acc + curr.quantity, 0);

  return (
    <div className="min-h-screen bg-[#121212] text-slate-100 selection:bg-[#d4af37] selection:text-black">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 flex items-center space-x-2 px-5 py-3 rounded-xl bg-neutral-900/95 border border-[#d4af37] text-white shadow-2xl backdrop-blur-md animate-in fade-in slide-in-from-bottom-5 duration-200">
          <CheckCircle className="w-4 h-4 text-[#d4af37]" />
          <span className="text-xs font-semibold">{toastMessage}</span>
        </div>
      )}

      {/* Header & Sticky Navigation */}
      <Navbar
        cartCount={totalCartCount}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenReservation={() => scrollToSection('reservations')}
      />

      {/* Hero Section */}
      <Hero
        onExploreMenu={() => scrollToSection('menu')}
        onReserveTable={() => scrollToSection('reservations')}
      />

      {/* Featured Categories Grid */}
      <FeaturedCategories
        onSelectCategory={handleCategorySelect}
        onNavigateToBuffet={handleNavigateToBuffet}
      />

      {/* Interactive Online Menu Preview */}
      <MenuSection
        selectedCategory={selectedCategory}
        onSelectCategory={setSelectedCategory}
        onOpenQuickView={(item) => setQuickViewItem(item)}
        onQuickAdd={handleQuickAdd}
      />

      {/* Buffet & Seasonal Deals */}
      <BuffetDeals onReserveBuffet={handleReserveBuffet} />

      {/* About Section */}
      <AboutSection />

      {/* Ambiance & Photo Gallery */}
      <GallerySection />

      {/* Table Reservation & Inquiry Form */}
      <ReservationSection
        prefillRequest={prefillRequest}
        onReservationComplete={(resData) => setReservationModalData(resData)}
      />

      {/* Footer */}
      <Footer />

      {/* Dish Quick View Modal */}
      <DishQuickViewModal
        item={quickViewItem}
        onClose={() => setQuickViewItem(null)}
        onAddToCart={handleAddToCart}
      />

      {/* Order Tray Drawer Simulator */}
      <OrderDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onClearCart={handleClearCart}
        onNavigateToMenu={() => scrollToSection('menu')}
      />

      {/* Reservation Success Modal Simulator */}
      <ReservationSuccessModal
        reservation={reservationModalData}
        onClose={() => setReservationModalData(null)}
      />
    </div>
  );
}
