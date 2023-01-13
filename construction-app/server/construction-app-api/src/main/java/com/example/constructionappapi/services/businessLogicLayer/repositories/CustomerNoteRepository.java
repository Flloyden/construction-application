package com.example.constructionappapi.services.businessLogicLayer.repositories;

import com.example.constructionappapi.services.dataAccessLayer.NoteStatus;
import com.example.constructionappapi.services.dataAccessLayer.dao.CustomerNoteDao;
import com.example.constructionappapi.services.dataAccessLayer.dao.NoteSummaryDao;
import com.example.constructionappapi.services.dataAccessLayer.dao.WorkDao;
import com.example.constructionappapi.services.dataAccessLayer.entities.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.*;

/**
 * This class is the middle-man between the Presentation Layer and the Data Access Layer.
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

    /**
     * Creates or edits a note for a work.
     *
     * @param customerNoteEntity
     * @param workId
     * @return null if work is not found, otherwise the saved NoteEntity.
     */
    @Transactional //@Transactional is necessary for getDateForNewNote();
    public CustomerNoteEntity createCustomerNote(CustomerNoteEntity customerNoteEntity, long workId) {
        Optional<WorkEntity> work = workDao.findById(workId);

        if (work.get().getNumberOfDays() == work.get().getCustomerNotes().size()) {
            return null;
        }

        LocalDate dateToAdd;
        if (!customerNoteDao.existsById(customerNoteEntity.getId())) { //if this is a new note, get date for note depending on when the last note was written
            dateToAdd = getDateForNewNote(workId);

            if (dateToAdd == null) {
                return null;
            }

            customerNoteEntity.setDatePosted(dateToAdd);
        } else {
            //if this is an old note that is being edited, the date is the same
            Optional<CustomerNoteEntity> oldNote = customerNoteDao.findById(customerNoteEntity.getId());
            customerNoteEntity.setDatePosted(oldNote.get().getDatePosted());
        }

        CustomerEntity customerEntity = work.get().getCustomer();
        customerNoteEntity.setCustomer(customerEntity);
        customerNoteEntity.setWorkForNote(work.get());
        customerNoteEntity.setNoteStatus(NoteStatus.NOTSUMMARIZED);

        return customerNoteDao.save(customerNoteEntity);

    }

    /**
     * Saves a CustomerNoteEntity to the database.
     *
     * @param customerNote CustomerNoteEntity to save.
     * @return The saved CustomerNoteEntity.
     */
    public CustomerNoteEntity editCustomerNote(CustomerNoteEntity customerNote) {
        return customerNoteDao.save(customerNote);
    }

    /**
     * If a new note is saved, and it is the first note made for the work, the date of the note will be the same date as the date of the first work day.
     * Otherwise the date for the note will be the same date as the date for the work day that is scheduled after the last note that was made.
     *
     * @param workId
     * @return null if something went wrong, otherwise the date for the note.
     */
    public LocalDate getDateForNewNote(long workId) {

        Optional<WorkEntity> work = workDao.findById(workId);
        List<CustomerNoteEntity> allNotesForThisWork = work.get().getCustomerNotes();

        if (allNotesForThisWork.isEmpty()) { //if this note is the first one made for the work, the date of the note will be the same as first work day
            return (work.get().getStartDate());
        } else { //otherwise, the date for the note will be the same as the next workday on the job
            LocalDate dateLastNote = null;

            for (int i = 0; i < allNotesForThisWork.size(); i++) {
                if (i == (allNotesForThisWork.size()) - 1) { //Get the date of the last note being made for this work
                    dateLastNote = allNotesForThisWork.get(i).getDatePosted();
                }
            }

            List<CalendarEntity> workCalendar = work.get().getCalendar();

            //kolla igenom alla datum i jobbkalender och hitta första datumet efter senaste anteckningen
            for (CalendarEntity calendarEntity : workCalendar) {
                if (calendarEntity.getDate().isAfter(dateLastNote)) { //datumet efter förra anteckningen
                    return calendarEntity.getDate();
                }
            }
            return null;

        }
    }

    /**
     * Deletes the customer note from the database with the specified ID.
     *
     * @param noteId ID of the customer note to delete.
     */
    public void deleteNote(Long noteId) {
        if (customerNoteDao.existsById(noteId)) {
            customerNoteDao.deleteById(noteId);
        }
    }

    /**
     * Fetches all customer notes for one summary.
     *
     * @param sumId
     * @return List of all the notes.
     */
    public List<CustomerNoteEntity> getAllNotesForSum(long sumId) {
        if (noteSummaryDao.existsById(sumId)) {
            return customerNoteDao.findAllBySummaryId(sumId);
        }
        return null;
    }
}
