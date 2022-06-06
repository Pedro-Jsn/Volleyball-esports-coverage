function carregarTimes(){
  fetch(`/times/listarTimes`, {
    cache: 'no-store',
  }).then(function (response) {
    if (response.ok) {
      response.json().then(
        function(resultado){
          renderizarTimes(resultado);
      })
    } else{
      console.error('Não foi possível carregar os times');
    }
  }).catch(function (error) {
    console.error('Não foi possível carregar os times');
  });
}

function renderizarTimes(resp){
  var premiacao = 0
  for(var i = 0; resp.length; i++){
    if (resp[i].valor_ganho == null) {
      premiacao = 0
    }else{
      premiacao = resp[i].valor_ganho
    }

    document.getElementById("container-times").innerHTML += `
    <div class="cards-partidas" onclick="rendirecionarTime(${resp[i].idTime})">
      <div class="comeco">
        <div class="ranking">
          <i class="fa fa-certificate"></i>
          <span>${resp[i].posicao}</span>
        </div>
        <div class="time">
          <i class="fa-solid fa-volleyball"></i>
          <span>${resp[i].nome}</span>
        </div>
        <div class="pontuacao">
          <span>${resp[i].pontuacao}</span>
        </div>
      </div>
      <div class="fim">
        <div class="price">
          <span>R$${premiacao}</span>
        </div>
      </div>
    </div>
    `;
  }
}

function rendirecionarTime(idTime){
  window.location.href = `visualizarTime.html?idTime=${idTime}`;
}