package com.project.firstclicks.security;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import lombok.RequiredArgsConstructor;

@Configuration
@EnableWebSecurity
@RequiredArgsConstructor
@EnableMethodSecurity(securedEnabled=true)
public class SecurityConfiguration {
	
	@Autowired
	private final JwtFilter jwtAuthFilter;
	@Autowired
	private final AppUserDetailsService appUserDetailsService;
	@Autowired
	private final CustomLogoutHandler logoutHandler;
	
	@Bean
	public SecurityFilterChain securityFilterChain(HttpSecurity httpSecurity) throws Exception{
		//Permite a  todos en home y en login
		httpSecurity
			.cors(Customizer.withDefaults())
			.csrf(AbstractHttpConfigurer::disable)
			.authorizeHttpRequests( req->
				//Coge una lista de String(URL), hace lo que definimos.
				req.requestMatchers(
						 "/auth/**",
	                     "/v2/api-docs",
	                     "/v3/api-docs",
	                     "/v3/api-docs/**",
	                     "/swagger-resources",
	                     "/swagger-resources/**",
	                     "/configuration/ui",
	                     "/configuration/security",
	                     "/swagger-ui/**",
	                     "/webjars/**",
	                     "/swagger-ui.html",
	                     "/courses/**"
	                     )
						.permitAll()
					.requestMatchers(
							"/tutor/**")
						.hasAuthority("TUTOR")
					.requestMatchers(
							"/student/**")
						.hasAuthority("STUDENT")
						.anyRequest()
						.authenticated()
				)
				.sessionManagement(session->session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
				.authenticationProvider(authenticationProvider())
				.addFilterBefore(jwtAuthFilter,UsernamePasswordAuthenticationFilter.class)
				.logout(l->
						l.addLogoutHandler(logoutHandler)
						.logoutSuccessHandler(
								(request,response,authentication)->SecurityContextHolder.clearContext()
								));
					
		
		return httpSecurity.build();
		
	}
	
	@Bean
	public UserDetailsService userDetailsService() {
		return appUserDetailsService;
	}
	
	@Bean
	public AuthenticationProvider authenticationProvider() {
		DaoAuthenticationProvider provider = new DaoAuthenticationProvider();
		
		provider.setUserDetailsService(userDetailsService());
		provider.setPasswordEncoder(passwordEncoder());
		
		return provider;
	}
	
	@Bean
	public PasswordEncoder passwordEncoder() {
		return new BCryptPasswordEncoder();
	}

}
