package com.project.firstclicks.security;


import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.project.firstclicks.repository.AppUserRepository;

import lombok.RequiredArgsConstructor;


@Service
@RequiredArgsConstructor
public class AppUserDetailsService implements UserDetailsService {
	
	 private final AppUserRepository appUserRepository;

	@Override
	@Transactional
	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
		return appUserRepository.findByUsername(username)
				.orElseThrow(()->new UsernameNotFoundException("User not found"));
	}

}
