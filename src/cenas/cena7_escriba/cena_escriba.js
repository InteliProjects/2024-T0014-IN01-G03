// Importa os módulos necessários
import Animacao from '../../player/animation.js'; // Importa um módulo de gerenciamento de animações
import Player from '../../player/player.js'; // Importa a classe Player
import Camera from '../../player/camera.js'; // Importa a classe Camera
import Controls from '../../player/controles.js'; // Importa a classe Controls
import Texto from '../../player/texto.js'; // Importa o módulo de texto
import dialogs from '../../player/dialogos.js'; //Importando os diálogos do jogo

// Define e exporta a classe Scene2
export default class Escriba extends Phaser.Scene {
	constructor() {
		super({
			key: 'cena_escriba',
		});

		// Variáveis para controlar as falas
		this.textoEmAndamento = false;
		this.falas1 = 0;
		this.falas2 = 0;
		this.falas3 = 0;
		this.falas4 = 0;

	}

	// Pré-carrega os recursos necessários
	preload() {
		this.load.image('tiles_escriba', './src/assets/mapas/escriba/cena_escriba.png');
		this.load.tilemapTiledJSON(
			'map_escriba',
			'./src/assets/mapas/escriba/escriba.json'
		);
		this.load.spritesheet(
			'escriba',
			'./src/assets/sprites_personagens/assets_escriba/escriba.png',
			{ frameWidth: 32, frameHeight: 32 }
		);
	}

	// Cria os elementos do jogo
	create() {
		// Pegando o valor da variável global
		const mudarCena = this.registry.get('mudarCenaEscriba');
		// Áudios do jogo
		this.passosConcreto = this.sound
			.add('passosConcreto', { loop: true });
		this.passosConcreto.play()


		// Trasição de fade in para quando a cena iniciar
		this.cameras.main.fadeIn(1000, 0, 0, 0);

		// Criando métodos para o jogo
		this.criarMapa();
		this.criarPersonagem();
		this.control.create();
		this.criarNpc();

		// Criando a caixa de diálogo e os textos
		this.caixaDialogo = this.add.image(500, 350, 'caixaDialogo').setScale(0.6);
		this.caixaDialogo.setVisible(false);
		this.textoEscriba = this.add
			.text(500, 350, '', {
				fontFamily: 'Arial',
				fontSize: 11,
				color: 'black',
				resolution: 4,
			})
			.setOrigin(0.5);

		this.textoEscriba2 = this.add
			.text(500, 350, '', {
				fontFamily: 'Arial',
				fontSize: 11,
				color: 'black',
				resolution: 4,
			})
			.setOrigin(0.5);

		this.textoEscriba3 = this.add
			.text(500, 350, '', {
				fontFamily: 'Arial',
				fontSize: 11,
				color: 'black',
				resolution: 4,
			})
			.setOrigin(0.5);

		this.textoEscriba4 = this.add
			.text(500, 350, '', {
				fontFamily: 'Arial',
				fontSize: 11,
				color: 'black',
				resolution: 4,
			})
			.setOrigin(0.5);

		this.tecla_sinalizcao = this.add
			.sprite(this.escriba.x, this.escriba.y - 30, 'tecla_sinalizacao')
			.setOrigin(0.5, 0.5)
			.setVisible(true)
			.setScale(2);

		// Adicionando texto à cena com opacidade inicial 0 (invisível)
		const text = this.add.text(50, 100, 'Sala do Escriba (Scribs Room)', {
			fontSize: '20px',
			fill: '#ffffff',
			resolution: 4
		}).setAlpha(0);

		// Fazendo o texto aparecer (fade in) e depois desaparecer (fade out)
		this.tweens.add({
			targets: text,
			alpha: 1,
			ease: 'Linear', // Tipo de transição
			duration: 2000, // Duração do fade in
			hold: 1000, // Quanto tempo o texto fica visível antes do fade out
			yoyo: true, // Faz o efeito reverter após completar (realiza o fade out)
			repeat: 0 // Quantas vezes o efeito deve se repetir (-1 para infinito)
		});

		// Criando botão de interação E
		this.tecla_E = this.add
			.sprite(this.tyler.x + 90, this.tyler.y - 50, 'tecla_e')
			.setOrigin(0.5, 0.5)
			.setVisible(false)
			.setScale(2)
			.setInteractive();

		this.tecla_E.on('pointerup', () => {
			//Constante para se há sobreposição do tyler no escriba
			const overlapping = this.physics.overlap(this.tyler, this.escriba);

			if (overlapping) {
				this.tecla_E.setVisible(true);
				this.caixaDialogo.setVisible(true);

				if (this.escriba.spriteFrame === 1) { // Se o sprite atual for o frame 4
					this.escriba.setTexture('escriba', 4); // Altera o sprite para o frame 1
					this.escriba.spriteFrame = 4; // Atualiza o frame atual do sprite do NPC
				}

				if (mudarCena === 0) {
					this.mostrarProximoDialogo()
					this.textoEscriba2.setVisible(true);
				}

				else if (mudarCena === 1) {
					this.mostrarProximoDialogo1()
					this.textoEscriba.setVisible(true);
				}
				else if (mudarCena === 2) {
					this.mostrarProximoDialogo2()
					this.textoEscriba3.setVisible(true);
				}

				else if (mudarCena === 3) {
					this.mostrarProximoDialogo3()
					this.textoEscriba4.setVisible(true);

				}
			}

		});


	}

	criarMapa() {
		// Cria o mapa e define o tileset
		this.map = this.make.tilemap({ key: 'map_escriba' });
		this.tilesetEscriba = this.map.addTilesetImage(
			'cena_escriba',
			'tiles_escriba'
		);
		// Cria as camadas do mapa
		this.ground = this.map.createLayer('ground', this.tilesetEscriba, 0, 0);
		this.entrada = this.map.createLayer('entrada', this.tilesetEscriba, 0, 0);
		// Define colisões com base nas propriedades do mapa
		this.ground.setCollisionByProperty({ collider: true });
		this.ground.setDepth(-1)
	}

	// Métodos para o diálogo funcionar
	//Dialaogo 2
	mostrarProximoDialogo() {
		const idioma = this.registry.get('idioma');
		const falas = dialogs[idioma]['dialogo_cena_escriba2'];

		if (!this.textoEmAndamento && this.falas1 < falas.length) {
			Texto.textoDialogo(this, falas[this.falas1], this.textoEscriba2);
			this.falas1++;
		}
		else if (this.falas1 === falas.length) {
			//this.falas2 = 0;
			this.registry.set('mudarCenaCastelo', 2);

		}
	}

	//Dialogo 1
	mostrarProximoDialogo1() {
		const idioma = this.registry.get('idioma');
		const falas = dialogs[idioma]['dialogo_cena_escriba'];
		if (!this.textoEmAndamento && this.falas2 < falas.length) {
			Texto.textoDialogo(this, falas[this.falas2], this.textoEscriba);
			this.falas2++;
		} else if (this.falas2 === falas.length) {
			//this.falas2 = 0;
			this.transicaoParaCena("minigame1");
			this.registry.set('mudarCenaEscriba', 0);
		}
	}

	mostrarProximoDialogo2() {
		const idioma = this.registry.get('idioma');
		const falas = dialogs[idioma]['dialogo_cena_escriba3'];
		if (!this.textoEmAndamento && this.falas3 < falas.length) {
			Texto.textoDialogo(this, falas[this.falas3], this.textoEscriba3);
			this.falas3++;
		} else if (this.falas3 === falas.length) {
			//this.falas3 = 0;
			this.transicaoParaCena("minigame2")
		}
	}

	mostrarProximoDialogo3() {
		const idioma = this.registry.get('idioma');
		const falas = dialogs[idioma]['dialogo_cena_escriba4'];
		if (!this.textoEmAndamento && this.falas4 < falas.length) {
			Texto.textoDialogo(this, falas[this.falas4], this.textoEscriba4);
			this.falas4++;
		} else if (this.falas4 === falas.length) {
			//this.falas3 = 0;
			this.registry.set('mudarCenaCastelo', 4);
		}
	}

	criarPersonagem() {
		// Pegando o valor da variável global
		const mudarCena = this.registry.get('mudarCenaEscriba')
		// Encontra o ponto de spawn do jogador no mapa
		const spawnPoint = this.map.findObject(
			'player',
			(objects) => objects.name === 'spawning point player'
		);

		const spawnPointVoltar = this.map.findObject(
			'voltar',
			(objects) => objects.name === 'spawning point voltar'
		);
		if (mudarCena === 3) {
			this.tyler = new Player(
				this,
				spawnPointVoltar.x,
				spawnPointVoltar.y,
				'tyler_armor',
				1.2
			); // Criação do jogador em uma posição específica
			this.control = new Controls(this, this.tyler); // Criação dos controles associados ao jogador
		}
		if (mudarCena === 2) {
			this.tyler = new Player(
				this,
				spawnPoint.x,
				spawnPoint.y,
				'tyler_armor',
				1.2
			); // Criação do jogador em uma posição específica
			this.control = new Controls(this, this.tyler); // Criação dos controles associados ao jogador
		}

		if (mudarCena === 1) {
			this.tyler = new Player(
				this,
				spawnPoint.x,
				spawnPoint.y,
				'tyler_armor',
				1.2
			); // Criação do jogador em uma posição específica
			this.control = new Controls(this, this.tyler); // Criação dos controles associados ao jogador
		}

		if (mudarCena === 0) {
			this.tyler = new Player(
				this,
				spawnPointVoltar.x,
				spawnPointVoltar.y,
				'tyler_armor',
				1.2
			); // Criação do jogador em uma posição específica
			this.control = new Controls(this, this.tyler); // Criação dos controles associados ao jogador
		}

		// Adiciona colisor entre o jogador e o chão
		this.physics.add.collider(this.tyler, this.ground);

		// Cria as animações utilizando o Animacao
		Animacao.TylerArmaduraAnimacao(this);

		// Cria o jogador, câmera e controles
		this.camera = new Camera(this, this.tyler, this.map);
		this.camera.createZoom_1();

		this.tyler.setDepth(-1)
	}

	criarNpc() {
		// Configuração inicial do NPC
		const spawnPointNpc = this.map.findObject(
			'escriba',
			(objects) => objects.name === 'spawning point escriba'
		);

		// Criação do NPC Escriba
		this.escriba = this.physics.add
			.sprite(spawnPointNpc.x, spawnPointNpc.y, 'escriba', 1)
			.setScale(1.2).setDepth(-1).setSize(55, 60);

		// Mudar a posição do sprite
		this.escriba.spriteFrame = 1;
	}

	// Atualiza o jogo
	update() {
		// Pegando o valor da variável global
		const mudarCena = this.registry.get('mudarCenaEscriba');
		//Setando as posições dos elementos
		this.tecla_E.setPosition(this.tyler.x, this.tyler.y - 40);


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
		// Atualiza os controles do jogador
		this.control.update();
		// Verifica se o jogador atingiu a posição de transição de cena
		if (this.entrada.hasTileAtWorldXY(this.tyler.body.x, this.tyler.body.y)) {
			this.transicaoParaCena('cena_castelo');
		}

		//Constante para se há sobreposição do tyler no escriba
		const overlapping = this.physics.overlap(this.tyler, this.escriba);

		// Se houver habilita para interagir
		if (overlapping) {
			this.tecla_E.setVisible(true);

			// Verifica se a tecla "E" foi pressionada
			if (Phaser.Input.Keyboard.JustDown(this.control.interacao)) {
				this.caixaDialogo.setVisible(true);


				if (this.escriba.spriteFrame === 1) { // Se o sprite atual for o frame 4
					this.escriba.setTexture('escriba', 4); // Altera o sprite para o frame 1
					this.escriba.spriteFrame = 4; // Atualiza o frame atual do sprite do NPC
				}

				if (mudarCena === 0) {
					this.mostrarProximoDialogo()
					this.textoEscriba2.setVisible(true);
				}

				else if (mudarCena === 1) {
					this.mostrarProximoDialogo1()
					this.textoEscriba.setVisible(true);
				}
				else if (mudarCena === 2) {
					this.mostrarProximoDialogo2()
					this.textoEscriba3.setVisible(true);
				}

				else if (mudarCena === 3) {
					this.mostrarProximoDialogo3()
					this.textoEscriba4.setVisible(true);
				}
			}
		} else {
			this.tecla_E.setVisible(false);
			this.caixaDialogo.setVisible(false);
			this.textoEscriba.setVisible(false);
			this.textoEscriba2.setVisible(false);
			this.textoEscriba3.setVisible(false);
			this.textoEscriba4.setVisible(false);
		}
	}

	// Método para transição para a cena
	transicaoParaCena(cena) {
		this.scene.start(cena);
		this.passosConcreto.stop();
	}
}