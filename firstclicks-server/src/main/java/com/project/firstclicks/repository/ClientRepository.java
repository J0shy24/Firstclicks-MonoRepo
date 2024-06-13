package com.project.firstclicks.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.project.firstclicks.entity.AppUser;
import com.project.firstclicks.entity.Client;

@Repository
public interface ClientRepository extends JpaRepository<Client,Integer>{
	
	Optional<Client> findByUsername(String username);

}
