#!/bin/bash

which figlet 
if [ $? = 0 ];
then
	return
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
#sudo apt update && sudo apt upgrade
echo $(tput setaf 15)aguarde....
sleep 3

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

# ----------------------- IMAGEM JAVA EXISTE? -----------------------------------------------------
if [ "$(sudo docker images -q amazoncorretto:17 2> /dev/null)" ]; 
then
	echo "$(tput setaf 10)Imagem amazoncorretto:17 encontrada$(tput setaf 15)"
else
	echo "$(tput setaf 9)Imagem amazoncorretto:17 não encontrada. Criando imagem...$(tput setaf 15)"
	sudo docker pull amazoncorretto:17
fi

# ----------------------- CONTAINER JAVA EXISTE? --------------------------------------------------
if [ "$(sudo docker ps -aqf name=javawatch)" ];
then
    echo $(tput setaf 10)Container JAVA existe$(tput setaf 15)
	sudo docker start javawatch
else
    sudo docker run -d --name javawatch amazoncorretto:17 sleep infinity
fi

echo conectando...
sleep 10
sudo docker exec -i Datawatch mysql -uroot -pdatawatch -e "USE datawatch;CREATE TABLE IF NOT EXISTS Empresas(idEmpresa INT PRIMARY KEY AUTO_INCREMENT,razaoSocial VARCHAR(45) NOT NULL,cnpj CHAR(14) NOT NULL,cep CHAR(8) NOT NULL,logradouro VARCHAR(100) NOT NULL,numero INT NOT NULL,complemento VARCHAR(45) NOT NULL,bairro VARCHAR(45) NOT NULL,cidade VARCHAR(45) NOT NULL,estado CHAR(2) NOT NULL,verificado TINYINT(1));CREATE TABLE IF NOT EXISTS Usuarios(idUsuario INT PRIMARY KEY AUTO_INCREMENT,nomeUsuario VARCHAR(45) NOT NULL,email VARCHAR(45) NOT NULL, CONSTRAINT chkEmailUsuario CHECK(email LIKE '%@%'),cpf CHAR(11) NOT NULL,senha VARCHAR(25) NOT NULL, CONSTRAINT chkSenha CHECK(length(senha) >= 8),statusUsuario TINYINT(1),imagemUser VARCHAR(100),adm INT,CONSTRAINT FOREIGN KEY(adm) REFERENCES Usuarios(idUsuario), fkEmpresa INT, CONSTRAINT FOREIGN KEY(fkEmpresa) REFERENCES Empresas(idEmpresa), uuid VARCHAR(36));CREATE TABLE IF NOT EXISTS Contato(fkEmpresa INT,CONSTRAINT FOREIGN KEY(fkEmpresa) REFERENCES Empresas(idEmpresa),email VARCHAR(45),telefone VARCHAR(15));CREATE TABLE IF NOT EXISTS Maquinas(idMaquina INT AUTO_INCREMENT,fkEmpresa INT,CONSTRAINT FOREIGN KEY(fkEmpresa) REFERENCES Empresas(idEmpresa),nomeMaquina VARCHAR(45) NOT NULL,serie VARCHAR(45) NOT NULL,dtChegada DATE,sistemaOperacional varchar(45),processador varchar(45),ram varchar(45),nomeDisco1 varchar(45),ip VARCHAR(45),PRIMARY KEY(idMaquina, fkEmpresa),statusSistema TINYINT(1),cpuPorcentagem DOUBLE,ramTotal DOUBLE,totalDisco1 DOUBLE,cpuMetrica DOUBLE,ramMetrica DOUBLE,gatilhoDisco1 DOUBLE,tempoAtividade INT,nomeDisco2 varchar(45),nomeDisco3 varchar(45),totalDisco2 DOUBLE,totalDisco3 DOUBLE,gatilhoDisco2 DOUBLE,gatilhoDisco3 DOUBLE,mac VARCHAR(100));CREATE TABLE IF NOT EXISTS Capturas(idCaptura INT PRIMARY KEY AUTO_INCREMENT,fkMaquina INT,fkEmpresa INT, dataHora DATETIME,cpuUso DOUBLE,temperatura DECIMAL(5,2),ramUso DOUBLE,redeUpload DOUBLE,redeDownload DOUBLE,LivreDisco1 DOUBLE,LivreDisco2 DOUBLE,LivreDisco3 DOUBLE);CREATE TABLE IF NOT EXISTS Alertas(idAlerta INT PRIMARY KEY AUTO_INCREMENT,nomeAlerta VARCHAR(255) NOT NULL);CREATE TABLE IF NOT EXISTS Possuem(idPosse INT AUTO_INCREMENT,fkAlerta INT,CONSTRAINT FOREIGN KEY(fkAlerta) REFERENCES Alertas(idAlerta),fkMaquina INT,CONSTRAINT FOREIGN KEY(fkMaquina) REFERENCES Maquinas(idMaquina),dataHora DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,pesoAlerta DOUBLE,PRIMARY KEY(idPosse, fkAlerta, fkMaquina));SHOW TABLES;"
sleep 2


# --------------------------------- EXECUTANDO NO CONTAINER JAVA ----------------------------------- 
sudo docker exec -it javawatch bash -c "if [ ! '$(command -v wget 2> /dev/null)' ]; 
then 
	echo wget instalado;
else
	echo 'wget não encontrado. Instalando...';
	yum install wget -y; 
fi"
sudo docker exec -it javawatch bash -c "if [ -f datawatch-1.0-SNAPSHOT-jar-CLI.jar ]; then echo 'Sistema $(tput setaf 11)DATAWATCH$(tput setaf 15) encontrado!'; else echo 'Baixando o arquivo...'; wget https://github.com/Organizacao-X/DATAWATCH/raw/main/site/public/JAR/ARCH-03/datawatch-1.0-SNAPSHOT-jar-CLI.jar ; fi"
sleep 2
sudo docker exec -it javawatch bash -c "yum install libudev-devel -y"
sudo docker exec -it javawatch bash -c "echo Abrindo $(tput setaf 11)DATAWATCH...$(tput setaf 15)"
sudo docker exec -it javawatch bash -c "java -jar datawatch-1.0-SNAPSHOT-jar-CLI.jar"

