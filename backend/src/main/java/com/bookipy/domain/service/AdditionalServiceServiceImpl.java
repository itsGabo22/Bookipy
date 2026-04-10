package com.bookipy.domain.service;

import com.bookipy.domain.model.AdditionalServiceItem;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

@Service
public class AdditionalServiceServiceImpl implements AdditionalServiceService {

    // Store services per reservation ID in memory
    private final Map<String, List<AdditionalServiceItem>> reservationServices = new ConcurrentHashMap<>();

    @Override
    public void addServiceToReservation(String reservationId, String type) {
        BigDecimal price = switch (type.toUpperCase()) {
            case "SPA" -> new BigDecimal("50.00");
            case "BREAKFAST" -> new BigDecimal("15.00");
            case "TRANSFER" -> new BigDecimal("30.00");
            default -> BigDecimal.ZERO;
        };

        reservationServices.computeIfAbsent(reservationId, k -> new ArrayList<>())
                .add(new AdditionalServiceItem(type, price));
    }

    @Override
    public List<AdditionalServiceItem> getServicesByReservation(String reservationId) {
        return reservationServices.getOrDefault(reservationId, new ArrayList<>());
    }
}
