package com.example.constructionappapi.services.presentationLayer;


import com.example.constructionappapi.services.businessLogicLayer.repositories.CustomerNoteRepository;
import com.example.constructionappapi.services.dataAccessLayer.entities.CustomerNoteEntity;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/v1")
public class CustomerNoteAPI {

    @Autowired
    private CustomerNoteRepository customerNoteRepository;

    @PostMapping("kunder/anteckningar/save/{workId}")
    public CustomerNoteEntity createCostumerNote(@RequestBody CustomerNoteEntity customerNote, @PathVariable final long workId) {
        return customerNoteRepository.createCustomerNote(customerNote, workId);
    }

    @GetMapping("kunder/anteckningar/{workId}")
    public List<CustomerNoteEntity> getAllNotesForWork(@PathVariable final long workId) {
        return customerNoteRepository.getAllNotesForWork(workId);
    }

    @GetMapping("kunder/anteckningar/{customerId}")
    public List<CustomerNoteEntity> getAllNotesForCustomer(@PathVariable final long customerId) {
        return customerNoteRepository.getAllNotesByCustomerId(customerId);
    }

    @DeleteMapping("kunder/anteckningar/{customerId}/remove")
    public void deleteNote(@PathVariable final long noteId) {
        customerNoteRepository.deleteNote(noteId);
    }
}
