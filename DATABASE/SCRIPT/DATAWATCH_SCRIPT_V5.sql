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
verificado TINYINT(1),
filial INT
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
CONSTRAINT FOREIGN KEY (fkEmpresa) REFERENCES Empresas (idEmpresa),
uuid VARCHAR(36)
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
gatilhoDisco3 DOUBLE,
mac VARCHAR(100)
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
LivreDisco1 DOUBLE,
LivreDisco2 DOUBLE,
LivreDisco3 DOUBLE,
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
    pesoAlerta DOUBLE,
    PRIMARY KEY (idPosse, fkAlerta, fkMaquina)
);
DESC Usuarios;
INSERT INTO Usuarios VALUES
(1, 'lele', 'lele@gmail.com', 12312312312, '12345678', 1, 'IMAGEM', null, null, null),
(2, 'Lucas', 'lucas@gmail.com', 12312312444, '12345678', 1, 'IMAGEM', null, null, null);

INSERT INTO Empresas VALUES
(1, 'novaempresa', 12312312312312, 12345123, 'Rua ali', '234', 'casa', 'Jd ali', 'Sao paulo', 'SP', 1, null),
(2, 'newenterprise', 12312312312456, 12345135, 'Rua lá ca', '385', 'apartamento', 'Jd Lá longe', 'Rio de Janeiro', 'RJ', 1, null);

update Usuarios set fkEmpresa = 1 where idusuario = 1;
update Usuarios set fkEmpresa = 2 where idusuario = 2;

INSERT INTO Contato VALUES
(1, 'novae@gmail.com', '11 989898989');

INSERT INTO Usuarios VALUES
(3, 'gaga', 'gaga@gmail.com', 12312312453, '12345678', 1, 'IMAGEM', 1, 1, null),
(4, 'Lucas', 'lucas@gmail.com', 12312312234, '12345678', 1, 'IMAGEM', 1, 1, null),
(5, 'Souza', 'souza@gmail.com', 12312312673, '12345678', 1, 'IMAGEM', 1, 1, null),
(6, 'Narcisista', 'narcisista@gmail.com', 12312312561, '12345678', 1, 'IMAGEM', 1, 1, null);

INSERT INTO Maquinas 
(idMaquina, fkEmpresa, nomeMaquina, serie, dtChegada, 
sistemaOperacional, processador, ram, nomeDisco1, ip, 
statusSistema, cpuPorcentagem, ramTotal, totalDisco1, 
cpuMetrica, ramMetrica, gatilhoDisco1, tempoAtividade, 
nomeDisco2, nomeDisco3, totalDisco2, totalDisco3, 
gatilhoDisco2, gatilhoDisco3, mac) 
VALUES
(1, 1, 'maquina01', 'GFT56', '2023-03-03', 'Windows', 'I5', '16 GB', 'HD 1 TB GRANDAO', '192.08.92.12', 1, 24, 15.75, 697.45, 90, 13.3875, 488.215, 2500751, null, null, null, null, null, null, 'e6:9c:6a:f5:13:ea'),
(2, 1, 'maquina02', 'ACB33', '2023-03-01', 'Ubuntu', 'I7', '16 GB', 'HD 1 TB GRANDAO', '192.08.92.13', 1, 26, 15.75, 999.99, 90, 13.3875, 488.215, 2500751, null, null, null, null, null, null, 'e2:9c:6f:f2:11:ed'),
(3, 1, 'maquina03', 'AZQ33', '2023-03-01', 'Ubuntu', 'I9', '16 GB', 'HD 1 TB GRANDAO', '192.08.92.15', 1, 26, 15.75, 999.99, 90, 13.3875, 488.215, 2500751, null, null, null, null, null, null, 'e2:9c:3f:f1:16:ed');

-- (1, 1, 'maquina01', 'GFT56', '2023-03-03', 'Windows', 'I5', 'RAM?', 'HDZAO GRANDAO', '192.08.92.12', 1,24.0, 15.75, 697.45,2500751),
-- (2, 1, 'maquina02', 'GFT56', '2023-03-03', 'I5', '16 GB', 'HD 1 TB', '192.08.92.13', 1,24.0, 15.75, 637.45,2500664),
-- (3, 1, 'maquina03', 'GFT56', '2023-03-03', 'I5', '16 GB', 'HD 1 TB', '192.08.92.14', 1,24.0, 15.75, 635.45,2633254);


INSERT INTO Capturas (idCaptura, fkMaquina, fkEmpresa, dataHora, cpuUso, temperatura, 
ramUso, redeUpload, redeDownload, LivreDisco1, LivreDisco2, LivreDisco3) 
VALUES 
(null, 1, 1, '2023-05-11 12:01:00', 0.74, 23.00, 8.9, 16, 37, 321.8, null, null),
(null, 1, 1, '2023-05-11 12:01:00', 2.21, 32.00, 7.1, 14, 24, 157.1, null, null),
(null, 1, 1, '2023-05-11 12:02:00', 1.44, 66.00, 6.3, 31, 33, 675.2, null, null),
(null, 1, 1, '2023-05-11 12:02:00', 4.44, 31.00, 4.7, 28, 26, 317.4, null, null),
(null, 1, 1, '2023-05-11 12:03:00', 5.73, 12.00, 2.2, 46, 11, 459.2, null, null),
(null, 1, 1, '2023-05-11 12:03:00', 3.24, 73.00, 4.5, 52, 72, 733.7, null, null),

(null, 2, 1, '2023-05-11 13:01:00', 8.43, 13.00, 2.1, 51, 60, 811.6, null, null),
(null, 2, 1, '2023-05-11 13:01:00', 5.32, 43.00, 3.2, 32, 64, 422.1, null, null),
(null, 2, 1, '2023-05-11 15:02:00', 7.66, 32.00, 9.7, 43, 46, 736.3, null, null),
(null, 2, 1, '2023-05-11 15:02:00', 7.52, 11.00, 4.8, 89, 83, 554.4, null, null),
(null, 2, 1, '2023-05-11 14:03:00', 6.97, 25.00, 8.5, 25, 35, 282.6, null, null),
(null, 2, 1, '2023-05-11 14:03:00', 9.32, 66.00, 7.4, 16, 95, 168.9, null, null),

(null, 3, 1, '2023-05-11 16:01:00', 4.86, 12.00, 9.3, 39, 67, 299.6, null, null),
(null, 3, 1, '2023-05-11 16:01:00', 5.43, 15.00, 5.4, 28, 49, 444.3, null, null),
(null, 3, 1, '2023-05-11 17:02:00', 4.11, 45.00, 8.6, 74, 83, 172.6, null, null),
(null, 3, 1, '2023-05-11 17:02:00', 2.21, 32.00, 7.7, 65, 32, 521.2, null, null),
(null, 3, 1, '2023-05-11 18:03:00', 1.32, 23.00, 4.2, 81, 26, 744.5, null, null),
(null, 3, 1, '2023-05-11 18:03:00', 4.12, 44.00, 1.2, 42, 61, 316.1, null, null);

-- INSERT INTO Capturas 
-- (idcaptura, fkmaquina, fkempresa, dataHora, cpuUso, temperatura, ramUso, redeUpload, redeDownload, LivreDIsco1)
--  VALUES 
-- (2, 1, 1, '2023-04-04 12:01:00', 3.4, 56.88, 4.2, 13.0, 25.5, 580.4),  
-- (3, 1, 1, '2023-04-04 12:02:00', 45.4, 57.88, 4.5, 10.0, 26.5, 580.3), 
-- (4, 1, 1, '2023-04-04 12:03:00', 76.4, 58.88, 5.5, 12.0, 27.5, 580.2),  
-- (5, 1, 1, '2023-04-04 12:03:00', 76.4, 58.88, 5.5, 12.0, 27.5, 580.2),  
-- (6, 1, 1, '2023-04-04 12:03:00', 76.4, 58.88, 5.5, 12.0, 27.5, 580.2),  
-- (7, 1, 1, '2023-04-04 12:03:00', 76.4, 58.88, 5.5, 12.0, 27.5, 580.2),  
-- (8, 1, 1, '2023-04-04 12:03:00', 76.4, 58.88, 5.5, 12.0, 27.5, 580.2),  
-- (9, 2, 1, '2023-04-04 12:03:00', 76.4, 58.88, 5.5, 12.0, 27.5, 580.2),  
-- (10, 2, 1, '2023-04-04 12:03:00', 76.4, 58.88, 5.5, 12.0, 27.5, 580.2),  
-- (11, 2, 1, '2023-04-04 12:03:00', 76.4, 58.88, 5.5, 12.0, 27.5, 580.2),  
-- (12, 2, 1, '2023-04-04 12:03:00', 76.4, 58.88, 5.5, 12.0, 27.5, 580.2),  
-- (13, 2, 1, '2023-04-04 12:03:00', 76.4, 58.88, 5.5, 12.0, 27.5, 580.2),  
-- (14, 2, 1, '2023-04-04 12:03:00', 76.4, 58.88, 5.5, 12.0, 27.5, 580.2),  
-- (15, 2, 1, '2023-04-04 13:04:00', 20.4, 59.88, 7.5, 11.0, 26.5, 579.6),  
-- (16, 2, 1, '2023-04-04 13:04:00', 20.4, 59.88, 7.5, 11.0, 26.5, 579.6),  
-- (17, 2, 1, '2023-04-04 13:04:00', 20.4, 59.88, 7.5, 11.0, 26.5, 579.6),  
-- (18, 2, 1, '2023-04-04 13:04:00', 20.4, 59.88, 7.5, 11.0, 26.5, 579.6),  
-- (19, 2, 1, '2023-04-04 14:04:00', 20.4, 59.88, 7.5, 11.0, 26.5, 579.6),  
-- (20, 2, 1, '2023-04-04 13:05:00', 14.4, 56.88, 4.3, 9.0, 25.5, 579.3),  
-- (21, 1, 1, '2023-04-04 14:05:00', 14.4, 56.88, 4.3, 9.0, 25.5, 579.3),  
-- (22, 1, 1, '2023-04-04 13:05:00', 14.4, 56.88, 4.3, 9.0, 25.5, 579.3),
-- -- Empresa 2
-- (23, 1, 2, '2023-04-04 12:01:00', 3.4, 60.88, 4.2, 13.0, 25.5, 603.4),  
-- (24, 1, 2, '2023-04-04 12:02:00', 45.4, 60.88, 4.5, 10.0, 26.5, 603.3), 
-- (25, 1, 2, '2023-04-04 12:03:00', 76.4, 60.88, 6.5, 12.0, 27.5, 603.2),  
-- (26, 1, 2, '2023-04-04 12:03:00', 76.4, 60.88, 6.5, 12.0, 27.5, 603.2),  
-- (27, 1, 2, '2023-04-04 12:03:00', 76.4, 60.88, 6.5, 12.0, 27.5, 603.2),  
-- (28, 1, 2, '2023-04-04 12:03:00', 76.4, 60.88, 6.5, 12.0, 27.5, 603.2),  
-- (29, 1, 2, '2023-04-04 12:03:00', 76.4, 55.88, 6.5, 12.0, 27.5, 603.2),  
-- (30, 2, 2, '2023-04-04 12:03:00', 76.4, 55.88, 6.5, 12.0, 27.5, 603.2),  
-- (31, 2, 2, '2023-04-04 12:03:00', 76.4, 55.88, 6.5, 12.0, 27.5, 603.2),  
-- (32, 2, 2, '2023-04-04 12:03:00', 76.4, 55.88, 6.5, 12.0, 27.5, 603.2),  
-- (33, 2, 2, '2023-04-04 12:03:00', 76.4, 55.88, 6.5, 12.0, 27.5, 594.2),  
-- (34, 2, 2, '2023-04-04 12:03:00', 76.4, 52.88, 6.5, 12.0, 27.5, 594.2),  
-- (35, 2, 2, '2023-04-04 12:03:00', 76.4, 52.88, 6.5, 12.0, 27.5, 594.2),  
-- (36, 2, 2, '2023-04-04 13:04:00', 18.4, 52.88, 4.5, 11.0, 26.5, 594.6),  
-- (37, 2, 2, '2023-04-04 13:04:00', 18.4, 52.88, 4.5, 11.0, 26.5, 594.6),  
-- (38, 2, 2, '2023-04-04 13:04:00', 18.4, 52.88, 4.5, 11.0, 26.5, 594.6),  
-- (39, 2, 2, '2023-04-04 13:04:00', 18.4, 59.88, 4.5, 11.0, 26.5, 594.6),  
-- (40, 2, 2, '2023-04-04 14:04:00', 18.4, 59.88, 4.5, 11.0, 26.5, 594.6),  
-- (41, 2, 2, '2023-04-04 13:05:00', 13.4, 56.88, 6.3, 9.0, 25.5, 594.3),  
-- (42, 1, 2, '2023-04-04 14:05:00', 13.4, 56.88, 6.3, 9.0, 25.5, 594.3),  
-- (43, 1, 2, '2023-04-04 13:05:00', 13.4, 56.88, 6.3, 9.0, 25.5, 594.3), 
-- (44, 1, 2, '2023-04-04 10:05:00', 13.4, 56.88, 6.3, 9.0, 25.5, 594.3), 
-- (45, 1, 2, '2023-04-04 10:05:00', 13.4, 56.88, 6.3, 9.0, 25.5, 594.3), 
-- (46, 1, 2, '2023-04-05 10:05:00', 13.4, 56.88, 6.3, 9.0, 25.5, 594.3);  

INSERT INTO Alertas (idAlerta, nomeAlerta) VALUES
(1, "Processador"),
(2, "Ram"),
(3, "Disco"),
(4, "Rede");

-- INSERT INTO Possuem (idPosse, fkAlerta, fkMaquina, dataHora) VALUES
-- (1, 1, 2, '2023-04-04 13:04:00'),
-- (2, 1, 2, '2023-04-04 13:04:00'),
-- (3, 1, 2, '2023-04-04 13:04:00'),
-- (4, 1, 3, '2023-04-04 13:04:00'),
-- (5, 1, 3, '2023-04-04 13:04:00'),
-- (6, 1, 3, '2023-04-04 13:04:00'),
-- (7, 1, 3, '2023-04-04 13:04:00'),
-- (8, 1, 3, '2023-04-04 13:04:00');
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
and Capturas.fkempresa = 1
group by nomeMaquina, fkmaquina, HoraFormata
order by HoraFormata, fkMaquina;

-- GRÁFICO DE BARRA MYSQL
SELECT 
  m.nomeMaquina AS nomeMaquina, 
  COALESCE(SUM(c.ramUso), 0) AS ramUso,  
  dh.dataHora1
FROM (
  SELECT DISTINCT 
    TIME_FORMAT(dataHora, '%H : 00') AS dataHora1
  FROM Capturas
  WHERE fkEmpresa = 1 AND dataHora >= SUBDATE(CURDATE(), INTERVAL 30 DAY)
) AS dh
CROSS JOIN Maquinas AS m
LEFT JOIN Capturas AS c 
  ON m.idMaquina = c.fkMaquina 
  AND dh.dataHora1 = TIME_FORMAT(dataHora, '%H : 00')
  AND c.dataHora >= SUBDATE(CURDATE(), INTERVAL 30 DAY)
  AND c.fkEmpresa = 1
GROUP BY m.idMaquina, m.nomeMaquina, dh.dataHora1
ORDER BY dh.dataHora1, m.idMaquina;


-- GRÁFICO DE BARRA SQL SERVER
-- SELECT 
--   m.nomeMaquina AS nomeMaquina, 
--   COALESCE(SUM(c.ramUso), 0) AS ramUso, 
--   dh.dataHora1
-- FROM (
--   SELECT DISTINCT 
--     FORMAT(CONVERT(datetime, dataHora, 120), 'HH : 00') AS dataHora1
--   FROM Capturas
--   WHERE fkEmpresa = 1
-- ) AS dh
-- CROSS JOIN Maquinas AS m
-- LEFT JOIN Capturas AS c 
--   ON m.idMaquina = c.fkMaquina 
--   AND dh.dataHora1 = FORMAT(CONVERT(datetime, c.dataHora, 120), 'HH : 00')
--   AND c.dataHora <= DATEADD(DAY, -30, GETDATE())
--   AND c.fkEmpresa = 1
-- GROUP BY m.nomeMaquina, dh.dataHora1
-- ORDER BY dh.dataHora1, m.nomeMaquina;

delete from capturas where idcaptura = 47;
-- insert into capturas (idcaptura, fkmaquina, fkempresa, dataHora, cpuUso, temperatura, ramUso, redeUpload, redeDownload, LivreDIsco1)
--  VALUES 
-- (49, 2, 1, '2023-04-04 15:25:00', 3.4, 56.88, 4.2, 13.0, 25.5, 580.4);

-- update Maquinas set statussistema = 0 where idmaquina = 2;
-- INSERT INTO Maquinas (idMaquina, fkEmpresa, nomeMaquina, serie, dtChegada, processador, ram, discoMemoria, ip, statusSistema, cpuPorcentagem, ramTotal, totalDisco1, tempoAtividade) 
-- VALUES
-- (4, 1, 'maquina04', 'GFT56', '2023-03-03', 'I3', '12 GB', 'HD 500 GB', '192.08.92.15', 0,24.0, 15.75, 635.45,60000);







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
    SELECT Maquinas.idMaquina Id, Maquinas.nomeMaquina, Maquinas.statusSistema,
	SEC_TO_TIME(Maquinas.tempoAtividade) AS tempo_total,
    (tempoAtividade * 1000) AS tempo_total_milissegundos,
       CONCAT(FLOOR(Maquinas.tempoAtividade / 86400), ' dias, ',
              SEC_TO_TIME(Maquinas.tempoAtividade % 86400)) AS tempo_formatado,
              count(Possuem.fkmaquina) AS contagemChamados
              FROM Maquinas
              LEFT JOIN Possuem
              ON Maquinas.idmaquina = Possuem.fkmaquina
              where Maquinas.fkempresa = 1
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
    c.LivreDIsco1 as LivreDIsco1,
    m.totalDisco1 as totalDisco1,
    m.ramTotal as ramTotal,
    m.cpuMetrica as processadorMetrica,
    m.ramMetrica as ramMetrica,
    m.gatilhoDisco1 as gatilhoDisco1,
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
    t2.MaquinasTotais
FROM Maquinas AS t1
CROSS JOIN (
SELECT COUNT(idMaquina) AS MaquinasTotais
FROM Maquinas
WHERE fkempresa = 1
) AS t2
WHERE t1.fkempresa = 1
ORDER BY t1.tempoAtividade DESC;
              
	-- SELECT COM A QUANTIDADE DE Maquinas REGISTRADAS
    
    SELECT count(idMaquina) AS MaquinasTotais FROM Maquinas WHERE fkempresa = 1;
                