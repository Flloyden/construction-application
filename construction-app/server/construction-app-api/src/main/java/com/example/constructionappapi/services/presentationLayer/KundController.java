package com.example.constructionappapi.services.presentationLayer;

import com.example.constructionappapi.services.dataAccessLayer.model.Costumer;
import com.example.constructionappapi.services.dataAccessLayer.repositories.IRepository;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/v1")
public class KundController {

    //private final dataAccessLayer.repositories.IRepository iRepository;
    //private RequestController requestController;
    private final IRepository iRepository;

    public KundController(IRepository iRepository) {
        this.iRepository = iRepository;
    }

    @PostMapping("/kunder")
    public Costumer createKund(@RequestBody Costumer costumer) {
        return iRepository.createKund(costumer);
    }

    @GetMapping("/kunder")
    public List<Costumer> getAllKunder() {
        return iRepository.getAllKunder();
    }


}
