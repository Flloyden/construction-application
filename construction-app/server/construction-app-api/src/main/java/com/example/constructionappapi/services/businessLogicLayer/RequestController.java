package com.example.constructionappapi.services.businessLogicLayer;

import com.example.constructionappapi.services.dataAccessLayer.model.Costumer;
import com.example.constructionappapi.services.dataAccessLayer.repositories.IRepository;

import java.util.List;


public class RequestController {

    private final IRepository iRepository;

    public RequestController(IRepository iRepository) {
        this.iRepository = iRepository;
    }

    //@PostMapping("/kunder")
    public Costumer createKund(Costumer costumer) {
        return iRepository.createKund(costumer);
    }

    //@GetMapping("/kunder")
    public List<Costumer> getAllKunder() {
        return iRepository.getAllKunder();
    }
}
