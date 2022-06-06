var database = require('../database/config');

function listarPartidasHome(){
  var instrucao = `SELECT (SELECT nome FROM Times WHERE idTime = primeiroTime) AS time1, (SELECT nome FROM Times WHERE idTime = segundoTime) AS time2, TIME_FORMAT(TIMEDIFF(horario, NOW()), '%Hh%im') AS tempo FROM partida p
	  INNER JOIN Times t ON t.idTime = p.primeiroTime
    INNER JOIN Times s ON s.idTime = p.segundoTime
    WHERE horario >= now()
    ORDER BY horario;`;

  return database.executar(instrucao);
}

function listarPartidas(){
  var instrucao = `SELECT TIME_FORMAT(TIME(horario), '%k:%i') AS tempo, (SELECT nome FROM Times WHERE idTime = primeiroTime) AS time1, (SELECT nome FROM Times WHERE idTime = segundoTime) AS time2, statusPartida AS situacao FROM partida p
	  INNER JOIN Times t ON t.idTime = p.primeiroTime
    INNER JOIN Times s ON s.idTime = p.segundoTime
    WHERE horario >= now()
    ORDER BY horario;`;

  return database.executar(instrucao);
}

module.exports = {
  listarPartidasHome,
  listarPartidas
}