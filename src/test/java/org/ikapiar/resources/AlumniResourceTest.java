package org.ikapiar.resources;

import io.quarkus.test.junit.QuarkusTest;
import jakarta.transaction.Transactional;
import org.ikapiar.db.models.Alumni;
import org.ikapiar.db.models.Gender;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import jakarta.ws.rs.core.MediaType;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.Collections;
import java.util.UUID;

import static io.restassured.RestAssured.given;
import static org.hamcrest.Matchers.*;
import static org.ikapiar.resources.Generators.*;

@QuarkusTest
public class AlumniResourceTest {

    @BeforeEach
    void cleanup() {
        cleanAll();
    }

    @Test
    public void testCreateAlumni() {
        var id = UUID.randomUUID().toString();
        Alumni alumni = generateFakeAlumni(id);

        given()
                .contentType(MediaType.APPLICATION_JSON)
                .body(alumni)
                .when().post("/api/v1/alumni")
                .then()
                .statusCode(201)
                .body("lastName", equalTo("Doe"))
                .body("email", equalTo(String.format("john.doe@%s.com", id)))
                .body("graduationYear", equalTo(2020));
    }

    @Test
    public void testGetAllAlumni() {
        saveAlumni();
        given()
                .when().get("/api/v1/alumni")
                .then()
                .statusCode(200)
                .body("$.size()", is(1));
    }

    @Test
    public void testGetAlumniById() {
        var alumni = saveAlumni();

        given()
                .when().get("/api/v1/alumni/" + alumni.id)
                .then()
                .statusCode(200)
                .body("id", equalTo(alumni.id.intValue()));
    }

    @Test
    public void testDeleteAlumni() {
        var alumni = saveAlumni();

        given()
                .when().delete("/api/v1/alumni/" + alumni.id)
                .then()
                .statusCode(204);

        given()
                .when().get("/api/v1/alumni/" + alumni.id)
                .then()
                .statusCode(404);
    }
}