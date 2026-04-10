package com.bookipy.domain.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Reservation {
    private String id;
    private String guestName;
    private String guestEmail;
    private Integer roomNumber;
    private LocalDate checkInDate;
    private LocalDate checkOutDate;
    private boolean isActive;
    private boolean checkedIn;
    private boolean checkedOut;
    private String digitalKey;
    private List<AdditionalServiceItem> extraServices;
    private BigDecimal totalPrice;
}
