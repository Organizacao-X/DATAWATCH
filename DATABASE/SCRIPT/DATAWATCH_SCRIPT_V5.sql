DROP DATABASE IF EXISTS datawatch;
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
sistemaOperacional varchar(45),
processador varchar(45),
ram varchar(45),
nomeDisco1 varchar(45),
ip VARCHAR(45),
PRIMARY KEY (idMaquina, fkEmpresa),
statusSistema TINYINT(1),
cpuPorcentagem DOUBLE,
ramTotal DOUBLE,
totalDisco1 DOUBLE,
cpuMetrica DOUBLE,
ramMetrica DOUBLE,
gatilhoDisco1 DOUBLE,
tempoAtividade INT,
nomeDisco2 varchar(45),
nomeDisco3 varchar(45),
totalDisco2 DOUBLE,
totalDisco3 DOUBLE,
gatilhoDisco2 DOUBLE,
gatilhoDisco3 DOUBLE
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
discoLivre1 DOUBLE,
discoLivre2 DOUBLE,
discoLivre3 DOUBLE,
PRIMARY KEY (idCaptura, fkMaquina, fkEmpresa)
);

CREATE TABLE Alertas (
	idAlerta INT PRIMARY KEY AUTO_INCREMENT,
    nomeAlerta VARCHAR(255) NOT NULL
);

CREATE TABLE Possuem (
	idPosse INT AUTO_INCREMENT,
    fkAlerta INT,
    CONSTRAINT FOREIGN KEY (fkAlerta) REFERENCES Alertas (idAlerta),
    fkMaquina INT,
    CONSTRAINT FOREIGN KEY (fkMaquina) REFERENCES Maquinas (idMaquina),
    dataHora DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (idPosse, fkAlerta, fkMaquina)
);

INSERT INTO Usuarios VALUES
(1, 'lele', 'lele@gmail.com', 12312312312, '12345678', 1, 'IMAGEM', null, null),
(2, 'Lucas', 'lucas@gmail.com', 12312312444, '12345678', 1, 'IMAGEM', null, null);

INSERT INTO Empresas VALUES
(1, 'novaempresa', 12312312312312, 12345123, 'Rua ali', '234', 'casa', 'Jd ali', 'Sao paulo', 'SP', 1),
(2, 'newenterprise', 12312312312456, 12345135, 'Rua lá ca', '385', 'apartamento', 'Jd Lá longe', 'Rio de Janeiro', 'RJ', 1);

update Usuarios set fkEmpresa = 1 where idusuario = 1;
update Usuarios set fkEmpresa = 2 where idusuario = 2;

INSERT INTO Contato VALUES
(1, 'novae@gmail.com', '11 989898989');

INSERT INTO Usuarios VALUES
(3, 'gaga', 'gaga@gmail.com', 12312312453, '12345678', 1, 'IMAGEM', 1, 1),
(4, 'Lucas', 'lucas@gmail.com', 12312312234, '12345678', 1, 'IMAGEM', 1, 1),
(5, 'Souza', 'souza@gmail.com', 12312312673, '12345678', 1, 'IMAGEM', 1, 1),
(6, 'Narcisista', 'narcisista@gmail.com', 12312312561, '12345678', 1, 'IMAGEM', 1, 1);

INSERT INTO Maquinas (idMaquina, fkEmpresa, nomeMaquina, serie, dtChegada, processador, ram, discoMemoria, ip, statusSistema, cpuPorcentagem, ramTotal, discoTotal, tempoAtividade) 
VALUES
(1, 1, 'maquina01', 'GFT56', '2023-03-03', 'I5', '16 GB', 'HD 1 TB', '192.08.92.12', 1,24.0, 15.75, 697.45,2500751),
(2, 1, 'maquina02', 'GFT56', '2023-03-03', 'I5', '16 GB', 'HD 1 TB', '192.08.92.13', 1,24.0, 15.75, 637.45,2500664),
(3, 1, 'maquina03', 'GFT56', '2023-03-03', 'I5', '16 GB', 'HD 1 TB', '192.08.92.14', 1,24.0, 15.75, 635.45,2633254);


INSERT INTO Capturas VALUES 
(1, 1, 1, '2023-04-04 12:00:00', 3.4, 56.88, 4.5, 10.0, 25.5, 580.4);  

INSERT INTO Capturas 
(idcaptura, fkmaquina, fkempresa, dataHora, cpuUso, temperatura, ramUso, redeUpload, redeDownload, discoLivre)
 VALUES 
(2, 1, 1, '2023-04-04 12:01:00', 3.4, 56.88, 4.2, 13.0, 25.5, 580.4),  
(3, 1, 1, '2023-04-04 12:02:00', 45.4, 57.88, 4.5, 10.0, 26.5, 580.3), 
(4, 1, 1, '2023-04-04 12:03:00', 76.4, 58.88, 5.5, 12.0, 27.5, 580.2),  
(5, 1, 1, '2023-04-04 12:03:00', 76.4, 58.88, 5.5, 12.0, 27.5, 580.2),  
(6, 1, 1, '2023-04-04 12:03:00', 76.4, 58.88, 5.5, 12.0, 27.5, 580.2),  
(7, 1, 1, '2023-04-04 12:03:00', 76.4, 58.88, 5.5, 12.0, 27.5, 580.2),  
(8, 1, 1, '2023-04-04 12:03:00', 76.4, 58.88, 5.5, 12.0, 27.5, 580.2),  
(9, 2, 1, '2023-04-04 12:03:00', 76.4, 58.88, 5.5, 12.0, 27.5, 580.2),  
(10, 2, 1, '2023-04-04 12:03:00', 76.4, 58.88, 5.5, 12.0, 27.5, 580.2),  
(11, 2, 1, '2023-04-04 12:03:00', 76.4, 58.88, 5.5, 12.0, 27.5, 580.2),  
(12, 2, 1, '2023-04-04 12:03:00', 76.4, 58.88, 5.5, 12.0, 27.5, 580.2),  
(13, 2, 1, '2023-04-04 12:03:00', 76.4, 58.88, 5.5, 12.0, 27.5, 580.2),  
(14, 2, 1, '2023-04-04 12:03:00', 76.4, 58.88, 5.5, 12.0, 27.5, 580.2),  
(15, 2, 1, '2023-04-04 13:04:00', 20.4, 59.88, 7.5, 11.0, 26.5, 579.6),  
(16, 2, 1, '2023-04-04 13:04:00', 20.4, 59.88, 7.5, 11.0, 26.5, 579.6),  
(17, 2, 1, '2023-04-04 13:04:00', 20.4, 59.88, 7.5, 11.0, 26.5, 579.6),  
(18, 2, 1, '2023-04-04 13:04:00', 20.4, 59.88, 7.5, 11.0, 26.5, 579.6),  
(19, 2, 1, '2023-04-04 14:04:00', 20.4, 59.88, 7.5, 11.0, 26.5, 579.6),  
(20, 2, 1, '2023-04-04 13:05:00', 14.4, 56.88, 4.3, 9.0, 25.5, 579.3),  
(21, 1, 1, '2023-04-04 14:05:00', 14.4, 56.88, 4.3, 9.0, 25.5, 579.3),  
(22, 1, 1, '2023-04-04 13:05:00', 14.4, 56.88, 4.3, 9.0, 25.5, 579.3),
-- Empresa 2
(23, 1, 2, '2023-04-04 12:01:00', 3.4, 60.88, 4.2, 13.0, 25.5, 603.4),  
(24, 1, 2, '2023-04-04 12:02:00', 45.4, 60.88, 4.5, 10.0, 26.5, 603.3), 
(25, 1, 2, '2023-04-04 12:03:00', 76.4, 60.88, 6.5, 12.0, 27.5, 603.2),  
(26, 1, 2, '2023-04-04 12:03:00', 76.4, 60.88, 6.5, 12.0, 27.5, 603.2),  
(27, 1, 2, '2023-04-04 12:03:00', 76.4, 60.88, 6.5, 12.0, 27.5, 603.2),  
(28, 1, 2, '2023-04-04 12:03:00', 76.4, 60.88, 6.5, 12.0, 27.5, 603.2),  
(29, 1, 2, '2023-04-04 12:03:00', 76.4, 55.88, 6.5, 12.0, 27.5, 603.2),  
(30, 2, 2, '2023-04-04 12:03:00', 76.4, 55.88, 6.5, 12.0, 27.5, 603.2),  
(31, 2, 2, '2023-04-04 12:03:00', 76.4, 55.88, 6.5, 12.0, 27.5, 603.2),  
(32, 2, 2, '2023-04-04 12:03:00', 76.4, 55.88, 6.5, 12.0, 27.5, 603.2),  
(33, 2, 2, '2023-04-04 12:03:00', 76.4, 55.88, 6.5, 12.0, 27.5, 594.2),  
(34, 2, 2, '2023-04-04 12:03:00', 76.4, 52.88, 6.5, 12.0, 27.5, 594.2),  
(35, 2, 2, '2023-04-04 12:03:00', 76.4, 52.88, 6.5, 12.0, 27.5, 594.2),  
(36, 2, 2, '2023-04-04 13:04:00', 18.4, 52.88, 4.5, 11.0, 26.5, 594.6),  
(37, 2, 2, '2023-04-04 13:04:00', 18.4, 52.88, 4.5, 11.0, 26.5, 594.6),  
(38, 2, 2, '2023-04-04 13:04:00', 18.4, 52.88, 4.5, 11.0, 26.5, 594.6),  
(39, 2, 2, '2023-04-04 13:04:00', 18.4, 59.88, 4.5, 11.0, 26.5, 594.6),  
(40, 2, 2, '2023-04-04 14:04:00', 18.4, 59.88, 4.5, 11.0, 26.5, 594.6),  
(41, 2, 2, '2023-04-04 13:05:00', 13.4, 56.88, 6.3, 9.0, 25.5, 594.3),  
(42, 1, 2, '2023-04-04 14:05:00', 13.4, 56.88, 6.3, 9.0, 25.5, 594.3),  
(43, 1, 2, '2023-04-04 13:05:00', 13.4, 56.88, 6.3, 9.0, 25.5, 594.3), 
(44, 1, 2, '2023-04-04 10:05:00', 13.4, 56.88, 6.3, 9.0, 25.5, 594.3), 
(45, 1, 2, '2023-04-04 10:05:00', 13.4, 56.88, 6.3, 9.0, 25.5, 594.3), 
(46, 1, 2, '2023-04-05 10:05:00', 13.4, 56.88, 6.3, 9.0, 25.5, 594.3);  

INSERT INTO Alertas (idAlerta, nomeAlerta) VALUES
(1, "Processador"),
(2, "Ram"),
(3, "Disco"),
(4, "Rede");

INSERT INTO Possuem (idPosse, fkAlerta, fkMaquina, dataHora) VALUES
(1, 1, 2, '2023-04-04 13:04:00'),
(2, 1, 2, '2023-04-04 13:04:00'),
(3, 1, 2, '2023-04-04 13:04:00'),
(4, 1, 3, '2023-04-04 13:04:00'),
(5, 1, 3, '2023-04-04 13:04:00'),
(6, 1, 3, '2023-04-04 13:04:00'),
(7, 1, 3, '2023-04-04 13:04:00'),
(8, 1, 3, '2023-04-04 13:04:00');
-- drop database datawatch;

-- GRAFICO DE BARRA EMPILHADA
SELECT 
nomeMaquina,
fkmaquina as Maquina, Sum(ramuso), 
TIME_FORMAT(dataHora, '%H : 00') AS HoraFormata
from Capturas
JOIN Maquinas
	ON Maquinas.idMaquina = Capturas.fkMaquina
where dataHora >= SUBDATE(CURDATE(), INTERVAL 30 DAY) 
and Capturas.fkempresa = 2 
group by nomeMaquina, fkmaquina, HoraFormata
order by HoraFormata, fkMaquina;






delete from capturas where idcaptura = 47;
insert into capturas (idcaptura, fkmaquina, fkempresa, dataHora, cpuUso, temperatura, ramUso, redeUpload, redeDownload, discoLivre)
 VALUES 
(49, 2, 1, '2023-04-04 15:25:00', 3.4, 56.88, 4.2, 13.0, 25.5, 580.4);

update maquinas set statussistema = 0 where idmaquina = 2;
INSERT INTO Maquinas (idMaquina, fkEmpresa, nomeMaquina, serie, dtChegada, processador, ram, discoMemoria, ip, statusSistema, cpuPorcentagem, ramTotal, discoTotal, tempoAtividade) 
VALUES
(4, 1, 'maquina04', 'GFT56', '2023-03-03', 'I3', '12 GB', 'HD 500 GB', '192.08.92.15', 0,24.0, 15.75, 635.45,60000);







-- MOSTRAR FUNCIONARIOS

SELECT 
idUsuario as Id,
nomeUsuario as Nome,
statusUsuario as Status
from Usuarios
where fkempresa = 1;

-- TEMPO DE ATIVIDADE
SELECT idMaquina Id, nomeMaquina, statusSistema,
	SEC_TO_TIME(tempoAtividade) AS tempo_total,
       CONCAT(FLOOR(tempoAtividade / 86400), ' dias, ',
              SEC_TO_TIME(tempoAtividade % 86400)) AS tempo_formatado
              FROM Maquinas 
              where fkempresa = 1 
              order by tempoAtividade desc;
              
              SELECT idMaquina Id, nomeMaquina, statusSistema,
    SEC_TO_TIME(tempoAtividade) AS tempo_total,
    (tempoAtividade * 1000) AS tempo_total_milissegundos,
    CONCAT(FLOOR(tempoAtividade / 86400), ' dias, ',
           SEC_TO_TIME(tempoAtividade % 86400)) AS tempo_formatado
FROM Maquinas 
WHERE fkempresa = 1 
ORDER BY tempoAtividade DESC;


    -- Mostrar máquinas, já com a quantidade de chamados
    SELECT maquinas.idMaquina Id, maquinas.nomeMaquina, maquinas.statusSistema,
	SEC_TO_TIME(maquinas.tempoAtividade) AS tempo_total,
    (tempoAtividade * 1000) AS tempo_total_milissegundos,
       CONCAT(FLOOR(maquinas.tempoAtividade / 86400), ' dias, ',
              SEC_TO_TIME(maquinas.tempoAtividade % 86400)) AS tempo_formatado,
              count(possuem.fkmaquina) AS contagemChamados
              FROM Maquinas
              LEFT JOIN possuem
              ON maquinas.idmaquina = possuem.fkmaquina
              where maquinas.fkempresa = 1
              group by idmaquina;
              
              
              select Maquinas.nomeMaquina as 'Nome da maquina', Alertas.nomeAlerta as 'Alerta', Possuem.dataHora as 'Momento'
	from Possuem
		JOIN Maquinas
			ON Possuem.fkMaquina = Maquinas.idMaquina
		JOIN Alertas
			ON Possuem.fkAlerta = Alertas.idAlerta;
            
            select 
    c.redeUpload as upload, 
    c.redeDownload as download,
    c.cpuUso as cpuuso,
    c.temperatura as temperatura,
    c.ramUso as ramuso,
    c.discoLivre as discolivre,
    m.discoTotal as discoTotal,
    m.ramTotal as ramTotal,
    m.cpuMetrica as processadorMetrica,
    m.ramMetrica as ramMetrica,
    m.discoMetrica as discoMetrica,
                    c.datahora,
                    DATE_FORMAT(c.datahora,'%H:%i:%s') as horario
                from Capturas as c
                join Maquinas as m
                ON c.fkmaquina = m.idmaquina
                where fkMaquina = 1
                order by idcaptura desc limit 10;
                
                
	-- SELECT das máquinas ATIVAS
             
            SELECT idMaquina Id, nomeMaquina, statusSistema,
		SEC_TO_TIME(tempoAtividade) AS tempo_total,
        CONCAT(FLOOR(tempoAtividade / 86400), ' dias, ',
              SEC_TO_TIME(tempoAtividade % 86400)) AS tempo_formatado
              FROM Maquinas 
              where fkempresa = 1 and statusSistema = 1
              order by tempoAtividade desc;
              
              
SELECT t1.idMaquina AS Id, t1.nomeMaquina, t1.statusSistema,
    SEC_TO_TIME(t1.tempoAtividade) AS tempo_total, (tempoAtividade * 1000) AS tempo_total_milissegundos,
    CONCAT(FLOOR(t1.tempoAtividade / 86400), ' dias, ', SEC_TO_TIME(t1.tempoAtividade % 86400)) AS tempo_formatado,
    t2.maquinasTotais
FROM Maquinas AS t1
CROSS JOIN (
SELECT COUNT(idMaquina) AS maquinasTotais
FROM Maquinas
WHERE fkempresa = 1
) AS t2
WHERE t1.fkempresa = 1
ORDER BY t1.tempoAtividade DESC;
              
	-- SELECT COM A QUANTIDADE DE MAQUINAS REGISTRADAS
    
    SELECT count(idMaquina) AS maquinasTotais FROM maquinas WHERE fkempresa = 1;

                