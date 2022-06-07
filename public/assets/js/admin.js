window.onload = listarDadosAdmin();

function listarDadosAdmin() {
  fetch(`/times/listarAdmin`, {
    cache: 'no-store'
  }).then(
    function (response) {
      if (response.ok) {
        response.json().then(
          function (resposta) {
            renderizarAdmin(resposta);
          }
        );
      } else {
        console.error(`Erro na requisição: ${response.status}`);
      }
    }).catch(function (error) {
    console.error(`Erro na requisição: ${error.message}`);
  });
}

function renderizarAdmin(resposta) {
  for (i = 0; i < resposta.length; i++) {
    document.getElementById('slc_time1_partida').innerHTML += `
      <option value="${resposta[i].idTime}">${resposta[i].nome}</option>
    `;

    document.getElementById('slc_time2_partida').innerHTML += `
      <option value="${resposta[i].idTime}">${resposta[i].nome}</option>
    `;

    document.getElementById('slc_time_premiacao').innerHTML += `
      <option value="${resposta[i].idTime}">${resposta[i].nome}</option>
    `;

    document.getElementById('slc_time_pontuacao').innerHTML += `
      <option value="${resposta[i].idTime}">${resposta[i].nome}</option>
    `;
  }
}

function listarTimePontuacao() {
  var idTime = slc_time_pontuacao.value;

  fetch(`/times/listarAdminTime/${idTime}`, {
    cache: 'no-store'
  }).then(
    function (response) {
      if (response.ok) {
        response.json().then(
          function (resposta) {
            nomeTime_pontuacao.innerHTML = resposta[0].nome;
            siglaTime_pontuacao.innerHTML = resposta[0].sigla;
          }
        );
      } else {
        console.error(`Erro na requisição: ${response.status}`);
      }
    })
}

function listarTimePremiacao() {
  var idTime = slc_time_premiacao.value;

  fetch(`/times/listarAdminTime/${idTime}`, {
    cache: 'no-store'
  }).then(
    function (response) {
      if (response.ok) {
        response.json().then(
          function (resposta) {
            nomeTime_premiacao.innerHTML = resposta[0].nome;
            siglaTime_premiacao.innerHTML = resposta[0].sigla;
          }
        );
      } else {
        console.error(`Erro na requisição: ${response.status}`);
      }
    })
}

function selecionarPtime() {
  var idTime = slc_time1_partida.value;

  fetch(`/times/listarAdminTime/${idTime}`, {
    cache: 'no-store'
  }).then(
    function (response) {
      if (response.ok) {
        response.json().then(
          function (resposta) {
            nomeTime1.innerHTML = resposta[0].nome;
            siglaTime1.innerHTML = resposta[0].sigla;
          }
        );
      } else {
        console.error(`Erro na requisição: ${response.status}`);
      }
    })
}

function selecionarStime() {
  var idTime = slc_time2_partida.value;

  fetch(`/times/listarAdminTime/${idTime}`, {
    cache: 'no-store'
  }).then(
    function (response) {
      if (response.ok) {
        response.json().then(
          function (resposta) {
            nomeTime2.innerHTML = resposta[0].nome;
            siglaTime2.innerHTML = resposta[0].sigla;
          }
        );
      } else {
        console.error(`Erro na requisição: ${response.status}`);
      }
    })
}

var pos = 1;

function continuar() {
  if (pos == 1) {
    if (ipt_nomeTime.value == '' || ipt_sigla.value == '') {
      Swal.fire({
        position: 'center',
        icon: 'error',
        title: 'Insira os valores corretamente!',
        showConfirmButton: false,
        timer: 1500
      });
    } else {
      inicio.style.display = 'none';
      jogadores.style.display = 'flex';
      pos++;
    }
  } else if (pos == 2) {
    if (ipt_jogador1.value == '' || ipt_jogador2.value == '' || ipt_jogador3.value == '' || ipt_jogador4.value == '' || ipt_jogador5.value == '' || ipt_jogador6.value == '') {
      Swal.fire({
        position: 'center',
        icon: 'error',
        title: 'Insira os valores corretamente!',
        showConfirmButton: false,
        timer: 1500
      });
    } else {
      jogadores.style.display = 'none';
      final.style.display = 'flex';
      btn_time.innerHTML = 'Cadastrar';
      pos++;
    }
  } else {
    if (ipt_treinador.value == '' || ipt_pontuacao_time.value == '') {
      Swal.fire({
        position: 'center',
        icon: 'error',
        title: 'Insira os valores corretamente!',
        showConfirmButton: false,
        timer: 1500
      });
    } else {
      cadastrarTime();
    }
  }
}

function cadastrarTime() {
  var nomeTime = (ipt_nomeTime.value);
  var sigla = (ipt_sigla.value).toUpperCase();
  var jogadoresTime = [{
    nome: (ipt_jogador1.value).toUpperCase(),
  }, {
    nome: (ipt_jogador2.value).toUpperCase(),
  }, {
    nome: (ipt_jogador3.value).toUpperCase(),
  }, {
    nome: (ipt_jogador4.value).toUpperCase(),
  }, {
    nome: (ipt_jogador5.value).toUpperCase(),
  }, {
    nome: (ipt_jogador6.value).toUpperCase(),
  }];
  var treinador = ipt_treinador.value;
  var pontuacao = ipt_pontuacao_time.value;

  fetch(`/times/cadastrarTime`, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      nomeTimeServer: nomeTime,
      siglaServer: sigla,
      jogadoresTimeServer: jogadoresTime,
      treinadorServer: treinador,
      pontuacaoServer: pontuacao
    })
  }).then(
    function (response) {
      if (response.ok) {
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Cadastro realizado com sucesso!',
          showConfirmButton: false,
          timer: 1500
        });

        setTimeout(function () {
          window.location.reload();
        }, 1510);
      } else {
        Swal.fire({
          position: 'center',
          icon: 'error',
          title: 'Erro ao cadastrar o time!',
          showConfirmButton: false,
          timer: 1500
        });
      }
    }
  ).catch(function (error) {
    console.log(error);
  });
}

function cadastrarPartida() {
  var data = ipt_data_partida.value;

  var novaData = data.replace(/t/i, ' ');

  var time1 = slc_time1_partida.value;
  var time2 = slc_time2_partida.value;

  fetch(`/partidas/cadastrarPartida`, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      dataServer: novaData,
      time1Server: time1,
      time2Server: time2
    })
  }).then(
    function (response) {
      if (response.ok) {
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Partida cadastrada com sucesso!',
          showConfirmButton: false,
          timer: 1500
        });

        setTimeout(function () {
          window.location.reload();
        }, 1510);
      } else {
        Swal.fire({
          position: 'center',
          icon: 'error',
          title: 'Erro ao cadastrar a partida!',
          showConfirmButton: false,
          timer: 1500
        });
      }
    }
  ).catch(function (error) {
    console.log(error);
  });

}

function cadastrarPremiacao() {
  var idTime = slc_time_premiacao.value;
  var valor = ipt_valor_premiacao.value;

  var data = ipt_data_premiacao.value;

  var novaData = data.replace(/t/i, ' ');

  fetch(`/premiacao/cadastrarPremiacao`, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      idTimeServer: idTime,
      valorServer: valor,
      dataServer: novaData
    })
  }).then(
    function (response) {
      if (response.ok) {
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Premiação cadastrada com sucesso!',
          showConfirmButton: false,
          timer: 1500
        });

        setTimeout(function () {
          window.location.reload();
        }, 1510);
      } else {
        Swal.fire({
          position: 'center',
          icon: 'error',
          title: 'Erro ao cadastrar a premiação!',
          showConfirmButton: false,
          timer: 1500
        });
      }
    }
  ).catch(function (error) {
    console.log(error);
  });
}

function cadastrarPontuacao(){
  var idTime = slc_time_pontuacao.value;
  var pontuacao = ipt_pontuacao.value;

  var data = ipt_data_pontuacao.value;
  var novaData = data.replace(/t/i, ' ');

  fetch(`/times/atualizarPontuacao/${idTime}`, {
    method: 'PUT',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      pontuacaoServer: pontuacao,
      dataServer: novaData
    })
  }).then(
    function (response) {
      if (response.ok) {
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Pontuação atualizada com sucesso!',
          showConfirmButton: false,
          timer: 1500
        });

        setTimeout(function () {
          window.location.reload();
        }, 1510);
      } else {
        Swal.fire({
          position: 'center',
          icon: 'error',
          title: 'Erro ao atualizar a pontuação!',
          showConfirmButton: false,
          timer: 1500
        });
      }
    }).catch(function (error) {
        console.log(error);
      });
}

function time() {
  document.getElementsByClassName('active')[0].classList.remove('active');

  document.getElementById('time').classList.add('active');
  document.getElementById('container-time').style.display = 'flex';
  document.getElementById('container-partida').style.display = 'none';
  document.getElementById('container-premiacao').style.display = 'none';
}

function partida() {
  document.getElementsByClassName('active')[0].classList.remove('active');

  document.getElementById('partida').classList.add('active');
  document.getElementById('container-partida').style.display = 'flex';
  document.getElementById('container-time').style.display = 'none';
  document.getElementById('container-premiacao').style.display = 'none';
}

function premiacao() {
  document.getElementsByClassName('active')[0].classList.remove('active');

  document.getElementById('premiacao').classList.add('active');
  document.getElementById('container-premiacao').style.display = 'flex';
  document.getElementById('container-partida').style.display = 'none';
  document.getElementById('container-time').style.display = 'none';
}