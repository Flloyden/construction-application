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

    List<WorkEntity> findByStartDateBetween(LocalDate start, LocalDate end);

    List<WorkEntity> findByStartDate(LocalDate startdate);

    @Query(
            value = "SELECT * FROM work WHERE work.work_status = 1",
            nativeQuery = true
    )
    List<WorkEntity> findStartedWork();

    @Query(
            value = "SELECT * FROM work WHERE NOT work.work_status = 2",
            nativeQuery = true
    )
    List<WorkEntity> findAllUncompletedWork();


    @Query(
            value = "SELECT * FROM work WHERE work.work_status = 0",
            nativeQuery = true
    )
    List<WorkEntity> findNotStartedWork();

    @Query(value = "SELECT customer.*, work.*, calendar.* " +
            "FROM customer " +
            "INNER JOIN work ON customer.id = work.customer_id " +
            "INNER JOIN calendar ON work.id = calendar.work_id " +
            "WHERE DATE(calendar.date) = CURRENT_DATE",
            nativeQuery = true
    )

    List<WorkEntity> findWorkEntityForToday();

    List<WorkEntity> findAllByCustomerId(Long id);

    List<WorkEntity> findFirstByStartDateBetween(LocalDate today, LocalDate tenDaysForward);
}
