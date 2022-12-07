package com.example.constructionappapi.services.businessLogicLayer.repositories;

import com.example.constructionappapi.services.dataAccessLayer.dao.CustomerNoteDao;
import com.example.constructionappapi.services.dataAccessLayer.entities.*;
import com.fasterxml.jackson.databind.DatabindException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.DayOfWeek;
import java.time.LocalDate;
import java.time.Month;
import java.time.format.DateTimeFormatter;
import java.util.Date;
import java.util.List;
import java.util.Optional;

/**
 * Class accessing the customer note table in DB
 */
@Service
public class CustomerNoteRepository {

    @Autowired
    private CustomerNoteDao customerNoteDao;
    @Autowired
    private WorkRepository workRepository;

    private WorkEntity workEntity;

    private DateTimeFormatter dateTimeFormatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");


    public CustomerNoteEntity createCustomerNote(CustomerNoteEntity customerNote, long workId) {

        Optional<WorkEntity> workEntity = workRepository.getWorkEntity(workId);

        List<CustomerNoteEntity> allNotesForThisWork = workEntity.get().getCustomerNotes();

        if(workEntity.get().getCustomerNotes().isEmpty()){ //om detta är första anteckningen för jobbet
            customerNote.setDatePosted(workEntity.get().getStartDate()); //datum för anteckningen blir första dagen på jobbet
        }
        else { //annars sätt datumet på anteckningen till dagen efter senaste anteckningen

            /** vet ej hur man implementerar dessa queries
            CustomerNoteEntity lastNote = customerNoteDao.findFirstByOrderByDatePostedDesc(workId);
            LocalDate dateLastNote = lastNote.getDatePosted();
            long m = 0L;
            LocalDate dateToAdd = dateLastNote.plusDays(m);
            while (dateToAdd.getDayOfWeek() == DayOfWeek.SATURDAY || dateToAdd.getDayOfWeek() == DayOfWeek.SUNDAY) {
                dateToAdd = dateToAdd.plusDays(1);
                m++;
            }
            **/


            LocalDate dateLastNote = null;
            for (int i = 0; i < allNotesForThisWork.size(); i++) {
                if(i == (allNotesForThisWork.size()) - 1){ //sista anteckningen
                    dateLastNote = allNotesForThisWork.get(i).getDatePosted(); //hämta datumet
                }
            }

            long n = 0L;
            LocalDate dateToAdd2 = dateLastNote.plusDays(n);
            while (dateToAdd2.getDayOfWeek() == DayOfWeek.SATURDAY || dateToAdd2.getDayOfWeek() == DayOfWeek.SUNDAY) {
                dateToAdd2 = dateToAdd2.plusDays(1);
                n++;
            }


            customerNote.setDatePosted(dateToAdd2);
        }



        CustomerEntity customerEntity = workEntity.get().getCustomer(); //hämta customer till det jobbet

        customerNote.setCustomer(customerEntity); //assignar note till customer
        customerNote.setWorkForNote(workEntity.get()); //assigna note till work

        return customerNoteDao.save(customerNote);
    }




    public List<CustomerNoteEntity> getAllNotesForWork(long workId) {
        Optional<WorkEntity> workEntity = workRepository.getWorkEntity(workId);
        return workEntity.get().getCustomerNotes();
    }

    public List<CustomerNoteEntity> getAllNotesByCustomerId(long customerId) {
        return customerNoteDao.findAllByCustomerId(customerId);
    }

    public void deleteNote(Long noteId) {
        customerNoteDao.deleteById(noteId);
    }
}
