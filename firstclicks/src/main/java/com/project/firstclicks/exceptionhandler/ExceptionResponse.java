package com.project.firstclicks.exceptionhandler;

import java.util.Map;
import java.util.Set;

import com.fasterxml.jackson.annotation.JsonInclude;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
@JsonInclude(JsonInclude.Include.NON_EMPTY)
public class ExceptionResponse {

	private Integer errorCode;
	private String errorDescription;
	private String error;
	private Set<String> validationErrors;
	private Map<String,String> errors;
}
