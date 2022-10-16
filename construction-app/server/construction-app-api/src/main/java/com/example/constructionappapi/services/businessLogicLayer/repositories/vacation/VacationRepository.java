package com.example.constructionappapi.services.businessLogicLayer.repositories.vacation;

import com.example.constructionappapi.services.dataAccessLayer.dao.VacationDao;
import com.example.constructionappapi.services.dataAccessLayer.entities.VacationEntity;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Service
public class VacationRepository {

    @Autowired
    private VacationDao vacationDao;

    public VacationEntity saveVacation(VacationEntity vacation) {
        return vacationDao.save(vacation);
    }

    public List<VacationEntity> getAllVacationEntities() {
        return vacationDao.findAll();
    }

    public Optional<VacationEntity> getVacation(LocalDate id) {
        return vacationDao.findById(id);
    }

    public void deleteVacation(LocalDate id) {
        vacationDao.deleteById(id);
    }
}
