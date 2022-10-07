package com.example.constructionappapi.services;

import com.sun.jdi.event.ExceptionEvent;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class StartServer {
    public static void main(String[] args) {
        try{
            SpringApplication.run(StartServer.class, args);
            System.out.println("Server is running!");
        }catch (Exception e){
            System.out.println("Spring application could not run: " + e);
        }
    }
}
