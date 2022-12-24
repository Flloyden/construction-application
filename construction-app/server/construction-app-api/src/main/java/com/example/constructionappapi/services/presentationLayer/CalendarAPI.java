package com.example.constructionappapi.services.presentationLayer;

import com.example.constructionappapi.services.businessLogicLayer.repositories.CalendarRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1")
public class CalendarAPI {
    @Autowired
    private CalendarRepository calendarRepository;

    @GetMapping(value = "/kalender/work",
            produces = "application/json")
    public String getAllWorkDates() {
        return calendarRepository.getAllWorkDates();
    }

    @GetMapping(value = "/kalender/semester",
            produces = "application/json")
    public String getAllvacationDates() {
        return calendarRepository.getAllVacationDates();
    }
}
