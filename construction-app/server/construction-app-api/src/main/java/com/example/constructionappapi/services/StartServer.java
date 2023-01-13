package com.example.constructionappapi.services;

import com.example.constructionappapi.services.businessLogicLayer.CalendarSingleton;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.ConfigurableApplicationContext;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;
import org.springframework.scheduling.annotation.EnableScheduling;

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

            new ServerInit(configurableApplicationContext);
        } catch (Exception e) {
            System.out.println("Spring application could not run: " + e);
        }
    }

    /**
     * Makes sure a task runs every night at 1 am to update vacation statuses, workstatuses and guarantees statuses
     */
    @Bean
    public TaskDoneEveryNight task() {
        return new TaskDoneEveryNight(configurableApplicationContext);
    }
}
