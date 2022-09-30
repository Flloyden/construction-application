package com.example.constructionappapi.services.presentationLayer;

import com.example.constructionappapi.services.businessLogicLayer.RequestController;
import com.example.constructionappapi.services.dataAccessLayer.model.Costumer;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/v1")
public class KundController {

    //private final dataAccessLayer.repositories.IRepository iRepository;
    private RequestController requestController;

    public KundController(RequestController requestController) {
        this.requestController = requestController;
    }


    @PostMapping("/kunder")
    public Costumer createKund(@RequestBody Costumer costumer) {
        return requestController.createKund(costumer);
    }

    @GetMapping("/kunder")
    public List<Costumer> getAllKunder() {
        return requestController.getAllKunder();
    }


}
