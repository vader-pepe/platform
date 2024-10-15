package org.ikapiar.resources;

import io.quarkus.test.junit.QuarkusTest;
import jakarta.transaction.Transactional;
import org.ikapiar.db.models.Education;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import jakarta.ws.rs.core.MediaType;

import java.util.UUID;

import static io.quarkus.hibernate.orm.panache.PanacheEntityBase.deleteAll;
import static io.restassured.RestAssured.given;
import static org.hamcrest.Matchers.*;
import static org.ikapiar.resources.Generators.*;
import static org.ikapiar.resources.Generators.generateFakeEducation;
import static org.ikapiar.resources.Generators.saveEducation;

@QuarkusTest
public class EducationResourceTest {

    @BeforeEach
    void cleanup() {
        cleanAll();
    }

    @Test
    public void testCreateEducation() {
        var id = UUID.randomUUID().toString();
        Education education = generateFakeEducation(id);

        given()
                .contentType(MediaType.APPLICATION_JSON)
                .body(education)
                .when().post("/api/v1/education")
                .then()
                .statusCode(201)
                .body("degreeShort", equalTo(String.format("BSc %s", id)));
    }

    @Test
    public void testGetAllEducations() {
        saveEducation();
        given()
                .when().get("/api/v1/education")
                .then()
                .statusCode(200)
                .body("$.size()", is(1));
    }

    @Test
    public void testGetEducationById() {
        var education = saveEducation();

        var resp = given()
                .when().get("/api/v1/education/" + education.id);

        System.out.println(resp.body().toString());

        given()
                .when().get("/api/v1/education/" + education.id)
                .then()
                .statusCode(200)
                .body("id", equalTo(education.id.intValue()));
    }

    @Test
    public void testDeleteEducation() {
        var education = saveEducation();

        given()
                .when().delete("/api/v1/education/" + education.id)
                .then()
                .statusCode(204);

        given()
                .when().get("/api/v1/education/" + education.id)
                .then()
                .statusCode(404);
    }
}