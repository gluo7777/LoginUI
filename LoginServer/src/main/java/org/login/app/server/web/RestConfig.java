package org.login.app.server.web;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.rest.core.config.RepositoryRestConfiguration;
import org.springframework.data.rest.webmvc.config.RepositoryRestConfigurer;
import org.springframework.stereotype.Component;

@Component
public class RestConfig implements RepositoryRestConfigurer {

    @Value("${spring.data.rest.base-path:/api}")
    private String BASE_PATH;

    @Override
    public void configureRepositoryRestConfiguration(RepositoryRestConfiguration config) {
        config.setBasePath(BASE_PATH).setDefaultPageSize(10).setMaxPageSize(100);
    }
}
