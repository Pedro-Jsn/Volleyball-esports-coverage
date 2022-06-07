var express = require("express");
var router = express.Router();

var premiacaoController = require("../controllers/premiacaoController");

router.get("/listarPremiacoes/:idTime", function(req, res){
  premiacaoController.listarPremiacoes(req, res);
});

router.post("/cadastrarPremiacao", function(req, res){
  premiacaoController.cadastrarPremiacao(req, res);
});

module.exports = router;