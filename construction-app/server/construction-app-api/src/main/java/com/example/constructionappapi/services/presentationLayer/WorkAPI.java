package com.example.constructionappapi.services.presentationLayer;


import com.example.constructionappapi.services.businessLogicLayer.repositories.work.IWorkRepository;
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
private IWorkRepository iWorkRepository;

    @PostMapping("/work")
    public WorkEntity createWorkEntity(@RequestBody WorkEntity work) {
        return iWorkRepository.createWorkEntity(work);
    }

    @PutMapping("/work/edit/{id}")
    public WorkEntity editWorkEntity(@RequestBody WorkEntity work)
    {
        return iWorkRepository.editWorkEntity(work);
    }

    @GetMapping("/work/{id}")
    public Optional<WorkEntity> getWorkEntity(@PathVariable final Long id){
        return iWorkRepository.getWorkEntity(id);
    }

    @GetMapping("/work")
    public List<WorkEntity> getAllWorkEntities()
    {
        return iWorkRepository.getAllWorkEntities();
    }

    @DeleteMapping("/work/{id}/remove")
    public void deleteWorkEntity(@PathVariable final Long id)
    {
        iWorkRepository.deleteWorkEntity(id);
    }
}
