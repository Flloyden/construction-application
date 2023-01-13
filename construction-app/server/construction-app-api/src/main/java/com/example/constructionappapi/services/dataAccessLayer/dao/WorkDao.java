package com.example.constructionappapi.services.dataAccessLayer.dao;

import com.example.constructionappapi.services.dataAccessLayer.entities.WorkEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;


/**
 * A class that gives access to interaction with the table work in the DB (save, find, update, delete,
 * etc, given by JpaRepository).
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


    List<WorkEntity> findAllByCustomerId(Long id);

    @Query(value = "SELECT work.* " +
            "FROM customer " +
            "INNER JOIN work ON customer.id = work.customer_id " +
            "INNER JOIN calendar ON work.id = calendar.work_id " +
            "WHERE DATE(calendar.date) = CURRENT_DATE AND work_status = ?1 ",
            nativeQuery = true
    )
    List<WorkEntity> findWorkEntityForToday(int workStatus);

    @Query(value = "SELECT work.*" +
            "FROM customer " +
            "INNER JOIN work ON customer.id = work.customer_id " +
            "INNER JOIN calendar ON work.id = calendar.work_id " +
            "WHERE DATE(calendar.date) = DATE_ADD(CURRENT_DATE, INTERVAL -1 DAY) AND work_status = ?1",
            nativeQuery = true
    )
    List<WorkEntity> findWorkEntityForTodayIfSaturday(int workStatus);

    @Query(value = "SELECT work.* " +
            "FROM customer " +
            "INNER JOIN work ON customer.id = work.customer_id " +
            "INNER JOIN calendar ON work.id = calendar.work_id " +
            "WHERE DATE(calendar.date) = DATE_ADD(CURRENT_DATE, INTERVAL -2 DAY) AND work_status = ?1",
            nativeQuery = true
    )
    List<WorkEntity> findWorkEntityForTodayIfSunday(int workStatus);

    @Query(value = "SELECT w.* FROM work w " +
            "INNER JOIN customer c ON c.id=w.customer_id " +
            "INNER JOIN calendar ca ON w.id = ca.work_id " +
            "WHERE start_date BETWEEN ?1 AND ?2 AND work_status = ?3 ORDER BY start_date ASC LIMIT 1",
            nativeQuery = true)
    List<WorkEntity> findFirstByStartDateBetweenAndWorkStatus(LocalDate tomorrow, LocalDate tenDaysForward, int workStatus);

    @Query(value = "SELECT w.* FROM work w " +
            "INNER JOIN customer c ON c.id=w.customer_id " +
            "INNER JOIN calendar ca ON w.id = ca.work_id " +
            "WHERE start_date BETWEEN ?1 AND ?2 ORDER BY start_date ASC LIMIT 1",
            nativeQuery = true)
    List<WorkEntity> findFirstByStartDateBetween(LocalDate tomorrow, LocalDate tenDaysForward);
}
