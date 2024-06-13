package com.project.firstclicks.service;

import java.util.ArrayList;
import java.util.List;

import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import com.project.firstclicks.dto.StudentPrivateProfileDTO;
import com.project.firstclicks.dto.TutorPrivateProfileDTO;
import com.project.firstclicks.dto.TutorProfilePublic;
import com.project.firstclicks.entity.Student;
import com.project.firstclicks.entity.StudentCourse;
import com.project.firstclicks.entity.Tutor;
import com.project.firstclicks.exceptionhandler.ResourceNotFoundException;
import com.project.firstclicks.repository.AppUserRepository;
import com.project.firstclicks.repository.CourseRepository;
import com.project.firstclicks.repository.StudentCourseRepository;
import com.project.firstclicks.repository.StudentRepository;
import com.project.firstclicks.repository.TechStackRepository;
import com.project.firstclicks.repository.TutorRepository;

import lombok.AllArgsConstructor;

@AllArgsConstructor
@Service
public class ProfileService {
	private TutorRepository tutorRepository;
	private ModelMapper modelMapper;
	private StudentRepository studentRepository;
	private StudentCourseRepository studentCourseRepository;
	
	
	public TutorPrivateProfileDTO GetTutorByTutorId (Integer tutorId) {
		Tutor tutor = tutorRepository.findById(tutorId)
				.orElseThrow(ResourceNotFoundException::new);
		TutorPrivateProfileDTO privateTutor = new TutorPrivateProfileDTO();
		
		modelMapper.map(tutor, privateTutor);
		
		return privateTutor;
	}

	public StudentPrivateProfileDTO GetStutendByStudentId(Integer idAccess) {
		Student student = studentRepository.findById(idAccess)
				.orElseThrow(ResourceNotFoundException::new);
		StudentPrivateProfileDTO privateStudent = new StudentPrivateProfileDTO();
		
		modelMapper.map(student, privateStudent);
		
		return privateStudent;
	}

	public TutorProfilePublic getPublicTutorProfile(Integer tutorId) {
		Tutor tutor = tutorRepository.findById(tutorId)
				.orElseThrow(ResourceNotFoundException::new);
		TutorProfilePublic tutorProfile = new TutorProfilePublic();
		
		modelMapper.map(tutor, tutorProfile);
		
		return tutorProfile;
	}

	public List<Integer> IdsEnrolledCourses(Integer idAccess) {
		List<StudentCourse> allCoursesofStudent = studentCourseRepository.findAllByStudentId(idAccess);
		List<Integer> sum = new ArrayList<Integer>();
		
		for (StudentCourse course : allCoursesofStudent) {
			sum.add(course.getCourse().getId());
		}
		
		
		return sum;
	}
}
