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
    ,pontuacao INT
);

CREATE TABLE Historico(
    idHistorico INT PRIMARY KEY AUTO_INCREMENT
    ,pontuacao INT
    ,momento DATETIME
    ,fkTime INT
    ,FOREIGN KEY (fkTime) REFERENCES Times(idTime)
);

CREATE TABLE Premiacao(
	idPremiacao INT PRIMARY KEY AUTO_INCREMENT
    ,valor DECIMAL(7,2)
    ,fkTime INT
    ,momento DATETIME
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
    ,primeiroTime INT
    ,segundoTime INT
    ,FOREIGN KEY(primeiroTime)REFERENCES Times(idTime)
    ,FOREIGN KEY(segundoTime)REFERENCES Times(idTime)
);
