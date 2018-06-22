package database;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.ObjectInputStream;
import java.io.ObjectOutputStream;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

import com.google.gson.Gson;

import models.Article;
import models.Repository;
import models.Restaurant;
import models.User;
import models.UserRole;
import models.Vehicle;


public class DatabaseClass {

	//private static Map<Integer, Message> messages;
	private static Map<String, User> users = Repository.getInstance().getUsers();
	private static Map<String, Article> articles = Repository.getInstance().getArticles();
	private static Map<String, Vehicle> vehicles = Repository.getInstance().getVehicles();
	private static Map<String, Restaurant> restaurants = Repository.getInstance().getRestaurants();
	/*private static Map<String,Subforum> subforums;
	private static Map<Integer,Report> reports;*/
	
	public static int commId;
	public static int messageId;
	public static int reportId;
	
	public static String myRepositoryPath = System.getProperty("user.home") + File.separator + "Desktop" + File.separator + "repository.ser";
	/*public static String myUsersPath = System.getProperty("user.home") + File.separator + "Desktop" + File.separator + "users.ser";
	public static String mySubforumsPath = System.getProperty("user.home") + File.separator + "Desktop" + File.separator + "subforums.ser";
	public static String myMessagesPath = System.getProperty("user.home") + File.separator + "Desktop" + File.separator + "messages.ser";
	public static String myCountersPath = System.getProperty("user.home") + File.separator + "Desktop" + File.separator + "counters.ser";
	public static String myReportsPath = System.getProperty("user.home") + File.separator + "Desktop" + File.separator + "reports.ser";*/

	
	public DatabaseClass(){
		
	}
	
	/*public static Map<Integer, Message> getMessages() {
		if(messages == null){
			try {
				loadData(myMessagesPath);
			} catch (Exception e) {
				// TODO Auto-generated catch block
				messages = new HashMap<Integer,Message>();
			}
		}
		
		return messages;
	}*/
	
	public static Repository getRepository() {
		if(Repository.getInstance() == null) {
			try {
				Repository.getInstance().setUsers(new HashMap<String,User>());
				Repository.getInstance().setArticles(new HashMap<String,Article>());
				Repository.getInstance().setVehicles(new HashMap<String,Vehicle>());
				Repository.getInstance().setRestaurants(new HashMap<String,Restaurant>());
				loadData(myRepositoryPath);
				String basePath = new File("").getAbsolutePath();
			    System.out.println(basePath);

			    String path = new File("src/img/").getAbsolutePath();
			    System.out.println(path);
				
			} catch (Exception e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
				Repository.getInstance().setUsers(new HashMap<String,User>());
				Repository.getInstance().setArticles(new HashMap<String,Article>());
				Repository.getInstance().setVehicles(new HashMap<String,Vehicle>());
				Repository.getInstance().setRestaurants(new HashMap<String,Restaurant>());
			}
		}
		return Repository.getInstance();
	}
	
	public static Map<String, User> getUsers() {
		if(Repository.getInstance().getUsers() == null){
			try {
				Repository.getInstance().setUsers(new HashMap<String,User>());
				loadData(myRepositoryPath);
				String basePath = new File("").getAbsolutePath();
			    System.out.println(basePath);

			    String path = new File("src/img/").getAbsolutePath();
			    System.out.println(path);
			    if(!Repository.getInstance().getUsers().containsKey("admin")) {
			    	Repository.getInstance().getUsers().put("admin", new User("admin", "admin", "admin", "admin", "admin", "admin", ""));
					Repository.getInstance().getUsers().get("admin").setRole(UserRole.ADMIN);
					Repository.getInstance().getUsers().get("admin").setDate(new SimpleDateFormat("dd-MM-yyyy").format(new Date()));
					DatabaseClass.saveData(myRepositoryPath);
			    }			    
				
			} catch (Exception e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
				if(!Repository.getInstance().getUsers().containsKey("admin")) {
			    	Repository.getInstance().getUsers().put("admin", new User("admin", "admin", "admin", "admin", "admin", "admin", ""));
					Repository.getInstance().getUsers().get("admin").setRole(UserRole.ADMIN);
					Repository.getInstance().getUsers().get("admin").setDate(new SimpleDateFormat("dd-MM-yyyy").format(new Date()));
					DatabaseClass.saveData(myRepositoryPath);
			    }
			}
		}
		return Repository.getInstance().getUsers();
	}
	
	public static Map<String, Article> getArticles() {
		if(Repository.getInstance().getArticles() == null){
			try {
				Repository.getInstance().setArticles(new HashMap<String,Article>());
				loadData(myRepositoryPath);
				if(Repository.getInstance().getArticles() == null) {
					System.out.println("DOBRO");
					Repository.getInstance().setArticles(new HashMap<String,Article>());
				}
					
				String basePath = new File("").getAbsolutePath();
			    System.out.println(basePath);

			    String path = new File("src/img/").getAbsolutePath();
			    System.out.println(path);
				
			} catch (Exception e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
				Repository.getInstance().setArticles(new HashMap<String,Article>());
			}
		}
		return Repository.getInstance().getArticles();
	}
	
	public static Map<String, Vehicle> getVehicles() {
		if(Repository.getInstance().getVehicles() == null){
			try {
				Repository.getInstance().setVehicles(new HashMap<String,Vehicle>());
				loadData(myRepositoryPath);
				if(Repository.getInstance().getVehicles() == null) {
					System.out.println("DOBRO");
					Repository.getInstance().setVehicles(new HashMap<String,Vehicle>());
				}
				
				String basePath = new File("").getAbsolutePath();
			    System.out.println(basePath);

			    String path = new File("src/img/").getAbsolutePath();
			    System.out.println(path);
				
			} catch (Exception e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
				Repository.getInstance().setVehicles(new HashMap<String,Vehicle>());
			}
		}
		return Repository.getInstance().getVehicles();
	}
	
	public static Map<String, Restaurant> getRestaurants() {
		if(Repository.getInstance().getRestaurants() == null){
			try {
				System.out.println("USAO JE GDE treba");
				Repository.getInstance().setRestaurants(new HashMap<String,Restaurant>());
				System.out.println(Repository.getInstance().getRestaurants().size());
				loadData(myRepositoryPath);
				if(Repository.getInstance().getRestaurants() == null) {
					System.out.println("DOBRO");
					Repository.getInstance().setRestaurants(new HashMap<String,Restaurant>());
				}
				System.out.println(Repository.getInstance().getRestaurants().size());
				String basePath = new File("").getAbsolutePath();
			    System.out.println(basePath);

			    String path = new File("src/img/").getAbsolutePath();
			    System.out.println(path);
				
			} catch (Exception e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
				Repository.getInstance().setRestaurants(new HashMap<String,Restaurant>());
			}
		}
		return Repository.getInstance().getRestaurants();
	}
	
	/*public static Map<String,Subforum> getSubforums(){
		if(subforums == null){
			try {
				loadData(mySubforumsPath);
			} catch (Exception e) {
				// TODO Auto-generated catch block
				subforums = new HashMap<String,Subforum>();
			}
		}
		return subforums;
	}
	
	public static int getCommentCounter(){
		if(commId == 0){
			try {
				loadData(myCountersPath);
			} catch (Exception e) {
				// TODO Auto-generated catch block
				commId=0;
			}
		}
		return commId;
	}
	
	public static int getMessageCounter(){
		if(commId == 0){
			try {
				loadData(myCountersPath);
			} catch (Exception e) {
				// TODO Auto-generated catch block
				messageId=0;
			}
		}
		return messageId;
	}
	
	public static int getReportCounter(){
		if(reportId == 0){
			try {
				loadData(myCountersPath);
			} catch (Exception e) {
				// TODO Auto-generated catch block
				reportId=0;
			}
		}
		return reportId;
	}
	
	public static Map<Integer, Report> getReports() {
		if(reports == null){
			try {
				loadData(myReportsPath);
			} catch (Exception e) {
				// TODO Auto-generated catch block
				reports = new HashMap<Integer,Report>();
			}
		}
		return reports;
	}
	
	*///za sada cuva samo korisnike
	public static void saveData(String path){
		try {
			FileOutputStream fos = new FileOutputStream(path);
			ObjectOutputStream oos = new ObjectOutputStream(fos);
			
			Gson gson = new Gson();
			String json = gson.toJson(Repository.getInstance());
			
			/*if(path.equals(myUsersPath)){			
				for(User u : users.values()) {
					String json = gson.toJson(u);
					oos.writeObject(json);
				}				
			}*/
			
			if(path.equals(myRepositoryPath)){
				
				oos.writeObject(json);
			}
			
			oos.close();
			fos.close();
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}
	
	//za sada ucitava samo korisnike
	public static void loadData(String path) throws Exception{
		
			FileInputStream fis = new FileInputStream(path);
			ObjectInputStream ois = new ObjectInputStream(fis);
			Repository temp = null;
			
			Gson gson = new Gson();
			
			
			if(path.equals(myRepositoryPath)){
				temp = gson.fromJson((String) ois.readObject(), Repository.class);
				Repository.getInstance().setUsers(temp.getUsers());
				Repository.getInstance().setArticles(temp.getArticles());
				Repository.getInstance().setVehicles(temp.getVehicles());
				Repository.getInstance().setRestaurants(temp.getRestaurants());
				//users = temp;
			}
			
			
			ois.close();
			fis.close();
		
	}
}
