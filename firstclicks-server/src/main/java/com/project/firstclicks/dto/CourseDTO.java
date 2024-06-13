package com.project.firstclicks.dto;

import java.util.List;

import com.project.firstclicks.entity.Course;

import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Data;

@Data
public class CourseDTO {
	@NotNull
	@Size(min = 3, max = 250)
	private String name;

	@NotBlank
	private String description;

	@NotBlank
	private String coverPath;

	private List<String> techStack;

	@Enumerated(EnumType.STRING)
	private Course.Level level;

}
