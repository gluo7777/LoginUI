package org.login.app.server.security;

import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.stereotype.Component;

import lombok.Getter;
import lombok.Setter;

/**
 * Endpoints
 */
@Getter
@Setter
@Component
@ConfigurationProperties(prefix = "endpoints")
public class Endpoints {
    private String app = "/app";
    private String api = "/api";
    private String login = this.app + "/login";
    private String logout = this.app + "/logout";
    private String[] getWhiteList;
    private String[] postWhiteList;
}