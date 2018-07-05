package services;

import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Map;

import database.DatabaseClass;
import models.Article;
import models.Cart;
import models.Order;
import models.OrderItem;
import models.OrderStatus;
import models.Repository;
import models.User;
import models.UserRole;
import models.Vehicle;

public class OrderService {
	
	private Map<Integer, Order> orders = DatabaseClass.getOrders();
	private Map<String, Article> articles = DatabaseClass.getArticles();
	private Map<String, Vehicle> vehicles = DatabaseClass.getVehicles();
	private Map<String, User> users = DatabaseClass.getUsers();
	
	public OrderItem addToCart(OrderItem ordIt, User user) {
		boolean flag = false;
		int tempI = -1;
		if(articles.containsKey(ordIt.getArticle())) {
			for(int i = 0; i < user.getCart().getItems().size(); i++) {
				if(user.getCart().getItems().get(i).getArticle().equals(ordIt.getArticle())) {
					flag = true;
					tempI = i;
					break;
				}
			}
			
			if(flag) {
				user.getCart().getItems().get(tempI).setQuantity(user.getCart().getItems().get(tempI).getQuantity() + 1);
				user.getCart().setTotalPrice(updateTotalPrice(user.getCart()));
				DatabaseClass.saveData(DatabaseClass.myRepositoryPath);
				return user.getCart().getItems().get(tempI);
			} else {
				Article tempArt = articles.get(ordIt.getArticle());
				OrderItem newOI = new OrderItem();
				//newOI.setArticle(art);
				ordIt.setPrice(tempArt.getPrice());
				ordIt.setQuantity(1);
				ordIt.setRestaurant(articles.get(ordIt.getArticle()).getRestaurant());
				user.getCart().getItems().add(ordIt);
				user.getCart().setTotalPrice(updateTotalPrice(user.getCart()));
				DatabaseClass.saveData(DatabaseClass.myRepositoryPath);
				return ordIt;
			}
		}	
		return null;
	}
	
	public float updateTotalPrice(Cart cart) {
		float tempPrice = 0;
		for(int i = 0; i < cart.getItems().size(); i++) {
			tempPrice += cart.getItems().get(i).getPrice() * cart.getItems().get(i).getQuantity();
		}
		
		return tempPrice;
	}
	
	public OrderItem changeQuantity(String id, int quantity,User user) {
		int tempI = -1;
		for(int i = 0; i < user.getCart().getItems().size(); i++) {
			if(user.getCart().getItems().get(i).getArticle().equals(id)) {
				tempI = i;
				break;
			}
		}
		
		if(tempI == -1) {
			return null;
		} else {
			OrderItem oi = user.getCart().getItems().get(tempI);
			oi.setQuantity(quantity);
			user.getCart().setTotalPrice(updateTotalPrice(user.getCart()));
			DatabaseClass.saveData(DatabaseClass.myRepositoryPath);
			return oi;
		}
	}
	
	public OrderItem deleteItem(String id, User user) {
		int tempI = -1;
		for(int i = 0; i < user.getCart().getItems().size(); i++) {
			if(user.getCart().getItems().get(i).getArticle().equals(id)) {
				tempI = i;
				break;
			}
		}
		
		if(tempI == -1) {
			return null;
		} else {
			OrderItem oi = user.getCart().getItems().remove(tempI);
			user.getCart().setTotalPrice(updateTotalPrice(user.getCart()));
			DatabaseClass.saveData(DatabaseClass.myRepositoryPath);
			return oi;
		}
	}
	
	public Order createOrder(Order order, User user) {
		order.setBuyer(user.getUsername());
		order.setDeliverer(null);
		order.setStatus(OrderStatus.ORDERED);
		order.setDateTime(new SimpleDateFormat("yyyy/MM/dd HH:mm:ss").format(new Date()));
		order.setId(Repository.getInstance().getOrders().size());
		for(OrderItem oi : order.getItems()) {
			Article tempArticle = articles.get(oi.getArticle());
			tempArticle.setPopularity(tempArticle.getPopularity() + 1);
		}
		Repository.getInstance().getOrders().put(order.getId(), order);
		
		user.setCart(new Cart());
		
		DatabaseClass.saveData(DatabaseClass.myRepositoryPath);
		return order;
	}
	
	public List<Order> getAllOrders() {
		List<Order> tempOrders = new ArrayList<>();
		for(Order ord : orders.values()) {
			if(!ord.isDeleted())
				tempOrders.add(ord);
		}
		return tempOrders;
	}
	
	public List<Order> getOrdersByUser(User user) {
		List<Order> tempOrders = new ArrayList<>();
		List<Order> ords = getAllOrders();
		for(int i = 0; i < ords.size(); i++) {
			if(ords.get(i).getBuyer().equals(user.getUsername())) {
				tempOrders.add(ords.get(i));
			}
		}
		
		return tempOrders;
	}
	
	public List<OrderItem> getItemsByOrder(int id) {
		if(orders.containsKey(id)) {
			return orders.get(id).getItems();	
		}
		return null;
	}
	
	public List<Order> getOrdersForDelivery() {
		List<Order> tempOrders = new ArrayList<>();
		List<Order> ords = getAllOrders();
		for(int i = 0; i < ords.size(); i++) {
			if(ords.get(i).getStatus() == OrderStatus.ORDERED) {
				tempOrders.add(ords.get(i));
			}
		}
		
		return tempOrders;
	}
	
	
	public Order takeOrder(int id, String veh, User user) {
		if(!orders.containsKey(id))
			return null;
		if(!vehicles.containsKey(veh))
			return null;
		if(user.getRole() != UserRole.DELIVERY)
			return null;
		
		orders.get(id).setStatus(OrderStatus.BEINGDELIVERED);
		vehicles.get(veh).setUsed(true);
		user.getOrders().add(id);
		user.setVehicle(veh);
		user.setActiveOrder(id);
		
		DatabaseClass.saveData(DatabaseClass.myRepositoryPath);
		return orders.get(id);
	}
	
	public Order getActiveOrder(User user) {
		if(user.getRole() != UserRole.DELIVERY)
			return null;
		if(!orders.containsKey(user.getActiveOrder()))
			return null;
		
		return orders.get(user.getActiveOrder());
	}
	
	public Order deliverOrder(User user) {
		if(user.getRole() != UserRole.DELIVERY)
			return null;
		if(!orders.containsKey(user.getActiveOrder()))
			return null;
		
		Order tempOrder = orders.get(user.getActiveOrder());
		tempOrder.setStatus(OrderStatus.DELIVERED);
		Vehicle tempVehicle = vehicles.get(user.getVehicle());
		tempVehicle.setUsed(false);
		user.setActiveOrder(-1);
		user.setVehicle("");
		
		return tempOrder;
	}
	
	public Order createAdminOrder(User user, Order order, String veh) {
		if(user.getRole() != UserRole.ADMIN)
			return null;
		
		users.get(order.getDeliverer()).setVehicle(veh);
		vehicles.get(veh).setUsed(true);
		
		order.setStatus(OrderStatus.BEINGDELIVERED);
		order.setDateTime(new SimpleDateFormat("yyyy/MM/dd HH:mm:ss").format(new Date()));
		order.setId(Repository.getInstance().getOrders().size());
		
		users.get(order.getDeliverer()).setActiveOrder(order.getId());
		
		Repository.getInstance().getOrders().put(order.getId(), order);
		
		user.setCart(new Cart());
		
		DatabaseClass.saveData(DatabaseClass.myRepositoryPath);
		return order;
		
	}
	
	public Order deleteOrder(int id){
		if(!orders.containsKey(id))
			return null;
		
		Order tempOrder = orders.get(id);
		if(tempOrder.getStatus() == OrderStatus.BEINGDELIVERED) {
			User tempUser = users.get(tempOrder.getDeliverer());
			Vehicle tempVehicle = vehicles.get(tempUser.getVehicle());
			
			tempVehicle.setUsed(false);
			tempUser.setActiveOrder(-1);
			tempUser.setVehicle("");
		}
		
		tempOrder.setDeleted(true);
		return tempOrder;
	}

}
