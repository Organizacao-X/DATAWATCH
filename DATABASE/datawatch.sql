CREATE DATABASE datawatch;
USE datawatch;

CREATE TABLE Usuario(
	idUsuario INT PRIMARY KEY AUTO_INCREMENT,
    nomeUsuario VARCHAR(75) NOT NULL,
    email VARCHAR(256) NOT NULL, CONSTRAINT chkEmailUsuario CHECK (email LIKE '%@%'), 
    senha VARCHAR(25) NOT NULL, CONSTRAINT chkSenha CHECK (length(senha) > 5),
    fkEmpresa INT
);

SELECT * FROM Usuario;