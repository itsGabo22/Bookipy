package com.bookipy.application;

import com.bookipy.application.dto.InvoiceDTO;
import com.bookipy.application.dto.ReservationDTO;
import com.bookipy.domain.model.Reservation;
import com.bookipy.domain.service.*;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.Map;
import java.util.UUID;
import java.util.concurrent.ConcurrentHashMap;

@Component
@RequiredArgsConstructor
public class HotelFacadeImpl implements HotelFacade {

    private final RoomService roomService;
    private final RateService rateService;
    private final AdditionalServiceService additionalServiceService;
    private final BillingService billingService;
    private final AccessService accessService;

    // In-memory "Database" for the purpose of the exercise
    private final Map<String, Reservation> reservations = new ConcurrentHashMap<>();

    @Override
    public Reservation createReservation(ReservationDTO dto) {
        if (!roomService.isRoomAvailable(dto.getRoomNumber())) {
            throw new RuntimeException("Room not available");
        }

        BigDecimal totalPrice = rateService.calculatePrice(dto.getRoomNumber(), dto.getCheckInDate(), dto.getCheckOutDate());
        
        String id = UUID.randomUUID().toString().substring(0, 8);
        Reservation reservation = Reservation.builder()
                .id(id)
                .guestName(dto.getGuestName())
                .guestEmail(dto.getGuestEmail())
                .roomNumber(dto.getRoomNumber())
                .checkInDate(dto.getCheckInDate())
                .checkOutDate(dto.getCheckOutDate())
                .isActive(true)
                .checkedIn(false)
                .checkedOut(false)
                .totalPrice(totalPrice)
                .extraServices(new ArrayList<>())
                .build();

        roomService.reserveRoom(dto.getRoomNumber());
        reservations.put(id, reservation);
        return reservation;
    }

    @Override
    public void addService(String reservationId, String serviceType) {
        Reservation reservation = getReservation(reservationId);
        if (reservation.isCheckedOut()) {
            throw new RuntimeException("Cannot add services to a checked-out reservation");
        }
        additionalServiceService.addServiceToReservation(reservationId, serviceType);
    }

    @Override
    public String performCheckIn(String reservationId) {
        Reservation reservation = getReservation(reservationId);
        if (reservation.isCheckedIn()) {
            throw new RuntimeException("Already checked in");
        }
        
        String key = accessService.generateDigitalKey();
        reservation.setCheckedIn(true);
        reservation.setDigitalKey(key);
        return key;
    }

    @Override
    public InvoiceDTO performCheckOut(String reservationId) {
        Reservation reservation = getReservation(reservationId);
        if (!reservation.isCheckedIn()) {
            throw new RuntimeException("Cannot check out without check-in");
        }
        if (reservation.isCheckedOut()) {
            throw new RuntimeException("Already checked out");
        }

        // Add additional services to the model before generating invoice
        reservation.setExtraServices(additionalServiceService.getServicesByReservation(reservationId));
        
        InvoiceDTO invoice = billingService.generateInvoice(reservation);
        
        reservation.setCheckedOut(true);
        reservation.setActive(false);
        roomService.releaseRoom(reservation.getRoomNumber());
        
        return invoice;
    }

    @Override
    public Reservation getReservation(String reservationId) {
        Reservation reservation = reservations.get(reservationId);
        if (reservation == null) {
            throw new RuntimeException("Reservation not found: " + reservationId);
        }
        return reservation;
    }
}
