var express = require("express");
var router = express.Router();

var postController = require("../controllers/postController");

router.get("/qtdPosts/:idUsuario", function(req, res){
  postController.qtdPosts(req, res);
})

router.post("/inserirPost", function(req, res){
  postController.inserirPost(req, res);
})

router.get("/listarPost", function(req, res){
  postController.listarPost(req, res);
})

module.exports = router;