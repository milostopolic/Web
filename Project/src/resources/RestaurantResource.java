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

import models.Restaurant;
import services.RestaurantService;

@Path("/restaurants")
@Consumes(MediaType.APPLICATION_JSON)
@Produces(MediaType.APPLICATION_JSON)
public class RestaurantResource {

	private RestaurantService restaurantService = new RestaurantService();
	
	@POST
	public Response addRestaurant(Restaurant restaurant) {
		Restaurant tempRestaurant = restaurantService.addRestaurant(restaurant);
		if(tempRestaurant == null) {
			return Response.status(Response.Status.BAD_REQUEST).build();
		}
		return Response.ok(tempRestaurant, MediaType.APPLICATION_JSON).build();
	}
	
	@Path("/{id}")
	@GET
	public Response getOneRestaurant(@PathParam("id") String id) {
		Restaurant tempRestaurant = restaurantService.getOneRestaurant(id);
		if(tempRestaurant == null) {
			return Response.status(Response.Status.BAD_REQUEST).build(); 
		}
		return Response.ok(tempRestaurant, MediaType.APPLICATION_JSON).build();
	}
	
	@Path("restaurantedit")
	@POST
	public Response editRestaurant(Restaurant restaurant) {
		Restaurant tempRestaurant = restaurantService.editRestaurant(restaurant);
		if(tempRestaurant == null) {
			return Response.status(Response.Status.BAD_REQUEST).build();
		}
		return Response.ok(tempRestaurant, MediaType.APPLICATION_JSON).build();
	}
	
	@Path("/{id}")
	@DELETE
	public Restaurant removeArticle(@PathParam("id") String id) {
		return restaurantService.removeRestaurant(id);
	}
	
	@GET
	public Response getAllRestaurant() {
		List<Restaurant> tempRestaurants = restaurantService.getAllRestaurants();
		if(tempRestaurants == null) {
			return Response.status(Response.Status.BAD_REQUEST).build();
		}
		return Response.ok(tempRestaurants, MediaType.APPLICATION_JSON).build();
	}
	
}
