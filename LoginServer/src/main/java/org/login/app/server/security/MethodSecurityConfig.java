package org.login.app.server.security;

import org.springframework.context.annotation.Configuration;
import org.springframework.security.access.intercept.RunAsManager;
import org.springframework.security.access.intercept.RunAsManagerImpl;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.method.configuration.GlobalMethodSecurityConfiguration;

@Configuration
@EnableGlobalMethodSecurity(prePostEnabled = true, securedEnabled = true)
public class MethodSecurityConfig extends GlobalMethodSecurityConfiguration {

    public static final String SUPER_USER = "superUser";

    @Override
    protected RunAsManager runAsManager() {
        RunAsManagerImpl runAsManager = new RunAsManagerImpl();
        runAsManager.setKey(SUPER_USER);
        return runAsManager;
    }
}
