package com.example.constructionappapi.services.presentationLayer;


import com.example.constructionappapi.services.businessLogicLayer.repositories.CustomerNoteRepository;
import com.example.constructionappapi.services.dataAccessLayer.entities.CustomerEntity;
import com.example.constructionappapi.services.dataAccessLayer.entities.CustomerNoteEntity;
import com.example.constructionappapi.services.dataAccessLayer.entities.WorkEntity;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/v1")
public class CustomerNoteAPI {

    @Autowired
    private CustomerNoteRepository customerNoteRepository;

    @PostMapping("kunder/anteckningar/save")
    public CustomerNoteEntity createCostumerNote(@RequestBody CustomerNoteEntity customerNote, WorkEntity work) {
        return customerNoteRepository.createCustomerNote(customerNote, work);
    }

    @GetMapping("kunder/anteckningar/{workId}")
    public List<CustomerNoteEntity> getAllNotesForWork(@PathVariable WorkEntity work) {
        return customerNoteRepository.getAllNotesForWork(work);
    }

    @GetMapping("kunder/anteckningar/{customerId}")
    public List<CustomerNoteEntity> getAllNotesForCustomer(@PathVariable Long customerId) {
        return customerNoteRepository.findAllByCustomerId(customerId);
        //return customerNoteRepository.getAllNotesForCustomer(customerId);
    }

    @DeleteMapping("kunder/anteckningar/{customerId}/remove")
    public void deleteNote(@PathVariable final Long customerId) {
        customerNoteRepository.deleteNote(customerId); // Ska det vara return här?
    }
}
