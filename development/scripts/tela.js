function Tela() {
	var self = this;

	self.telaAtual;
	self.telaAnterior;

	var telaAtualElem;
	var telaAnteriorElem;

	var telaRolagemElem = $('#telaRolagem')[0];
	var travarBotao = false;

	// Proxy de acesso a função de mudança de tela.
	self.mudarPara = function(nomeTela, direcao, callbackFunc){
		mudarTela(nomeTela, direcao, callbackFunc);
	}

	// Função para mudar de uma tela para outra.
	function mudarTela(nomeTela, direcao, callbackFunc) {
		if(travarBotao || nomeTela == self.telaAtual) return;

		// Saindo do campo que estiver ativo, caso exista um.
		document.activeElement.blur();

		self.telaAnterior = self.telaAtual;
		self.telaAtual = nomeTela;

		if(!self.telaAnterior) telaAtualElem = $('.containerCentro')[0];
		else {
			telaAtualElem = direcao ? $('.containerDireita')[0] : $('.containerEsquerda')[0];
			telaAnteriorElem = $('.containerCentro')[0];
		}

		switch(self.telaAtual) {
			case 'telaInicio':
				ajax.chamada('modules/inicio.html', function(resp){
					telaAtualElem.innerHTML = resp;

					telaAtualElem.querySelector('#btnWod').addEventListener('click', function(){
						mudarTela('telaListaWod', 1);
					}, false);
					telaAtualElem.querySelector('#btnBenchmark').addEventListener('click', function(){
						mudarTela('telaListaBenchmark', 1);
					}, false);
					telaAtualElem.querySelector('#btnPR').addEventListener('click', function(){
						mudarTela('telaListaPR', 1);
					}, false);
					telaAtualElem.querySelector('#btnTimer').addEventListener('click', function(){
						mudarTela('telaListaTimer', 1);
					}, false);
					telaAtualElem.querySelector('#btnCompCorporal').addEventListener('click', function(){
						mudarTela('telaListaCompCorporal', 1);
					}, false);
				});
				break;
			case 'telaListaWod':
				ajax.chamada('modules/lista-wod.html', function(resp){
					telaAtualElem.innerHTML = resp;

					telaAtualElem.querySelector('.voltar').addEventListener('click', function(){
						mudarTela('telaInicio', 0);
					}, false);

					telaAtualElem.querySelector('.novo').addEventListener('click', function(){
						mudarTela('telaNovoWod', 1);
					}, false);

					var listaElementosWod = telaAtualElem.querySelectorAll('li');
					for (var ind = 0; ind < listaElementosWod.length; ind++) {
						listaElementosWod[ind].addEventListener('click', function(){
							mudarTela('telaNovoWod', 1, function(){
								var tituloElem = telaAtualElem.querySelector('.titulo');
								tituloElem.innerText = 'Resultado';
							});
						}, false);
					}
				});
				break;
			case 'telaNovoWod':
				ajax.chamada('modules/adicionar-wod.html', function(resp){
					telaAtualElem.innerHTML = resp;

					telaAtualElem.querySelector('.voltar').addEventListener('click', function(){
						mudarTela('telaListaWod', 0);
					}, false);
				});
				break;
			case 'telaListaBenchmark':
				ajax.chamada('modules/lista-benchmark.html', function(resp){
					telaAtualElem.innerHTML = resp;

					telaAtualElem.querySelector('.voltar').addEventListener('click', function(){
						mudarTela('telaInicio', 0);
					}, false);

					telaAtualElem.querySelector('.novo').addEventListener('click', function(){
						mudarTela('telaNovoBenchmark', 1);
					}, false);

					var listaElementosBenchmark = telaAtualElem.querySelectorAll('li');
					for (var ind = 0; ind < listaElementosBenchmark.length; ind++) {
						listaElementosBenchmark[ind].addEventListener('click', function(){
							mudarTela('telaBenchmark', 1);
						}, false);
					}
				});
				break;
			case 'telaNovoBenchmark':
				ajax.chamada('modules/adicionar-benchmark.html', function(resp){
					telaAtualElem.innerHTML = resp;

					telaAtualElem.querySelector('.voltar').addEventListener('click', function(){
						mudarTela('telaListaBenchmark', 0);
					}, false);
				});
				break;
			case 'telaBenchmark':
				ajax.chamada('modules/benchmark.html', function(resp){
					telaAtualElem.innerHTML = resp;

					telaAtualElem.querySelector('.voltar').addEventListener('click', function(){
						mudarTela('telaListaBenchmark', 0);
					}, false);

					telaAtualElem.querySelector('.novo').addEventListener('click', function(){
						mudarTela('telaResultadoBenchmark', 1);
					}, false);
				});
				break;
			case 'telaResultadoBenchmark':
				ajax.chamada('modules/resultado-benchmark.html', function(resp){
					telaAtualElem.innerHTML = resp;

					telaAtualElem.querySelector('.voltar').addEventListener('click', function(){
						mudarTela('telaBenchmark', 0);
					}, false);
				});
				break;
			case 'telaListaPR':
				ajax.chamada('modules/lista-pr.html', function(resp){
					telaAtualElem.innerHTML = resp;

					telaAtualElem.querySelector('.voltar').addEventListener('click', function(){
						mudarTela('telaInicio', 0);
					}, false);

					telaAtualElem.querySelector('.novo').addEventListener('click', function(){
						mudarTela('telaNovoPR', 1);
					}, false);

					var listaElementosPR = telaAtualElem.querySelectorAll('li');
					for (var ind = 0; ind < listaElementosPR.length; ind++) {
						listaElementosPR[ind].addEventListener('click', function(){
							mudarTela('telaPR', 1);
						}, false);
					}
				});
				break;
			case 'telaNovoPR':
				ajax.chamada('modules/adicionar-pr.html', function(resp){
					telaAtualElem.innerHTML = resp;

					telaAtualElem.querySelector('.voltar').addEventListener('click', function(){
						mudarTela('telaListaPR', 0);
					}, false);
				});
				break;
			case 'telaPR':
				ajax.chamada('modules/pr.html', function(resp){
					telaAtualElem.innerHTML = resp;

					telaAtualElem.querySelector('.voltar').addEventListener('click', function(){
						mudarTela('telaListaPR', 0);
					}, false);

					telaAtualElem.querySelector('.novo').addEventListener('click', function(){
						mudarTela('telaResultadoPR', 1);
					}, false);
				});
				break;
			case 'telaResultadoPR':
				ajax.chamada('modules/resultado-pr.html', function(resp){
					telaAtualElem.innerHTML = resp;

					telaAtualElem.querySelector('.voltar').addEventListener('click', function(){
						mudarTela('telaPR', 0);
					}, false);
				});
				break;
			case 'telaListaTimer':
				ajax.chamada('modules/lista-timer.html', function(resp){
					telaAtualElem.innerHTML = resp;

					telaAtualElem.querySelector('.voltar').addEventListener('click', function(){
						mudarTela('telaInicio', 0);
					}, false);

					telaAtualElem.querySelector('.novo').addEventListener('click', function(){
						mudarTela('telaNovoTimer', 1);
					}, false);

					var listaElementosTimer = telaAtualElem.querySelectorAll('ul.timer li');
					for (var ind = 0; ind < listaElementosTimer.length; ind++) {
						listaElementosTimer[ind].addEventListener('click', function(){
							mudarTela('telaTimer', 1);
						}, false);
					}
				});
				break;
			case 'telaTimer':
				ajax.chamada('modules/timer.html', function(resp){
					telaAtualElem.innerHTML = resp;

					telaAtualElem.querySelector('.voltar').addEventListener('click', function(){
						mudarTela('telaListaTimer', 0);
					}, false);

				});
				break;
			case 'telaNovoTimer':
				ajax.chamada('modules/adicionar-timer.html', function(resp){
					telaAtualElem.innerHTML = resp;

					telaAtualElem.querySelector('.voltar').addEventListener('click', function(){
						mudarTela('telaListaTimer', 0);
					}, false);
				});
				break;
			case 'telaListaCompCorporal':
				ajax.chamada('modules/lista-composicao.html', function(resp){
					telaAtualElem.innerHTML = resp;

					telaAtualElem.querySelector('.voltar').addEventListener('click', function(){
						mudarTela('telaInicio', 0);
					}, false);

					telaAtualElem.querySelector('.novo').addEventListener('click', function(){
						mudarTela('telaAdicionarComposicao', 1);
					}, false);
				});
				break;
			case 'telaAdicionarComposicao':
				ajax.chamada('modules/adicionar-composicao.html', function(resp){
					telaAtualElem.innerHTML = resp;

					telaAtualElem.querySelector('.voltar').addEventListener('click', function(){
						mudarTela('telaListaCompCorporal', 0);
					}, false);
				});
				break;
			default:
				console.error('Tela ' + self.telaAtual + ' não existe!');
				return false;
		}

		telaAtualElem.style.display = 'inline';

		if(self.telaAnterior) callbackTransitionEnd(direcao, callbackFunc);
		else travarBotao = false;

	}

	// Callback que vai ser executado no final da transição de tela.
	function callbackTransitionEnd(direcao, callbackFunc) {
		var callback = function() {
			telaAnteriorElem.className = direcao ? 'container containerDireita' : 'container containerEsquerda';
			telaAtualElem.className = 'container containerCentro';

			telaRolagemElem.className = 'rolagemCentro';
			telaRolagemElem.removeEventListener('webkitTransitionEnd', callback, false);

			limparTelaAnterior();
			if(callbackFunc instanceof Function) callbackFunc();
			travarBotao = false;
		}

		telaRolagemElem.addEventListener('webkitTransitionEnd', callback, false);
		telaRolagemElem.className = (direcao) ? 'rolagemDir' : 'rolagemEsq';
	}

	// Limpando elemento da tela anterior.
	function limparTelaAnterior() {
		switch(self.telaAnterior) {
			default:
				telaAnteriorElem.innerHTML = '';
				break;
		}
		telaAnteriorElem.style.display = 'none';
	}


}
