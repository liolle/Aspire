CREATE DATABASE IF NOT EXISTS planetscale ;

USE planetscale ;

CREATE TABLE ma_users (
    avatar VARCHAR(256) DEFAULT '',
    fullname VARCHAR(150) DEFAULT '',
    email VARCHAR(100),
    
    c_type VARCHAR(100) default '',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY(email)
);

CREATE TABLE ma_subscription (
    id int AUTO_INCREMENT,
    email  VARCHAR(100),
    tier VARCHAR(100) null,
    PRIMARY KEY(id),
    FOREIGN KEY (email)
        REFERENCES ma_users(email)
        ON DELETE CASCADE
        ON UPDATE CASCADE
);

CREATE TABLE ma_subfeature (
    sub_id int NOT NULL,
    feature_id  int NOT NULL,
    PRIMARY KEY(sub_id,feature_id)
);

CREATE TABLE ma_features (
    name VARCHAR(100),
    description VARCHAR(255),
    PRIMARY KEY(name)
);

CREATE TABLE ma_sessions (
    id int AUTO_INCREMENT,
    email  VARCHAR(100),
    PRIMARY KEY(id,email),
    Token VARCHAR(500) DEFAULT ''
);

---- Models ----

/*
height (cm)
weight (kg)
*/

CREATE TABLE ma_models (
    id int AUTO_INCREMENT,
    account_email  VARCHAR(100) NOT NULL,
    model_email  VARCHAR(100) NOT NULL,
    height int DEFAULT 0,
    weight int DEFAULT 0,
    c_hair VARCHAR(50) DEFAULT "#252525",
    c_skin VARCHAR(50) DEFAULT "#1f1f1f",
    PRIMARY KEY(id),
    FOREIGN KEY (account_email)
        REFERENCES ma_users(email)
        ON DELETE CASCADE
        ON UPDATE CASCADE
);

CREATE TABLE ma_modelpictures (
    model_id int NOT NULL,
    link VARCHAR(200) NOT NULL,
    PRIMARY KEY(model_id,link),
    FOREIGN KEY (model_id)
        REFERENCES ma_models(id)
        ON DELETE CASCADE
        ON UPDATE CASCADE
);


---- Hobbies ----

CREATE TABLE ma_hobbies (
    name VARCHAR(100) NOT NULL,
    PRIMARY KEY(name)
);

CREATE TABLE ma_modelhobbies (
    id int AUTO_INCREMENT,
    model_id int NOT NULL,
    name VARCHAR(100) NOT NULL,
    description VARCHAR(100) DEFAULT NULL,
    PRIMARY KEY(id),
    FOREIGN KEY (name)
        REFERENCES ma_hobbies(name)
        ON DELETE CASCADE
        ON UPDATE CASCADE
);

---- Languages ----

CREATE TABLE ma_langages (
    name VARCHAR(100) NOT NULL,
    initiales VARCHAR(10) NOT NULL,
    flag VARCHAR(200) DEFAULT '',
    PRIMARY KEY(name,initiales),
    UNIQUE KEY(name)
);

CREATE TABLE ma_modellangages (
    model_id int NOT NULL,
    name VARCHAR(100) NOT NULL,
    level VARCHAR(50) NOT NULL
);


