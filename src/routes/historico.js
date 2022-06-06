var express = require("express");
var router = express.Router();

var historicoController = require("../controllers/historicoController");

router.get('/obterDados/:idTime', function(req, res){
  historicoController.obterDadosGrafico(req, res);
});

router.get('/obterDados2/:idTime', function(req, res){
  historicoController.obterDadosGrafico2(req, res);
});

module.exports = router;