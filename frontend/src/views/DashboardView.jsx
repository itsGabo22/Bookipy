import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { HotelAPI } from '../services/api';
import toast from 'react-hot-toast';
import { Key, LogOut, Coffee, Droplets, Car, Receipt, CreditCard } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const EXTRA_SERVICES = [
  { id: 'SPA', name: 'Pase de Spa', icon: Droplets, price: 50 },
  { id: 'BREAKFAST', name: 'Desayuno (por día)', icon: Coffee, price: 15 },
  { id: 'TRANSFER', name: 'Traslado al Aeropuerto', icon: Car, price: 30 }
];

const DashboardView = () => {
  const [reservationId, setReservationId] = useState(localStorage.getItem('bookipy_reservation'));
  const [reservation, setReservation] = useState(null);
  const [digitalKey, setDigitalKey] = useState('');
  const [bill, setBill] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const fetchReservation = async () => {
    if (!reservationId) return;
    setIsLoading(true);
    try {
      const data = await HotelAPI.getReservation(reservationId);
      setReservation(data);
    } catch (err) {
      toast.error('No se pudo cargar la reservación.');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchReservation();
  }, [reservationId]);

  const handleCheckIn = async () => {
    try {
      const key = await HotelAPI.checkIn(reservationId);
      setDigitalKey(key);
      toast.success('¡Check-in exitoso! Llave Digital generada.');
      fetchReservation();
    } catch (err) {
      toast.error(err.message || 'Error en Check-in');
    }
  };

  const handleAddService = async (serviceId) => {
    try {
      await HotelAPI.addService(reservationId, serviceId);
      toast.success('Servicio agregado exitosamente');
      fetchReservation();
    } catch (err) {
      toast.error(err.message || 'Error al agregar servicio');
    }
  };

  const handleCheckOut = async () => {
    try {
      const invoice = await HotelAPI.checkOut(reservationId);
      setBill(invoice);
      toast.success('¡Check-out exitoso!');
      setDigitalKey('');
      localStorage.removeItem('bookipy_reservation');
    } catch (err) {
      toast.error(err.message || 'Error en Check-out');
    }
  };

  const handleLoadDemo = () => {
      const input = prompt("Ingresa tu ID de Reservación:");
      if (input) {
          localStorage.setItem('bookipy_reservation', input);
          setReservationId(input);
      }
  };

  if (!reservationId && !bill) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center flex flex-col items-center">
        <div className="bg-brand-navy border border-brand-teal/30 p-12 rounded-2xl shadow-xl max-w-xl w-full">
            <h2 className="text-3xl font-bold text-white mb-6">No hay Reservación Activa</h2>
            <p className="text-gray-400 mb-8">No tienes ninguna reservación vinculada a este dispositivo.</p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
                <button 
                onClick={() => navigate('/')}
                className="px-6 py-3 bg-brand-accent text-brand-dark font-bold rounded-lg hover:bg-brand-gold transition"
                >
                Reservar Habitación
                </button>
                <button 
                onClick={handleLoadDemo}
                className="px-6 py-3 bg-transparent border border-brand-teal text-white font-bold rounded-lg hover:bg-brand-teal/20 transition"
                >
                Ingresar ID existente
                </button>
            </div>
        </div>
      </div>
    );
  }

  if (isLoading && !reservation) {
      return (
          <div className="flex justify-center items-center py-32">
              <div className="w-12 h-12 border-4 border-brand-teal/30 border-t-brand-accent rounded-full animate-spin"></div>
          </div>
      );
  }

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <motion.div
         initial={{ opacity: 0, y: 20 }}
         animate={{ opacity: 1, y: 0 }}
      >
          <div className="flex justify-between items-end mb-8">
              <div>
                  <h1 className="text-3xl font-bold text-white mb-2">Panel del Huésped</h1>
                  <p className="text-brand-gold font-medium">Bienvenido(a), {reservation?.guestName || 'Invitado'}</p>
              </div>
              {reservation && (
                  <div className="text-right border border-brand-teal/50 bg-brand-navy rounded-lg px-4 py-2">
                       <p className="text-xs text-gray-400">ID de Reservación</p>
                       <p className="font-mono text-sm text-white break-all max-w-[150px] sm:max-w-xs">{reservation.id}</p>
                  </div>
              )}
          </div>

          {bill ? (
            <motion.div 
               initial={{ scale: 0.9, opacity: 0 }}
               animate={{ scale: 1, opacity: 1 }}
               className="bg-brand-navy rounded-2xl border border-brand-accent/50 p-8 shadow-2xl relative overflow-hidden"
            >
                <div className="absolute top-0 right-0 p-8 opacity-10">
                    <Receipt size={120} />
                </div>
                <h2 className="text-2xl font-bold text-white mb-6 border-b border-brand-teal/30 pb-4">Factura Final</h2>
                
                <div className="mb-6 space-y-2 relative z-10">
                    {bill.details?.map((detail, idx) => {
                        const parts = detail.split(':');
                        return (
                            <div key={idx} className="flex justify-between text-gray-300 items-center p-3 bg-brand-dark rounded-xl border border-brand-teal/20">
                                <span className="flex items-center gap-2">
                                    <CreditCard size={16} className="text-brand-gold"/>
                                    {parts[0]}
                                </span>
                                <span className="font-mono text-white text-right">{parts[1]}</span>
                            </div>
                        )
                    })}
                </div>
                
                <div className="flex justify-between items-center pt-4 border-t border-brand-teal/30 mt-6 relative z-10">
                    <span className="text-xl text-gray-400">Monto Total</span>
                    <span className="text-3xl font-bold text-brand-accent">${bill.total?.toFixed(2)}</span>
                </div>

                <div className="mt-8 text-center bg-green-500/10 text-green-400 py-4 rounded-lg border border-green-500/20 font-medium tracking-wide">
                    ¡Gracias por tu estadía!
                </div>
                
                <div className="text-center mt-6">
                    <button onClick={() => setBill(null)} className="text-gray-400 hover:text-white underline text-sm transition-colors">
                        Volver al Inicio
                    </button>
                </div>
            </motion.div>
          ) : (
             reservation && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {/* Left Column: Room & Status */}
                  <div className="space-y-8">
                      <div className="bg-brand-navy rounded-2xl border border-brand-teal/30 p-6 shadow-xl">
                          <h2 className="text-lg font-bold text-white mb-6 border-l-4 border-brand-accent pl-3">Detalles de tu Estadía</h2>
                          
                          <div className="grid grid-cols-2 gap-4 mb-6">
                              <div className="bg-brand-dark p-4 rounded-xl border border-brand-teal/10">
                                  <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">Entrada</p>
                                  <p className="text-white font-medium">{reservation.checkInDate}</p>
                              </div>
                              <div className="bg-brand-dark p-4 rounded-xl border border-brand-teal/10">
                                  <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">Salida</p>
                                  <p className="text-white font-medium">{reservation.checkOutDate}</p>
                              </div>
                          </div>

                          <div className="flex items-center justify-between p-4 bg-brand-dark rounded-xl mb-6">
                              <span className="text-gray-400">Número de Habitación</span>
                              <span className="text-2xl font-bold text-brand-gold">{reservation.room?.number || reservation.roomNumber}</span>
                          </div>

                          <div className="mt-8 p-6 bg-gradient-to-br from-brand-dark to-[#151D33] rounded-xl border border-brand-teal/40">
                              <div className="flex items-center justify-between mb-4">
                                  <h3 className="font-bold text-white flex items-center gap-2">
                                      <Key className="text-brand-gold" /> Llave Digital
                                  </h3>
                                  <span className={`text-xs px-2 py-1 rounded-full ${digitalKey ? 'bg-green-500/20 text-green-400 border border-green-500/30' : 'bg-gray-700/50 text-gray-400 border border-gray-600'}`}>
                                      {digitalKey ? 'Activa' : 'Pendiente de Check-in'}
                                  </span>
                              </div>
                              
                              {digitalKey ? (
                                  <div className="text-center p-5 bg-black/40 rounded-xl border border-brand-gold/40 shadow-inner">
                                      <p className="font-mono text-2xl text-brand-accent tracking-[0.2em]">{digitalKey}</p>
                                  </div>
                              ) : (
                                  <button 
                                      onClick={handleCheckIn}
                                      className="w-full py-3 bg-brand-teal hover:bg-[#4a6485] text-white font-bold rounded-lg transition-colors flex justify-center items-center gap-2"
                                  >
                                      Realizar Check-In
                                  </button>
                              )}
                          </div>
                      </div>
                      
                      <button 
                          onClick={handleCheckOut}
                          className="w-full py-4 bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/30 font-bold rounded-xl transition flex items-center justify-center gap-2 hover:shadow-[0_0_15px_rgba(239,68,68,0.2)]"
                      >
                          <LogOut size={20} /> Realizar Check-Out
                      </button>
                  </div>

                  {/* Right Column: Extra Services */}
                  <div className="bg-brand-navy rounded-2xl border border-brand-teal/30 p-6 shadow-xl h-fit">
                      <h2 className="text-lg font-bold text-white mb-2 border-l-4 border-emerald-400 pl-3">Servicios Extra</h2>
                      <p className="text-sm text-gray-400 mb-6">Mejora tu estadía. Los servicios se agregarán a tu factura final.</p>

                      <div className="space-y-4">
                          {EXTRA_SERVICES.map((service) => {
                              const Icon = service.icon;
                              return (
                                  <div key={service.id} className="flex items-center justify-between p-4 bg-brand-dark rounded-xl border border-brand-teal/20 transition hover:border-brand-gold/30">
                                      <div className="flex items-center gap-4">
                                          <div className="w-10 h-10 rounded-full bg-brand-teal/20 flex items-center justify-center text-brand-accent">
                                              <Icon size={20} />
                                          </div>
                                          <div>
                                              <p className="text-white font-medium">{service.name}</p>
                                              <p className="text-sm text-brand-accent">+${service.price}</p>
                                          </div>
                                      </div>
                                      <button 
                                          onClick={() => handleAddService(service.id)}
                                          className="text-xs px-4 py-2 bg-brand-teal hover:bg-brand-gold text-white hover:text-brand-dark rounded-lg font-bold transition-colors"
                                      >
                                          Solicitar
                                      </button>
                                  </div>
                              )
                          })}
                      </div>
                  </div>
              </div>
             )
          )}
      </motion.div>
    </div>
  );
};

export default DashboardView;
