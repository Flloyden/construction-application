package com.example.constructionappapi.services;

import com.example.constructionappapi.services.businessLogicLayer.Calendar;
import com.example.constructionappapi.services.businessLogicLayer.CalendarSingleton;
import com.example.constructionappapi.services.businessLogicLayer.repositories.AccountRepository;
import com.example.constructionappapi.services.businessLogicLayer.repositories.CustomerRepository;
import com.example.constructionappapi.services.businessLogicLayer.repositories.WorkRepository;
import com.example.constructionappapi.services.dataAccessLayer.Status;
import com.example.constructionappapi.services.dataAccessLayer.entities.AccountEntity;
import com.example.constructionappapi.services.dataAccessLayer.entities.CustomerEntity;
import com.example.constructionappapi.services.dataAccessLayer.entities.WorkEntity;
import com.example.constructionappapi.services.presentationLayer.WorkAPI;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.ConfigurableApplicationContext;

import java.time.LocalDate;
import java.util.*;

@SpringBootApplication
public class StartServer {
    public static void main(String[] args) {
        try {
            ConfigurableApplicationContext configurableApplicationContext = SpringApplication.run(StartServer.class, args);

            System.out.println("Server is running!");

            TimerTask repeatedTask = new TimerTask() {
                public void run() {
                    System.out.println("Task performed on " + new Date());
                }
            };
            Timer timer = new Timer("Timer");

            long delay = 1000L;
            long period = 1000L * 60L * 60L * 24L; //Utför task varje 24h
            timer.scheduleAtFixedRate(repeatedTask, delay, period);

            Calendar calendar = CalendarSingleton.getCalendar();
            calendar.initializeCalendar();

            AccountEntity accountEntity = new AccountEntity(0, "admin", "admin");
            AccountRepository accountRepository = configurableApplicationContext.getBean(AccountRepository.class);
            Optional<AccountEntity> accountEntityOptional = accountRepository.findFirstByUsernameAndPassword("admin", "admin");
            if (accountEntityOptional.isEmpty()) {
                accountRepository.createAccount(accountEntity);
            }

            testWorkDateChange(configurableApplicationContext);

            /*
            WorkRepository workRepository = configurableApplicationContext.getBean(WorkRepository.class);
            WorkEntity door = workRepository.createWorkEntity(new WorkEntity(0L, "Door", LocalDate.of(2023, 5, 22), 10, "testNote", null, Status.NOTSTARTED, customer, new ArrayList<>()));
            WorkEntity fence = workRepository.createWorkEntity(new WorkEntity(0L, "Fence", LocalDate.of(2023, 5, 25), 10, "testNote", null, Status.NOTSTARTED, customer, new ArrayList<>()));
            WorkEntity roof = workRepository.createWorkEntity(new WorkEntity(0L, "Roof", LocalDate.of(2023, 5, 29), 2, "testNote", null, Status.NOTSTARTED, customer, new ArrayList<>()));

            calendar.addWork(door);
            calendar.printCalendar();
            calendar.addWork(fence);
            calendar.printCalendar();
            calendar.addWork(roof);
            calendar.printCalendar();

            calendar.removeWork(door);
            calendar.printCalendar();

            calendar.removeWork(roof);
            calendar.printCalendar();

            door = workRepository.createWorkEntity(new WorkEntity(0L, "Door", LocalDate.of(2023, 5, 22), 10, "testNote", null, Status.NOTSTARTED, customer, new ArrayList<>()));
            calendar.addWork(door);
             */
            calendar.printCalendar();
        } catch (Exception e) {
            System.out.println("Spring application could not run: " + e);
        }
    }

    private static void testWorkDateChange(ConfigurableApplicationContext configurableApplicationContext) {
        String ANSI_RED = "\u001B[31m";
        Calendar calendar = CalendarSingleton.getCalendar();

        System.out.println(ANSI_RED + "Adding customer." + ANSI_RED);
        CustomerEntity customer = new CustomerEntity(0L, "test", "test", "54321", "test", "9999999", LocalDate.now(), new ArrayList<>(), new ArrayList<>());
        CustomerRepository customerRepository = configurableApplicationContext.getBean(CustomerRepository.class);
        customer = customerRepository.createCustomer(customer);

        System.out.println(ANSI_RED + "Adding work." + ANSI_RED);
        WorkEntity work = new WorkEntity(0L, "Door", LocalDate.of(2023, 5, 22), 10, "testNote", null, Status.NOTSTARTED, customer, new ArrayList<>(), new ArrayList<>());
        WorkRepository workRepository = configurableApplicationContext.getBean(WorkRepository.class);
        work = workRepository.createWorkEntity(work);
        calendar.addWork(work);

        System.out.println(ANSI_RED + "Calling update work." + ANSI_RED);
        WorkAPI workAPI = configurableApplicationContext.getBean(WorkAPI.class);
        work.setStartDate(LocalDate.now());
        calendar.updateWork(work);
    }
}
