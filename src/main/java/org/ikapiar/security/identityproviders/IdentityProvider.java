package org.ikapiar.security.identityproviders;

public interface IdentityProvider {
    FoundIdentity validateToken(String token);
    public static record FoundIdentity(String userEmail, String identityToken) {}
}
