package com.example.constructionappapi.services.dataAccessLayer.dao;

import com.example.constructionappapi.services.dataAccessLayer.entities.CalendarEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

/**
 * A class that gives access to interaction with table Calendar in the DB (save, find, delete,
 * etc, given by JpaRepository) through it's entity-class
 */
@Repository
public interface CalendarDao extends JpaRepository<CalendarEntity, Long> {
    CalendarEntity findFirstByDate(LocalDate date);

    Optional<CalendarEntity> findFirstByOrderByDateDesc(); //last date in calendar
    @Transactional
    void deleteAllByDate(LocalDate date);

    @Transactional
    void deleteAllByWorkId(long id);

    List<CalendarEntity> findByDateBetween(LocalDate tomorrow, LocalDate thirtyDaysForward);
}
