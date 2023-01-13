package com.example.constructionappapi.services.dataAccessLayer.dao;

import com.example.constructionappapi.services.dataAccessLayer.entities.NoteSummaryEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * A class that gives access to interaction with the table note_summary in the DB (save, find, update, delete,
 * etc, given by JpaRepository).
 */
@Repository
public interface NoteSummaryDao extends JpaRepository<NoteSummaryEntity, Long> {

    List<NoteSummaryEntity> findAllByWorkNumber(Long workId);

    List<NoteSummaryEntity> findAllByCustomerId(Long customerId);

}
