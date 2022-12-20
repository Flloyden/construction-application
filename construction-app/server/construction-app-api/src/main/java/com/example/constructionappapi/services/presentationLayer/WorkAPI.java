package com.example.constructionappapi.services.presentationLayer;


import com.example.constructionappapi.services.businessLogicLayer.Calendar;
import com.example.constructionappapi.services.businessLogicLayer.CalendarSingleton;
import com.example.constructionappapi.services.businessLogicLayer.repositories.CustomerRepository;
import com.example.constructionappapi.services.businessLogicLayer.repositories.WorkRepository;
import com.example.constructionappapi.services.dataAccessLayer.entities.WorkEntity;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/v1")
public class WorkAPI {

    @Autowired
    private WorkRepository workRepository;
    @Autowired
    private CustomerRepository customerRepository;

    private final Calendar calendar = CalendarSingleton.getCalendar();

    @PostMapping("/kunder/{customerId}/work/save")
    public WorkEntity saveWork(@PathVariable final long customerId, @RequestBody WorkEntity work) {
        return workRepository.saveWork(customerId, work);
    }

    @PostMapping("/kunder/{customerId}/work/update")
    public WorkEntity updateWork(@PathVariable final Long customerId, @RequestBody WorkEntity work) {
        return workRepository.updateWork(customerId, work);
    }

    @PutMapping("/kunder/{customer_id}/work/edit/{id}")
    public WorkEntity editWorkEntity(@RequestBody WorkEntity work) {
        return workRepository.editWorkEntity(work);
    }

    @GetMapping("/kunder/{customer_id}/work/{id}")
    public Optional<WorkEntity> getWorkEntity(@PathVariable final Long id) {
        return workRepository.getWorkEntity(id);
    }

    @GetMapping("/kunder/work")
    public List<WorkEntity> getAllWorkEntities() {
        return workRepository.getAllWorkEntities();
    }

    @GetMapping("/kunder/upcoming")
    public List<WorkEntity> getUpcomingWork() {
        if (workRepository.checkForActiveWork() != null) {
            return workRepository.checkForActiveWork();
        } else {
            return null;
        }
    }

    @GetMapping("/kunder/ongoing")
    public List<WorkEntity> getOngoingWork() {
        if (workRepository.checkForOngoingWork() != null) {
            return workRepository.checkForOngoingWork();
        } else {
            return null;
        }
    }

    @DeleteMapping("/kunder/{customer_id}/work/delete/{id}")
    public void deleteWorkEntity(@PathVariable final Long id) {
        workRepository.deleteWorkEntity(id);
    }

}
