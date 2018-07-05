package services;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import database.DatabaseClass;
import models.Article;
import models.Repository;
import models.Restaurant;

public class ArticleService {
	
	private Map<String, Article> articles = DatabaseClass.getArticles();
	private Map<String, Restaurant> restaurants = DatabaseClass.getRestaurants();
	
	public Article addArticle(Article article) {
		if(article != null) {
			if(!articles.containsKey(article.getName())) {
				System.out.println(Repository.getInstance().getArticles());
				article.setDeleted(false);
				Repository.getInstance().getArticles().put(article.getName(), article);
				
				restaurants.get(article.getRestaurant()).getArticlesList().add(article.getName());
				
				DatabaseClass.saveData(DatabaseClass.myRepositoryPath);
				return article;
			}
		}
		return null;
	}
	
	public Article getOneArticle(String name){
		return articles.get(name);
	}
	
	public Article removeArticle(String name) {
		Article tempArticle = articles.get(name);
		tempArticle.setDeleted(true);
		DatabaseClass.saveData(DatabaseClass.myRepositoryPath);
		return tempArticle;
	}
	
	public Article editArticle(Article article) {		
		if(articles.containsKey(article.getName())) {
			Article tempArticle = articles.get(article.getName());			
			tempArticle.setPrice(article.getPrice());
			tempArticle.setDescription(article.getDescription());
			tempArticle.setQuantity(article.getQuantity());
			tempArticle.setType(article.getType());			
			DatabaseClass.saveData(DatabaseClass.myRepositoryPath);
			return article;
		}		
		return null;
	}
	
	public List<Article> getAllArticles(){
		List<Article> tempArticles = new ArrayList<>();
		for(Article art : articles.values()) {
			if(!art.isDeleted()) {
				tempArticles.add(art);
			}
		}
		return tempArticles;
	}

}
