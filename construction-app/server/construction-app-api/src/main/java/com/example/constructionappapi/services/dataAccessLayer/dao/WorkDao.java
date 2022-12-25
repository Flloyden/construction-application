package com.example.constructionappapi.services.dataAccessLayer.dao;

import com.example.constructionappapi.services.dataAccessLayer.entities.CalendarEntity;
import com.example.constructionappapi.services.dataAccessLayer.entities.CustomerEntity;
import com.example.constructionappapi.services.dataAccessLayer.entities.WorkEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
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

    @Query(value = "SELECT customer.*, work.*, calendar.* " +
            "FROM customer " +
            "INNER JOIN work ON customer.id = work.customer_id " +
            "INNER JOIN calendar ON work.id = calendar.work_id " +
            "WHERE DATE(calendar.date) = CURRENT_DATE",
            nativeQuery = true
    )
    List<WorkEntity> findWorkEntityForToday();

    @Query(value = "SELECT customer.*, work.*, calendar.* " +
            "FROM customer " +
            "INNER JOIN work ON customer.id = work.customer_id " +
            "INNER JOIN calendar ON work.id = calendar.work_id " +
            "WHERE DATE(calendar.date) = DATEADD(day, -1, CURRENT_DATE)",
            nativeQuery = true
    )
    List<WorkEntity> findWorkEntityForTodayIfSaturday();

    @Query(value = "SELECT customer.*, work.*, calendar.* " +
            "FROM customer " +
            "INNER JOIN work ON customer.id = work.customer_id " +
            "INNER JOIN calendar ON work.id = calendar.work_id " +
            "WHERE DATE(calendar.date) = DATEADD(day, -2, CURRENT_DATE)",
            nativeQuery = true
    )
    List<WorkEntity> findWorkEntityForTodayIfSunday();

    @Query(value = "SELECT w.* FROM construction_system.work w "+
            "INNER JOIN customer c ON c.id=w.customer_id " +
            "INNER JOIN calendar ca ON w.id = ca.work_id " +
            "WHERE start_date BETWEEN ?1 AND ?2 AND work_status = ?3 ORDER BY start_date ASC LIMIT 1",
            nativeQuery = true)
    List<WorkEntity> findFirstByStartDateBetweenAndWorkStatus(LocalDate tomorrow, LocalDate tenDaysForward, int workStatus);
}
