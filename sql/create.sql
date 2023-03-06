SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";

CREATE DATABASE Lab;
USE Lab;

CREATE TABLE MUNICIPIOS(
    ID varchar(20) NOT NULL,
    nombre varchar(40) NOT NULL,
    PRIMARY KEY (ID)
);

CREATE TABLE VIVIENDAS(
    ID varchar(20) NOT NULL,
    direccion varchar(40) NOT NULL,
    ID_MUNICIPIO varchar(20) NOT NULL,
    PRIMARY KEY (ID),
    FOREIGN KEY (ID_MUNICIPIO) REFERENCES MUNICIPIOS(ID)
);

CREATE TABLE PERSONAS(
    ID varchar(20) NOT NULL,
    nombre varchar(40) NOT NULL,
    lastname varchar(40) NOT NULL,
    age int NOT NULL,
    PRIMARY KEY (ID)
);

CREATE TABLE CABEZA_DE_FAMILIA(
    ID varchar(20) NOT NULL,
    PRIMARY KEY (ID),
    FOREIGN KEY (ID) REFERENCES PERSONAS(ID)
);

CREATE TABLE DEPENDIENTES(
    ID varchar(20) NOT NULL,
    ID_CABEZA varchar(20) NOT NULL,
    FOREIGN KEY (ID) REFERENCES PERSONAS(ID),
    FOREIGN KEY (ID_CABEZA) REFERENCES CABEZA_DE_FAMILIA(ID)
);

CREATE TABLE HABITANTE_VIVIENDA(
    ID_HABITANTE varchar(20) NOT NULL,
    ID_VIVIENDA varchar(20) NOT NULL,
    FOREIGN KEY (ID_HABITANTE) REFERENCES PERSONAS(ID),
    FOREIGN KEY (ID_VIVIENDA) REFERENCES VIVIENDAS(ID)
);

CREATE TABLE VIVIENDAS_PROPIETARIOS(
    ID_VIVIENDA varchar(20) NOT NULL,
    ID_POSEEDOR varchar(20) NOT NULL,
    FOREIGN KEY (ID_VIVIENDA) REFERENCES VIVIENDAS(ID),
    FOREIGN KEY (ID_POSEEDOR) REFERENCES PERSONAS(ID)
);
