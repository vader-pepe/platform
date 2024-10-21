package org.ikapiar.resources;

import io.quarkus.hibernate.orm.rest.data.panache.PanacheEntityResource;
import io.quarkus.rest.data.panache.ResourceProperties;
import org.ikapiar.db.models.Alumni;

@ResourceProperties(path = "api/v1/alumni")
public interface AlumniResource extends PanacheEntityResource<Alumni, Long> {
}
