package com.example.demo;

import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.persistence.Entity;
@Entity
@Table(name = "product")
public class Product {
	@Id
    @GeneratedValue(strategy = GenerationType.AUTO)
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

	public String getSlug() {
		return slug;
	}

	public void setSlug(String slug) {
		this.slug = slug;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public Double getPrice() {
		return price;
	}

	public void setPrice(Double price) {
		this.price = price;
	}

	public String getImage() {
		return image;
	}

	public void setImage(String image) {
		this.image = image;
	}
	
	 public int getCategory_id() {
			return category_id;
		}

		public void setCategory_id(int category_id) {
			this.category_id = category_id;
		}
	 public Product() {
	    }
	
	 public Product(int id, int category_id , String name, String slug, String description, Double price, String image) {
		super();
		this.id = id;
		this.name = name;
		this.slug = slug;
		this.description = description;
		this.price = price;
		this.image = image;
		this.category_id = category_id;
		
	}
	 @Override
	    public String toString() {
	        return "Product{" +
	                "id=" + id +
	                ", name='" + name + '\'' +
	                ", slug='" + slug + '\'' +
	                 ", description='" + description + '\'' +
	                  ", price='" + price + '\'' +
	                   ", image='" + image + '\'' +
	                    ", category_id='" + category_id + '\'' +
	                '}';
	    }
	 private int id;
	
	private int category_id;
	 private String name;
	 private String slug;
	 private String description;

	 private Double price;
	    
	 private String image;

	 
}
