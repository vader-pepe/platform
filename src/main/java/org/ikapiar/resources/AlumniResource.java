package org.ikapiar.resources;

import io.quarkus.hibernate.orm.rest.data.panache.PanacheEntityResource;
import org.ikapiar.db.models.Alumni;

public interface AlumniResource extends PanacheEntityResource<Alumni, Long> {
}
