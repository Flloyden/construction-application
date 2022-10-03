package com.example.constructionappapi.services.businessLogicLayer.repositories;
import com.example.constructionappapi.services.dataAccessLayer.entities.CostumerEntity;

import java.util.List;

/**
 * A interface to function as a model for all the repositories
 */
public interface ICostumerRepository {
    CostumerEntity createCustomer(CostumerEntity customer);

    List<CostumerEntity> getAllCustomers();
}
