package org.ikapiar.resources;

import io.quarkus.test.junit.QuarkusTest;
import org.junit.jupiter.api.BeforeEach;

import static org.ikapiar.resources.Generators.cleanAll;

@QuarkusTest
public class CareerResourceTest {

    @BeforeEach
    void cleanup() {
        cleanAll();
    }


}
