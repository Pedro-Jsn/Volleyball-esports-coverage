var express = require("express");
var router = express.Router();

var partidasController = require("../controllers/partidasController");

router.get("/listarPartidasHome", function(req, res){
  partidasController.listarPartidasHome(req, res);
});

router.get("/listarPartidas", function(req, res){
  partidasController.listarPartidas(req, res);
});

module.exports = router;