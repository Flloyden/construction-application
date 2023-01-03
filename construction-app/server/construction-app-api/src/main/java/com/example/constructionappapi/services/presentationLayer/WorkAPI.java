package com.example.constructionappapi.services.presentationLayer;


import com.example.constructionappapi.services.businessLogicLayer.repositories.WorkRepository;
import com.example.constructionappapi.services.dataAccessLayer.entities.WorkEntity;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/v1")
@RequiredArgsConstructor
public class WorkAPI {
    private final WorkRepository workRepository;

    @GetMapping("/work")
    public List<WorkEntity> getAllWorkEntities() {
        return workRepository.getAllWorkEntities();
    }

    @PostMapping("/work/{customerId}/save")
    public ResponseEntity createWork(@PathVariable final long customerId, @RequestBody WorkEntity work) {
        return workRepository.createWork(customerId, work);
    }

    @PutMapping("/work/{customerId}/update")
    public ResponseEntity<WorkEntity> updateWork(@PathVariable final Long customerId, @RequestBody WorkEntity work) {
        return workRepository.updateWork(customerId, work);
    }

    @DeleteMapping("/work/{customer_id}/delete/{id}")
    public ResponseEntity<String> deleteWorkEntity(@PathVariable final Long id) {
        return workRepository.deleteWorkEntity(id);
    }

    @PostMapping("/work/update-workstatus-completed")
    public boolean findWorkAndUpdateToCompleted() {
        return workRepository.findWorkAndUpdateToCompleted();
    }

    @PostMapping("/work/update-workstatus-started")
    public boolean findWorkAndUpdateToStarted() {
        return workRepository.findWorkAndUpdateToStarted();
    }

    @GetMapping("/work/{customer_id}/{workId}")
    public Optional<WorkEntity> getWorkEntity(@PathVariable final Long workId) {
        return workRepository.getWorkEntity(workId);
    }

    @GetMapping("/work/upcoming")
    public List<Object> getUpcomingWork() {

        List<Object> objectList = new ArrayList<>();
        List<WorkEntity> workEntities = workRepository.checkForUpcomingWork();
        if (workEntities.size() != 0) {
            objectList.add(workEntities.get(0));
            objectList.add(workEntities.get(0).getCustomer());
            return objectList;
        } else {
            return null;
        }
    }

    @GetMapping("/work/ongoing")
    public List<Object> getOngoingWork() {
        List<Object> objectList = new ArrayList<>();
        List<WorkEntity> work = workRepository.checkForOngoingWork();
        if (work.size() != 0)
        {
          objectList.add(work.get(0));
          objectList.add(work.get(0).getCustomer());
          return objectList;
        } else {
            return null;
        }
    }
}
