package models;

import java.io.Serializable;
import java.util.List;

public class Restaurant implements Serializable{

	/**
	 * 
	 */
	private static final long serialVersionUID = -2612790701105875826L;
	
	private String name;
	private String address;
	private RestaurantCategory category;
	private List<Article> articles;	
	private boolean deleted;
	
	public Restaurant() {
		
	}

	public Restaurant(String name, String address, List<Article> articles) {
		super();
		this.name = name;
		this.address = address;
		this.articles = articles;		
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getAddress() {
		return address;
	}

	public void setAddress(String address) {
		this.address = address;
	}

	public List<Article> getArticles() {
		return articles;
	}

	public void setArticles(List<Article> articles) {
		this.articles = articles;
	}

	public RestaurantCategory getCategory() {
		return category;
	}

	public void setCategory(RestaurantCategory category) {
		this.category = category;
	}

	public boolean isDeleted() {
		return deleted;
	}

	public void setDeleted(boolean deleted) {
		this.deleted = deleted;
	}

	
	

}
