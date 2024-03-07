package com.example.demo;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
@Repository
public interface ProductRespository  extends JpaRepository<Product, Integer> {
	List<Product> findByNameContainingOrDescriptionContaining(String text, String textAgain); 
	List<Product> findByNameContainingIgnoreCase(String search);
}
