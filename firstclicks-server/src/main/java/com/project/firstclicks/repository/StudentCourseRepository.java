package com.project.firstclicks.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import org.springframework.data.jpa.repository.Query;

import org.springframework.stereotype.Repository;


import com.project.firstclicks.entity.Course;
import com.project.firstclicks.entity.StudentCourse;

@Repository
public interface StudentCourseRepository extends JpaRepository<StudentCourse, Integer>{
	List<StudentCourse> findAllByStudentId(Integer id);
	
	Optional<StudentCourse> findByCourseIdAndStudentId(Integer courseId, Integer studentId);
	
	Optional<StudentCourse> findByIdAndStudentId(Integer studentCourseId, Integer studentId);
	
	boolean existsByCourseIdAndStudentId(Integer courseId, Integer studentId);
	
	@Query(value = "select avg(student_stars) FROM student_course s where s.course_id = :courseId", nativeQuery = true)
	Integer avgStudentStars(Integer courseId);
	
	@Query(value = "select student_review FROM student_course s where s.course_id = :courseId", nativeQuery = true)
	List<String> studentReviewList(Integer courseId);
}
