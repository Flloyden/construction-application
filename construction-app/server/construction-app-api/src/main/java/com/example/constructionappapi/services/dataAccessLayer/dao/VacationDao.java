package com.example.constructionappapi.services.dataAccessLayer.dao;

import com.example.constructionappapi.services.dataAccessLayer.entities.VacationEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;


/**
 * A class that gives access to interaction with the table vacation in the DB (save, find, update, delete,
 * etc, given by JpaRepository).
 */
@Repository
public interface VacationDao extends JpaRepository<VacationEntity, Long> {

    @Query(
            value = "SELECT * FROM vacation WHERE vacation.work_status = 1",
            nativeQuery = true
    )
    List<VacationEntity> findAllStartedVacations();


    @Query(
            value = "SELECT * FROM vacation WHERE vacation.work_status = 0",
            nativeQuery = true
    )
    List<VacationEntity> findNotStartedVacations();

    @Query(
            value = "SELECT * FROM vacation WHERE NOT vacation.work_status = 2",
            nativeQuery = true
    )
    List<VacationEntity> findAllNotFinishedVacation();
}
