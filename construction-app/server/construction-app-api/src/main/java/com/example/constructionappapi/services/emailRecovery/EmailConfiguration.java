package com.example.constructionappapi.services.emailRecovery;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.JavaMailSenderImpl;

import java.io.IOException;
import java.io.InputStream;
import java.util.Properties;

@Configuration
public class EmailConfiguration {

    @Bean
    public JavaMailSender getJavaMailSender() {
        JavaMailSenderImpl mailSender = new JavaMailSenderImpl();
        try (InputStream inputStream = this.getClass().getResourceAsStream("/application.properties")) {
            Properties properties = new Properties();
            properties.load(inputStream);

            mailSender.setHost("smtp.gmail.com");
            mailSender.setPort(587);
            mailSender.setUsername(properties.getProperty("app-email")); //TODO: Need to create/get an gmail(?) account for the application.
            mailSender.setPassword(properties.getProperty("app-email-password")); //TODO: Need to get app password from google.

            Properties props = mailSender.getJavaMailProperties();
            props.put("mail.transport.protocol", "smtp");
            props.put("mail.smtp.auth", "true");
            props.put("mail.smtp.starttls.enable", "true");
            props.put("mail.debug", "true");
        } catch (IOException e) {
            e.printStackTrace();
        }

        return mailSender;
    }
}