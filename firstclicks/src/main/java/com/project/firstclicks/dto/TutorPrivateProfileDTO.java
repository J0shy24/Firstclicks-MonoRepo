package com.project.firstclicks.dto;

import java.time.LocalDate;

import lombok.Data;

@Data
public class TutorPrivateProfileDTO {
	String username;
	String firstName;
	String lastName;
	String photoRoute;
	LocalDate dateOfBirth;
	String address;
	String description;
	String email;
	String gender;
	boolean isEnabled;
}
