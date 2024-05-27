package com.project.firstclicks.controller.authentication;

//DTO para Estudiantes y Tutores
import java.time.LocalDate;

import jakarta.persistence.Column;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.Size;
import lombok.Data;

@Data
public class RequestUserClientDTO {
	
	@NotEmpty(message = "Usuario Obligatorio")
	@NotBlank(message = "Usuario Obligatorio")
	private String userName;
	@NotEmpty(message = "Contraseña Obligatoria")
	@NotBlank(message = "Contraseña Obligatoria")
	@Size(min = 8,message = "La contraseña debe ser al menos 8 caracteres")
	private String password;
	@NotEmpty(message = "Nombre Obligatorio")
	@NotBlank(message = "Nombre Obligatorio")
	private String firstName;
	@NotEmpty(message = "Apellido Obligatorio")
	@NotBlank(message = "Apellido Obligatorio")
	private String lastName;
	private LocalDate dateOfBirth;
	private Integer roleId;
	private String gender;
	@NotEmpty(message = "Email Obligatorio")
	@NotBlank(message = "Email Obligatorio")
	@Email(message = "Error de formato en Email")
	private String email;
	@NotEmpty(message = "Dirección Obligatoria")
	@NotBlank(message = "Dirección Obligatoria")
	private String address;
	private String description;
	private String photoRoute;
}
