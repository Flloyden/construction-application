package com.example.constructionappapi.services.dataAccessLayer.dao;

import com.example.constructionappapi.services.dataAccessLayer.entities.CustomerNoteEntity;
import com.example.constructionappapi.services.dataAccessLayer.entities.WorkEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

/**
 * A class that gives access to interaction with table Note in the DB (save, find, delete,
 * etc, given by JpaRepository) through it's entity-class
 */
@Repository
public interface CustomerNoteDao extends JpaRepository<CustomerNoteEntity, Long> {
    Optional<CustomerNoteEntity> findFirstByWork(WorkEntity workEntity);

    List<CustomerNoteEntity> findAllByCustomerId(Long customerId);

    List<CustomerNoteEntity> findAllByWorkId(Long workId);

    @Query(
            value = "SELECT * FROM customer_note WHERE customer_note.note_status = ?1 " +
                    "AND customer_note.work_number = ?2",
            nativeQuery = true
    )
    List<CustomerNoteEntity> findAllByWorkIdAndNoteStatus(int noteStatus, Long workId);

    List<CustomerNoteEntity> findAllBySummaryId(Long noteSummaryId);

    //CustomerNoteEntity findFirstByOrderByDatePostedDesc(Long workId);
}
