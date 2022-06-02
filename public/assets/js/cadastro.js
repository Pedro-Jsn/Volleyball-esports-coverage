document.getElementById('btn').addEventListener('click', function () {
  var nome = ipt_nome.value;
  var email = ipt_email.value;
  var senha = ipt_senha.value;
  var confirmarSenha = ipt_confirm.value;
  var seguir = true;

  if (nome == '' || nome.length < 3) {
    document.getElementById('ipt_nome').classList.add('input_error');
    document.getElementById('ipt_nome').placeholder = 'Nome inválido';
    ipt_nome.value = "";
    seguir = false;
  } else {
    document.getElementById('ipt_nome').classList.remove('input_error');
    document.getElementById('ipt_nome').placeholder = 'Nome: ';
  }

  if (email == '' || email.indexOf('@') == -1) {
    document.getElementById('ipt_email').classList.add('input_error');
    document.getElementById('ipt_email').placeholder = 'Email inválido';
    ipt_email.value = "";
    seguir = false;
  } else {
    document.getElementById('ipt_email').classList.remove('input_error');
    document.getElementById('ipt_email').placeholder = 'Email: ';
  }

  if (senha == '' || senha.length < 5) {
    document.getElementById('ipt_senha').classList.add('input_error');
    document.getElementById('ipt_senha').placeholder = 'Senha inválida';
    ipt_senha.value = "";
    seguir = false;
  } else {
    document.getElementById('ipt_senha').classList.remove('input_error');
    document.getElementById('ipt_senha').placeholder = 'Senha: ';
  }

  if (senha != confirmarSenha) {
    document.getElementById('ipt_confirm').classList.add('input_error');
    document.getElementById('ipt_confirm').placeholder = 'Senhas não conferem';
    ipt_confirm.value = "";
    seguir = false;
  } else {
    document.getElementById('ipt_confirm').classList.remove('input_error');
    document.getElementById('ipt_confirm').placeholder = 'Confirmar senha: ';
  }

  if (seguir) {

    fetch("/usuarios/cadastrar", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        // crie um atributo que recebe o valor recuperado aqui
        // Agora vá para o arquivo routes/usuario.js
        nomeServer: nome,
        emailServer: email,
        senhaServer: senha
      })
    }).then(function (resposta) {

      console.log("resposta: ", resposta);

      if (resposta.ok) {
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Cadastro realizado com successo!',
          showConfirmButton: false,
          timer: 1500
        })

        setTimeout(() => {
          window.location = "login.html";
        }, 1500);
      } else {
        Swal.fire({
          position: 'center',
          icon: 'error',
          title: 'Cadastro não realizado!',
          showConfirmButton: false,
          timer: 1500
        });

        setTimeout(() => {
          ipt_nome.value = "";
          ipt_email.value = "";
          ipt_senha.value = "";
          ipt_confirm.value = "";
        }, 1505);

        throw ("Houve um erro ao tentar realizar o cadastro!");
      }
    }).catch(function (resposta) {
      console.log(`#ERRO: ${resposta}`);
    });
  }

});