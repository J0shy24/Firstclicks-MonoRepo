package com.project.firstclicks.controller.profile;

import java.util.List;

import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.project.firstclicks.dto.StudentPrivateProfileDTO;
import com.project.firstclicks.entity.Student;
import com.project.firstclicks.entity.Tutor;
import com.project.firstclicks.service.ProfileService;

import lombok.AllArgsConstructor;

@RequestMapping("student/profile")
@AllArgsConstructor
@RestController
public class studentControllerProfile {
	private ProfileService profileService;
	
	@GetMapping
	public StudentPrivateProfileDTO getStudentProfile() {
		return profileService.GetStutendByStudentId(getIdAccess());
	}
	
	@GetMapping("/idCourses")
	public List<Integer> IdsEnrolledCourses() {
		return profileService.IdsEnrolledCourses(getIdAccess());
	}
	
	private Integer getIdAccess() {
		Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
		Student currentStudent = (Student) authentication.getPrincipal();
		
		return currentStudent.getId();
	}

}
