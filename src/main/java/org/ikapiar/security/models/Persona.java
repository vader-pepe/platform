package org.ikapiar.security.models;

import com.fasterxml.jackson.annotation.JsonIncludeProperties;
import io.quarkus.hibernate.orm.panache.PanacheEntity;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.ManyToOne;
import org.ikapiar.security.identityproviders.IdentityProviderSource;

@Entity
public class Persona extends PanacheEntity {
    @ManyToOne
    @JsonIncludeProperties("id")
    Pengguna pengguna;

    String identityToken;

    @Enumerated(EnumType.STRING)
    IdentityProviderSource source;
}
