package com.example.constructionappapi.services.presentationLayer;

import com.example.constructionappapi.services.businessLogicLayer.repositories.AccountRepository;
import com.example.constructionappapi.services.dataAccessLayer.entities.AccountEntity;
import com.example.constructionappapi.services.emailRecovery.EmailService;
import com.example.constructionappapi.services.presentationLayer.bodies.AuthenticationRequest;
import com.example.constructionappapi.services.presentationLayer.bodies.UserInformation;
import com.example.constructionappapi.services.security.JwtUtils;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import javax.xml.bind.DatatypeConverter;
import java.security.SecureRandom;
import java.util.Optional;

@RestController
@RequestMapping("/api/v1")
@RequiredArgsConstructor
public class AuthenticationAPI {
    private final AuthenticationManager authenticationManager;
    private final JwtUtils jwtUtils;

    @PostMapping("/authenticate")
    public ResponseEntity<UserInformation> authenticate(@RequestBody AuthenticationRequest authenticationRequest) {
        try {
            return Optional.ofNullable(authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(authenticationRequest.getEmail(), authenticationRequest.getPassword())).getPrincipal())
                    .map(AccountEntity.class::cast)
                    .map(accountEntity -> ResponseEntity
                            .status(HttpStatus.OK)
                            .header("Authorization", "Bearer " + jwtUtils.generateToken(accountEntity))
                            .body(new UserInformation(
                                    accountEntity.getId(),
                                    accountEntity.getName(),
                                    accountEntity.getEmail(),
                                    accountEntity.getProfileImage(),
                                    accountEntity.getRole())
                            )).orElseGet(() -> ResponseEntity.status(HttpStatus.UNAUTHORIZED).build());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @PostMapping("/logout")
    public ResponseEntity<String> logout(HttpServletRequest request) {
        /*
        String authHeader = request.getHeader("Authorization");
        if (authHeader != null) {
            String token = authHeader.substring(7);
            jwtUtils.invalidateToken(token);
        }
        */
        return ResponseEntity.ok("Successfully logged out");
    }

    @Autowired
    private EmailService emailService;

    @Autowired
    private AccountRepository userRepository;

    @PostMapping("/initiate-email-recovery")
    public ResponseEntity initiateEmailRecovery(@RequestParam("email") String email) {
        AccountEntity user = userRepository.findByEmail(email);

        if (user != null) {
            String recoveryToken = generateRecoveryToken();
            user.setRecoveryToken(recoveryToken);
            userRepository.save(user);

            String emailSubject = "Account Recovery";
            String emailText = "Click this link to recover your account: http://your-site.com/recover?token=" + recoveryToken;
            emailService.sendEmail(email, emailSubject, emailText);
            return ResponseEntity.ok().build();
        }

        return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
    }

    private String generateRecoveryToken() {
        SecureRandom random = new SecureRandom();
        byte[] tokenBytes = new byte[20];
        random.nextBytes(tokenBytes);
        return DatatypeConverter.printHexBinary(tokenBytes);
    }

    @GetMapping("/recover")
    public ResponseEntity<UserInformation> recoverAccount(@RequestParam("token") String token) {
        return userRepository.findByRecoveryToken(token).map(accountEntity -> {
            String newPassword = resetPassword(accountEntity);
            userRepository.save(accountEntity);
            return authenticate(new AuthenticationRequest(accountEntity.getEmail(), newPassword));
        }).orElseGet(() -> ResponseEntity.status(HttpStatus.NOT_FOUND).build());
    }

    private String resetPassword(AccountEntity user) {
        // Generate a new random password for the user
        SecureRandom random = new SecureRandom();
        byte[] passwordBytes = new byte[10];
        random.nextBytes(passwordBytes);
        String newPassword = DatatypeConverter.printHexBinary(passwordBytes);

        // Set the user's password to the new password
        user.setPassword(newPassword);
        return newPassword;
    }
}
