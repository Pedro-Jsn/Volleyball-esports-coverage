var premiacaoModel = require('../models/premiacaoModel');

function listarPremiacoes(req, res){
  var idTime = req.params.idTime;

  premiacaoModel.listarPremiacoes(idTime).then(
    function(resultado){
        res.status(200).json(resultado);
    }).catch(
    function(erro){
      console.log(erro);
      console.log(
        "\nHouve um erro ao listar as premiações! Erro: ",
        erro.sqlMessage
      );
      res.status(500).json(erro.sqlMessage);
    });
}

function cadastrarPremiacao(req, res){
  var idTime = req.body.idTimeServer;
  var valor = req.body.valorServer;
  var data = req.body.dataServer;

  premiacaoModel.cadastrarPremiacao(valor, idTime, data).then(
    function(resultado){
        res.status(200).json(resultado);
    }).catch(
    function(erro){
      console.log(erro);
      console.log(
        "\nHouve um erro ao cadastrar a premiação! Erro: ",
        erro.sqlMessage
      );
      res.status(500).json(erro.sqlMessage);
    });
}

module.exports = {
  listarPremiacoes,
  cadastrarPremiacao
}