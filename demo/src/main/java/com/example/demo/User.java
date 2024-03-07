package com.example.demo;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "user")
public class User {
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
	public String getUsername() {
		return username;
	}
	public void setUsername(String username) {
		this.username = username;
	}
	public String getPassword() {
		return password;
	}
	public void setPassword(String password) {
		this.password = password;
	}
	public String getEmail() {
		return email;
	}
	public void setEmail(String email) {
		this.email = email;
	}
	
	 public String getRoles() {
			return roles;
		}
		public void setRoles(String roles) {
			this.roles = roles;
		}
		public String getAddress() {
			return address;
		}
		public void setAddress(String address) {
			this.address = address;
		}
		public String getPhone() {
			return phone;
		}
		public void setPhone(String phone) {
			this.phone = phone;
		}
	
	
	 public User(int id, String name, String username, String password, String email, String roles, String address, String phone ) {
		super();
		this.id = id;
		this.name = name;
		this.username = username;
		this.password = password;
		this.email = email;
		this.roles = roles;
		this.address = address;
		this.phone = phone;
	}
	 
	  public User() {
	       
	    }
	 
	 @Override
	    public String toString() {
	        return "User{" +
	                "id=" + id +
	                ", name='" + name + '\'' +
	                ", username='" + username + '\'' +
	                 ", email='" + email + '\'' +
	                  ", password='" + password + '\'' +
	                  ", roles='" + roles + '\'' +
	                   ", address='" + address + '\'' +
	                    ", phone='" + phone + '\'' +
	                '}';
	    }
	 
	 
	 private int id;
	 private String name;
	 private String username;
	 private String password;
	 private String email;
	 private String roles;
	private String address;
	 private String phone;
	 
}
