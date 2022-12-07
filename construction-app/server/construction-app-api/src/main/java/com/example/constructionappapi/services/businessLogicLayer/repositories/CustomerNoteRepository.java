package com.example.constructionappapi.services.businessLogicLayer.repositories;

import com.example.constructionappapi.services.businessLogicLayer.Calendar;
import com.example.constructionappapi.services.dataAccessLayer.NoteStatus;
import com.example.constructionappapi.services.dataAccessLayer.dao.CustomerNoteDao;
import com.example.constructionappapi.services.dataAccessLayer.dao.WorkDao;
import com.example.constructionappapi.services.dataAccessLayer.entities.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.DayOfWeek;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.HashMap;
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
    private WorkDao workDao;
    @Autowired
    private WorkRepository workRepository;

    private DateTimeFormatter dateTimeFormatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");

    private HashMap<VacationCalendarEntity, VacationEntity> vacationDates = new HashMap<>();

    private Calendar calendar;


    public CustomerNoteEntity createCustomerNote(CustomerNoteEntity customerNoteEntity, long workId) {
        Optional<WorkEntity> workEntityFromId = workRepository.getWorkEntity(workId);

        LocalDate dateToAdd = getDateForNewNote(workId);

        if(dateToAdd == null){
            return null;
        }

        customerNoteEntity.setDatePosted(dateToAdd);

        CustomerEntity customerEntity = workEntityFromId.get().getCustomer(); //hämta customer till det jobbet

        customerNoteEntity.setCustomer(customerEntity); //assignar note till customer
        customerNoteEntity.setWorkForNote(workEntityFromId.get()); //assigna note till work

        return customerNoteDao.save(customerNoteEntity);

    }


    public LocalDate getDateForNewNote(long workId){

        Optional<WorkEntity> workEntityFromId = workRepository.getWorkEntity(workId);
        List<CustomerNoteEntity> allNotesForThisWork = workEntityFromId.get().getCustomerNotes();

        //om detta är första anteckningen för jobbet
        if(workEntityFromId.get().getCustomerNotes().isEmpty()){
            return (workEntityFromId.get().getStartDate()); //datum för anteckningen blir första dagen på jobbet
        }
        else { //annars sätt datumet på anteckningen till dagen efter senaste anteckningen
            LocalDate dateLastNote = null;
            for (int i = 0; i < allNotesForThisWork.size(); i++) {
                if(i == (allNotesForThisWork.size()) - 1){ //Hämta datum på senaste anteckningen
                    dateLastNote = allNotesForThisWork.get(i).getDatePosted();
                }
            }
            System.out.println("--------------------------DATELASTNOTE: " + dateLastNote.toString());

            LocalDate dateToAdd2 = dateLastNote.plusDays(1); //nästa anteckningsdatum

            //om semester eller helger ligger i vägen.
            while(vacationDates.containsKey(new VacationCalendarEntity(dateToAdd2)) || dateToAdd2.getDayOfWeek() == DayOfWeek.SATURDAY || dateToAdd2.getDayOfWeek() == DayOfWeek.SUNDAY){
                dateToAdd2 = dateToAdd2.plusDays(1);
            }

            System.out.println("---------------------DATETOADD: " + dateToAdd2);
            return dateToAdd2;



            /* -----------------TODO eg använda något sånt här, inte hårdkoda var nästa datum ska vara utan faktiskt kolla hur jobbet ligger....

            HashMap<CalendarEntity, WorkEntity> calendarMap = calendar.getCalendarHashMap();
            List<CalendarEntity> workCalendar = workEntityFromId.get().getCalendarForWork();
            System.out.println("------------------------test");

            for (int i = 0; i < workCalendar.size(); i++) {
                System.out.println("----------------test2");
                LocalDate date = workCalendar.get(i).getDate();
                if(date.compareTo(dateLastNote) > 0 ){ //"date occurs after dateLastNote"
                    System.out.println(date);
                    System.out.println("--------------test3");
                    return date;
                }
            }

            for(CalendarEntity calendarEntity : workCalendar)
            {
                System.out.println("--------------test2");
                LocalDate dateCal = calendarEntity.getDate();
                if(dateCal.compareTo(dateLastNote) > 0 ){ //"dateCal occurs after dateLastNote"
                    System.out.println(dateCal);
                    System.out.println("--------------test3");
                    return dateCal;
                }
            }


            //hämta datum på när nästa jobbdag är
            for (Map.Entry<CalendarEntity, WorkEntity> entry : calendarMap.entrySet()) {
                CalendarEntity calendarEntity = entry.getKey();
                WorkEntity workEntity = entry.getValue();
                LocalDate date = calendarEntity.getDate();
                if(workEntity.getCustomerNotes().contains(customerNoteEntity.getDatePosted().)){

                }
            }
            */

        }
    }

    public List<CustomerNoteEntity> getAllNotesByCustomerId(long customerId) {
        return customerNoteDao.findAllByCustomerId(customerId);
    }

    public void deleteNote(Long noteId) {
        customerNoteDao.deleteById(noteId);
    }

    public List<CustomerNoteEntity> getAllSummarizedNotesForWork(long workId) {
        Optional<WorkEntity> workEntity = workRepository.getWorkEntity(workId);
        List<CustomerNoteEntity> allNotes = workEntity.get().getCustomerNotes();
        List<CustomerNoteEntity> summarizedNotes = null;

        for (CustomerNoteEntity customerNoteEntity : allNotes) {
            NoteStatus noteStatus = customerNoteEntity.getNoteStatus();
            if(noteStatus == NoteStatus.SUMMARIZED){
                summarizedNotes.add(customerNoteEntity);
            }
        }

        return summarizedNotes;
    }

    public List<CustomerNoteEntity> getAllNotSummarizedNotesForWork(long workId) {
        Optional<WorkEntity> workEntity = workRepository.getWorkEntity(workId);
        List<CustomerNoteEntity> allNotes = workEntity.get().getCustomerNotes(); //customerNoteDao.findAllByWorkId(workId);
        List<CustomerNoteEntity> nonSummarizedNotes = null;

        for (CustomerNoteEntity customerNoteEntity : allNotes) {
            NoteStatus noteStatus = customerNoteEntity.getNoteStatus();
            if(noteStatus == NoteStatus.NOTSUMMARIZED){
                nonSummarizedNotes.add(customerNoteEntity);
            }
        }

        return nonSummarizedNotes;
    }
}
