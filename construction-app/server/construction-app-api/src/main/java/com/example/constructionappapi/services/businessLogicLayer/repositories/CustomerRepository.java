package com.example.constructionappapi.services.businessLogicLayer.repositories;

import com.example.constructionappapi.services.dataAccessLayer.DBAccessCustomer;
import com.example.constructionappapi.services.dataAccessLayer.entities.CustomerEntity;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * Class accessing the customer table in DB
 */
@Service
public class CustomerRepository implements ICustomerRepository {

    private DBAccessCustomer DBAccessCustomer;

    public CustomerRepository(DBAccessCustomer DBAccessCustomer) {
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