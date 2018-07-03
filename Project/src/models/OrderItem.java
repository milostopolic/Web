package models;

import java.io.Serializable;

public class OrderItem implements Serializable{
	
	/**
	 * 
	 */
	private static final long serialVersionUID = -1605118425850247019L;
	private String article;
	private int quantity;
	private float price;
	private String restaurant;
	
	public OrderItem() {
		
	}

	public String getArticle() {
		return article;
	}

	public void setArticle(String article) {
		this.article = article;
	}

	public int getQuantity() {
		return quantity;
	}

	public void setQuantity(int quantity) {
		this.quantity = quantity;
	}

	public float getPrice() {
		return price;
	}

	public void setPrice(float price) {
		this.price = price;
	}

	public String getRestaurant() {
		return restaurant;
	}

	public void setRestaurant(String restaurant) {
		this.restaurant = restaurant;
	}
	
	


}
