package com.example.constructionappapi.services.dataAccessLayer.dao;

import com.example.constructionappapi.services.dataAccessLayer.entities.CalendarEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
<<<<<<< Updated upstream
=======
import java.util.List;
import java.util.Optional;
>>>>>>> Stashed changes

/**
 * A class that gives access to interaction with table Calendar in the DB (save, find, delete,
 * etc, given by JpaRepository) through it's entity-class
 */
@Repository
public interface CalendarDao extends JpaRepository<CalendarEntity, Long> {
    CalendarEntity findFirstByDate(LocalDate date);

    void deleteAllByDate(LocalDate date);
<<<<<<< Updated upstream
=======

    @Transactional
    void deleteAllByWorkId(long id);

    List<CalendarEntity> findByDate(LocalDate date);
    ;
>>>>>>> Stashed changes
}
