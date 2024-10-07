package org.ikapiar.db.models;

import io.quarkus.hibernate.orm.panache.PanacheEntity;
import jakarta.persistence.Entity;
import jakarta.persistence.ManyToOne;

import java.time.LocalDate;

@Entity
public class Education extends PanacheEntity {
    @ManyToOne
    public Alumni alumni;
    public String institutionName;
    public String degreeShort;
    public String degreeLong;
    public String fieldOfStudy;
    public LocalDate startDate;
    public LocalDate endDate;
}
