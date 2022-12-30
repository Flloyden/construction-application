package com.example.constructionappapi.services.presentationLayer.bodies;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.Lob;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class CheckPasswordRequest {
    private String newEmail;
    private String password;
}
