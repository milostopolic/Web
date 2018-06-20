package resources;

import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

import models.User;
import models.UserRole;
import services.UserService;

@Path("/users")
@Consumes(MediaType.APPLICATION_JSON)
@Produces(MediaType.APPLICATION_JSON)
public class UserResource {
	
	private UserService userService = new UserService();
	
	@POST
	public User addUser(User user){
		return userService.addUser(user);
	}
	
	@POST
	@Path("/login")
	public Response loginUser(User user,@Context HttpServletRequest request) {		
		User tempUser =  userService.loginUser(user);
		
		if(tempUser == null) {
			return Response.status(Response.Status.NOT_FOUND).build();
		}
		request.getSession().setAttribute("loggedUser", tempUser);
		return Response.ok(tempUser, MediaType.APPLICATION_JSON).build();
	}
	
	@GET
	@Path("/logout")
	public void logout(@Context HttpServletRequest request){
		request.getSession().invalidate();
	}
	
	@POST
	@Path("/useredit")
	public Response editUser(User user,@Context HttpServletRequest request) {		
		User tempUser =  userService.editUser(user);
		
		if(tempUser == null) {
			return Response.status(Response.Status.NOT_FOUND).build();
		}
		request.getSession().setAttribute("loggedUser", tempUser);
		return Response.ok(tempUser, MediaType.APPLICATION_JSON).build();
	}
	
	@GET
	public Response getAllUsers() {
		List<User> tempUsers = userService.getAllUsers();
		if(tempUsers == null) {
			return Response.status(Response.Status.BAD_REQUEST).build();
		}
		return Response.ok(tempUsers, MediaType.APPLICATION_JSON).build();
	}
	
	@GET
	@Path("/loggeduser")
	public Response getLoggedUser(@Context HttpServletRequest request) {
		User loggedUser = (User) request.getSession().getAttribute("loggedUser");
		User tempUser = userService.getLoggedUser(loggedUser);
		if(tempUser == null) {
			return Response.status(Response.Status.BAD_REQUEST).build();
		}
		return Response.ok(tempUser, MediaType.APPLICATION_JSON).build();
	}
	
	@GET
	@Path("/changerole/{role}/{username}")
	public Response changeRole(@Context HttpServletRequest request, @PathParam("role") UserRole ur, @PathParam("username") String username) {
		User admin = (User) request.getSession().getAttribute("loggedUser");
		System.out.println(admin.getRole());
		User tempUser = userService.changeRole(admin, username, ur);
		if(tempUser == null) {
			return Response.status(Response.Status.BAD_REQUEST).build();
		}
		request.getSession().setAttribute("loggedUser", admin);
		return Response.ok(tempUser, MediaType.APPLICATION_JSON).build();
	}
	
	
	/*@GET
	@Path("retrieve/{uuid}")
	public Response retrieveSomething(@PathParam("uuid") String uuid) {
	    if(uuid == null || uuid.trim().length() == 0) {
	        return Response.serverError().entity("UUID cannot be blank").build();
	    }
	    Entity entity = service.getById(uuid);
	    if(entity == null) {
	        return Response.status(Response.Status.NOT_FOUND).entity("Entity not found for UUID: " + uuid).build();
	    }
	    String json = //convert entity to json
	    return Response.ok(json, MediaType.APPLICATION_JSON).build();
	}*/
}
