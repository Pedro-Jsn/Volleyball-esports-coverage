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

router.get("/listarAdmin", function(req, res){
  timesController.listarAdmin(req, res);
});

router.get("/listarAdminTime/:idTime", function(req, res){
  timesController.listarAdminTime(req, res);
});

router.post("/cadastrarTime", function(req, res){
  timesController.cadastrarTime(req, res);
});

router.put("/atualizarPontuacao/:idTime", function(req,res){
  timesController.atualizarPontuacao(req, res);
});

module.exports = router;