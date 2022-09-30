package com.example.constructionappapi.services.dataAccessLayer.repositories;
import com.example.constructionappapi.services.dataAccessLayer.entities.CustomerEntity;

import java.util.List;

/**
 * A interface to function as a model for all the Db repositories
 */
public interface ICustomerRepository {
    CustomerEntity createCustomer(CustomerEntity customer);

    List<CustomerEntity> getAllCustomers();
}
