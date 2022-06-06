function carregarPartidas(){
  fetch(`/partidas/listarPartidas`, {
    cache: 'no-store'
  }).then(function (response) {
    if (response.ok) {
      response.json().then(function (resposta) {
        renderizarPartidas(resposta)
      });
    }
  })
}

function renderizarPartidas(resp){
  for (var i = 0; i < resp.length; i++) {
    document.getElementById('container-partidas').innerHTML += `
    <div class="cards-partidas">
      <div class="comeco">
        <span class="horario">${resp[i].tempo} HR</span>
        <div class="matches-times">
          <div class="time">
            <i class="fa-solid fa-volleyball"></i>
            <span>${resp[i].time1}</span>
          </div>
          <div class="time">
            <i class="fa-solid fa-volleyball"></i>
            <span>${resp[i].time2}</span>
          </div>
        </div>
        <div class="result-partida">
          <div class="time">
            <span> - </span>
          </div>
          <div class="time">
            <span> - </span>
          </div>
        </div>
      </div>
      <div class="fim">
        <div class="stats">
          <span class="title">Situação:</span>
          <span class="text">${resp[i].situacao}</span>
        </div>
        <div class="tipo">
          <span class="title">Jogo de vôlei:</span>
          <img src="assets/img/bola-de-voleibol-1.png" alt="">
        </div>
      </div>
    </div>   
    `;
  }
}