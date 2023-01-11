package com.example.constructionappapi.services.presentationLayer;

import com.example.constructionappapi.services.businessLogicLayer.repositories.VacationRepository;
import com.example.constructionappapi.services.dataAccessLayer.entities.VacationEntity;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/v1")
public class VacationAPI {

    @Autowired
    private VacationRepository vacationRepository;

    @PostMapping("/vacation")
    public ResponseEntity<?> saveVacation(@RequestBody VacationEntity vacationEntity) {
        return vacationRepository.saveVacation(vacationEntity);
    }

    @PostMapping("/vacation/{vacationId}/update")
    public ResponseEntity<?> updateVacation(@PathVariable final Long vacationId, @RequestBody VacationEntity vacationEntity) {
        return vacationRepository.updateVacation(vacationEntity);
    }

    @GetMapping("/vacation/{id}")
    public Optional<VacationEntity> getVacation(@PathVariable final Long id) {
        return vacationRepository.getVacation(id);
    }

    @GetMapping("/vacation")
    public List<VacationEntity> getAllVacations() {
        return vacationRepository.getAllVacationEntities();
    }

    @GetMapping("/vacation/amount-not-old")
    public int getAmountOfVacationDays() {
        return vacationRepository.getAmountOfVacationDays();
    }

    @DeleteMapping("/vacation/{vacationId}/remove")
    public void deleteVacation(@PathVariable final Long vacationId) {
        vacationRepository.deleteVacation(vacationId);
    }
}
