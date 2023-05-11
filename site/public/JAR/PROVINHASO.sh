#!/bin/bash


which figlet 
if [ $? = 0 ];

then echo estamos revisando algumas coisinhas...
sleep 1

else
sudo apt install figlet

fi

echo "$(tput setaf 11)"
figlet -c =========
figlet -c DATAWATCH
figlet -c =========
echo "$(tput setaf 10)BEM VINDO AO CLIENTE DE INSTALACAO"
echo "$(tput setaf 10)=================================="
echo "$(tput setaf 15)Atualizando pacotes..."
sleep 3
sudo apt update && sudo apt upgrade
echo "$(tput setaf 15)..."
echo "$(tput setaf 10)Estamos verificando se o java está instalado!$(tput setaf 15)"

echo aguarde....
sleep 3

# verificando JAVA, iniciando

java --version #verifica versao atual do java
if [ $? = 0 ]; #se retorno for igual a 0
then #entao,
echo $(tput setaf 10)O JAVA ESTÁ INSTALADO!$(tput setaf 15) #print no terminal
else #se nao,
echo $(tput setaf 9)o java não está instalado$(tput setaf 15) #print no terminal
echo $(tput setaf 10)gostaria de instalar o java? [s/n]$(tput setaf 15) #print no terminal
read getjava #variável que guarda resposta do usuário
if [ \“$getjava\” == \“s\” ]; #se retorno for igual a 0
then #entao
sudo apt install openjdk-17-jre -y #executa instalacao do java
fi #fecha o 2º if
fi #fecha o 1º if

# FIM

sleep 2

# Verificando Docker, iniciando
#-------------------------------------------------------------------------------


docker -version 
if [ $? = 0 ];
then
echo $(tput setaf 9) o docker não está instalado $(tput setaf 15)
else
echo $(tput setaf 9) O DOCKER ESTÁ SENDO INSTALADO!$(tput setaf 15)
sleep 2
echo $(tput setaf 10)gostaria de instalar o docker? [s/n]$(tput setaf 15)
read getdocker
if [ \“$getdocker\” == \“s\” ];
then
sudo apt install docker.io
echo $(tput setaf 10)gostaria de iniciar um container Docker com MYSQL:5.7?$(tput setaf 15)
read getmysql
if [ \“$getmysql\” == \“s\” ];
then
sudo systemctl start docker
echo iniciando $(tput setaf 11)CONTAINER DOCKER...$(tput setaf 15)
sleep 2
sudo systemctl enable docker 
sudo docker pull mysql:5.7

sudo docker run -d -p 1433:1433 --name Datawatch -e "MYSQL_DATABASE=Datawatch" -e "MYSQL_ROOT_PASSWORD=LsA147504" mysql:5.7
sudo docker exec -it Datawatch bash

mysql -u root -p
LsA147504

USE Datawatch;


CREATE TABLE IF NOT EXISTS Empresas ( idEmpresa INT PRIMARY KEY AUTO_INCREMENT,razaoSocial VARCHAR(45) NOT NULL,
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
discoLivre1 DOUBLE,
discoLivre2 DOUBLE,
discoLivre3 DOUBLE,
PRIMARY KEY (idCaptura, fkMaquina, fkEmpresa)
);

CREATE TABLE IF NOT EXISTS Alertas (
	idAlerta INT PRIMARY KEY AUTO_INCREMENT,
    nomeAlerta VARCHAR(255) NOT NULL
);

CREATE TABLE IF NOT EXISTS Possuem (
	idPosse INT AUTO_INCREMENT,
    fkAlerta INT,
    CONSTRAINT FOREIGN KEY (fkAlerta) REFERENCES Alertas (idAlerta),
    fkMaquina INT,
    CONSTRAINT FOREIGN KEY (fkMaquina) REFERENCES Maquinas (idMaquina),
    dataHora DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    pesoAlerta DOUBLE,
    PRIMARY KEY (idPosse, fkAlerta, fkMaquina)
);

fi
fi
fi 


# FIM
#-------------------------------------------------------------------------------


sleep 4

if [ -f datawatch-1.0-SNAPSHOT-jar-with-dependencies.jar ]; 
then echo ...
else
  echo "Baixando o arquivo..."
  wget https://github.com/Organizacao-X/DATAWATCH/raw/main/site/public/JAR/datawatch-1.0-SNAPSHOT-jar-with-dependencies.jar
fi
echo Abrindo $(tput setaf 11)DATAWATCH...$(tput setaf 15)
sleep 5
java -jar datawatch-1.0-SNAPSHOT-jar-with-dependencies.jar


