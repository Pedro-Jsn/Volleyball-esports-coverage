var database = require('../database/config');

function qtdPosts(idUsuario){
  var instrucao = `SELECT COUNT(idPost) AS qt_posts FROM Post WHERE fkUsuario = ${idUsuario}`;

  return database.executar(instrucao);
}

function inserirPost(idUsuario, titulo, descricao){
  var instrucao = `INSERT INTO Post (fkUsuario, titulo, descPost) VALUES (${idUsuario}, '${titulo}', '${descricao}')`;

  return database.executar(instrucao);
}

function listarPost(){
  var instrucao = `SELECT titulo, u.nome AS nome, descPost AS descricao FROM Post
	INNER JOIN Usuario u ON u.idUsuario = Post.fkUsuario;`;

  return database.executar(instrucao);
}

module.exports = {
  qtdPosts,
  inserirPost,
  listarPost
}