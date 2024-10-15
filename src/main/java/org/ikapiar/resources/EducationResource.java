package org.ikapiar.resources;

import io.quarkus.hibernate.orm.rest.data.panache.PanacheEntityResource;
import org.ikapiar.db.models.Education;

public interface EducationResource extends PanacheEntityResource<Education, Long> {
}
