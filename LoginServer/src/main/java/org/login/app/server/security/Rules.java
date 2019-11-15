package org.login.app.server.security;

public class Rules {
    public static final String ROLE_USER = "ROLE_USER";
    public static final String ROLE_ADMIN = "ROLE_ADMIN ";
    public static final String HAS_ROLE_USER = "hasRole('" + ROLE_USER + "')";
    public static final String HAS_ROLE_ADMIN = "hasRole('" + ROLE_ADMIN + "')";
    public static final String RUN_AS_SUPER_USER = "RUN_AS_SUPER_USER";
    public static final String ROLE_ANONYMOUS = "ROLE_ANONYMOUS";
    public static final String ROLE_RUN_AS_SUPER_USER = "ROLE_" + RUN_AS_SUPER_USER;
}
