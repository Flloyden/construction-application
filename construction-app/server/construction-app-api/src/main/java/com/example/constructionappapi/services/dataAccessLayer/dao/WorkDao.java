package com.example.constructionappapi.services.dataAccessLayer.dao;

import com.example.constructionappapi.services.dataAccessLayer.entities.WorkEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

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

    List<WorkEntity> findBySoftStartDateBetweenOrHardStartDateBetween(LocalDate softStartDateStart, LocalDate softStartDateEnd, LocalDate hardStartDateStart, LocalDate hardStartDateEnd);

    List<WorkEntity> findBySoftStartDateOrHardStartDate(LocalDate softStartDate, LocalDate hardStartDate);

    List<WorkEntity> findByStartDate(LocalDate startdate);

    @Query(value = "SELECT customer.*, work.*, calendar.* " +
            "FROM customer " +
            "INNER JOIN work ON customer.id = work.customer_id " +
            "INNER JOIN calendar ON work.id = calendar.work_id " +
            "WHERE DATE(calendar.date) = CURRENT_DATE",
            nativeQuery = true
    )

    List<WorkEntity> findWorkEntityForToday();

    List<WorkEntity> findAllByCustomerId(Long id);
}
