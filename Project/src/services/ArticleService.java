package services;

import java.util.Map;

import database.DatabaseClass;
import models.Article;
import models.Repository;
import models.User;

public class ArticleService {
	
	private Map<String, Article> articles = DatabaseClass.getArticles();
	
	public Article addArticle(Article article) {
		if(article != null) {
			System.out.println(Repository.getInstance().getArticles());
			Repository.getInstance().getArticles().put(article.getName(), article);
			DatabaseClass.saveData(DatabaseClass.myRepositoryPath);
		}
		return article;
	}
	
	public Article getOneArticle(String name){
		return articles.get(name);
	}
	
	public Article removeArticle(String name) {
		Article tempArticle = articles.remove(name);
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
			//System.out.println(tempUser.getPassword());
			//users.put(tempUser.getUsername(), tempUser);
			DatabaseClass.saveData(DatabaseClass.myRepositoryPath);
			return article;
		}		
		return null;
	}

}
