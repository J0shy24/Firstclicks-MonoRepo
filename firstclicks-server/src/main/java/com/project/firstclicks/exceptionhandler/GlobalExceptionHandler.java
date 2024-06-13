package com.project.firstclicks.exceptionhandler;

import java.util.HashSet;
import java.util.Set;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.DisabledException;
import org.springframework.security.authentication.LockedException;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import jakarta.mail.MessagingException;

@RestControllerAdvice
public class GlobalExceptionHandler {
	
	@ExceptionHandler(LockedException.class)
	public ResponseEntity<ExceptionResponse> handleException(
			LockedException exp
			){
		return ResponseEntity
				.status(HttpStatus.UNAUTHORIZED)
				.body(
						ExceptionResponse.builder()
							.errorCode(ErrorCode.ACCOUNT_LOCKED.getCode())
							.errorDescription(ErrorCode.ACCOUNT_LOCKED.getDescription())
							.error(exp.getMessage())
							.build()
						);
	}
	
	@ExceptionHandler(DisabledException.class)
	public ResponseEntity<ExceptionResponse> handleException(
			DisabledException exp
			){
		return ResponseEntity
				.status(HttpStatus.UNAUTHORIZED)
				.body(
						ExceptionResponse.builder()
							.errorCode(ErrorCode.ACCOUNT_DISABLED.getCode())
							.errorDescription(ErrorCode.ACCOUNT_DISABLED.getDescription())
							.error(exp.getMessage())
							.build()
						);
	}
	
	@ExceptionHandler(BadCredentialsException.class)
	public ResponseEntity<ExceptionResponse> handleException(
			BadCredentialsException exp
			){
		return ResponseEntity
				.status(HttpStatus.UNAUTHORIZED)
				.body(
						ExceptionResponse.builder()
							.errorCode(ErrorCode.BAD_CREDENTIALS.getCode())
							.errorDescription(ErrorCode.BAD_CREDENTIALS.getDescription())
							.error(exp.getMessage())
							.build()
						);
	}
	
	//Error si no puede enviar el mail de token
	@ExceptionHandler(MessagingException.class)
	public ResponseEntity<ExceptionResponse> handleException(
			MessagingException exp
			){
		return ResponseEntity
				.status(HttpStatus.INTERNAL_SERVER_ERROR)
				.body(
						ExceptionResponse.builder()
							.error(exp.getMessage())
							.build()
						);
	}
	
	@ExceptionHandler(MethodArgumentNotValidException.class)
	public ResponseEntity<ExceptionResponse> handleException(
			MethodArgumentNotValidException exp
			){
		
		//Hace un set de todos los errores que le llega.
		Set<String> errors = new HashSet<>();
		exp.getBindingResult().getAllErrors()
			.forEach(error->{
				var errorMessage = error.getDefaultMessage();
				errors.add(errorMessage);
			});
		return ResponseEntity
				.status(HttpStatus.BAD_REQUEST)
				.body(
						ExceptionResponse.builder()
							.validationErrors(errors)
							.build()
						);
	}
	
	@ExceptionHandler(Exception.class)
	public ResponseEntity<ExceptionResponse> handleException(
			Exception exp
			){
		//Log Exception
		exp.printStackTrace();
		return ResponseEntity
				.status(HttpStatus.INTERNAL_SERVER_ERROR)
				.body(
						ExceptionResponse.builder()
							.errorDescription("Error Interno, informe un administrador")
							.error(exp.getMessage())
							.build()
						);
	}
	
	@ExceptionHandler(ResourceNotFoundException.class)
	public ResponseEntity<ExceptionResponse> handleException(
			ResourceNotFoundException exp
			){
		//Resource not found
		exp.printStackTrace();
		return ResponseEntity
				.status(HttpStatus.NOT_FOUND)
				.body(
						ExceptionResponse.builder()
							.errorDescription("No se ha encontrado el recurso")
							.error(exp.getMessage())
							.build()
						);
	}
	
	@ExceptionHandler(BadRequestException.class)
	public ResponseEntity<ExceptionResponse> handleException(
			BadRequestException exp
			){
		//Bad Request
		exp.printStackTrace();
		return ResponseEntity
				.status(HttpStatus.BAD_REQUEST)
				.body(
						ExceptionResponse.builder()
							.errorDescription("No se permite")
							.error(exp.getMessage())
							.build()
						);
	}
	
}
