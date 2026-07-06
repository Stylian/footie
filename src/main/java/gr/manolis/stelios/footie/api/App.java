package gr.manolis.stelios.footie.api;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.ComponentScan;
import jakarta.persistence.EntityManagerFactory;
import jakarta.persistence.EntityManagerFactory;
import org.hibernate.SessionFactory;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@SpringBootApplication
@EntityScan(basePackages= {
		"gr.manolis.stelios.footie.core.peristence.dtos",
		"gr.manolis.stelios.footie.api.entities"}
		)
@ComponentScan("gr.manolis.stelios.footie")
public class App {

	static {
		boolean isDev = false;
		try {
			String path = App.class.getProtectionDomain().getCodeSource().getLocation().getPath();
			isDev = !path.endsWith(".jar");
		} catch (Exception e) {
			isDev = true;
		}

		if (isDev) {
			if (System.getProperty("derby.stream.error.file") == null) {
				java.io.File logsDir = new java.io.File(".apprun/logs");
				if (!logsDir.exists()) {
					logsDir.mkdirs();
				}
				System.setProperty("derby.stream.error.file", ".apprun/logs/derby.log");
			}
			if (System.getProperty("spring.datasource.url") == null) {
				System.setProperty("spring.datasource.url", "jdbc:derby:.apprun/data;create=true");
			}
		} else {
			if (System.getProperty("derby.stream.error.file") == null) {
				java.io.File logsDir = new java.io.File("logs");
				if (!logsDir.exists()) {
					logsDir.mkdirs();
				}
				System.setProperty("derby.stream.error.file", "logs/derby.log");
			}
		}
	}

	@Value("${react-app.path}")
	private String reactAppPath;

	public static void main(String[] args) {
		SpringApplication.run(App.class, args);
	}


	/**
	 * this allows access from react-app, needed for developers only. set the following line in
	 * application.properties accordingly if your react app is not on the default port and path
	 * react-app.path=http://localhost:3000
	 */
	@Bean
	public WebMvcConfigurer corsConfigurer() {
		return new WebMvcConfigurer() {
			@Override
			public void addCorsMappings(CorsRegistry registry) {

				if (StringUtils.isBlank(reactAppPath)) {
					return; // provides no access to a front end tool if the property is not set
				}

				registry
						.addMapping("/**")
//						.allowedOrigins(reactAppPath)    // since I proxied react this breaks it
						.allowedMethods("GET", "POST", "PUT", "DELETE");
			}
		};
	}


	/**
	 * jackson mapper accessed from any bean and spring test with autowired
	 * to remove? not for mapstruct?
	 * @return the instance of the jackson mapper
	 */
	@Bean
	public ObjectMapper mapper() {
		return new ObjectMapper();
	}

}
