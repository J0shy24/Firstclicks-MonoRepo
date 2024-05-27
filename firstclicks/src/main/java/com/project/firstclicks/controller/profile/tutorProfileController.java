package com.project.firstclicks.controller.profile;

import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.project.firstclicks.dto.TutorPrivateProfileDTO;
import com.project.firstclicks.dto.TutorProfilePublic;
import com.project.firstclicks.entity.Tutor;
import com.project.firstclicks.service.ProfileService;
import com.project.firstclicks.service.TutorCourseAdminService;

import lombok.AllArgsConstructor;

@RequestMapping("tutor/profile")
@AllArgsConstructor
@RestController
public class tutorProfileController {
	private ProfileService profileService;
	
	@GetMapping
	public TutorPrivateProfileDTO getTutorProfile() {
		return profileService.GetTutorByTutorId(getIdAccess());
	}
	
	
	
	private Integer getIdAccess() {
		Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
		Tutor currentTutor = (Tutor) authentication.getPrincipal();
		
		return currentTutor.getId();
	}
}
