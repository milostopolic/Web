package services;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import database.DatabaseClass;
import models.Article;
import models.Repository;

public class ArticleService {
	
	private Map<String, Article> articles = DatabaseClass.getArticles();
	
	public Article addArticle(Article article) {
		if(article != null) {
			if(!articles.containsKey(article.getName())) {
				System.out.println(Repository.getInstance().getArticles());
				article.setDeleted(false);
				Repository.getInstance().getArticles().put(article.getName(), article);
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
			//users.remove(user.getUsername());
			//DatabaseClass.saveData(DatabaseClass.myRepositoryPath);
			//System.out.println(tempUser.getPassword());
			tempArticle.setPrice(article.getPrice());
			tempArticle.setDescription(article.getDescription());
			tempArticle.setQuantity(article.getQuantity());
			tempArticle.setType(article.getType());
			//System.out.println(tempUser.getPassword());
			//users.put(tempUser.getUsername(), tempUser);
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
