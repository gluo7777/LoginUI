package org.login.app.server.security;

public class Rules {
    public static final String HAS_PREFIX = "hasRole('";
    public static final String HAS_SUFFIX = "')";
    public static final String ROLE_USER = "ROLE_USER";
    public static final String ROLE_ADMIN = "ROLE_ADMIN ";
    public static final String HAS_ROLE_USER = HAS_PREFIX + ROLE_USER + HAS_SUFFIX;
    public static final String HAS_ROLE_ADMIN = HAS_PREFIX + ROLE_ADMIN + HAS_SUFFIX;
    public static final String RUN_AS_SUPER_USER = "RUN_AS_SUPER_USER";
    public static final String ROLE_ANONYMOUS = "ROLE_ANONYMOUS";
    public static final String ROLE_RUN_AS_SUPER_USER = "ROLE_" + RUN_AS_SUPER_USER;
    public static final String HAS_ROLE_RUN_AS_SUPER_USER = HAS_PREFIX + ROLE_RUN_AS_SUPER_USER + HAS_SUFFIX;
    public static final String OPTIONAL_USERNAME_IS_LOGGED_IN = "returnObject.orElse(null)?.username == authentication.principal.username";
    public static final String OR = " || ";
}
