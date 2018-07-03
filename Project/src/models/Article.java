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
	private List<String> restaurantsList;	
	
	public Article(String name, float price, String description, String quantity) {
		super();
		this.name = name;
		this.price = price;
		this.description = description;
		this.quantity = quantity;
	}
	
	public Article() {
		
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

	public List<String> getRestaurantsList() {
		return restaurantsList;
	}

	public void setRestaurantsList(List<String> restaurantsList) {
		this.restaurantsList = restaurantsList;
	}
	
	

}
