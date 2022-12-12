package com.example.constructionappapi.services.dataAccessLayer.dao;

import com.example.constructionappapi.services.businessLogicLayer.Calendar;
import com.example.constructionappapi.services.dataAccessLayer.entities.CalendarEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import java.time.LocalDate;
<<<<<<< Updated upstream
=======
import java.time.LocalDateTime;
>>>>>>> Stashed changes
import java.util.List;
import java.util.Optional;

/**
 * A class that gives access to interaction with table Calendar in the DB (save, find, delete,
 * etc, given by JpaRepository) through it's entity-class
 */
@Repository
public interface CalendarDao extends JpaRepository<CalendarEntity, Long> {
<<<<<<< Updated upstream
    Optional<CalendarEntity> findFirstByDate(LocalDate date);
=======


    CalendarEntity findFirstByDate(LocalDate date);
>>>>>>> Stashed changes

    Optional<CalendarEntity> findFirstByOrderByDateDesc();
    @Transactional
    void deleteAllByDate(LocalDate date);

    @Transactional
    void deleteAllByWorkId(long id);

<<<<<<< Updated upstream
    List<CalendarEntity> findByDateBetween(LocalDate today, LocalDate thirtyDaysForward);
=======
    List<CalendarEntity> findByDateBetween(LocalDate tomorrow, LocalDate thirtyDaysForward);
>>>>>>> Stashed changes
}
