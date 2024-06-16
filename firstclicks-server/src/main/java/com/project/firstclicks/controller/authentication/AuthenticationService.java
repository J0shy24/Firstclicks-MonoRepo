package com.project.firstclicks.controller.authentication;

import java.security.SecureRandom;
import java.time.LocalDateTime;
import java.time.Month;
import java.util.HashMap;
import java.util.List;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpHeaders;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.project.firstclicks.security.JwtService;

import jakarta.mail.MessagingException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;

import com.project.firstclicks.dto.UserProfileDTO;
import com.project.firstclicks.email.EmailService;
import com.project.firstclicks.email.EmailTemplateName;
import com.project.firstclicks.entity.AppUser;
import com.project.firstclicks.entity.Client;
import com.project.firstclicks.entity.Student;
import com.project.firstclicks.entity.Token;
import com.project.firstclicks.entity.Tutor;
import com.project.firstclicks.repository.AppUserRepository;
import com.project.firstclicks.repository.ClientRepository;
import com.project.firstclicks.repository.RoleRepository;
import com.project.firstclicks.repository.StudentRepository;
import com.project.firstclicks.repository.TokenRepository;
import com.project.firstclicks.repository.TutorRepository;

@Service
@RequiredArgsConstructor
public class AuthenticationService {
	
	private final RoleRepository roleRepository;
	private final PasswordEncoder passwordEncoder;
	private final TutorRepository tRepository;
	private final StudentRepository sRepository;
	private final TokenRepository tokenRepository;
	private final ClientRepository clientRepository;
	private final EmailService emailService;
	private final AuthenticationManager authenticationManager;
	public final JwtService jwtService;
	public final AppUserRepository userRepository;
	
	@Value("${application.mailing.frontend.activation-url}")
	private String activationURL;
	
	
	//Registrar Cliente
	public void register(RequestUserClientDTO request) throws MessagingException {
		
		var userRole = roleRepository.findById(request.getRoleId())
				.orElseThrow(()-> new IllegalStateException("Role is not initialized"));
		
			//TODO Mejora la funcion, que hay demasiado codigo duplicado.
		
			//Si es tutor
			if(userRole.getRoleName().equals("TUTOR")) {
				Tutor newTutor = new Tutor();
				
				newTutor.setUsername(request.getUserName());
				newTutor.setPassword(passwordEncoder.encode(request.getPassword()));
				newTutor.setFirstName(request.getFirstName());
				newTutor.setLastName(request.getLastName());
				newTutor.setEmail(request.getEmail());
				newTutor.setDateOfBirth(request.getDateOfBirth());
				newTutor.setGender(request.getGender());
				newTutor.setAddress(request.getAddress());
				newTutor.setPhoneNumber(request.getPhoneNumber());
				newTutor.setDescription(request.getDescription());
				newTutor.setRoles(List.of(userRole));
				newTutor.setAccountLocked(false);
				//User no esta habilitado porque tendrá que activar su cuenta
				newTutor.setEnabled(false);
				
				if(request.getPhotoRoute().isEmpty()||request.getPhotoRoute().isBlank()||request.getPhotoRoute()==null) {
	
					if(newTutor.getGender().equals("Hombre")||newTutor.getGender().equals("HOMBRE")||newTutor.getGender().equals("hombre")) {
						newTutor.setPhotoRoute("male_tutor_icon.png");
					}else {
						newTutor.setPhotoRoute("female_tutor_icon.png");
					}

				}else {
					newTutor.setPhotoRoute(request.getPhotoRoute());
				}
				
				
				tRepository.saveAndFlush(newTutor);
				sendEmailValidation(newTutor);
			}
			
			//Si es Estudiante
			if(userRole.getRoleName().equals("STUDENT")) {
				Student newStudent = new Student();
				
				newStudent.setUsername(request.getUserName());
				newStudent.setPassword(passwordEncoder.encode(request.getPassword()));
				newStudent.setFirstName(request.getFirstName());
				newStudent.setLastName(request.getLastName());
				newStudent.setEmail(request.getEmail());
				newStudent.setDateOfBirth(request.getDateOfBirth());
				newStudent.setGender(request.getGender());
				newStudent.setAddress(request.getAddress());
				newStudent.setDescription(request.getDescription());
				newStudent.setRoles(List.of(userRole));
				newStudent.setAccountLocked(false);
				//User no esta habilitado porque tendrá que activar su cuenta
				newStudent.setEnabled(false);
				
				if(request.getPhotoRoute().isEmpty()||request.getPhotoRoute().isBlank()||request.getPhotoRoute()==null) {
					if(newStudent.getGender().equals("Hombre")||newStudent.getGender().equals("HOMBRE")||newStudent.getGender().equals("hombre")) {
						newStudent.setPhotoRoute("male_student_icon.png");
					}else {
						newStudent.setPhotoRoute("female_student_icon.png");
					}
				}else {
					newStudent.setPhotoRoute(request.getPhotoRoute());
				}
				
				sRepository.saveAndFlush(newStudent);
				sendEmailValidation(newStudent);
			}
		
	}
	
	public AuthenticationResponse authenticate(AuthenticationRequestDTO request) {
		var auth = authenticationManager.authenticate(
					new UsernamePasswordAuthenticationToken(
							request.getUserName(),
							request.getPassword()
							)
				);
		
		var claims = new HashMap<String,Object>();
		var user = ((AppUser)auth.getPrincipal());
		claims.put("username", user.getUsername());
		var jwtToken = jwtService.generateToken(claims,user);
		//si se autentica bien le cambiamos el last session.
		user.setLastSession(LocalDateTime.now());
		userRepository.saveAndFlush(user);

		Client client = (Client) user;
		SaveAuthToken(jwtToken,client);
		
		UserProfileDTO returnUser = new UserProfileDTO();
		returnUser.setUserName(user.getUsername());
		returnUser.setRole(user.getRoles().get(0).getRoleName());
		
		return AuthenticationResponse.builder().token(jwtToken).user(returnUser).build();
	}
		
	//Activate tras enviar el email.
	@Transactional
	public void activateAccount(String token) throws MessagingException {
		Token savedToken = tokenRepository.findByToken(token)
				.orElseThrow(()->new RuntimeException("Invalid Token"));
		
		//Si el token se caduca se envia una nueva.
		if(LocalDateTime.now().isAfter(savedToken.getExpiresAt())) {
			sendEmailValidation(savedToken.getUser());
			throw new RuntimeException("Expired token. A new token had been sent.");
		}
		
		var user = clientRepository.findById(savedToken.getUser().getId())
				.orElseThrow(()-> new UsernameNotFoundException("User not found"));
		
		user.setEnabled(true);
		clientRepository.saveAndFlush(user);
		savedToken.setValidatedAt(LocalDateTime.now());
		tokenRepository.saveAndFlush(savedToken);
		
	}

	
	//Private Service Methods
	//Envia el email de activación de cuenta.
	private void sendEmailValidation(Client client) throws MessagingException {
		var newToken = generateAndSaveActivationToken(client);
		emailService.sendEmail(client.getEmail(), client.getFullName(), EmailTemplateName.ACTIVATE_ACCOUNT,activationURL, newToken, "Account Activation");
	}

	private String generateAndSaveActivationToken(Client client) {
		//generar un token
		String generatedToken = generateActivationToken(6);
		Token token = new Token();
				
		token.setToken(generatedToken);
		token.setCreatedAt(LocalDateTime.now());
		//caduca en 15 mins
		token.setExpiresAt(LocalDateTime.now().plusMinutes(15));
		token.setUser(client);
		
		tokenRepository.saveAndFlush(token);
		return generatedToken;
	}

	private String generateActivationToken(int length) {
		String characters = "0123456789";
		StringBuilder tokenBuilder = new StringBuilder();
		SecureRandom secureRandom = new SecureRandom();
		
		for(int i=0;i<length;i++) {
			int randomIndex = secureRandom.nextInt(characters.length());
			tokenBuilder.append(characters.charAt(randomIndex));
		}
		return tokenBuilder.toString();
	}
	

	private void SaveAuthToken(String jwttoken,Client client) {
		//generar un token
		Token token = new Token();
				
		token.setToken(jwttoken);
		token.setCreatedAt(LocalDateTime.now());
		//caduca en 15 mins
		token.setExpiresAt(LocalDateTime.now().plusDays(1));
		token.setUser(client);
		
		tokenRepository.saveAndFlush(token);
	}

}
