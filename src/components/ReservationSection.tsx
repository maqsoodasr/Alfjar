import React, { useState } from 'react';
import { Calendar, Clock, Users, Sparkles, Send, Phone, MapPin, CheckCircle2 } from 'lucide-react';
import { ReservationData } from '../types';
import { RESTAURANT_INFO } from '../data/restaurantData';

interface ReservationSectionProps {
  onReservationComplete: (data: ReservationData) => void;
  prefillRequest?: string;
}

export const ReservationSection: React.FC<ReservationSectionProps> = ({
  onReservationComplete,
  prefillRequest,
}) => {
  const todayStr = new Date().toISOString().split('T')[0];

  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [guests, setGuests] = useState('4');
  const [date, setDate] = useState(todayStr);
  const [timeSlot, setTimeSlot] = useState('8:00 PM (Dinner)');
  const [seatingPreference, setSeatingPreference] = useState<'rooftop' | 'family-hall' | 'executive-ac' | 'any'>('rooftop');
  const [specialRequests, setSpecialRequests] = useState(prefillRequest || '');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const timeSlots = [
    '1:00 PM (Lunch)',
    '2:30 PM (Family Lunch)',
    '7:30 PM (Dinner Seating 1)',
    '8:30 PM (Dinner Peak)',
    '9:30 PM (Dinner Seating 2)',
    '10:30 PM (Late Night BBQ)',
    '11:30 PM (Midnight Feasts)',
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: Record<string, string> = {};

    if (!fullName.trim()) newErrors.fullName = 'Please enter your full name';
    if (!phone.trim()) {
      newErrors.phone = 'Please enter your contact phone number';
    } else if (phone.length < 8) {
      newErrors.phone = 'Please enter a valid phone number';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});
    setIsSubmitting(true);

    setTimeout(() => {
      const reservationId = `AF-${Math.floor(1000 + Math.random() * 9000)}`;
      const reservation: ReservationData = {
        id: reservationId,
        fullName: fullName.trim(),
        phone: phone.trim(),
        email: email.trim() || 'Not provided',
        guests: parseInt(guests, 10) || 4,
        date,
        timeSlot,
        seatingPreference,
        specialRequests: specialRequests.trim(),
        createdAt: new Date().toISOString(),
      };

      setIsSubmitting(false);
      onReservationComplete(reservation);

      // Reset form
      setFullName('');
      setPhone('');
      setEmail('');
      setSpecialRequests('');
    }, 800);
  };

  return (
    <section id="reservations" className="py-24 bg-[#0a0a0a] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Context & Guidelines */}
          <div className="lg:col-span-5 text-left">
            <div className="inline-flex items-center space-x-2 text-[#d4af37] text-xs font-semibold uppercase tracking-widest mb-3">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Priority Seating</span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white font-serif tracking-tight leading-tight">
              Book Your Table at Al Fajr
            </h2>

            <p className="mt-4 text-neutral-300 text-sm sm:text-base leading-relaxed font-light">
              Reserve your spot in advance to avoid waiting during peak dinner hours and weekend rushes. Choose between our breezy open-air rooftop, private family dining halls, or executive air-conditioned lounge.
            </p>

            <div className="mt-8 space-y-4">
              <div className="flex items-start space-x-3 text-xs text-neutral-300">
                <CheckCircle2 className="w-4 h-4 text-[#d4af37] flex-shrink-0 mt-0.5" />
                <span><strong className="text-white font-semibold">Immediate Phone Confirmation:</strong> Our manager will call you within 15 minutes of reservation.</span>
              </div>
              <div className="flex items-start space-x-3 text-xs text-neutral-300">
                <CheckCircle2 className="w-4 h-4 text-[#d4af37] flex-shrink-0 mt-0.5" />
                <span><strong className="text-white font-semibold">Special Accommodations:</strong> High chairs for infants, wheelchair accessibility, and birthday setups available upon request.</span>
              </div>
              <div className="flex items-start space-x-3 text-xs text-neutral-300">
                <CheckCircle2 className="w-4 h-4 text-[#d4af37] flex-shrink-0 mt-0.5" />
                <span><strong className="text-white font-semibold">Rooftop Seating:</strong> Highly popular during Karachi's pleasant evening sea breezes.</span>
              </div>
            </div>

            {/* Direct hotline */}
            <div className="mt-8 p-5 rounded-2xl bg-neutral-900/80 border border-neutral-800 flex items-center space-x-4">
              <div className="p-3 rounded-xl bg-[#d4af37]/10 text-[#d4af37]">
                <Phone className="w-6 h-6" />
              </div>
              <div>
                <span className="text-[11px] text-neutral-400 block font-normal">Need Same-Hour Booking?</span>
                <a
                  href={`tel:${RESTAURANT_INFO.phone}`}
                  className="text-base font-bold text-white hover:text-[#d4af37] transition-colors"
                >
                  {RESTAURANT_INFO.phone}
                </a>
              </div>
            </div>
          </div>

          {/* Right Column: Reservation Form */}
          <div className="lg:col-span-7">
            <div className="p-6 sm:p-10 rounded-3xl bg-[#161616] border border-neutral-800 shadow-2xl relative">
              <div className="mb-6 pb-4 border-b border-neutral-800/80 flex items-center justify-between">
                <div>
                  <h3 className="text-xl font-bold text-white font-serif">Table Reservation Form</h3>
                  <p className="text-xs text-neutral-400">Fill in the details below to reserve your dining experience.</p>
                </div>
                <span className="text-[11px] px-3 py-1 rounded-full bg-amber-500/10 text-amber-300 border border-amber-500/30">
                  Instant Simulator
                </span>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Full Name */}
                  <div>
                    <label className="block text-xs font-semibold text-neutral-300 mb-1">
                      Full Name <span className="text-[#d4af37]">*</span>
                    </label>
                    <input
                      id="reservation-fullname"
                      type="text"
                      placeholder="e.g. Asim Sheikh"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      className={`w-full text-xs px-3.5 py-2.5 rounded-xl bg-neutral-900 border text-neutral-200 focus:outline-none placeholder-neutral-500 transition-all ${
                        errors.fullName ? 'border-red-500 focus:border-red-500' : 'border-neutral-800 focus:border-[#d4af37]'
                      }`}
                    />
                    {errors.fullName && <p className="text-[11px] text-red-400 mt-1">{errors.fullName}</p>}
                  </div>

                  {/* Phone Number */}
                  <div>
                    <label className="block text-xs font-semibold text-neutral-300 mb-1">
                      Phone Number <span className="text-[#d4af37]">*</span>
                    </label>
                    <input
                      id="reservation-phone"
                      type="tel"
                      placeholder="0316 1071375"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className={`w-full text-xs px-3.5 py-2.5 rounded-xl bg-neutral-900 border text-neutral-200 focus:outline-none placeholder-neutral-500 transition-all ${
                        errors.phone ? 'border-red-500 focus:border-red-500' : 'border-neutral-800 focus:border-[#d4af37]'
                      }`}
                    />
                    {errors.phone && <p className="text-[11px] text-red-400 mt-1">{errors.phone}</p>}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {/* Guests */}
                  <div>
                    <label className="block text-xs font-semibold text-neutral-300 mb-1">
                      Number of Guests
                    </label>
                    <select
                      id="reservation-guests"
                      value={guests}
                      onChange={(e) => setGuests(e.target.value)}
                      className="w-full text-xs px-3.5 py-2.5 rounded-xl bg-neutral-900 border border-neutral-800 text-neutral-200 focus:outline-none focus:border-[#d4af37] transition-all cursor-pointer"
                    >
                      <option value="1">1 Person</option>
                      <option value="2">2 Persons</option>
                      <option value="4">4 Persons (Family Table)</option>
                      <option value="6">6 Persons</option>
                      <option value="8">8 Persons (Large Booth)</option>
                      <option value="12">12 Persons (Party Setup)</option>
                      <option value="20">20+ Persons (Private Hall)</option>
                    </select>
                  </div>

                  {/* Date */}
                  <div>
                    <label className="block text-xs font-semibold text-neutral-300 mb-1">
                      Reservation Date
                    </label>
                    <input
                      id="reservation-date"
                      type="date"
                      min={todayStr}
                      value={date}
                      onChange={(e) => setDate(e.target.value)}
                      className="w-full text-xs px-3.5 py-2.5 rounded-xl bg-neutral-900 border border-neutral-800 text-neutral-200 focus:outline-none focus:border-[#d4af37] transition-all"
                    />
                  </div>

                  {/* Time Slot */}
                  <div>
                    <label className="block text-xs font-semibold text-neutral-300 mb-1">
                      Time Slot
                    </label>
                    <select
                      id="reservation-timeslot"
                      value={timeSlot}
                      onChange={(e) => setTimeSlot(e.target.value)}
                      className="w-full text-xs px-3.5 py-2.5 rounded-xl bg-neutral-900 border border-neutral-800 text-neutral-200 focus:outline-none focus:border-[#d4af37] transition-all cursor-pointer"
                    >
                      {timeSlots.map((ts) => (
                        <option key={ts} value={ts}>{ts}</option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Seating Preference */}
                <div>
                  <label className="block text-xs font-semibold text-neutral-300 mb-1.5">
                    Dining Area Preference
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                    <button
                      type="button"
                      onClick={() => setSeatingPreference('rooftop')}
                      className={`p-2.5 rounded-xl text-xs font-medium border text-center transition-all cursor-pointer ${
                        seatingPreference === 'rooftop'
                          ? 'border-[#d4af37] bg-[#d4af37]/15 text-[#d4af37] font-semibold'
                          : 'border-neutral-800 bg-neutral-900 text-neutral-400 hover:border-neutral-700'
                      }`}
                    >
                      Rooftop Open-Air
                    </button>
                    <button
                      type="button"
                      onClick={() => setSeatingPreference('family-hall')}
                      className={`p-2.5 rounded-xl text-xs font-medium border text-center transition-all cursor-pointer ${
                        seatingPreference === 'family-hall'
                          ? 'border-[#d4af37] bg-[#d4af37]/15 text-[#d4af37] font-semibold'
                          : 'border-neutral-800 bg-neutral-900 text-neutral-400 hover:border-neutral-700'
                      }`}
                    >
                      AC Family Hall
                    </button>
                    <button
                      type="button"
                      onClick={() => setSeatingPreference('executive-ac')}
                      className={`p-2.5 rounded-xl text-xs font-medium border text-center transition-all cursor-pointer ${
                        seatingPreference === 'executive-ac'
                          ? 'border-[#d4af37] bg-[#d4af37]/15 text-[#d4af37] font-semibold'
                          : 'border-neutral-800 bg-neutral-900 text-neutral-400 hover:border-neutral-700'
                      }`}
                    >
                      Executive Lounge
                    </button>
                  </div>
                </div>

                {/* Special Requests */}
                <div>
                  <label className="block text-xs font-semibold text-neutral-300 mb-1">
                    Special Requests (e.g., rooftop corner seating, birthday surprise, high chair)
                  </label>
                  <textarea
                    id="reservation-special-requests"
                    rows={2}
                    placeholder="Let us know any seating preference, dietary requirements, or celebratory requests..."
                    value={specialRequests}
                    onChange={(e) => setSpecialRequests(e.target.value)}
                    className="w-full text-xs px-3.5 py-2 rounded-xl bg-neutral-900 border border-neutral-800 text-neutral-200 focus:outline-none focus:border-[#d4af37] placeholder-neutral-500 transition-all resize-none"
                  />
                </div>

                {/* Submit CTA */}
                <button
                  id="submit-reservation-btn"
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full mt-4 py-3.5 px-6 rounded-xl bg-gradient-to-r from-[#d4af37] to-[#b89324] hover:from-[#e5c158] hover:to-[#d4af37] text-black font-bold text-sm shadow-xl shadow-[#d4af37]/25 active:scale-98 transition-all flex items-center justify-center space-x-2 cursor-pointer disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <span>Processing Reservation...</span>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      <span>Confirm & Reserve Table</span>
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
