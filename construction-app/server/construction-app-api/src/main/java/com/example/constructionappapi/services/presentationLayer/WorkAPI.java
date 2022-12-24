package com.example.constructionappapi.services.presentationLayer;


import com.example.constructionappapi.services.businessLogicLayer.repositories.WorkRepository;
import com.example.constructionappapi.services.dataAccessLayer.entities.CustomerEntity;
import com.example.constructionappapi.services.dataAccessLayer.entities.WorkEntity;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
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

    @PostMapping("/kunder/{customerId}/work/save")
    public ResponseEntity<WorkEntity> saveWork(@PathVariable final long customerId, @RequestBody WorkEntity work) {
        WorkEntity savedWork = workRepository.addNewWorkEntity(customerId, work);

        if (savedWork == null) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }

        return ResponseEntity.status(HttpStatus.OK).body(savedWork);
    }

    @PutMapping("/kunder/{customerId}/work/update")
    public ResponseEntity<WorkEntity> updateWork(@PathVariable final Long customerId, @RequestBody WorkEntity work) {
        WorkEntity updatedWork = workRepository.updateWork(customerId, work);

        if (updatedWork == null) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }

        return ResponseEntity.status(HttpStatus.OK).body(updatedWork);
    }

    @PostMapping("/kunder/work/update_workstatus_completed")
    public boolean findWorkAndUpdateToCompleted() {
        return workRepository.findWorkAndUpdateToCompleted();
    }

    @PostMapping("/kunder/work/update_workstatus_started")
    public boolean findWorkAndUpdateToStarted() {
        return workRepository.findWorkAndUpdateToStarted();
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
    public List<CustomerEntity> getUpcomingWork() {
        if (workRepository.checkForUpcomingWork() != null) {
            List<WorkEntity> work = workRepository.checkForUpcomingWork();
            List<CustomerEntity> customerEntities = new ArrayList<>();
            if (work.size() != 0) {
                customerEntities.add(work.get(0).getCustomer());
                return customerEntities;
            }
        }
        return null;
    }

    @GetMapping("/kunder/ongoing")
    public List<CustomerEntity> getOngoingWork() {
        if (workRepository.checkForOngoingWork() != null) {
            List<WorkEntity> work = workRepository.checkForOngoingWork();
            List<CustomerEntity> customerEntities = new ArrayList<>();
            if (work.size() != 0) {
                customerEntities.add(work.get(0).getCustomer());
                return customerEntities;
            }
        }
        return null;
    }

    @DeleteMapping("/kunder/{customer_id}/work/delete/{id}")
    public ResponseEntity<String> deleteWorkEntity(@PathVariable final Long id) {
        if (workRepository.deleteWorkEntity(id)) {
            return ResponseEntity.ok().body("Deleted successfully");
        }

        return ResponseEntity.notFound().build();
    }

}
