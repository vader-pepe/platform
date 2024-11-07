package org.ikapiar.security.services;

import jakarta.ws.rs.core.NewCookie;

public class CookieGenerator {
    public static NewCookie generateCookie(
            String name,
            String value,
            String path,
            int maxAgeSeconds,
            boolean isHttpOnly,
            boolean isSecure,
            NewCookie.SameSite sameSitePolicy
    ) {
        return new NewCookie.Builder(name)
                .value(value)
                .path(path)
                .maxAge(maxAgeSeconds)
                .sameSite(sameSitePolicy)
                .httpOnly(isHttpOnly)
                .secure(isSecure)
                .build();
    }

    public static NewCookie generateSecureCookie(
            String name,
            String value
    ) {
        return generateCookie(
                name,
                value,
                "/",
                86400,
                true,
                true,
                NewCookie.SameSite.STRICT
        );
    }
}
