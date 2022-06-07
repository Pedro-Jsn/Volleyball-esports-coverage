var database = require('../database/config');

function listarTimes() {
  var instrucao = `SELECT idTime, posicao, nome, pontuacao, valor_ganho FROM (SELECT idTime, nome, pontuacao, SUM(valor) AS valor_ganho,  RANK() OVER(ORDER BY pontuacao DESC) AS posicao FROM Times 
  LEFT JOIN Premiacao ON idTime = fkTime
  GROUP BY idTime) ranking;`;

  return database.executar(instrucao);
}

function listarAdmin(){
  var instrucao = `SELECT idTime, nome FROM times;`;

  return database.executar(instrucao);
}

function listarAdminTime(idTime){
  var instrucao = `SELECT idTime, nome, sigla FROM times WHERE idTime = ${idTime};`;

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

function cadastrarTime(nomeTime, sigla, treinador, pontuacao){
  var instrucao = `INSERT INTO Times (nome, sigla, treinador, pontuacao) VALUES ('${nomeTime}', '${sigla}', '${treinador}', ${pontuacao});`;

  return database.executar(instrucao);
}

function pegarIdTime(){
  var instrucao = `SELECT COUNT(idTime) AS id FROM times;`;

  return database.executar(instrucao);
}

function cadastrarJogador(nome, fkTime){
  var instrucao = `INSERT INTO jogadores (nome, fkTime) VALUES ('${nome}', ${fkTime});`;

  return database.executar(instrucao);
}

function cadastrarHistoricoTime(pontuacao, fkTime){
  var instrucao = `INSERT INTO historico (pontuacao, momento, fkTime) VALUES (${pontuacao}, now(), ${fkTime});`;

  return database.executar(instrucao);
}

function atualizarPontuacao(idTime, pontuacao){
  var instrucao = `UPDATE times SET pontuacao = ${pontuacao}
	WHERE idTime = ${idTime};`;

  return database.executar(instrucao);
}

module.exports = {
  listarTimes,
  listarTimePerfil,
  qtd_partidas_jogadas,
  estatisticaTime,
  cadastrarTime,
  pegarIdTime,
  cadastrarJogador,
  cadastrarHistoricoTime,
  listarAdmin,
  listarAdminTime,
  atualizarPontuacao
}