package com.example.constructionappapi.services;

import com.example.constructionappapi.services.businessLogicLayer.CalendarSingleton;
import com.example.constructionappapi.services.businessLogicLayer.repositories.AccountRepository;
import com.example.constructionappapi.services.businessLogicLayer.repositories.CalendarColorRepository;
import com.example.constructionappapi.services.dataAccessLayer.UserRole;
import com.example.constructionappapi.services.dataAccessLayer.entities.AccountEntity;
import com.example.constructionappapi.services.dataAccessLayer.entities.CalendarColorEntity;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.ConfigurableApplicationContext;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;
import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import java.util.Optional;

@Configuration
@EnableScheduling
@ComponentScan(basePackages = "com.example.constructionappapi.services")
@SpringBootApplication
public class StartServer {

    private static ConfigurableApplicationContext configurableApplicationContext;

    public StartServer(ConfigurableApplicationContext configurableApplicationContext) {
        StartServer.configurableApplicationContext = configurableApplicationContext;
    }

    public static void main(String[] args) {
        try {
            configurableApplicationContext = SpringApplication.run(StartServer.class, args);

            System.out.println("Server is running!");

            CalendarSingleton.getCalendar().initializeCalendar();

            //TODO: Remove when done with project? Could be useful.
            addDefaultUser();
            addDefaultColor();

            Tests tests = new Tests(configurableApplicationContext);
            //tests.testGetAllNotesForSum();
            //tests.testSetWorkStatusToCompleted();
            //tests.testAddWork();
            //tests.testChangeNumberOfDaysOnWork();
        } catch (Exception e) {
            System.out.println("Spring application could not run: " + e);
        }
    }

    /**
     * Adds a default user to the database if there's no user already in the database.
     */
    private static void addDefaultUser() {
        AccountRepository accountRepository = configurableApplicationContext.getBean(AccountRepository.class);
        Optional<AccountEntity> accountEntityOptional = accountRepository.findById(1L);

        if (accountEntityOptional.isEmpty()) {
            AccountEntity accountEntity = new AccountEntity();
            accountEntity.setId(0);
            accountEntity.setName("admin");
            accountEntity.setEmail("bitsapp.noreply@gmail.com");
            accountEntity.setPassword(new BCryptPasswordEncoder().encode("admin"));
            accountEntity.setRole(UserRole.ADMIN);

            accountRepository.createAccount(accountEntity);
        }
    }

    private static void addDefaultColor()
    {
        CalendarColorRepository calendarColorRepository = configurableApplicationContext.getBean(CalendarColorRepository.class);
        Optional<CalendarColorEntity> colorEntity = calendarColorRepository.findById(1L);

        if (colorEntity.isEmpty())
        {
            CalendarColorEntity colorEntity1 = new CalendarColorEntity();
            colorEntity1.setId(0);
            colorEntity1.setWorkColor("#0284C7");
            colorEntity1.setVacationColor("#10B981");
            colorEntity1.setWeekendsColor("#DC2626");

            calendarColorRepository.createCalendarcolor(colorEntity1);
        }
    }
    @Bean
    public TaskDoneEveryNight task() {
        return new TaskDoneEveryNight(configurableApplicationContext);
    }
}
