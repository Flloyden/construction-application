package com.example.constructionappapi.services.dataAccessLayer.repositories;
import com.example.constructionappapi.services.dataAccessLayer.model.Costumer;

import java.util.List;

/**
 * A interface to function as a model for all the Db repositories
 */
public interface IRepository {
    Costumer createKund(Costumer costumer);

    List<Costumer> getAllKunder();
}
