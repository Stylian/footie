package api;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
//(scanBasePackages={
//		"core.services",
//		"core.peristence.dtos",
//		"api"
//})
public class App {

	public static void main(String[] args) {
		SpringApplication.run(App.class, args);
	}
	
}
