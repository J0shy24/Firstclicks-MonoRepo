package com.project.firstclicks.controller.authentication;

import com.project.firstclicks.dto.UserProfileDTO;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class AuthenticationResponse {
	private String token; 
	private UserProfileDTO user;
}
