package org.login.app.server.security;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.condition.ConditionalOnMissingBean;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.AuthenticationEntryPoint;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;
import org.springframework.security.web.authentication.SimpleUrlAuthenticationFailureHandler;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import javax.servlet.http.HttpServletResponse;
import javax.sql.DataSource;
import java.util.Arrays;

@ConditionalOnMissingBean(LocalSecurityConfig.class)
@Configuration
@EnableWebSecurity
public class SecurityConfig extends WebSecurityConfigurerAdapter {

    public static final String APP = "/app";
    public static final String API = "/api";
    public static final String LOGIN_URL = APP + "/login";
    public static final String LOGOUT_URL = APP + "/logout";
    public static final String API_ROLE = "USER";

    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http.cors().configurationSource(corsConfigurationSource())
                .and().csrf().disable()
                .authorizeRequests().antMatchers(HttpMethod.POST, LOGIN_URL).permitAll()
                .and().authorizeRequests().antMatchers(LOGOUT_URL).authenticated()
                .and().exceptionHandling().authenticationEntryPoint(restAuthenticationEntryPoint())
            .and().authorizeRequests().antMatchers(API + "/**").hasRole(API_ROLE)
                .and().authorizeRequests().anyRequest().authenticated()
            .and().formLogin()
                .loginProcessingUrl(LOGIN_URL)
                .successHandler(restSavedRequestAwareAuthenticationSuccessHandler())
                .failureHandler(new SimpleUrlAuthenticationFailureHandler())
            .and().logout().logoutUrl(LOGOUT_URL)
                .logoutSuccessHandler((request, response, authentication) -> {
                    if (response.isCommitted()) return;
                    else if (authentication != null && authentication.isAuthenticated()) response.setStatus(HttpServletResponse.SC_OK);
                    else response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
                })
                .invalidateHttpSession(true)
        ;
    }

    @Autowired
    private DataSource dataSource;

    @Override
    protected void configure(AuthenticationManagerBuilder auth) throws Exception {
        auth.jdbcAuthentication().dataSource(dataSource)
            .usersByUsernameQuery("SELECT username,password,enabled FROM security.users WHERE username = ?")
            .authoritiesByUsernameQuery("SELECT authority FROM security.users a JOIN security.authorities b ON a.id = b.user_id AND a.username = ?");
    }


    @Bean
    public AuthenticationSuccessHandler restSavedRequestAwareAuthenticationSuccessHandler(){
        return new RestAuthenticationSuccessHandler();
    }


    // override default redirect to login page
    @Bean
    public AuthenticationEntryPoint restAuthenticationEntryPoint() {
        return (request, response, authException) -> {
            response.sendError(HttpServletResponse.SC_UNAUTHORIZED, "Unauthorized");
        };
    }

    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration configuration = new CorsConfiguration();
        configuration.setAllowedOrigins(Arrays.asList("http://frontend.login.com:3000"));
        configuration.setAllowedMethods(Arrays.asList("GET","POST","DELETE","PUT"));
        configuration.setAllowedHeaders(Arrays.asList("*"));
        configuration.setAllowCredentials(true);
        configuration.setExposedHeaders(Arrays.asList("Set-Cookie"));
        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration(API + "/**", configuration);
        source.registerCorsConfiguration(APP + "/**", configuration);
        return source;
    }

    @Bean
    public PasswordEncoder encoder() {
        return new BCryptPasswordEncoder();
    }
}