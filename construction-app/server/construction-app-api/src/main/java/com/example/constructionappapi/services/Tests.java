package com.example.constructionappapi.services;

import com.example.constructionappapi.services.businessLogicLayer.Calendar;
import com.example.constructionappapi.services.businessLogicLayer.CalendarSingleton;
import com.example.constructionappapi.services.businessLogicLayer.repositories.CustomerNoteRepository;
import com.example.constructionappapi.services.businessLogicLayer.repositories.CustomerRepository;
import com.example.constructionappapi.services.businessLogicLayer.repositories.NoteSummaryRepository;
import com.example.constructionappapi.services.businessLogicLayer.repositories.WorkRepository;
import com.example.constructionappapi.services.dataAccessLayer.NoteStatus;
import com.example.constructionappapi.services.dataAccessLayer.WorkStatus;
import com.example.constructionappapi.services.dataAccessLayer.entities.*;
import com.example.constructionappapi.services.presentationLayer.VacationAPI;
import com.example.constructionappapi.services.presentationLayer.WorkAPI;
import org.springframework.context.ConfigurableApplicationContext;

import java.time.LocalDate;
import java.time.Month;
import java.util.ArrayList;

public class Tests {
    private final ConfigurableApplicationContext configurableApplicationContext;

    public Tests(ConfigurableApplicationContext configurableApplicationContext) {
        this.configurableApplicationContext = configurableApplicationContext;
    }

    public void testAddVacation() {
        VacationEntity vacationEntity1 = new VacationEntity(0L, "test", LocalDate.now(), 10, null);
        VacationEntity vacationEntity2 = new VacationEntity(0L, "test", LocalDate.now(), 10, null);
        VacationEntity vacationEntity3 = new VacationEntity(0L, "test", LocalDate.now().plusDays(20), 10, null);
        VacationAPI vacationAPI = configurableApplicationContext.getBean(VacationAPI.class);
        vacationAPI.saveVacation(vacationEntity1);
        vacationAPI.saveVacation(vacationEntity2);
        vacationAPI.saveVacation(vacationEntity3);
    }

    public void testSkipVacationDatesWhenAddingWork() {
        Calendar calendar = CalendarSingleton.getCalendar();

        VacationEntity vacationEntity = new VacationEntity(0L, "test", LocalDate.now().plusDays(5), 10, new ArrayList<>());
        VacationAPI vacationAPI = configurableApplicationContext.getBean(VacationAPI.class);
        vacationAPI.saveVacation(vacationEntity);

        CustomerRepository customerRepository = configurableApplicationContext.getBean(CustomerRepository.class);
        CustomerEntity customer = new CustomerEntity(0L, "test", "test", "54321", "test", "9999999", LocalDate.now(), new ArrayList<>(), new ArrayList<>());
        customer = customerRepository.createCustomer(customer);

        WorkRepository workRepository = configurableApplicationContext.getBean(WorkRepository.class);
        WorkEntity door = new WorkEntity(0L, "Door", LocalDate.now(), 10, "testNote", null, WorkStatus.NOTSTARTED, customer, new ArrayList<>(), new ArrayList<>(), new ArrayList<>());
        door = workRepository.addNewWorkEntity(customer.getId(), door);
        calendar.addWork(door);

        calendar.printCalendar();
    }

    public void testSkipVacationDatesWhenRemovingWork() {
        Calendar calendar = CalendarSingleton.getCalendar();

        VacationEntity vacationEntity = new VacationEntity(0L, "test", LocalDate.now().plusDays(5), 10, new ArrayList<>());
        VacationAPI vacationAPI = configurableApplicationContext.getBean(VacationAPI.class);
        vacationAPI.saveVacation(vacationEntity);

        CustomerRepository customerRepository = configurableApplicationContext.getBean(CustomerRepository.class);
        CustomerEntity customer = new CustomerEntity(0L, "test", "test", "54321", "test", "9999999", LocalDate.now(), new ArrayList<>(), new ArrayList<>());
        customer = customerRepository.createCustomer(customer);

        WorkRepository workRepository = configurableApplicationContext.getBean(WorkRepository.class);
        WorkEntity door = new WorkEntity(0L, "Door", LocalDate.now(), 10, "testNote", null, WorkStatus.NOTSTARTED, customer, new ArrayList<>(), new ArrayList<>(), new ArrayList<>());
        door = workRepository.addNewWorkEntity(customer.getId(), door);
        calendar.addWork(door);

        WorkEntity fence = new WorkEntity(0L, "Fence", LocalDate.now().plusDays(3), 10, "testNote", null, WorkStatus.NOTSTARTED, customer, new ArrayList<>(), new ArrayList<>(), new ArrayList<>());
        fence = workRepository.addNewWorkEntity(customer.getId(), fence);
        calendar.addWork(fence);

        calendar.printCalendar();

        workRepository.deleteWorkEntity(fence.getId());

        calendar.printCalendar();

        calendar.printVacationCalendar();
    }

    public void testMoveWorkForwardsOnAddVacation() {
        Calendar calendar = CalendarSingleton.getCalendar();

        CustomerRepository customerRepository = configurableApplicationContext.getBean(CustomerRepository.class);
        CustomerEntity customer = new CustomerEntity(0L, "test", "test", "54321", "test", "9999999", LocalDate.now(), new ArrayList<>(), new ArrayList<>());
        customer = customerRepository.createCustomer(customer);

        WorkRepository workRepository = configurableApplicationContext.getBean(WorkRepository.class);
        WorkEntity door = new WorkEntity(0L, "Door", LocalDate.now(), 10, "testNote", null, WorkStatus.NOTSTARTED, customer, new ArrayList<>(), new ArrayList<>(), new ArrayList<>());
        door = workRepository.addNewWorkEntity(customer.getId(), door);
        calendar.addWork(door);

        VacationEntity vacationEntity = new VacationEntity(0L, "test", LocalDate.now().plusDays(5), 10, new ArrayList<>());
        VacationAPI vacationAPI = configurableApplicationContext.getBean(VacationAPI.class);
        vacationAPI.saveVacation(vacationEntity);
        calendar.printCalendar();
    }

    public void testMoveWorkBackwardsOnRemoveVacation() {
        Calendar calendar = CalendarSingleton.getCalendar();

        CustomerRepository customerRepository = configurableApplicationContext.getBean(CustomerRepository.class);
        CustomerEntity customer = new CustomerEntity(0L, "test", "test", "54321", "test", "9999999", LocalDate.now(), new ArrayList<>(), new ArrayList<>());
        customer = customerRepository.createCustomer(customer);

        WorkRepository workRepository = configurableApplicationContext.getBean(WorkRepository.class);
        WorkEntity door = new WorkEntity(0L, "Door", LocalDate.now(), 10, "testNote", null, WorkStatus.NOTSTARTED, customer, new ArrayList<>(), new ArrayList<>(), new ArrayList<>());
        door = workRepository.addNewWorkEntity(customer.getId(), door);
        calendar.addWork(door);

        VacationEntity vacationEntity = new VacationEntity(0L, "test", LocalDate.now().plusDays(5), 10, new ArrayList<>());
        VacationAPI vacationAPI = configurableApplicationContext.getBean(VacationAPI.class);
        vacationEntity = vacationAPI.saveVacation(vacationEntity);

        vacationAPI.deleteVacation(vacationEntity.getId());
        calendar.printCalendar();
    }

    public void testAddNotesCheckDate() {
        String ANSI_RED = "\u001B[31m";
        Calendar calendar = CalendarSingleton.getCalendar();

        System.out.println(ANSI_RED + "Adding customer." + ANSI_RED);
        CustomerEntity customer = new CustomerEntity(0L, "test", "test", "54321", "test", "9999999", LocalDate.now(), new ArrayList<>(), new ArrayList<>());
        CustomerRepository customerRepository = configurableApplicationContext.getBean(CustomerRepository.class);
        customer = customerRepository.createCustomer(customer);

        System.out.println(ANSI_RED + "Adding work." + ANSI_RED);
        WorkRepository workRepository = configurableApplicationContext.getBean(WorkRepository.class);

        WorkEntity door = new WorkEntity(0L, "Door", null, 6, "testNote", null, WorkStatus.NOTSTARTED, customer, new ArrayList<>(), new ArrayList<>(), new ArrayList<>());
        door = workRepository.addNewWorkEntity(customer.getId(), door);
        calendar.addWork(door);

        WorkEntity fence = new WorkEntity(0L, "Fence", null, 9, "testNote", null, WorkStatus.NOTSTARTED, customer, new ArrayList<>(), new ArrayList<>(), new ArrayList<>());
        fence = workRepository.addNewWorkEntity(customer.getId(), fence);
        calendar.addWork(fence);

        WorkEntity roof = new WorkEntity(0L, "Roof", null, 2, "testNote", null, WorkStatus.NOTSTARTED, customer, new ArrayList<>(), new ArrayList<>(), new ArrayList<>());
        roof = workRepository.addNewWorkEntity(customer.getId(), roof);
        calendar.addWork(roof);
        calendar.printCalendar();

        System.out.println(ANSI_RED + "Adding note." + ANSI_RED);
        CustomerNoteRepository customerNoteRepository = configurableApplicationContext.getBean(CustomerNoteRepository.class);
        CustomerNoteEntity note = new CustomerNoteEntity(0L, null, "test", "5", "5", "3", "Roof", 3, NoteStatus.NOTSUMMARIZED, customer, roof, null);
        customerNoteRepository.createCustomerNote(note, roof.getId());

        CustomerNoteEntity note2 = new CustomerNoteEntity(0L, null, "test", "3", "3", "2", "Roof", 3, NoteStatus.NOTSUMMARIZED, customer, roof, null);
        customerNoteRepository.createCustomerNote(note2, roof.getId());

        CustomerNoteEntity note3 = new CustomerNoteEntity(0L, null, "test", "4", "4", "1", "Roof", 3, NoteStatus.NOTSUMMARIZED, customer, roof, null);
        customerNoteRepository.createCustomerNote(note3, roof.getId());

        System.out.println(ANSI_RED + "Adding sumNote for Roof December." + ANSI_RED);
        NoteSummaryRepository noteSummaryRepository = configurableApplicationContext.getBean(NoteSummaryRepository.class);
        NoteSummaryEntity sum = new NoteSummaryEntity(0L, LocalDate.now(), LocalDate.now().getMonth(), null, null, null, "Roof", 3,new ArrayList<>(), roof);
        noteSummaryRepository.createNoteSummary(sum, roof.getId());
    }

    public void testAddWork() {
        String ANSI_RED = "\u001B[31m";
        Calendar calendar = CalendarSingleton.getCalendar();

        System.out.println(ANSI_RED + "Adding customer." + ANSI_RED);
        CustomerEntity customer = new CustomerEntity(0L, "test", "test", "54321", "test", "9999999", LocalDate.now(), new ArrayList<>(), new ArrayList<>());
        CustomerRepository customerRepository = configurableApplicationContext.getBean(CustomerRepository.class);
        customer = customerRepository.createCustomer(customer);

        System.out.println(ANSI_RED + "Adding work." + ANSI_RED);
        WorkRepository workRepository = configurableApplicationContext.getBean(WorkRepository.class);

        WorkEntity door = new WorkEntity(0L, "Door", null, 3, "testNote", null, WorkStatus.NOTSTARTED, customer, new ArrayList<>(), new ArrayList<>(), new ArrayList<>());
        door = workRepository.addNewWorkEntity(customer.getId(), door);
        calendar.addWork(door);

        WorkEntity fence = new WorkEntity(0L, "Fence", null, 6, "testNote", null, WorkStatus.NOTSTARTED, customer, new ArrayList<>(), new ArrayList<>(), new ArrayList<>());
        fence = workRepository.addNewWorkEntity(customer.getId(), fence);
        calendar.addWork(fence);

        WorkEntity roof = new WorkEntity(0L, "Roof", null, 2, "testNote", null, WorkStatus.NOTSTARTED, customer, new ArrayList<>(), new ArrayList<>(), new ArrayList<>());
        roof = workRepository.addNewWorkEntity(customer.getId(), roof);
        calendar.addWork(roof);
        calendar.printCalendar();
    }

    public void testRemoveWork() {
        String ANSI_RED = "\u001B[31m";
        Calendar calendar = CalendarSingleton.getCalendar();

        System.out.println(ANSI_RED + "Adding customer." + ANSI_RED);
        CustomerEntity customer = new CustomerEntity(0L, "test", "test", "54321", "test", "9999999", LocalDate.now(), new ArrayList<>(), new ArrayList<>());
        CustomerRepository customerRepository = configurableApplicationContext.getBean(CustomerRepository.class);
        customer = customerRepository.createCustomer(customer);

        System.out.println(ANSI_RED + "Adding work." + ANSI_RED);
        WorkRepository workRepository = configurableApplicationContext.getBean(WorkRepository.class);

        WorkEntity door = new WorkEntity(0L, "Door", LocalDate.of(2023, 5, 22), 10, "testNote", null, WorkStatus.NOTSTARTED, customer, new ArrayList<>(), new ArrayList<>(), new ArrayList<>());
        door = workRepository.addNewWorkEntity(customer.getId(), door);
        calendar.addWork(door);

        WorkEntity fence = new WorkEntity(0L, "Fence", LocalDate.of(2023, 5, 25), 10, "testNote", null, WorkStatus.NOTSTARTED, customer, new ArrayList<>(), new ArrayList<>(), new ArrayList<>());
        fence = workRepository.addNewWorkEntity(customer.getId(), fence);
        calendar.addWork(fence);

        WorkEntity roof = new WorkEntity(0L, "Roof", LocalDate.of(2023, 5, 29), 2, "testNote", null, WorkStatus.NOTSTARTED, customer, new ArrayList<>(), new ArrayList<>(), new ArrayList<>());
        roof = workRepository.addNewWorkEntity(customer.getId(), roof);
        calendar.addWork(roof);

        System.out.println(ANSI_RED + "Removing work." + ANSI_RED);
        calendar.removeWork(roof);
        calendar.printCalendar();
    }

    public void testWorkDateChange() {
        String ANSI_RED = "\u001B[31m";
        Calendar calendar = CalendarSingleton.getCalendar();

        System.out.println(ANSI_RED + "Adding customer." + ANSI_RED);
        CustomerEntity customer = new CustomerEntity(0L, "test", "test", "54321", "test", "9999999", LocalDate.now(), new ArrayList<>(), new ArrayList<>());
        CustomerRepository customerRepository = configurableApplicationContext.getBean(CustomerRepository.class);
        customer = customerRepository.createCustomer(customer);

        System.out.println(ANSI_RED + "Adding work." + ANSI_RED);
        WorkRepository workRepository = configurableApplicationContext.getBean(WorkRepository.class);

        WorkEntity door = new WorkEntity(0L, "Door", LocalDate.of(2023, 5, 22), 10, "testNote", null, WorkStatus.NOTSTARTED, customer, new ArrayList<>(), new ArrayList<>(), new ArrayList<>());
        door = workRepository.addNewWorkEntity(customer.getId(), door);
        calendar.addWork(door);

        WorkEntity fence = new WorkEntity(0L, "Fence", LocalDate.of(2023, 5, 25), 10, "testNote", null, WorkStatus.NOTSTARTED, customer, new ArrayList<>(), new ArrayList<>(), new ArrayList<>());
        fence = workRepository.addNewWorkEntity(customer.getId(), fence);
        calendar.addWork(fence);

        WorkEntity roof = new WorkEntity(0L, "Roof", LocalDate.of(2023, 5, 29), 2, "testNote", null, WorkStatus.NOTSTARTED, customer, new ArrayList<>(), new ArrayList<>(), new ArrayList<>());
        roof = workRepository.addNewWorkEntity(customer.getId(), roof);
        calendar.addWork(roof);
        calendar.printCalendar();

        System.out.println(ANSI_RED + "Calling update work." + ANSI_RED);
        WorkAPI workAPI = configurableApplicationContext.getBean(WorkAPI.class);
        door.setStartDate(LocalDate.of(2023, 6, 5));
        workAPI.updateWork(customer.getId(), door);
        calendar.updateWork(door);
        calendar.printCalendar();
    }
}
