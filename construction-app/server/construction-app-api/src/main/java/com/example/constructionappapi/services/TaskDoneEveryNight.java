package com.example.constructionappapi.services;

import com.example.constructionappapi.services.businessLogicLayer.repositories.AccountingRepository;
import com.example.constructionappapi.services.businessLogicLayer.repositories.WorkRepository;
import org.springframework.context.ConfigurableApplicationContext;
import org.springframework.http.ResponseEntity;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

/**
 * Class for making a task that must execute every night.
 * Updates work with start date today to Started and old accountings to status 1
 */
@Component
public class TaskDoneEveryNight {
    private final ConfigurableApplicationContext configurableApplicationContext;
    private final DateTimeFormatter formatter = DateTimeFormatter.ofPattern("dd/MM/yyyy hh:mm:ss");

    public TaskDoneEveryNight(ConfigurableApplicationContext configurableApplicationContext){
        this.configurableApplicationContext = configurableApplicationContext;

    }

    //cron modification: second, minute, hour, day-of-month, month, day-of-week

    //@Scheduled(cron = "*/60 * * * * *") //every 60 seconds
    @Scheduled(cron = "0 0 1 * * *") //will run at 1 am every night
    public void execute() throws InterruptedException {
        System.out.println();
        System.out.println("______ Code is being executed from TaskDoneEveryNight... Time: " + formatter.format(LocalDateTime.now()) + " ______");

        WorkRepository workRepository = configurableApplicationContext.getBean(WorkRepository.class);
        AccountingRepository accountingRepository = configurableApplicationContext.getBean(AccountingRepository.class);

        //update workStatus on work that starts today to Started
        workRepository.findWorkAndUpdateToStarted();

        //change status on guarantees with warranty date today or before today to 1
        accountingRepository.updateOldAccountingStatus(LocalDate.now());
    }
}
