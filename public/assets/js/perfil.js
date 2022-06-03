nome.innerHTML = sessionStorage.NOME_USUARIO;

var idUsuario = sessionStorage.ID_USUARIO; 

window.onload = qtd_posts(idUsuario);

function qtd_posts(idUsuario){
  fetch(`/posts/qtdPosts/${idUsuario}`, {
    cache: 'no-store'
  }).then(
    function(response){
      if (response.ok) {
        response.json().then(function(resposta){
          num_posts.innerHTML = resposta[0].qt_posts;
        })
      }else{
        console.log("Nenhum post encontrado");
      }
      }
    ).catch(function(error){
      console.error(`Erro na obtenção das qtd de posts: ${error.message}`);   
    });
}

function cadastrarPost(){
  var titulo = ipt_titulo.value;
  var descricao = ipt_desc.value;

  fetch(`/posts/inserirPost`, {
    method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        idUsuarioServer: idUsuario,
        tituloServer: titulo,
        descricaoServer: descricao
      })
  }).then(
    function(resposta){
      console.log("resposta: ", resposta);

      if (resposta.ok) {
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Post feito com sucesso!',
          showConfirmButton: false,
          timer: 1500
        })

        setTimeout(() => {
          window.location.reload();
        }, 1500);
      } else {
        Swal.fire({
          position: 'center',
          icon: 'error',
          title: 'Post não realizado!',
          showConfirmButton: false,
          timer: 1500
        });

        setTimeout(() => {
          ipt_titulo.value = "";
          ipt_desc.value = "";
        }, 1505);

        throw ("Houve um erro ao tentar realizar o cadastro!");
      }
    }).catch(function (resposta) {
      console.log(`#ERRO: ${resposta}`);
    });

}