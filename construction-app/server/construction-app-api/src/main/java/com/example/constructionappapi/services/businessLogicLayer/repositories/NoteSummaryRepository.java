package com.example.constructionappapi.services.businessLogicLayer.repositories;

import com.example.constructionappapi.services.dataAccessLayer.NoteStatus;
import com.example.constructionappapi.services.dataAccessLayer.dao.CustomerDao;
import com.example.constructionappapi.services.dataAccessLayer.dao.NoteSummaryDao;
import com.example.constructionappapi.services.dataAccessLayer.dao.WorkDao;
import com.example.constructionappapi.services.dataAccessLayer.entities.CustomerEntity;
import com.example.constructionappapi.services.dataAccessLayer.entities.CustomerNoteEntity;
import com.example.constructionappapi.services.dataAccessLayer.entities.NoteSummaryEntity;
import com.example.constructionappapi.services.dataAccessLayer.entities.WorkEntity;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

/**
 * Class accessing the customer note_summary table in DB
 */
@Service
public class NoteSummaryRepository {

    @Autowired
    private NoteSummaryDao noteSummaryDao;
    @Autowired
    private WorkDao workDao;

    @Transactional
    public NoteSummaryEntity createNoteSummary(NoteSummaryEntity noteSummary, long workId) {
        noteSummary.setDatePostedSum(LocalDate.now());
        Optional<WorkEntity> work = workDao.findById(workId);

        List<CustomerNoteEntity> summedNotes = new ArrayList<>();
        long kmDrivenSum = 0;
        long timeSpentSum = 0;
        long timeEmployeeSum = 0;

        if(work.isPresent()){
            List<CustomerNoteEntity> allNotes = work.get().getCustomerNotes();
            if(!allNotes.isEmpty()){
                for (CustomerNoteEntity customerNoteEntity : allNotes) {
                    if(customerNoteEntity.getDatePosted().getMonth().getValue() == noteSummary.getMonth() && customerNoteEntity.getNoteStatus() == NoteStatus.NOTSUMMARIZED){ //alla anteckningar för detta jobb med samma månad som summering
                        //räkna ihop all data
                        kmDrivenSum += Long.parseLong(customerNoteEntity.getKmDriven());
                        timeSpentSum += Long.parseLong(customerNoteEntity.getTimeSpend());
                        timeEmployeeSum += Long.parseLong(customerNoteEntity.getTimeEmployee());

                        customerNoteEntity.setNoteStatus(NoteStatus.SUMMARIZED); //sätt anteckningarna till avslutade
                        customerNoteEntity.setSummary(noteSummary); //varje avslutad anteckning får en summering
                        summedNotes.add(customerNoteEntity); //för att lägga till anteckningarna till Summary
                    }
                }

                noteSummary.setKmDrivenSum(String.valueOf(kmDrivenSum));
                noteSummary.setTimeSpendSum(String.valueOf(timeSpentSum));
                noteSummary.setTimeEmployeeSum(String.valueOf(timeEmployeeSum));

                noteSummary.setWorkNumber(workId);

                CustomerEntity customerEntity = work.get().getCustomer();
                noteSummary.setCustomer(customerEntity);

                String workName = work.get().getName();
                noteSummary.setWorkName(workName);

                //TODO tänker jag fel att lägga till från båda hållen?
                noteSummary.setCustomerNotes(summedNotes); //lägg till anteckningar till NoteSummary
                noteSummary.setWorkForSummary(work.get()); //assigna summary till work
                return noteSummaryDao.save(noteSummary);
            }

        }
        return null; //om jobbId inte existerar
    }


    public Optional<NoteSummaryEntity> getSumForWork(long workId) {
        Optional<NoteSummaryEntity> sum = noteSummaryDao.findByWorkNumber(workId);
        return sum;
    }

    public List<NoteSummaryEntity> getSumsForCustomer(long customerId) {
        List<NoteSummaryEntity> sum = noteSummaryDao.findAllByCustomerId(customerId);
        return sum;
    }
}
