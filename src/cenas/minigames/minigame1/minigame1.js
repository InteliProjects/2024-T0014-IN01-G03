import pergunt from "./perguntas.js"

//definindo váriaveis para saber se o pergaminho está selecionado ou não.
var selecionado1 = 0;
var selecionado2 = 0;
var selecionado3 = 0;
var selecionado4 = 0;
var selecionado5 = 0;
var selecionado6 = 0;
//definindo váriaveis para quando o pergaminho for clicado.
var clicou1 = true;
var clicou2 = true;
var clicou3 = true;
var clicou4 = true;
var clicou5 = true;
var clicou6 = true;

//criando a classe "minigame1" que é uma extensão da classe "Phaser.Scene".
export default class Minigame1 extends Phaser.Scene {
	constructor() {
		super({
			key: 'minigame1',
		});
	}

	// carregando imagens.
	preload() {
		this.load.image('fundo', './src/assets/elementosJogo/fundo.png');
		this.load.image('pergaminho', './src/assets/pergaminhos/pergaminho.png');
		this.load.image('confirmar', './src/assets/elementosJogo/confirmar.png');
		this.load.image('confirmar_en', './src/assets/elementosJogo/confirmar_en.png');
	}
	// criando imagens no jogo.
	create() {
		const idioma = this.registry.get('idioma'); // Obtenha o idioma selecionado
		this.add.image(400, 300, 'fundo').setScale(3);
		this.papelMexendo = this.sound.add('papelMexendo', { loop: false }); // adicionando som de papel ao clicar e desclicar o pergaminho.
		var pergaminho1 = this.add
			.image(300, 180, 'pergaminho')
			.setScale(0.35)
			.setTint(0x808080);
		var pergaminho2 = this.add
			.image(640, 180, 'pergaminho')
			.setScale(0.35)
			.setTint(0x808080);
		var pergaminho3 = this.add
			.image(980, 180, 'pergaminho')
			.setScale(0.35)
			.setTint(0x808080);
		var pergaminho4 = this.add
			.image(300, 550, 'pergaminho')
			.setScale(0.35)
			.setTint(0x808080);
		var pergaminho5 = this.add
			.image(640, 550, 'pergaminho')
			.setScale(0.35)
			.setTint(0x808080);
		var pergaminho6 = this.add
			.image(980, 550, 'pergaminho')
			.setScale(0.35)
			.setTint(0x808080);

		//adicionando as perguntas presentes em cada pergaminho, que estão descritas no no arquivo "perguntas.js"
		this.textoPergaminho1 = this.add.text(
			560, 130,
			pergunt[idioma]['pergunta1'],
			{ fontFamily: 'Arial', fontSize: 18, color: 'black', fontStyle: 'bold', align: 'center', resolution: 4 }
		)

		this.textoPergaminho2 = this.add.text(
			220, 140,
			pergunt[idioma]['pergunta2'],
			{ fontFamily: 'Arial', fontSize: 18, color: 'black', fontStyle: 'bold', align: 'center', resolution: 4 }
		)

		this.textoPergaminho3 = this.add.text(
			917, 170,
			pergunt[idioma]['pergunta3'],
			{ fontFamily: 'Arial', fontSize: 18, color: 'black', fontStyle: 'bold', align: 'center', resolution: 4 }
		)

		this.textoPergaminho4 = this.add.text(
			210, 540,
			pergunt[idioma]['pergunta4'],
			{ fontFamily: 'Arial', fontSize: 18, color: 'black', fontStyle: 'bold', align: 'center', resolution: 4 }
		)

		this.textoPergaminho5 = this.add.text(
			563, 550,
			pergunt[idioma]['pergunta5'],
			{ fontFamily: 'Arial', fontSize: 18, color: 'black', fontStyle: 'bold', align: 'center', resolution: 4 }
		)

		this.textoPergaminho6 = this.add.text(
			878, 550,
			pergunt[idioma]['pergunta6'],
			{ fontFamily: 'Arial', fontSize: 18, color: 'black', fontStyle: 'bold', align: 'center', resolution: 4 }
		)
		//integrando a caixa de diálogo ao minigame1.
		this.caixaDialogo = this.add.image(680, 550, 'caixaDialogo').setScale(2).setInteractive();
		this.caixaDialogo.setVisible(false);

		//adicionando o texto de ajuda para quando o jogador não faz as escolhas certas no minigame.
		this.textoAjuda = this.add.text(
			340, 520,
			pergunt[idioma]['textoAjuda'],
			{ fontFamily: 'Arial', fontSize: 32, color: 'black', fontStyle: 'bold', align: 'center', resolution: 4 }
		)
		this.textoAjuda.setVisible(false);

		//adicionando o texto que será exibido quando o jogador concluir o minigame
		this.textoConcluido = this.add.text(
			400, 520,
			pergunt[idioma]['textoConcluido'],
			{ fontFamily: 'Arial', fontSize: 32, color: 'black', fontStyle: 'bold', align: 'center' }
		)
		this.textoConcluido.setVisible(false);

		// Verifica o idioma e carrega a imagem correspondente
		let chaveImagem = 'confirmar'; // Valor padrão para português
		if (idioma === 'en') {
			chaveImagem = 'confirmar_en'; // Valor para inglês
		}

		//integrando imagem do botão confirmar.
		const confirmar = this.add.image(1200, 630, chaveImagem).setScale(0.2);
		const confirmar2 = this.add.image(1000, 616, chaveImagem).setScale(0.2).setVisible(false);
		const confirmar3 = this.add.image(1000, 610, chaveImagem).setScale(0.2).setVisible(false);

		this.caixaDialogo.setDepth(10)
		this.textoAjuda.setDepth(10)
		this.textoConcluido.setDepth(10)
		confirmar2.setDepth(10)
		confirmar3.setDepth(10)

		//adicionando interação ao clicar nos pergaminhos.
		pergaminho1.setInteractive();
		pergaminho1.on('pointerdown', () => {
			this.clicado(pergaminho1, 1);
		});

		pergaminho2.setInteractive();
		pergaminho2.on('pointerdown', () => {
			this.clicado(pergaminho2, 2);
		});

		pergaminho3.setInteractive();
		pergaminho3.on('pointerdown', () => {
			this.clicado(pergaminho3, 3);
		});

		pergaminho4.setInteractive();
		pergaminho4.on('pointerdown', () => {
			this.clicado(pergaminho4, 4);
		});

		pergaminho5.setInteractive();
		pergaminho5.on('pointerdown', () => {
			this.clicado(pergaminho5, 5);
		});

		pergaminho6.setInteractive();
		pergaminho6.on('pointerdown', () => {
			this.clicado(pergaminho6, 6);
		});


		// adicionando interação ao clicar no botão de confirmar.
		confirmar.setInteractive();
		confirmar.on('pointerdown', () => {
			// condição que verifica se a soma das variáveis selecionado1, selecionado2, etc. é igual a 43.
			if (
				selecionado1 +
				selecionado2 +
				selecionado3 +
				selecionado4 +
				selecionado5 +
				selecionado6 ===
				43
			) {
				// se a soma for igual a 43, aparece o texto de conclusão.
				this.caixaDialogo.setVisible(true);
				this.textoConcluido.setVisible(true);
				confirmar.setInteractive(false);
				confirmar.setVisible(false)
				confirmar3.setVisible(true);
				confirmar3.setInteractive();
				pergaminho1.disableInteractive();
				pergaminho2.disableInteractive();
				pergaminho3.disableInteractive();
				pergaminho4.disableInteractive();
				pergaminho5.disableInteractive();
				pergaminho6.disableInteractive();

			}
			// se a soma for diferente de 43, exibe o texto ajuda.
			else {
				this.caixaDialogo.setVisible(true);
				this.textoAjuda.setVisible(true);
				confirmar.setInteractive(false)
				confirmar2.setVisible(true);
				confirmar2.setInteractive();
				pergaminho1.disableInteractive();
				pergaminho2.disableInteractive();
				pergaminho3.disableInteractive();
				pergaminho4.disableInteractive();
				pergaminho5.disableInteractive();
				pergaminho6.disableInteractive();
			}
		});
		//botão de confirmar que aparece junto com o texto de ajuda.
		confirmar2.on('pointerdown', () => {
			this.caixaDialogo.setVisible(false);
			this.textoAjuda.setVisible(false);
			confirmar2.setVisible(false);
			pergaminho1.setInteractive();
			pergaminho2.setInteractive();
			pergaminho3.setInteractive();
			pergaminho4.setInteractive();
			pergaminho5.setInteractive();
			pergaminho6.setInteractive();
		});
		//botão de confirmar que aparece junto com o texto de conclusão.
		confirmar3.on('pointerdown', () => {
			this.transitionToScene('cena_escriba');
			this.caixaDialogo.setVisible(false);
			this.textoAjuda.setVisible(false);
			confirmar2.setVisible(false);
			pergaminho1.setInteractive();
			pergaminho2.setInteractive();
			pergaminho3.setInteractive();
			pergaminho4.setInteractive();
			pergaminho5.setInteractive();
			pergaminho6.setInteractive();
		});

	}

	update() { }
	// função para mudar de cena.
	transitionToScene(cena) {
		this.scene.start(cena);
	}
	// função para restaurar a cor original do pergaminho quando ele é desselecionado)
	clicado(pergaminho, num) {
		if (pergaminho.originalTint === undefined) {
			pergaminho.originalTint = pergaminho.tintTopLeft;
		}
		// verifica qual pergaminho foi clicado e altera seu estado de seleção.
		//para cada pergaminho selecionado é atribuído um valor que será usado posteriormente na soma.
		if (num === 1) {
			if (clicou1) {
				pergaminho.setTint(0xffffff);
				selecionado1 = 1;
				clicou1 = false;
				this.papelMexendo.play();

			} else {
				pergaminho.setTint(pergaminho.originalTint);
				selecionado1 = 0;
				clicou1 = true;
				this.papelMexendo.play();
			}
		} else if (num === 2) {
			if (clicou2) {
				pergaminho.setTint(0xffffff);
				selecionado2 = 2;
				clicou2 = false;
				this.papelMexendo.play();
			} else {
				pergaminho.setTint(pergaminho.originalTint);
				selecionado2 = 0;
				clicou2 = true;
				this.papelMexendo.play();
			}
		} else if (num === 3) {
			if (clicou3) {
				pergaminho.setTint(0xffffff);
				selecionado3 = 4;
				clicou3 = false;
				this.papelMexendo.play();
			} else {
				pergaminho.setTint(pergaminho.originalTint);
				selecionado3 = 0;
				clicou3 = true;
				this.papelMexendo.play();
			}
		} else if (num === 4) {
			if (clicou4) {
				pergaminho.setTint(0xffffff);
				selecionado4 = 8;
				clicou4 = false;
				this.papelMexendo.play();
			} else {
				pergaminho.setTint(pergaminho.originalTint);
				selecionado4 = 0;
				clicou4 = true;
				this.papelMexendo.play();
			}
		} else if (num === 5) {
			if (clicou5) {
				pergaminho.setTint(0xffffff);
				selecionado5 = 16;
				clicou5 = false;
				this.papelMexendo.play();
			} else {
				pergaminho.setTint(pergaminho.originalTint);
				selecionado5 = 0;
				clicou5 = true;
				this.papelMexendo.play();
			}
		} else if (num === 6) {
			if (clicou6) {
				pergaminho.setTint(0xffffff);
				selecionado6 = 32;
				clicou6 = false;
				this.papelMexendo.play();
			} else {
				pergaminho.setTint(pergaminho.originalTint);
				selecionado6 = 0;
				clicou6 = true;
				this.papelMexendo.play();
			}
		}
	}
}
