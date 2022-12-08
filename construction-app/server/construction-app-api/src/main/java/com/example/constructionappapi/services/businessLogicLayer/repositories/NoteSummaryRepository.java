package com.example.constructionappapi.services.businessLogicLayer.repositories;

import com.example.constructionappapi.services.dataAccessLayer.NoteStatus;
import com.example.constructionappapi.services.dataAccessLayer.dao.NoteSummaryDao;
import com.example.constructionappapi.services.dataAccessLayer.entities.CustomerNoteEntity;
import com.example.constructionappapi.services.dataAccessLayer.entities.NoteSummaryEntity;
import com.example.constructionappapi.services.dataAccessLayer.entities.WorkEntity;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class NoteSummaryRepository {

    @Autowired
    private NoteSummaryDao noteSummaryDao;
    @Autowired
    private WorkRepository workRepository;

    @Transactional
    public NoteSummaryEntity createNoteSummary(NoteSummaryEntity noteSummary, long workId) {
        Optional<WorkEntity> workEntity = workRepository.getWorkEntity(workId);
        List<CustomerNoteEntity> summedNotes = new ArrayList<>();
        long kmDrivenSum = 0;
        long timeSpentSum = 0;
        long timeEmployeeSum = 0;

        if(workEntity.isPresent()){
            List<CustomerNoteEntity> allNotes = workEntity.get().getCustomerNotes();
            if(!allNotes.isEmpty()){
                for (CustomerNoteEntity customerNoteEntity : allNotes) {
                    if(customerNoteEntity.getDatePosted().getMonth() == noteSummary.getMonth()){ //alla anteckningar för detta jobb med samma månad som summering
                        System.out.println("-----------------från ifsats kolla månad");
                        kmDrivenSum += Long.parseLong(customerNoteEntity.getKmDriven());
                        timeSpentSum += Long.parseLong(customerNoteEntity.getTimeSpend());
                        timeEmployeeSum += Long.parseLong(customerNoteEntity.getTimeEmployee());
                        customerNoteEntity.setNoteSummaryEntity(noteSummary); //varje avslutad anteckning har en summering
                        System.out.println("1");
                        System.out.println("månad note " + customerNoteEntity.getDatePosted().getMonth());
                        System.out.println("månad för summeringen " + noteSummary.getMonth());
                        customerNoteEntity.setNoteStatus(NoteStatus.SUMMARIZED); //sätt anteckningarna till avslutade
                        System.out.println("2");
                        summedNotes.add(customerNoteEntity);
                        System.out.println("3");
                    }
                }

                noteSummary.setKmDrivenSum(String.valueOf(kmDrivenSum));
                noteSummary.setTimeSpendSum(String.valueOf(timeSpentSum));
                noteSummary.setTimeEmployeeSum(String.valueOf(timeEmployeeSum));
            }

        }

        System.out.println("4");
        //lägg till anteckningar till NoteSummary
        noteSummary.setCustomerNotes(summedNotes);

        System.out.println("5");
        noteSummary.setWorkForSummary(workEntity.get()); //assigna summary till work

        System.out.println("6");
        return noteSummaryDao.save(noteSummary);
    }


    public List<NoteSummaryEntity> getSumForWork(long workId) {
        return noteSummaryDao.findByWorkId(workId);
    }
}
