package com.project.firstclicks.repository;


import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.project.firstclicks.entity.Tutor;


@Repository
public interface TutorRepository extends JpaRepository<Tutor,Integer>{
	@Query(value = "SELECT id FROM firstclicks_change.tutors WHERE id != :tutorId ORDER BY RAND() LIMIT 2 ;", nativeQuery = true)
	List<Integer> getRandomTutorIds(Integer tutorId);
}
