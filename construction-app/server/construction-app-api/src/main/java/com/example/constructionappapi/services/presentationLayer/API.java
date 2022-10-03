package com.example.constructionappapi.services.presentationLayer;

import com.example.constructionappapi.services.dataAccessLayer.entities.CustomerEntity;
import com.example.constructionappapi.services.businessLogicLayer.repositories.ICostumerRepository;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/v1")
public class API {

    //@Autowired ?? used in video but we dont use it?
    private final ICostumerRepository iCostumerRepository;

    public API(ICostumerRepository iCostumerRepository) {
        this.iCostumerRepository = iCostumerRepository;
    }

    @PostMapping("/kunder")
    public CustomerEntity createCustomer(@RequestBody CustomerEntity customer) {
        return iCostumerRepository.createCustomer(customer);
    }

    @GetMapping("/kunder")
    public List<CustomerEntity> getAllCustomers() {
        return iCostumerRepository.getAllCustomers();
    }

}
