package com.project.firstclicks.controller.profile;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.project.firstclicks.dto.TutorProfilePublic;
import com.project.firstclicks.service.ProfileService;

import lombok.AllArgsConstructor;

@RequestMapping("profile")
@AllArgsConstructor
@RestController
public class publicControllerProfile {
	private ProfileService profileService;
	
	@GetMapping("/{tutorId}")
	public TutorProfilePublic getPublicTutorProfile(@PathVariable Integer tutorId) {
		return profileService.getPublicTutorProfile(tutorId);
	}
}
