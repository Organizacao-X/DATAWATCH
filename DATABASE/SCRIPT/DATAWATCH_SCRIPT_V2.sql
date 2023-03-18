CREATE DATABASE datawatch;
USE datawatch;

CREATE TABLE Usuarios(
	idUsuario INT PRIMARY KEY AUTO_INCREMENT,
    nomeUsuario VARCHAR(45) NOT NULL,
    email VARCHAR(45) NOT NULL, CONSTRAINT chkEmailUsuario CHECK (email LIKE '%@%'),
    cpf CHAR(11) NOT NULL,
    senha VARCHAR(25) NOT NULL, CONSTRAINT chkSenha CHECK (length(senha) >= 8),
    adm int,
    CONSTRAINT FOREIGN KEY (adm) REFERENCES Usuarios (idUsuario)
);