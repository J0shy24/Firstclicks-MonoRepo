package com.project.firstclicks.entity;


import java.time.LocalDate;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Inheritance;
import jakarta.persistence.InheritanceType;
import jakarta.persistence.Table;
import lombok.Data;
import lombok.EqualsAndHashCode;

@EqualsAndHashCode(callSuper=true)
@Data
@Entity
@Table(name="clients")
@Inheritance (strategy = InheritanceType.JOINED)
public class Client extends AppUser{
	private static final long serialVersionUID = -2562887369200409956L;
	
	@Column(nullable=false)
	private String firstName;
	@Column(nullable=false)
	private String lastName;
	private LocalDate dateOfBirth;
	@Column(nullable=false)
	private String gender;
	@Column(nullable=false,unique=true)
	private String email;
	@Column(nullable=false)
	private String address;
	private String description;
	private String photoRoute;
	
	
	public String getFullName() {
		return this.firstName + " " + this.lastName;
	}
}
