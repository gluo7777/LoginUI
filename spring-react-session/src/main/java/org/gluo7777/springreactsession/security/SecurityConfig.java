package org.gluo7777.springreactsession.security;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.util.Arrays;
import java.util.Collection;

@Configuration
@EnableWebSecurity
public class SecurityConfig extends WebSecurityConfigurerAdapter {

    private static final String[] GET_WHITELIST = { "/", "/index.html", "/static/**", "/*.js", "/*.json", "/*.ico", "/preview/login-page", "/in-secure/**" };

//    @Override
//    protected void configure(HttpSecurity http) throws Exception {
//        http.csrf().disable().authorizeRequests().antMatchers(HttpMethod.GET, GET_WHITELIST).permitAll().anyRequest()
//                .authenticated().and().formLogin().loginPage("/index.html")
//                .defaultSuccessUrl("/index.html?success", true).loginProcessingUrl("/login")
//                .failureUrl("/index.html?error").and().logout().logoutUrl("/logout").deleteCookies("JESSIONID");
//    }
//
//    @Override
//    protected void configure(AuthenticationManagerBuilder auth) throws Exception {
//        auth.inMemoryAuthentication().withUser("user1").password("{noop}user1Pass").roles("USER").and()
//                .withUser("user2").password("{noop}user2Pass").roles("USER").and().withUser("admin")
//                .password("{noop}admin0Pass").roles("ADMIN");
//    }

    private static final String LOGIN_PAGE = "/preview/login-page";

    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http.cors().and().csrf().disable().authorizeRequests().antMatchers(HttpMethod.GET, GET_WHITELIST).permitAll().anyRequest()
                .authenticated().and().formLogin().loginPage(LOGIN_PAGE)
                .defaultSuccessUrl(LOGIN_PAGE + "?success", true).loginProcessingUrl("/login")
                .failureUrl(LOGIN_PAGE + "?error").and().logout().logoutUrl("/logout").deleteCookies("JESSIONID").and().userDetailsService(userDetailsService());


    }

    @Bean
    CorsConfigurationSource corsConfigurationSource(){
        CorsConfiguration configuration = new CorsConfiguration();
        configuration.setAllowedOrigins(Arrays.asList("http://frontend.login.com:3000"));
        configuration.setAllowedMethods(Arrays.asList("GET"));
        configuration.setAllowedHeaders(Arrays.asList("*"));
        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/in-secure/**", configuration);
        return source;
    }

    @Override
    protected void configure(AuthenticationManagerBuilder auth) throws Exception {
        auth.inMemoryAuthentication().withUser("user1").password("{noop}user1Pass").roles("USER").and()
                .withUser("user2").password("{noop}user2Pass").roles("USER").and().withUser("admin")
                .password("{noop}admin0Pass").roles("ADMIN");
    }

    @Bean
    public UserDetailsService userDetailsService(){
        return username -> new UserDetails() {
            @Override
            public Collection<? extends GrantedAuthority> getAuthorities() {
                return Arrays.asList(new GrantedAuthority() {
                    @Override
                    public String getAuthority() {
                        return "USER";
                    }
                });
            }

            @Override
            public String getPassword() {
                return "{noop}user1Pass";
            }

            @Override
            public String getUsername() {
                return username + "-fake";
            }

            @Override
            public boolean isAccountNonExpired() {
                return true;
            }

            @Override
            public boolean isAccountNonLocked() {
                return true;
            }

            @Override
            public boolean isCredentialsNonExpired() {
                return true;
            }

            @Override
            public boolean isEnabled() {
                return true;
            }
        };
    }
}