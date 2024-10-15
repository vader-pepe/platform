package org.ikapiar.resources;

import io.quarkus.hibernate.orm.panache.PanacheEntity;
import io.quarkus.hibernate.orm.panache.PanacheEntityBase;
import jakarta.transaction.Transactional;
import org.ikapiar.db.models.*;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.Collections;
import java.util.UUID;

public class Generators {

    @Transactional
    public static void cleanAll() {
        Alumni.findAll().stream().forEach(PanacheEntityBase::delete);
        Education.findAll().stream().forEach(PanacheEntityBase::delete);
        Skill.findAll().stream().forEach(PanacheEntityBase::delete);
        Career.findAll().stream().forEach(PanacheEntityBase::delete);
    }

    @Transactional
    public static Alumni saveAlumni() {
        Alumni alumni = generateFakeAlumni();
        alumni.persist();
        return alumni;
    }

    public static Alumni generateFakeAlumni() {
        return generateFakeAlumni(UUID.randomUUID().toString());
    }

    public static Alumni generateFakeAlumni(String uniqueIdentifier) {
        Alumni alumni = new Alumni();
        alumni.firstName = String.format("John The %s", uniqueIdentifier);
        alumni.lastName = "Doe";
        alumni.email = String.format("john.doe@%s.com", uniqueIdentifier);
        alumni.phone = "123-456-7890";
        alumni.graduationYear = 2020;
        alumni.birthDate = LocalDate.of(1998, 1, 1);
        alumni.gender = Gender.MALE;
        alumni.createdAt = LocalDateTime.now();
        alumni.updatedAt = LocalDateTime.now();
        alumni.educations = Collections.emptyList();
        alumni.careers = Collections.emptyList();
        alumni.skills = Collections.emptyList();
        return alumni;
    }

    @Transactional
    public static Education saveEducation() {
        Education education = generateFakeEducation();
        education.persist();
        return education;
    }

    public static Education generateFakeEducation() {
        return generateFakeEducation(UUID.randomUUID().toString());
    }

    public static Education generateFakeEducation(String uniqueIdentifier) {
        Education education = new Education();
        education.alumni = saveAlumni();
        education.institutionName = "University of Example";
        education.degreeShort = String.format("BSc %s", uniqueIdentifier);
        education.degreeLong = String.format("Bachelor of Science %s", uniqueIdentifier);
        education.fieldOfStudy = "Computer Science";
        education.startDate = LocalDate.of(2015, 9, 1);
        education.endDate = LocalDate.of(2019, 6, 30);
        return education;
    }

    @Transactional
    public static Skill saveSkill() {
        Skill skill = generateFakeSkill();
        skill.persist();
        return skill;
    }

    public static Skill generateFakeSkill() {
        return generateFakeSkill(UUID.randomUUID().toString());
    }

    public static Skill generateFakeSkill(String uniqueIdentifier) {
        Skill skill = new Skill();
        skill.name = String.format("Skill %s", uniqueIdentifier);
        return skill;
    }
}
