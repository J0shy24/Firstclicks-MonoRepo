package com.project.firstclicks.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.project.firstclicks.entity.Role;
@Repository
public interface RoleRepository extends JpaRepository<Role, Integer> {

	Optional<Role> findByRoleName(String Role);
}
