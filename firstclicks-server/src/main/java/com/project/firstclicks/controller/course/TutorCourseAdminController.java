package com.project.firstclicks.controller.course;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonMappingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.project.firstclicks.dto.CourseDTO;
import com.project.firstclicks.dto.CoursePublicDTO;
import com.project.firstclicks.entity.Course;
import com.project.firstclicks.entity.Tutor;
import com.project.firstclicks.service.TutorCourseAdminService;

import jakarta.servlet.http.HttpServletRequest;
import lombok.AllArgsConstructor;

@RequestMapping("tutor/courses")
@AllArgsConstructor
@RestController
public class TutorCourseAdminController {
	private TutorCourseAdminService tutorCourseAdminService;
	
	@GetMapping("/list")
	public List<CoursePublicDTO> list() {
		return tutorCourseAdminService.findAll(getIdAccess());
	}
	
	
	@GetMapping
	public Page<CoursePublicDTO> paginate(@PageableDefault(size = 5, sort = "name") Pageable pageable) {
		return tutorCourseAdminService.paginate(pageable,getIdAccess());
	}
	
	@ResponseStatus(HttpStatus.CREATED)
	@PostMapping
	public CoursePublicDTO create(@RequestBody @Validated CourseDTO courseFormDTO) {
		return tutorCourseAdminService.create(courseFormDTO,getIdAccess());
	}
	
	@GetMapping("/{id}")
	public CoursePublicDTO get(@PathVariable Integer id,HttpServletRequest request) {
		return tutorCourseAdminService.findByIdDTO(id,getIdAccess());
	}
	
	@PutMapping("/{id}")
	public CoursePublicDTO update(@PathVariable Integer id, @RequestBody @Validated CourseDTO courseFormDTO) {
		return tutorCourseAdminService.update(id, courseFormDTO,getIdAccess());
	}
	
	@DeleteMapping("/{id}")
	public void delete(@PathVariable Integer id) {
		tutorCourseAdminService.delete(id,getIdAccess());
	}

	private Integer getIdAccess() {
		Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
		Tutor currentTutor = (Tutor) authentication.getPrincipal();
		
		return currentTutor.getId();
	}


	
	
	
}
