package org.login.app.server;

import org.login.app.server.account.Account;
import org.login.app.server.account.AccountRepository;
import org.login.app.server.account.SecurityQuestion;
import org.login.app.server.account.SecurityQuestionRepository;
import org.springframework.boot.ApplicationRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Profile;

import java.time.LocalDate;
import java.util.LinkedList;

@SpringBootApplication
public class LoginServerApp {

	public static void main(String[] args) {
		SpringApplication.run(LoginServerApp.class, args);
	}

	@Profile("local")
	@Bean
	public ApplicationRunner smokeTest(AccountRepository accountRepository, SecurityQuestionRepository securityQuestionRepository){
		return args -> {
			Account account1 = new Account();
			account1.setFirstName("William");
            account1.setLastName("Luo");
            account1.setEmail("gluo7777@gmail.com");
            account1.setUsername("williamluo7777");
            account1.setPassword("abc123");
            account1.setDateOfBirth(LocalDate.of(1999,9,19));

            accountRepository.save(account1);

            SecurityQuestion securityQuestion1 = new SecurityQuestion();
            securityQuestion1.setQuestion("What is your first pet's name?");
            securityQuestion1.setAnswer("My Ass");
            securityQuestion1.setAccountId(account1.getId());

            securityQuestionRepository.save(securityQuestion1);

			System.out.println(account1);
		};
	}
}
