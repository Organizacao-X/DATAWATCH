CREATE DATABASE datawatch;
USE datawatch;

CREATE TABLE Usuario(
	idUsuario INT PRIMARY KEY AUTO_INCREMENT,
    nomeUsuario VARCHAR(75) NOT NULL,
    email VARCHAR(256) NOT NULL, CONSTRAINT chkEmailUsuario CHECK (email LIKE '%@%'),
    cpf CHAR(11), 
    senha VARCHAR(25) NOT NULL, CONSTRAINT chkSenha CHECK (length(senha) > 5),
    adm CHAR(3), CONSTRAINT chkAdm CHECK (adm IN ('yes','no')),
    fkEmpresa INT
);


CREATE TABLE Maquina (
    idMaquina INT PRIMARY KEY AUTO_INCREMENT,
    nomeMaquina VARCHAR(75) NOT NULL,
    serie VARCHAR(256) NOT NULL,
    datadechegada DATE,
    especificacao VARCHAR(256),
    setor VARCHAR(100)
);


SELECT * FROM Usuario;
SELECT * FROM Maquina;

INSERT INTO Usuario (nomeUsuario, email, cpf, senha, adm) VALUES
("lele","lele@gmail.com", 12312312312, 123456, "yes");