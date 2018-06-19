package services;


import java.util.ArrayList;
import java.util.Map;

import database.DatabaseClass;
import models.Article;
import models.Repository;
import models.Restaurant;

public class RestaurantService {
	
	private Map<String, Restaurant> restaurants = DatabaseClass.getRestaurants();
	
	public Restaurant addRestaurant(Restaurant restaurant) {
		if(restaurant != null) {
			System.out.println(Repository.getInstance().getRestaurants().size());
			restaurant.setArticles(new ArrayList<Article>());
			Repository.getInstance().getRestaurants().put(restaurant.getName(), restaurant);
			DatabaseClass.saveData(DatabaseClass.myRepositoryPath);
		}
		return restaurant;
	}
	
	public Restaurant removeRestaurant(String id) {
		Restaurant tempRestaurant = restaurants.remove(id);
		DatabaseClass.saveData(DatabaseClass.myRepositoryPath);
		return tempRestaurant;
	}

}
