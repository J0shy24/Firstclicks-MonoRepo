package com.project.firstclicks.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;

@EqualsAndHashCode(callSuper=true)
@Data
@Entity
@Table(name="tutors")
public class Tutor extends Client{
	private static final long serialVersionUID = 4963628534550795467L;
}
