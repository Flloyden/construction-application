package com.example.constructionappapi.services;

import com.example.constructionappapi.services.businessLogicLayer.Calendar;
import com.example.constructionappapi.services.dataAccessLayer.Status;
import com.example.constructionappapi.services.dataAccessLayer.entities.CalendarEntity;
import com.example.constructionappapi.services.dataAccessLayer.entities.WorkEntity;
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

            /*
            CustomerDao customerDao = configurableApplicationContext.getBean(CustomerDao.class);
            CustomerAPI customerAPI = configurableApplicationContext.getBean(CustomerAPI.class);

            CustomerEntity customerEdit = customerDao.findById(Long.parseLong("7")).get();
            customerEdit.setName("testelitest");

            CustomerEntity customer = new CustomerEntity(
                    7,
                    "sgfdsgfdsgfd",
                    "testAddressEdit",
                    "54321",
                    "testPropDesignation",
                    "9999999",
                    LocalDate.now(),
                    new ArrayList<>(),
                    new ArrayList<>());

            ArrayList<WorkEntity> work = new ArrayList<>();
            work.add(new WorkEntity(
                    15,
                    "nbvc",
                    null,
                    Status.STARTED,
                    null,
                    new ArrayList<>()));
            work.add(new WorkEntity(
                    19,
                    "zxvc",
                    null,
                    Status.STARTED,
                    null,
                    new ArrayList<>()));
            work.add(new WorkEntity(
                    17,
                    "mnbvmnbv",
                    null,
                    Status.STARTED,
                    null,
                    new ArrayList<>()));

            List<WorkEntity> workList = List.copyOf(work);

            customer.setWorkList(workList);

            customerAPI.createCustomer(customer);
            //customerDao.save(customer);
             */

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

            new Calendar();
        } catch (Exception e) {
            System.out.println("Spring application could not run: " + e);
        }
    }
}
