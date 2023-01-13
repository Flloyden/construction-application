package com.example.constructionappapi.services.presentationLayer.bodies;

import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class AuthenticationRequest {
    private String email;
    private String password;
}
