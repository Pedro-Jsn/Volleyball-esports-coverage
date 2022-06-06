var timesModel = require('../models/timesModel');

function listarTimes(req, res){
  timesModel.listarTimes().then(
    function(resultado){
      if (resultado.length > 0) {
        res.status(200).json(resultado);
      }else{
        console.log("Não há times cadastrados");
      }
    }
  ).catch(
    function(erro){
      console.log(erro);
      console.log(
        "\nHouve um erro ao listar as partidas! Erro: ",
        erro.sqlMessage
      );
      res.status(500).json(erro.sqlMessage);
    }
  )
}

function listarTimePerfil(req, res){
  var idTime = req.params.idTime;

  timesModel.listarTimePerfil(idTime).then(
    function(resultado){
      if (resultado.length > 0) {
        res.status(200).json(resultado);
      }else{
        console.log("Não há times cadastrados");
      }
    }).catch(
    function(erro){
      console.log(erro);
      console.log(
        "\nHouve um erro ao listar as partidas! Erro: ",
        erro.sqlMessage
      );
      res.status(500).json(erro.sqlMessage);
    });
}

function qtd_partidas_jogadas(req, res){
  var idTime = req.params.idTime;

  timesModel.qtd_partidas_jogadas(idTime).then(
    function(resultado){
        res.status(200).json(resultado);
    }).catch(
    function(erro){
      console.log(erro);
      console.log(
        "\nHouve um erro ao listar as partidas! Erro: ",
        erro.sqlMessage
      );
      res.status(500).json(erro.sqlMessage);
    });
}

function estatisticaTime(req, res){
  var idTime = req.params.idTime;

  timesModel.estatisticaTime(idTime).then(
    function(resultado){
        res.status(200).json(resultado);
    }).catch(
    function(erro){
      console.log(erro);
      console.log(
        "\nHouve um erro ao listar as partidas! Erro: ",
        erro.sqlMessage
      );
      res.status(500).json(erro.sqlMessage);
    });
}

module.exports = {
  listarTimes,
  listarTimePerfil,
  qtd_partidas_jogadas,
  estatisticaTime
}