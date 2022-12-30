package com.example.constructionappapi.services.presentationLayer;


import com.example.constructionappapi.services.businessLogicLayer.repositories.CustomerNoteRepository;
import com.example.constructionappapi.services.dataAccessLayer.entities.CustomerNoteEntity;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1")
public class CustomerNoteAPI {

    @Autowired
    private CustomerNoteRepository customerNoteRepository;

    @PostMapping("/notes/save/{workId}") //TODO alla ska vara såhär
    public CustomerNoteEntity createCostumerNote(@RequestBody CustomerNoteEntity customerNote, @PathVariable final long workId) {
        return customerNoteRepository.createCustomerNote(customerNote, workId);
    }

    @PostMapping("/notes/edit/{workId}")
    public CustomerNoteEntity editCostumerNote(@RequestBody CustomerNoteEntity customerNote) {
        return customerNoteRepository.editCustomerNote(customerNote);
    }

    @GetMapping("/notes/summarized/{sumNoteId}")
    public List<CustomerNoteEntity> getAllNotesForOneSum(@PathVariable final long sumNoteId) {
        return customerNoteRepository.getAllNotesForOneSum(sumNoteId);
    }

    @GetMapping("/notes/notesForWork/{workId}")
    public List<CustomerNoteEntity> getAllNotesForWork(@PathVariable final long workId) {
        return customerNoteRepository.getAllNotesByWorkId(workId);
    }

    @GetMapping("/notes/notesForWork/summarized/{workId}")
    public List<CustomerNoteEntity> getAllSummarizedNotesForWork(@PathVariable final long workId) {
        return customerNoteRepository.getAllSummarizedNotesForWork(workId);
    }

    @GetMapping("/notes/notesForWork/notsummarized/{workId}")
    public List<CustomerNoteEntity> getAllNotSummarizedNotesForWork(@PathVariable final long workId) {
        return customerNoteRepository.getAllNotSummarizedNotesForWork(workId);
    }

    @GetMapping("/notes/notesForCustomer/{customerId}")
    public List<CustomerNoteEntity> getAllNotesForCustomer(@PathVariable final long customerId) {
        return customerNoteRepository.getAllNotesByCustomerId(customerId);
    }

    //TODO bindestreck
    @GetMapping("/notes/notes-for-customer/summarized/{customerId}")
    public List<CustomerNoteEntity> getAllSummarizedNotesForCustomer(@PathVariable final long customerId) {
        return customerNoteRepository.getAllSummarizedNotesForCustomer(customerId);
    }

    @GetMapping("/notes/notesForCustomer/notsummarized/{customerId}")
    public List<CustomerNoteEntity> getAllNotSummarizedNotesForCustomer(@PathVariable final long customerId) {
        return customerNoteRepository.getAllNotSummarizedNotesForCustomer(customerId);
    }

    @DeleteMapping("/notes/remove/{noteId}")
    public void deleteNote(@PathVariable final Long noteId) { //TODO ska ej kunna göras?
        customerNoteRepository.deleteNote(noteId);
    }
}
