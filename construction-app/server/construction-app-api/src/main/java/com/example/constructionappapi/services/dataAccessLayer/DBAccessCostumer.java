package com.example.constructionappapi.services.dataAccessLayer;

import com.example.constructionappapi.services.dataAccessLayer.entities.CostumerEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
/**
 * A class that gives access to interaction with Costumer in the DB (save, find, delete, etc) through predefined
 * functions in JpaRepository and the key ID in class costumer
 */
public interface DBAccessCostumer extends JpaRepository<CostumerEntity, Long> //long bcs Costumer id is datatype long
{
}
