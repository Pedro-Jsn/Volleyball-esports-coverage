var database = require('../database/config');

function listarTimes() {
  var instrucao = `SELECT idTime, posicao, nome, pontuacao, valor_ganho FROM (SELECT idTime, nome, pontuacao, SUM(valor) AS valor_ganho,  RANK() OVER(ORDER BY pontuacao DESC) AS posicao FROM Times 
  LEFT JOIN Premiacao ON idTime = fkTime
  GROUP BY idTime) ranking;`;

  return database.executar(instrucao);
}

function listarTimePerfil(idTime){
  var instrucao = `SELECT t.nome AS nomeTime, sigla, treinador, j.nome AS nomeJogador FROM times t
	LEFT JOIN jogadores j ON t.idTime = j.fkTime
  WHERE idTime = ${idTime};`;

  return database.executar(instrucao);
}

function qtd_partidas_jogadas(idTime){
  var instrucao = `SELECT COUNT(idPartida) AS qtd_partidas FROM Times t
	INNER JOIN partida p ON t.idTime = p.primeiroTime
  WHERE idTime = ${idTime};`;

  return database.executar(instrucao);
}

function estatisticaTime(idTime){
  var instrucao = `SELECT MAX(h.pontuacao) AS rating_peak, (SELECT posicao FROM (SELECT idTime, RANK() OVER(ORDER BY pontuacao DESC) AS posicao FROM Times GROUP BY idTime) ranking WHERE idTime = ${idTime}) posicaoAtual, 
  t.pontuacao FROM Times t
  LEFT JOIN historico h ON t.idTime = h.fkTime
  WHERE idTime = ${idTime};`;

  return database.executar(instrucao);
}

module.exports = {
  listarTimes,
  listarTimePerfil,
  qtd_partidas_jogadas,
  estatisticaTime
}