var tela = new Tela();
var ajax = new Ajax();

// Util para buscar elementos no DOM.
function $(val){
  return document.querySelectorAll(val);
}

window.addEventListener('load', function(){
	iniciar();
});

function iniciar() {
	var telaElem = $('#tela')[0];

	telaElem.style.width = window.innerWidth + 'px';
	telaElem.style.height = window.innerHeight + 'px';

	tela.mudarPara('telaInicio', 1);
}
