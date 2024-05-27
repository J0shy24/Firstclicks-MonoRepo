package com.project.firstclicks.service;

import java.util.ArrayList;
import java.util.List;
import java.util.Set;

import java.util.Set;


import org.modelmapper.ModelMapper;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import com.project.firstclicks.dto.CoursePublicDTO;
import com.project.firstclicks.dto.TutorProfilePublic;
import com.project.firstclicks.entity.Course;

import com.project.firstclicks.entity.TechStack;
import com.project.firstclicks.entity.Tutor;
import com.project.firstclicks.exceptionhandler.ResourceNotFoundException;
import com.project.firstclicks.repository.CourseRepository;
import com.project.firstclicks.repository.StudentCourseRepository;
import com.project.firstclicks.repository.TechStackRepository;

import com.project.firstclicks.repository.TutorRepository;


import lombok.AllArgsConstructor;

@AllArgsConstructor
@Service
public class CourseService {
	private CourseRepository courseRepository;
	private ModelMapper modelMapper;
	private TechStackRepository techStackRepository;
	private StudentCourseRepository studentCourseRepository;
	private TutorRepository tutorRepository;
	
	public List<CoursePublicDTO> findLast6Courses() {
		List<Course> CoursesFromDb = courseRepository.findTop6ByOrderByCreatedDate();
		List<CoursePublicDTO> coursePublicDTOs = new ArrayList<>();
		
		TutorProfilePublic publicTutor = new TutorProfilePublic();
		
		for (Course course : CoursesFromDb) {
			CoursePublicDTO sum = new CoursePublicDTO();

			Set<TechStack> techStack = techStackRepository.findByCourse(course);
			sum.setTechStack(techStack);
			modelMapper.map(course.getTutorId(), publicTutor);
			
			sum.setTutor(publicTutor);
			sum.setStudentStars(studentCourseRepository.avgStudentStars(course.getId()));
			sum.setStudentReview(studentCourseRepository.studentReviewList(course.getId()));


			modelMapper.map(course, sum);
			coursePublicDTOs.add(sum);
		}
		
		
		
		return coursePublicDTOs;
	}
	
	public List<CoursePublicDTO> findByName(String name) {
		List<Course> coursesFromDB = courseRepository.findByNameContaining(name);
		
		TutorProfilePublic publicTutor = new TutorProfilePublic();
		List<CoursePublicDTO> coursesPublicDTOs = new ArrayList<>();
		
		if (!coursesFromDB.isEmpty()) {
			for (Course course : coursesFromDB) {
				CoursePublicDTO sum = new CoursePublicDTO();
				
				modelMapper.map(course.getTutorId(), publicTutor);
				
				sum.setTutor(publicTutor);
				sum.setTechStack(techStackRepository.findByCourse(course));
				sum.setStudentStars(studentCourseRepository.avgStudentStars(course.getId()));
				sum.setStudentReview(studentCourseRepository.studentReviewList(course.getId()));

				modelMapper.map(course, sum);
				coursesPublicDTOs.add(sum);
			}
		}
		
		
		return coursesPublicDTOs;
	}
	
	public Page<CoursePublicDTO> paginate(Pageable pageable) {
		
		Page<Course> CoursesFromDb = courseRepository.findAll(pageable);
		List<CoursePublicDTO> coursePublicDTOs = new ArrayList<>();
		
		for (Course course : CoursesFromDb) {
			CoursePublicDTO sum = new CoursePublicDTO();
			
			//sum.setTutor(null);
			sum.setTechStack(techStackRepository.findByCourse(course));
			sum.setStudentStars(studentCourseRepository.avgStudentStars(course.getId()));
			sum.setStudentReview(studentCourseRepository.studentReviewList(course.getId()));

			modelMapper.map(course, sum);
			sum.setTutor(null);
			coursePublicDTOs.add(sum);
		}
		
		Page<CoursePublicDTO> pageCoursePublicDTO = new PageImpl<>(coursePublicDTOs, CoursesFromDb.getPageable(), CoursesFromDb.getTotalElements());
		
		return  pageCoursePublicDTO;
	}

	public CoursePublicDTO findById(Integer courseId) {
		Course courseFromDb = courseRepository.findById(courseId)
				.orElseThrow(ResourceNotFoundException::new);
		CoursePublicDTO coursePublicDTO = new CoursePublicDTO();
		
		TutorProfilePublic publicTutor = new TutorProfilePublic();
		
		modelMapper.map(courseFromDb.getTutorId(), publicTutor);
		
		coursePublicDTO.setTutor(publicTutor);
		
		modelMapper.map(courseFromDb, coursePublicDTO);
		coursePublicDTO.setTechStack(techStackRepository.findByCourse(courseFromDb));
		
		coursePublicDTO.setStudentStars(studentCourseRepository.avgStudentStars(courseId));
		coursePublicDTO.setStudentReview(studentCourseRepository.studentReviewList(courseId));
		
		coursePublicDTO.setTechStack(techStackRepository.findByCourse(courseFromDb));
		
		coursePublicDTO.setStudentStars(studentCourseRepository.avgStudentStars(courseId));
		coursePublicDTO.setStudentReview(studentCourseRepository.studentReviewList(courseId));

		return coursePublicDTO;
	}

	public List<CoursePublicDTO> findTutorCoursesByTutorId(Integer tutorId) {
		List<Course> coursesFromDb = courseRepository.findByTutorId(GetTutorByTutorId(tutorId));
		List<CoursePublicDTO> convertPublicCourses = new ArrayList<>();
		
		for (Course course : coursesFromDb) {
			CoursePublicDTO sum = new CoursePublicDTO();
			modelMapper.map(course, sum);
			sum.setTechStack(techStackRepository.findByCourse(course));
			sum.setTutor(null);
			convertPublicCourses.add(sum);
		}
		
		
		return convertPublicCourses;
	}
	
	private Tutor GetTutorByTutorId (Integer tutorId) {
		return tutorRepository.findById(tutorId)
				.orElseThrow(ResourceNotFoundException::new);
	}

	public List<TutorProfilePublic> findRandomTutors(Integer tutorId) {
		List<Integer> tutorsRandomIds = tutorRepository.getRandomTutorIds(tutorId);
		List<TutorProfilePublic> tutorReturn = new ArrayList<>();
		
		for (Integer integer : tutorsRandomIds) {
			Tutor tutorById = tutorRepository.findById(integer)
					.orElseThrow(ResourceNotFoundException::new);
			TutorProfilePublic tutorConvert = new TutorProfilePublic();
			
			modelMapper.map(tutorById, tutorConvert);
			
			tutorReturn.add(tutorConvert);
		}
		
		
		return tutorReturn;
	}
}
