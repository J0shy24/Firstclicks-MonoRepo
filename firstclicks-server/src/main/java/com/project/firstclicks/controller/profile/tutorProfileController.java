package com.project.firstclicks.controller.profile;

import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.project.firstclicks.dto.TutorPrivateProfileDTO;
import com.project.firstclicks.dto.TutorProfilePublic;
import com.project.firstclicks.entity.Tutor;
import com.project.firstclicks.service.ProfileService;
import com.project.firstclicks.service.TutorCourseAdminService;
import com.project.firstclicks.service.TutorProfileService;

import lombok.AllArgsConstructor;

@RequestMapping("tutor/profile")
@AllArgsConstructor
@RestController
public class tutorProfileController {
	private ProfileService profileService;
	private TutorProfileService tutorProfileService;
	
	@GetMapping
	public TutorPrivateProfileDTO getTutorProfile() {
		return profileService.GetTutorByTutorId(getIdAccess());
	}
	
	@PutMapping
	public TutorProfilePublic editProfile(TutorProfilePublic dto) {
		return tutorProfileService.editProfile(dto);
	}
	
	
	
	private Integer getIdAccess() {
		Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
		Tutor currentTutor = (Tutor) authentication.getPrincipal();
		
		return currentTutor.getId();
	}
}
