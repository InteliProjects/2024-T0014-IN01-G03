// Importa os módulos necessários
import Animacao from '../../player/animation.js'; // Importa um módulo de gerenciamento de animações
import Player from '../../player/player.js'; // Importa a classe Player
import Camera from '../../player/camera.js'; // Importa a classe Camera
import Controls from '../../player/controles.js'; // Importa a classe Controls
import Texto from '../../player/texto.js'; // Importa o módulo de texto
import dialogs from '../../player/dialogos.js'; //Importando os diálogos do jogo

// Classe representando a primeira cena do jogo
export default class Scene1 extends Phaser.Scene {
	constructor() {
		super({
			key: 'cena_predio',
		});
	}

	// Pré-carregamento de recursos
	preload() {
		this.load.image('imagem_informacoes', './src/assets/elementosJogo/informacoes.png')
		this.load.image('imagem_informacoes_en', './src/assets/elementosJogo/informacoes_en.png')

	}

	// Criação dos elementos da cena
	create() {
		const idioma = this.registry.get('idioma'); // Obtenha o idioma selecionado
		const falas = dialogs[idioma]['dialogo_cena_predio']; // Carregue as falas de acordo com o idioma

		// Verifica o idioma e carrega a imagem correspondente
		let chaveImagem = 'imagem_informacoes'; // Valor padrão para português
		if (idioma === 'en') {
			chaveImagem = 'imagem_informacoes_en'; // Valor para inglês
		}

		// Adiciona sons à cena
		this.passosConcreto = this.sound
			.add('passosConcreto', { loop: true });
		this.predioAudio = this.sound
			.add('predioAudio', { loop: true });
		this.predioAudio.play();
		this.musicaFundo = this.sound
			.add('musicaFundo', { loop: true }).setVolume(0.04);
		// Trasição de fade in para quando a cena iniciar
		this.cameras.main.fadeIn(1000, 0, 0, 0);
		// Cria o mapa, personagem e controles
		this.criarMapa();
		this.criarPersonagem();
		this.control.create();
		// Configurações adicionais
		this.tecla_movimentacao = this.add
			.sprite(this.tyler.x + 90, this.tyler.y - 40, chaveImagem)
			.setOrigin(0.5, 0.5)
			.setVisible(true)
			.setScale(0.38);
		this.caixaDialogo = this.add
			.image(this.tyler.body.x + 30, this.tyler.body.y + 120, 'caixaDialogo')
			.setScale(0.9);
		this.caixaDialogo.setVisible(true);
		this.caixaDialogo.setDepth(1);
		this.textoInicio = this.add.text(this.tyler.x - 150, this.tyler.y + 70, {
			fontFamily: 'Arial',
			fontSize: 12,
			color: 'black',
		});
		this.textoInicio.setDepth(10);
		this.caixaDialogo.setDepth(10);
		Texto.textoDialogo(this, falas[0], this.textoInicio);
		this.tyler.setDepth(2);
	}
	// Cria o mapa da cena
	criarMapa() {
		//Criando os assets do mapa no tiled
		this.map = this.make.tilemap({ key: 'map_predio' });
		this.tilesetPredio = this.map.addTilesetImage('predio', 'tile_predio');
		this.tilesetCalcada = this.map.addTilesetImage('calçada', 'tile_calcada');
		this.tilesetArvores = this.map.addTilesetImage('arvores', 'tile_arvores');
		this.tilesetEstrada = this.map.addTilesetImage('estrada', 'tile_estrada');
		this.tilesetCarro = this.map.addTilesetImage('carros', 'tile_cars');
		this.tilesetPlantas = this.map.addTilesetImage('plantas', 'tile_plantas');
		this.tilesetDecoracao = this.map.addTilesetImage(
			'decoracao',
			'tile_hotdog'
		);
		//Criando as camadas
		this.estrada = this.map.createLayer('estrada', this.tilesetEstrada, 0, 0);
		this.calcada = this.map.createLayer('calcada', this.tilesetCalcada, 0, 0);
		this.barreira = this.map.createLayer('barreira', this.tilesetEstrada, 0, 0);
		this.carros = this.map.createLayer('carros', this.tilesetCarro, 0, 0);
		this.pneus = this.map.createLayer('pneus', this.tilesetCarro, 0, 0);
		this.arvTras = this.map.createLayer('arvtras', this.tilesetArvores, 0, 0);
		this.arvores = this.map.createLayer('arvores', this.tilesetArvores, 0, 0);
		this.plantas = this.map.createLayer('plantas', this.tilesetPlantas, 0, 0);
		this.partePlanta = this.map.createLayer('partePlanta', this.tilesetPlantas, 0, 0);
		this.decoracao = this.map.createLayer(
			'decoracao',
			this.tilesetDecoracao,
			0,
			0
		);
		this.carinha = this.map.createLayer(
			'caraCachorro',
			this.tilesetDecoracao,
			0,
			0
		);
		this.predio = this.map.createLayer('predio', this.tilesetPredio, 0, 0);
		//Adicionando colisão
		this.calcada.setCollisionByProperty({ collider: true });
		this.predio.setCollisionByProperty({ collider: true });
		this.carros.setCollisionByProperty({ collider: true });
		this.pneus.setCollisionByProperty({ collider: true });
		this.barreira.setCollisionByProperty({ collider: true });
		this.arvores.setCollisionByProperty({ collider: true });
		this.plantas.setCollisionByProperty({ collider: true });
		this.partePlanta.setCollisionByProperty({ collider: true });
		this.decoracao.setCollisionByProperty({ collider: true });
		this.carinha.setCollisionByProperty({ collider: true });
		//Definindo que a camada deles vão ficar acima das outras
		this.decoracao.setDepth(1);
		this.carinha.setDepth(10);
		this.plantas.setDepth(10);
		this.carros.setDepth(10)
	}
	// Cria o personagem controlável
	criarPersonagem() {
		// Encontra o ponto de spawn do jogador no mapa
		const spawnPoint = this.map.findObject(
			'player',
			(objects) => objects.name === 'spawning point'
		);
		// Cria o jogador, câmera e controles
		this.tyler = new Player(
			this,
			spawnPoint.x,
			spawnPoint.y,
			'tyler_normal',
			1.5
		);
		this.camera = new Camera(this, this.tyler, this.map);
		this.camera.createZoom_1();
		this.camera.createMiniMap();
		this.control = new Controls(this, this.tyler);
		// Adiciona colisões do jogador com os elementos do mapa
		this.physics.add.collider(this.tyler, this.calcada);
		this.physics.add.collider(this.tyler, this.predio);
		this.physics.add.collider(this.tyler, this.carros);
		this.physics.add.collider(this.tyler, this.pneus);
		this.physics.add.collider(this.tyler, this.barreira);
		this.physics.add.collider(this.tyler, this.arvores);
		this.physics.add.collider(this.tyler, this.plantas);
		this.physics.add.collider(this.tyler, this.partePlanta);
		this.physics.add.collider(this.tyler, this.decoracao);
		this.physics.add.collider(this.tyler, this.carinha);
		this.tyler.setDepth(2)
		// Cria as animações utilizando o módulo Animacao
		Animacao.TylerNormalAnimacao(this);
	}
	// Atualizações por frame
	update() {
		this.control.update();
		// Reproduz o som de passos do jogador se estiver se movendo
		if (
			(this.tyler.body.velocity.x !== 0 || this.tyler.body.velocity.y !== 0) &&
			!this.passosConcreto.isPlaying
		) {
			this.passosConcreto.play();
			this.caixaDialogo.setVisible(false);
			this.textoInicio.setVisible(false);
			this.tecla_movimentacao.setVisible(false)
		} else if (
			this.tyler.body.velocity.x === 0 &&
			this.tyler.body.velocity.y === 0 &&
			this.passosConcreto.isPlaying
		) {
			this.passosConcreto.stop();
		}
		// Transição para a próxima cena quando o jogador alcança uma posição específica
		if (this.tyler.x >= 800 && this.tyler.y <= 450) {
			this.transicaoParaCena('cena_escritorio');
		}
	}
	// Método para transição para a próxima cena
	transicaoParaCena(cena) {
		this.scene.start(cena);
		this.passosConcreto.stop();
		this.predioAudio.stop();
	}
}