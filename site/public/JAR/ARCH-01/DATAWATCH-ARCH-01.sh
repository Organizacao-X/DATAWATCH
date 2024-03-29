#!/bin/bash

echo "$(tput setaf 15)Atualizando pacotes..."
sleep 2
sudo apt update && sudo apt upgrade
if [ ! "$(which figlet 2> /dev/null)" ];
then
	sudo apt install figlet
fi
clear
echo "$(tput setaf 11)"
figlet -c =========
figlet -c DATAWATCH
figlet -c =========
echo "$(tput setaf 10)BEM VINDO AO CLIENTE DE INSTALACAO"
echo "$(tput setaf 10)=================================="
sleep 3

# ------------------ JAVA EXISTE? --------------------------------------------------------
java -version #verifica versao atual do java
if [ $? = 0 ]; #se retorno for igual a 0
then #entao,
echo $(tput setaf 10)O JAVA ESTÁ INSTALADO!$(tput setaf 15) #print no terminal
else #se nao,
echo $(tput setaf 9)o java não está instalado$(tput setaf 15) #print no terminal
echo 	$(tput setaf 10)gostaria de instalar o java? [s/n]$(tput setaf 15)” #print no terminal
read get #variável que guarda resposta do usuário
if [ \“$get\” == \“s\” ]; #se retorno for igual a 0
then #entao
sudo apt install openjdk-17-jre -y #executa instalacao do java
fi #fecha o 2º if
fi #fecha o 1º if

# ------------------ VERIFICANDO DOCKER E INSTALANDO -------------------------------------
docker --version 
if [ $? = 0 ];
then
	echo $(tput setaf 10)DOCKER ESTÁ INSTALADO!$(tput setaf 15)
else
	echo $(tput setaf 9) Docker não está instalado!$(tput setaf 15)
	echo $(tput setaf 10)gostaria de instalar o Docker? [s/n]$(tput setaf 15)
	read getdocker
	if [ \“$getdocker\” == \“s\” ];
	then
		sudo apt install docker.io -y
	fi

fi
sudo systemctl start docker
sudo systemctl enable docker 

# ----------------------- IMAGEM MYSQL EXISTE? -----------------------------------------------------
if [ "$(sudo docker images -q mysql:5.7 2> /dev/null)" ]; 
then
	echo "$(tput setaf 10)Imagem mysql:5.7 encontrada$(tput setaf 15)"
else
	echo "$(tput setaf 9)Imagem mysql:5.7 não encontrada. Criando imagem...$(tput setaf 15)"
	sudo docker pull mysql:5.7
fi

# ----------------------- CONTAINER MYSQL EXISTE? --------------------------------------------------
if [ "$(sudo docker ps -aqf name=Datawatch)" ]; 
then
    echo "$(tput setaf 10)Container Docker 'Datawatch' já existe.$(tput setaf 15)"
	sudo docker start Datawatch
else
    echo "$(tput setaf 9)Container Docker 'Datawatch' não encontrado. Criando container...$(tput setaf 15)"
	sudo docker run -d -p 3306:3306 --name Datawatch -e "MYSQL_DATABASE=datawatch" -e "MYSQL_ROOT_PASSWORD=datawatch" mysql:5.7
fi
echo conectando...
sleep 10
sudo docker exec -i Datawatch mysql -uroot -pdatawatch -e "USE datawatch;
CREATE TABLE IF NOT EXISTS Empresas(
	idEmpresa INT,
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
CREATE TABLE IF NOT EXISTS Usuarios(
	idUsuario INT,
    nomeUsuario VARCHAR(45) NOT NULL,
    email VARCHAR(45) NOT NULL, CONSTRAINT chkEmailUsuario CHECK(email LIKE '%@%'),
    cpf CHAR(11) NOT NULL,
    senha VARCHAR(25) NOT NULL, CONSTRAINT chkSenha CHECK(length(senha) >= 8),
    statusUsuario TINYINT(1),
    imagemUser VARCHAR(100),
    adm INT, 
    fkEmpresa INT,
    uuid VARCHAR(36)
);
CREATE TABLE IF NOT EXISTS Maquinas(
	idMaquina INT,
	fkEmpresa INT,
	nomeMaquina VARCHAR(45) NOT NULL,
	serie VARCHAR(45) NOT NULL,
	dtChegada DATE,
	sistemaOperacional varchar(45),
	processador varchar(150),
	ram varchar(45),
	nomeDisco1 varchar(150),
	ip VARCHAR(45),
    statusSistema TINYINT(1),
	cpuPorcentagem DOUBLE,
	ramTotal DOUBLE,
	totalDisco1 DOUBLE,
	cpuMetrica DOUBLE,
	ramMetrica DOUBLE,
	gatilhoDisco1 DOUBLE,
	tempoAtividade INT,
	nomeDisco2 varchar(150),
	nomeDisco3 varchar(150),
	totalDisco2 DOUBLE,
	totalDisco3 DOUBLE,
	gatilhoDisco2 DOUBLE,
	gatilhoDisco3 DOUBLE,
	mac VARCHAR(100)
);
CREATE TABLE IF NOT EXISTS Capturas(
	idCaptura INT PRIMARY KEY AUTO_INCREMENT,
    fkMaquina INT,
    fkEmpresa INT, 
    dataHora DATETIME,
    cpuUso DOUBLE,
    temperatura DECIMAL(5,2),
    ramUso DOUBLE,
    redeUpload DOUBLE,
    redeDownload DOUBLE,
    LivreDisco1 DOUBLE,
    LivreDisco2 DOUBLE,
    LivreDisco3 DOUBLE
);
CREATE TABLE IF NOT EXISTS Alertas(
	idAlerta INT PRIMARY KEY AUTO_INCREMENT,
    categoria VARCHAR(255),
    peso INT,
    descricao VARCHAR(255) NOT NULL
);
CREATE TABLE IF NOT EXISTS Log(
	idPosse INT PRIMARY KEY AUTO_INCREMENT,
    fkAlerta INT,
    fkMaquina INT,
    fkEmpresa INT,
    dataHora DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
SHOW TABLES;"
sleep 2

# ----------------------- EXECUTANDO O JAR ---------------------------------------------------------
  caminho=$(pwd)
if [ -f datawatch-1.0-SNAPSHOT-jar-GUI.jar ]; 
then echo ...
else
  echo "Baixando o arquivo..."
  wget -P $caminho https://github.com/Organizacao-X/DATAWATCH/raw/main/site/public/JAR/ARCH-01/datawatch-1.0-SNAPSHOT-jar-GUI.jar
fi
echo Abrindo $(tput setaf 11)DATAWATCH...$(tput setaf 15)
sleep 3
chmod 777 datawatch-1.0-SNAPSHOT-jar-GUI.jar
java -jar $caminho/datawatch-1.0-SNAPSHOT-jar-GUI.jar
