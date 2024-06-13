package com.project.firstclicks.entity;

import java.io.Serializable;
import java.sql.Timestamp;
import java.time.LocalDateTime;

import java.util.HashSet;
import java.util.List;
import java.util.Set;

import org.hibernate.annotations.Formula;

import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import com.fasterxml.jackson.annotation.JsonManagedReference;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.EmbeddedId;
import jakarta.persistence.Entity;
import jakarta.persistence.EntityListeners;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.IdClass;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.JoinColumns;
import jakarta.persistence.JoinTable;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import jakarta.persistence.Temporal;
import jakarta.persistence.TemporalType;
import lombok.Data;

@Data
@Entity
@Table(name="courses")
@EntityListeners(AuditingEntityListener.class)
public class Course implements Serializable{

	/**
	 * 
	 */
	private static final long serialVersionUID = -866012554390263651L;

	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	private Integer id;
	
	@ManyToOne
	@JoinColumn(name="tutor_id")
    private Tutor tutorId;
	
	@Column(nullable=false)
	private String name;
	private Boolean isActive;
	@Column(nullable=false)
	private String description;
	@CreatedDate
	@Column(nullable=false,updatable=false)
	@Temporal(TemporalType.TIMESTAMP)
	private Timestamp createdDate;
	@Temporal(TemporalType.TIMESTAMP)
	private Timestamp updatedDate;
	
	private String coverPath;
	
  @ManyToMany(mappedBy = "course")
	@JsonManagedReference
  @OnDelete(action = OnDeleteAction.CASCADE)
	private Set<TechStack> techStacks = new HashSet<>();

	
	@OneToMany(mappedBy = "course")
	Set<StudentCourse> enrollments;
	
    @Enumerated(EnumType.STRING)
    private Level level;
	
	public enum Level {
	        ENTRY,
	        INTERMEDIATE,
	        ADVANCE
	 }
	
//	@Formula(value="SELECT COUNT(*) FROM student_course AS sc WHERE tutor_id=sc.tutor_id AND id=sc.id")
//	private Integer studentNumber;
//	@Formula(value="SELECT COUNT(student_review) FROM student_course AS sc WHERE tutor_id=sc.tutor_id AND id=sc.id AND student_review IS NOT NULL")
//	private Integer numberReviews;
}
