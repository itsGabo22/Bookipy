import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Calendar as CalendarIcon, User, Mail } from 'lucide-react';
import { HotelAPI } from '../services/api';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const ReservationModal = ({ isOpen, onClose, room, dates }) => {
  const [guestName, setGuestName] = useState('');
  const [guestEmail, setGuestEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  if (!isOpen || !room) return null;

  const handleBook = async (e) => {
    e.preventDefault();
    if (!guestName || !guestEmail) {
      toast.error("Please fill all fields");
      return;
    }
    
    setIsLoading(true);
    try {
      const res = await HotelAPI.createReservation(
        guestName, 
        guestEmail, 
        room.number, 
        dates.start, 
        dates.end
      );
      toast.success("Reservation confirmed!");
      // Save ID to simple local storage to simulate "logged in" guest
      localStorage.setItem('bookipy_reservation', res.id);
      onClose();
      navigate('/dashboard');
    } catch (err) {
      toast.error(err.message || 'Error creating reservation');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AnimatePresence>
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
      >
        <motion.div 
          initial={{ y: 50, scale: 0.9, opacity: 0 }}
          animate={{ y: 0, scale: 1, opacity: 1 }}
          exit={{ y: 50, scale: 0.9, opacity: 0 }}
          className="bg-brand-navy max-w-md w-full rounded-2xl shadow-2xl overflow-hidden border border-brand-teal/50 relative"
        >
          <div className="flex justify-between items-center p-6 border-b border-brand-teal/30">
            <h2 className="text-xl font-bold text-white">Complete Booking</h2>
            <button onClick={onClose} className="text-gray-400 hover:text-white transition-colors">
              <X size={24} />
            </button>
          </div>
          
          <div className="p-6">
            <div className="bg-brand-dark rounded-xl p-4 mb-6 border border-brand-teal/30 flex justify-between items-center">
              <div>
                <p className="text-sm text-gray-400 mb-1">Room {room.number} • {room.type}</p>
                <div className="flex items-center text-brand-gold text-sm gap-2">
                  <CalendarIcon size={14} />
                  <span>{dates.start} to {dates.end}</span>
                </div>
              </div>
              <div className="text-right">
                <span className="text-xl font-bold text-white">${room.basePrice.toFixed(2)}</span>
                <span className="text-xs text-gray-500 block">/night</span>
              </div>
            </div>

            <form onSubmit={handleBook} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">Full Name</label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
                  <input 
                    type="text" 
                    value={guestName}
                    onChange={(e) => setGuestName(e.target.value)}
                    className="w-full bg-brand-dark/50 border border-brand-teal/50 rounded-lg pl-10 pr-4 py-2.5 text-white focus:outline-none focus:ring-2 focus:ring-brand-accent transition-all placeholder-gray-500"
                    placeholder="John Doe"
                    required
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">Email Address</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
                  <input 
                    type="email" 
                    value={guestEmail}
                    onChange={(e) => setGuestEmail(e.target.value)}
                    className="w-full bg-brand-dark/50 border border-brand-teal/50 rounded-lg pl-10 pr-4 py-2.5 text-white focus:outline-none focus:ring-2 focus:ring-brand-accent transition-all placeholder-gray-500"
                    placeholder="john@example.com"
                    required
                  />
                </div>
              </div>
              
              <button 
                type="submit" 
                disabled={isLoading}
                className="w-full py-3 mt-4 rounded-lg bg-brand-accent text-brand-dark font-bold hover:bg-brand-gold transition-colors flex justify-center items-center gap-2 shadow-[0_0_10px_rgba(245,158,11,0.3)] hover:shadow-[0_0_20px_rgba(245,158,11,0.5)] disabled:opacity-70"
              >
                {isLoading ? 'Processing...' : 'Confirm Reservation'}
              </button>
            </form>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default ReservationModal;
