package com.project.firstclicks.entity;


import java.io.Serializable;
import java.security.Principal;
import java.time.LocalDateTime;
import java.util.Collection;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Inheritance;
import jakarta.persistence.InheritanceType;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.Table;
import jakarta.persistence.Temporal;
import jakarta.persistence.TemporalType;
import lombok.Data;

@Data
@Entity
@Inheritance(strategy=InheritanceType.JOINED)
@Table(name="users")
public class AppUser implements Serializable,UserDetails,Principal{
	
	private static final long serialVersionUID = 7495946852773018475L;

	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	private Integer id;
	@Column(nullable=false,unique=true)
	private String username;
	@Column(nullable=false)
	private String password;

	@Temporal(TemporalType.TIMESTAMP)
	private LocalDateTime lastSession;
	
	@ManyToMany(fetch = FetchType.EAGER)
	@JsonIgnore
	private List<Role> roles;
	
	
	private boolean isAccountLocked;
	
	private boolean isEnabled;

	@Override
	public String getName() {
		// TODO Auto-generated method stub
		return this.username;
	}

	@Override
	public Collection<? extends GrantedAuthority> getAuthorities() {
		// TODO Auto-generated method stub
		return this.roles
				.stream()
				.map(r->new SimpleGrantedAuthority(r.getRoleName()))
				.collect(Collectors.toList());
	}

	@Override
	public boolean isAccountNonExpired() {
		// TODO Auto-generated method stub
		return true;
	}

	@Override
	public boolean isAccountNonLocked() {
		// TODO Auto-generated method stub
		return !this.isAccountLocked;
	}

	@Override
	public boolean isCredentialsNonExpired() {
		// TODO Auto-generated method stub
		return true;
	}

	@Override
	public boolean isEnabled() {
		// TODO Auto-generated method stub
		return this.isEnabled;
	}
	
}
