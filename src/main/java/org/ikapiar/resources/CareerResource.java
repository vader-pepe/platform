package org.ikapiar.resources;

import io.quarkus.hibernate.orm.rest.data.panache.PanacheEntityResource;
import io.quarkus.rest.data.panache.ResourceProperties;
import org.ikapiar.db.models.Career;

@ResourceProperties(path = "api/v1/career")
public interface CareerResource extends PanacheEntityResource<Career, Long> {
}
