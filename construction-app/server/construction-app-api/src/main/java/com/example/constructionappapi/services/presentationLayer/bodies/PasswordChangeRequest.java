package com.example.constructionappapi.services.presentationLayer.bodies;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class PasswordChangeRequest {
    private String email;
    private String oldPassword;
    private String newPassword;
    private String newPasswordConfirmation;
}
