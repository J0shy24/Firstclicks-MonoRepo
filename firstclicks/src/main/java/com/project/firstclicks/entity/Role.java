package com.project.firstclicks.entity;

import java.io.Serializable;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.Table;
import lombok.Data;

@Data
@Entity
@Table(name="roles")
public class Role implements Serializable{
	
	/**
	 * 
	 */
	private static final long serialVersionUID = 1263326067628401509L;
	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	private Integer id;
	@Column(unique=true)
	private String roleName;
	
	@ManyToMany(mappedBy="roles")
	@JsonIgnore
	private	List<AppUser> users;
	
}
