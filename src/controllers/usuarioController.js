var usuarioModel = require('../models/usuarioModel');


function cadastrar(req, res) {
  var nome = req.body.nomeServer;
  var email = req.body.emailServer;
  var senha = req.body.senhaServer;

  if (nome == undefined || email == undefined || senha == undefined) {
    res.status(400).send("Preencha todos os campos");
  } else {
    usuarioModel.cadastrar(nome, email, senha).then(
      function (resultado) {
        res.json(resultado);
      }).catch(
      function (error) {
        console.log(erro);
        console.log(
          "\nHouve um erro ao realizar o cadastro! Erro: ",
          erro.sqlMessage
        );
        res.status(500).json(erro.sqlMessage);
      }
    );
  }
}

function autenticar(req, res) {
  var email = req.body.emailServer;
  var senha = req.body.senhaServer;

  if (email == undefined || senha == undefined) {
    res.status(400).send("Preencha todos os campos");
  } else {
    usuarioModel.autenticar(email, senha)
      .then(
        function (resultado) {
          console.log(`\nResultados encontrados: ${resultado.length}`);
          console.log(`Resultados: ${JSON.stringify(resultado)}`); // transforma JSON em String

          if (resultado.length == 1) {
            console.log(resultado);
            res.json(resultado[0]);
          } else if (resultado.length == 0) {
            res.status(403).send("Email e/ou senha inválido(s)");
          } else {
            res.status(403).send("Mais de um usuário com o mesmo login e senha!");
          }
        }
      ).catch(
        function (erro) {
          console.log(erro);
          console.log("\nHouve um erro ao realizar o login! Erro: ", erro.sqlMessage);
          res.status(500).json(erro.sqlMessage);
        }
      );
  }
}


module.exports = {
  cadastrar,
  autenticar
}