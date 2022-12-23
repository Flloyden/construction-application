package com.example.constructionappapi.services;
import com.example.constructionappapi.services.businessLogicLayer.repositories.AccountingRepository;
import com.example.constructionappapi.services.businessLogicLayer.repositories.CustomerRepository;
import com.example.constructionappapi.services.businessLogicLayer.repositories.WorkRepository;
import com.example.constructionappapi.services.presentationLayer.CustomerAPI;
import org.hibernate.resource.beans.container.spi.AbstractCdiBeanContainer;
import org.springframework.context.ConfigurableApplicationContext;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.scheduling.config.Task;
import org.springframework.stereotype.Component;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

@Component
public class TaskDoneEveryNight {
    private final ConfigurableApplicationContext configurableApplicationContext;
    private final DateTimeFormatter formatter = DateTimeFormatter.ofPattern("dd/MM/yyyy hh:mm:ss");

    public TaskDoneEveryNight(ConfigurableApplicationContext configurableApplicationContext){
        this.configurableApplicationContext = configurableApplicationContext;

    }

    //cron modification: second, minute, hour, day-of-month, month, day-of-week

    //@Scheduled(cron = "*/40 * * * * *") //every 40 seconds
    @Scheduled(cron = "0 0 1 * * *") //will run at 1 am every night
    public void execute() throws InterruptedException {
        WorkRepository workRepository = configurableApplicationContext.getBean(WorkRepository.class);
        AccountingRepository accountingRepository = configurableApplicationContext.getBean(AccountingRepository.class);
        workRepository.findWorkAndUpdateToStarted(); //update work that starts today
        LocalDate today = LocalDate.now();
        //TODO detta ska ej radera gamla garantier, enbart ändra status t 1
        int amountOfAccountingsDeleted = accountingRepository.deleteOldAccountings(today); //delete guarantees with warranty date today or before today
        System.out.println("------ Code is being executed from TaskDoneEveryNight... Time: " + formatter.format(LocalDateTime.now()) + " ------");
        System.out.println("----------------------------- amount of accountings removed: " +amountOfAccountingsDeleted + " -----------------------------");

    }
}
