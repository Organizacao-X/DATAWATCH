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

CREATE TABLE Formulario (
	idMensagem INT PRIMARY KEY AUTO_INCREMENT,
    email VARCHAR(50),
    assunto VARCHAR(80),
    mensagem VARCHAR(150)
);

CREATE TABLE Empresa (
	idEmpresa INT PRIMARY KEY AUTO_INCREMENT,
    nomeEmpresa VARCHAR(50) NOT NULL,
    ramoAtividade VARCHAR(50) NOT NULL,
    CNPJ VARCHAR(18) NOT NULL,
    cep VARCHAR(9) NOT NULL,
    ruaAvenida VARCHAR(50) NOT NULL,
    numero VARCHAR(10) NOT NULL,
    bairro VARCHAR(50) NOT NULL,
    cidade VARCHAR(50) NOT NULL,
    estado CHAR(2) NOT NULL,
    email VARCHAR(50) NOT NULL,
    telefone VARCHAR(20) NOT NULL,
    verificado CHAR(3), CONSTRAINT chkEmpresaVerificada CHECK (verificado IN ('yes', 'no'))
);