

window.onload = obterDadosGrafico(idTime);

window.onload = obterDadosGrafico2(idTime);

window.onload = obterEstatisticas(idTime);

function obterEstatisticas(idTime){
  fetch(`/times/listarQtdPartidas/${idTime}`, {
    cache: 'no-store',
  }).then(
    function(response){
      if (response.ok) {
        response.json().then(
          function(resultado){
            document.getElementById('qtd_partida1').innerHTML = resultado[0].qtd_partidas;
            document.getElementById('qtd_partida2').innerHTML = resultado[0].qtd_partidas;
          }
        )
      }else{
        console.error('Não foi possível obter as estatísticas do time');
      }
    }
  ).catch(
    function(error){
      console.error('Não foi possível obter as estatísticas do time', error.message);
    });

  fetch(`/times/listarEstatisticas/${idTime}`, {
    cache: 'no-store',
  }).then(
    function(response){
     if (response.ok) {
       response.json().then(
          function(resultado){
            document.getElementById('raking_atual1').innerHTML = resultado[0].posicaoAtual;
            document.getElementById('raking_atual2').innerHTML = resultado[0].posicaoAtual;

            document.getElementById('pontuacao_atual').innerHTML = resultado[0].pontuacao;
            document.getElementById('maior_rating').innerHTML = resultado[0].rating_peak;
        })
     }
    }
  )
}

function obterDadosGrafico(idTime){
   fetch(`/historico/obterDados/${idTime}`,{
    cache: 'no-store',
   }).then(
      function(response){
        if (response.ok){
          response.json().then(
            function(resultado){
              renderizarGrafico(resultado);
            })
        }else{
          console.error('Não foi possível obter os dados do gráfico');
        }
      }).catch(
        function(error){
          console.error('Não foi possível obter os dados do gráfico', error.message);
        }
      );
}

function obterDadosGrafico2(idTime) {
  fetch(`/historico/obterDados2/${idTime}`,{
    cache: 'no-store',
   }).then(
      function(response){
        if (response.ok){
          response.json().then(
            function(resultado){
              renderizarGrafico2(resultado);
            })
        }else{
          console.error('Não foi possível obter os dados do gráfico');
        }
      }).catch(
        function(error){
          console.error('Não foi possível obter os dados do gráfico', error.message);
        }
      );
}

function renderizarGrafico(resultado){
  console.log(resultado);
  const labels = [];

  const data = {
    labels: labels,
    datasets: [{
      label: '',
      display: false,
      backgroundColor: 'rgba(208, 229, 240, 0.4)',
      borderColor: 'rgb(156, 203, 226)',
      data: [],
      fill: 'start'
    }]
  };

  for(var i = 0; i < resultado.length; i++){
    labels.push(resultado[i].momento);
    data.datasets[0].data.push(resultado[i].pontuacao);
  }

  const config = {
    type: 'line',
    title: 'Rating History',
    data: data,
    options: {
      plugins: {
        legend: {
          display: false
        },
        title:{
          display: true,
          text: 'Partidas Jogadas',
          position: 'bottom'
        },
        subtitle:{
          display: true,
          text: 'Rating History',
          position: 'left'
        },
      },
      scales:{
        y:{
          ticks: {
            color: '#fff',
            padding: 20,
          },
          grid:{
            borderColor: '#fff',
            drawBorder: true,
            color: 'rgb(255, 255, 255)',
            drawTicks: false,
            borderDash: [3, 3],
          },
          display: true
        },
        x: {
          ticks:{
            color: '#fff',
          },
          grid:{
            color: '#fff',
            lineWidth: 0,
          },
          display: false,
        }
      }
    }
  };

  const myChart = new Chart(
    document.getElementById('myChart'),
    config
  );  
}

function renderizarGrafico2(resultado){
  const labels = [];

  const data = {
    labels: labels,
    datasets: [{
      label: '',
      backgroundColor: 'rgba(208, 229, 240, 0.4)',
      borderColor: 'rgb(156, 203, 226)',
      data: [],
    }]
  };

  for(var i = 0; i < resultado.length; i++){
    labels.push(resultado[i].momento_pontuacao);
    data.datasets[0].data.push(resultado[i].posicao);
  }

  const config = {
    type: 'line',
    title: 'Rating History',
    data: data,
    options: {
      plugins: {
        legend: {
          display: false
        },
        title:{
          color: '#c6c6c6',
          display: true,
          text: 'Partidas Jogadas',
          position: 'bottom'
        },
        subtitle:{
          color: '#c6c6c6 ',
          display: true,
          text: 'Premiações history',
          position: 'left'
        },
      },
      scales:{
        y:{
          ticks: {
            color: '#fff',
            padding: 20,
          },
          grid:{
            borderColor: '#fff',
            drawBorder: true,
            color: 'rgb(255, 255, 255)',
            drawTicks: false,
            borderDash: [3, 3],
          },
          display: true,
          min: 1,
          max: 10,
          reverse: true,
        },
        x: {
          ticks:{
            color: '#fff',
          },
          grid:{
            color: '#fff',
            lineWidth: 0,
          },
          display: true,
        }
      }
    }
  };

  const myChart2 = new Chart(
    document.getElementById('myChart2'),
    config
  );
}




