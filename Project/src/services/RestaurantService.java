package services;


import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import database.DatabaseClass;
import models.Article;
import models.Repository;
import models.Restaurant;

public class RestaurantService {
	
	private Map<String, Restaurant> restaurants = DatabaseClass.getRestaurants();
	
	public Restaurant addRestaurant(Restaurant restaurant) {
		if(restaurant != null) {
			if(!restaurants.containsKey(restaurant.getName())) {
				System.out.println(Repository.getInstance().getRestaurants().size());
				restaurant.setDeleted(false);
				restaurant.setArticles(new ArrayList<Article>());
				Repository.getInstance().getRestaurants().put(restaurant.getName(), restaurant);
				DatabaseClass.saveData(DatabaseClass.myRepositoryPath);
				
				return restaurant;
			}
		}
		return null;
	}
	
	public Restaurant getOneRestaurant(String name) {
		return restaurants.get(name);
	}
	
	public Restaurant removeRestaurant(String id) {
		Restaurant tempRestaurant = restaurants.get(id);
		tempRestaurant.setDeleted(true);
		DatabaseClass.saveData(DatabaseClass.myRepositoryPath);
		return tempRestaurant;
	}
	
	public Restaurant editRestaurant(Restaurant restaurant) {
		if(restaurants.containsKey(restaurant.getName())) {
			Restaurant tempRestaurant = restaurants.get(restaurant.getName());
			tempRestaurant.setAddress(restaurant.getAddress());
			tempRestaurant.setCategory(restaurant.getCategory());
			DatabaseClass.saveData(DatabaseClass.myRepositoryPath);
			return restaurant;
		}
		return null;
	}
	
	public List<Restaurant> getAllRestaurants(){
		List<Restaurant> tempRestaurants = new ArrayList<>();
		for(Restaurant res : restaurants.values()) {
			if(!res.isDeleted()) {
				tempRestaurants.add(res);
			}
		}
		return tempRestaurants;
	}

}
