/**
 * @class Classe responsável pelas requisições http do aplicativo
 * @version 1.0
 * @author Henrrique Moreira
 */

function Ajax() {
	/**
	 * Transforma tipo da varivel para escopo da classe
	 * @type {Object}
	 */
	var self = this;
	/**
	 * Objeto de transfomação de data
	 * @type {Object}
	 */
	var atual = null;
	/**
	 * Fila para execução do ajax
	 * @type {Array}
	 */
	var fila = new Array();
	/**
	 * Ultima data e hora do ajax
	 * @type {Number}
	 */
	var lastTime = 0;
	/**
	 * Variavel que contém objeto nativo de ajax
	 * @type {XMLHttpRequest}
	 */
	var xmlhttp = new XMLHttpRequest();

	/**
	 * Ultima data atualizada
	 * @type {Object}
	 */
	var lastUpdate = UTCTime();

	/**
	 * Tempo atual em milisegundos
	 * @return {Object}
	 */

	function UTCTime() {
		var atual = new Date();
		return Date.UTC(atual.getFullYear(), atual.getMonth(), atual.getDate(), atual.getHours(), atual.getMinutes(), atual.getSeconds(), atual.getMilliseconds());
	}

	/**
	 * Contrutor do Ajax com todas as variaveis requisitadas na primeira requisição
	 * @param  {String} pag 	Nome da página requisitada pelo ajax
	 * @param  {String} tipo 	Descricao
	 * @param  {Function} func 	Descricao
	 * @return {Void}
	 */

	function objRequest(pag, tipo, func) {
		this.pag = pag;
		this.tipo = tipo;
		this.func = func;
		novoObjeto();
	}

	/**
	 * Método que faz a requisição do xmlhttp
	 * @return {Void}
	 */

	function ajaxRequest() {
		if (atual != null) {
			inicialTime = UTCTime();

			xmlhttp.open('GET', atual.pag, true);

			xmlhttp.onreadystatechange = function() {
				if (xmlhttp.readyState == 4) {
					if (atual.func != null) {
						var texto = xmlhttp.responseText;
						if (atual.func instanceof Function)
							atual.func(texto, atual.tipo);
						else
							eval(atual.func + "(texto)");
					}

					lastTime = UTCTime();

					if (fila.length > 0) {
						atual = fila.shift();
						delay();
					} else
						atual = null;
				}
			};

			xmlhttp.send(null);
		}
	}

	/**
	 * Método que faz a contagem do delay para uma nova requisição de ajax
	 * @return {Void}
	 */

	function delay() {
		var diferenca = UTCTime() - lastTime;

		if (diferenca > 700)
			ajaxRequest();
		else {
			diferenca = 700 - diferenca;
			setTimeout(function() {
				ajaxRequest()
			}, diferenca);
		}
	}

	/**
	 * Chamada do arquivo para efetuação o ajax
	 * @public
	 * @memberOf Ajax
	 * @param  {String} pag   	Nome da página a ser chamada
	 * @param  {Function} func 	Descricao
	 * @param  {String} tipo 	Descricao
	 * @return {Void}
	 */

	self.chamada = function(pag, func, tipo) {
		lastUpdate = UTCTime();

		var objeto = new objRequest(pag, tipo, func);
		if (atual == null) {
			atual = objeto;
			//delay, se precisar
			delay();
		}
		//caso contrario, tentar concatenar para efetuar envio unico com a fila
		else {
			fila.push(objeto);
		}
	}

	/**
	 * Criando um objeto xmlhttp de acordo com o browser
	 * @return {void}
	 */

	function novoObjeto() {
		try {
			xmlhttp = new XMLHttpRequest();
		} catch (ee) {
			try {
				xmlhttp = new ActiveXObject("Msxml2.XMLHTTP");
			} catch (e) {
				try {
					xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
				} catch (E) {
					xmlhttp = false;
				}
			}
		}
	}
}

var ajax = new Ajax();