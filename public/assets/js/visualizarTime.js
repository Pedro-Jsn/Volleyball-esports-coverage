var parametro = new URLSearchParams(window.location.search);

var idTime = parametro.get('idTime');

window.onload = carregarPerfilTime(idTime);

window.onload = carregarPremiacoes(idTime);

function carregarPerfilTime(idTime){
  fetch(`/times/listarTimePerfil/${idTime}`, {
    cache: 'no-store',
  }).then(function(response){
    if (response.ok) {
      response.json().then(function(resposta){
        
        renderizarTime(resposta);
      });
    }else{
      console.error('Não foi possível obter o time');
    }
  }).catch(function(error){
    console.error('Erro na obtenção dos dados.', error);
  });
}

function renderizarTime(resp) {
  for(var i=0; i<= 0; i++){
    document.getElementById('infos-perfil-text').innerHTML += `
      <div>
        <div class="team-name">
          <h1 class="title">${resp[0].nomeTime}</h1>
          <h2 class="title tag">${resp[0].sigla}</h2>
        </div>
      </div>
    `;
  }

    document.getElementById('col-equipe').innerHTML = `
      <div class="label">Jogadores</div>

      <div id="col-jogadores" style="display: flex; flex-wrap: wrap;">

      </div> 
    `;
  for(var i=0; i < resp.length; i++){
    if (resp[i].nomeJogador == null) {
      document.getElementById('col-jogadores').innerHTML += ``;
    }else{
      document.getElementById('col-jogadores').innerHTML += ` 
          <div class="jogador">
            <div style="display: flex; align-items: center;">
              <div class="jogador-img">
                <img src="assets/img/time.png" alt="">
              </div>
              <div class="jogador-name">
                <div class="nome">
                  ${resp[i].nomeJogador}
                </div>
              </div>
            </div>
          </div>
      `;
    }
  }

  if (resp[0].treinador == null) {
    document.getElementById('col-equipe').innerHTML += ``;
  }else{
    document.getElementById('col-equipe').innerHTML += `
        <div class="label">Treinador</div>

        <div class="jogador">
          <div style="display: flex; align-items: center;">
            <div class="jogador-img">
              <img src="assets/img/time.png" alt="">
            </div>
            <div class="jogador-name">
              <div class="nome">
                ${resp[0].treinador}
              </div>
            </div>
          </div>
        </div>
      `;
  }
}

function carregarPremiacoes(idTime){
  fetch(`/premiacao/listarPremiacoes/${idTime}`, {
    cache: 'no-store',
  }).then(function(response){
    if (response.ok) {
      response.json().then(function(resposta){
        
        renderizarPremiacoes(resposta);
      });
    }else{
      console.error('Não foi possível obter as premiações');
    }
  }).catch(function(error){
    console.error('Erro na obtenção dos dados.', error);
  });
}

var premiacoes = [];
function renderizarPremiacoes(resposta){
  for(var i = 0; i < resposta.length; i++){
    premiacoes.push(Number(resposta[i].valor));
  }

  var valorTotal = 0;
  for(var i = 0; i < premiacoes.length; i++){
    valorTotal += premiacoes[i];
  }

  document.getElementById('span_total_ganho').innerHTML = "R$" + valorTotal.toFixed(2);
}

function step(btn){
    var myImput = document.getElementById('ipt_number');
    var id = btn.getAttribute('id');
    var min = myImput.getAttribute('min');
    var step = myImput.getAttribute('step');
    var val = myImput.getAttribute('value');
    var calcStep = (id == "mais") ? (step*1) : (step*-1);

    var novoVal = parseInt(val) + calcStep;

    if (novoVal >= min) {
        myImput.setAttribute("value", novoVal);
    }
}

function verPremiacao(){
  var numero = ipt_number.value;

  if(numero > premiacoes.length){
    div_msg.innerHTML = "Não há premiações para este número";
    div_msg.style.color = 'red';
  }else{
    var premio = premiacoes[numero - 1];
    div_msg.innerHTML = `A ${numero}° premiação desse time foi R$${premio.toFixed(2)}`;
    div_msg.style.color = 'green';
  }
}

function pontuacao(){
  document.getElementById('grafico_um').classList.add('active-grafico');
  document.getElementById('grafico_dois').classList.remove('active-grafico');
  document.getElementById('rating').classList.add('active');
  document.getElementById('historico').classList.remove('active');
}

function posicao(){
  document.getElementById('grafico_dois').classList.add('active-grafico');
  document.getElementById('grafico_um').classList.remove('active-grafico');
  document.getElementById('rating').classList.remove('active');
  document.getElementById('historico').classList.add('active');

  setTimeout(() => {
    window.scrollTo(0, document.body.scrollHeight);
  }, 5); 
}
