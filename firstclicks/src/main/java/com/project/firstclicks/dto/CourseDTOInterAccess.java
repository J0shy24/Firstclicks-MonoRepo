package com.project.firstclicks.dto;

import java.util.List;

import com.project.firstclicks.entity.Course;
import com.project.firstclicks.entity.TechStack;

import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Data;

@Data
public class CourseDTOInterAccess {
	private String name;
	private String description;
	private String coverPath;
	private List<TechStack> techStack;
	private Course.Level level;

}
