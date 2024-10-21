package org.ikapiar.resources;

import io.quarkus.hibernate.orm.rest.data.panache.PanacheEntityResource;
import io.quarkus.rest.data.panache.ResourceProperties;
import org.ikapiar.db.models.Education;

@ResourceProperties(path = "api/v1/education")
public interface EducationResource extends PanacheEntityResource<Education, Long> {
}
