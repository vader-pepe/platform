package org.ikapiar.db.models;

public enum Gender {
    MALE("Male"),
    FEMALE("Female");

    public final String label;

    Gender(final String label) {this.label = label;}
}
