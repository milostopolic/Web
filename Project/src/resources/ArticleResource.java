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

import models.Article;
import models.Repository;
import services.ArticleService;

@Path("/articles")
@Consumes(MediaType.APPLICATION_JSON)
@Produces(MediaType.APPLICATION_JSON)
public class ArticleResource {
	
	private ArticleService articleService = new ArticleService();
	
	@POST
	public Response addArticle(Article article){
		Article tempArticle = articleService.addArticle(article);
		if(tempArticle == null) {
			return Response.status(Response.Status.BAD_REQUEST).build();
		}
		return Response.ok(tempArticle, MediaType.APPLICATION_JSON).build();
	}
	
	@Path("/{id}")
	@GET
	public Response getOneArticle(@PathParam("id") String id){
		System.out.println("USAO JE " + id + " " + Repository.getInstance().getArticles().size());
		Article tempArticle =  articleService.getOneArticle(id);
		if(tempArticle == null) {
			return Response.status(Response.Status.BAD_REQUEST).build();
		}
		return Response.ok(tempArticle, MediaType.APPLICATION_JSON).build();
	}
	
	@Path("/{id}")
	@DELETE
	public Article removeArticle(@PathParam("id") String id) {
		return articleService.removeArticle(id);
	}
	
	@Path("/articleedit")
	@POST
	public Response editArticle(Article article) {
		Article tempArticle =  articleService.editArticle(article);
		if(tempArticle == null){
			return Response.status(Response.Status.BAD_REQUEST).build();
		} 
		return Response.ok(tempArticle, MediaType.APPLICATION_JSON).build();
	}
	
	@GET
	public Response getAllArticles(){
		List<Article> tempArticles = articleService.getAllArticles();
		if(tempArticles == null) {
			return Response.status(Response.Status.BAD_REQUEST).build(); 
		}
		return Response.ok(tempArticles, MediaType.APPLICATION_JSON).build();
	}
	
	@GET
	@Path("/getarticlesbypopularity")
	public Response getArticlesByPopularity() {
		List<Article> tempArticles = articleService.getArticlesByPopularity();
		if(tempArticles == null) {
			return Response.status(Response.Status.BAD_REQUEST).build(); 
		}
		return Response.ok(tempArticles, MediaType.APPLICATION_JSON).build();
	}
}
