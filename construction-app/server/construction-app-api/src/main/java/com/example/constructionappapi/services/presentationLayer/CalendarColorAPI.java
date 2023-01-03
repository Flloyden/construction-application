package com.example.constructionappapi.services.presentationLayer;

import com.example.constructionappapi.services.businessLogicLayer.repositories.CalendarColorRepository;
import com.example.constructionappapi.services.dataAccessLayer.entities.CalendarColorEntity;
import com.example.constructionappapi.services.dataAccessLayer.entities.CalendarEntity;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

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

}
