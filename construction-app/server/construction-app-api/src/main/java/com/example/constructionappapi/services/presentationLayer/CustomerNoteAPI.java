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

    @PostMapping("/notes/save/{workId}")
    public CustomerNoteEntity createCostumerNote(@RequestBody CustomerNoteEntity customerNote, @PathVariable final long workId) {
        return customerNoteRepository.createCustomerNote(customerNote, workId);
    }

    @PostMapping("notes/{workId}/edit")
    public CustomerNoteEntity editCostumerNote(@RequestBody CustomerNoteEntity customerNote) {
        return customerNoteRepository.editCustomerNote(customerNote);
    }

    @GetMapping("/notes/sum-notes/{workId}")
    public List<CustomerNoteEntity> getAllSummarizedNotesForWork(@PathVariable final long workId) {
        return customerNoteRepository.getAllSummarizedNotesForWork(workId);
    }

    @DeleteMapping("/notes/{noteId}/remove")
    public void deleteNote(@PathVariable final Long noteId) { //TODO ska ej kunna göras?
        customerNoteRepository.deleteNote(noteId);
    }
}
