package resources;

import javax.ws.rs.Consumes;
import javax.ws.rs.DELETE;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;

import models.Restaurant;
import models.Vehicle;
import services.VehicleService;

@Path("/vehicles")
@Consumes(MediaType.APPLICATION_JSON)
@Produces(MediaType.APPLICATION_JSON)
public class VehicleResource {

	private VehicleService vehicleService = new VehicleService();
	
	@POST
	public Vehicle addVehicle(Vehicle vehicle) {
		return vehicleService.addVehicle(vehicle);
	}
	
	@Path("/{id}")
	@DELETE
	public Vehicle removeVehicle(@PathParam("id") String id) {
		return vehicleService.removeVehicle(id);
	}
	
}
