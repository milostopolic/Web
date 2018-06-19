package resources;


import javax.ws.rs.Consumes;
import javax.ws.rs.DELETE;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;

import models.Article;
import models.Repository;
import services.ArticleService;

@Path("/articles")
@Consumes(MediaType.APPLICATION_JSON)
@Produces(MediaType.APPLICATION_JSON)
public class ArticleResource {
	
	private ArticleService articleService = new ArticleService();
	
	@POST
	public Article addArticle(Article article){
		return articleService.addArticle(article);
	}
	
	@Path("/{id}")
	@GET
	public Article getOneArticle(@PathParam("id") String id){
		System.out.println("USAO JE " + id + " " + Repository.getInstance().getArticles().size());
		return articleService.getOneArticle(id);
	}
	
	@Path("/{id}")
	@DELETE
	public Article removeArticle(@PathParam("id") String id) {
		return articleService.removeArticle(id);
	}
	
	@Path("/articleedit")
	@POST
	public Article editArticle(Article article) {
		return articleService.editArticle(article);
	}
}
