package com.example.constructionappapi.services.businessLogicLayer.repositories.customer;

import com.example.constructionappapi.services.dataAccessLayer.entities.CustomerEntity;

import java.util.List;
import java.util.Optional;

/**
 * A interface to function as a model for all the repositories
 */
public interface ICustomerRepository {
    CustomerEntity createCustomer(CustomerEntity customer);

    CustomerEntity editCustomer(CustomerEntity customer);

    List<CustomerEntity> getAllCustomers();

    Optional<CustomerEntity> getCustomer(Long id);

    void deleteCustomer(Long id);


}
