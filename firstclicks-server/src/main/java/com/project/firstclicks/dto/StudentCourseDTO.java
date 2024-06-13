package com.project.firstclicks.dto;

import java.time.LocalDateTime;

import lombok.Data;

@Data
public class StudentCourseDTO {
	private Integer id;
	private CoursePublicDTO CourseEnrolled;
	private Integer studentId;
	private Boolean studentActive;
	private String studentReview;
	private Integer studentStars;
	private LocalDateTime studentJoinDate;
}
