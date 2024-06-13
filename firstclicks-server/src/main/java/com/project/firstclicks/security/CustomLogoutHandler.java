package com.project.firstclicks.security;

import java.time.LocalDateTime;
import java.time.Month;

import org.springframework.http.HttpHeaders;
import org.springframework.security.core.Authentication;
import org.springframework.security.web.authentication.logout.LogoutHandler;
import org.springframework.stereotype.Component;

import com.project.firstclicks.repository.TokenRepository;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.AllArgsConstructor;

@Component
@AllArgsConstructor
public class CustomLogoutHandler implements LogoutHandler{
	
	private final TokenRepository tokenRepository;

	@Override
	public void logout(
			HttpServletRequest request,
			HttpServletResponse response,
			Authentication authentication
			) {
			
		final String authHeader = request.getHeader(HttpHeaders.AUTHORIZATION);
		final String jwt;
		
		if(authHeader==null || !authHeader.startsWith("Bearer ")) {
			return;
		}
		
		jwt = authHeader.substring(7);
		var storedToken = tokenRepository.findByToken(jwt)
				.orElse(null);
		
		if(storedToken!=null) {
			//Se le pone en el pasado
			storedToken.setExpiresAt(LocalDateTime.of(2015, Month.JULY, 29, 19, 30, 40));
		}
		
		
	}

}
