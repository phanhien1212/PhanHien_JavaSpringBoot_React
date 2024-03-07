package com.example.demo;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "category")
public class Category {
	@Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
	private int id ;
	@Override
	
    public String toString() {
        return "Category{" +
                "id=" + id +
                ", name='" + name + '\'' +
               
                 ", description='" + description + '\'' +
                 
                '}';
    }
	public Category() {
        
    }

	private String name;
    private String description;
    
	
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public String getDescription() {
		return description;
	}
	public void setDescription(String description) {
		this.description = description;
	}
	
    public Category(int id, String name, String description) {
		super();
		this.id = id;
		this.name = name;
		this.description = description;
	}
}
