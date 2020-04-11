create database school;
USE school;

-- -----------------------------------------------------
-- Table School
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS School (
  id INT NOT NULL AUTO_INCREMENT,
  name VARCHAR(45) NULL,
  code VARCHAR(45) NULL,
  startDate VARCHAR(45) NULL,
  state TINYINT(1) NULL,
  htmlTitle TEXT NULL,
  htmlBody TEXT NULL,
  htmlBanner TEXT NULL,
  update_by DATE NULL,
  update_dt DATE NULL,
  created_at DATETIME NULL,
  updated_at DATETIME NULL,
  PRIMARY KEY (id))
ENGINE = InnoDB;

-- -----------------------------------------------------
-- Table Level
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS Level (
  id INT NOT NULL AUTO_INCREMENT,
  name VARCHAR(45) NULL,
  state TINYINT(1) NULL,
  htmlBody TEXT NULL,
  htmlBanner TEXT NULL,
  htmlTitle TEXT NULL,
  update_by VARCHAR(45) NULL,
  update_dt DATE NULL,
  schoolId INT NOT NULL,
  created_at DATETIME NULL,
  updated_at DATETIME NULL,
  PRIMARY KEY (id),
  INDEX fk_Niveles_Colegio_idx (schoolId ASC),
  CONSTRAINT fk_Niveles_Colegio
    FOREIGN KEY (schoolId)
    REFERENCES School (id)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table Grade
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS Grade (
  id INT NOT NULL AUTO_INCREMENT,
  name VARCHAR(45) NULL,
  state TINYINT(1) NULL,
  levelId INT NOT NULL,
  update_by VARCHAR(45) NULL,
  update_dt DATE NULL,
  created_at DATETIME NULL,
  updated_at DATETIME NULL,
  PRIMARY KEY (id),
  INDEX fk_Grados_Niveles1_idx (levelId ASC),
  CONSTRAINT fk_Grados_Niveles1
    FOREIGN KEY (levelId)
    REFERENCES Level (id)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table Person
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS Person (
  id INT NOT NULL AUTO_INCREMENT,
  identification VARCHAR(45) NULL,
  identificationType ENUM('dni', 'carnet_extranjeria', 'pasaporte', 'ruc', 'otros') NULL,
  firtsName VARCHAR(45) NULL,
  lastName VARCHAR(45) NULL,
  bornDate DATE NULL,
  gender ENUM('masculino', 'femenino', 'otros') NULL,
  startDate DATE NULL,
  update_by VARCHAR(45) NULL,
  update_dt DATE NULL,
  schoolId INT NOT NULL,
  created_at DATETIME NULL,
  updated_at DATETIME NULL,
  PRIMARY KEY (id),
  INDEX fk_Persona_Colegio1_idx (schoolId ASC),
  CONSTRAINT fk_Persona_Colegio1
    FOREIGN KEY (schoolId)
    REFERENCES School (id)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table Rol
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS Rol (
  id INT NOT NULL AUTO_INCREMENT,
  value VARCHAR(45) NULL,
  description VARCHAR(45) NULL,
  path VARCHAR(255) NULL,
  status TINYINT(1) NULL,
  update_by VARCHAR(45) NULL,
  update_dt DATE NULL,
  schoolId INT NOT NULL,
  created_at DATETIME NOT NULL,
  updated_at DATETIME NOT NULL,
  PRIMARY KEY (id),
  INDEX fk_Rol_Colegio1_idx (schoolId ASC),
  CONSTRAINT fk_Rol_Colegio1
    FOREIGN KEY (schoolId)
    REFERENCES School (id)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB;

-- -----------------------------------------------------
-- Table User
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS User (
  id INT NOT NULL AUTO_INCREMENT,
  nickname VARCHAR(45) NULL,
  email VARCHAR(45) NULL,
  password VARCHAR(255) NULL,
  status TINYINT(1) NULL,
  update_by VARCHAR(45) NULL,
  update_dt DATE NULL,
  personId INT NOT NULL,
  rolId INT NOT NULL,
  created_at DATETIME NULL,
  updated_at DATETIME NULL,
  PRIMARY KEY (id),
  INDEX fk_User_Persona1_idx (personId ASC),
  INDEX fk_User_Rol1_idx (rolId ASC),
  CONSTRAINT fk_User_Persona1
    FOREIGN KEY (personId)
    REFERENCES Person (id)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT fk_User_Rol1
    FOREIGN KEY (rolId)
    REFERENCES Rol (id)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table Year
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS Year (
  id INT NOT NULL AUTO_INCREMENT,
  name VARCHAR(45) NULL,
  status TINYINT(1) NULL,
  description VARCHAR(45) NULL,
  startDate DATE NULL,
  endDate DATE NULL,
  update_by VARCHAR(45) NULL,
  update_dt DATE NULL,
  schoolId INT NOT NULL,
  created_at DATETIME NULL,
  updated_at DATETIME NULL,
  PRIMARY KEY (id),
  INDEX fk_Year_Colegio1_idx (schoolId ASC),
  CONSTRAINT fk_Year_Colegio1
    FOREIGN KEY (schoolId)
    REFERENCES School (id)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table Course
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS Course (
  id INT NOT NULL AUTO_INCREMENT,
  name VARCHAR(45) NULL,
  banner VARCHAR(45) NULL,
  status TINYINT(1) NULL,
  update_by VARCHAR(45) NULL,
  update_dt DATE NULL,
  yearId INT NOT NULL,
  teacherId INT NOT NULL,
  gradesId INT NOT NULL,
  created_at DATETIME NULL,
  updated_at DATETIME NULL,
  PRIMARY KEY (id),
  INDEX fk_Course_Year1_idx (yearId ASC),
  INDEX fk_Course_User1_idx (teacherId ASC),
  INDEX fk_Course_Grados1_idx (gradesId ASC),
  CONSTRAINT fk_Course_Year1
    FOREIGN KEY (yearId)
    REFERENCES Year (id)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT fk_Course_User1
    FOREIGN KEY (teacherId)
    REFERENCES User (id)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT fk_Course_Grados1
    FOREIGN KEY (gradesId)
    REFERENCES Grade (id)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table AlumnList
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS AlumnList (
  id INT NOT NULL AUTO_INCREMENT,
  state TINYINT(1) NULL,
  update_by VARCHAR(45) NULL,
  update_dt DATE NULL,
  gradeId INT NOT NULL,
  yearId INT NOT NULL,
  userId INT NOT NULL,
  created_at DATETIME NULL,
  updated_at DATETIME NULL,
  PRIMARY KEY (id),
  INDEX fk_AlumnLsit_Grados1_idx (gradeId ASC),
  INDEX fk_AlumnLsit_Year1_idx (yearId ASC),
  INDEX fk_AlumnLsit_User1_idx (userId ASC),
  CONSTRAINT fk_AlumnLsit_Grados1
    FOREIGN KEY (gradeId)
    REFERENCES Grade (id)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT fk_AlumnLsit_Year1
    FOREIGN KEY (yearId)
    REFERENCES Year (id)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT fk_AlumnLsit_User1
    FOREIGN KEY (userId)
    REFERENCES User (id)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table Week
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS Week (
  id INT NOT NULL AUTO_INCREMENT,
  name VARCHAR(45) NULL,
  startDate VARCHAR(45) NULL,
  endDate VARCHAR(45) NULL,
  status TINYINT(1) NULL,
  update_by VARCHAR(45) NULL,
  update_dt DATE NULL,
  courseId INT NOT NULL,
  created_at DATETIME NULL,
  updated_at DATETIME NULL,
  PRIMARY KEY (id),
  INDEX fk_Week_Course1_idx (courseId ASC),
  CONSTRAINT fk_Week_Course1
    FOREIGN KEY (courseId)
    REFERENCES Course (id)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table Tab
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS Tab (
  id INT NOT NULL AUTO_INCREMENT,
  name VARCHAR(45) NULL,
  status TINYINT(1) NULL,
  update_by VARCHAR(45) NULL,
  update_dt DATE NULL,
  weekId INT NOT NULL,
  created_at DATETIME NULL,
  updated_at DATETIME NULL,
  PRIMARY KEY (id),
  INDEX fk_Tab_Week1_idx (weekId ASC),
  CONSTRAINT fk_Tab_Week1
    FOREIGN KEY (weekId)
    REFERENCES Week (id)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table Attribute
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS Attribute (
  id INT NOT NULL AUTO_INCREMENT,
  type VARCHAR(45) NULL,
  value VARCHAR(45) NULL,
  title VARCHAR(45) NULL,
  description VARCHAR(45) NULL,
  update_by VARCHAR(45) NULL,
  update_dt DATE NULL,
  tabId INT NOT NULL,
  created_at DATETIME NULL,
  updated_at DATETIME NULL,
  PRIMARY KEY (id),
  INDEX fk_Attribute_Tab1_idx (tabId ASC),
  CONSTRAINT fk_Attribute_Tab1
    FOREIGN KEY (tabId)
    REFERENCES Tab (id)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table token
-- -----------------------------------------------------
CREATE TABLE token (
  id INT NOT NULL AUTO_INCREMENT,
  token TEXT NOT NULL,
  users_id INT NULL,
  created_at DATETIME NULL,
  updated_at DATETIME NULL,
  PRIMARY KEY (id));
