package org.login.app.server.security;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;
import org.springframework.web.servlet.view.InternalResourceViewResolver;

@EnableWebMvc
@Configuration
public class MvcConfig implements WebMvcConfigurer {

    private static final String REACT_BUILD = "/WEB-INF/view/react/build";
    private static final String PREVIEW = "/WEB-INF/view/preview/";

    @Override
    public void addResourceHandlers(ResourceHandlerRegistry registry) {
        registry.addResourceHandler("/*.js", "/*.json", "/*.ico", "/*.png", "/.jpeg", "/*.gif")
                .addResourceLocations(REACT_BUILD + "/");
        registry.addResourceHandler("/static/**").addResourceLocations(REACT_BUILD + "/static/");
        registry.addResourceHandler("/", "/index.html").addResourceLocations(REACT_BUILD + "/index.html");
        registry.addResourceHandler("/robots.txt").addResourceLocations(REACT_BUILD + "/robots.txt");
        registry.addResourceHandler("/view/preview/**").addResourceLocations(PREVIEW);
    }

    @Bean
    public InternalResourceViewResolver internalResourceViewResolver() {
        InternalResourceViewResolver internalResourceViewResolver = new InternalResourceViewResolver();
        internalResourceViewResolver.setPrefix("/view/preview/");
        internalResourceViewResolver.setSuffix(".html");
        return internalResourceViewResolver;
    }

}