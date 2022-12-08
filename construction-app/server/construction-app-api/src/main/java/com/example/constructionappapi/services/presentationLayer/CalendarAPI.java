package com.example.constructionappapi.services.presentationLayer;

import com.example.constructionappapi.services.businessLogicLayer.Calendar;
import com.example.constructionappapi.services.businessLogicLayer.repositories.CalendarRepository;
import com.example.constructionappapi.services.dataAccessLayer.entities.CalendarEntity;
import com.example.constructionappapi.services.dataAccessLayer.entities.WorkEntity;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@CrossOrigin(origins = "http://localhost:3000")
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

    @GetMapping("/kalender/ongoing")
    public Object[] getOngoingWork()
    {
        Object[] obj = new Object[2];
        CalendarEntity calendarEntity = calendarRepository.findFirstByDate(LocalDate.now());
        WorkEntity workEntity = calendarEntity.getWork();
        obj[0] = calendarEntity;
        obj[1] = workEntity;
        return obj;
    }

    @GetMapping("/kalendar/upcoming")
    public List<Object[]> getUpcomingWork()
    {
       LocalDate today = LocalDate.now();
       today = today.plusDays(1);
       LocalDate thirtyDaysForward = today.plusDays(30);
        List<CalendarEntity> calendarEntityList = calendarRepository.findByDateBetween(today,thirtyDaysForward);

       List<Object[]> objList = new ArrayList<>();

        for (CalendarEntity calendar : calendarEntityList) {
            Object[] obj = new Object[2];
            obj[0] = calendar;
            obj[1] = calendar.getWork();
            objList.add(obj);
        }
        return objList;
    }
}
