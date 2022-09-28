package com.example.constructionappapi.services;

import com.example.constructionappapi.entities.KundEntity;
import com.example.constructionappapi.model.Kund;
import com.example.constructionappapi.reposity.KundRepository;
import org.springframework.beans.BeanUtils;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class KundServicelmml implements KundService {

    private KundRepository kundRepository;

    public KundServicelmml(KundRepository kundRepository) {
        this.kundRepository = kundRepository;
    }

    @Override
    public Kund createKund(Kund kund) {
        KundEntity kundEntity = new KundEntity();
        BeanUtils.copyProperties(kund, kundEntity);
        kundRepository.save(kundEntity);
        return kund;
    }

    @Override
    public List<Kund> getAllKunder() {
        List<KundEntity> kundEntities = kundRepository.findAll();

        List<Kund> kunder = kundEntities
                .stream()
                .map(kun -> new Kund(kun.getId(), kun.getName()))
                .collect(Collectors.toList());
        return kunder;
    }
}
