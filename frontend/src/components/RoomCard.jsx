import React from 'react';
import { motion } from 'framer-motion';
import { BedDouble, Check } from 'lucide-react';

const roomImages = {
  'STANDARD': 'https://images.unsplash.com/photo-1611892440504-42a78248a355?q=80&w=800',
  'DOUBLE': 'https://images.unsplash.com/photo-1590490360182-c33d57733427?q=80&w=800',
  'SUITE': 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?q=80&w=800'
};

const RoomCard = ({ room, onBook }) => {
  return (
    <motion.div 
      whileHover={{ y: -5 }}
      className="bg-brand-navy rounded-xl overflow-hidden border border-brand-teal/40 shadow-xl flex flex-col"
    >
      <div className="relative h-48 overflow-hidden">
        <img 
          src={roomImages[room.type] || roomImages['STANDARD']} 
          alt={room.type} 
          className="w-full h-full object-cover transition-transform duration-700 hover:scale-110"
        />
        <div className="absolute top-3 right-3 bg-brand-dark/80 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-semibold text-brand-gold border border-brand-gold/30">
          Room {room.number}
        </div>
      </div>
      
      <div className="p-5 flex flex-col flex-grow">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h3 className="text-xl font-bold text-white capitalize">{room.type.toLowerCase()} Room</h3>
            <p className="text-brand-teal text-sm flex items-center mt-1">
              <BedDouble size={14} className="mr-1" />
              Premium Comfort
            </p>
          </div>
          <div className="text-right">
            <span className="text-2xl font-black text-brand-accent">${room.basePrice.toFixed(2)}</span>
            <span className="text-xs text-gray-400 block">/ night</span>
          </div>
        </div>
        
        <ul className="text-sm text-gray-300 space-y-2 mb-6 flex-grow">
          <li className="flex items-center gap-2"><Check size={16} className="text-green-400" /> Free High-Speed WiFi</li>
          <li className="flex items-center gap-2"><Check size={16} className="text-green-400" /> Room Service Available</li>
          {room.type === 'SUITE' && <li className="flex items-center gap-2"><Check size={16} className="text-green-400" /> Ocean View & Minibar</li>}
        </ul>
        
        <button 
          onClick={() => onBook(room)}
          className="w-full py-3 rounded-lg bg-gradient-to-r from-brand-gold to-brand-accent text-brand-dark font-bold hover:shadow-[0_0_15px_rgba(245,158,11,0.5)] transition-all mt-auto tracking-wide"
        >
          Select Room
        </button>
      </div>
    </motion.div>
  );
};

export default RoomCard;
