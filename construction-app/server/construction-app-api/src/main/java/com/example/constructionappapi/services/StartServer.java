package com.example.constructionappapi.services;

import com.example.constructionappapi.services.businessLogicLayer.Calendar;
import com.example.constructionappapi.services.businessLogicLayer.CalendarSingleton;
import com.example.constructionappapi.services.businessLogicLayer.repositories.AccountRepository;
import com.example.constructionappapi.services.dataAccessLayer.UserRole;
import com.example.constructionappapi.services.dataAccessLayer.entities.AccountEntity;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.ConfigurableApplicationContext;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;
import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import java.util.Date;
import java.util.Optional;
import java.util.Timer;
import java.util.TimerTask;

@Configuration
@EnableScheduling
@ComponentScan(basePackages = "com.example.constructionappapi.services")
@SpringBootApplication
public class StartServer {

    private static ConfigurableApplicationContext configurableApplicationContext;

    public StartServer(ConfigurableApplicationContext configurableApplicationContext) {
        this.configurableApplicationContext = configurableApplicationContext;
    }

    public static void main(String[] args) {
        try {
            configurableApplicationContext = SpringApplication.run(StartServer.class, args);


            System.out.println("Server is running!");

            TimerTask repeatedTask = new TimerTask() {
                public void run() {
                    System.out.println("Task performed on " + new Date());
                    //workRepository.updateWorkStatus() skall köras i g/dagen, förmodligen smart köra task:en strax efter midnatt varje dag
                }
            };
            Timer timer = new Timer("Timer");
/*
            ScheduledExecutorService scheduler = Executors.newScheduledThreadPool(1);
            scheduler.scheduleAtFixedRate(repeatedTask, 8, 8, TimeUnit.HOURS);
 */
            long delay = 1000L;
            long period = 1000L * 60L * 60L * 24L; //Utför task varje 24h
            timer.scheduleAtFixedRate(repeatedTask, delay, period);

            Calendar calendar = CalendarSingleton.getCalendar();
            calendar.initializeCalendar();

            //TODO: Remove when done with project.
            //Adds an account to the database on server-start to make testing easier.
            AccountEntity accountEntity = new AccountEntity();
            accountEntity.setId(0);
            accountEntity.setName("admin");
            accountEntity.setEmail("admin@admin.com");
            accountEntity.setPassword(new BCryptPasswordEncoder().encode("admin"));
            accountEntity.setRole(UserRole.ADMIN);
            AccountRepository accountRepository = configurableApplicationContext.getBean(AccountRepository.class);
            Optional<AccountEntity> accountEntityOptional = Optional.ofNullable(accountRepository.findUserByEmail("admin@admin.com"));

            if (accountEntityOptional.isEmpty()) {
                accountRepository.createAccount(accountEntity);
            }

            Tests tests = new Tests(configurableApplicationContext);
            //tests.testAddWork();
            //tests.testChangeNumberOfDaysOnWork();
        } catch (Exception e) {
            System.out.println("Spring application could not run: " + e);
        }
    }

    @Bean
    public TaskDoneEveryNight task(){
        return new TaskDoneEveryNight(configurableApplicationContext);
    }
}
