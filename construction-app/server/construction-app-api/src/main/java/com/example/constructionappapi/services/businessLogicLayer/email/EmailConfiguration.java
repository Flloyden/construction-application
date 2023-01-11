package com.example.constructionappapi.services.businessLogicLayer.email;

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

            mailSender.setHost(properties.getProperty("email.host"));
            mailSender.setPort(Integer.parseInt(properties.getProperty("email.port")));
            mailSender.setUsername(properties.getProperty("app.email"));
            mailSender.setPassword(properties.getProperty("app.email.password"));

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