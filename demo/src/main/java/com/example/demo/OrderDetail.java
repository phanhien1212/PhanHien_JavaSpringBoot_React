package com.example.demo;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "oderdetail")
public class OrderDetail {
	@Id
    @GeneratedValue(strategy = GenerationType.AUTO)
	private int id;
	
	 public OrderDetail(int id, int order_id, int product_id, Double price, int qty, Double amount) {
		super();
		this.id = id;
		this.order_id = order_id;
		this.product_id = product_id;
		this.price = price;
		this.qty = qty;
		this.amount = amount;
	}
	
	 @Override
	    public String toString() {
	        return "OrderDetail{" +
	                "id=" + id +
	                ", order_id='" + order_id + '\'' +
	                ", product_id='" + product_id + '\'' +
	                 ", price='" + price + '\'' +
	                  ", qty='" + qty + '\'' +
	                   ", amount='" + amount + '\'' +
	                '}';
	    }
		
		public OrderDetail(){
			
		}
	 
	 
	 
	 public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public int getOrder_id() {
		return order_id;
	}
	public void setOrder_id(int order_id) {
		this.order_id = order_id;
	}
	public int getProduct_id() {
		return product_id;
	}
	public void setProduct_id(int product_id) {
		this.product_id = product_id;
	}
	public Double getPrice() {
		return price;
	}
	public void setPrice(Double price) {
		this.price = price;
	}
	public int getQty() {
		return qty;
	}
	public void setQty(int qty) {
		this.qty = qty;
	}
	public Double getAmount() {
		return amount;
	}
	public void setAmount(Double amount) {
		this.amount = amount;
	}
	
	private int order_id;
	 private int product_id;
	 private Double price;
	 private int qty;
	 private Double amount;
}
