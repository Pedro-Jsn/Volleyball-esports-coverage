var timesModel = require('../models/timesModel');
var historicoModel = require('../models/historicoModel');

function listarTimes(req, res){
  timesModel.listarTimes().then(
    function(resultado){
      if (resultado.length > 0) {
        res.status(200).json(resultado);
      }else{
        console.log("Não há times cadastrados");
      }
    }
  ).catch(
    function(erro){
      console.log(erro);
      console.log(
        "\nHouve um erro ao listar as partidas! Erro: ",
        erro.sqlMessage
      );
      res.status(500).json(erro.sqlMessage);
    }
  )
}

function listarTimePerfil(req, res){
  var idTime = req.params.idTime;

  timesModel.listarTimePerfil(idTime).then(
    function(resultado){
      if (resultado.length > 0) {
        res.status(200).json(resultado);
      }else{
        console.log("Não há times cadastrados");
      }
    }).catch(
    function(erro){
      console.log(erro);
      console.log(
        "\nHouve um erro ao listar as partidas! Erro: ",
        erro.sqlMessage
      );
      res.status(500).json(erro.sqlMessage);
    });
}

function qtd_partidas_jogadas(req, res){
  var idTime = req.params.idTime;

  timesModel.qtd_partidas_jogadas(idTime).then(
    function(resultado){
        res.status(200).json(resultado);
    }).catch(
    function(erro){
      console.log(erro);
      console.log(
        "\nHouve um erro ao listar as partidas! Erro: ",
        erro.sqlMessage
      );
      res.status(500).json(erro.sqlMessage);
    });
}

function estatisticaTime(req, res){
  var idTime = req.params.idTime;

  timesModel.estatisticaTime(idTime).then(
    function(resultado){
        res.status(200).json(resultado);
    }).catch(
    function(erro){
      console.log(erro);
      console.log(
        "\nHouve um erro ao listar as partidas! Erro: ",
        erro.sqlMessage
      );
      res.status(500).json(erro.sqlMessage);
    });
}

function listarAdmin(req, res){
  timesModel.listarAdmin().then(
    function(resultado){
      if (resultado.length > 0) {
        res.status(200).json(resultado);
      }else{
        console.log("Não há times cadastrados");
      }
    }
  ).catch(
    function(erro){
      console.log(erro);
      console.log(
        "\nHouve um erro ao listar as partidas! Erro: ",
        erro.sqlMessage
      );
      res.status(500).json(erro.sqlMessage);
    }
  );
}

function listarAdminTime(req, res){
  var idTime = req.params.idTime;

  timesModel.listarAdminTime(idTime).then(
    function(resultado){
      if (resultado.length > 0) {
        res.status(200).json(resultado);
      }else{
        console.log("Não há times cadastrados");
      }
    }
  ).catch(
    function(erro){
      console.log(erro);
      console.log(
        "\nHouve um erro ao listar as partidas! Erro: ",
        erro.sqlMessage
      );
      res.status(500).json(erro.sqlMessage);
    }
  );
}

function cadastrarTime(req, res){
  var nomeTime = req.body.nomeTimeServer;
  var sigla = req.body.siglaServer;
  var jogadoresTime = req.body.jogadoresTimeServer;
  var treinador = req.body.treinadorServer;
  var pontuacao = req.body.pontuacaoServer;

  timesModel.cadastrarTime(nomeTime, sigla, treinador, pontuacao).then(
    function(){
      timesModel.pegarIdTime().then(
        function(resultado){
          var id = resultado[0].id;
          
          timesModel.cadastrarHistoricoTime(pontuacao, id).then(
            function(resultado){
              res.status(200).json(resultado);
            }
          );


          for(i = 0; i < jogadoresTime.length - 1; i++){
            let nome = jogadoresTime[i].nome;
            timesModel.cadastrarJogador(nome, id).then(
              function(){
                console.log("Jogador cadastrado com sucesso!");
              }).catch(
              function(erro){
                console.log(erro);
                console.log(
                  "\nHouve um erro ao cadastrar o jogador! Erro: ",
                  erro.sqlMessage
                );
                res.status(500).json(erro.sqlMessage);
              });
          }
          let nome = jogadoresTime[jogadoresTime.length - 1].nome;
          timesModel.cadastrarJogador(nome, id).then(
            function(resultado){
              res.status(200).json(resultado);
            }
          ).catch(
            function(erro){
              console.log(erro);
              console.log(
                "\nHouve um erro ao cadastrar o jogador! Erro: ",
                erro.sqlMessage
              );
              res.status(500).json(erro.sqlMessage);
            });
        }).catch(
        function(erro){
          console.log(erro);
          console.log(
            "\nHouve um erro ao pegar o id! Erro: ",
            erro.sqlMessage
          );
          res.status(500).json(erro.sqlMessage);
        });
    }).catch(
    function(erro){
      console.log(erro);
      console.log(
        "\nHouve um erro ao cadastrar o time! Erro: ",
        erro.sqlMessage
      );
      res.status(500).json(erro.sqlMessage);
    });
}

function atualizarPontuacao(req, res){
  var idTime = req.params.idTime;
  var pontuacao = req.body.pontuacaoServer;
  var data = req.body.dataServer;

  timesModel.atualizarPontuacao(idTime, pontuacao).then(
    function(){
      historicoModel.atualizarPontuacao(pontuacao, data, idTime).then(
        function(resultado){
          res.status(200).json(resultado);
        }
      ).catch(
        function(erro){
          console.log(erro);
          console.log(
            "\nHouve um erro ao atualizar a pontuação! Erro: ",
            erro.sqlMessage
          );
          res.status(500).json(erro.sqlMessage);
        });
    }).catch(
    function(erro){
      console.log(erro);
      console.log(
        "\nHouve um erro ao atualizar a pontuação! Erro: ",
        erro.sqlMessage
      );
      res.status(500).json(erro.sqlMessage);
    });
}

module.exports = {
  listarTimes,
  listarTimePerfil,
  qtd_partidas_jogadas,
  estatisticaTime,
  cadastrarTime,
  listarAdmin,
  listarAdminTime,
  atualizarPontuacao
}