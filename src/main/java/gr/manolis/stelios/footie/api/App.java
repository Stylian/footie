package gr.manolis.stelios.footie.api;

import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.orm.jpa.vendor.HibernateJpaSessionFactoryBean;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurerAdapter;

@SpringBootApplication
@EntityScan("gr.manolis.stelios.footie.core.peristence.dtos")
@ComponentScan("gr.manolis.stelios.footie")
public class App {

	@Value("${react-app.path}")
	private String reactAppPath;

	public static void main(String[] args) {
		SpringApplication.run(App.class, args);
	}

	@Bean
	public HibernateJpaSessionFactoryBean sessionFactory() {
		return new HibernateJpaSessionFactoryBean();
	}

	/**
	 * this allows access from react-app, needed for developers only. set the following line in
	 * application.properties accordingly if your react app is not on the default port and path
	 * react-app.path=http://localhost:3000
	 */
	@Bean
	public WebMvcConfigurer corsConfigurer() {
		return new WebMvcConfigurerAdapter() {
			@Override
			public void addCorsMappings(CorsRegistry registry) {

				if (StringUtils.isBlank(reactAppPath)) {
					return; // provides no access to a front end tool if the property is not set
				}

				registry
						.addMapping("/**")
						.allowedOrigins(reactAppPath)
						.allowedMethods("GET", "POST", "PUT", "DELETE");
			}
		};
	}
}
