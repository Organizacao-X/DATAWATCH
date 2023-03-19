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

CREATE TABLE Empresas (
idEmpresa INT PRIMARY KEY AUTO_INCREMENT,
razaoSocial VARCHAR(45) NOT NULL,
cnpj CHAR(14) NOT NULL,
cep CHAR(8) NOT NULL,
logradouro VARCHAR(100) NOT NULL,
numero INT NOT NULL,
complemento VARCHAR(45) NOT NULL,
bairro VARCHAR(45) NOT NULL,
cidade VARCHAR(45) NOT NULL,
estado CHAR(2),
verificado TINYINT(1),
fkUsuario INT,
CONSTRAINT FOREIGN KEY (fkUsuario) REFERENCES Usuarios (idUsuario)
);
