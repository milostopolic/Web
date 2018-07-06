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
	private int usedBonus;
	private float tempPrice;
	
	public Cart() {
		this.items = new ArrayList<>();
		this.usedBonus = 0;
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

	public int getUsedBonus() {
		return usedBonus;
	}

	public void setUsedBonus(int usedBonus) {
		this.usedBonus = usedBonus;
	}

	public float getTempPrice() {
		return tempPrice;
	}

	public void setTempPrice(float tempPrice) {
		this.tempPrice = tempPrice;
	}
	
	

}
