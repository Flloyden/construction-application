package com.example.constructionappapi.services.presentationLayer;

import com.example.constructionappapi.services.businessLogicLayer.repositories.CustomerRepository;
import com.example.constructionappapi.services.dataAccessLayer.entities.CustomerEntity;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/v1")
public class CustomerAPI {

    @Autowired
    private CustomerRepository customerRepository;

    @PostMapping("/kunder")
    public CustomerEntity createCustomer(@RequestBody CustomerEntity customer) {
        return customerRepository.createCustomer(customer);
    }

    @GetMapping("/kunder/{id}")
    public Optional<CustomerEntity> getCustomer(@PathVariable final Long id) {
        return customerRepository.getCustomer(id);
    }

    @GetMapping("/kunder")
    public List<CustomerEntity> getAllCustomers() {
        return customerRepository.getAllCustomers();
    }


    @DeleteMapping("/kunder/{id}/remove")
    public void deleteCustomer(@PathVariable final Long id) {
        customerRepository.deleteCustomer(id); // Ska det vara return här?
    }

    @GetMapping("/kunder/ongoingWork")
        public List<CustomerEntity> getOngoingWorkTest()
        {
           return customerRepository.getOngoingWorkTest();
        }
}

