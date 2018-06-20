package services;

import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Map;

import database.DatabaseClass;
import models.Repository;
import models.User;
import models.UserRole;

public class UserService {
	
	private Map<String,User> users = DatabaseClass.getUsers();
	
	public User addUser(User user){
		if(user!=null){
			user.setRole(UserRole.CUSTOMER);
			user.setDate(new SimpleDateFormat("dd-MM-yyyy").format(new Date()));			
			Repository.getInstance().getUsers().put(user.getUsername(), user);
			DatabaseClass.saveData(DatabaseClass.myRepositoryPath);
		}
		return user;
	}
	
	public User loginUser(User user) {
		if(users.containsKey(user.getUsername())) {
			return users.get(user.getUsername());
		}		
		return null;
	}
	
	public User editUser(User user) {		
		if(users.containsKey(user.getUsername())) {
			User tempUser = users.get(user.getUsername());
			//users.remove(user.getUsername());
			//DatabaseClass.saveData(DatabaseClass.myRepositoryPath);
			//System.out.println(tempUser.getPassword());
			tempUser.setPassword(user.getPassword());
			//System.out.println(tempUser.getPassword());
			//users.put(tempUser.getUsername(), tempUser);
			DatabaseClass.saveData(DatabaseClass.myRepositoryPath);
			return user;
		}		
		return null;
	}
	
	public User getLoggedUser(User user) {
		if(user != null) {
			return user;
		}
		return null;
	}
	
	public User changeRole(User admin, String username, UserRole ur) {
		if(admin.getRole() != UserRole.ADMIN) {
			return null;
		}
		users.get(username).setRole(ur);
		DatabaseClass.saveData(DatabaseClass.myRepositoryPath);
		return users.get(username);
	}
	
	public  List<User> getAllUsers(){
		return new ArrayList<User>(users.values()); 
	}

}
