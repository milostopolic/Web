package resources;

import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.ws.rs.Consumes;
import javax.ws.rs.DELETE;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

import models.Order;
import models.OrderItem;
import models.User;
import services.OrderService;

@Path("/orders")
@Consumes(MediaType.APPLICATION_JSON)
@Produces(MediaType.APPLICATION_JSON)
public class OrderResource {
	
	private OrderService orderService = new OrderService();
	
	@POST
	public Response createOrder(Order order, @Context HttpServletRequest request) {
		User tempUser = (User) request.getSession().getAttribute("loggedUser");
		if(tempUser != null) {
			Order ord = orderService.createOrder(order, tempUser);
			return Response.ok(ord, MediaType.APPLICATION_JSON).build(); 
		}
		return Response.status(Response.Status.BAD_REQUEST).build();
	}
	
	@POST
	@Path("/cart")	
	public Response addToCart(OrderItem ordIt, @Context HttpServletRequest request) {
		User tempUser = (User) request.getSession().getAttribute("loggedUser");
		if(tempUser != null) {
			OrderItem oi = orderService.addToCart(ordIt, tempUser);
			if(oi == null) {
				return Response.status(Response.Status.BAD_REQUEST).build();
			} else {
				return Response.ok(oi, MediaType.APPLICATION_JSON).build();
			}
		}
		return Response.status(Response.Status.BAD_REQUEST).build();		
	}
	
	@POST
	@Path("/changequantity/{id}/{q}")
	public Response changeQuantity(@Context HttpServletRequest request, @PathParam("id") String id, @PathParam("q") int q) {
		User tempUser = (User) request.getSession().getAttribute("loggedUser");
		if(tempUser != null) {
			OrderItem oi = orderService.changeQuantity(id, q, tempUser);
			if(oi == null) {
				return Response.status(Response.Status.BAD_REQUEST).build();
			} else {
				return Response.ok(oi, MediaType.APPLICATION_JSON).build();
			}
		}
		return Response.status(Response.Status.BAD_REQUEST).build();
	}
	
	@DELETE
	@Path("/deleteitem/{id}")
	public Response deleteItem(@Context HttpServletRequest request, @PathParam("id") String id) {
		User tempUser = (User) request.getSession().getAttribute("loggedUser");
		if(tempUser != null) {
			OrderItem oi = orderService.deleteItem(id, tempUser);
			if(oi == null) {
				return Response.status(Response.Status.BAD_REQUEST).build();
			} else {
				return Response.ok(oi, MediaType.APPLICATION_JSON).build();
			}
		}
		return Response.status(Response.Status.BAD_REQUEST).build();
	}
	
	@GET
	public Response getAllUsers() {
		List<Order> orders = orderService.getAllOrders();
		if(orders == null) {
			return Response.status(Response.Status.BAD_REQUEST).build();
		}		
		return Response.ok(orders, MediaType.APPLICATION_JSON).build();
	}
	
	@GET
	@Path("/ordersbyuser")
	public Response getOrdersByUser(@Context HttpServletRequest request) {
		User tempUser = (User) request.getSession().getAttribute("loggedUser");
		if(tempUser != null) {
			List<Order> tempOrders = orderService.getOrdersByUser(tempUser);
			if(tempOrders == null) {
				return Response.status(Response.Status.BAD_REQUEST).build();
			} else {
				return Response.ok(tempOrders, MediaType.APPLICATION_JSON).build();
			}
		}
		return Response.status(Response.Status.BAD_REQUEST).build();
	}
	
	@GET
	@Path("/getitems/{id}")
	public Response getItemsByOrder(@PathParam("id") int id, @Context HttpServletRequest request) {
		User tempUser = (User) request.getSession().getAttribute("loggedUser");
		if(tempUser != null) {
			List<OrderItem> tempItems = orderService.getItemsByOrder(id);
			if(tempItems == null) {
				return Response.status(Response.Status.BAD_REQUEST).build();
			} else {
				return Response.ok(tempItems, MediaType.APPLICATION_JSON).build();
			}
		}
		return Response.status(Response.Status.BAD_REQUEST).build();
	}
	
	@GET
	@Path("/getordersfordelivery")
	public Response getOrdersForDelivery(@Context HttpServletRequest request) {
		User tempUser = (User) request.getSession().getAttribute("loggedUser");
		if(tempUser != null) {
			List<Order> tempOrders = orderService.getOrdersForDelivery();
			if(tempOrders == null) {
				return Response.status(Response.Status.BAD_REQUEST).build();
			} else {
				return Response.ok(tempOrders, MediaType.APPLICATION_JSON).build();
			}
		}
		return Response.status(Response.Status.BAD_REQUEST).build();
	}

}
