var express = require("express");
var router = express.Router();

var premiacaoController = require("../controllers/premiacaoController");

router.get("/listarPremiacoes/:idTime", function(req, res){
  premiacaoController.listarPremiacoes(req, res);
})

module.exports = router;