CREATE TABLE Alumni
(
    id             BIGINT       NOT NULL,
    firstName      VARCHAR(255) NOT NULL,
    lastName       VARCHAR(255) NOT NULL,
    email          VARCHAR(255) NOT NULL,
    phone          VARCHAR(255) NULL,
    generation     INT          NOT NULL,
    graduationYear INT          NOT NULL,
    birthDate      date         NOT NULL,
    gender         VARCHAR(255) NULL,
    createdAt      datetime     NOT NULL,
    updatedAt      datetime     NOT NULL,
    CONSTRAINT pk_alumni PRIMARY KEY (id)
);

CREATE TABLE Career
(
    id            BIGINT       NOT NULL,
    alumni_id     BIGINT       NOT NULL,
    companyName   VARCHAR(255) NOT NULL,
    jobTitle      VARCHAR(255) NOT NULL,
    industry      VARCHAR(255) NULL,
    `description` TEXT NULL,
    startDate     date         NOT NULL,
    endDate       date NULL,
    isCurrent     BIT(1)       NOT NULL,
    CONSTRAINT pk_career PRIMARY KEY (id)
);

CREATE TABLE Education
(
    id              BIGINT NOT NULL,
    alumni_id       BIGINT NULL,
    institutionName VARCHAR(255) NULL,
    degreeShort     VARCHAR(255) NULL,
    degreeLong      VARCHAR(255) NULL,
    fieldOfStudy    VARCHAR(255) NULL,
    startDate       date NULL,
    endDate         date NULL,
    CONSTRAINT pk_education PRIMARY KEY (id)
);

CREATE TABLE Pengguna
(
    id       BIGINT       NOT NULL,
    username VARCHAR(255) NULL,
    password VARCHAR(255) NULL,
    peranan  VARCHAR(255) NULL,
    email    VARCHAR(255) NOT NULL,
    CONSTRAINT pk_pengguna PRIMARY KEY (id)
);

CREATE TABLE Persona
(
    id            BIGINT NOT NULL,
    pengguna_id   BIGINT NULL,
    identityToken VARCHAR(255) NULL,
    source        VARCHAR(255) NULL,
    CONSTRAINT pk_persona PRIMARY KEY (id)
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

ALTER TABLE Persona
    ADD CONSTRAINT FK_PERSONA_ON_PENGGUNA FOREIGN KEY (pengguna_id) REFERENCES Pengguna (id);

ALTER TABLE alumni_skills
    ADD CONSTRAINT fk_aluski_on_alumni FOREIGN KEY (alumni_id) REFERENCES Alumni (id);

ALTER TABLE alumni_skills
    ADD CONSTRAINT fk_aluski_on_skill FOREIGN KEY (skill_id) REFERENCES Skill (id);

ALTER TABLE career_skills
    ADD CONSTRAINT fk_carski_on_career FOREIGN KEY (career_id) REFERENCES Career (id);

ALTER TABLE career_skills
    ADD CONSTRAINT fk_carski_on_skill FOREIGN KEY (skill_id) REFERENCES Skill (id);