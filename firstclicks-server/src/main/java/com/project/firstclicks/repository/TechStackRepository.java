package com.project.firstclicks.repository;

import java.util.List;
import java.util.Set;

import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.project.firstclicks.entity.Course;
import com.project.firstclicks.entity.TechStack;

import jakarta.transaction.Transactional;

@Repository
public interface TechStackRepository extends JpaRepository<TechStack, String>{
	Set<TechStack> findByCourse(Course course);
	
  @Modifying
  @Transactional
	@Query(value = "delete from course_techstack where course_id = :courseId", nativeQuery = true)
	Integer deleteByCourseId(@Param("courseId") Integer courseId);
  
  
  @Query(value = "SELECT c.id FROM courses c, course_techstack ct  WHERE c.id = ct.course_id AND tech_stack_id Like %?1%",
		    countQuery = "SELECT count(c.id) FROM courses c, course_techstack ct  WHERE c.id = ct.course_id AND tech_stack_id Like %?1%",
		    nativeQuery = true)
  List<Integer> searchByTechStack(String name, Pageable pageable);
  
  
}
