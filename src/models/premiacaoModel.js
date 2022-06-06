var database = require('../database/config');

function listarPremiacoes(idTime){
  var instrucao = `
    SELECT valor FROM premiacao
	  WHERE fkTime = ${idTime};
  `;

  return database.executar(instrucao);
}

module.exports = {
  listarPremiacoes
}
