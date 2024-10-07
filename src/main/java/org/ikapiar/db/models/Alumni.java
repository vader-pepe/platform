package org.ikapiar.db.models;

import io.quarkus.hibernate.orm.panache.PanacheEntity;
import jakarta.persistence.*;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotNull;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

@Entity
public class Alumni extends PanacheEntity {
    @NotNull
    @Column(nullable = false)
    public String firstName;

    @NotNull
    @Column(nullable = false)
    public String lastName;

    @NotNull
    @Email
    @Column(nullable = false, unique = true)
    public String email;

    public String phone;

    @NotNull
    @Column(nullable = false)
    public int graduationYear;
    public LocalDate birthDate;

    @Enumerated(EnumType.STRING)
    public Gender gender;

    @NotNull
    @Column(nullable = false)
    public LocalDateTime createdAt;

    @NotNull
    @Column(nullable = false)
    public LocalDateTime updatedAt;

    @OneToMany(mappedBy = "alumni", cascade = CascadeType.ALL, orphanRemoval = true)
    public List<Education> educations;

    @OneToMany(mappedBy = "alumni", cascade = CascadeType.ALL, orphanRemoval = true)
    public List<Career> careers;

    @ManyToMany
    @JoinTable(
            name = "alumni_skills",
            joinColumns = @JoinColumn(name = "alumni_id"),
            inverseJoinColumns = @JoinColumn(name = "skill_id")
    )
    public List<Skill> skills;
}

