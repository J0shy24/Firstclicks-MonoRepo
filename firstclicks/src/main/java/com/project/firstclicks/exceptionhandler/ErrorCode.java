package com.project.firstclicks.exceptionhandler;

import org.springframework.http.HttpStatus;

import lombok.Getter;

public enum ErrorCode {
	
	NO_CODE(0,HttpStatus.NOT_IMPLEMENTED,"Sin Codigo"),
	
	ACCOUNT_LOCKED(302,HttpStatus.FORBIDDEN,"Cuenta bloqueada"),
	
	INCORRECT_PASSWORD(303,HttpStatus.BAD_REQUEST,"Contraseña incorrecta"),
	
	NEW_PASSWORD_INCORRECT(304,HttpStatus.BAD_REQUEST,"Las contraseñas deben ser igual"),
	
	BAD_CREDENTIALS(305,HttpStatus.FORBIDDEN,"Usuario o Contraseña no valida"),
	
	ACCOUNT_DISABLED(306,HttpStatus.FORBIDDEN,"Cuenta deshabilitada, activa el Token")
	;
	
	
	
	@Getter
	private final int code;
	@Getter
	private final String description;
	@Getter
	private final HttpStatus httpstatus;
	
	ErrorCode (Integer code,HttpStatus httpstatus, String description){
		this.code=code;
		this.description=description;
		this.httpstatus=httpstatus;
	}
}
