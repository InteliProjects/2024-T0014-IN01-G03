// Importa os módulos necessários
import Animacao from '../../player/animation.js'; // Importa um módulo de gerenciamento de animações
import Player from '../../player/player.js'; // Importa a classe Player
import Camera from '../../player/camera.js'; // Importa a classe Camera
import Controls from '../../player/controles.js'; // Importa a classe Controls
import Texto from '../../player/texto.js'; // Importa o módulo de texto
import dialogs from '../../player/dialogos.js';


export default class Corredor extends Phaser.Scene {
	constructor() {
		super({
			key: 'cena_corredor',
		});

		this.textoEmAndamento = false;
		this.falas = 0;
		this.falas2 = 0
	}

	preload() {
		this.load.tilemapTiledJSON(
			'map_corredor',
			'./src/assets/mapas/mapa_castelo_corredor/castelo_corredor.json'
		);
		this.load.image(
			'assets_objetos',
			'./src/assets/mapas/mapa_castelo_corredor/pilastra.png'
		);
		this.load.image(
			'assets',
			'./src/assets/mapas/mapa_castelo_corredor/mapa_final_castelo.png'
		);
		this.load.spritesheet(
			'npc1',
			'./src/assets/sprites_personagens/assets_npc1/npc1.png',
			{ frameWidth: 32, frameHeight: 32 }
		);
	}

	create() {
		this.scene.get('cena_corredor').currentScene = this;
		// Áudio dos passos
		this.passosConcreto = this.sound
			.add('passosConcreto', { loop: true });

		//criando o som do banner
		this.som_banner = this.sound.add('som_banner', { loop: false });
		this.musicaFundo = this.sound
			.add('musicaFundo', { loop: true }).setVolume(0.5);

		// Trasição de fade in para quando a cena iniciar
		this.cameras.main.fadeIn(1000, 0, 0, 0);
		this.criarMapa();
		this.criarPersonagem();
		this.criarNpc();
		this.controls.create();

		// Criação da caixa de diálogo e dos textos
		this.caixaDialogo = this.add
			.image(this.tyler.x, this.tyler.y + 50, 'caixaDialogo')
			.setScale(0.5);
		this.caixaDialogo.setVisible(false);

		this.textoNpc = this.add
			.text(this.tyler.x, this.tyler.y + 50, '', {
				fontFamily: 'Arial',
				fontSize: 10,
				color: 'black',
				resolution: 4,
			})
			.setOrigin(0.5);

		this.textoBannner = this.add
			.text(this.tyler.x, this.tyler.y + 50, '', {
				fontFamily: 'Arial',
				fontSize: 10,
				color: 'black',
				resolution: 4,
			})
			.setOrigin(0.5);
		this.textoCaixa = this.add
			.text(this.tyler.x, this.tyler.y + 50, '', {
				fontFamily: 'Arial',
				fontSize: 10,
				color: 'black',
				resolution: 4,
			})
			.setOrigin(0.5);

		// Criação do botão de interação E e configurando a interação
		this.tecla_E = this.add
			.sprite(this.tyler.x, this.tyler.y - 40, 'tecla_e')
			.setOrigin(0.5, 0.5)
			.setVisible(false)
			.setScale(2)
			.setInteractive();
		this.tecla_E.on('pointerup', () => {
			// Verificando se o jogador está sobreposto com o npc para poder interagir
			const overlapping = this.physics.overlap(this.tyler, this.npc);
			if (overlapping) {
				this.caixaDialogo.setVisible(true);
				this.textoNpc.setVisible(true);
				this.mostrarProximoDialogo()
			}



			// Verificando se o jogador está sobreposto com o objeto de interação para poder interagir
			else if (this.interacao.hasTileAtWorldXY(this.tyler.body.x, this.tyler.body.y)) {
				this.caixaDialogo.setVisible(true);
				this.textoBannner.setVisible(true);
				this.mostrarProximoDialogo2()
			}

		});
	}

	// Métodos para fazer o diálogo funcionar
	mostrarProximoDialogo() {
		const idioma = this.registry.get('idioma'); // Obtenha o idioma selecionado

		const falas = dialogs[idioma]['dialogo_cena_corredor_npc']; // Carregue as falas de acordo com o idioma
		if (!this.textoEmAndamento && this.falas < falas.length) {
			Texto.textoDialogo(this, falas[this.falas], this.textoNpc);
			//this.falas++; // Incrementa o índice para o próximo diálogo
		}
	}

	mostrarProximoDialogo2() {
		const idioma = this.registry.get('idioma'); // Obtenha o idioma selecionado

		const falas = dialogs[idioma]['dialogo_cena_corredor_banner']; // Carregue as falas de acordo com o idioma
		if (!this.textoEmAndamento && this.falas2 < falas.length) {
			Texto.textoDialogo(this, falas[this.falas2], this.textoBannner);
			//this.falas2++; // Incrementa o índice para o próximo diálogo
		}
	}


	criarMapa() {
		// Criando os assets do mapa
		this.map = this.make.tilemap({ key: 'map_corredor' });
		this.tilesetObject = this.map.addTilesetImage(
			'mapa_final_castelo',
			'assets'
		);
		this.assetsObject = this.map.addTilesetImage(
			'pilastra',
			'assets_objetos'
		);

		// Criando as camadas do mapa
		this.ground = this.map.createLayer('ground', this.tilesetObject, 0, 0);
		this.passar = this.map.createLayer('passar_fase', this.tilesetObject, 0, 0);
		this.voltar = this.map.createLayer('voltar_fase', this.tilesetObject, 0, 0);
		this.interacao = this.map.createLayer('banner', this.tilesetObject, 0, 0);
		this.pilastra = this.map.createLayer('pilastra', this.assetsObject, 0, 0);

		// Criando as colisões dos objetos
		this.ground.setCollisionByProperty({ collider: true });
		this.interacao.setCollisionByProperty({ collider: true });
		this.pilastra.setCollisionByProperty({ collider: true });

		// Colocando a camada acima das outras
		this.pilastra.setDepth(10)
		this.ground.setDepth(-1)
	}

	criarPersonagem() {
		// Criando 
		const mudarCena = this.registry.get('mudarCenaCorredor');
		// Encontra o ponto de spawn do jogador no mapa
		const spawnPoint = this.map.findObject(
			'player',
			(objects) => objects.name === 'spawning point player'
		);

		const spawnPointVoltar = this.map.findObject(
			'voltar',
			(objects) => objects.name === 'spawning point voltar'
		);

		if (mudarCena === 0) {
			this.musicaFundo.play();
			this.tyler = new Player(
				this,
				spawnPoint.x,
				spawnPoint.y,
				'tyler_armor',
				1.2
			);
			this.controls = new Controls(this, this.tyler);
		}

		if (mudarCena === 1) {
			this.tyler = new Player(
				this,
				spawnPointVoltar.x,
				spawnPointVoltar.y,
				'tyler_armor',
				1.2
			);
			this.controls = new Controls(this, this.tyler);
		}

		// Cria o jogador, câmera e controles

		this.camera = new Camera(this, this.tyler, this.map);
		this.camera.createZoom_1();

		// Adiciona colisor entre o jogador e o chão
		this.physics.add.collider(this.tyler, this.ground);
		this.physics.add.collider(this.tyler, this.interacao);
		this.physics.add.collider(this.tyler, this.pilastra);

		// Cria as animações utilizando o Animacao
		Animacao.TylerArmaduraAnimacao(this);

		this.tyler.setSize(23, 30, true);
		this.tyler.setDepth(1)
	}

	criarNpc() {
		// Configuração inicial do NPC
		const spawnPointNpc = this.map.findObject(
			'npc1',
			(objects) => objects.name === 'spawning point npc1'
		);

		// Criação do NPC
		this.npc = this.physics.add
			.sprite(spawnPointNpc.x, spawnPointNpc.y, 'npc1')
			.setScale(1.2).setDepth(-1).setSize(50, 60);
	}

	update() {
		this.controls.update();
		this.tecla_E.setPosition(this.tyler.x, this.tyler.y - 40);
		this.caixaDialogo.setPosition(this.tyler.x, this.tyler.y + 50);
		this.textoNpc.setPosition(this.tyler.x, this.tyler.y + 50);
		this.textoBannner.setPosition(this.tyler.x, this.tyler.y + 50);

		if (
			(this.tyler.body.velocity.x !== 0 || this.tyler.body.velocity.y !== 0) &&
			!this.passosConcreto.isPlaying
		) {
			this.passosConcreto.play(); // Reproduz o som dos passos
			this.caixaDialogo.setVisible(false);
			this.textoCaixa.setVisible(false);
			this.tecla_E.setVisible(false);
			this.textoNpc.setVisible(false);
			this.textoBannner.setVisible(false);
		} else if (
			this.tyler.body.velocity.x === 0 &&
			this.tyler.body.velocity.y === 0 &&
			this.passosConcreto.isPlaying
		) {
			this.passosConcreto.stop(); // Para o som dos passos se o jogador não estiver se movendo
		}

		// Verifica se o jogador alcançou o ponto de passagem para mudar de cena
		if (this.passar.hasTileAtWorldXY(this.tyler.body.x, this.tyler.body.y)) {
			this.registry.set('mudarCenaCorredor', 1);
			this.transicaoParaCena('cena_castelo');
		}

		// Verifica se o jogador alcançou o ponto de retorno para mudar de cena
		if (this.voltar.hasTileAtWorldXY(this.tyler.body.x, this.tyler.body.y)) {
			this.registry.set('mudarCenaCorredor', 0);
			this.transicaoParaCena('cena_exterior');
		}

		// Verifica se o jogador está sobre um ponto de interação e exibe a tecla E
		if (this.interacao.hasTileAtWorldXY(this.tyler.body.x, this.tyler.body.y)) {
			this.tecla_E.setVisible(true);
			this.tecla_E.setInteractive();

			// Verifica se a tecla "E" foi pressionada
			if (Phaser.Input.Keyboard.JustDown(this.controls.interacao)) {
				this.caixaDialogo.setVisible(true);
				this.textoBannner.setVisible(true);
				this.som_banner.play(); // Ao clicar na tecla "E" toca o som_banner
				this.mostrarProximoDialogo2()
			}
		} else {
			this.tecla_E.setVisible(false);
		}

		// Verifica se o jogador está sobreposto ao NPC e exibe a tecla E
		const overlapping = this.physics.overlap(this.tyler, this.npc);
		if (overlapping) {
			this.tecla_E.setVisible(true);

			// Verifica se a tecla "E" foi pressionada
			if (Phaser.Input.Keyboard.JustDown(this.controls.interacao)) {
				this.caixaDialogo.setVisible(true);
				this.textoNpc.setVisible(true);
				this.mostrarProximoDialogo()
			}
		}
	}

	//Método para mudar de cena e parar o áudio
	transicaoParaCena(cena) {
		this.scene.start(cena);
		this.passosConcreto.stop();
	}
}