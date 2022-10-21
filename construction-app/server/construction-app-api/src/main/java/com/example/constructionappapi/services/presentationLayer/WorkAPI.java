package com.example.constructionappapi.services.presentationLayer;


import com.example.constructionappapi.services.businessLogicLayer.repositories.work.IWorkRepository;
import com.example.constructionappapi.services.dataAccessLayer.entities.WorkEntity;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.repository.query.Param;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/v1")

public class WorkAPI {

    @Autowired
    private IWorkRepository iWorkRepository;

    @PostMapping("/kunder/{customer_id}/work/create")
    public WorkEntity createWorkEntity(@RequestBody WorkEntity work) {
        return iWorkRepository.createWorkEntity(work);
    }

    @PutMapping("/kunder/{customer_id}/work/edit/{id}")
    public WorkEntity editWorkEntity(@RequestBody WorkEntity work) {
        return iWorkRepository.editWorkEntity(work);
    }

    @GetMapping("/kunder/{customer_id}/work/{id}")
    public Optional<WorkEntity> getWorkEntity(@PathVariable final Long id) {
        return iWorkRepository.getWorkEntity(id);
    }

    @GetMapping("/kunder/work")
    public List<WorkEntity> getAllWorkEntities() {
        return iWorkRepository.getAllWorkEntities();

    }

    @DeleteMapping("/kunder/{customer_id}/work/delete/{id}")
    public void deleteWorkEntity(@PathVariable final Long id) {
        iWorkRepository.deleteWorkEntity(id);
    }
}
