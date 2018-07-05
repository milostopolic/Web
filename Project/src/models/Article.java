package models;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;

public class Article implements Serializable {

	/**
	 * 
	 */
	private static final long serialVersionUID = 8081091158940735139L;
	
	private String name;
	private float price;
	private String description;
	private String quantity;
	private ArticleType type;
	private boolean deleted;
	private String restaurant;
	private int popularity;
	
	public Article(String name, float price, String description, String quantity) {
		super();
		this.name = name;
		this.price = price;
		this.description = description;
		this.quantity = quantity;
	}
	
	public Article() {
		this.popularity = 0;
		this.deleted = false;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public float getPrice() {
		return price;
	}

	public void setPrice(float price) {
		this.price = price;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public String getQuantity() {
		return quantity;
	}

	public void setQuantity(String quantity) {
		this.quantity = quantity;
	}

	public ArticleType getType() {
		return type;
	}

	public void setType(ArticleType type) {
		this.type = type;
	}

	public boolean isDeleted() {
		return deleted;
	}

	public void setDeleted(boolean deleted) {
		this.deleted = deleted;
	}

	public String getRestaurant() {
		return restaurant;
	}

	public void setRestaurant(String restaurant) {
		this.restaurant = restaurant;
	}

	public int getPopularity() {
		return popularity;
	}

	public void setPopularity(int popularity) {
		this.popularity = popularity;
	}

	
	
	

}
