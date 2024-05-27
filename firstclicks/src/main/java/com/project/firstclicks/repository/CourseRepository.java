package com.project.firstclicks.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;


import com.project.firstclicks.dto.CoursePublicDTO;
import com.project.firstclicks.entity.Course;
import com.project.firstclicks.entity.Tutor;


import org.springframework.stereotype.Repository;



@Repository
public interface CourseRepository extends JpaRepository<Course, Integer>{

	List<Course> findTop6ByOrderByCreatedDate();
	
	List<Course> findByNameContaining(String name);
	
	Optional<Course> findByIdAndTutorId(Integer id, Tutor tutorId);
	
	List<Course> findByTutorId(Tutor tutorId);
	
	Page<Course> findAllByTutorId(Pageable pabeable, Tutor tutorId);
	
	//List<CoursePublicDTO> findTop6ByOrderByCreatedDate();
		
}
