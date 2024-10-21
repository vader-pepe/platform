package org.ikapiar.resources;

import io.quarkus.hibernate.orm.rest.data.panache.PanacheEntityResource;
import io.quarkus.rest.data.panache.ResourceProperties;
import org.ikapiar.db.models.Skill;

@ResourceProperties(path = "api/v1/skill")
public interface SkillResource extends PanacheEntityResource<Skill, Long> {
}
