package com.example.constructionappapi.services.presentationLayer;

import com.example.constructionappapi.services.dataAccessLayer.entities.CustomerEntity;
import com.example.constructionappapi.services.businessLogicLayer.repositories.ICustomerRepository;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/v1")
public class API {

    //private final dataAccessLayer.repositories.IRepository iRepository;
    //private RequestController requestController;
    private final ICustomerRepository iCustomerRepository;

    public API(ICustomerRepository iCustomerRepository) {
        this.iCustomerRepository = iCustomerRepository;
    }

    @PostMapping("/kunder")
    public CustomerEntity createCustomer(@RequestBody CustomerEntity customer) {
        return iCustomerRepository.createCustomer(customer);
    }

    @GetMapping("/kunder")
    public List<CustomerEntity> getAllCustomers() {
        return iCustomerRepository.getAllCustomers();
    }

}
