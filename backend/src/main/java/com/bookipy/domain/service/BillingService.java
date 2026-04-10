package com.bookipy.domain.service;

import com.bookipy.application.dto.InvoiceDTO;
import com.bookipy.domain.model.Reservation;

public interface BillingService {
    InvoiceDTO generateInvoice(Reservation reservation);
}
