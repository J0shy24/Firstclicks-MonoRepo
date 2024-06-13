package com.project.firstclicks.dto;

import java.sql.Timestamp;
import java.time.LocalDateTime;

import java.util.Set;
import java.util.List;

import com.project.firstclicks.entity.Course;
import com.project.firstclicks.entity.TechStack;

import lombok.Data;

@Data
public class CoursePublicDTO {
	private Integer id;
	private String name;
	private String description;
	private String coverPath;

	private Set<TechStack> techStack;
	private Course.Level level;
	private TutorProfilePublic tutor;
	private Timestamp createdDate;
	private Timestamp updatedDate;

	
	
	private List<String> studentReview;
	private Integer studentStars;
}
