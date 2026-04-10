package com.bookipy.application;

import com.bookipy.application.dto.InvoiceDTO;
import com.bookipy.application.dto.ReservationDTO;
import com.bookipy.domain.model.Reservation;

public interface HotelFacade {
    Reservation createReservation(ReservationDTO dto);
    void addService(String reservationId, String serviceType);
    String performCheckIn(String reservationId);
    InvoiceDTO performCheckOut(String reservationId);
    Reservation getReservation(String reservationId);
}
