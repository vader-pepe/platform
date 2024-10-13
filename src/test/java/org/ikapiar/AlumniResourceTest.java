package org.ikapiar;

import io.quarkus.test.junit.QuarkusTest;
import io.restassured.RestAssured;
import org.hamcrest.CoreMatchers;
import org.ikapiar.db.models.Alumni;
import org.ikapiar.db.models.Gender;
import org.junit.jupiter.api.Test;
import jakarta.ws.rs.core.MediaType;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.Collections;
import java.util.Random;
import java.util.UUID;

import static io.restassured.RestAssured.given;
import static org.hamcrest.Matchers.*;

@QuarkusTest
public class AlumniResourceTest {

    @Test
    public void testGetAllAlumni() {
        given()
                .when().get("/alumni")
                .then()
                .statusCode(200)
                .body("$.size()", is(greaterThan(0)));
    }

    @Test
    public void testGetAlumniById() {
        given()
                .when().get("/alumni/1")
                .then()
                .statusCode(200)
                .body("id", equalTo(1));
    }

    @Test
    public void testCreateAlumni() {
        Alumni alumni = generateFakeAlumni();

        given()
                .contentType(MediaType.APPLICATION_JSON)
                .body(alumni)
                .when().post("/alumni")
                .then()
                .statusCode(201)
                .body("lastName", equalTo("Doe"))
                .body("email", equalTo("john.doe@example.com"))
                .body("graduationYear", equalTo("2020"));
    }

    @Test
    public void testDeleteAlumni() {
        given()
                .when().delete("/alumni/1")
                .then()
                .statusCode(204);

        given()
                .when().get("/alumni/1")
                .then()
                .statusCode(404);
    }

    public static Alumni generateFakeAlumni() {
        var randomId = UUID.randomUUID().toString();
        Alumni alumni = new Alumni();
        alumni.firstName = String.format("John The %s", randomId);
        alumni.lastName = "Doe";
        alumni.email = String.format("john.doe@%s.com", randomId);
        alumni.phone = "123-456-7890";
        alumni.graduationYear = 2020;
        alumni.birthDate = LocalDate.of(1998, 1, 1);
        alumni.gender = Gender.MALE;
        alumni.createdAt = LocalDateTime.now();
        alumni.updatedAt = LocalDateTime.now();
        alumni.educations = Collections.emptyList();
        alumni.careers = Collections.emptyList();
        alumni.skills = Collections.emptyList();
        return alumni;
    }
}