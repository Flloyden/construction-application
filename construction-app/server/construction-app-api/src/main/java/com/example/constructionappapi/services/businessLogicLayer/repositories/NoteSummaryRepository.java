package com.example.constructionappapi.services.businessLogicLayer.repositories;

import com.example.constructionappapi.services.dataAccessLayer.dao.CustomerNoteDao;
import com.example.constructionappapi.services.dataAccessLayer.dao.NoteSummaryDao;
import com.example.constructionappapi.services.dataAccessLayer.entities.CustomerEntity;
import com.example.constructionappapi.services.dataAccessLayer.entities.CustomerNoteEntity;
import com.example.constructionappapi.services.dataAccessLayer.entities.NoteSummaryEntity;
import com.example.constructionappapi.services.dataAccessLayer.entities.WorkEntity;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class NoteSummaryRepository {

    @Autowired
    private NoteSummaryDao noteSummaryDao;
    @Autowired
    private WorkRepository workRepository;


    public NoteSummaryEntity createNoteSummary(NoteSummaryEntity noteSummary, long workId) {

        //TODO sätt datum korrekt
        //TODO alla notes till detta jobb inom denna månad skall sättas till SUMMARIZED
        //TODO alla notes till denna summary skall sättas
        Optional<WorkEntity> workEntity = workRepository.getWorkEntity(workId);

        noteSummary.setWorkForSummary(workEntity.get()); //assigna summary till work

        return noteSummaryDao.save(noteSummary);
    }


}
