package com.example.constructionappapi.services.businessLogicLayer.repositories;

import com.example.constructionappapi.services.businessLogicLayer.Calendar;
import com.example.constructionappapi.services.dataAccessLayer.NoteStatus;
import com.example.constructionappapi.services.dataAccessLayer.dao.CalendarDao;
import com.example.constructionappapi.services.dataAccessLayer.dao.CustomerNoteDao;
import com.example.constructionappapi.services.dataAccessLayer.dao.NoteSummaryDao;
import com.example.constructionappapi.services.dataAccessLayer.dao.WorkDao;
import com.example.constructionappapi.services.dataAccessLayer.entities.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.DayOfWeek;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.*;

/**
 * Class accessing the customer note table in DB
 */
@Service
public class CustomerNoteRepository {

    @Autowired
    private CustomerNoteDao customerNoteDao;
    @Autowired
    private NoteSummaryDao noteSummaryDao;
    @Autowired
    private WorkDao workDao;
    @Autowired
    private WorkRepository workRepository;

    private DateTimeFormatter dateTimeFormatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");

    private HashMap<VacationCalendarEntity, VacationEntity> vacationDates = new HashMap<>();

    private Calendar calendar;


    @Transactional //krävs för getDateForNewNote();
    public CustomerNoteEntity createCustomerNote(CustomerNoteEntity customerNoteEntity, long workId) {

        Optional<WorkEntity> work = workDao.findById(workId);

        if(work.get().getNumberOfDays() == work.get().getCustomerNotes().size()){
            return null;
        }

        LocalDate dateToAdd;
        if(!customerNoteDao.existsById(customerNoteEntity.getId())){ //om ny anteckning
            dateToAdd = getDateForNewNote(workId);

            if(dateToAdd == null){
                return null;
            }

            customerNoteEntity.setDatePosted(dateToAdd);
        }else{ //om gammal anteckning som redigeras
            Optional<CustomerNoteEntity> oldNote = customerNoteDao.findById(customerNoteEntity.getId());
            customerNoteEntity.setDatePosted(oldNote.get().getDatePosted());
        }

        CustomerEntity customerEntity = work.get().getCustomer(); //hämta customer till det jobbet
        customerNoteEntity.setCustomer(customerEntity); //assignar note till customer
        customerNoteEntity.setWorkForNote(work.get()); //assigna note till work

        return customerNoteDao.save(customerNoteEntity);

    }

    public CustomerNoteEntity editCustomerNote(CustomerNoteEntity customerNote) {
        return customerNoteDao.save(customerNote);
    }


    public LocalDate getDateForNewNote(long workId){

        Optional<WorkEntity> work = workDao.findById(workId);
        List<CustomerNoteEntity> allNotesForThisWork = work.get().getCustomerNotes();

        if(work.get().getCustomerNotes().isEmpty()){ //om detta är första anteckningen för jobbet så blir datum för anteckningen första dagen på jobbet
            return (work.get().getStartDate());
        }
        else { //annars sätt datumet på anteckningen till jobbdagen efter senaste anteckningen
            LocalDate dateLastNote = null;

            for (int i = 0; i < allNotesForThisWork.size(); i++) {
                if(i == (allNotesForThisWork.size()) - 1){ //Hämta datum på senaste anteckningen //TODO detta går att göra snyggare med korrekt funktion i Dao?
                    dateLastNote = allNotesForThisWork.get(i).getDatePosted();
                }
            }

            List<CalendarEntity> workCalendar = work.get().getCalendar();
                    //calendarDao.findAllByWorkId(workId) ; //kalender för jobbet som anteckningen tillhör

            if(workCalendar.isEmpty()){
                System.out.println("-----------------workCalendar empty!!!!");
            }
            //kolla igenom alla datum i jobbkalender och hitta första datumet efter senaste anteckningen
            for(CalendarEntity calendarEntity : workCalendar) {
                if (calendarEntity.getDate().isAfter(dateLastNote)) { //datumet efter förra anteckningen
                    return calendarEntity.getDate();
                }
            }
            return null;

        }
    }

    public List<CustomerNoteEntity> getAllNotesForOneSum(long sumNoteId) {
        return customerNoteDao.findAllBySummaryId(sumNoteId);

    }

    public List<CustomerNoteEntity> getAllNotesByWorkId(long workId) {
        return customerNoteDao.findAllByWorkId(workId);
    }

    public List<CustomerNoteEntity> getAllSummarizedNotesForWork(long workId) {
        List<CustomerNoteEntity> allNotes = customerNoteDao.findAllByWorkId(workId);
        List<CustomerNoteEntity> summarizedNotes = new ArrayList<>();

        for (CustomerNoteEntity customerNoteEntity : allNotes) {
            NoteStatus noteStatus = customerNoteEntity.getNoteStatus();
            if(noteStatus == NoteStatus.SUMMARIZED){
                summarizedNotes.add(customerNoteEntity);
            }
        }

        return summarizedNotes;
    }

    public List<CustomerNoteEntity> getAllNotSummarizedNotesForWork(long workId) {
        List<CustomerNoteEntity> allNotes = customerNoteDao.findAllByWorkId(workId);
        List<CustomerNoteEntity> nonSummarizedNotes = new ArrayList<>();

        for (CustomerNoteEntity customerNoteEntity : allNotes) {
            NoteStatus noteStatus = customerNoteEntity.getNoteStatus();
            if(noteStatus == NoteStatus.NOTSUMMARIZED){
                nonSummarizedNotes.add(customerNoteEntity);
            }
        }

        return nonSummarizedNotes;
    }

    public List<CustomerNoteEntity> getAllNotesByCustomerId(long customerId) {
        return customerNoteDao.findAllByCustomerId(customerId);
    }

    public List<CustomerNoteEntity> getAllSummarizedNotesForCustomer(long customerId) {
        List<CustomerNoteEntity> allNotes = customerNoteDao.findAllByCustomerId(customerId);
        List<CustomerNoteEntity> summarizedNotes = null;

        for (CustomerNoteEntity customerNoteEntity : allNotes) {
            NoteStatus noteStatus = customerNoteEntity.getNoteStatus();
            if(noteStatus == NoteStatus.SUMMARIZED){
                summarizedNotes.add(customerNoteEntity);
            }
        }

        return summarizedNotes;
    }

    public List<CustomerNoteEntity> getAllNotSummarizedNotesForCustomer(long customerId) {
        List<CustomerNoteEntity> allNotes = customerNoteDao.findAllByCustomerId(customerId);
        List<CustomerNoteEntity> nonSummarizedNotes = new ArrayList<>();

        for (CustomerNoteEntity customerNoteEntity : allNotes) {
            NoteStatus noteStatus = customerNoteEntity.getNoteStatus();
            if(noteStatus == NoteStatus.NOTSUMMARIZED){
                nonSummarizedNotes.add(customerNoteEntity);
            }
        }

        return nonSummarizedNotes;
    }



    public void deleteNote(Long noteId) {
        if(customerNoteDao.existsById(noteId)){
           customerNoteDao.deleteById(noteId);
        }
    }

    public List<CustomerNoteEntity> getAllNotesForSum(long sumId) {
        if(noteSummaryDao.existsById(sumId)){
            return customerNoteDao.findAllBySummaryId(sumId);
        }
        return null;
    }
}
