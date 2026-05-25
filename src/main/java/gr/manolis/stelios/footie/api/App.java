package gr.manolis.stelios.footie.api;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@SpringBootApplication
@EntityScan(basePackages= {
		"gr.manolis.stelios.footie.core.peristence.dtos",
		"gr.manolis.stelios.footie.api.entities"}
		)
@ComponentScan(basePackages = {"gr.manolis.stelios.footie.api", "gr.manolis.stelios.footie.core"})
public class App {

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
		return new CorsConfiguration(reactAppPath);
	}

	private static class CorsConfiguration implements WebMvcConfigurer {
		private final String reactAppPath;

		public CorsConfiguration(String reactAppPath) {
			this.reactAppPath = reactAppPath;
		}

		@Override
		public void addCorsMappings(CorsRegistry registry) {
			if (StringUtils.isNotBlank(reactAppPath)) {
				registry
						.addMapping("/**")
						.allowedMethods("GET", "POST", "PUT", "DELETE");
			}
		}
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
