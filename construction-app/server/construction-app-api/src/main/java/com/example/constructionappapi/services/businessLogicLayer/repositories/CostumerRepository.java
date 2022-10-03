package com.example.constructionappapi.services.businessLogicLayer.repositories;

import com.example.constructionappapi.services.dataAccessLayer.DBAccessCustomer;
import com.example.constructionappapi.services.dataAccessLayer.entities.CustomerEntity;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * Class accessing the customer table in DB
 */
@Service
public class CostumerRepository implements ICostumerRepository {

    private DBAccessCustomer DBAccessCustomer;

    public CostumerRepository(DBAccessCustomer DBAccessCustomer) {
        this.DBAccessCustomer = DBAccessCustomer;
    }

    @Override
    public CustomerEntity createCustomer(CustomerEntity customer) {
        return DBAccessCustomer.save(customer);
    }

    @Override
    public List<CustomerEntity> getAllCustomers() {
        return DBAccessCustomer.findAll();
    }
}