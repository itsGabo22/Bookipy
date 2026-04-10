# Bookipy API Contract (Frontend documentation)

This document contains the specifications for Cristian to connect the React Frontend with the Spring Boot Backend.

**Base URL (Local):** `http://localhost:8080/api/hotel`  
**Base URL (Prod):** `[Your-Render-URL]/api/hotel`

---

## 1. Availability Search
Used to find rooms between two dates.
- **Endpoint:** `GET /disponibilidad`
- **Query Params:**
  - `start`: (Date, ISO: YYYY-MM-DD)
  - `end`: (Date, ISO: YYYY-MM-DD)
- **Response (200 OK):**
```json
[
  {
    "number": 101,
    "type": "STANDARD",
    "basePrice": 100.0,
    "isAvailable": true
  },
  {
    "number": 305,
    "type": "SUITE",
    "basePrice": 250.0,
    "isAvailable": true
  }
]
```

---

## 2. Create Reservation
- **Endpoint:** `POST /reservar`
- **Request Body (JSON):**
```json
{
  "guestName": "Cristian Garcia",
  "guestEmail": "cristian@example.com",
  "roomNumber": 101,
  "checkInDate": "2024-12-01",
  "checkOutDate": "2024-12-05"
}
```
- **Response (200 OK):** Returns the full `Reservation` object with its unique `id`.

---

## 3. Operations with Reservation ID
The following operations require the `id` obtained in the step above.

### A. View Reservation Details
- **Endpoint:** `GET /reserva/{id}`
- **Response (200 OK):** The complete reservation object.

### B. Perform Check-In
- **Endpoint:** `PUT /checkin/{id}`
- **Response (200 OK):** A String containing the **Digital Key** (e.g., `"BK-A1B2C3D4"`).

### C. Add Additional Services
- **Endpoint:** `POST /servicios/{id}`
- **Query Params:**
  - `tipoServicio`: (String - Choose from: `SPA`, `BREAKFAST`, `TRANSFER`)
- **Response (200 OK):** No body.
- **Prices:** Spa ($50), Breakfast ($15), Transfer ($30).

### D. Perform Check-Out (Final Bill)
- **Endpoint:** `PUT /checkout/{id}`
- **Response (200 OK):** Final Invoice JSON.
```json
{
  "reservationId": "abc-123",
  "guestName": "Cristian Garcia",
  "roomNumber": 101,
  "details": ["Room 101 (4 nights): $600.00", "Spa Service: $50.00"],
  "total": 650.0
}
```

---

## Business Rules for Cristian to know:
1. **Dynamic Rates:** Prices automatically increase by **1.5x** during July or December (Calculated by Backend).
2. **Room Numbers:** 101-115.
3. **Room Types:** 101-105 (Standard), 106-110 (Double), 111-115 (Suite).
