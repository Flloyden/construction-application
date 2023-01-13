package com.example.constructionappapi.services.dataAccessLayer.dao;

import com.example.constructionappapi.services.dataAccessLayer.entities.AccountingEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.List;

/**
 * A class that gives access to interaction with the table accounting in the DB (save, find, update, delete,
 * etc, given by JpaRepository). Accounting representing guarantee/"accounting"/warranty.
 */
@Repository
public interface AccountingDao extends JpaRepository<AccountingEntity, Long> {
    @Query(
            value = "SELECT * FROM accounting WHERE accounting.status = 1",
            nativeQuery = true
    )
    List<AccountingEntity> getOldAccountings();


    @Query(
            value = "SELECT * FROM accounting WHERE accounting.status = 0",
            nativeQuery = true
    )
    List<AccountingEntity> getActiveAccountings();


    @Modifying
    @Transactional
    @Query(
            value = "UPDATE accounting a " +
                    "SET a.status = 1 " +
                    "WHERE DATE(a.warranty_date) <= :today " +
                    "AND a.status = 0",
            nativeQuery = true)
    int updateOldAccountingStatus(@Param("today") LocalDate today);

}
