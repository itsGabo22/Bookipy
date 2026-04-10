package com.bookipy.domain.service;

import com.bookipy.application.dto.InvoiceDTO;
import com.bookipy.domain.model.AdditionalServiceItem;
import com.bookipy.domain.model.Reservation;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.time.temporal.ChronoUnit;
import java.util.ArrayList;
import java.util.List;

@Service
public class BillingServiceImpl implements BillingService {

    @Override
    public InvoiceDTO generateInvoice(Reservation reservation) {
        List<String> details = new ArrayList<>();
        BigDecimal total = reservation.getTotalPrice(); // Room base total calculated at booking

        details.add("Reserva ID: " + reservation.getId());
        details.add("Habitación: " + reservation.getRoomNumber());
        details.add("Check-in: " + reservation.getCheckInDate());
        details.add("Check-out: " + reservation.getCheckOutDate());
        details.add("Subtotal Habitación: $" + reservation.getTotalPrice());

        if (reservation.getExtraServices() != null && !reservation.getExtraServices().isEmpty()) {
            details.add("--- Servicios Adicionales ---");
            long nights = ChronoUnit.DAYS.between(reservation.getCheckInDate(), reservation.getCheckOutDate());
            if (nights <= 0) nights = 1;

            for (AdditionalServiceItem service : reservation.getExtraServices()) {
                BigDecimal servicePrice = service.getPrice();
                String detailLine = service.getType() + ": $" + servicePrice;
                
                // Requirement: Breakfast is $15/day (per night)
                if (service.getType().equalsIgnoreCase("BREAKFAST")) {
                    servicePrice = servicePrice.multiply(new BigDecimal(nights));
                    detailLine = service.getType() + " (" + nights + " días): $" + servicePrice;
                }
                
                details.add(detailLine);
                total = total.add(servicePrice);
            }
        }

        return new InvoiceDTO(
                reservation.getId(),
                reservation.getGuestName(),
                reservation.getRoomNumber(),
                details,
                total
        );
    }
}
