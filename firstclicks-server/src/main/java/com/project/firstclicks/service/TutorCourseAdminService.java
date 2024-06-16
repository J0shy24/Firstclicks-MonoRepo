package com.project.firstclicks.service;

import java.sql.Timestamp;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

import org.modelmapper.ModelMapper;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import com.project.firstclicks.dto.CourseDTO;
import com.project.firstclicks.dto.CoursePublicDTO;
import com.project.firstclicks.dto.TutorProfilePublic;
import com.project.firstclicks.entity.AppUser;
import com.project.firstclicks.entity.Course;
import com.project.firstclicks.entity.TechStack;
import com.project.firstclicks.entity.Tutor;
import com.project.firstclicks.exceptionhandler.ResourceNotFoundException;
import com.project.firstclicks.repository.AppUserRepository;
import com.project.firstclicks.repository.CourseRepository;
import com.project.firstclicks.repository.TechStackRepository;
import com.project.firstclicks.repository.TutorRepository;

import io.swagger.v3.oas.models.security.SecurityScheme.In;
import jakarta.transaction.Transactional;
import lombok.AllArgsConstructor;

@AllArgsConstructor
@Service
public class TutorCourseAdminService {
	private CourseRepository courseRepository;
	private TechStackRepository techStackRepository;
	private ModelMapper modelMapper;
	private AppUserRepository userRepository;
	private TutorRepository tutorRepository;
	private CourseService courseService;
	
	private Tutor GetTutorByTutorId (Integer tutorId) {
		return tutorRepository.findById(tutorId)
				.orElseThrow(ResourceNotFoundException::new);
	}
	
	public Integer findIdByUsername(String userName) {
		AppUser user = userRepository.findByUsername(userName)
				.orElseThrow(ResourceNotFoundException::new);
		
		return user.getId();
	}
	
	public List<CoursePublicDTO> findAll(Integer id) {
		List<Course> coursesFromDb = courseRepository.findByTutorId(GetTutorByTutorId(id));
		List<CoursePublicDTO> convertPublicCourses = new ArrayList<>();
		
		for (Course course : coursesFromDb) {
			CoursePublicDTO sum = courseService.findById(course.getId());
			modelMapper.map(course, sum);
			sum.setTechStack(techStackRepository.findByCourse(course));
			convertPublicCourses.add(sum);
		}
		
		
		return convertPublicCourses;
	}
	
	public Page<CoursePublicDTO> paginate(Pageable pageable, Integer tutorId) {
		List<CoursePublicDTO> convertListToPaginate = findAll(tutorId);
		
		Page<CoursePublicDTO> pageCoursePublicDTO = new PageImpl<>(convertListToPaginate, pageable, 0);
		
		return pageCoursePublicDTO;
	}
	
	public CoursePublicDTO create(CourseDTO courseDTO, Integer tutorid) {
		Course course = new Course();
		
		
		modelMapper.map(courseDTO, course);
		course.setCreatedDate(Timestamp.valueOf(LocalDateTime.now()));
		course.setUpdatedDate(Timestamp.valueOf(LocalDateTime.now()));
		course.setIsActive(true);
		course.setTutorId(GetTutorByTutorId(tutorid));
		Course SaveCourse = courseRepository.save(course);
		
		saveTechStack(courseDTO,course);
		
		
		
		return findByIdDTO(SaveCourse.getId(), tutorid);
	}

	private void saveTechStack(CourseDTO courseDTO, Course Save) {
		Set<TechStack> tech_sum = new HashSet<TechStack>();
		TechStack techStackNew = new TechStack();
		
		Set<Course> courseSave = new HashSet<>();
		courseSave.add(Save);
		
		for (String techstack : courseDTO.getTechStack()) {
			techStackNew.setTechStack(techstack);
			techStackNew.setCourse(courseSave);
			tech_sum.add(techStackRepository.save(techStackNew));
		}
	}

	public Course findById (Integer id, Integer tutorId) {
		Course courseDB = courseRepository.findByIdAndTutorId(id, GetTutorByTutorId(tutorId))
				.orElseThrow(ResourceNotFoundException::new);
		
		return courseDB;
	}
	
	public CoursePublicDTO findByIdDTO (Integer id, Integer tutorId) {
		Course courseFromDB = findById(id, tutorId);
		Set<TechStack> techs = techStackRepository.findByCourse(courseFromDB);
		CoursePublicDTO convertCourseFromDBToCoursePublicDTO = new CoursePublicDTO();
		
		convertCourseFromDBToCoursePublicDTO.setTechStack(techs);
		
		modelMapper.map(courseFromDB, convertCourseFromDBToCoursePublicDTO);

		return convertCourseFromDBToCoursePublicDTO;
	}
	
	public CoursePublicDTO update(Integer id, CourseDTO courseFormDTO, Integer tutorId) {
		Course courseFromDb = findById(id,tutorId);
		modelMapper.map(courseFormDTO, courseFromDb);
		courseFromDb.setUpdatedDate(Timestamp.valueOf(LocalDateTime.now()));
	//	courseFromDb.setTechStack(courseFormDTO.getTechStack());
		deleteTechStack(courseFromDb);
		courseFromDb = courseRepository.save(courseFromDb);
		
		updateTechStack(courseFromDb,courseFormDTO);
		courseRepository.save(courseFromDb);
    
		return findByIdDTO(id, tutorId);
	}
	

  @Transactional
	private void deleteTechStack(Course courseFromDb) {
		
		techStackRepository.deleteByCourseId(courseFromDb.getId());
		
//		for (TechStack tech : techStackRepository.findByCourse(courseFromDb)) {
//			tech.getCourse().remove(courseFromDb);
//			techStackRepository.save(tech);
//		}
		
	}

	private void updateTechStack(Course courseFromDb, CourseDTO courseFormDTO) {
		Set<Course> setnew = new HashSet<>();
		setnew.add(courseFromDb);
		
		
		for (String tech : courseFormDTO.getTechStack()) {
			TechStack newTech = new TechStack();
			newTech.setCourse(setnew);
			newTech.setTechStack(tech);
			techStackRepository.save(newTech);
		}
	}
	
	public void delete (Integer id, Integer tutorId) {
		Course course = findById(id, tutorId);
		courseRepository.delete(course);
	}
	
}
