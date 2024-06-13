package com.project.firstclicks.security;

import java.io.IOException;
import java.time.LocalDateTime;

import org.springframework.http.HttpHeaders;
import org.springframework.lang.NonNull;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Service;
import org.springframework.web.filter.OncePerRequestFilter;

import com.project.firstclicks.repository.TokenRepository;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;


@Service
@RequiredArgsConstructor
public class JwtFilter extends OncePerRequestFilter {
	
	private final JwtService jwtService;
	private final AppUserDetailsService userDetailsService;
	private final TokenRepository tokenRepository;

	@Override
	protected void doFilterInternal(
			@NonNull HttpServletRequest request, 
			@NonNull HttpServletResponse response, 
			@NonNull FilterChain filterChain
	)throws ServletException, IOException {
		if (request.getServletPath().contains("/api/firstclicks/auth")){
			filterChain.doFilter(request, response);
			return;
		}
		
		final String authHeader = request.getHeader(HttpHeaders.AUTHORIZATION);
		final String jwt;
		final String userName;
		
		if(authHeader==null || !authHeader.startsWith("Bearer ")) {
			filterChain.doFilter(request, response);
			return;
		}
		
		jwt = authHeader.substring(7);
		userName = jwtService.extractUsername(jwt);
		if(userName!=null && SecurityContextHolder.getContext().getAuthentication()==null) {
			UserDetails userDetails = userDetailsService.loadUserByUsername(userName);
			var storedToken=tokenRepository.findByToken(jwt).orElse(null);
			Boolean storedTokenIsValid = storedToken!=null&&LocalDateTime.now().isBefore(storedToken.getExpiresAt());
			if(jwtService.isTokenValid(jwt, userDetails)&&storedTokenIsValid) {
				UsernamePasswordAuthenticationToken authToken = new UsernamePasswordAuthenticationToken(userDetails, null, userDetails.getAuthorities());
				authToken.setDetails(
						new WebAuthenticationDetailsSource().buildDetails(request)
						);
				SecurityContextHolder.getContext().setAuthentication(authToken);
				filterChain.doFilter(request, response);
			}
		}
		
	}

}
