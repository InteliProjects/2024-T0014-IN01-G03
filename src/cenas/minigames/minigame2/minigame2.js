import idioma from "../../menu/tela.js";
import pergunt from '../minigame1/perguntas.js'; // Importa a classe pergunt

// Exporta a classe Minigame2 que representa a cena do segundo minigame
export default class Minigame2 extends Phaser.Scene {
	constructor() {
		super({
			key: 'minigame2', // Define a chave da cena
		});
	}

	// Carrega as imagens necessárias para o jogo durante a fase de pré-carregamento
	preload() {
		this.load.image('fundo', './src/assets/elementosJogo/fundo.png'); // Carrega a imagem de fundo
		this.load.image('celeste', './src/assets/Perfis/celeste.png'); // Carrega a imagem do perfil "celeste"
		this.load.image('franchesco', './src/assets/Perfis/franchesco.png'); // Carrega a imagem do perfil "celeste"
		this.load.image('gizmo', './src/assets/Perfis/gizmo.png'); // Carrega a imagem do perfil "gizmo"
		this.load.image('morgana', './src/assets/Perfis/morgana.png'); // Carrega a imagem do perfil "morgana"
		this.load.image('romeo', './src/assets/Perfis/romeo.png'); // Carrega a imagem do perfil "romeo"
		this.load.image('orion', './src/assets/Perfis/orion.png'); // Carrega a imagem do perfil "orion"
		this.load.image('aysla', './src/assets/Perfis/aysla.png'); // Carrega a imagem do perfil "aysla"
		this.load.image('celeste_en', './src/assets/Perfis/celeste_en.png'); // Carrega a imagem do perfil "celeste"
		this.load.image('franchesco_en', './src/assets/Perfis/franchesco_en.png'); // Carrega a imagem do perfil "celeste"
		this.load.image('gizmo_en', './src/assets/Perfis/gizmo_en.png'); // Carrega a imagem do perfil "gizmo"
		this.load.image('morgana_en', './src/assets/Perfis/morgana_en.png'); // Carrega a imagem do perfil "morgana"
		this.load.image('romeo_en', './src/assets/Perfis/romeo_en.png'); // Carrega a imagem do perfil "romeo"
		this.load.image('orion_en', './src/assets/Perfis/orion_en.png'); // Carrega a imagem do perfil "orion"
		this.load.image('aysla_en', './src/assets/Perfis/aysla_en.png'); // Carrega a imagem do perfil "aysla"
		this.load.image('botao', './src/assets/Perfis/aprovado.png'); // Carrega a imagem do botão de verdadeiro
		this.load.image('botaox', './src/assets/Perfis/errado.png'); // Carrega a imagem do botão de falso
		this.load.image('confirmar', './src/assets/elementosJogo/confirmar.png');//Carrega a imagem do botão de confirmar
		this.load.image('confirmar', './src/assets/elementosJogo/confirmar_en.png');//Carrega a imagem do botão de confirmar em inglês
		this.load.audio('papelPassando', './src/assets/audios/transicao_metaverso.mp3');//Carrega o audio quando ele acerta a decisão do perfil
	}

	// Cria os elementos visuais e interativos do jogo
	create() {
		// Pega o idioma escolhido
		const idioma = this.registry.get('idioma');

		// Cria a imagem de fundo
		this.add.image(0, 0, 'fundo').setOrigin(0).setScale(2);

		//ciando áudio para quando massar de perfil
		this.papelPassando = this.sound.add('papelPassando', { loop: false });
		this.somErro = this.sound.add('somErro', { loop: false });

		// Define e posiciona os sprites dos perfis dos personagens, e deixa eles invisiveis para não aparecer tudo de uma ve
		var celeste = this.add
			.image(640, 360, 'celeste')
			.setVisible(false);
		var gizmo = this.add
			.image(640, 360, 'gizmo')
			.setVisible(false);
		var morgana = this.add
			.image(640, 360, 'morgana')
			.setVisible(false);
		var romeo = this.add
			.image(640, 360, 'romeo')
			.setVisible(false);
		var orion = this.add
			.image(640, 360, 'orion')
			.setVisible(false);
		var aysla = this.add
			.image(640, 360, 'aysla')
			.setVisible(false);
		var franchesco = this.add
			.image(640, 360, 'franchesco')
			.setVisible(false);
		var celeste_en = this.add
			.image(640, 360, 'celeste_en')
			.setVisible(false);
		var gizmo_en = this.add
			.image(640, 360, 'gizmo_en')
			.setVisible(false);
		var morgana_en = this.add
			.image(640, 360, 'morgana_en')
			.setVisible(false);
		var romeo_en = this.add
			.image(640, 360, 'romeo_en')
			.setVisible(false);
		var orion_en = this.add
			.image(640, 360, 'orion_en')
			.setVisible(false);
		var aysla_en = this.add
			.image(640, 360, 'aysla_en')
			.setVisible(false);
		var franchesco_en = this.add
			.image(640, 360, 'franchesco_en')
			.setVisible(false);

		// Define e posiciona os botões de verdadeiro e falso
		var verdadeiro = this.add.image(340, 560, 'botao').setScale(3.2);
		var falso = this.add.image(475, 560, 'botaox').setScale(3.2);

		// Posiciona a caixa de dialogo onde o dialogo fica por cima, deixa ela não visivel para não atrapalahar a visão do jogador
		this.caixaDialogo = this.add.image(640, 580, 'caixaDialogo').setScale(2);
		this.caixaDialogo.setVisible(false);

		// Verifica o idioma e carrega a imagem correspondente
		let chaveImagem = 'confirmar'; // Valor padrão para português
		if (idioma === 'en') {
			chaveImagem = 'confirmar_en'; // Valor para inglês
		}

		//adiciona a const de confirmar e posiciona ela na tela, deixa ela não visivel para não atrapalahar a visão do jogador
		const confirmar = this.add
			.image(940, 630, chaveImagem)
			.setScale(0.2)
			.setVisible(false);

		const confirmar2 = this.add
			.image(940, 630, chaveImagem)
			.setScale(0.2)
			.setVisible(false);
		//deixa interagivel a const confirmar para retirar os textos caso o player erre
		confirmar.on('pointerdown', () => {
			this.caixaDialogo.setVisible(false);
			this.textoAjudaFranchesco.setVisible(false);
			this.textoAjudaOrion.setVisible(false);
			this.textoAjudaMorgana.setVisible(false);
			this.textoAjuda.setVisible(false);
			confirmar.setVisible(false);
		});
		//mesmo caso da const confirmar, mas no caso que o jogador erre com perfis bons
		confirmar2.on('pointerdown', () => {
			this.caixaDialogo.setVisible(false);
			this.textoAjuda.setVisible(false);
			confirmar2.setVisible(false);
			this.scene.start('cena_escriba'); // Inicia a cena "cena_castelo"
			this.registry.set('mudarCenaEscriba', 3);
		});
		//variavel do texto de ajuda que verifica o idioma e pega o 'textoAjuda' do idioma selecionado
		this.textoAjuda = this.add.text(
			300, 530,
			pergunt[idioma]['textoAjuda'],
			{ fontFamily: 'Arial', fontSize: 32, color: 'black', fontStyle: 'bold', align: 'center', resolution: 4 }
		)
		//variavel do texto de ajuda que verifica o idioma e pega o 'textoConcluido' do idioma selecionado
		this.textoConcluido = this.add.text(
			310, 550,
			pergunt[idioma]['textoConcluido'],
			{ fontFamily: 'Arial', fontSize: 32, color: 'black', fontStyle: 'bold', align: 'center' }
		)
		//deixa invisivel para não atrapalhar a tela do jogador
		this.textoAjuda.setVisible(false);
		this.textoConcluido.setVisible(false);

		//texto caso o jogador erre a escolha do texto do Franchesco, deixa invisivel para não atrapalhar a tela do jogador
		this.textoAjudaFranchesco = this.add.text(
			300, 520,
			pergunt[idioma]['textoAjudaFranchesco'],
			{ fontFamily: 'Arial', fontSize: 32, color: 'black', fontStyle: 'bold', align: 'center', resolution: 4 }
		)
		this.textoAjudaFranchesco.setVisible(false);
		//texto caso o jogador erre a escolha do texto do Orion, deixa invisivel para não atrapalhar a tela do jogador
		this.textoAjudaOrion = this.add.text(
			330, 530,
			pergunt[idioma]['textoAjudaOrion'],
			{ fontFamily: 'Arial', fontSize: 32, color: 'black', fontStyle: 'bold', align: 'center', resolution: 4 }
		)
		this.textoAjudaOrion.setVisible(false);
		//texto caso o jogador erre a escolha do texto do Morgana, deixa invisivel para não atrapalhar a tela do jogador
		this.textoAjudaMorgana = this.add.text(
			300, 530,
			pergunt[idioma]['textoAjudaMorgana'],
			{ fontFamily: 'Arial', fontSize: 32, color: 'black', fontStyle: 'bold', align: 'center', resolution: 4 }
		)
		this.textoAjudaMorgana.setVisible(false);

		// Torna os botões interativos
		this.caixaDialogo.setInteractive();
		verdadeiro.setInteractive();
		let posicaoFala = 0; // Inicializa a variável de controle 'posicaoFala' com 0
		if (idioma == 'en') {
			celeste_en.setVisible(true)
			verdadeiro.on('pointerdown', () => {
				// Evento de clique para o botão verdadeiro

				switch (
				posicaoFala // Avalia o valor de 'posicaoFala'
				) {
					case 0:
						franchesco_en.setVisible(true); // Mostra o perfil "gizmo"
						celeste_en.destroy(); // Remove o perfil "celeste"
						posicaoFala++; // Incrementa 'posicaoFala' para o próximo caso
						this.papelPassando.play(); // Reproduz o som de papel passando
						break;
					case 1:
						this.caixaDialogo.setVisible(true);//deixa visivel o texto quando o player erra 
						this.textoAjudaFranchesco.setVisible(true);
						confirmar.setVisible(true); //deixa visivel e interagivel o botão para confirmar e tirar o aviso
						confirmar.setInteractive();
						break; //sai do switch
					case 2:
						this.caixaDialogo.setVisible(true);//deixa visivel o texto quando o player erra 
						this.textoAjudaOrion.setVisible(true);
						confirmar.setVisible(true); //deixa visivel e interagivel o botão para confirmar e tirar o aviso
						confirmar.setInteractive();
						break; //sai do switch
					case 3:
						romeo_en.setVisible(true); // Mostra o perfil "orion"
						gizmo_en.destroy(); // Remove o perfil "romeo"
						posicaoFala++; // Incrementa 'posicaoFala' para o próximo caso
						this.papelPassando.play();
						break;
					case 4:
						morgana_en.setVisible(true); // Mostra o perfil "aysla"
						romeo_en.destroy(); // Remove o perfil "orion"
						posicaoFala++; // Incrementa 'posicaoFala' para o próximo caso
						this.papelPassando.play();
						break;
					case 5:
						this.caixaDialogo.setVisible(true);//deixa visivel o texto quando o player erra 
						this.textoAjudaMorgana.setVisible(true);
						confirmar.setVisible(true); //deixa visivel e interagivel o botão para confirmar e tirar o aviso
						confirmar.setInteractive();

						break; //sai do switch
					case 6:
						this.scene.start('cena_escriba'); // Inicia a cena "cena_castelo"
						this.registry.set('mudarCenaEscriba', 3);
						this.papelPassando.play();
				}
			});


			// Torna o botão de falso interativo
			falso.setInteractive();
			falso.on('pointerdown', () => {
				// Evento de clique para o botão falso
				switch (
				posicaoFala // Avalia o valor de 'posicaoFala'
				) {
					case 0:
						this.caixaDialogo.setVisible(true); //deixa visivel o texto quando o player erra 
						this.textoAjuda.setVisible(true);
						confirmar.setVisible(true); //deixa visivel e interagivel o botão para confirmar e tirar o aviso
						confirmar.setInteractive();

						break;
					case 1:
						orion_en.setVisible(true); // Mostra o perfil "morgana"
						franchesco_en.destroy(); // Remove o perfil "gizmo"
						posicaoFala++; // Incrementa 'posicaoFala' para o próximo caso
						this.papelPassando.play()
						break;
					case 2:
						gizmo_en.setVisible(true); // Mostra o perfil "romeo"
						orion_en.destroy(); // Remove o perfil "morgana"
						posicaoFala++; // Incrementa 'posicaoFala' para o próximo caso
						this.papelPassando.play()
						break;
					case 3:
						this.caixaDialogo.setVisible(true);//deixa visivel o texto quando o player erra 
						this.textoAjuda.setVisible(true);
						confirmar.setVisible(true); //deixa visivel e interagivel o botão para confirmar e tirar o aviso
						confirmar.setInteractive();
						break; //sai do switch
					case 4:
						this.caixaDialogo.setVisible(true);//deixa visivel o texto quando o player erra 
						this.textoAjuda.setVisible(true);
						confirmar.setVisible(true); //deixa visivel e interagivel o botão para confirmar e tirar o aviso
						confirmar.setInteractive();
						break; //sai do switch
					case 5:
						aysla_en.setVisible(true); // Mostra o perfil "aysla"
						morgana_en.destroy(); // Remove o perfil "orion"
						posicaoFala++; // Incrementa 'posicaoFala' para o próximo caso
						this.papelPassando.play()
						break;
					case 6:
						this.caixaDialogo.setVisible(true);//deixa visivel o texto quando o player erra 
						this.textoAjuda.setVisible(true);
						confirmar.setVisible(true); //deixa visivel e interagivel o botão para confirmar e tirar o aviso
						confirmar.setInteractive();
						break; //sai do switch

				}
			});
		} else {
			celeste.setVisible(true)
			verdadeiro.on('pointerdown', () => {
				// Evento de clique para o botão verdadeiro

				switch (
				posicaoFala // Avalia o valor de 'posicaoFala'
				) {
					case 0:
						franchesco.setVisible(true); // Mostra o perfil "gizmo"
						celeste.destroy(); // Remove o perfil "celeste"
						posicaoFala++; // Incrementa 'posicaoFala' para o próximo caso
						this.papelPassando.play()
						break;
					case 1:
						this.caixaDialogo.setVisible(true);//deixa visivel o texto quando o player erra 
						this.textoAjudaFranchesco.setVisible(true);
						confirmar.setVisible(true); //deixa visivel e interagivel o botão para confirmar e tirar o aviso
						confirmar.setInteractive();
						break; //sai do switch
					case 2:
						this.caixaDialogo.setVisible(true);//deixa visivel o texto quando o player erra 
						this.textoAjudaOrion.setVisible(true);
						confirmar.setVisible(true); //deixa visivel e interagivel o botão para confirmar e tirar o aviso
						confirmar.setInteractive();
						break; //sai do switch
					case 3:
						romeo.setVisible(true); // Mostra o perfil "orion"
						gizmo.destroy(); // Remove o perfil "romeo"
						posicaoFala++; // Incrementa 'posicaoFala' para o próximo caso
						this.papelPassando.play()
						break;
					case 4:
						morgana.setVisible(true); // Mostra o perfil "aysla"
						romeo.destroy(); // Remove o perfil "orion"
						posicaoFala++; // Incrementa 'posicaoFala' para o próximo caso
						this.papelPassando.play()
						break;
					case 5:
						this.caixaDialogo.setVisible(true);//deixa visivel o texto quando o player erra 
						this.textoAjudaMorgana.setVisible(true);
						confirmar.setVisible(true); //deixa visivel e interagivel o botão para confirmar e tirar o aviso
						confirmar.setInteractive();

						break; //sai do switch
					case 6:
						confirmar2.setVisible(true);
						this.caixaDialogo.setVisible(true);
						this.textoConcluido.setVisible(true);
						confirmar2.setInteractive();
						this.papelPassando.play()
				}
			});


			// Torna o botão de falso interativo
			falso.setInteractive();
			falso.on('pointerdown', () => {
				// Evento de clique para o botão falso
				switch (
				posicaoFala // Avalia o valor de 'posicaoFala'
				) {
					case 0:
						this.caixaDialogo.setVisible(true); //deixa visivel o texto quando o player erra 
						this.textoAjuda.setVisible(true);
						confirmar.setVisible(true); //deixa visivel e interagivel o botão para confirmar e tirar o aviso
						confirmar.setInteractive();

						break;
					case 1:
						orion.setVisible(true); // Mostra o perfil "morgana"
						franchesco.destroy(); // Remove o perfil "gizmo"
						posicaoFala++; // Incrementa 'posicaoFala' para o próximo caso
						this.papelPassando.play()
						break;
					case 2:
						gizmo.setVisible(true); // Mostra o perfil "romeo"
						orion.destroy(); // Remove o perfil "morgana"
						posicaoFala++; // Incrementa 'posicaoFala' para o próximo caso
						this.papelPassando.play()
						break;
					case 3:
						this.caixaDialogo.setVisible(true);//deixa visivel o texto quando o player erra 
						this.textoAjuda.setVisible(true);
						confirmar.setVisible(true); //deixa visivel e interagivel o botão para confirmar e tirar o aviso
						confirmar.setInteractive();
						break; //sai do switch
					case 4:
						this.caixaDialogo.setVisible(true);//deixa visivel o texto quando o player erra 
						this.textoAjuda.setVisible(true);
						confirmar.setVisible(true); //deixa visivel e interagivel o botão para confirmar e tirar o aviso
						confirmar.setInteractive();
						break; //sai do switch
					case 5:
						aysla.setVisible(true); // Mostra o perfil "aysla"
						morgana.destroy(); // Remove o perfil "orion"
						posicaoFala++; // Incrementa 'posicaoFala' para o próximo caso
						this.papelPassando.play()
						break;
					case 6:
						this.caixaDialogo.setVisible(true);//deixa visivel o texto quando o player erra 
						this.textoAjuda.setVisible(true);
						confirmar.setVisible(true); //deixa visivel e interagivel o botão para confirmar e tirar o aviso
						confirmar.setInteractive();
						break; //sai do switch
				}
			});
		}

	}

	// Método de atualização do jogo
	update() {
		// Não há lógica de atualização neste jogo, então este método está vazio
	}

	// Método para transição para outra cena
	transicaoParaCena(cena) {
		this.scene.start(cena); // Inicia a cena especificada
	}
}
