package com.example.demo;


import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
@Repository
public interface UserRepository  extends JpaRepository<User, Integer> {
	 Optional<User> findByUsernameAndPassword(String username, String password);
	 Optional<User> findByUsernameOrEmail(String username, String email);

	
}
