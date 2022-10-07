package com.example.constructionappapi.services.presentationLayer;

import com.example.constructionappapi.services.dataAccessLayer.entities.CustomerEntity;
import com.example.constructionappapi.services.businessLogicLayer.repositories.ICustomerRepository;
import com.example.constructionappapi.services.dataAccessLayer.entities.WorkEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/v1")
public class API {

    //@Autowired ?? used in video but we dont use it?
    private ICustomerRepository iCustomerRepository;

    public API(ICustomerRepository iCustomerRepository) {
        this.iCustomerRepository = iCustomerRepository;
    }


    @PostMapping("/kunder")
    public CustomerEntity createCustomer(@RequestBody CustomerEntity customer) {
        return iCustomerRepository.createCustomer(customer);
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
        iCustomerRepository.deleteCustomer(id);
    }



}
