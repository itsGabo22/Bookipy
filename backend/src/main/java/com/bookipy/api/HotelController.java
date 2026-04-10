package com.bookipy.api;

import com.bookipy.application.HotelFacade;
import com.bookipy.application.dto.InvoiceDTO;
import com.bookipy.application.dto.ReservationDTO;
import com.bookipy.domain.model.Reservation;
import com.bookipy.domain.service.RoomService;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;

@RestController
@RequestMapping("/api/hotel")
@CrossOrigin(origins = "*") // Para facilitar el desarrollo con React
public class HotelController {

    private final HotelFacade hotelFacade;
    private final RoomService roomService;

    // Manual constructor for Dependency Injection
    public HotelController(HotelFacade hotelFacade, RoomService roomService) {
        this.hotelFacade = hotelFacade;
        this.roomService = roomService;
    }

    @PostMapping("/reservar")
    public ResponseEntity<Reservation> reservar(@RequestBody ReservationDTO dto) {
        return ResponseEntity.ok(hotelFacade.createReservation(dto));
    }

    @GetMapping("/disponibilidad")
    public ResponseEntity<?> consultarDisponibilidad(
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate start,
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate end,
            @RequestParam(required = false) String type) {
        return ResponseEntity.ok(roomService.getAvailableRooms(start, end, type));
    }

    @PostMapping("/servicios/{reservaId}")
    public ResponseEntity<Void> agregarServicio(
            @PathVariable String reservaId,
            @RequestParam String tipoService) {
        hotelFacade.addService(reservaId, tipoService);
        return ResponseEntity.ok().build();
    }

    @PutMapping("/checkin/{reservaId}")
    public ResponseEntity<String> realizarCheckIn(@PathVariable String reservaId) {
        return ResponseEntity.ok(hotelFacade.performCheckIn(reservaId));
    }

    @PutMapping("/checkout/{reservaId}")
    public ResponseEntity<InvoiceDTO> realizarCheckOut(@PathVariable String reservaId) {
        return ResponseEntity.ok(hotelFacade.performCheckOut(reservaId));
    }

    @GetMapping("/reserva/{reservaId}")
    public ResponseEntity<Reservation> consultarReserva(@PathVariable String reservaId) {
        return ResponseEntity.ok(hotelFacade.getReservation(reservaId));
    }
}
