import React, { useState, useEffect } from 'react';
import { UtensilsCrossed, Phone, ShoppingBag, Menu as MenuIcon, X, Calendar, Clock, MapPin } from 'lucide-react';
import { RESTAURANT_INFO } from '../data/restaurantData';

interface NavbarProps {
  cartCount: number;
  onOpenCart: () => void;
  onOpenReservation: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ cartCount, onOpenCart, onOpenReservation }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'Menu', href: '#menu' },
    { name: 'About Us', href: '#about' },
    { name: 'Buffet Deals', href: '#buffet' },
    { name: 'Gallery', href: '#gallery' },
    { name: 'Contact & Location', href: '#contact' },
  ];

  const handleLinkClick = (href: string) => {
    setMobileMenuOpen(false);
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      {/* Top micro-bar for Karachi diners */}
      <div id="top-announcement-bar" className="bg-[#0a0a0a] text-xs text-neutral-300 border-b border-neutral-800/80 hidden md:block">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2 flex items-center justify-between">
          <div className="flex items-center space-x-6">
            <span className="flex items-center text-neutral-300">
              <MapPin className="w-3.5 h-3.5 text-[#d4af37] mr-1.5" />
              Block A, North Nazimabad Town, Karachi
            </span>
            <span className="flex items-center text-neutral-300">
              <Clock className="w-3.5 h-3.5 text-[#d4af37] mr-1.5" />
              Open Daily: 1:00 PM – 1:00 AM
            </span>
          </div>
          <div className="flex items-center space-x-4">
            <a
              href={`tel:${RESTAURANT_INFO.phone}`}
              className="flex items-center text-[#d4af37] hover:text-[#f3d77e] transition-colors font-medium"
            >
              <Phone className="w-3.5 h-3.5 mr-1" />
              Order / Inquiries: {RESTAURANT_INFO.phone}
            </a>
            <span className="text-neutral-600">|</span>
            <span className="text-amber-400/90 font-medium">100% Halal & Hygienic Family Dining</span>
          </div>
        </div>
      </div>

      {/* Main Sticky Navbar */}
      <header
        id="main-header"
        className={`sticky top-0 z-40 transition-all duration-300 ${
          isScrolled
            ? 'bg-[#121212]/95 backdrop-blur-md shadow-2xl border-b border-[#d4af37]/20 py-3'
            : 'bg-gradient-to-b from-[#0a0a0a] via-[#121212]/90 to-transparent py-4'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Logo on Left */}
          <a
            id="brand-logo"
            href="#home"
            onClick={(e) => {
              e.preventDefault();
              handleLinkClick('#home');
            }}
            className="flex items-center space-x-3 group"
          >
            <div className="w-11 h-11 rounded-full bg-gradient-to-br from-[#d4af37] to-[#8c7017] p-0.5 flex items-center justify-center shadow-lg shadow-[#d4af37]/10 group-hover:scale-105 transition-transform duration-300">
              <div className="w-full h-full bg-[#121212] rounded-full flex items-center justify-center">
                <UtensilsCrossed className="w-5 h-5 text-[#d4af37] group-hover:rotate-12 transition-transform duration-300" />
              </div>
            </div>
            <div className="flex flex-col">
              <span className="text-xl sm:text-2xl font-bold tracking-tight text-white font-serif flex items-center">
                Al Fajr <span className="text-[#d4af37] ml-1.5 text-base sm:text-lg font-sans font-normal tracking-wide">Restaurant</span>
              </span>
              <span className="text-[10px] sm:text-xs text-[#d4af37]/90 tracking-widest uppercase font-medium">
                Taste the Tradition
              </span>
            </div>
          </a>

          {/* Desktop Navigation Links */}
          <nav id="desktop-nav" className="hidden lg:flex items-center space-x-7">
            {navLinks.map((link) => (
              <button
                key={link.name}
                id={`nav-link-${link.name.toLowerCase().replace(/\s+/g, '-')}`}
                onClick={() => handleLinkClick(link.href)}
                className="text-sm font-medium text-neutral-300 hover:text-[#d4af37] transition-colors relative py-1 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-[#d4af37] hover:after:w-full after:transition-all after:duration-300 cursor-pointer"
              >
                {link.name}
              </button>
            ))}
          </nav>

          {/* Action CTAs */}
          <div className="flex items-center space-x-3">
            {/* Order Tray / Cart demo trigger */}
            <button
              id="header-order-tray-btn"
              onClick={onOpenCart}
              className="relative p-2.5 rounded-full bg-neutral-900/90 text-neutral-200 hover:text-[#d4af37] hover:bg-neutral-800 border border-neutral-700/60 transition-all cursor-pointer"
              title="View Order Tray"
            >
              <ShoppingBag className="w-5 h-5" />
              {cartCount > 0 && (
                <span
                  id="cart-count-badge"
                  className="absolute -top-1 -right-1 bg-[#d4af37] text-black text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center animate-pulse"
                >
                  {cartCount}
                </span>
              )}
            </button>

            {/* Book a Table Call to Action button */}
            <button
              id="header-book-table-btn"
              onClick={onOpenReservation}
              className="hidden sm:inline-flex items-center space-x-2 px-5 py-2.5 rounded-lg bg-gradient-to-r from-[#d4af37] to-[#b89324] hover:from-[#e5c158] hover:to-[#d4af37] text-black font-semibold text-sm shadow-lg shadow-[#d4af37]/20 hover:shadow-[#d4af37]/30 transform active:scale-95 transition-all duration-200 cursor-pointer"
            >
              <Calendar className="w-4 h-4" />
              <span>Book a Table</span>
            </button>

            {/* Mobile Menu Hamburger Button */}
            <button
              id="mobile-menu-toggle-btn"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-lg bg-neutral-900 text-neutral-200 hover:text-[#d4af37] border border-neutral-800 cursor-pointer"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <MenuIcon className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div
            id="mobile-navigation-drawer"
            className="lg:hidden bg-[#161616] border-b border-neutral-800 px-4 pt-4 pb-6 mt-3 space-y-3 shadow-2xl animate-in fade-in slide-in-from-top-4 duration-200"
          >
            <div className="flex flex-col space-y-2">
              {navLinks.map((link) => (
                <button
                  key={link.name}
                  onClick={() => handleLinkClick(link.href)}
                  className="text-left px-3 py-2.5 rounded-md text-base font-medium text-neutral-200 hover:text-[#d4af37] hover:bg-neutral-800/60 transition-colors"
                >
                  {link.name}
                </button>
              ))}
            </div>

            <div className="pt-3 border-t border-neutral-800/80 flex flex-col gap-2">
              <button
                id="mobile-drawer-book-table-btn"
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenReservation();
                }}
                className="w-full flex items-center justify-center space-x-2 py-3 rounded-lg bg-gradient-to-r from-[#d4af37] to-[#b89324] text-black font-semibold text-sm shadow-md cursor-pointer"
              >
                <Calendar className="w-4 h-4" />
                <span>Book a Table</span>
              </button>

              <div className="text-center text-xs text-neutral-400 pt-2">
                <span className="block text-neutral-300 font-medium">North Nazimabad, Karachi</span>
                <a href={`tel:${RESTAURANT_INFO.phone}`} className="text-[#d4af37] hover:underline">
                  {RESTAURANT_INFO.phone}
                </a>
              </div>
            </div>
          </div>
        )}
      </header>
    </>
  );
};
