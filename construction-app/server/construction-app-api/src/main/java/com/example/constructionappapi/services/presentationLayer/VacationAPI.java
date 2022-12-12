package com.example.constructionappapi.services.presentationLayer;

import com.example.constructionappapi.services.businessLogicLayer.repositories.VacationRepository;
import com.example.constructionappapi.services.dataAccessLayer.entities.VacationEntity;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/v1")
public class VacationAPI {

    @Autowired
    private VacationRepository vacationRepository;

    @PostMapping("/semester")
    public VacationEntity saveVacation(@RequestBody VacationEntity vacationEntity) {
        return vacationRepository.saveVacation(vacationEntity);
    }

    @PostMapping("/semester/{vacationId}/edit")
    public VacationEntity updateVacation(@PathVariable final Long vacationId, @RequestBody VacationEntity vacationEntity) {
        vacationRepository.deleteVacation(vacationId);
        return vacationRepository.saveVacation(vacationEntity);
    }

    @GetMapping("/semester/{id}")
    public Optional<VacationEntity> getVacation(@PathVariable final Long vacationId) {
        return vacationRepository.getVacation(vacationId);
    }

    @GetMapping("/semester")
    public List<VacationEntity> getAllVacations() {
        return vacationRepository.getAllVacationEntities();
    }

    @DeleteMapping("/semester/{vacationId}/remove")
    public void deleteVacation(@PathVariable final Long vacationId) {
        vacationRepository.deleteVacation(vacationId);
    }
}
