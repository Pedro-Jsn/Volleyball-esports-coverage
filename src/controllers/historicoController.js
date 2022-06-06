var historicoModel = require('../models/historicoModel');

function obterDadosGrafico(req, res){
  var idTime = req.params.idTime;
  historicoModel.obterDadosGrafico(idTime).then(
    function(resultado){
      res.json(resultado);
    }
  ).catch(
    function(error){
      console.error(error);
      res.sendStatus(500);
    }
  );
}

function obterDadosGrafico2(req, res){
  var idTime = req.params.idTime;
  
  historicoModel.mudarIdioma().then(
    function(resultado){
      historicoModel.obterDadosGrafico2(idTime).then( 
      function(resultado){
        res.json(resultado);
      })  
    }
  ).catch(
    function(error){
      console.error(error);
      res.sendStatus(500);
    }
  );
}

module.exports = {
  obterDadosGrafico,
  obterDadosGrafico2
}