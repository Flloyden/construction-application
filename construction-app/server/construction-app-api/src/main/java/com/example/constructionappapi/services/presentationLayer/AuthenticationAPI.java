package com.example.constructionappapi.services.presentationLayer;

import com.example.constructionappapi.services.businessLogicLayer.email.EmailService;
import com.example.constructionappapi.services.businessLogicLayer.repositories.AccountRepository;
import com.example.constructionappapi.services.businessLogicLayer.security.JwtUtils;
import com.example.constructionappapi.services.dataAccessLayer.entities.AccountEntity;
import com.example.constructionappapi.services.presentationLayer.bodies.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletRequest;
import java.util.Optional;

/**
 * API for authentication. This is where the client/front-end and server communication is made possible.
 */
@RestController
@RequestMapping("/api/v1")
public class AuthenticationAPI {
    @Autowired
    private AuthenticationManager authenticationManager;
    @Autowired
    private JwtUtils jwtUtils;
    @Autowired
    private EmailService emailService;
    @Autowired
    private AccountRepository accountRepository;

    @PostMapping("/authenticate")
    public ResponseEntity<UserInformation> authenticate(@RequestBody AuthenticationRequest authenticationRequest) {
        try {
            final Optional<AccountEntity> accountEntity = Optional.ofNullable(authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(authenticationRequest.getEmail(), authenticationRequest.getPassword())).getPrincipal()).map(AccountEntity.class::cast);
            if (accountEntity.isEmpty()) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
            }

            return accountEntity.map(user -> {
                user.setRefreshToken(jwtUtils.generateRefreshToken(user));
                accountRepository.save(user);

                return ResponseEntity
                        .status(HttpStatus.OK)
                        .header("Authorization", "Bearer " + jwtUtils.generateToken(user))
                        .header("RefreshToken", user.getRefreshToken())
                        .body(new UserInformation(
                                user.getId(),
                                user.getName(),
                                user.getEmail(),
                                user.getProfileImage(),
                                user.getRole())
                        );
            }).orElseGet(() -> ResponseEntity.status(HttpStatus.UNAUTHORIZED).build());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @PostMapping("/refresh")
    public ResponseEntity<String> refreshToken(@RequestBody RefreshTokenRequest request) {
        // Get the refresh token from the request body
        String refreshToken = request.getRefreshToken();

        // Retrieve the user associated with the refresh token
        Optional<AccountEntity> user = accountRepository.findByRefreshToken(refreshToken);
        if (user.isEmpty()) {
            return ResponseEntity.status(401).body("Refresh misslyckades");
        }

        // Check that the refresh token has not expired and is still valid
        try {
            jwtUtils.isTokenExpired(refreshToken, jwtUtils.getJwtRefreshKey());
        } catch (Exception e) {
            return ResponseEntity.status(401).body("Refresh misslyckades");
        }

        // Generate a new access token and refresh token
        String newAccessToken = jwtUtils.generateToken(user.get());
        String newRefreshToken = jwtUtils.generateRefreshToken(user.get());

        // Update the user's refresh token
        user.get().setRefreshToken(newRefreshToken);
        accountRepository.save(user.get());

        // Return the new access token to the client
        return ResponseEntity
                .ok()
                .header("Authorization", "Bearer " + newAccessToken)
                .header("RefreshToken", newRefreshToken)
                .build();
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
        return ResponseEntity.ok("Utloggad.");
    }

    @PostMapping("/initiate-email-recovery")
    public ResponseEntity<?> initiateEmailRecovery(@RequestBody EmailRecoveryRequest emailRecoveryRequest) {
        AccountEntity user = accountRepository.findByEmail(emailRecoveryRequest.getEmail());

        if (user != null) {
            String recoveryToken = accountRepository.generateRecoveryToken();
            user.setRecoveryToken(recoveryToken);
            accountRepository.save(user);

            String emailSubject = "Återställning av lösenord till BiTs";
            String emailText = "Hallå Thomas!\n \nKlicka på länken så kommer ett nytt lösenord skickas till dig på denna e-mail inom några minuter: \nhttp://bits.norrto.se/recover?token=" + recoveryToken + ".\n" +
                    "\nGlöm inte att sedan direkt logga in och uppdatera lösenordet till ett eget!\n \nMvh Construction Crew :)";
            emailService.sendEmail(emailRecoveryRequest.getEmail(), emailSubject, emailText);
            return ResponseEntity.status(HttpStatus.ACCEPTED).build();
        }

        return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Användaren kunde inte hittas");
    }

    @PostMapping("/recover")
    public ResponseEntity<?> recoverAccount(@RequestBody RecoveryTokenRequest recoveryTokenRequest) {
        try {
            Optional<AccountEntity> accountEntity = accountRepository.findByRecoveryToken(recoveryTokenRequest.getToken());
            if (accountEntity.isEmpty()) {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("En användare med detta tokenet kunde inte hittas");
            }

            String emailSubject = "Nytt lösenord";
            String emailText = accountRepository.resetPassword(accountEntity.get());
            emailService.sendEmail(accountEntity.get().getEmail(), emailSubject, emailText);

            accountEntity.get().setRecoveryToken(null);
            accountRepository.save(accountEntity.get());

            return ResponseEntity.status(HttpStatus.ACCEPTED).body("Nytt lösenord skickat");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @PostMapping("/change-password")
    public ResponseEntity<?> changePassword(@RequestBody PasswordChangeRequest passwordChangeRequest) {
        return accountRepository.changePassword(
                passwordChangeRequest.getEmail(),
                passwordChangeRequest.getOldPassword(),
                passwordChangeRequest.getNewPassword(),
                passwordChangeRequest.getNewPasswordConfirmation());
    }
}
