package com.example.constructionappapi.services.dataAccessLayer.dao;

import com.example.constructionappapi.services.dataAccessLayer.entities.VacationCalendarEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.Optional;

@Repository
public interface VacationCalendarDao extends JpaRepository<VacationCalendarEntity, Long> {
    Optional<VacationCalendarEntity> findFirstByDateLessThanEqualAndDateGreaterThanEqual(LocalDate endDate, LocalDate startDate);
}
