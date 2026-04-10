const BASE_URL = 'http://localhost:8080/api/hotel';

export const HotelAPI = {
  getAvailability: async (start, end, type = '') => {
    let url = `${BASE_URL}/disponibilidad?start=${start}&end=${end}`;
    if (type && type !== 'ALL') url += `&type=${type}`;
    const res = await fetch(url);
    if (!res.ok) throw new Error("Failed to fetch availability");
    return res.json();
  },
  
  createReservation: async (guestName, guestEmail, roomNumber, checkInDate, checkOutDate) => {
    const res = await fetch(`${BASE_URL}/reservar`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ guestName, guestEmail, roomNumber, checkInDate, checkOutDate })
    });
    if (!res.ok) throw new Error("Failed to create reservation");
    return res.json();
  },
  
  getReservation: async (id) => {
    const res = await fetch(`${BASE_URL}/reserva/${id}`);
    if (!res.ok) throw new Error("Reservation not found");
    return res.json();
  },
  
  checkIn: async (id) => {
    const res = await fetch(`${BASE_URL}/checkin/${id}`, { method: 'PUT' });
    if (!res.ok) throw new Error("Check-in failed");
    return res.text();
  },
  
  addService: async (id, tipoServicio) => {
    const res = await fetch(`${BASE_URL}/servicios/${id}?tipoServicio=${tipoServicio}`, { method: 'POST' });
    if (!res.ok) throw new Error("Failed to add service");
    return true;
  },
  
  checkOut: async (id) => {
    const res = await fetch(`${BASE_URL}/checkout/${id}`, { method: 'PUT' });
    if (!res.ok) throw new Error("Check-out failed");
    return res.json();
  }
};
