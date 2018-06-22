package services;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import database.DatabaseClass;
import models.Repository;
import models.Vehicle;

public class VehicleService {

	private Map<String, Vehicle> vehicles = DatabaseClass.getVehicles();
	
	public Vehicle addVehicle(Vehicle vehicle) {
		if(vehicle != null) {
			if(!vehicles.containsKey(vehicle.getModel())) {
				vehicle.setUsed(false);
				vehicle.setDeleted(false);
				Repository.getInstance().getVehicles().put(vehicle.getModel(), vehicle);
				DatabaseClass.saveData(DatabaseClass.myRepositoryPath);
				
				return vehicle;
			}
		}
		return null;
	}
	
	public Vehicle getOneVehicle(String model) {
		return vehicles.get(model);
	}
	
	public Vehicle removeVehicle(String id) {
		Vehicle tempVehicle = vehicles.get(id);
		tempVehicle.setDeleted(true);
		DatabaseClass.saveData(DatabaseClass.myRepositoryPath);
		return tempVehicle;
	}
	
	public Vehicle editVehicle(Vehicle vehicle) {
		if(vehicles.containsKey(vehicle.getModel())) {
			Vehicle tempVehicle = vehicles.get(vehicle.getModel());
			tempVehicle.setNote(vehicle.getNote());
			tempVehicle.setRegistration(vehicle.getRegistration());
			tempVehicle.setYear(vehicle.getYear());
			DatabaseClass.saveData(DatabaseClass.myRepositoryPath);
			return vehicle;
		}
		return null;
	}
	
	public List<Vehicle> getAllVehicles() {
		List<Vehicle> tempVehicles = new ArrayList<>();
		for(Vehicle veh : vehicles.values()) {
			if(!veh.isDeleted()) {
				tempVehicles.add(veh);
			}
		}
		return tempVehicles;
	}
	
}
