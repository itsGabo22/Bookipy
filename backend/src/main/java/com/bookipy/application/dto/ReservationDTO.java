package com.bookipy.application.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ReservationDTO {
    private String guestName;
    private String guestEmail;
    private Integer roomNumber;
    private LocalDate checkInDate;
    private LocalDate checkOutDate;
}
