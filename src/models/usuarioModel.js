var database = require('../database/config');

function cadastrar(nome, email, senha){
  var instrucao = `INSERT INTO Usuario (nome, email, senha) VALUES ('${nome}', '${email}', '${senha}')`;

  return database.executar(instrucao);
}

function autenticar(email, senha){
  var instrucao = `SELECT * FROM Usuario WHERE email = '${email}' AND senha = '${senha}'`;

  return database.executar(instrucao);
}

module.exports = {
  cadastrar,
  autenticar
}