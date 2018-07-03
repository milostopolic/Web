package models;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;

public class Cart implements Serializable{
	
	/**
	 * 
	 */
	private static final long serialVersionUID = -6203946403036531580L;
	private List<OrderItem> items;
	private String note;
	private float totalPrice;
	
	public Cart() {
		this.items = new ArrayList<>();
	}

	public List<OrderItem> getItems() {
		return items;
	}

	public void setItems(List<OrderItem> items) {
		this.items = items;
	}

	public String getNote() {
		return note;
	}

	public void setNote(String note) {
		this.note = note;
	}

	public float getTotalPrice() {
		return totalPrice;
	}

	public void setTotalPrice(float totalPrice) {
		this.totalPrice = totalPrice;
	}
	
	

}
