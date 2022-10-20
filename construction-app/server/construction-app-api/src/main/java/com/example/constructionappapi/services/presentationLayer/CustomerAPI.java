package com.example.constructionappapi.services.presentationLayer;

import com.example.constructionappapi.services.dataAccessLayer.entities.CustomerEntity;
import com.example.constructionappapi.services.businessLogicLayer.repositories.customer.ICustomerRepository;
import com.example.constructionappapi.services.dataAccessLayer.entities.VacationEntity;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.*;

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

    @GetMapping("/kunderr")
    public Map<LocalDate, VacationEntity> createCustomerrr() {
        HashMap<LocalDate, VacationEntity> map = new HashMap<>();
        map.put(LocalDate.now(), new VacationEntity(LocalDate.now()));
        map.put(LocalDate.of(2045, 4, 23), new VacationEntity(LocalDate.now()));
        return map;
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
