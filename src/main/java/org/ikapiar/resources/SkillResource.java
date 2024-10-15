package org.ikapiar.resources;

import io.quarkus.hibernate.orm.rest.data.panache.PanacheEntityResource;
import org.ikapiar.db.models.Skill;

public interface SkillResource extends PanacheEntityResource<Skill, Long> {
}
