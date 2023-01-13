package com.example.constructionappapi.services.presentationLayer;

import com.example.constructionappapi.services.businessLogicLayer.repositories.CalendarColorRepository;
import com.example.constructionappapi.services.dataAccessLayer.entities.CalendarColorEntity;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

/**
 * API for chosen calendar colors. This is where the client/front-end and server communication is made possible.
 */
@RestController
@RequestMapping("/api/v1")
public class CalendarColorAPI {
    @Autowired
    private CalendarColorRepository calendarColorRepository;

    @PostMapping("/calendarcolor")
    public ResponseEntity<CalendarColorEntity> saveCalendarColor(@RequestBody CalendarColorEntity calendarColorEntity) {
        return calendarColorRepository.saveCalendarColor(calendarColorEntity);
    }

    @GetMapping("/calendarcolor")
    public ResponseEntity<CalendarColorEntity> getCalendarColor() {
        return calendarColorRepository.getColorEntity();
    }
}
