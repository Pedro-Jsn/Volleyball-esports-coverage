function carregarPosts() {

  fetch(`/posts/listarPost`, {
    cache: 'no-store'
  }).then(function (response) {
    if (response.ok) {
      response.json().then(function (resposta) {
        renderizarPosts(resposta)
      });
    }
  })

}

function renderizarPosts(resp) {
  for (var i = 0; i < resp.length; i++) {
    document.getElementById('div_posts').innerHTML += `
      <div class="card-post">
        <div class="title-card">
          <span class="title">${resp[i].titulo}</span>
          <p>Feito por: <span class="people">${resp[i].nome}</span></p>
        </div>
    
        <div class="describe-card">
          <p>${resp[i].descricao}</p>
        </div>
      </div>   
    `;
  }
}

function carregarPartidas(){
  fetch(`/partidas/listarPartidasHome`, {
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
    document.getElementById('matches-upcoming').innerHTML += `
      <div class="cards-matches">
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
        <div class="matches-tempo">
          <p>${resp[i].tempo}</p>
        </div>
      </div>   
    `;
  }
}