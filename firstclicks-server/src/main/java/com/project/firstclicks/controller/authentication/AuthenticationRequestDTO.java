package com.project.firstclicks.controller.authentication;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.Size;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class AuthenticationRequestDTO {
	@NotEmpty(message = "Usuario Obligatorio")
	@NotBlank(message = "Usuario Obligatorio")
	private String userName;
	@NotEmpty(message = "Contraseña Obligatoria")
	@NotBlank(message = "Contraseña Obligatoria")
	@Size(min = 8,message = "La contraseña debe ser al menos 8 caracteres")
	private String password;
}
