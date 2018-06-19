package models;

import java.io.Serializable;

public class Vehicle implements Serializable {

	/**
	 * 
	 */
	private static final long serialVersionUID = 7479967560412288894L;
	
	private String maker;
	private String model;
	private VehicleType type;
	private String registration;
	private boolean used;
	private String note;
	
	public Vehicle(String maker, String model, String registration, boolean used, String note) {
		super();
		this.maker = maker;
		this.model = model;
		this.registration = registration;
		this.used = used;
		this.note = note;
	}
	
	public Vehicle() {
		
	}

	public String getMaker() {
		return maker;
	}

	public void setMaker(String maker) {
		this.maker = maker;
	}

	public String getModel() {
		return model;
	}

	public void setModel(String model) {
		this.model = model;
	}

	public String getRegistration() {
		return registration;
	}

	public void setRegistration(String registration) {
		this.registration = registration;
	}

	public boolean isUsed() {
		return used;
	}

	public void setUsed(boolean used) {
		this.used = used;
	}

	public String getNote() {
		return note;
	}

	public void setNote(String note) {
		this.note = note;
	}
	
	
	
	

}
