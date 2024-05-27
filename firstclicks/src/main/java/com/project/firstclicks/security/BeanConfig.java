package com.project.firstclicks.security;

import java.util.Arrays;
import java.util.Collections;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpHeaders;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import org.springframework.web.filter.CorsFilter;


@Configuration
public class BeanConfig {

	@Bean
	public AuthenticationManager authenticationManager(AuthenticationConfiguration config) throws Exception {
		return config.getAuthenticationManager();
	}
	
	@Bean
	public CorsFilter corsFilter() {
		final UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
		final CorsConfiguration config = new CorsConfiguration();
		config.setAllowCredentials(true);
		config.setAllowedOrigins(Collections.singletonList("http://localhost:4200"));
		config.setAllowedHeaders(Arrays.asList(
				HttpHeaders.ORIGIN,
				HttpHeaders.CONTENT_TYPE,
				HttpHeaders.ACCEPT,
				HttpHeaders.AUTHORIZATION
				));
		config.setAllowedMethods(Arrays.asList(
				"GET",
				"POST",
				"DELETE",
				"PUT",
				"PATCH"
				));
		
		source.registerCorsConfiguration("/**", config);
		return new CorsFilter(source);
	}
}
