import React from 'react';
import { CheckCircle, Calendar, Clock, Users, MapPin, X, MessageSquare, PhoneCall } from 'lucide-react';
import { ReservationData } from '../types';
import { RESTAURANT_INFO } from '../data/restaurantData';

interface ReservationSuccessModalProps {
  reservation: ReservationData | null;
  onClose: () => void;
}

export const ReservationSuccessModal: React.FC<ReservationSuccessModalProps> = ({ reservation, onClose }) => {
  if (!reservation) return null;

  const seatingNames: Record<string, string> = {
    'rooftop': 'Rooftop Open-Air Dining',
    'family-hall': 'AC Family Hall (Private Partition)',
    'executive-ac': 'Executive AC Lounge',
    'any': 'First Available Family Table',
  };

  const shareToWhatsApp = () => {
    const text = `*Al Fajr Restaurant Reservation Confirmation*\n` +
      `Booking ID: ${reservation.id}\n` +
      `Guest Name: ${reservation.fullName}\n` +
      `Date & Time: ${reservation.date} at ${reservation.timeSlot}\n` +
      `Guests: ${reservation.guests} Persons\n` +
      `Seating: ${seatingNames[reservation.seatingPreference] || reservation.seatingPreference}\n` +
      (reservation.specialRequests ? `Special Requests: ${reservation.specialRequests}\n` : '') +
      `Location: Block A, North Nazimabad, Karachi.\n\n` +
      `Please confirm my reservation. Thank you!`;
    window.open(`https://wa.me/923161071375?text=${encodeURIComponent(text)}`, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
      <div
        id="reservation-success-modal"
        className="relative w-full max-w-lg bg-[#181818] border border-[#d4af37]/40 rounded-3xl p-6 sm:p-8 shadow-2xl shadow-black/80 animate-in zoom-in-95 duration-200 text-center"
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full bg-neutral-900 text-neutral-400 hover:text-white cursor-pointer transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Success Icon */}
        <div className="w-16 h-16 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 flex items-center justify-center mx-auto mb-4">
          <CheckCircle className="w-10 h-10" />
        </div>

        {/* Highlighted headline as required */}
        <h3 className="text-2xl sm:text-3xl font-bold text-white font-serif">
          Table Reserved Successfully!
        </h3>

        <p className="text-sm text-amber-200/90 font-medium mt-2">
          We will call you shortly to confirm.
        </p>

        <p className="text-xs text-neutral-400 mt-1 font-light">
          Your request has been logged in Al Fajr's reservation system for North Nazimabad, Karachi.
        </p>

        {/* Summary Card */}
        <div className="mt-6 p-5 rounded-2xl bg-neutral-900/90 border border-neutral-800 text-left space-y-3 text-xs">
          <div className="flex justify-between items-center pb-2 border-b border-neutral-800">
            <span className="text-neutral-400">Booking Reference</span>
            <span className="font-mono font-bold text-[#d4af37] text-sm">{reservation.id}</span>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <span className="text-neutral-400 block">Primary Guest</span>
              <span className="font-semibold text-white truncate block">{reservation.fullName}</span>
            </div>
            <div>
              <span className="text-neutral-400 block">Contact Phone</span>
              <span className="font-semibold text-white block">{reservation.phone}</span>
            </div>
            <div>
              <span className="text-neutral-400 flex items-center mb-0.5">
                <Calendar className="w-3 h-3 mr-1 text-[#d4af37]" /> Date
              </span>
              <span className="font-semibold text-white block">{reservation.date}</span>
            </div>
            <div>
              <span className="text-neutral-400 flex items-center mb-0.5">
                <Clock className="w-3 h-3 mr-1 text-[#d4af37]" /> Time Slot
              </span>
              <span className="font-semibold text-white block">{reservation.timeSlot}</span>
            </div>
            <div>
              <span className="text-neutral-400 flex items-center mb-0.5">
                <Users className="w-3 h-3 mr-1 text-[#d4af37]" /> Guests
              </span>
              <span className="font-semibold text-white block">{reservation.guests} Persons</span>
            </div>
            <div>
              <span className="text-neutral-400 block mb-0.5">Seating</span>
              <span className="font-semibold text-white block truncate">
                {seatingNames[reservation.seatingPreference] || reservation.seatingPreference}
              </span>
            </div>
          </div>

          {reservation.specialRequests && (
            <div className="pt-2 border-t border-neutral-800">
              <span className="text-neutral-400 block">Special Request:</span>
              <span className="text-neutral-300 italic block mt-0.5">"{reservation.specialRequests}"</span>
            </div>
          )}

          <div className="pt-2 border-t border-neutral-800 flex items-center text-[11px] text-neutral-400">
            <MapPin className="w-3.5 h-3.5 text-[#d4af37] mr-1.5 flex-shrink-0" />
            <span>Block A, North Nazimabad Town, Karachi</span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="mt-6 flex flex-col sm:flex-row gap-3">
          <button
            onClick={shareToWhatsApp}
            className="flex-1 py-3 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs flex items-center justify-center space-x-2 transition-colors cursor-pointer"
          >
            <MessageSquare className="w-4 h-4" />
            <span>Send Details via WhatsApp</span>
          </button>

          <button
            onClick={onClose}
            className="sm:w-32 py-3 px-4 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-neutral-200 font-semibold text-xs transition-colors cursor-pointer"
          >
            Done
          </button>
        </div>

        <div className="mt-4 flex items-center justify-center space-x-2 text-[11px] text-neutral-400">
          <PhoneCall className="w-3 h-3 text-[#d4af37]" />
          <span>Need immediate assistance? Call <a href={`tel:${RESTAURANT_INFO.phone}`} className="text-[#d4af37] font-semibold hover:underline">{RESTAURANT_INFO.phone}</a></span>
        </div>
      </div>
    </div>
  );
};
