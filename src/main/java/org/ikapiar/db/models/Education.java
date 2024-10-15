package org.ikapiar.db.models;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIncludeProperties;
import io.quarkus.hibernate.orm.panache.PanacheEntity;
import jakarta.persistence.Entity;
import jakarta.persistence.ManyToOne;

import java.time.LocalDate;

@Entity
public class Education extends PanacheEntity {
    @ManyToOne
    @JsonIncludeProperties("id")
    public Alumni alumni;
    public String institutionName;
    public String degreeShort;
    public String degreeLong;
    public String fieldOfStudy;
    public LocalDate startDate;
    public LocalDate endDate;
}
