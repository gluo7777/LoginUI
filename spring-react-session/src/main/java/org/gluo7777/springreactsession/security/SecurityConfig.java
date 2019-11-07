package org.gluo7777.springreactsession.security;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.AuthenticationEntryPoint;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;
import org.springframework.security.web.authentication.SavedRequestAwareAuthenticationSuccessHandler;
import org.springframework.security.web.authentication.SimpleUrlAuthenticationFailureHandler;
import org.springframework.security.web.authentication.logout.LogoutSuccessHandler;
import org.springframework.security.web.savedrequest.HttpSessionRequestCache;
import org.springframework.security.web.savedrequest.RequestCache;
import org.springframework.security.web.savedrequest.SavedRequest;
import org.springframework.util.StringUtils;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.Arrays;
import java.util.Collection;

@Configuration
@EnableWebSecurity
public class SecurityConfig extends WebSecurityConfigurerAdapter {

    private static final String[] GET_WHITELIST = {"/", "/index.html", "/static/**", "/*.js", "/*.json", "/*.ico", "/preview/login-page"};

    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http.cors().configurationSource(corsConfigurationSource())
                .and().csrf().disable().authorizeRequests().antMatchers(HttpMethod.GET, GET_WHITELIST).permitAll()
                .and().authorizeRequests().antMatchers(HttpMethod.POST, "/api/login").permitAll()
                .and().authorizeRequests().antMatchers("/api/logout").authenticated()
                .and().exceptionHandling().authenticationEntryPoint(restAuthenticationEntryPoint())
            .and().authorizeRequests().antMatchers("/secure/**").hasRole("USER")
                .and().authorizeRequests().anyRequest().authenticated()
            .and().formLogin()
                .loginProcessingUrl("/api/login")
                .successHandler(restSavedRequestAwareAuthenticationSuccessHandler())
                .failureHandler(new SimpleUrlAuthenticationFailureHandler())
            .and().logout().logoutUrl("/api/logout")
                .logoutSuccessHandler((request, response, authentication) -> {
                    if (response.isCommitted()) return;
                    else if (authentication != null && authentication.isAuthenticated()) response.setStatus(HttpServletResponse.SC_OK);
                    else response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
                })
                .invalidateHttpSession(true)
        ;

    }

    @Bean
    AuthenticationSuccessHandler restSavedRequestAwareAuthenticationSuccessHandler(){
        return new SavedRequestAwareAuthenticationSuccessHandler(){
            private RequestCache requestCache = new HttpSessionRequestCache();
            @Override
            public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response, Authentication authentication) throws ServletException, IOException {
                SavedRequest savedRequest = requestCache.getRequest(request, response);
                if (savedRequest == null) {
                    clearAuthenticationAttributes(request);
                    return;
                }
                String targetUrlParameter = getTargetUrlParameter();
                if (isAlwaysUseDefaultTargetUrl()
                        || (targetUrlParameter != null && StringUtils.hasText(request
                        .getParameter(targetUrlParameter)))) {
                    requestCache.removeRequest(request, response);
                    clearAuthenticationAttributes(request);
                    return;
                }
                clearAuthenticationAttributes(request);
            }
        };
    }


    // override default redirect to login page
    @Bean
    AuthenticationEntryPoint restAuthenticationEntryPoint() {
        return (request, response, authException) -> {
            response.sendError(HttpServletResponse.SC_UNAUTHORIZED, "Unauthorized");
        };
    }

    @Bean
    CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration configuration = new CorsConfiguration();
        configuration.setAllowedOrigins(Arrays.asList("http://frontend.login.com:3000"));
        configuration.setAllowedMethods(Arrays.asList("GET","POST","DELETE","PUT"));
        configuration.setAllowedHeaders(Arrays.asList("*"));
        configuration.setAllowCredentials(true);
        configuration.setExposedHeaders(Arrays.asList("Set-Cookie"));
        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/api/**", configuration);
        return source;
    }

    @Override
    protected void configure(AuthenticationManagerBuilder auth) throws Exception {
        auth.inMemoryAuthentication().withUser("user1").password(encoder().encode("user1Pass")).roles("USER").and()
                .withUser("user2").password(encoder().encode("user2Pass")).roles("USER").and().withUser("admin")
                .password(encoder().encode("admin0Pass")).roles("ADMIN");
    }

    @Bean
    public PasswordEncoder encoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public UserDetailsService userDetailsService() {
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
                return encoder().encode("user1Pass");
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