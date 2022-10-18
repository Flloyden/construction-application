package com.example.constructionappapi.services;

import com.sun.jdi.event.ExceptionEvent;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import java.util.Date;
import java.util.Timer;
import java.util.TimerTask;

@SpringBootApplication
public class StartServer {
    public static void main(String[] args) {
        try{
            SpringApplication.run(StartServer.class, args);
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

        }catch (Exception e){
            System.out.println("Spring application could not run: " + e);
        }
    }
}
