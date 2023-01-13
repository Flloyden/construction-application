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

@Component
public class TaskDoneEveryNight {
    private final ConfigurableApplicationContext configurableApplicationContext;

    public TaskDoneEveryNight(ConfigurableApplicationContext configurableApplicationContext) {
        this.configurableApplicationContext = configurableApplicationContext;

    }

    /**
     * This task runs every night at 1 am to update vacation statuses, workstatuses and guarantees statuses.
     */
    @Scheduled(cron = "0 0 1 * * *") //cron modification: second, minute, hour, day-of-month, month, day-of-week
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
