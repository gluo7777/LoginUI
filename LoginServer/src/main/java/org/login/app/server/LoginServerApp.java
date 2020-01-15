package org.login.app.server;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.context.properties.EnableConfigurationProperties;

@SpringBootApplication
@EnableConfigurationProperties
public class LoginServerApp {

	public static void main(String[] args) {
		SpringApplication.run(LoginServerApp.class, args);
	}
}
