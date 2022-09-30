package com.example.constructionappapi.services.dataAccessLayer.repositories;

import com.example.constructionappapi.services.dataAccessLayer.model.Costumer;
import com.example.constructionappapi.services.dataAccessLayer.DBAccessCostumer;
import com.example.constructionappapi.services.dataAccessLayer.entities.CostumerEntity;
import org.springframework.beans.BeanUtils;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

/**
 * Class accessing the costumer table in DB
 */
@Service
public class CostumerRepository implements IRepository {

    private DBAccessCostumer DBAccessCostumer;

    public CostumerRepository(DBAccessCostumer DBAccessCostumer) {
        this.DBAccessCostumer = DBAccessCostumer;
    }

    @Override
    public Costumer createKund(Costumer costumer) {
        CostumerEntity costumerEntity = new CostumerEntity();
        BeanUtils.copyProperties(costumer, costumerEntity);
        DBAccessCostumer.save(costumerEntity);
        return costumer;
    }

    @Override
    public List<Costumer> getAllKunder() {
        List<CostumerEntity> kundEntities = DBAccessCostumer.findAll();

        List<Costumer> kunder = kundEntities
                .stream()
                .map(kun -> new Costumer(kun.getId(), kun.getName()))
                .collect(Collectors.toList());
        return kunder;
    }
}
