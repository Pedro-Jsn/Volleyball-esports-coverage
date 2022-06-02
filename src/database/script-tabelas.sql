-- Arquivo de apoio, caso você queira criar tabelas como as aqui criadas para a API funcionar.
-- Você precisa executar os comandos no banco de dados para criar as tabelas,
-- ter este arquivo aqui não significa que a tabela em seu BD estará como abaixo!
/* para workbench - local - desenvolvimento */
CREATE DATABASE Vec;

USE Vec;


CREATE TABLE Usuario(
	idUsuario INT PRIMARY KEY AUTO_INCREMENT
    ,nome VARCHAR(50)
    ,email VARCHAR(50)
    ,senha VARCHAR(50)
);

CREATE TABLE Post(
	idPost INT PRIMARY KEY AUTO_INCREMENT
    ,fkUsuario INT
    ,FOREIGN KEY(fkUsuario) REFERENCES Usuario(idUsuario)
    ,titulo VARCHAR(40)
    ,descPost VARCHAR(150)
);

CREATE TABLE Times(
	idTime INT PRIMARY KEY AUTO_INCREMENT
    ,nome VARCHAR(30)
    ,sigla CHAR(3)
    ,treinador VARCHAR(30)
);

CREATE TABLE Premiacao(
	idPremiacao INT PRIMARY KEY AUTO_INCREMENT
    ,valor DECIMAL(7,2)
    ,fkTime INT
    ,momento DATETIME
    ,pontuacao INT
    ,FOREIGN KEY (fkTime) REFERENCES Times(idTime)
);

CREATE TABLE Jogadores(
	idJogador INT PRIMARY KEY AUTO_INCREMENT
    ,nome VARCHAR(50)
    ,fkTime INT
    ,FOREIGN KEY(fkTime)REFERENCES Times(idTime)
);

CREATE TABLE partida(
	idPartida INT PRIMARY KEY AUTO_INCREMENT
    ,statusPartida VARCHAR(30)
    ,horario DATETIME
);

CREATE TABLE partidaTimes(
	idPartidaTimes INT PRIMARY KEY AUTO_INCREMENT
    ,fkPartida INT
    ,primeiroTime INT
    ,segundoTime INT
    ,FOREIGN KEY(primeiroTime)REFERENCES Times(idTime)
    ,FOREIGN KEY(segundoTime)REFERENCES Times(idTime)
    ,FOREIGN KEY(fkPartida)REFERENCES partida(idPartida)
);
