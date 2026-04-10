# Bookipy - Sistema de Reservas de Hotel 🏨

**Bookipy** es una solución full-stack robusta diseñada para la gestión digital de reservas hoteleras. El proyecto implementa una **Arquitectura Limpia** y el patrón de diseño **Facade** para desacoplar la lógica de negocio compleja de la capa de presentación.

---

## 👥 Equipo de Desarrollo
- **Backend Developer & Architect**: Gabriel Esteban Paz Guerrero
- **Frontend Developer**: Cristian Javier Velasco

---

## 🛠️ Tecnologías Utilizadas
- **Backend**: Java 21+ con **Spring Boot 3.4.1**.
- **Frontend**: React.js con TailwindCSS.
- **Despliegue**: 
  - Backend: **Railway / Render**
  - Frontend: **Vercel**
- **Gestión de Estado**: In-memory con Colecciones Concurrentes de Java.

---

## 🏗️ Implementación del Patrón Facade
El núcleo del sistema utiliza el patrón **Facade (Fachada)** para simplificar las interacciones entre la API REST y los procesos internos del hotel.

### ¿Cómo funciona en Bookipy?
1. **Punto Único de Entrada**: La clase `HotelFacade` expone métodos simplificados como `createReservation` o `performCheckOut`.
2. **Orquestador de Subsistemas**: Internamente, la fachada coordina 5 servicios especializados (servicios ocultos para el cliente):
   - **RoomService**: Control de 15 habitaciones (STANDARD, DOUBLE, SUITE).
   - **RateService**: Cálculo dinámico de precios (Temporada Alta x1.5 en Julio/Diciembre).
   - **AdditionalServiceService**: Gestión de extras (Spa, Desayuno por día, Traslados).
   - **AccessService**: Generación de llaves digitales mediante UUID.
   - **BillingService**: Cálculo de costes y generación de factura detallada.

Este diseño asegura que si un subsistema cambia (ej. la lógica de precios), el controlador de la API no se ve afectado.

---

## 🚀 Requisitos del "Caso de Estudio" (Taller)
El proyecto cumple estrictamente con las notas del taller:
- **Nota 1**: Desarrollo completo de Frontend y Backend.
- **Nota 2**: Listos para despliegue en entorno de Producción (Railway/Vercel).
- **Nota 3**: Desarrollo en equipo (Gabriel y Cristian).
- **Lógica de Negocio**: 
  - Gestión de 15 habitaciones predefinidas.
  - Tarifas dinámicas por temporada y tipo de estancia.
  - Facturación detallada con desglose de servicios adicionales.

---

## 📖 Instrucciones de API
Para más detalles sobre los endpoints y formatos JSON, consulte el archivo [**API_CONTRACT.md**](./API_CONTRACT.md).
