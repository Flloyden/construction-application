package com.example.constructionappapi.services.businessLogicLayer.repositories;

import com.example.constructionappapi.services.dataAccessLayer.dao.CustomerNoteDao;
import com.example.constructionappapi.services.dataAccessLayer.entities.CustomerEntity;
import com.example.constructionappapi.services.dataAccessLayer.entities.CustomerNoteEntity;
import com.example.constructionappapi.services.dataAccessLayer.entities.WorkEntity;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

/**
 * Class accessing the customer note table in DB
 */
@Service
public class CustomerNoteRepository {

    @Autowired
    private CustomerNoteDao customerNoteDao;
    @Autowired
    private WorkRepository workRepository;

    private WorkEntity workEntity;


    public CustomerNoteEntity createCustomerNote(CustomerNoteEntity customerNote, long workId) {
        Optional<WorkEntity> workEntity = workRepository.getWorkEntity(workId);

        CustomerEntity customerEntity = workEntity.get().getCustomer(); //hämta customer till det jobbet

        customerNote.setCustomer(customerEntity); //assignar note till customer

        customerNote.setWorkForNote(workEntity.get()); //assigna note till work

        return customerNoteDao.save(customerNote);
    }




    public List<CustomerNoteEntity> getAllNotesForWork(long workId) {
        Optional<WorkEntity> workEntity = workRepository.getWorkEntity(workId);
        return workEntity.get().getCustomerNotes();
    }

    public List<CustomerNoteEntity> getAllNotesByCustomerId(long customerId) {
        return customerNoteDao.findAllByCustomerId(customerId);
    }

    public void deleteNote(long noteId) {
        customerNoteDao.deleteById(noteId);
    }
}
