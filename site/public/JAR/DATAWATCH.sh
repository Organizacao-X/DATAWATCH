#!/bin/bash


java -version #verifica versao atual do java
if [ $? = 0 ]; #se retorno for igual a 0
then #entao,
echo “java instalado” #print no terminal
else #se nao,
echo “java não instalado” #print no terminal
echo “gostaria de instalar o java? [s/n]” #print no terminal
read get #variável que guarda resposta do usuário
if [ \“$get\” == \“s\” ]; #se retorno for igual a 0
then #entao
sudo apt install openjdk-17-jre -y #executa instalacao do java
fi #fecha o 2º if
fi #fecha o 1º if



java -jar datawatch-1.0-SNAPSHOT-jar-with-dependencies.jar
exit 0
