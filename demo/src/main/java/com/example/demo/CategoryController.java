package com.example.demo;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api")
@CrossOrigin("http://localhost:3000")
public class CategoryController {
	@Autowired
	CategoryRespository categoryRespository;
	   @GetMapping("/category")
	    public List<Category> index(){
	        return categoryRespository.findAll();
	    }
	 @PostMapping("/category/search")
	    public List<Category> search(@RequestBody Map<String, String> body){
	        String searchTerm = body.get("text");
	        return categoryRespository.findByNameContainingOrDescriptionContaining(searchTerm, searchTerm);
	    }
	 @GetMapping("/category/{id}")
	    public ResponseEntity<Category> show(@PathVariable String id) {
	        return ResponseEntity.of(categoryRespository.findById(Integer.parseInt(id)));
	    }
	 @PostMapping("/category")
	    public Category create(@RequestBody Category category) {
	        return categoryRespository.save(category);
	    }
	 @PutMapping("/category/{id}")
	 public ResponseEntity<Category> update(@PathVariable String id, @RequestBody Category updatedCategory) {
	     int categoryId = Integer.parseInt(id);

	     return categoryRespository.findById(categoryId)
	             .map(existingCategory -> {
	                 existingCategory.setName(updatedCategory.getName());
	                 existingCategory.setDescription(updatedCategory.getDescription());
	                
	                 categoryRespository.save(existingCategory);
	                 return ResponseEntity.ok(existingCategory);
	             })
	             .orElse(ResponseEntity.notFound().build());
	 }
	 @DeleteMapping("/category/{id}")
	    public ResponseEntity<Void> delete(@PathVariable String id) {
	        int categoryId = Integer.parseInt(id);
	        Optional<Category> existingCategory = categoryRespository.findById(categoryId);

	        if (existingCategory.isPresent()) {
	        	categoryRespository.deleteById(categoryId);
	            return ResponseEntity.noContent().build();
	        } else {
	            return ResponseEntity.notFound().build();
	        }
	    }

}
