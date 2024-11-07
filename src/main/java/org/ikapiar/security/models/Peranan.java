package org.ikapiar.security.models;

import org.ikapiar.security.errors.InvalidPeran;

import java.util.Arrays;
import java.util.List;

public class Peranan {
    public static final String ALUMNI = "alumni";
    public static final String ADMIN = "admin";
    public static final String SUPER_ADMIN = "super_admin";
    public static final String EVERYONE = "everyone";

    public static final List<String> PerananList = List.of(ALUMNI, ADMIN, SUPER_ADMIN, EVERYONE);

    public static final String PerananCommaSeparated = String.join(",", PerananList);

    public static String build(String ...peran) {
        for (String p : peran) {
            if (!PerananList.contains(p)) {
                throw new InvalidPeran(String.format("Expected one of: %s . Got %s", PerananCommaSeparated, p));
            }
        }
        return String.join(",", peran);
    }
}
