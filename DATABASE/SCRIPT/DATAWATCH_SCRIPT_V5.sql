CREATE DATABASE IF NOT EXISTS datawatch;
USE datawatch;

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
verificado TINYINT(1)
);

CREATE TABLE IF NOT EXISTS Usuarios (
idUsuario INT PRIMARY KEY AUTO_INCREMENT,
nomeUsuario VARCHAR(45) NOT NULL,
email VARCHAR(45) NOT NULL, CONSTRAINT chkEmailUsuario CHECK (email LIKE '%@%'),
cpf CHAR(11) NOT NULL,
senha VARCHAR(25) NOT NULL, CONSTRAINT chkSenha CHECK (length(senha) >= 8),
statusUsuario TINYINT(1),
imagemUser VARCHAR(100),
adm INT,
CONSTRAINT FOREIGN KEY (adm) REFERENCES Usuarios (idUsuario),
fkEmpresa INT,
CONSTRAINT FOREIGN KEY (fkEmpresa) REFERENCES Empresas (idEmpresa)
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
PRIMARY KEY (idMaquina, fkEmpresa),
statusSistema TINYINT(1),
cpuFrequencia DOUBLE,
ramTotal DOUBLE,
discoTotal DOUBLE
);


CREATE TABLE IF NOT EXISTS Capturas (
idCaptura INT AUTO_INCREMENT,
fkMaquina INT,
CONSTRAINT FOREIGN KEY (fkMaquina) REFERENCES Maquinas (idMaquina),
fkEmpresa INT,
CONSTRAINT FOREIGN KEY (fkEmpresa) REFERENCES Empresas (idEmpresa),

dataHora DATETIME,
cpuUso DOUBLE,
temperatura DECIMAL(5,2),
ramUso DOUBLE,
redeUpload DOUBLE,
redeDownload DOUBLE,
discoLivre DOUBLE,
PRIMARY KEY (idCaptura, fkMaquina, fkEmpresa)
);

INSERT INTO Usuarios VALUES
(1, 'lele', 'lele@gmail.com', 12312312312, '12345678', 1, 'IMAGEM', null, 1);
INSERT INTO Empresas VALUES
(1, 'novaempresa', 12312312312312, 12345123, 'Rua ali', '234', 'casa', 'Jd ali', 'Sao paulo', 'SP', 1);
INSERT INTO Contato VALUES
(1, 'novae@gmail.com', '11 989898989');
INSERT INTO Maquinas VALUES
(1, 1, 'maquina01', 'GFT56', '2023-03-03', null, 'rh38tgh9327g', 1, 3.9, 8.0, 700.3);
INSERT INTO Capturas VALUES 
(1, 1, 1, '2023-04-04 12:00:00', 3.4, 56.88, 4.5, 10.0, 25.5, 580.4);  

INSERT INTO Capturas VALUES 
(2, 1, 1, '2023-04-04 12:01:00', 3.4, 56.88, 4.2, 13.0, 25.5, 580.4),  
(3, 1, 1, '2023-04-04 12:02:00', 3.4, 57.88, 4.5, 10.0, 26.5, 580.3), 
(4, 1, 1, '2023-04-04 12:03:00', 3.4, 58.88, 5.5, 12.0, 27.5, 580.2),  
(5, 1, 1, '2023-04-04 12:04:00', 3.4, 59.88, 7.5, 11.0, 26.5, 579.6),  
(6, 1, 1, '2023-04-04 12:05:00', 3.4, 56.88, 4.3, 9.0, 25.5, 579.3);  