package models;

import java.io.Serializable;
import java.util.HashMap;
import java.util.Map;

public class Repository implements Serializable {
	
	/**
	 * 
	 */
	private static final long serialVersionUID = 1629717867900281745L;
	private static Repository instance = null;
	private Repository() {
      // Exists only to defeat instantiation.
    }

    public static Repository getInstance() {
       if(instance == null) {
         instance = new Repository();
       }
       return instance;
    }
    
    
    private Map<String, User> users;
    private Map<String, Article> articles;
    private Map<String, Vehicle> vehicles;
    private Map<String, Restaurant> restaurants;
    
	public Map<String, User> getUsers() {
		return users;
	}

	public void setUsers(Map<String, User> users) {
		this.users = users;
	}

	public Map<String, Article> getArticles() {
		return articles;
	}

	public void setArticles(Map<String, Article> articles) {
		this.articles = articles;
	}

	public Map<String, Vehicle> getVehicles() {
		return vehicles;
	}

	public void setVehicles(Map<String, Vehicle> vehicles) {
		this.vehicles = vehicles;
	}

	public Map<String, Restaurant> getRestaurants() {
		return restaurants;
	}

	public void setRestaurants(Map<String, Restaurant> restaurants) {
		this.restaurants = restaurants;
	}
	
}
