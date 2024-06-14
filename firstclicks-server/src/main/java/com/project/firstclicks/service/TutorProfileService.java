package com.project.firstclicks.service;

import java.util.Optional;

import org.modelmapper.ModelMapper;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import com.project.firstclicks.config.ModelMapperConfig;
import com.project.firstclicks.dto.TutorProfilePublic;
import com.project.firstclicks.entity.Student;
import com.project.firstclicks.entity.Tutor;
import com.project.firstclicks.exceptionhandler.ResourceNotFoundException;
import com.project.firstclicks.repository.TutorRepository;

import lombok.AllArgsConstructor;

@AllArgsConstructor
@Service
public class TutorProfileService {
	
	private TutorRepository tutorRepository;
	private ModelMapper modelMapper;
	
	public TutorProfilePublic editProfile(TutorProfilePublic dto){
		Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
		Tutor currentTutor = (Tutor) authentication.getPrincipal();
		
		Tutor tutorProfile = tutorRepository.findById(currentTutor.getId()).orElseThrow(ResourceNotFoundException::new);
		
		tutorProfile.setDescription(dto.getDescription());
		tutorProfile.setPhotoRoute(dto.getPhotoRoute());
		
		tutorRepository.save(tutorProfile);
		TutorProfilePublic publicProfile= new TutorProfilePublic();
		
		modelMapper.map(tutorProfile, publicProfile);
		
		return publicProfile;
	}
	
	public TutorProfilePublic returnProfile() {
		Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
		Tutor currentTutor = (Tutor) authentication.getPrincipal();
		
		Tutor tutorProfile = tutorRepository.findById(currentTutor.getId()).orElseThrow(ResourceNotFoundException::new);
		TutorProfilePublic publicProfile= new TutorProfilePublic();
		
		modelMapper.map(tutorProfile, publicProfile);

		return publicProfile;
	}

}