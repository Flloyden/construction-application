package com.example.constructionappapi.services;

import com.example.constructionappapi.services.businessLogicLayer.Calendar;
import com.example.constructionappapi.services.businessLogicLayer.CalendarSingleton;
import com.example.constructionappapi.services.businessLogicLayer.repositories.AccountRepository;
import com.example.constructionappapi.services.businessLogicLayer.repositories.CustomerRepository;
import com.example.constructionappapi.services.businessLogicLayer.repositories.WorkRepository;
import com.example.constructionappapi.services.dataAccessLayer.Status;
import com.example.constructionappapi.services.dataAccessLayer.entities.AccountEntity;
import com.example.constructionappapi.services.dataAccessLayer.entities.CustomerEntity;
import com.example.constructionappapi.services.dataAccessLayer.entities.VacationEntity;
import com.example.constructionappapi.services.dataAccessLayer.entities.WorkEntity;
import com.example.constructionappapi.services.presentationLayer.VacationAPI;
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

            //TODO: Remove when done with project.
            //Adds an account to the database on server-start to make testing easier.
            AccountEntity accountEntity = new AccountEntity(0, "admin", "admin");
            AccountRepository accountRepository = configurableApplicationContext.getBean(AccountRepository.class);
            Optional<AccountEntity> accountEntityOptional = accountRepository.findFirstByUsernameAndPassword("admin", "admin");
            if (accountEntityOptional.isEmpty()) {
                accountRepository.createAccount(accountEntity);
            }

            Tests tests = new Tests(configurableApplicationContext);
            //tests.testMoveWorkBackwardsOnRemoveVacation();
            //tests.testAddVacation();
            //tests.testMoveWorkForwardsOnAddVacation();

        } catch (Exception e) {
            System.out.println("Spring application could not run: " + e);
        }
    }
}
