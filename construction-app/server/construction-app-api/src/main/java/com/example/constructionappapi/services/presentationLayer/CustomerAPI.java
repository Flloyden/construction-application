package com.example.constructionappapi.services.presentationLayer;

import com.example.constructionappapi.services.businessLogicLayer.repositories.CustomerRepository;
import com.example.constructionappapi.services.dataAccessLayer.entities.CustomerEntity;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * API for customers. This is where the client/front-end and server communication is made possible.
 */
@RestController
@RequestMapping("/api/v1")
public class CustomerAPI {

    @Autowired
    private CustomerRepository customerRepository;

    @PostMapping("/customers")
    public ResponseEntity<CustomerEntity> createCustomer(@RequestBody CustomerEntity customer) {
        return customerRepository.createCustomer(customer);
    }

    @GetMapping("/customers/{id}")
    public ResponseEntity<?> getCustomer(@PathVariable final Long id) {
        return customerRepository.getCustomer(id);
    }

    @GetMapping("/customers")
    public ResponseEntity<List<CustomerEntity>> getAllCustomers() {
        return customerRepository.getAllCustomers();
    }

    @DeleteMapping("/customers/{id}/remove")
    public ResponseEntity<String> deleteCustomer(@PathVariable final Long id) {
        return customerRepository.deleteCustomer(id);
    }
}
