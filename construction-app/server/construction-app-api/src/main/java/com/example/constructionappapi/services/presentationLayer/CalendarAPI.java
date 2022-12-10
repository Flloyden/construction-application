package com.example.constructionappapi.services.presentationLayer;

import com.example.constructionappapi.services.businessLogicLayer.Calendar;
import com.example.constructionappapi.services.businessLogicLayer.repositories.CalendarRepository;
import com.example.constructionappapi.services.dataAccessLayer.entities.CalendarEntity;
import com.example.constructionappapi.services.dataAccessLayer.entities.WorkEntity;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.SerializationFeature;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.time.DayOfWeek;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

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
    public Optional<CalendarEntity> getOngoingWork()
    {
        CalendarEntity ongoingWork;
        LocalDate date = LocalDate.now();
        DayOfWeek day = date.getDayOfWeek();
        if (day == DayOfWeek.SATURDAY ) {
            Optional<CalendarEntity> calendarEntity = calendarRepository.findFirstByDate(LocalDate.now().minusDays(-1));
            if (calendarEntity.isPresent())
            {
                return calendarEntity;
            }
        } else if (day == DayOfWeek.SUNDAY ){
            Optional<CalendarEntity> calendarEntity = calendarRepository.findFirstByDate(LocalDate.now().minusDays(-2));
            if (calendarEntity.isPresent())
            {
                return calendarEntity;
            }
        } else {
            Optional<CalendarEntity> calendarEntity = calendarRepository.findFirstByDate(LocalDate.now());
            if (calendarEntity.isPresent())
            {
                return calendarEntity;
            }
        }
        return Optional.empty();
    }

    @GetMapping("/kalendar/upcoming")
    public List<Object[]> getUpcomingWork()
    {
        ObjectMapper objectMapper = new ObjectMapper();
        objectMapper.configure(SerializationFeature.FAIL_ON_EMPTY_BEANS, false);

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
