package org.ikapiar.resources;

import io.quarkus.test.junit.QuarkusTest;
import io.restassured.RestAssured;
import jakarta.transaction.Transactional;
import org.ikapiar.db.models.Skill;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import jakarta.ws.rs.core.MediaType;

import java.util.UUID;

import static io.restassured.RestAssured.given;
import static org.hamcrest.Matchers.*;
import static org.ikapiar.resources.Generators.generateFakeSkill;
import static org.ikapiar.resources.Generators.saveSkill;

@QuarkusTest
public class SkillResourceTest {

    @BeforeEach
    void cleanup() {
        Generators.cleanAll();
    }


    @Test
    public void testCreateSkill() {
        var id = UUID.randomUUID().toString();
        Skill skill = generateFakeSkill(id);

        given()
                .contentType(MediaType.APPLICATION_JSON)
                .body(skill)
                .when().post("/api/v1/skill")
                .then()
                .statusCode(201)
                .body("name", equalTo(String.format("Skill %s", id)));
    }

    @Test
    public void testGetAllSkills() {
        saveSkill();
        given()
                .when().get("/api/v1/skill")
                .then()
                .statusCode(200)
                .body("$.size()", is(1));
    }

    @Test
    public void testGetSkillById() {
        var skill = saveSkill();

        given()
                .when().get("/api/v1/skill/" + skill.id)
                .then()
                .statusCode(200)
                .body("id", equalTo(skill.id.intValue()));
    }

    @Test
    public void testDeleteSkill() {
        var skill = saveSkill();

        var resp = given().when().get("/skill");

        given()
                .when().delete("/api/v1/skill/" + skill.id)
                .then()
                .statusCode(204);

        given()
                .when().get("/api/v1/skill/" + skill.id)
                .then()
                .statusCode(404);
    }
}