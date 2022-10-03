package com.example.constructionappapi.services.presentationLayer;

import com.example.constructionappapi.services.dataAccessLayer.entities.CostumerEntity;
import com.example.constructionappapi.services.businessLogicLayer.repositories.ICostumerRepository;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/v1")
public class API {

    //@Autowired ?? används i video, men vi gör d ej
    private final ICostumerRepository iCostumerRepository;

    public API(ICostumerRepository iCostumerRepository) {
        this.iCostumerRepository = iCostumerRepository;
    }

    @PostMapping("/kunder")
    public CostumerEntity createCustomer(@RequestBody CostumerEntity costumer) {
        return iCostumerRepository.createCustomer(costumer);
    }

    @GetMapping("/kunder")
    public List<CostumerEntity> getAllCustomers() {
        return iCostumerRepository.getAllCustomers();
    }

}
