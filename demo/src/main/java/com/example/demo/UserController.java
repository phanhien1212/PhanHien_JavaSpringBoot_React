package com.example.demo;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;


@RestController
@RequestMapping("/api")
@CrossOrigin("http://localhost:3000")

public class UserController {
	@Autowired
    UserRepository userRespository;
	
	@GetMapping("/user/{id}")
    public ResponseEntity<User> show(@PathVariable String id) {
        return ResponseEntity.of(userRespository.findById(Integer.parseInt(id)));
    }
	
	@PostMapping("/register")
    public ResponseEntity<?> create(@RequestBody User user) {
        String username = user.getUsername();
        String email = user.getEmail();

        Optional<User> existingUser = userRespository.findByUsernameOrEmail(username, email);
        if (existingUser.isPresent()) {
            
            return ResponseEntity.status(HttpStatus.CONFLICT).body("Tên người dùng hoặc email đã tồn tại");
        } else {
            
            User newUser = userRespository.save(user);
            
            return ResponseEntity.status(HttpStatus.CREATED).body(newUser);
        }
    }

    @PostMapping("/login")
    public ResponseEntity<User> login(@RequestBody  User loginUser) {
      
        String username = loginUser.getUsername();
        String password = loginUser.getPassword();

       
        Optional<User> userOptional = userRespository.findByUsernameAndPassword(username, password);
        if (userOptional.isPresent()) {
          
            return ResponseEntity.ok(userOptional.get());
        } else {
            
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }
    }
	 
	 
}
