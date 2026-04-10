import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Search } from 'lucide-react';
import RoomCard from '../components/RoomCard';
import ReservationModal from '../components/ReservationModal';
import { HotelAPI } from '../services/api';
import toast from 'react-hot-toast';

const HomeView = () => {
  const [dates, setDates] = useState({ start: '', end: '' });
  const [roomType, setRoomType] = useState('ALL');
  const [rooms, setRooms] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);

  const [selectedRoom, setSelectedRoom] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const formatToday = () => {
      const d = new Date();
      return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`;
  };

  const todayStr = formatToday();

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!dates.start || !dates.end) {
      toast.error("Por favor selecciona fechas de entrada y salida");
      return;
    }
    if (new Date(dates.start) >= new Date(dates.end)) {
      toast.error("La fecha de salida debe ser después de la entrada");
      return;
    }

    setIsSearching(true);
    try {
      const results = await HotelAPI.getAvailability(dates.start, dates.end, roomType);
      setRooms(results);
      setHasSearched(true);
    } catch (err) {
      toast.error("Error al buscar disponibilidad");
    } finally {
      setIsSearching(false);
    }
  };

  const handleBookClick = (room) => {
    setSelectedRoom(room);
    setIsModalOpen(true);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Hero Section */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-16"
      >
        <h1 className="text-4xl md:text-6xl font-bold font-sans text-transparent bg-clip-text bg-gradient-to-r from-brand-gold to-white mb-4">
          Experiencia de Lujo Absoluto
        </h1>
        <p className="text-gray-400 text-lg max-w-2xl mx-auto">
          Descubre un santuario de elegancia. Encuentra disponibilidad para tus fechas y disfruta de comodidades de clase mundial.
        </p>
      </motion.div>

      {/* Search Bar */}
      <motion.form 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        onSubmit={handleSearch}
        className="bg-brand-navy p-6 rounded-2xl shadow-2xl border border-brand-teal/30 mb-16 max-w-4xl mx-auto flex flex-col md:flex-row gap-4 items-end"
      >
        <div className="flex-1 w-full">
          <label className="block text-sm text-gray-400 mb-2 font-medium">Entrada</label>
          <input 
            type="date" 
            min={todayStr}
            value={dates.start}
            onChange={e => setDates({ ...dates, start: e.target.value })}
            className="w-full bg-brand-dark text-white border border-brand-teal/50 rounded-lg px-4 py-3 focus:outline-none focus:border-brand-accent transition-colors block"
          />
        </div>
        <div className="flex-1 w-full">
          <label className="block text-sm text-gray-400 mb-2 font-medium">Salida</label>
          <input 
            type="date" 
            min={dates.start || todayStr}
            value={dates.end}
            onChange={e => setDates({ ...dates, end: e.target.value })}
            className="w-full bg-brand-dark text-white border border-brand-teal/50 rounded-lg px-4 py-3 focus:outline-none focus:border-brand-accent transition-colors block"
          />
        </div>
        <div className="flex-1 w-full">
          <label className="block text-sm text-gray-400 mb-2 font-medium">Tipo de Habitación</label>
          <select 
            value={roomType}
            onChange={e => setRoomType(e.target.value)}
            className="w-full bg-brand-dark text-white border border-brand-teal/50 rounded-lg px-4 py-3 focus:outline-none focus:border-brand-accent transition-colors appearance-none block"
          >
            <option value="ALL">Todos los Tipos</option>
            <option value="STANDARD">Estándar</option>
            <option value="DOUBLE">Doble</option>
            <option value="SUITE">Suite</option>
          </select>
        </div>
        <div className="w-full md:w-auto">
          <button 
            type="submit" 
            disabled={isSearching}
            className="w-full md:w-auto px-8 py-3 bg-brand-accent hover:bg-brand-gold text-brand-dark font-bold rounded-lg transition-all flex items-center justify-center gap-2 shadow-[0_0_15px_rgba(245,158,11,0.3)] disabled:opacity-70"
          >
            <Search size={20} />
            {isSearching ? 'Buscando...' : 'Explorar'}
          </button>
        </div>
      </motion.form>

      {/* Results */}
      {hasSearched && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <h2 className="text-2xl font-bold text-white mb-8 border-l-4 border-brand-gold pl-3">
            Habitaciones Disponibles
          </h2>
          
          {rooms.filter(r => r.isAvailable).length === 0 ? (
            <div className="text-center py-16 bg-brand-navy rounded-xl border border-brand-teal/20">
              <p className="text-gray-400 text-lg">No hay habitaciones disponibles para las fechas y criterios indicados.</p>
              <button 
                 onClick={() => setDates({ start: '', end: ''})}
                 className="mt-4 text-brand-accent underline hover:text-brand-gold transition cursor-pointer"
              >
                 Intentar fechas diferentes
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {rooms.filter(r => r.isAvailable).map((room, idx) => (
                <RoomCard 
                  key={idx} 
                  room={room} 
                  onBook={handleBookClick} 
                />
              ))}
            </div>
          )}
        </motion.div>
      )}

      {/* Reservation Modal */}
      <ReservationModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        room={selectedRoom} 
        dates={dates} 
      />
    </div>
  );
};

export default HomeView;
