package org.ikapiar.security.identityproviders;

public enum IdentityProviderSource {
    GOOGLE("GOOGLE"),
    LINKEDIN("LINKEDIN");

    public final String label;

    IdentityProviderSource(final String label) {this.label = label;}
}
