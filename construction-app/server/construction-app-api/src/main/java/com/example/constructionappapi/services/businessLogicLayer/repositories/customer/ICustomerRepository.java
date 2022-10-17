package com.example.constructionappapi.services.businessLogicLayer.repositories.customer;

import com.example.constructionappapi.services.dataAccessLayer.entities.CustomerEntity;

import java.util.List;
import java.util.Optional;

/**
 * A interface to function as a model for all the repositories
 */
public interface ICustomerRepository {

    /**
     * Creates a new customer using the parameter CustomerEntity
     * @param customer
     * @return
     */
    CustomerEntity createCustomer(CustomerEntity customer);

    /**
     * Returns all customers as a list containing CustomerEntities
     * @return
     */
    List<CustomerEntity> getAllCustomers();

    /**
     * Returns a certain customer using id
     * @param id
     * @return
     */
    Optional<CustomerEntity> getCustomer(Long id);

    /**
     * Deletes a certain customer using id
     * @param id
     */
    void deleteCustomer(Long id);
}
