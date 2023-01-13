package com.example.constructionappapi.services.dataAccessLayer.dao;

import com.example.constructionappapi.services.dataAccessLayer.entities.VacationCalendarEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

/**
 * A class that gives access to interaction with the table vacation_calendar in the DB (save, find, update, delete,
 * etc, given by JpaRepository).
 */
@Repository
public interface VacationCalendarDao extends JpaRepository<VacationCalendarEntity, Long> {

    Optional<VacationCalendarEntity> findFirstByDate(LocalDate startDate);

    List<VacationCalendarEntity> findAllByDateLessThanEqualAndDateGreaterThanEqual(LocalDate plusDays, LocalDate startDate);
}
