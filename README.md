# Bookipy - Hotel Reservation System

Bookipy is a high-performance, in-memory hotel reservation system built with **Spring Boot** and **React**. It utilizes the **Facade Pattern** to encapsulate complex internal hotel logic into a unified interface.

## Architecture: Facade Pattern

The system is designed to hide the complexity of multiple subsystems behind a single `HotelFacade`. This ensures the controller remains lean and focused on handling HTTP requests.

### Subsystems Orchestrated by HotelFacade:
1.  **RoomService**: Manages 15 in-memory rooms.
2.  **RateService**: Calculates dynamic pricing based on season (High/Low).
3.  **AdditionalServiceService**: Handles extras (Spa, Breakfast, Transfers).
4.  **BillingService**: Generates detailed invoices.
5.  **AccessService**: Generates digital keys using UUIDs.

---

## Team Workflow (2-Hour Sprint)

To complete this project in under 2 hours, we will divide the work between **Cristian** and **Gabriel**.

### Phase 1: Backend Core (45 Minutes)
- **Cristian**:
    - Implement `RoomService` and `RateService`.
    - Implement `AdditionalServiceService` and `BillingService`.
    - Define Domain Models (`Room`, `Reservation`, `Invoice`).
- **Gabriel**:
    - Implement `HotelFacade`.
    - Implement `AccessService`.
    - Set up the Spring Boot structure and DTOs.

### Phase 2: REST API & Backend Refinement (30 Minutes)
- **Cristian**: Unit testing of business logic in services.
- **Gabriel**: Implement `HotelController` and expose all REST Endpoints.

### Phase 3: Frontend Development (45 Minutes)
- **Cristian**: Dashboard component and Reservation Management (Check-in/out).
- **Gabriel**: Search functionality, Room List, and Booking Form.
- **Integration**: Final testing of the end-to-end flow.

---

## Technology Stack
- **Backend**: Java 17, Spring Boot 3.x (Web, Lombok).
- **Frontend**: React, TailwindCSS, Vite.
- **Deployment**: Render (Backend), Vercel (Frontend).

## Project Structure
```text
Bookipy/
├── backend/
│   ├── src/main/java/com/bookipy/
│   │   ├── api/            # Controllers
│   │   ├── application/    # HotelFacade, DTOs
│   │   ├── domain/
│   │   │   ├── model/      # Entities
│   │   │   └── service/    # Subsystems (5 services)
│   │   └── BookipyApplication.java
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   └── App.jsx
└── README.md
```
