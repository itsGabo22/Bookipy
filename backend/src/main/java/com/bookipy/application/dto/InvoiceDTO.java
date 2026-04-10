package com.bookipy.application.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class InvoiceDTO {
    private String reservationId;
    private String guestName;
    private Integer roomNumber;
    private List<String> details;
    private BigDecimal total;
}
