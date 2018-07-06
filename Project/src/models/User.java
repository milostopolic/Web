package models;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;

public class User implements Serializable{
	
	/**
	 * 
	 */
	private static final long serialVersionUID = 6228135378066742426L;
	private String username;
	private String password;
	private String name;
	private String surname;
	private UserRole role;
	private String contact;
	private String email;
	private String date;
	private List<String> favouriteRestaurants;
	private Cart cart;
	private List<Integer> orders;
	private String vehicle;
	private int activeOrder;
	
	private int bonus;
	
	/*public User(String username, String password, String name, String surname) {
		super();
		this.username = username;
		this.password = password;
		this.name = name;
		this.surname = surname;
	}*/
	
	public User(String username, String password, String name, String surname, String contact, String email,
			String date) {
		super();
		this.username = username;
		this.password = password;
		this.name = name;
		this.surname = surname;
		this.contact = contact;
		this.email = email;
		this.date = date;
	}

	public User() {
		this.favouriteRestaurants = new ArrayList<>();
		this.cart = new Cart();
		this.orders = new ArrayList<>();
		this.vehicle = "";
		this.activeOrder = -1;
		this.bonus = 0;
	}

	public String getUsername() {
		return username;
	}

	public void setUsername(String username) {
		this.username = username;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getSurname() {
		return surname;
	}

	public void setSurname(String surname) {
		this.surname = surname;
	}

	public String getContact() {
		return contact;
	}

	public void setContact(String contact) {
		this.contact = contact;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getDate() {
		return date;
	}

	public void setDate(String date) {
		this.date = date;
	}

	public UserRole getRole() {
		return role;
	}

	public void setRole(UserRole role) {
		this.role = role;
	}

	public List<String> getFavouriteRestaurants() {
		return favouriteRestaurants;
	}

	public void setFavouriteRestaurants(List<String> favouriteRestaurants) {
		this.favouriteRestaurants = favouriteRestaurants;
	}

	public Cart getCart() {
		return cart;
	}

	public void setCart(Cart cart) {
		this.cart = cart;
	}

	public List<Integer> getOrders() {
		return orders;
	}

	public void setOrders(List<Integer> orders) {
		this.orders = orders;
	}

	public String getVehicle() {
		return vehicle;
	}

	public void setVehicle(String vehicle) {
		this.vehicle = vehicle;
	}

	public int getActiveOrder() {
		return activeOrder;
	}

	public void setActiveOrder(int activeOrder) {
		this.activeOrder = activeOrder;
	}

	public int getBonus() {
		return bonus;
	}

	public void setBonus(int bonus) {
		this.bonus = bonus;
	}
	
	
	
}
