package com.example.constructionappapi.services.dataAccessLayer.dao;

import com.example.constructionappapi.services.dataAccessLayer.entities.CustomerNoteEntity;
import com.example.constructionappapi.services.dataAccessLayer.entities.WorkEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

/**
 * A class that gives access to interaction with the table customer_note in the DB (save, find, update, delete,
 * etc, given by JpaRepository).
 */
@Repository
public interface CustomerNoteDao extends JpaRepository<CustomerNoteEntity, Long> {
    Optional<CustomerNoteEntity> findFirstByWork(WorkEntity workEntity);

    List<CustomerNoteEntity> findAllByWorkId(Long workId);

    @Query(
            value = "SELECT * FROM customer_note WHERE customer_note.note_status = ?1 " +
                    "AND customer_note.work_number = ?2",
            nativeQuery = true
    )
    List<CustomerNoteEntity> findAllByWorkIdAndNoteStatus(int noteStatus, Long workId);

    List<CustomerNoteEntity> findAllBySummaryId(Long noteSummaryId);

}
