package com.example.constructionappapi.services.dataAccessLayer.dao;

import com.example.constructionappapi.services.dataAccessLayer.entities.NoteSummaryEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

/**
 * A class that gives access to interaction with the table note_summary in the DB (save, find, update, delete,
 * etc, given by JpaRepository).
 */
@Repository
public interface NoteSummaryDao extends JpaRepository<NoteSummaryEntity, Long> {

    List<NoteSummaryEntity> findAllByWorkNumber(Long workId);

    List<NoteSummaryEntity> findAllByCustomerId(Long customerId);

    @Query(
            value = "SELECT * FROM note_summary ns " +
                    "WHERE ns.work_number = :workId " +
                    "ORDER BY ns.date_posted_sum DESC ",
            nativeQuery = true
    )
    List<NoteSummaryEntity> findLatestSumForWork(@Param("workId") Long workId);

}
