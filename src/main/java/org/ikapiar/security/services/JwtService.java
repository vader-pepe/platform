package org.ikapiar.security.services;

import io.smallrye.jwt.build.Jwt;
import jakarta.enterprise.context.ApplicationScoped;
import org.ikapiar.security.models.Pengguna;

import java.time.Instant;
import java.util.Arrays;
import java.util.Set;
import java.util.stream.Collectors;

@ApplicationScoped
public class JwtService {
    private static final long EXPIRATION_TIME = 86400; // 24 hours

    public String generateToken(Pengguna pengguna) {
        Set<String> peranan = Arrays
                .stream(pengguna.getPeranan().split(","))
                .collect(Collectors.toSet());

        Instant now  = Instant.now();

        return Jwt.issuer("ikapiar-digital")
                .subject(pengguna.getUsername())
                .claim("email", pengguna.getEmail())
                .claim("peranan", pengguna.getPeranan())
                .issuedAt(now)
                .expiresAt(now.plusSeconds(EXPIRATION_TIME))
                .sign();
    }
}
