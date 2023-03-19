CREATE DATABASE IF NOT EXISTS datawatch;
USE datawatch;

CREATE TABLE IF NOT EXISTS Usuarios (
idUsuario INT PRIMARY KEY AUTO_INCREMENT,
nomeUsuario VARCHAR(45) NOT NULL,
email VARCHAR(45) NOT NULL, CONSTRAINT chkEmailUsuario CHECK (email LIKE '%@%'),
cpf CHAR(11) NOT NULL,
senha VARCHAR(25) NOT NULL, CONSTRAINT chkSenha CHECK (length(senha) >= 8),
adm int,
CONSTRAINT FOREIGN KEY (adm) REFERENCES Usuarios (idUsuario)
);

CREATE TABLE IF NOT EXISTS Empresas (
idEmpresa INT PRIMARY KEY AUTO_INCREMENT,
razaoSocial VARCHAR(45) NOT NULL,
cnpj CHAR(14) NOT NULL,
cep CHAR(8) NOT NULL,
logradouro VARCHAR(100) NOT NULL,
numero INT NOT NULL,
complemento VARCHAR(45) NOT NULL,
bairro VARCHAR(45) NOT NULL,
cidade VARCHAR(45) NOT NULL,
estado CHAR(2) NOT NULL,
verificado TINYINT(1),
fkUsuario INT,
CONSTRAINT FOREIGN KEY (fkUsuario) REFERENCES Usuarios (idUsuario)
);

CREATE TABLE IF NOT EXISTS Contato (
fkEmpresa INT,
CONSTRAINT FOREIGN KEY (fkEmpresa) REFERENCES Empresas (idEmpresa),
email VARCHAR(45),
telefone VARCHAR(15)
);

CREATE TABLE IF NOT EXISTS Maquinas (
idMaquina INT AUTO_INCREMENT,
fkEmpresa INT,
CONSTRAINT FOREIGN KEY (fkEmpresa) REFERENCES Empresas (idEmpresa),
nomeMaquina VARCHAR(45) NOT NULL,
serie VARCHAR(45) NOT NULL,
dtChegada DATE,
descricao VARCHAR(100),
ip VARCHAR(45),
PRIMARY KEY (idMaquina, fkEmpresa)
);


CREATE TABLE IF NOT EXISTS Capturas (
idCaptura INT AUTO_INCREMENT,
fkMaquina INT,
CONSTRAINT FOREIGN KEY (fkMaquina) REFERENCES Maquinas (idMaquina),
fkEmpresa INT,
CONSTRAINT FOREIGN KEY (fkEmpresa) REFERENCES Empresas (idEmpresa),
usoCpu FLOAT(5,3),
usoMemoria BIGINT,
usoDisco BIGINT,
usoRede DOUBLE,
PRIMARY KEY (idCaptura, fkMaquina, fkEmpresa)
);