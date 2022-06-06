var partidasModel = require('../models/partidasModel');

function listarPartidasHome(req, res){
  partidasModel.listarPartidasHome().then(
    function (resultado) {
      if (resultado.length > 0) {
        res.status(200).json(resultado);
      }else{
        console.log("Não existem partidas cadastradas");
      }
    }).catch(
    function (erro) {
      console.log(erro);
      console.log(
        "\nHouve um erro ao listar as partidas! Erro: ",
        erro.sqlMessage
      );
      res.status(500).json(erro.sqlMessage);
    }
  )
}

function listarPartidas(req, res){
  partidasModel.listarPartidas().then(
    function (resultado) {
      if (resultado.length > 0) {
        res.status(200).json(resultado);
      }else{
        console.log("Não existem partidas cadastradas");
      }
    }).catch(
    function (erro) {
      console.log(erro);
      console.log(
        "\nHouve um erro ao listar as partidas! Erro: ",
        erro.sqlMessage
      );
      res.status(500).json(erro.sqlMessage);
    }
  )
}

module.exports = {
  listarPartidasHome,
  listarPartidas
}