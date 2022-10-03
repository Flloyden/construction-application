package com.example.constructionappapi.services.businessLogicLayer.repositories;

import com.example.constructionappapi.services.dataAccessLayer.dao.CustomerDao;
import com.example.constructionappapi.services.dataAccessLayer.entities.CustomerEntity;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * Class accessing the customer table in DB
 */
@Service
public class CustomerRepository implements ICustomerRepository {

    private CustomerDao CustomerDao;

    public CustomerRepository(CustomerDao CustomerDao) {
        this.CustomerDao = CustomerDao;
    }

    @Override
    public CustomerEntity createCustomer(CustomerEntity customer) {
        return CustomerDao.save(customer);
    }

    @Override
    public List<CustomerEntity> getAllCustomers() {
        return CustomerDao.findAll();
    }
}