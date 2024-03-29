package com.example.constructionappapi.services;

import com.example.constructionappapi.services.businessLogicLayer.Calendar;
import com.example.constructionappapi.services.businessLogicLayer.CalendarSingleton;
import com.example.constructionappapi.services.dataAccessLayer.WorkStatus;
import com.example.constructionappapi.services.dataAccessLayer.entities.CustomerEntity;
import com.example.constructionappapi.services.dataAccessLayer.entities.WorkEntity;
import com.example.constructionappapi.services.presentationLayer.AuthenticationAPI;
import com.example.constructionappapi.services.presentationLayer.CustomerAPI;
import com.example.constructionappapi.services.presentationLayer.WorkAPI;
import com.example.constructionappapi.services.presentationLayer.bodies.PasswordChangeRequest;
import org.springframework.context.ConfigurableApplicationContext;
import org.springframework.http.ResponseEntity;

import java.time.LocalDate;
import java.util.ArrayList;

/**
 * A test class for testing API calls on the server
 */
public class Tests {
    private final ConfigurableApplicationContext configurableApplicationContext;

    public Tests(ConfigurableApplicationContext configurableApplicationContext) {
        this.configurableApplicationContext = configurableApplicationContext;
    }

    public void testChangePassword() {
        /*
        AuthenticationAPI authenticationAPI = configurableApplicationContext.getBean(AuthenticationAPI.class);

        ResponseEntity<?> response = authenticationAPI.changePassword(new PasswordChangeRequest("bitsapp.noreply@gmail.com", "admin", "test", "test"));
        System.out.println(response.getStatusCode() + ", " + response.getBody());

         */
    }

    public void testAddVacation() {
        /*
        VacationEntity vacationEntity1 = new VacationEntity(0L, "test", LocalDate.now(), 10, null);
        VacationEntity vacationEntity2 = new VacationEntity(0L, "test", LocalDate.now(), 10, null);
        VacationEntity vacationEntity3 = new VacationEntity(0L, "test", LocalDate.now().plusDays(20), 10, null);
        VacationAPI vacationAPI = configurableApplicationContext.getBean(VacationAPI.class);
        vacationAPI.saveVacation(vacationEntity1);
        vacationAPI.saveVacation(vacationEntity2);
        vacationAPI.saveVacation(vacationEntity3);

         */
    }

    public void testSkipVacationDatesWhenAddingWork() {
        /*
        Calendar calendar = CalendarSingleton.getCalendar();

        VacationEntity vacationEntity = new VacationEntity(0L, "test", LocalDate.now().plusDays(5), 10, new ArrayList<>());
        VacationAPI vacationAPI = configurableApplicationContext.getBean(VacationAPI.class);
        vacationAPI.saveVacation(vacationEntity);

        CustomerRepository customerRepository = configurableApplicationContext.getBean(CustomerRepository.class);
        CustomerEntity customer = new CustomerEntity(0L, "test", "test","test","test","test", "54321", "test", "9999999", LocalDate.now(), new ArrayList<>(), new ArrayList<>(), null);
        customer = customerRepository.createCustomer(customer);

        WorkRepository workRepository = configurableApplicationContext.getBean(WorkRepository.class);
        WorkEntity door = new WorkEntity(0L, "Door", LocalDate.now(), 10, "testNote", null, WorkStatus.NOTSTARTED, customer, new ArrayList<>(), new ArrayList<>(), new ArrayList<>());
        door = workRepository.addNewWorkEntity(customer.getId(), door);
        calendar.addWork(door);

        calendar.printCalendar();

 */
    }

    public void testSkipVacationDatesWhenRemovingWork() {
        /*
        Calendar calendar = CalendarSingleton.getCalendar();

        VacationEntity vacationEntity = new VacationEntity(0L, "test", LocalDate.now().plusDays(5), 10, new ArrayList<>());
        VacationAPI vacationAPI = configurableApplicationContext.getBean(VacationAPI.class);
        vacationAPI.saveVacation(vacationEntity);

        CustomerRepository customerRepository = configurableApplicationContext.getBean(CustomerRepository.class);
        CustomerEntity customer = new CustomerEntity(0L, "test", "test","test","test","test", "54321", "test", "9999999", LocalDate.now(), new ArrayList<>(), new ArrayList<>(), null);
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

 */
    }

    public void testGetAmountOfOldAccountings() {
        /*
        String ANSI_RED = "\u001B[31m";

        System.out.println(ANSI_RED + "Getting amount of old accountings." + ANSI_RED);
        AccountingRepository accountingRepository = configurableApplicationContext.getBean(AccountingRepository.class);
        int amount = accountingRepository.getOldAccountings();
        System.out.println("antal gamla garantier: " + amount);

     */
    }

    public void testMoveWorkForwardsOnAddVacation() {
        /*
        Calendar calendar = CalendarSingleton.getCalendar();

        CustomerRepository customerRepository = configurableApplicationContext.getBean(CustomerRepository.class);
        CustomerEntity customer = new CustomerEntity(0L, "test", "test", "test", "test", "test", "54321", "test", "9999999", LocalDate.now(), new ArrayList<>(), new ArrayList<>(), null);
        customer = customerRepository.createCustomer(customer);

        WorkRepository workRepository = configurableApplicationContext.getBean(WorkRepository.class);
        WorkEntity door = new WorkEntity(0L, "Door", LocalDate.now(), 10, "testNote", null, WorkStatus.NOTSTARTED, customer, new ArrayList<>(), new ArrayList<>(), new ArrayList<>());
        door = workRepository.addNewWorkEntity(customer.getId(), door);
        calendar.addWork(door);

        VacationEntity vacationEntity = new VacationEntity(0L, "test", LocalDate.now().plusDays(5), 10, new ArrayList<>());
        VacationAPI vacationAPI = configurableApplicationContext.getBean(VacationAPI.class);
        vacationAPI.saveVacation(vacationEntity);
        calendar.printCalendar();
         */
    }

    public void testMoveWorkBackwardsOnRemoveVacation() {
        /*
        Calendar calendar = CalendarSingleton.getCalendar();

        CustomerRepository customerRepository = configurableApplicationContext.getBean(CustomerRepository.class);
        CustomerEntity customer = new CustomerEntity(0L, "test", "test","test","test","test", "54321", "test", "9999999", LocalDate.now(), new ArrayList<>(), new ArrayList<>(), null);
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
        /*
 */
    }

    public void testAddNotesCheckDateAndGetSum() {
        /*
        String ANSI_RED = "\u001B[31m";
        Calendar calendar = CalendarSingleton.getCalendar();

        System.out.println(ANSI_RED + "Adding customer." + ANSI_RED);
        CustomerEntity customer = new CustomerEntity(0L, "test", "test","test","test","test", "54321", "test", "9999999", LocalDate.now(), new ArrayList<>(), new ArrayList<>(), null);
        CustomerRepository customerRepository = configurableApplicationContext.getBean(CustomerRepository.class);
        customer = customerRepository.createCustomer(customer);

        System.out.println(ANSI_RED + "Adding work." + ANSI_RED);
        WorkRepository workRepository = configurableApplicationContext.getBean(WorkRepository.class);

        WorkEntity door = new WorkEntity(0L, "Door", null, 6, "testNote", null, WorkStatus.NOTSTARTED, customer, new ArrayList<>(), new ArrayList<>(), new ArrayList<>());
        door = workRepository.addNewWorkEntity(customer.getId(), door);
        calendar.addWork(door);

        WorkEntity fence = new WorkEntity(0L, "Fence", null, 8, "testNote", null, WorkStatus.NOTSTARTED, customer, new ArrayList<>(), new ArrayList<>(), new ArrayList<>());
        fence = workRepository.addNewWorkEntity(customer.getId(), fence);
        calendar.addWork(fence);

        WorkEntity roof = new WorkEntity(0L, "Roof", null, 4, "testNote", null, WorkStatus.NOTSTARTED, customer, new ArrayList<>(), new ArrayList<>(), new ArrayList<>());
        roof = workRepository.addNewWorkEntity(customer.getId(), roof);
        calendar.addWork(roof);
        calendar.printCalendar();

        System.out.println(ANSI_RED + "Adding notes." + ANSI_RED);
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

        System.out.println(ANSI_RED + "getting sumNote for Roof." + ANSI_RED);
        Optional<NoteSummaryEntity> sumObj = noteSummaryRepository.getSumForWork(roof.getId());

         */
    }

    public void testChangeNumberOfDaysOnWork() {
        /*
        String ANSI_RED = "\u001B[31m";
        Calendar calendar = CalendarSingleton.getCalendar();

        System.out.println(ANSI_RED + "Adding customer." + ANSI_RED);
        CustomerEntity customer = new CustomerEntity(0L, "test", "test", "test", "test", "test", "54321", "test", "9999999", LocalDate.now(), new ArrayList<>(), new ArrayList<>(), null);
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
        door.setNumberOfDays(5);
        workAPI.updateWork(customer.getId(), door);
        calendar.printCalendar();
         */
    }

    public void testAddWork() {
        /*
        String ANSI_RED = "\u001B[31m";

        System.out.println(ANSI_RED + "Adding customer." + ANSI_RED);
        CustomerEntity customer = new CustomerEntity(0L, "test", "test", "test", "test", "test", "54321", "test", "9999999", LocalDate.now(), new ArrayList<>(), new ArrayList<>(), null);
        CustomerAPI customerAPI = configurableApplicationContext.getBean(CustomerAPI.class);
        customer = customerAPI.createCustomer(customer).getBody();

        System.out.println(ANSI_RED + "Adding work." + ANSI_RED);
        WorkAPI workAPI = configurableApplicationContext.getBean(WorkAPI.class);

        ResponseEntity<?> door = workAPI
                .createWork(
                        customer.getId(),
                        new WorkEntity(
                                0L,
                                "Door",
                                null,
                                null,
                                10,
                                true,
                                "testNote",
                                "",
                                WorkStatus.NOTSTARTED,
                                customer,
                                new ArrayList<>(),
                                new ArrayList<>(),
                                null)
                );

        CalendarSingleton.getCalendar().printCalendar();

        ResponseEntity<?> fence = workAPI
                .createWork(
                        customer.getId(),
                        new WorkEntity(
                                0L,
                                "Fence",
                                null,
                                null,
                                6,
                                false,
                                "testNote",
                                "",
                                WorkStatus.NOTSTARTED,
                                customer,
                                new ArrayList<>(),
                                new ArrayList<>(),
                                null)
                );

        CalendarSingleton.getCalendar().printCalendar();

        ResponseEntity<?> roof = workAPI
                .createWork(
                        customer.getId(),
                        new WorkEntity(
                                0L,
                                "Roof",
                                null,
                                null,
                                4,
                                false,
                                "testNote",
                                "",
                                WorkStatus.NOTSTARTED,
                                customer,
                                new ArrayList<>(),
                                new ArrayList<>(),
                                null)
                );

        CalendarSingleton.getCalendar().printCalendar();
        System.out.println();
        CalendarSingleton.getCalendar().printWorkMap();
        */
    }


    public void testSetWorkStatusToCompleted() {
        /*
        String ANSI_RED = "\u001B[31m";

        System.out.println(ANSI_RED + "Changing workstatus to completed" + ANSI_RED);
        WorkAPI workAPI = configurableApplicationContext.getBean(WorkAPI.class);
        workAPI.findStartedWorkAndUpdateToCompleted();
        */
    }


    public void testGetAllNotesForSum() {
        /*
        String ANSI_RED = "\u001B[31m";

        System.out.println(ANSI_RED + "Get all notes for sum" + ANSI_RED);
        CustomerNoteAPI customerNoteAPI = configurableApplicationContext.getBean(CustomerNoteAPI.class);
        customerNoteAPI.getAllNotesForSum(1);
        */
    }

    public void testRemoveCustomer() {
        /*
        String ANSI_RED = "\u001B[31m";

        System.out.println(ANSI_RED + "Adding customer." + ANSI_RED);
        CustomerEntity customer = new CustomerEntity(0L, "test", "test", "test", "test", "test", "54321", "test", "9999999", LocalDate.now(), new ArrayList<>(), new ArrayList<>(), null);
        CustomerAPI customerAPI = configurableApplicationContext.getBean(CustomerAPI.class);
        customer = customerAPI.createCustomer(customer);

        System.out.println(ANSI_RED + "Adding work." + ANSI_RED);
        WorkAPI workAPI = configurableApplicationContext.getBean(WorkAPI.class);

        WorkEntity door = new WorkEntity(0L, "Door", null, 3, "testNote", "", WorkStatus.NOTSTARTED, customer, new ArrayList<>(), new ArrayList<>(), null);
        door = workAPI.saveWork(customer.getId(), door);

        WorkEntity fence = new WorkEntity(0L, "Fence", null, 6, "testNote", "", WorkStatus.NOTSTARTED, customer, new ArrayList<>(), new ArrayList<>(), null);
        fence = workAPI.saveWork(customer.getId(), fence);

        WorkEntity roof = new WorkEntity(0L, "Roof", null, 2, "testNote", "", WorkStatus.NOTSTARTED, customer, new ArrayList<>(), new ArrayList<>(), null);
        roof = workAPI.saveWork(customer.getId(), roof);

        customerAPI.deleteCustomer(customer.getId());
         */
    }

    public void testRemoveWork() {
        /*
        String ANSI_RED = "\u001B[31m";

        System.out.println(ANSI_RED + "Adding customer." + ANSI_RED);
        CustomerEntity customer = new CustomerEntity(0L, "test", "test","test","test","test", "54321", "test", "9999999", LocalDate.now(), new ArrayList<>(), new ArrayList<>(), null);

        CustomerAPI customerAPI = configurableApplicationContext.getBean(CustomerAPI.class);
        customer = customerAPI.createCustomer(customer);

        System.out.println(ANSI_RED + "Adding work." + ANSI_RED);
        WorkAPI workAPI = configurableApplicationContext.getBean(WorkAPI.class);

        WorkEntity door = new WorkEntity(0L, "Door", null, 10, "testNote", null, WorkStatus.NOTSTARTED, customer, new ArrayList<>(), new ArrayList<>(), null);
        door = workAPI.saveWork(customer.getId(), door);

        WorkEntity fence = new WorkEntity(0L, "Fence", null, 10, "testNote", null, WorkStatus.NOTSTARTED, customer, new ArrayList<>(), new ArrayList<>(), null);
        CustomerNoteEntity customerNoteEntity = new CustomerNoteEntity();
        customerNoteEntity.setWork(fence);
        fence.getCustomerNotes().add(customerNoteEntity);
        fence = workAPI.saveWork(customer.getId(), fence);

        WorkEntity roof = new WorkEntity(0L, "Roof", null, 2, "testNote", null, WorkStatus.NOTSTARTED, customer, new ArrayList<>(), new ArrayList<>(), null);
        roof.getCustomerNotes().add(new CustomerNoteEntity());
        roof = workAPI.saveWork(customer.getId(), roof);

        System.out.println(ANSI_RED + "Removing work." + ANSI_RED);
        workAPI.deleteWorkEntity(fence.getId());

 */
    }

    public void testWorkDateChange() {
        /*
        String ANSI_RED = "\u001B[31m";
        Calendar calendar = CalendarSingleton.getCalendar();

        System.out.println(ANSI_RED + "Adding customer." + ANSI_RED);
        CustomerEntity customer = new CustomerEntity(0L, "test", "test","test","test","test", "54321", "test", "9999999", LocalDate.now(), new ArrayList<>(), new ArrayList<>(), null);
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

         */
    }

}
