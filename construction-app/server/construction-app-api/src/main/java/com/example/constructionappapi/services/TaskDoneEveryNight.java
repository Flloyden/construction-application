package com.example.constructionappapi.services;

import com.example.constructionappapi.services.businessLogicLayer.repositories.AccountingRepository;
import com.example.constructionappapi.services.businessLogicLayer.repositories.VacationRepository;
import com.example.constructionappapi.services.businessLogicLayer.repositories.WorkRepository;
import org.springframework.context.ConfigurableApplicationContext;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

/**
 * A task runs every night at 1 am to update vacation statuses, workstatuses and guarantees statuses
 */
@Component
public class TaskDoneEveryNight {
    private final ConfigurableApplicationContext configurableApplicationContext;
    private final DateTimeFormatter formatter = DateTimeFormatter.ofPattern("dd/MM/yyyy hh:mm:ss");

    public TaskDoneEveryNight(ConfigurableApplicationContext configurableApplicationContext) {
        this.configurableApplicationContext = configurableApplicationContext;

    }

    //cron modification: second, minute, hour, day-of-month, month, day-of-week
    @Scheduled(cron = "0 0 1 * * *") //will run at 1 am every night
    public void execute() throws InterruptedException {
        WorkRepository workRepository = configurableApplicationContext.getBean(WorkRepository.class);
        AccountingRepository accountingRepository = configurableApplicationContext.getBean(AccountingRepository.class);
        VacationRepository vacationRepository = configurableApplicationContext.getBean(VacationRepository.class);

        //updates vacation status to started & completed depending on start date and current date today
        vacationRepository.findVacationsAndUpdateToStarted();
        vacationRepository.findStartedVacationAndUpdateToCompleted();

        //update work status to started depending on start date and current date today
        workRepository.findWorkAndUpdateToStarted();

        //change guarentees/accountings/warranties status to 1 (meaning "old") depending on warranty date and current date today
        accountingRepository.updateOldAccountingStatus(LocalDate.now());
    }
}
