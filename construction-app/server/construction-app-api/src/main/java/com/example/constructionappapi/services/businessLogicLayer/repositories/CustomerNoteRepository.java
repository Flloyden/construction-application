package com.example.constructionappapi.services.businessLogicLayer.repositories;

import com.example.constructionappapi.services.dataAccessLayer.dao.CustomerNoteDao;
import com.example.constructionappapi.services.dataAccessLayer.entities.CustomerNoteEntity;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

/**
 * Class accessing the customer note table in DB
 */
@Service
public class CustomerNoteRepository{

    @Autowired
    private CustomerNoteDao customerNoteDao;


    public CustomerNoteEntity createCustomerNote(CustomerNoteEntity customerNote) {
        //customerNoteEntity.setCustomer(customer); //assignar customernotes till customer
        return null;
    }

    public Optional<CustomerNoteEntity> getAllCustomerNotes(Long work_id) { //TODO baserat på work_id
        return customerNoteDao.findByWork_id(work_id);
    }


    public Optional<CustomerNoteEntity> getCustomerNote(Long id) {
        return customerNoteDao.findById(id);
    }


    public void deleteCustomerNote(Long id) {
        customerNoteDao.deleteById(id);
    }
}
