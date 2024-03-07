package com.example.demo;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api")
@CrossOrigin("http://localhost:3000")
public class OrderDetailController {
	@Autowired
	OrderDetailRespository orderdetailRespository;
	
    @GetMapping("/orderdetail")
    public List<OrderDetail> index(){
        return orderdetailRespository.findAll();
    }
    
    @PostMapping("/orderdetail")
    public OrderDetail create(@RequestBody OrderDetail orderdetail) {
        return orderdetailRespository.save(orderdetail);
    }
}
