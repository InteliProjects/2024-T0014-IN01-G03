// Importa os módulos necessários
import Animacao from '../../player/animation.js'; // Importa um módulo de gerenciamento de animações
import Player from '../../player/player.js'; // Importa a classe Player
import Camera from '../../player/camera.js'; // Importa a classe Camera
import Controls from '../../player/controles.js'; // Importa a classe Controls
import Texto from '../../player/texto.js'; // Importa o módulo de texto
import dialogs from '../../player/dialogos.js'; //Importando os diálogos do jogo

// Classe representando a cena do escritório
export default class SceneOffice extends Phaser.Scene {
	constructor() {
		super({
			key: 'cena_escritorio',
		});
		// Variável para controlar o índice das falas
		this.textoEmAndamento = false;
		this.mudaDialogo = 0
	}

	// Pré-carregamento de recursos
	preload() {
		this.load.image(
			'tile_escritorio_final',
			'./src/assets/mapas/mapa_escritorio/mapaEscritórioFinal.png'
		);
		this.load.image(
			'escritorio_ground',
			'./src/assets/mapas/mapa_escritorio/escritorio base(ground).png'
		);
		this.load.tilemapTiledJSON(
			'map_escritorio',
			'./src/assets/mapas/mapa_escritorio/escritorio.json'
		);
	}

	// Criação dos elementos da cena
	create() {
		const mudarCena = this.registry.get('mudarCenaEscritorio');
		// Adiciona sons à cena
		this.passosConcreto = this.sound
			.add('passosConcreto', { loop: true });
		this.musica_escritorio = this.sound
			.add('musica_escritorio', { loop: true });
		this.transicao_metaverso = this.sound.add('transicao_metaverso', { loop: false }); //criando áudio de transição do mundo real para o metaverso

		// Trasição de fade in para quando a cena iniciar
		this.cameras.main.fadeIn(1000, 0, 0, 0);

		// Cria o mapa, personagem, NPC e controles
		this.criarMapa();
		this.criarPersonagem();
		this.control.createUnico();
		this.criarNpc();

		// Adiciona elementos para diálogo com o NPC
		this.caixaDialogo = this.add.image(350, 600, 'caixaDialogo').setScale(0.4);
		this.caixaDialogo.setVisible(false);
		this.textoVanessa = this.add
			.text(this.vanessa.x + 80, this.vanessa.y + 80, '', {
				fontFamily: 'Arial',
				fontSize: 12,
				color: 'black',
				resolution: 4,
			})
			.setOrigin(0.5)
			.setScale(0.5);

		// Adiciona um sprite para sinalizar interação com o NPC
		this.tecla_sinalizcao = this.add
			.sprite(this.vanessa.x, this.vanessa.y - 20, 'tecla_sinalizacao')
			.setOrigin(0.5, 0.5)
			.setVisible(true)
			.setScale(1.5);
		// Adiciona um sprite para sinalizar a interação com o óculos.
		this.tecla_sinalizcao_oculos = this.add
			.sprite(424, 80, 'tecla_sinalizacao')
			.setOrigin(0.5, 0.5)
			.setVisible(false)
			.setScale(1.5);

		// Configura interação com o NPC
		this.vanessa.setInteractive();
		this.vanessa.on('pointerup', () => {
			this.caixaDialogo.setVisible(true);
			this.textoVanessa.setVisible(true);
			this.mostrarProximoDialogo();
		});

		// Adiciona um sprite para a tecla "E" e configura interação
		this.tecla_E = this.add
			.sprite(this.tyler.x, this.tyler.y - 10, 'tecla_e')
			.setOrigin(0.5, 0.5)
			.setVisible(false)
			.setScale(1)
			.setInteractive();


		this.tecla_E.on('pointerup', () => {
			// Verifica interação com o objeto "oculos"
			if (this.oculos.hasTileAtWorldXY(this.tyler.body.x, this.tyler.body.y)) {
				this.tecla_E.setVisible(true);
				this.transicaoParaCena('cena_exterior')
			}

			// Verifica interação com o NPC "Vanessa"
			const overlapping = this.physics.overlap(this.tyler, this.vanessa);

			if (overlapping) {
				this.tecla_E.setVisible(true);
				this.caixaDialogo.setVisible(true);
				this.textoVanessa.setVisible(true);
				if (mudarCena === 0) {
					this.mostrarProximoDialogo()
				}
				else {
					this.mostrarProximoDialogoVolta()
				}
			}
		});
	}

	//Criando os metódos para fazer o diálogo de acordo com o idioma
	mostrarProximoDialogo() {
		const idioma = this.registry.get('idioma'); // Obtenha o idioma selecionado

		const falas = dialogs[idioma]['dialogo_cena_escritorio']; // Carregue as falas de acordo com o idioma
		if (!this.textoEmAndamento && this.mudaDialogo < falas.length) {
			Texto.textoDialogo(this, falas[this.mudaDialogo], this.textoVanessa);
			this.mudaDialogo++; // Incrementa o índice para o próximo diálogo
		}
		else if (this.mudaDialogo === falas.length) {
			this.tecla_sinalizcao.setVisible(false);
			this.tecla_sinalizcao_oculos.setVisible(true)
		}
	}

	mostrarProximoDialogoVolta() {
		const idioma = this.registry.get('idioma'); // Obtenha o idioma selecionado

		const falasVolta = dialogs[idioma]['dialogo_cena_escritorio_volta']; // Carregue as falas de acordo com o idioma
		if (!this.textoEmAndamento && this.mudaDialogo < falasVolta.length) {
			Texto.textoDialogo(this, falasVolta[this.mudaDialogo], this.textoVanessa);
			this.mudaDialogo++; // Incrementa o índice para o próximo diálogo
		}
		else if (this.mudaDialogo === falasVolta.length) {
			this.transicaoParaCena('creditos')
		}
	}

	// Cria o mapa da cena
	criarMapa() {
		//Criando os assets do mapa no tiled
		this.map = this.make.tilemap({ key: 'map_escritorio' });
		this.tilesetEscritorio = this.map.addTilesetImage(
			'mapaEscritórioFinal',
			'tile_escritorio_final'
		);
		this.tilesetParedes = this.map.addTilesetImage(
			'escritorio base(ground)',
			'escritorio_ground'
		);

		//Criando as camadas
		this.ground = this.map.createLayer('ground', this.tilesetEscritorio, 0, 0);
		this.oculos = this.map.createLayer('oculos', this.tilesetEscritorio, 0, 0);
		this.paredes = this.map.createLayer('paredes', this.tilesetParedes, 0, 0);
		this.ground.setCollisionByProperty({ collider: true });
		this.paredes.setCollisionByProperty({ collider: true });
	}

	// Cria o personagem principal
	criarPersonagem() {
		const mudarCena = this.registry.get('mudarCenaEscritorio');
		if (mudarCena === 0) {
			this.musica_escritorio.play();
			// Encontra o ponto de spawn do jogador no mapa
			const spawnPoint = this.map.findObject(
				'player',
				(objects) => objects.name === 'spawning point player'
			);

			// Cria o jogador, câmera e controles
			this.tyler = new Player(
				this,
				spawnPoint.x,
				spawnPoint.y,
				'tyler_normal',
				0.65
			);
		}
		else {
			// Encontra o ponto de spawn do jogador no mapa
			const spawnPoint = this.map.findObject(
				'player',
				(objects) => objects.name === 'spawning point player'
			);

			// Cria o jogador, câmera e controles
			this.tyler = new Player(
				this,
				spawnPoint.x + 320,
				spawnPoint.y - 80,
				'tyler_normal',
				0.65
			);
		}
		this.camera = new Camera(this, this.tyler, this.map);
		this.camera.createZoom_2();
		this.control = new Controls(this, this.tyler);

		// Adiciona colisões do jogador com o chão e paredes
		this.physics.add.collider(this.tyler, this.ground);
		this.physics.add.collider(this.tyler, this.paredes);

		// Cria as animações do jogador
		Animacao.TylerNormalAnimacao(this);
	}

	criarNpc() {
		// Configuração inicial do NPC
		const spawnPointNpc = this.map.findObject(
			'npc',
			(objects) => objects.name === 'spawning point npc'
		);

		// Criação do NPC Vanessa
		this.vanessa = this.physics.add
			.sprite(spawnPointNpc.x, spawnPointNpc.y, 'vanessa')
			.setScale(0.65)
			.setFlipX(true)
			.setSize(50, 20);

		// Configuração do texto associado ao NPC Vanessa
		this.textoVanessa = this.add
			.text(this.vanessa.x, this.vanessa.y - 40, '', {
				fontFamily: 'Arial',
				fontSize: 16,
				color: '#ffffff',
				resolution: 4,
			})
			.setOrigin(0.5);
	}

	// Atualizações por frame
	update() {
		//Buscando o valor da variável global
		const mudarCena = this.registry.get('mudarCenaEscritorio');
		// Atualiza os controles do jogador
		this.control.updateUnico();
		// Atualiza a posição dos elementos na cena
		this.tecla_E.setPosition(this.tyler.x, this.tyler.y - 20);
		this.caixaDialogo.setPosition(this.tyler.x, this.tyler.y + 55);
		this.textoVanessa.setPosition(this.tyler.x, this.tyler.y + 55);

		// Reproduz o som de passos do jogador se estiver se movendo
		if (
			(this.tyler.body.velocity.x !== 0 || this.tyler.body.velocity.y !== 0) &&
			!this.passosConcreto.isPlaying
		) {
			this.passosConcreto.play();
		} else if (
			this.tyler.body.velocity.x === 0 &&
			this.tyler.body.velocity.y === 0 &&
			this.passosConcreto.isPlaying
		) {
			this.passosConcreto.stop();
		}

		// Verifica interação com o objeto "oculos"
		if (this.oculos.hasTileAtWorldXY(this.tyler.body.x, this.tyler.body.y)) {

			if (mudarCena === 0) {
				this.tecla_E.setVisible(true);
				this.tecla_E.setInteractive();
				// Verifica se a tecla "E" foi pressionada
				if (Phaser.Input.Keyboard.JustDown(this.control.interacao)) {
					this.registry.set('mudarCenaEscritorio', 1);
					this.musica_escritorio.stop()
					this.transicao_metaverso.play();
					setTimeout(() => {
						this.transicaoParaCena('cena_exterior');
					}, 500);
					// quando a tecla "E" for pressionada, toca o áudio de transição para o metaverso.
				}

			}

		}
		else {
			this.tecla_E.setVisible(false);
		}


		// Verifica interação com o NPC "Vanessa"
		const overlapping = this.physics.overlap(this.tyler, this.vanessa);

		if (overlapping) {
			this.tecla_E.setVisible(true);

			// Verifica se a tecla "E" foi pressionada
			if (Phaser.Input.Keyboard.JustDown(this.control.interacao)) {
				this.caixaDialogo.setVisible(true);
				this.textoVanessa.setVisible(true);
				if (mudarCena === 0) {
					this.mostrarProximoDialogo()
				}
				else {
					this.mostrarProximoDialogoVolta()
				}
			}
		} else {
			this.caixaDialogo.setVisible(false);
			this.textoVanessa.setVisible(false);
		}
	}

	//Criando metódo para mudar de cena
	transicaoParaCena(cena) {
		this.scene.start(cena); // Inicia a cena 1
		this.mudaDialogo = 0
		this.passosConcreto.stop()
		this.musica_escritorio.stop();

	}
}
