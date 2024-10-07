package org.ikapiar.db.models;

import io.quarkus.hibernate.orm.panache.PanacheEntity;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.ManyToMany;
import jakarta.validation.constraints.NotNull;

import java.util.List;

@Entity
public class Skill extends PanacheEntity {
    @NotNull
    @Column(unique = true, nullable = false)
    public String name;

    @ManyToMany(mappedBy = "skills")
    public List<Alumni> alumni;

    @ManyToMany(mappedBy = "relevantSkills")
    public List<Career> careers;

}
