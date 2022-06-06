var database = require('../database/config');

function obterDadosGrafico(idTime){
  var instrucao = `SELECT pontuacao, DATE_FORMAT(momento, '%M %e, %Y') AS momento FROM Historico
	WHERE fkTime = ${idTime}
	GROUP BY YEARWEEK(momento)
  ORDER BY YEARWEEK(momento);`;

  return database.executar(instrucao);
}

function mudarIdioma(){
  var instrucao = `SET lc_time_names = 'pt_BR';`;

  return database.executar(instrucao);
}

function obterDadosGrafico2(idTime){
  var instrucao = `SELECT pontuacao, momento_pontuacao, posicao FROM (SELECT fkTime, RANK() OVER(PARTITION BY YEARWEEK(momento) ORDER BY pontuacao DESC) AS posicao, DATE_FORMAT(momento, "%b '%y") AS momento_pontuacao, pontuacao FROM historico) historyRanking
  WHERE fkTime = ${idTime};`;

  return database.executar(instrucao);
}

module.exports = {
  obterDadosGrafico,
  obterDadosGrafico2,
  mudarIdioma
}