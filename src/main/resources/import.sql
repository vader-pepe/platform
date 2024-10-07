-- Seeder for Alumni
INSERT INTO Alumni (id, firstName, lastName, email, phone, graduationYear, birthDate, gender, createdAt, updatedAt)
VALUES
    (1, 'John', 'Doe', 'john.doe@example.com', '1234567890', 2020, '1998-01-01', 'Male', NOW(), NOW()),
    (2, 'Jane', 'Smith', 'jane.smith@example.com', NULL, 2019, '1997-02-02', 'Female', NOW(), NOW()),
    (3, 'Alice', 'Johnson', 'alice.johnson@example.com', '2345678901', 2018, '1996-03-03', 'Female', NOW(), NOW()),
    (4, 'Bob', 'Brown', 'bob.brown@example.com', '3456789012', 2017, '1995-04-04', 'Male', NOW(), NOW()),
    (5, 'Charlie', 'Davis', 'charlie.davis@example.com', NULL, 2016, '1994-05-05', 'Male', NOW(), NOW()),
    (6, 'Diana', 'Miller', 'diana.miller@example.com', '4567890123', 2015, '1993-06-06', 'Female', NOW(), NOW()),
    (7, 'Eve', 'Wilson', 'eve.wilson@example.com', '5678901234', 2014, '1992-07-07', 'Female', NOW(), NOW()),
    (8, 'Frank', 'Moore', 'frank.moore@example.com', NULL, 2013, '1991-08-08', 'Male', NOW(), NOW()),
    (9, 'Grace', 'Taylor', 'grace.taylor@example.com', '6789012345', 2012, '1990-09-09', 'Female', NOW(), NOW()),
    (10, 'Hank', 'Anderson', 'hank.anderson@example.com', '7890123456', 2011, '1989-10-10', 'Male', NOW(), NOW()),
    (11, 'Ivy', 'Thomas', 'ivy.thomas@example.com', NULL, 2010, '1988-11-11', 'Female', NOW(), NOW()),
    (12, 'Jack', 'Jackson', 'jack.jackson@example.com', '8901234567', 2009, '1987-12-12', 'Male', NOW(), NOW()),
    (13, 'Karen', 'White', 'karen.white@example.com', '9012345678', 2008, '1986-01-13', 'Female', NOW(), NOW()),
    (14, 'Leo', 'Harris', 'leo.harris@example.com', NULL, 2007, '1985-02-14', 'Male', NOW(), NOW()),
    (15, 'Mia', 'Martin', 'mia.martin@example.com', '0123456789', 2006, '1984-03-15', 'Female', NOW(), NOW()),
    (16, 'Nina', 'Thompson', 'nina.thompson@example.com', '1234567890', 2005, '1983-04-16', 'Female', NOW(), NOW()),
    (17, 'Oscar', 'Garcia', 'oscar.garcia@example.com', NULL, 2004, '1982-05-17', 'Male', NOW(), NOW()),
    (18, 'Paul', 'Martinez', 'paul.martinez@example.com', '2345678901', 2003, '1981-06-18', 'Male', NOW(), NOW()),
    (19, 'Quinn', 'Robinson', 'quinn.robinson@example.com', '3456789012', 2002, '1980-07-19', 'Female', NOW(), NOW()),
    (20, 'Rita', 'Clark', 'rita.clark@example.com', NULL, 2001, '1979-08-20', 'Female', NOW(), NOW());

-- Seeder for Education
INSERT INTO Education (id, alumni_id, institutionName, degreeShort, degreeLong, fieldOfStudy, startDate, endDate)
VALUES
    (1, 1, 'University A', 'BSc', 'Bachelor of Science', 'Computer Science', '2016-09-01', '2020-06-01'),
    (2, 1, 'University B', 'MSc', 'Master of Science', 'Software Engineering', '2020-09-01', '2022-06-01'),
    (3, 2, 'University C', 'BA', 'Bachelor of Arts', 'History', '2015-09-01', '2019-06-01'),
    (4, 3, 'University D', 'BEng', 'Bachelor of Engineering', 'Mechanical Engineering', '2014-09-01', '2018-06-01'),
    (5, 4, 'University E', 'BSc', 'Bachelor of Science', 'Biology', '2013-09-01', '2017-06-01'),
    (6, 5, 'University F', 'BA', 'Bachelor of Arts', 'Philosophy', '2012-09-01', '2016-06-01'),
    (7, 6, 'University G', 'BSc', 'Bachelor of Science', 'Mathematics', '2011-09-01', '2015-06-01'),
    (8, 7, 'University H', 'BSc', 'Bachelor of Science', 'Physics', '2010-09-01', '2014-06-01'),
    (9, 8, 'University I', 'BA', 'Bachelor of Arts', 'Literature', '2009-09-01', '2013-06-01'),
    (10, 9, 'University J', 'BSc', 'Bachelor of Science', 'Chemistry', '2008-09-01', '2012-06-01'),
    (11, 10, 'University K', 'BEng', 'Bachelor of Engineering', 'Civil Engineering', '2007-09-01', '2011-06-01'),
    (12, 11, 'University L', 'BSc', 'Bachelor of Science', 'Environmental Science', '2006-09-01', '2010-06-01'),
    (13, 12, 'University M', 'BA', 'Bachelor of Arts', 'Political Science', '2005-09-01', '2009-06-01'),
    (14, 13, 'University N', 'BSc', 'Bachelor of Science', 'Geology', '2004-09-01', '2008-06-01'),
    (15, 14, 'University O', 'BSc', 'Bachelor of Science', 'Astronomy', '2003-09-01', '2007-06-01'),
    (16, 15, 'University P', 'BA', 'Bachelor of Arts', 'Sociology', '2002-09-01', '2006-06-01'),
    (17, 16, 'University Q', 'BSc', 'Bachelor of Science', 'Psychology', '2001-09-01', '2005-06-01'),
    (18, 17, 'University R', 'BSc', 'Bachelor of Science', 'Statistics', '2000-09-01', '2004-06-01'),
    (19, 18, 'University S', 'BA', 'Bachelor of Arts', 'Economics', '1999-09-01', '2003-06-01'),
    (20, 19, 'University T', 'BSc', 'Bachelor of Science', 'Anthropology', '1998-09-01', '2002-06-01');

-- Seeder for Career
INSERT INTO Career (id, alumni_id, companyName, jobTitle, industry, description, startDate, endDate, isCurrent)
VALUES
    (1, 1, 'Company A', 'Software Engineer', 'Technology', 'Developing software solutions', '2020-07-01', NULL, TRUE),
    (2, 1, 'Company B', 'Senior Software Engineer', 'Technology', 'Leading software projects', '2022-07-01', NULL, TRUE),
    (3, 2, 'Company C', 'Historian', 'Education', 'Researching historical events', '2019-07-01', '2021-07-01', FALSE),
    (4, 3, 'Company D', 'Mechanical Engineer', 'Engineering', 'Designing mechanical systems', '2018-07-01', NULL, TRUE),
    (5, 4, 'Company E', 'Biologist', 'Science', 'Conducting biological research', '2017-07-01', '2019-07-01', FALSE),
    (6, 5, 'Company F', 'Philosopher', 'Education', 'Teaching philosophy', '2016-07-01', NULL, TRUE),
    (7, 6, 'Company G', 'Mathematician', 'Research', 'Conducting mathematical research', '2015-07-01', '2017-07-01', FALSE),
    (8, 7, 'Company H', 'Physicist', 'Research', 'Conducting physics research', '2014-07-01', NULL, TRUE),
    (9, 8, 'Company I', 'Literature Professor', 'Education', 'Teaching literature', '2013-07-01', '2015-07-01', FALSE),
    (10, 9, 'Company J', 'Chemist', 'Science', 'Conducting chemical research', '2012-07-01', NULL, TRUE),
    (11, 10, 'Company K', 'Civil Engineer', 'Engineering', 'Designing civil structures', '2011-07-01', '2013-07-01', FALSE),
    (12, 11, 'Company L', 'Environmental Scientist', 'Science', 'Conducting environmental research', '2010-07-01', NULL, TRUE),
    (13, 12, 'Company M', 'Political Scientist', 'Research', 'Conducting political research', '2009-07-01', '2011-07-01', FALSE),
    (14, 13, 'Company N', 'Geologist', 'Science', 'Conducting geological research', '2008-07-01', NULL, TRUE),
    (15, 14, 'Company O', 'Astronomer', 'Science', 'Conducting astronomical research', '2007-07-01', '2009-07-01', FALSE),
    (16, 15, 'Company P', 'Sociologist', 'Research', 'Conducting sociological research', '2006-07-01', NULL, TRUE),
    (17, 16, 'Company Q', 'Psychologist', 'Health', 'Providing psychological services', '2005-07-01', '2007-07-01', FALSE),
    (18, 17, 'Company R', 'Statistician', 'Research', 'Conducting statistical research', '2004-07-01', NULL, TRUE),
    (19, 18, 'Company S', 'Economist', 'Research', 'Conducting economic research', '2003-07-01', '2005-07-01', FALSE),
    (20, 19, 'Company T', 'Anthropologist', 'Research', 'Conducting anthropological research', '2002-07-01', NULL, TRUE);

-- Seeder for Skill
INSERT INTO Skill (id, name)
VALUES
    (1, 'Java'),
    (2, 'SQL'),
    (3, 'Python'),
    (4, 'C++'),
    (5, 'JavaScript'),
    (6, 'HTML'),
    (7, 'CSS'),
    (8, 'Ruby'),
    (9, 'PHP'),
    (10, 'Swift'),
    (11, 'Kotlin'),
    (12, 'Go'),
    (13, 'R'),
    (14, 'Perl'),
    (15, 'Scala'),
    (16, 'Rust'),
    (17, 'TypeScript'),
    (18, 'Dart'),
    (19, 'Objective-C'),
    (20, 'MATLAB');

-- Seeder for alumni_skills
INSERT INTO alumni_skills (alumni_id, skill_id)
VALUES
    (1, 1),
    (1, 2),
    (1, 3),
    (2, 4),
    (2, 5),
    (3, 6),
    (3, 7),
    (3, 8),
    (4, 9),
    (5, 10),
    (6, 11),
    (6, 12),
    (7, 13),
    (8, 14),
    (9, 15),
    (10, 16),
    (11, 17),
    (12, 18),
    (13, 19),
    (14, 20);

-- Seeder for career_skills
INSERT INTO career_skills (career_id, skill_id)
VALUES
    (1, 1),
    (1, 2),
    (2, 3),
    (3, 4),
    (4, 5),
    (5, 6),
    (6, 7),
    (7, 8),
    (8, 9),
    (9, 10),
    (10, 11),
    (11, 12),
    (12, 13),
    (13, 14),
    (14, 15),
    (15, 16),
    (16, 17),
    (17, 18),
    (18, 19),
    (19, 20);