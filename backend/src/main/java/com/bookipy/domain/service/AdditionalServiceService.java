package com.bookipy.domain.service;

import com.bookipy.domain.model.AdditionalServiceItem;
import java.util.List;

public interface AdditionalServiceService {
    void addServiceToReservation(String reservationId, String type);
    List<AdditionalServiceItem> getServicesByReservation(String reservationId);
}
