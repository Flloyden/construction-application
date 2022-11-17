package com.example.constructionappapi.services.businessLogicLayer.repositories;

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

    /**
     * Saves/Updates(if ID already exists) a vacation date
     * @param vacation
     * @return
     */
    public VacationEntity saveVacation(VacationEntity vacation) {
        return vacationDao.save(vacation);
    }

    /**
     * Returns all vacations dates as a list containing VacationEntities
     * @return
     */
    public List<VacationEntity> getAllVacationEntities() {
        return vacationDao.findAll();
    }

    /**
     * Returns specific vacation by ID
     * @param id
     * @return
     */
    public Optional<VacationEntity> getVacation(LocalDate id) {
        return vacationDao.findById(id);
    }

    /**
     * Deletes specific vacation by ID
     * @param id
     */
    public void deleteVacation(LocalDate id) {
        vacationDao.deleteById(id);
    }
}
