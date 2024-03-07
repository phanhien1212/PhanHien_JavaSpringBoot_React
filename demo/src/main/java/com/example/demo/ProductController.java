package com.example.demo;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import org.springframework.web.bind.annotation.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
@RestController
@RequestMapping("/api")
@CrossOrigin("http://localhost:3000")
public class ProductController {
	  @Autowired
	    ProductRespository productRespository;
	    @GetMapping("/product")
	    public List<Product> index(){
	        return productRespository.findAll();
	    }
 
	    @GetMapping("/product/{id}")
	    public ResponseEntity<Product> show(@PathVariable String id) {
	        return ResponseEntity.of(productRespository.findById(Integer.parseInt(id)));
	    }
	    
	    @PostMapping("/product/search")
	    public List<Product> search(@RequestBody Map<String, String> body){
	        String searchTerm = body.get("text");
	        return productRespository.findByNameContainingOrDescriptionContaining(searchTerm, searchTerm);
	    }

	    @GetMapping(params = "search")
	    public List<Product> searchProducts(@RequestParam String search) {
	    	 System.out.println("Search term: " + search);
	        return productRespository.findByNameContainingIgnoreCase(search);
	    }
	    
	    @PostMapping("/product/create")
	    public Product create(@RequestBody Product product) {
	        return productRespository.save(product);
	    }

	    
	    @PutMapping("/product/update/{id}")
	    public ResponseEntity<Product> update(@PathVariable String id, @RequestBody Product updatedProduct) {
	        int productId = Integer.parseInt(id);
	        Optional<Product> existingProduct = productRespository.findById(productId);

	        if (existingProduct.isPresent()) {
	            Product product = existingProduct.get();
	            product.setName(updatedProduct.getName());
	            product.setSlug(updatedProduct.getSlug());
	            product.setDescription(updatedProduct.getDescription());
	            product.setPrice(updatedProduct.getPrice());
	            product.setImage(updatedProduct.getImage());
	            product.setCategory_id(updatedProduct.getCategory_id());
	            productRespository.save(product);
	            return ResponseEntity.ok(product);
	        } else {
	            return ResponseEntity.notFound().build();
	        }
	    }

	   
	    @DeleteMapping("/product/delete/{id}")
	    public ResponseEntity<Void> delete(@PathVariable String id) {
	        int productId = Integer.parseInt(id);
	        Optional<Product> existingProduct = productRespository.findById(productId);

	        if (existingProduct.isPresent()) {
	            productRespository.deleteById(productId);
	            return ResponseEntity.noContent().build();
	        } else {
	            return ResponseEntity.notFound().build();
	        }
	    }

	    
	    

}
