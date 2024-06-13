package com.project.firstclicks.controller.course;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import com.project.firstclicks.dto.StudentCourseDTO;
import com.project.firstclicks.dto.StudentReviewDTO;

import com.project.firstclicks.entity.Course;
import com.project.firstclicks.entity.Student;
import com.project.firstclicks.entity.StudentCourse;
import com.project.firstclicks.entity.Tutor;
import com.project.firstclicks.service.StudentCourseAdminService;

import lombok.AllArgsConstructor;


@RequestMapping("student/courses")
@AllArgsConstructor
@RestController
public class StudentCourseAdmin {
	private StudentCourseAdminService studentCourseAdminService;
	
	@GetMapping("/list")
	public List<StudentCourseDTO> list() {
		return studentCourseAdminService.findAll(getIdAccess());
	}
	
	@ResponseStatus(HttpStatus.CREATED)
	@PostMapping("/enroll/{courseId}")
	public StudentCourseDTO enroll (@PathVariable Integer courseId) {
		return studentCourseAdminService.enroll(courseId,getIdAccess());
	}
	
	@DeleteMapping("/leave/{courseId}")
	public void leave (@PathVariable Integer courseId) {
		studentCourseAdminService.leave(courseId,getIdAccess());
	}

	@PutMapping("/{studentCourseId}")
	public StudentCourseDTO review(@PathVariable Integer studentCourseId, @RequestBody StudentReviewDTO studentReview) {
		return studentCourseAdminService.reviewCourse(studentCourseId,getIdAccess(),studentReview);
	}
	
	@GetMapping("/{studentCourseId}")
	public StudentCourseDTO getStudentCourseById(@PathVariable Integer studentCourseId) {
		return studentCourseAdminService.getStudentCourseById(getIdAccess(),studentCourseId);
	}
	
	private Integer getIdAccess() {
		Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
		Student currentTutor = (Student) authentication.getPrincipal();
		
		return currentTutor.getId();
	}
}
