package com.bookipy.domain.service;

import java.math.BigDecimal;
import java.time.LocalDate;

public interface RateService {
    BigDecimal calculatePrice(Integer roomNumber, LocalDate start, LocalDate end);
}
