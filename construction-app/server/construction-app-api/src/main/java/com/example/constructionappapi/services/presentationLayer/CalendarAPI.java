package com.example.constructionappapi.services.presentationLayer;

import com.example.constructionappapi.services.businessLogicLayer.repositories.CalendarRepository;
import com.example.constructionappapi.services.presentationLayer.bodies.VacationCalendarInformation;
import com.example.constructionappapi.services.presentationLayer.bodies.WorkCalendarInformation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/v1")
public class CalendarAPI {
    @Autowired
    private CalendarRepository calendarRepository;

    @GetMapping(value = "/calendar/work",
            produces = "application/json")
    public ResponseEntity<List<WorkCalendarInformation>> getAllWorkDates() {
        return ResponseEntity.ok().body(calendarRepository.getAllWorkDates());
    }

    @GetMapping(value = "/calendar/vacation",
            produces = "application/json")
    public ResponseEntity<List<VacationCalendarInformation>> getAllvacationDates() {
        return ResponseEntity.ok().body(calendarRepository.getAllVacationDates());
    }
}
