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

    @PostMapping("kunder/anteckningar/edit/{workId}")
    public CustomerNoteEntity editCostumerNote(@RequestBody CustomerNoteEntity customerNote) {
        return customerNoteRepository.editCustomerNote(customerNote);
    }

    @GetMapping("kunder/anteckningar/notesForWork/{workId}")
    public List<CustomerNoteEntity> getAllNotesForWork(@PathVariable final long workId) {
        return customerNoteRepository.getAllNotesByWorkId(workId);
    }

    @GetMapping("kunder/anteckningar/notesForWork/summarized/{workId}")
    public List<CustomerNoteEntity> getAllSummarizedNotesForWork(@PathVariable final long workId) {
        return customerNoteRepository.getAllSummarizedNotesForWork(workId);
    }

    @GetMapping("kunder/anteckningar/notesForWork/notsummarized/{workId}")
    public List<CustomerNoteEntity> getAllNotSummarizedNotesForWork(@PathVariable final long workId) {
        return customerNoteRepository.getAllNotSummarizedNotesForWork(workId);
    }

    @GetMapping("kunder/anteckningar/notesForCustomer/{customerId}")
    public List<CustomerNoteEntity> getAllNotesForCustomer(@PathVariable final long customerId) {
        return customerNoteRepository.getAllNotesByCustomerId(customerId);
    }

    @GetMapping("kunder/anteckningar/notesForCustomer/summarized/{customerId}")
    public List<CustomerNoteEntity> getAllSummarizedNotesForCustomer(@PathVariable final long customerId) {
        return customerNoteRepository.getAllSummarizedNotesForCustomer(customerId);
    }

    @GetMapping("kunder/anteckningar/notesForCustomer/notsummarized/{customerId}")
    public List<CustomerNoteEntity> getAllNotSummarizedNotesForCustomer(@PathVariable final long customerId) {
        return customerNoteRepository.getAllNotSummarizedNotesForCustomer(customerId);
    }

    @DeleteMapping("kunder/anteckningar/remove/{noteId}")
    public void deleteNote(@PathVariable final Long noteId) { //TODO ska ej kunna göras?
        customerNoteRepository.deleteNote(noteId);
    }
}
