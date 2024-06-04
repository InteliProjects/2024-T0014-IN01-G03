export default class Tela extends Phaser.Scene {
	constructor() {
		super({
			key: 'Tela',
		});
	}

	preload() {
		// Carrega os recursos necessários
		this.load.image('tela', './src/assets/elementosJogo/tela_inicial_2.png');
		this.load.image('play', './src/assets/elementosJogo/play_btn.png');
		this.load.image('play_pt', './src/assets/elementosJogo/play_pt.png');
		this.load.image('brasil', './src/assets/elementosJogo/brasil.jpg');
		this.load.image('credits', './src/assets/elementosJogo/Credits.png');
		this.load.image('EUA', './src/assets/elementosJogo/EUA.png');

		//Carregando recursos para todas as cenas
		this.load.image('seta_sinalizacao', './src/assets/elementosJogo/seta.png');
		this.load.image('tecla_e_mobile', './src/assets/elementosJogo/tecla_e_final.png');
		this.load.image('tecla_e', './src/assets/elementosJogo/tecla_e_pixel.png');
		this.load.image('etapas', './src/assets/elementosJogo/etapas.png');
		this.load.image(
			'tecla_sinalizacao',
			'./src/assets/elementosJogo/tecla_sinalizacao.png'
		);
		this.load.image('caixaDialogo', './src/assets/elementosJogo/caixaDialogo.png');
		this.load.plugin(
			'rexvirtualjoystickplugin',
			'https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/dist/rexvirtualjoystickplugin.min.js',
			true
		);
		this.load.spritesheet(
			'tyler_armor',
			'./src/assets/sprites_personagens/assets_tyler/tyler_armor.png',
			{ frameWidth: 32, frameHeight: 32 }
		);
		this.load.spritesheet(
			'vanessa',
			'./src/assets/sprites_personagens/assets_vanessa/vanessa_lado.png',
			{ frameWidth: 32, frameHeight: 32 }
		);
		this.load.spritesheet(
			'tyler_normal',
			'./src/assets/sprites_personagens/assets_tyler/novo_persona.png',
			{ frameWidth: 32, frameHeight: 32 }
		);

		//Carregando recursos da cena predio
		this.load.image('tile_predio', './src/assets/mapas/predio/Tileset_3_MV.png');
		this.load.image('tile_calcada', './src/assets/mapas/predio/Tileset_10_MV.png');
		this.load.image('tile_arvores', './src/assets/mapas/predio/Tileset_21_MV.png');
		this.load.image('tile_estrada', './src/assets/mapas/predio/Tileset_16_MV.png');
		this.load.image('tile_cars', './src/assets/mapas/predio/Tileset_Cars_MV.png');
		this.load.image('tile_plantas', './src/assets/mapas/predio/Tileset_8_MV.png');
		this.load.image('tile_hotdog', './src/assets/mapas/predio/Tileset_31_MV.png');
		this.load.tilemapTiledJSON(
			'map_predio',
			'./src/assets/mapas/predio/map_meta.json'
		);
		//carregando áudios do jogo.
		this.load.audio('passosConcreto', './src/assets/audios/concreteFootsteps.mp3');
		this.load.audio('musicaFundo', './src/assets/audios/musicaCastelo.mp3');
		this.load.audio('predioAudio', './src/assets/audios/Metro.mp3');
		this.load.audio('entrada', './src/assets/audios/entrance.mp3');
		this.load.audio('passos', './src/assets/audios/footstep.mp3');
		this.load.audio('passaros', './src/assets/audios/birds.mp3');
		this.load.audio('oceano', './src/assets/audios/ocean.mp3');
		this.load.audio('musicaRei', './src/assets/audios/entrance.mp3');
		this.load.audio('musicaFestival', './src/assets/audios/Festival.mp3');
		this.load.audio('somPiano', './src/assets/audios/som_piano.mp3');
		this.load.image('movimentacao', './src/assets/elementosJogo/teclas_movimentacao.png');
		this.load.audio('somRiacho', './src/assets/audios/correntezaMax.mp3');
		this.load.audio('som_banner', './src/assets/audios/banner.mp3');
		this.load.audio('transicao_metaverso', './src/assets/audios/transicao_metaverso.mp3');
		this.load.audio('papelPassando', './src/assets/audios/papelPassando.mp3');
		this.load.audio('papelMexendo', './src/assets/audios/papelMexendo.mp3');
		this.load.audio('somRelogio', './src/assets/audios/somRelogio.mp3');
		this.load.audio('somErro', './src/assets/audios/somErro.mp3');
		this.load.audio('musica_escritorio', './src/assets/audios/musica_escritorio.mp3');

	}

	create() {
		//Criando as variáveis globais usando o registry
		this.registry.set('mudarCenaEscritorio', 0);
		this.registry.set('mudarCenaExterior', 0);
		this.registry.set('mudarCenaCorredor', 0);
		this.registry.set('mudarCenaCastelo', 0);
		this.registry.set('mudarCenaEscriba', 1);
		this.registry.set('mudarCenaFesta', 0);

		// Criando variável global para controle do idioma
		this.registry.set('idioma', 'pt');

		// Buscando o valor do idioma
		const idioma = this.registry.get('idioma');

		// Tamanho fixo da tela
		const screenWidth = 1280;
		const screenHeight = 720;

		// Cria o mapa e as camadas
		const background = this.add
			.image(screenWidth / 2, screenHeight / 2, 'tela')
			.setScale(12);

		// Adiciona os botões verticalmente
		const buttonSpacing = 20; // Espaçamento entre os botões
		const buttonScale = 0.7; // Escala dos botões

		// Mudando o texto do botao de acordo com o idioma selecionado
		let chaveBotao = 'play_pt'; // Valor padrão para português
		if (idioma === 'en') {
			chaveBotao = 'play'; // Valor para inglês
		}

		// Criando botoes
		const play = this.add
			.image(screenWidth / 2, screenHeight / 2, chaveBotao)
			.setOrigin(0.5)
			.setScale(buttonScale * 2);
		const brasil = this.add
			.image(
				screenWidth / 4,
				play.y + play.height * play.scaleY + buttonSpacing * 4,
				'brasil'
			)
			.setOrigin(0.5)
			.setScale(buttonScale / 4);
		const EUA = this.add
			.image(
				screenWidth / 1.35,
				play.y + play.height * play.scaleY + buttonSpacing * 4,
				'EUA'
			)
			.setOrigin(0.5)
			.setScale(buttonScale / 6);

		// Habilitar interatividade e adicionar evento de clique ao botão "play"
		play.setInteractive();
		play.on('pointerdown', () => {
			// Iniciar a cena principal quando o botão "play" é clicado
			this.scene.start('cena_predio');
		});

		// Adicionar eventos de hover
		play.on('pointerover', () => {
			play.setScale(1.6);
		});

		play.on('pointerout', () => {
			play.setScale(buttonScale * 2);
		});

		// Adicionando os botões para escolher o idioma
		brasil.setInteractive();
		brasil.on('pointerdown', () => {
			// Definir o idioma como Português (Brasil)
			this.registry.set('idioma', 'pt');
			brasil.setScale(buttonScale / 2.2);
			EUA.setScale(buttonScale / 6);
			chaveBotao = 'play_pt';
			play.setTexture(chaveBotao); // Mudar a textura do botão "play"
		});

		EUA.setInteractive();
		EUA.on('pointerdown', () => {
			// Definir o idioma como Inglês (EUA)
			this.registry.set('idioma', 'en');
			brasil.setScale(buttonScale / 4);
			EUA.setScale(buttonScale / 3.5);
			chaveBotao = 'play';
			play.setTexture(chaveBotao); // Mudar a textura do botão "play"
		});
	}

	uptade() {

	}
}
