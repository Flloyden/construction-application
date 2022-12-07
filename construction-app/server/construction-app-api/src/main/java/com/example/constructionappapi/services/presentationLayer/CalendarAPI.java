package com.example.constructionappapi.services.presentationLayer;

import com.example.constructionappapi.services.businessLogicLayer.repositories.CalendarRepository;
import com.example.constructionappapi.services.dataAccessLayer.entities.CalendarEntity;
<<<<<<< Updated upstream
import com.example.constructionappapi.services.dataAccessLayer.entities.WorkEntity;
=======
>>>>>>> Stashed changes
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

<<<<<<< Updated upstream
import java.time.LocalDate;
import java.util.List;
=======
import java.util.Optional;
>>>>>>> Stashed changes

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/v1")
public class CalendarAPI {
    @Autowired
    private CalendarRepository calendarRepository;

    @GetMapping(value = "/kalender",
            produces = "application/json")
    public String getAllCustomers() {
        return calendarRepository.getAllCalendarEntites();
    }

    @GetMapping("/kalender/ongoing")
    public CalendarEntity getOngoingWork()
    {
        return calendarRepository.findFirstByDate(LocalDate.now());
    }

    @GetMapping(value = "/kalendar/ongoing", produces = "application/json")
    public String getOngoingWork()
    {
        return calendarRepository.getOngoingWork();
    }

    @GetMapping(value = "/kalendar/upcoming", produces = "application/json")
    public String getUpcomingWork(){
        return calendarRepository.getUpcomingWork();
    }
}
