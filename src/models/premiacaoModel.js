var database = require('../database/config');

function listarPremiacoes(idTime){
  var instrucao = `
    SELECT valor FROM premiacao
	  WHERE fkTime = ${idTime};
  `;

  return database.executar(instrucao);
}

function cadastrarPremiacao(valor, idTime, data){
  var instrucao = `
    INSERT INTO premiacao (valor, fkTime, momento)
    VALUES (${valor}, ${idTime}, '${data}');
  `;

  return database.executar(instrucao);
}

module.exports = {
  listarPremiacoes,
  cadastrarPremiacao
}
