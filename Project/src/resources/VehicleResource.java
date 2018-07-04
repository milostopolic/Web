package resources;

import java.util.List;

import javax.ws.rs.Consumes;
import javax.ws.rs.DELETE;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

import models.Vehicle;
import services.VehicleService;

@Path("/vehicles")
@Consumes(MediaType.APPLICATION_JSON)
@Produces(MediaType.APPLICATION_JSON)
public class VehicleResource {

	private VehicleService vehicleService = new VehicleService();
	
	@POST
	public Response addVehicle(Vehicle vehicle) {
		Vehicle tempVehicle = vehicleService.addVehicle(vehicle);
		if(tempVehicle == null) {
			return Response.status(Response.Status.BAD_REQUEST).build();
		}
		return Response.ok(tempVehicle, MediaType.APPLICATION_JSON).build();
	}
	
	@Path("/{id}")
	@GET
	public Response getOneVehicle(@PathParam("id") String id) {
		Vehicle tempVehicle = vehicleService.getOneVehicle(id);
		if(tempVehicle == null) {
			return Response.status(Response.Status.BAD_REQUEST).build();
		}
		return Response.ok(tempVehicle, MediaType.APPLICATION_JSON).build();
	}
	
	@Path("vehicleedit")
	@POST
	public Response editVehicle(Vehicle vehicle) {
		Vehicle tempVehicle = vehicleService.editVehicle(vehicle);
		if(tempVehicle == null) {
			return Response.status(Response.Status.BAD_REQUEST).build();
		}
		return Response.ok(tempVehicle, MediaType.APPLICATION_JSON).build();
	}
	
	@Path("/{id}")
	@DELETE
	public Vehicle removeVehicle(@PathParam("id") String id) {
		return vehicleService.removeVehicle(id);
	}
	
	@GET
	public Response getAllVehicles() {
		List<Vehicle> tempVehicles = vehicleService.getAllVehicles();
		if(tempVehicles == null) {
			return Response.status(Response.Status.BAD_REQUEST).build();
		}
		return Response.ok(tempVehicles, MediaType.APPLICATION_JSON).build();
	}
	
	@GET
	@Path("/freevehicles")
	public Response getFreeVehicles() {
		List<Vehicle> tempVehicles = vehicleService.getFreeVehicles();
		if(tempVehicles == null) {
			return Response.status(Response.Status.BAD_REQUEST).build();
		}
		return Response.ok(tempVehicles, MediaType.APPLICATION_JSON).build();
	}
	
}
