package com.example.constructionappapi.services.dataAccessLayer.repositories;

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
        //List<CustomerEntity> customerEntities = DBAccessCustomer.findAll();
        /*
        List<Customer> customers = customerEntities
                .stream()
                .map(kun -> new Customer(kun.getId(), kun.getName()))
                .collect(Collectors.toList());
         */
        return DBAccessCustomer.findAll();

    }
}
