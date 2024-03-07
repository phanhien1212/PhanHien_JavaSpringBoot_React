package com.example.demo;

import java.util.List;
import org.springframework.web.bind.annotation.*;
import org.springframework.beans.factory.annotation.Autowired;


@RestController
@RequestMapping("/api")
@CrossOrigin("http://localhost:3000")
public class OrderController {
	@Autowired
	OrderRespository orderRespository;
	
    @GetMapping("/order")
    public List<Order> index(){
        return orderRespository.findAll();
    }
    
    @PostMapping("/order")
    public Order create(@RequestBody Order order) {
        return orderRespository.save(order);
    }

}
