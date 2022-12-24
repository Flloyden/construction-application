package com.example.constructionappapi.services.presentationLayer;

import com.example.constructionappapi.services.businessLogicLayer.repositories.AccountRepository;
import com.example.constructionappapi.services.security.AuthenticationRequest;
import com.example.constructionappapi.services.security.AuthenticationResponse;
import com.example.constructionappapi.services.security.JwtUtils;
import com.example.constructionappapi.services.dataAccessLayer.entities.AccountEntity;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.AuthenticationException;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/v1")
@RequiredArgsConstructor
public class AuthenticationAPI {
    private final AuthenticationManager authenticationManager;
    private final JwtUtils jwtUtils;
    private final AccountRepository accountRepository;

    @PostMapping("/authenticate")
    public ResponseEntity<AuthenticationResponse> authenticate(@RequestBody AuthenticationRequest request) {
        try {
            authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(request.getEmail(), request.getPassword()));
        } catch (AuthenticationException e) {
            return ResponseEntity.status(401).body(new AuthenticationResponse("error", "Authentication Failed", null));
        }

        final AccountEntity accountInformation = accountRepository.findUserByEmail(request.getEmail());
        if (accountInformation != null) {
            final AuthenticationResponse.User userInformation =
                    new AuthenticationResponse.User(
                            accountInformation.getId(),
                            accountInformation.getName(),
                            accountInformation.getEmail(),
                            accountInformation.getProfileImage(),
                            accountInformation.getRole());
            System.out.println(accountInformation.getUsername());

            final AuthenticationResponse response = new AuthenticationResponse();
            response.setStatus("ok");
            response.setMessage("Logged in");
            response.setUser(userInformation);

            return ResponseEntity
                    .ok()
                    .header("Authorization", "Bearer " + jwtUtils.generateToken(accountInformation))
                    .body(response);
        }

        return ResponseEntity.status(40).body(new AuthenticationResponse("error", "Email not found", null));
    }
}
