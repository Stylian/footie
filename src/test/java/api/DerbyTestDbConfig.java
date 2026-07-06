package api;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Profile;
import org.springframework.jdbc.datasource.DriverManagerDataSource;
import org.springframework.transaction.annotation.EnableTransactionManagement;

import javax.sql.DataSource;

@Configuration
@EnableTransactionManagement
public class DerbyTestDbConfig {

    @Bean
    @Profile("test & !dev-test")
    public DataSource dataSource() {
        DriverManagerDataSource dataSource = new DriverManagerDataSource();
        dataSource.setDriverClassName("org.apache.derby.jdbc.EmbeddedDriver");
        dataSource.setUrl("jdbc:derby:memory:footieTestDB_" + java.util.UUID.randomUUID().toString() + ";create=true");
        dataSource.setUsername("user");
        dataSource.setPassword("");

        return dataSource;
    }

    @Bean
    @Profile("dev-test")
    public DataSource devTestDataSource() {
        DriverManagerDataSource dataSource = new DriverManagerDataSource();
        dataSource.setDriverClassName("org.apache.derby.jdbc.EmbeddedDriver");
        String userHome = System.getProperty("user.home");
        dataSource.setUrl("jdbc:derby:" + userHome + "/footie/dev-test-data;create=true");
        dataSource.setUsername("user");
        dataSource.setPassword("");

        return dataSource;
    }
}
