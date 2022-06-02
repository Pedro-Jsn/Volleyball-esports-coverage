document.getElementById('btn-login').addEventListener('click', function () {
  var email = ipt_email.value;
  var senha = ipt_senha.value;

  var seguir = true;

  if (email == '' || email.indexOf('@') == -1) {
    document.getElementById('ipt_email').classList.add('input_error');
    document.getElementById('ipt_email').placeholder = 'Email inválido';
    ipt_email.value = "";
    seguir = false;
  } else {
    document.getElementById('ipt_email').classList.remove('input_error');
    document.getElementById('ipt_email').placeholder = 'Email: ';
  }

  if (senha == '') {
    document.getElementById('ipt_senha').classList.add('input_error');
    document.getElementById('ipt_senha').placeholder = 'Senha inválida';
    ipt_senha.value = "";
    seguir = false;
  } else {
    document.getElementById('ipt_senha').classList.remove('input_error');
    document.getElementById('ipt_senha').placeholder = 'Senha: ';
  }

  if (seguir) {

    fetch("/usuarios/autenticar", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        emailServer: email,
        senhaServer: senha
      })
    }).then(function (resposta) {
      console.log("ESTOU NO THEN DO entrar()!")

      if (resposta.ok) {
        console.log(resposta);

        resposta.json().then(json => {
          console.log(json);
          console.log(JSON.stringify(json));

          sessionStorage.EMAIL_USUARIO = json.email;
          sessionStorage.NOME_USUARIO = json.nome;
          sessionStorage.ID_USUARIO = json.idUsuario;

          Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Login efetuado com successo!',
            showConfirmButton: false,
            timer: 1000
          })

          setTimeout(function () {
            window.location = "./admin/perfil.html";
          }, 1000); // apenas para exibir o loading

        });

      } else {

        console.log("Houve um erro ao tentar realizar o login!");

        resposta.text().then(texto => {
          console.error(texto);
          finalizarAguardar(texto);
        });
      }

    }).catch(function (erro) {
      console.log(erro);
    })

  }
});