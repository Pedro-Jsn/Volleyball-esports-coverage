var postModel = require('../models/postModel');

function qtdPosts(req, res){
  var idUsuario = req.params.idUsuario;

  postModel.qtdPosts(idUsuario).then(
    function(resultado){
      if (resultado.length > 0) {
        res.status(200).json(resultado);
      }else{
        res.status.send("Nenhum resultado encontrado!");
      } 
    }).catch(function(error){
      console.log(error);
        console.log(
          "\nHouve um erro ao realizar o cadastro! Erro: ",
          error.sqlMessage
        );
    });
}

function inserirPost(req, res){
  var idUsuario = req.body.idUsuarioServer;
  var titulo = req.body.tituloServer;
  var descricao = req.body.descricaoServer;

  postModel.inserirPost(idUsuario, titulo, descricao).then(
    function(resultado){
      res.json(resultado);
    }).catch(
      function (error) {
        console.log(error);
        console.log(
          "\nHouve um erro ao realizar o cadastro! Erro: ",
          error.sqlMessage
        );
      }
    );
}

function listarPost(req, res){
  postModel.listarPost().then(
    function(resultado){
      if (resultado.length > 0) {
        res.status(200).json(resultado);
      }else{
        res.status.send("Nenhum resultado encontrado!");
      } 
    }).catch(function(error){
      console.log(error);
        console.log(
          "\nHouve um erro ao realizar o cadastro! Erro: ",
          error.sqlMessage
        );
    });
}


module.exports = {
  qtdPosts,
  inserirPost,
  listarPost
}