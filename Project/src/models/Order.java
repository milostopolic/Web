package models;

import java.io.Serializable;

public class Order implements Serializable{

	/**
	 * 
	 */
	private static final long serialVersionUID = -5394164215348060960L;
	
	private Article item;
	private String dateTime;
	private User buyer;
	private User deliverer;
	private OrderStatus status;
	private String note;
	
	public Order() {
		
	}

	public Order(Article item, String dateTime, User buyer, User deliverer, String note) {
		super();
		this.item = item;
		this.dateTime = dateTime;
		this.buyer = buyer;
		this.deliverer = deliverer;
		this.note = note;
	}

	public Article getItem() {
		return item;
	}

	public void setItem(Article item) {
		this.item = item;
	}

	public String getDateTime() {
		return dateTime;
	}

	public void setDateTime(String dateTime) {
		this.dateTime = dateTime;
	}

	public User getBuyer() {
		return buyer;
	}

	public void setBuyer(User buyer) {
		this.buyer = buyer;
	}

	public User getDeliverer() {
		return deliverer;
	}

	public void setDeliverer(User deliverer) {
		this.deliverer = deliverer;
	}

	public String getNote() {
		return note;
	}

	public void setNote(String note) {
		this.note = note;
	}

	public OrderStatus getStatus() {
		return status;
	}

	public void setStatus(OrderStatus status) {
		this.status = status;
	}
	
	

}
