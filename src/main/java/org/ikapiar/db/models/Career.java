package org.ikapiar.db.models;

import com.fasterxml.jackson.annotation.JsonIncludeProperties;
import io.quarkus.hibernate.orm.panache.PanacheEntity;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;

import java.time.LocalDate;
import java.util.List;

@Entity
public class Career extends PanacheEntity {
    @NotNull
    @ManyToOne(optional = false)
    @JsonIncludeProperties("id")
    public Alumni alumni;

    @NotNull
    @Column(nullable = false)
    public String companyName;

    @NotNull
    @Column(nullable = false)
    public String jobTitle;

    public String industry;

    @Column(columnDefinition = "TEXT")
    public String description;

    @NotNull
    @Column(nullable = false)
    public LocalDate startDate;
    public LocalDate endDate;

    @NotNull
    @Column(nullable = false)
    public boolean isCurrent;

    @ManyToMany
    @JoinTable(
            name = "career_skills",
            joinColumns = @JoinColumn(name = "career_id"),
            inverseJoinColumns = @JoinColumn(name = "skill_id")
    )
    public List<Skill> relevantSkills;
}
