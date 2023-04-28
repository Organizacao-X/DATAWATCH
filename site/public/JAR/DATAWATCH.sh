#!/bin/bash


which figlet 
if [ $? = 0 ];

then echo iniciando...
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

sleep 2

if [ -f datawatch-1.0-SNAPSHOT-jar-with-dependencies.jar ]; 
then echo ...
else
  echo "Baixando o arquivo..."
  wget https://github.com/Organizacao-X/DATAWATCH/raw/main/site/public/JAR/datawatch-1.0-SNAPSHOT-jar-with-dependencies.jar
fi
echo Abrindo $(tput setaf 11)DATAWATCH...$(tput setaf 15)
sleep 3
java -jar datawatch-1.0-SNAPSHOT-jar-with-dependencies.jar
