package com.example.demo;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
@Entity
@Table(name = "orders")
public class Order {
	@Id
    @GeneratedValue(strategy = GenerationType.AUTO)
	private int id;
	public Order(int id, int user_id, String delivery_name, String delivery_email, String delivery_phone,
			String delivery_address, String note) {
		super();
		this.id = id;
		this.user_id = user_id;
		this.delivery_name = delivery_name;
		this.delivery_email = delivery_email;
		this.delivery_phone = delivery_phone;
		this.delivery_address = delivery_address;
		this.note = note;
	}
	
	
	@Override
    public String toString() {
        return "Order{" +
                "id=" + id +
                ", user_id='" + user_id + '\'' +
                ", delivery_name='" + delivery_name + '\'' +
                 ", delivery_email='" + delivery_email + '\'' +
                  ", delivery_phone='" + delivery_phone + '\'' +
                   ", delivery_address='" + delivery_address + '\'' +
                    ", delivery_address='" + delivery_address + '\'' +
                     ", note='" + note + '\'' +
                '}';
    }
	
	public Order(){
		
	}
	
	
	private int user_id;
	private String delivery_name;
	private String delivery_email;
	private String delivery_phone;
	private String delivery_address;	    
	private String note;
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public int getUser_id() {
		return user_id;
	}
	public void setUser_id(int user_id) {
		this.user_id = user_id;
	}
	public String getDelivery_name() {
		return delivery_name;
	}
	public void setDelivery_name(String delivery_name) {
		this.delivery_name = delivery_name;
	}
	public String getDelivery_email() {
		return delivery_email;
	}
	public void setDelivery_email(String delivery_email) {
		this.delivery_email = delivery_email;
	}
	public String getDelivery_phone() {
		return delivery_phone;
	}
	public void setDelivery_phone(String delivery_phone) {
		this.delivery_phone = delivery_phone;
	}
	public String getDelivery_address() {
		return delivery_address;
	}
	public void setDelivery_address(String delivery_address) {
		this.delivery_address = delivery_address;
	}
	public String getNote() {
		return note;
	}
	public void setNote(String note) {
		this.note = note;
	}
	
}
