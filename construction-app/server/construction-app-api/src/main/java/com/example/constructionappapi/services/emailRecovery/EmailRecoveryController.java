/*
package com.example.constructionappapi.services.emailRecovery;

import com.example.constructionappapi.services.businessLogicLayer.repositories.AccountRepository;
import com.example.constructionappapi.services.dataAccessLayer.entities.AccountEntity;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.xml.bind.DatatypeConverter;
import java.security.SecureRandom;

@Controller
public class EmailRecoveryController {

    @Autowired
    private EmailService emailService;

    @Autowired
    private AccountRepository userRepository;

    @PostMapping("/initiate-email-recovery")
    @ResponseBody
    public void initiateEmailRecovery(@RequestParam("email") String email) {
        AccountEntity user = userRepository.findByEmail(email);

        if (user != null) {
            String recoveryToken = generateRecoveryToken();
            user.setRecoveryToken(recoveryToken);
            userRepository.save(user);

            String emailSubject = "Account Recovery";
            String emailText = "Click this link to recover your account: http://localhost:8080/recover?token=" + recoveryToken;
            emailService.sendEmail(email, emailSubject, emailText);
        }
    }

    private String generateRecoveryToken() {
        SecureRandom random = new SecureRandom();
        byte[] tokenBytes = new byte[20];
        random.nextBytes(tokenBytes);
        return DatatypeConverter.printHexBinary(tokenBytes);
    }

}
 */

