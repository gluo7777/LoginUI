package org.gluo7777.springreactsession.security;

import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;

@Configuration
@EnableWebSecurity
public class SecurityConfig extends WebSecurityConfigurerAdapter {

    private static final String[] GET_WHITELIST = { "/", "/index.html", "/static/**", "/*.js", "/*.json", "/*.ico" };

    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http.csrf().disable().authorizeRequests().antMatchers(HttpMethod.GET, GET_WHITELIST).permitAll().anyRequest()
                .authenticated().and().formLogin().loginPage("/index.html")
                .defaultSuccessUrl("/index.html?success", true).loginProcessingUrl("/login")
                .failureUrl("/index.html?error").and().logout().logoutUrl("/logout").deleteCookies("JESSIONID");
    }

    @Override
    protected void configure(AuthenticationManagerBuilder auth) throws Exception {
        auth.inMemoryAuthentication().withUser("user1").password("user1Pass").roles("USER").and().withUser("user2")
                .password("user2Pass").roles("USER").and().withUser("admin").password("admin0Pass").roles("ADMIN");
    }

}