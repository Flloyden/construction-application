package com.example.constructionappapi.services.businessLogicLayer.repositories;

import com.example.constructionappapi.services.dataAccessLayer.dao.CustomerNoteDao;
import com.example.constructionappapi.services.dataAccessLayer.entities.CustomerEntity;
import com.example.constructionappapi.services.dataAccessLayer.entities.CustomerNoteEntity;
import com.example.constructionappapi.services.dataAccessLayer.entities.WorkEntity;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * Class accessing the customer note table in DB
 */
@Service
public class CustomerNoteRepository {

    @Autowired
    private CustomerNoteDao customerNoteDao;
    private CustomerNoteEntity customerNoteEntity;


    public CustomerNoteEntity createCustomerNote(CustomerNoteEntity customerNote, WorkEntity work) {
        CustomerEntity customerEntity = work.getCustomer(); //hämta customer till det jobbet
        customerNoteEntity.setCustomer(customerEntity); //assignar note till customer
        customerNoteEntity.setWorkForNote(work); //assigna note till work
        return customerNoteDao.save(customerNote);
    }

    public List<CustomerNoteEntity> getAllNotesForWork(WorkEntity work) {
        return work.getCustomerNotes();
    }


    public List<CustomerNoteEntity> getAllNotesForCustomer(CustomerEntity customer) {
        return customer.getCustomerNotes();
    }

    public List<CustomerNoteEntity> findAllByCustomerId(Long customerId) {
        return customerNoteDao.findAllByCustomerId(customerId);
    }

    public void deleteNote(Long customerId) {
    }
}
