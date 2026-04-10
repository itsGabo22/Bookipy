package com.bookipy.domain.service;

import org.springframework.stereotype.Service;
import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.temporal.ChronoUnit;

@Service
public class RateServiceImpl implements RateService {

    @Override
    public BigDecimal calculatePrice(Integer roomNumber, LocalDate start, LocalDate end) {
        // Base price calculation (simplified)
        BigDecimal baseRate;
        if (roomNumber <= 105) baseRate = new BigDecimal("100.00");
        else if (roomNumber <= 110) baseRate = new BigDecimal("150.00");
        else baseRate = new BigDecimal("250.00");

        long days = ChronoUnit.DAYS.between(start, end);
        if (days <= 0) days = 1;

        BigDecimal multiplier = BigDecimal.ONE;
        
        // High Season logic: July (7) or December (12)
        if (start.getMonthValue() == 7 || start.getMonthValue() == 12) {
            multiplier = new BigDecimal("1.5");
        }

        return baseRate.multiply(new BigDecimal(days)).multiply(multiplier);
    }
}
