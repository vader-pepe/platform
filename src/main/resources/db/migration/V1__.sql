CREATE SEQUENCE IF NOT EXISTS Alumni_seq START WITH 1 INCREMENT BY 50;

CREATE SEQUENCE IF NOT EXISTS Career_seq START WITH 1 INCREMENT BY 50;

CREATE SEQUENCE IF NOT EXISTS Education_seq START WITH 1 INCREMENT BY 50;

CREATE SEQUENCE IF NOT EXISTS MyEntity_seq START WITH 1 INCREMENT BY 50;

CREATE SEQUENCE IF NOT EXISTS Skill_seq START WITH 1 INCREMENT BY 50;

CREATE TABLE Alumni
(
    id             BIGINT       NOT NULL,
    firstName      VARCHAR(255) NOT NULL,
    lastName       VARCHAR(255) NOT NULL,
    email          VARCHAR(255) NOT NULL,
    phone          VARCHAR(255),
    graduationYear INTEGER      NOT NULL,
    birthDate      date,
    gender         VARCHAR(255),
    createdAt      TIMESTAMP WITHOUT TIME ZONE NOT NULL,
    updatedAt      TIMESTAMP WITHOUT TIME ZONE NOT NULL,
    CONSTRAINT pk_alumni PRIMARY KEY (id)
);

CREATE TABLE Career
(
    id          BIGINT       NOT NULL,
    alumni_id   BIGINT       NOT NULL,
    companyName VARCHAR(255) NOT NULL,
    jobTitle    VARCHAR(255) NOT NULL,
    industry    VARCHAR(255),
    description TEXT,
    startDate   date         NOT NULL,
    endDate     date,
    isCurrent   BOOLEAN      NOT NULL,
    CONSTRAINT pk_career PRIMARY KEY (id)
);

CREATE TABLE Education
(
    id              BIGINT NOT NULL,
    alumni_id       BIGINT,
    institutionName VARCHAR(255),
    degreeShort     VARCHAR(255),
    degreeLong      VARCHAR(255),
    fieldOfStudy    VARCHAR(255),
    startDate       date,
    endDate         date,
    CONSTRAINT pk_education PRIMARY KEY (id)
);

CREATE TABLE MyEntity
(
    id    BIGINT NOT NULL,
    field VARCHAR(255),
    CONSTRAINT pk_myentity PRIMARY KEY (id)
);

CREATE TABLE Skill
(
    id   BIGINT       NOT NULL,
    name VARCHAR(255) NOT NULL,
    CONSTRAINT pk_skill PRIMARY KEY (id)
);

CREATE TABLE alumni_skills
(
    alumni_id BIGINT NOT NULL,
    skill_id  BIGINT NOT NULL
);

CREATE TABLE career_skills
(
    career_id BIGINT NOT NULL,
    skill_id  BIGINT NOT NULL
);

ALTER TABLE Alumni
    ADD CONSTRAINT uc_alumni_email UNIQUE (email);

ALTER TABLE Skill
    ADD CONSTRAINT uc_skill_name UNIQUE (name);

ALTER TABLE Career
    ADD CONSTRAINT FK_CAREER_ON_ALUMNI FOREIGN KEY (alumni_id) REFERENCES Alumni (id);

ALTER TABLE Education
    ADD CONSTRAINT FK_EDUCATION_ON_ALUMNI FOREIGN KEY (alumni_id) REFERENCES Alumni (id);

ALTER TABLE alumni_skills
    ADD CONSTRAINT fk_aluski_on_alumni FOREIGN KEY (alumni_id) REFERENCES Alumni (id);

ALTER TABLE alumni_skills
    ADD CONSTRAINT fk_aluski_on_skill FOREIGN KEY (skill_id) REFERENCES Skill (id);

ALTER TABLE career_skills
    ADD CONSTRAINT fk_carski_on_career FOREIGN KEY (career_id) REFERENCES Career (id);

ALTER TABLE career_skills
    ADD CONSTRAINT fk_carski_on_skill FOREIGN KEY (skill_id) REFERENCES Skill (id);