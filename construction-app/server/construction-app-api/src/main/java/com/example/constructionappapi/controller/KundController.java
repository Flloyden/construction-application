package com.example.constructionappapi.controller;

import com.example.constructionappapi.model.Kund;
import com.example.constructionappapi.services.KundService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/v1")
public class KundController {

    private final KundService kundService;

    public KundController(KundService kundService) {
        this.kundService = kundService;
    }

    @PostMapping("/kunder")
    public Kund createKund(@RequestBody Kund kund) {
        return kundService.createKund(kund);
    }

    @GetMapping("/kunder")
    public List<Kund> getAllKunder() {
        return kundService.getAllKunder();
    }
}
