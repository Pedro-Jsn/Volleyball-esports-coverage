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
  for (i = 0; i < resp.length; i++) {
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