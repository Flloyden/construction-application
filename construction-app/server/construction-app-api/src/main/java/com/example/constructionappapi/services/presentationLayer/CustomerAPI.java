package com.example.constructionappapi.services.presentationLayer;

import com.example.constructionappapi.services.dataAccessLayer.entities.CustomerEntity;
import com.example.constructionappapi.services.businessLogicLayer.repositories.customer.ICustomerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/v1")
public class CustomerAPI {

    //@Autowired ?? used in video but we dont use it?

    @Autowired
    private ICustomerRepository iCustomerRepository;

    @PostMapping("/kunder")
    public CustomerEntity createCustomer(@RequestBody CustomerEntity customer) {
        return iCustomerRepository.createCustomer(customer);
    }

    //UPDATE customer? //Ändra om det behövs
    @PutMapping("kunder/edit/{id}")
    public CustomerEntity editCustomer (@RequestBody CustomerEntity customer)
    {
        return iCustomerRepository.editCustomer(customer);
    }

    @GetMapping("/kunder/{id}")
    public Optional<CustomerEntity> getCustomer(@PathVariable final Long id) {
        return iCustomerRepository.getCustomer(id);
    }


    @GetMapping("/kunder")
    public List<CustomerEntity> getAllCustomers() {
        return iCustomerRepository.getAllCustomers();
    }



    @DeleteMapping("/kunder/{id}/remove")
    public void deleteCustomer(@PathVariable final Long id) {
        iCustomerRepository.deleteCustomer(id); // Ska det vara return här?
    }
}