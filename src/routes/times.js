var express = require("express");
var router = express.Router();

var timesController = require('../controllers/timesController');

router.get("/listarTimes", function(req, res){
  timesController.listarTimes(req, res);
});

router.get("/listarTimePerfil/:idTime", function(req, res){
  timesController.listarTimePerfil(req, res);
});

router.get("/listarQtdPartidas/:idTime", function(req, res){
  timesController.qtd_partidas_jogadas(req, res);
});

router.get("/listarEstatisticas/:idTime", function(req, res){
  timesController.estatisticaTime(req, res);
});

module.exports = router;