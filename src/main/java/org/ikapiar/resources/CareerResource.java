package org.ikapiar.resources;

import io.quarkus.hibernate.orm.rest.data.panache.PanacheEntityResource;
import org.ikapiar.db.models.Career;

public interface CareerResource extends PanacheEntityResource<Career, Long> {
}
