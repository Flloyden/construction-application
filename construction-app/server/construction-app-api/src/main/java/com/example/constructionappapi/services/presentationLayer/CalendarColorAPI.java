package com.example.constructionappapi.services.presentationLayer;

import com.example.constructionappapi.services.businessLogicLayer.repositories.CalendarColorRepository;
import com.example.constructionappapi.services.dataAccessLayer.entities.CalendarColorEntity;
import com.example.constructionappapi.services.dataAccessLayer.entities.CalendarEntity;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1")
public class CalendarColorAPI {
    @Autowired
    private CalendarColorRepository calendarColorRepository;

    @PostMapping("/calendarcolor")
    public ResponseEntity<CalendarColorEntity> createCalendarColor(@RequestBody CalendarColorEntity calendarColorEntity)
    {
        return calendarColorRepository.createCalendarcolor(calendarColorEntity);
    }

    @GetMapping("/calendarcolor")
    public ResponseEntity<CalendarColorEntity> getCalendarColor()
    {
        return calendarColorRepository.getColorEntity();
    }
}
