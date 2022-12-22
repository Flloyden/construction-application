package com.example.constructionappapi.services.dataAccessLayer.dao;

import com.example.constructionappapi.services.dataAccessLayer.entities.NoteSummaryEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

/**
 * A class that gives access to interaction with table note_summary in the DB (save, find, delete,
 * etc, given by JpaRepository) through it's entity-class
 */
@Repository
public interface NoteSummaryDao extends JpaRepository<NoteSummaryEntity, Long> {

    Optional<NoteSummaryEntity> findByWorkNumber(Long workId);

    List<NoteSummaryEntity> findAllByWorkNumber(Long workId);

    List<NoteSummaryEntity> findAllByCustomerId(Long customerId);

}
