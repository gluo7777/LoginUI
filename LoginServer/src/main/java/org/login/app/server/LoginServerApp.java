package org.login.app.server;

import org.login.app.server.account.*;
import org.springframework.boot.ApplicationRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Profile;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.time.LocalDate;
import java.util.LinkedList;

@SpringBootApplication
@EnableGlobalMethodSecurity(prePostEnabled = true)
public class LoginServerApp {

	public static void main(String[] args) {
		SpringApplication.run(LoginServerApp.class, args);
	}

	@Profile("dummy")
	@Bean
	public ApplicationRunner smokeTest(AccountRepository accountRepository, SecurityQuestionRepository securityQuestionRepository, AuthorityRepository authorityRepository, PasswordEncoder encoder){
		return args -> {
			Account account1 = new Account();
			account1.setFirstName("William");
            account1.setLastName("Luo");
            account1.setEmail("gluo7777@gmail.com");
            account1.setUsername("williamluo7777");
            account1.setPassword(encoder.encode("abc123"));
            account1.setDateOfBirth(LocalDate.of(1999,9,19));

            accountRepository.save(account1);

			Authority authority1 = new Authority();
			authority1.setAccount(account1);
			authority1.setAuthority(Roles.ADMIN.name());

			authorityRepository.save(authority1);

            SecurityQuestion securityQuestion1 = new SecurityQuestion();
            securityQuestion1.setQuestion("What is your first pet's name?");
            securityQuestion1.setAnswer("My Ass");
            securityQuestion1.setAccount(account1);

            securityQuestionRepository.save(securityQuestion1);

		};
	}
}
