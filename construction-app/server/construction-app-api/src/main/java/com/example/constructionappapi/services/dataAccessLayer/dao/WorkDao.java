package com.example.constructionappapi.services.dataAccessLayer.dao;

import com.example.constructionappapi.services.dataAccessLayer.entities.CalendarEntity;
import com.example.constructionappapi.services.dataAccessLayer.entities.WorkEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;


/**
 * A class that gives access to interaction with table Work in the DB (save, find, delete,
 * etc, given by JpaRepository) through it's entity-class
 */
@Repository
public interface WorkDao extends JpaRepository<WorkEntity, Long> {
    Optional<WorkEntity> findFirstByOrderByIdDesc();

    List<WorkEntity> findByStartDateBetween(LocalDate start, LocalDate end);

    List<WorkEntity> findByStartDate(LocalDate startdate);

}
