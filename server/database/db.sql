CREATE TABLE actas (
  id INTEGER PRIMARY KEY AUTO_INCREMENT,
  asunto VARCHAR(200) NOT NULL,
  description VARCHAR(300),
  responsable VARCHAR(200) NOT NULL,
  done BOOLEAN NOT NULL DEFAULT 0,
  createAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);


CREATE TABLE compromisos(
    id_compromiso INTEGER PRIMARY KEY AUTO_INCREMENT,
    description VARCHAR(300),
     responsable VARCHAR(300) NOT NULL,
    createAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    fecha_finalizacion  VARCHAR(300),
)

CREATE TABLE programa(
    id_programa INTEGER PRIMARY KEY AUTO_INCREMENT,
    nombre_programa VARCHAR(300),
    facultad VARCHAR(300) NOT NULL
)