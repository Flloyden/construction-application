package com.example.constructionappapi.services.businessLogicLayer.repositories;
import com.example.constructionappapi.services.dataAccessLayer.entities.CustomerEntity;

import java.util.List;

/**
 * A interface to function as a model for all the repositories
 */
public interface ICustomerRepository {
    CustomerEntity createCustomer(CustomerEntity customer);

    List<CustomerEntity> getAllCustomers();
}
