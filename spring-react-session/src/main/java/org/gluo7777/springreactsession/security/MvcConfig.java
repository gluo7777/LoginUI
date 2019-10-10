package org.gluo7777.springreactsession.security;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@EnableWebMvc
@Configuration
public class MvcConfig implements WebMvcConfigurer {

    private static final String REACT_BUILD = "/WEB-INF/view/react/build";

    @Override
    public void addResourceHandlers(ResourceHandlerRegistry registry) {
        registry.addResourceHandler("/*.js", "/*.json", "/*.ico", "/*.png", "/.jpeg", "/*.gif")
                .addResourceLocations(REACT_BUILD + "/");
        registry.addResourceHandler("/static/**").addResourceLocations(REACT_BUILD + "/static/");
        registry.addResourceHandler("/", "/index.html").addResourceLocations(REACT_BUILD + "/index.html");
        registry.addResourceHandler("/robots.txt").addResourceLocations(REACT_BUILD + "/robots.txt");
    }

}