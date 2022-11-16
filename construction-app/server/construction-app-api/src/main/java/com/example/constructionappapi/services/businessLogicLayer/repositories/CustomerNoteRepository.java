package com.example.constructionappapi.services.businessLogicLayer.repositories;

import com.example.constructionappapi.services.dataAccessLayer.dao.CustomerNoteDao;
import com.example.constructionappapi.services.dataAccessLayer.entities.CustomerNoteEntity;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
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

    public List<CustomerNoteEntity> getAllCustomerNotes() { //TODO baserat på work_id
        return null;
    }


    public Optional<CustomerNoteEntity> getCustomerNote(Long id) {
        return Optional.empty();
    }


    public void deleteCustomer(Long id) {

    }
}
