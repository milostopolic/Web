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

public class OrderService {
	
	private Map<Integer, Order> orders = DatabaseClass.getOrders();
	private Map<String, Article> articles = DatabaseClass.getArticles();
	
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
		Repository.getInstance().getOrders().put(order.getId(), order);
		
		user.setCart(new Cart());
		
		DatabaseClass.saveData(DatabaseClass.myRepositoryPath);
		return order;
	}
	
	public List<Order> getAllOrders() {
		return new ArrayList<Order>(orders.values());
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

}
