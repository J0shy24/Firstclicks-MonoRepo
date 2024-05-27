package com.project.firstclicks.entity;




import java.time.LocalDateTime;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import lombok.Builder;
import lombok.Data;

@Data
@Entity
public class Token {
	
	@Id
	@GeneratedValue
	private Integer id;
	private String token;
	private LocalDateTime createdAt;
	private LocalDateTime expiresAt;
	private LocalDateTime validatedAt;
	
	@ManyToOne
	@JoinColumn(name="user_id",nullable=false)
	private Client user;
}
