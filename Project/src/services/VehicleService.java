package services;

import java.util.Map;

import database.DatabaseClass;
import models.Repository;
import models.Vehicle;

public class VehicleService {

	private Map<String, Vehicle> vehicles = DatabaseClass.getVehicles();
	
	public Vehicle addVehicle(Vehicle vehicle) {
		if(vehicle != null) {
			vehicle.setUsed(false);
			Repository.getInstance().getVehicles().put(vehicle.getModel(), vehicle);
			DatabaseClass.saveData(DatabaseClass.myRepositoryPath);
		}
		return vehicle;
	}
	
	public Vehicle removeVehicle(String id) {
		Vehicle tempVehicle = vehicles.remove(id);
		DatabaseClass.saveData(DatabaseClass.myRepositoryPath);
		return tempVehicle;
	}
	
}
