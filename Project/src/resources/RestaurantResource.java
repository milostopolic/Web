package resources;

import javax.ws.rs.Consumes;
import javax.ws.rs.DELETE;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;

import models.Article;
import models.Restaurant;
import services.RestaurantService;

@Path("/restaurants")
@Consumes(MediaType.APPLICATION_JSON)
@Produces(MediaType.APPLICATION_JSON)
public class RestaurantResource {

	private RestaurantService restaurantService = new RestaurantService();
	
	@POST
	public Restaurant addRestaurant(Restaurant restaurant) {
		return restaurantService.addRestaurant(restaurant);
	}
	
	@Path("/{id}")
	@DELETE
	public Restaurant removeArticle(@PathParam("id") String id) {
		return restaurantService.removeRestaurant(id);
	}
	
}
