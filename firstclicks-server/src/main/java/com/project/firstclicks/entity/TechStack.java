package com.project.firstclicks.entity;

import java.util.HashSet;
import java.util.Set;

import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;

import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.JoinColumns;

import jakarta.persistence.JoinTable;
import jakarta.persistence.ManyToMany;

import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.Data;

@Data
@Entity
@Table(name = "techstack")
public class TechStack {
 	
	@Id
	@Column(nullable = false)
	private String techStack;
	
	@ManyToMany(cascade = CascadeType.ALL)
	@JoinTable(
			name = "course_techstack",
			joinColumns = @JoinColumn(name = "techStack_id"),
			inverseJoinColumns = @JoinColumn(name = "course_id")
	)
    @JsonBackReference
    private Set<Course> course = new HashSet<>();

}
