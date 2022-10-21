package com.example.constructionappapi.services.businessLogicLayer.repositories.work;

import com.example.constructionappapi.services.dataAccessLayer.entities.WorkEntity;

import java.util.List;
import java.util.Optional;

public interface IWorkRepository {

    /**
     * Creates Work for customer using WorkEntity as param
     *
     * @param work
     * @return
     */
    WorkEntity createWorkEntity(WorkEntity work);

    /**
     * Edits existing work (if not existing it will use CreateWorkEntity())
     *
     * @param work
     * @return
     */
    WorkEntity editWorkEntity(WorkEntity work);

    /**
     * Returns all WorkEntities
     *
     * @return
     */
    List<WorkEntity> getAllWorkEntities();

    /**
     * Returns WorkEntity by ID
     *
     * @param id
     * @return
     */
    Optional<WorkEntity> getWorkEntity(Long id);

    /**
     * Deletes WorkEntity by ID
     *
     * @param id
     */
    void deleteWorkEntity(Long id);

    WorkEntity getLastInserted();
}
