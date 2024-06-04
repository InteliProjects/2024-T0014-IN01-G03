// Importa os módulos necessários
import Animacao from '../../player/animation.js'; // Importa um módulo de gerenciamento de animações
import Player from '../../player/player.js'; // Importa a classe Player
import Camera from '../../player/camera.js'; // Importa a classe Camera
import Controls from '../../player/controles.js'; // Importa a classe Controls
import Texto from '../../player/texto.js'; // Importa o módulo de texto
import dialogs from '../../player/dialogos.js';


export default class Festa extends Phaser.Scene {
	constructor() {
		super({
			key: 'cena_festa',
		});

		//variaveis que controlam se o texto está em andamento e inicia a fala dos NPC's como 0
		this.textoEmAndamento = false;
		this.falasFinal = 0;
		this.falasAysla = 0
		this.falasLoja = 0
		this.falasGizmo = 0
		this.falasRomeu = 0
		this.falasCeleste = 0
	}

	//carrega os arquivos necessários
	preload() {
		this.load.tilemapTiledJSON(
			'map_festa',
			'./src/assets/mapas/mapa_metaConnect/metaConnect.json'
		);
		this.load.image(
			'objetos_assets',
			'./src/assets/mapas/mapa_metaConnect/festa_assets.png'
		);
		this.load.image(
			'samplemap_assets',
			'./src/assets/mapas/mapa_metaConnect/samplemap.png'
		);

		//carrega todos os sprites
		this.load.spritesheet(
			'npc1',
			'./src/assets/sprites_personagens/assets_npc1/npc1.png',
			{ frameWidth: 32, frameHeight: 32 }
		);

		this.load.spritesheet(
			'npc2',
			'./src/assets/sprites_personagens/assets_npc1/npc2.png',
			{ frameWidth: 32, frameHeight: 32 }
		);


		this.load.spritesheet(
			'npc3',
			'./src/assets/sprites_personagens/assets_npc1/npc3.png',
			{ frameWidth: 32, frameHeight: 32 }
		);

		this.load.spritesheet(
			'npc4',
			'./src/assets/sprites_personagens/assets_npcVitiligo/npcvitiligo.png',
			{ frameWidth: 32, frameHeight: 32 }
		);

		this.load.spritesheet(
			'rei',
			'./src/assets/sprites_personagens/assets_rei/rei.png',
			{ frameWidth: 32, frameHeight: 32 }
		);

		this.load.spritesheet(
			'donoLoja',
			'./src/assets/sprites_personagens/assets_donoLoja/donoloja1.png',
			{ frameWidth: 32, frameHeight: 32 }
		);

		this.load.spritesheet(
			'festaGizmo',
			'./src/assets/sprites_personagens/Gizmo.png',
			{ frameWidth: 32, frameHeight: 32 }
		);

		this.load.spritesheet(
			'festaAysla',
			'./src/assets/sprites_personagens/aysla.png',
			{ frameWidth: 32, frameHeight: 32 }
		);

		this.load.spritesheet(
			'festaRomeu',
			'./src/assets/sprites_personagens/mago.png',
			{ frameWidth: 32, frameHeight: 32 }
		);

		this.load.spritesheet(
			'festaCeleste',
			'./src/assets/sprites_personagens/elfa.png',
			{ frameWidth: 32, frameHeight: 32 }
		);

		this.load.spritesheet(
			'escriba',
			'./src/assets/sprites_personagens/assets_escriba/escriba.png',
			{ frameWidth: 32, frameHeight: 32 }
		);

	}

	create() {
		//pausa a música de fundo antes de começar a cena
		const cenaFesta = this.scene.get('cena_corredor').currentScene;
		if (cenaFesta && cenaFesta.musicaFundo) {
			cenaFesta.musicaFundo.pause();
		}
		//adiciona os áudios útilizados na cena
		this.passosConcreto = this.sound
			.add('passosConcreto', { loop: true });
		this.musicaFestival = this.sound
			.add('musicaFestival', { loop: true });
		this.musicaFestival.play()
		// Trasição de fade in para quando a cena iniciar
		this.cameras.main.fadeIn(1000, 0, 0, 0);
		// Cria o mapa, personagem e controles
		this.criarMapa();
		this.criarPersonagem();
		this.criarNpc();
		this.controls.create();

		//criação dos personagens que vão se movimentar
		this.npc1 = this.physics.add.sprite(450, 350, 'npc1').setScale(1.2).setImmovable();  // Posição inicial do NPC1
		this.npc2 = this.physics.add.sprite(620, 450, 'npc2').setScale(1.2).setImmovable();  // Posição inicial do NPC2
		this.npc3 = this.physics.add.sprite(340, 500, 'npc3').setScale(1.2).setImmovable();  // Posição inicial do NPC3
		this.escriba = this.physics.add.sprite(350, 300, 'escriba').setScale(1.2).setImmovable();  // Posição inicial da escriba
		this.npc4 = this.physics.add.sprite(500, 500, 'npc4').setScale(1.2).setImmovable();  // Posição inicial do NPC4

		//habilita a colisão entre o Tyler e os personagens que
		this.physics.add.collider(this.tyler, this.npc1);
		this.physics.add.collider(this.tyler, this.npc2);
		this.physics.add.collider(this.tyler, this.npc3);
		this.physics.add.collider(this.tyler, this.npc4);
		this.physics.add.collider(this.tyler, this.escriba);

		//cria as animações para os personagens que vão se movimentar
		this.anims.create({
			key: 'npc1_walk',  // Nome da animação
			frames: this.anims.generateFrameNumbers('npc1', { start: 3, end: 5 }),  // Quadros da animação
			frameRate: 10,  // Velocidade da animação (quadros por segundo)
			repeat: -1  // -1 para repetir infinitamente
		});

		this.anims.create({
			key: 'npc2_walk',
			frames: this.anims.generateFrameNumbers('npc2', { start: 3, end: 5 }),
			frameRate: 10,
			repeat: -1
		});

		this.anims.create({
			key: 'npc3_walk_up',
			frames: this.anims.generateFrameNumbers('npc3', { start: 9, end: 12 }),
			frameRate: 10,
			repeat: -1
		});

		this.anims.create({
			key: 'npc3_walk_down',
			frames: this.anims.generateFrameNumbers('npc3', { start: 0, end: 2 }),  // Quadros da animação
			frameRate: 10,
			repeat: -1
		});

		this.anims.create({
			key: 'npc4_walk',
			frames: this.anims.generateFrameNumbers('npc4', { start: 3, end: 5 }),  // Quadros da animação
			frameRate: 10,
			repeat: -1
		});

		this.anims.create({
			key: 'escriba_walk',
			frames: this.anims.generateFrameNumbers('escriba', { start: 0, end: 11 }),
			frameRate: 10,
			repeat: -1
		});

		//cria as váriaveis relacionadas aos textos e caixas de texto
		this.caixaDialogo = this.add
			.image(this.tyler.x, this.tyler.y + 50, 'caixaDialogo')
			.setScale(0.5)
			.setDepth(5)
			.setVisible(false);

		this.textoNpc = this.add
			.text(this.tyler.x, this.tyler.y + 50, '', {
				fontFamily: 'Arial',
				fontSize: 10,
				color: 'black',
				resolution: 4,
			})
			.setOrigin(0.5)
			.setDepth(5);

		//adiciona a tecla E a sinalização
		this.tecla_E = this.add
			.sprite(this.tyler.x, this.tyler.y - 40, 'tecla_e')
			.setOrigin(0.5, 0.5)
			.setVisible(false)
			.setScale(2)
			.setInteractive()
			.setDepth(5);

		this.tecla_sinalizcao = this.add
			.sprite(this.reiFesta.x, this.reiFesta.y - 40, 'tecla_sinalizacao')
			.setOrigin(0.5, 0.5)
			.setVisible(true)
			.setScale(2);


		//verifica se a tecla E foi apertada
		this.tecla_E.on('pointerup', () => {
			//verifica se o tyler aproximou do rei
			const overlapping = this.physics.overlap(this.tyler, this.reiFesta);

			//Habilita a conversa do Tyler com o rei
			if (overlapping) {
				this.caixaDialogo.setVisible(true);
				this.textoNpc.setVisible(true);
				this.mostrarProximoDialogo()

			} else {
				this.tecla_E.setVisible(false);
			}

		});

	}

	//função que exibe o diálogo do rei
	mostrarProximoDialogo() {
		const idioma = this.registry.get('idioma'); // Obtenha o idioma selecionado

		const falas = dialogs[idioma]['dialogo_cena_metaConnect_rei']; // Carregue as falas de acordo com o idioma
		if (!this.textoEmAndamento && this.falasFinal < falas.length) {
			Texto.textoDialogo(this, falas[this.falasFinal], this.textoNpc);
			this.falasFinal++; // Incrementa o índice para o próximo diálogo
		}
		else if (this.falasFinal === falas.length) {
			//Faz o efeito fadeout e muda de cena
			this.transicaoParaCena('resumo_etapa4');
		}
	}

	//função que controla o dialogo do dono da loja
	mostrarProximoDialogoDonoLoja() {
		const idioma = this.registry.get('idioma'); // Obtenha o idioma selecionado

		const falas = dialogs[idioma]['dialogo_loja_festa']; // Carregue as falas de acordo com o idioma
		Texto.textoDialogo(this, falas[this.falasLoja], this.textoNpc);
	}

	mostrarProximoDialogoGizmo() {
		const idioma = this.registry.get('idioma'); // Obtenha o idioma selecionado

		const falas = dialogs[idioma]['dialogo_gizmo_festa']; // Carregue as falas de acordo com o idioma

		Texto.textoDialogo(this, falas[this.falasGizmo], this.textoNpc);
	}

	mostrarProximoDialogoRomeu() {
		const idioma = this.registry.get('idioma'); // Obtenha o idioma selecionado

		const falas = dialogs[idioma]['dialogo_romeu_festa']; // Carregue as falas de acordo com o idioma
		Texto.textoDialogo(this, falas[this.falasRomeu], this.textoNpc);
	}

	mostrarProximoDialogoCeleste() {
		const idioma = this.registry.get('idioma'); // Obtenha o idioma selecionado

		const falas = dialogs[idioma]['dialogo_celeste_festa']; // Carregue as falas de acordo com o idioma

		Texto.textoDialogo(this, falas[this.falasCeleste], this.textoNpc);

	}

	mostrarProximoDialogoAysla() {
		const idioma = this.registry.get('idioma'); // Obtenha o idioma selecionado

		const falas = dialogs[idioma]['dialogo_aysla_festa']; // Carregue as falas de acordo com o idioma
		Texto.textoDialogo(this, falas[this.falasAysla], this.textoNpc);
	}

	fazerTransicaoDiaSeguinte() {
		// Escurece a tela
		this.cameras.main.fadeOut(1000, 0, 0, 0, (camera, progress) => {
			if (progress === 1) {
				// Após o desvanecimento completo, mostra o texto "1 dia depois"
				let textoDiaDepois = this.add.text(this.tyler.body.x, this.tyler.body.y, '1 dia depois', {
					fontFamily: 'Arial',
					fontSize: '32px',
					color: '#FFFFFF',
					resolution: 4,
				}).setOrigin(0.5);

				// Configura o tempo para remover o texto e restaurar a visão da cena após 2 segundos
				this.time.delayedCall(2000, () => {
					// Remove o texto
					textoDiaDepois.destroy();
					// Restaura a visão da cena
					this.cameras.main.fadeIn(1000, 0, 0, 0);
				});
			}
		});
	}

	//cria o mapa
	criarMapa() {
		this.map = this.make.tilemap({ key: 'map_festa' });

		this.objectTiles = this.map.addTilesetImage(
			'samplemap',
			'samplemap_assets'
		);
		this.assetsObject = this.map.addTilesetImage(
			'festa_assets',
			'objetos_assets'
		);

		this.groundFesta = this.map.createLayer('ground', this.assetsObject, 0, 0);
		this.ponteFesta = this.map.createLayer('ponte', this.objectTiles, 0, 0);
		this.chaoFesta = this.map.createLayer('chao', this.assetsObject, 0, 0);
		this.decoracaoFesta = this.map.createLayer('decoracao', this.assetsObject, 0, 0);
		this.estatuasFesta = this.map.createLayer('estatuas', this.assetsObject, 0, 0);
		this.tendasFesta = this.map.createLayer('tendas', this.assetsObject, 0, 0);
		this.objetosFesta = this.map.createLayer('objetos', this.assetsObject, 0, 0);
		this.plantinhasFesta = this.map.createLayer('plantinhas', this.assetsObject, 0, 0);
		this.comidasFesta = this.map.createLayer('comidas', this.assetsObject, 0, 0);

		//cria as colisões do mapa
		this.ponteFesta.setCollisionByProperty({ collider: true })
		this.tendasFesta.setCollisionByProperty({ collider: true })
		this.objetosFesta.setCollisionByProperty({ collider: true })
		this.decoracaoFesta.setCollisionByProperty({ collider: true })
		this.estatuasFesta.setCollisionByProperty({ collider: true })
		this.plantinhasFesta.setCollisionByProperty({ collider: true })

		this.objetosFesta.setDepth(2)
		this.comidasFesta.setDepth(2)
		this.plantinhasFesta.setDepth(4)
	}

	//cria o personagem principal
	criarPersonagem() {
		// Pegando o valor da variável global
		const mudarCena = this.registry.get('mudarCenaFesta');
		// Encontra o ponto de spawn do jogador no mapa
		const spawnPoint = this.map.findObject(
			'player',
			(objects) => objects.name === 'spawning point player'
		);

		if (mudarCena === 0) {
			this.tyler = new Player(
				this,
				spawnPoint.x,
				spawnPoint.y,
				'tyler_armor',
				1.2
			);
			this.controls = new Controls(this, this.tyler);
		}

		// Cria o jogador, câmera e controles

		this.camera = new Camera(this, this.tyler, this.map);
		this.camera.createZoom_1();

		// Adiciona colisor entre o jogador e o chão
		this.physics.add.collider(this.tyler, this.ponteFesta);
		this.physics.add.collider(this.tyler, this.tendasFesta);
		this.physics.add.collider(this.tyler, this.objetosFesta);
		this.physics.add.collider(this.tyler, this.decoracaoFesta);
		this.physics.add.collider(this.tyler, this.estatuasFesta);
		this.physics.add.collider(this.tyler, this.plantinhasFesta);

		this.tyler.setDepth(3);

		// Cria as animações utilizando o Animacao
		Animacao.TylerArmaduraAnimacao(this);
	}
	criarNpc() {
		// Configuração inicial dos NPC's imóveis
		const spawnPointRei = this.map.findObject(
			'rei',
			(objects) => objects.name === 'spawning point rei'
		);

		const spawnPointLoja = this.map.findObject(
			'donoLoja',
			(objects) => objects.name === 'spawning point donoLoja'
		);

		const spawnPointGizmo = this.map.findObject(
			'gizmo',
			(objects) => objects.name === 'spawning point gizmo'
		);

		const spawnPointRomeu = this.map.findObject(
			'romeu',
			(objects) => objects.name === 'spawning point romeu'
		);

		const spawnPointAysla = this.map.findObject(
			'aysla',
			(objects) => objects.name === 'spawning point aysla'
		);

		const spawnPointCeleste = this.map.findObject(
			'celeste',
			(objects) => objects.name === 'spawning point celeste'
		);
		// Criação dos NPC's imóveis
		this.reiFesta = this.physics.add
			.sprite(spawnPointRei.x, spawnPointRei.y, 'rei', 4)
			.setScale(1.2);

		this.lojaFesta = this.physics.add
			.sprite(spawnPointLoja.x, spawnPointLoja.y, 'donoLoja')
			.setScale(1.2).setImmovable();;

		this.gizmoFesta = this.physics.add
			.sprite(spawnPointGizmo.x, spawnPointGizmo.y, 'festaGizmo', 10)
			.setScale(1.2).setDepth(4).setImmovable();;

		this.romeuFesta = this.physics.add
			.sprite(spawnPointRomeu.x, spawnPointRomeu.y, 'festaRomeu')
			.setScale(1.2).setImmovable();;

		this.celesteFesta = this.physics.add
			.sprite(spawnPointCeleste.x, spawnPointCeleste.y, 'festaCeleste', 7)
			.setScale(1.2).setImmovable();;

		this.ayslaFesta = this.physics.add
			.sprite(spawnPointAysla.x, spawnPointAysla.y, 'festaAysla')
			.setScale(1.2).setImmovable();;

	}

	update() {
		//permite o uso dos controles do jogo
		this.controls.update();
		//posiciona os itens dentro do jogo
		this.tecla_E.setPosition(this.tyler.x, this.tyler.y - 40);
		this.caixaDialogo.setPosition(this.tyler.x, this.tyler.y + 50);
		this.textoNpc.setPosition(this.tyler.x, this.tyler.y + 50);

		// Faz o NPC1 andar de um lado para o outro
		if (this.npc1.body.velocity.x === 0) {
			this.npc1.body.velocity.x = 50;  // Velocidade horizontal
			this.npc1.play('npc1_walk', true);  // Iniciar a animação de caminhar
			this.npc1.setFlip(true)
		} else if (this.npc1.body.velocity.x > 0 && this.npc1.x > 670) {
			this.npc1.body.velocity.x = -50;  // Mudar a direção
			this.npc1.play('npc1_walk', true);  // Iniciar a animação de caminhar
			this.npc1.setFlip(false)
		} else if (this.npc1.body.velocity.x < 300 && this.npc1.x < 400) {
			this.npc1.body.velocity.x = 50;  // Mudar a direção
			this.npc1.play('npc1_walk', true);  // Iniciar a animação de caminhar
			this.npc1.setFlip(true)
		}

		// Faz o NPC2 andar de um lado para o outro
		if (this.npc2.body.velocity.x === 0) {
			this.npc2.body.velocity.x = 50;  // Velocidade horizontal
			this.npc2.play('npc2_walk', true);  // Iniciar a animação de caminhar
			this.npc2.setFlip(true)
		} else if (this.npc2.body.velocity.x > 0 && this.npc2.x > 670) {
			this.npc2.body.velocity.x = -50;  // Mudar a direção
			this.npc2.play('npc2walk', true);  // Iniciar a animação de caminhar
			this.npc2.setFlip(false)
		} else if (this.npc2.body.velocity.x < 600 && this.npc2.x < 650) {
			this.npc2.body.velocity.x = 50;  // Mudar a direção
			this.npc2.play('npc2_walk', true);  // Iniciar a animação de caminhar
			this.npc2.setFlip(true)
		}

		// Faz o NPC3 andar de um lado para o outro
		if (this.npc3.body.velocity.y === 0) {
			this.npc3.body.velocity.y = 50;  // Velocidade horizontal
			this.npc3.play('npc3_walk_down', false);  // Iniciar a animação de caminhar
			this.npc3.setFlip(true)
		} else if (this.npc3.body.velocity.y > 0 && this.npc3.y > 580) {
			this.npc3.body.velocity.y = -50;  // Mudar a direção
			this.npc3.play('npc3_walk_up', false);  // Iniciar a animação de caminhar
			this.npc3.setFlip(false)
		} else if (this.npc3.body.velocity.y < 300 && this.npc3.y < 330) {
			this.npc3.body.velocity.y = 50;  // Mudar a direção
			this.npc3.play('npc3_walk_down', false);  // Iniciar a animação de caminhar
			this.npc3.setFlip(true)
		}

		// Faz o NPC4 andar de um lado para o outro
		if (this.npc4.body.velocity.x === 0) {
			this.npc4.body.velocity.x = 50;  // Velocidade horizontal
			this.npc4.play('npc4_walk', true);  // Iniciar a animação de caminhar
			this.npc4.setFlip(true)
		} else if (this.npc4.body.velocity.x > 0 && this.npc4.x > 670) {
			this.npc4.body.velocity.x = -50;  // Mudar a direção
			this.npc4.play('npc4_walk', true);  // Iniciar a animação de caminhar
			this.npc4.setFlip(false)
		} else if (this.npc4.body.velocity.x < 300 && this.npc4.x < 400) {
			this.npc4.body.velocity.x = 50;  // Mudar a direção
			this.npc4.play('npc4_walk', true);  // Iniciar a animação de caminhar
			this.npc4.setFlip(true)
		}

		// Faz a escriba dançar
		this.escriba.play('escriba_walk', true);  // Iniciar a animação de caminhar
		this.escriba.setFlip(true)

		//verifica se o player se move ou não para controlar o áudio do caminhar
		if (
			(this.tyler.body.velocity.x !== 0 || this.tyler.body.velocity.y !== 0) &&
			!this.passosConcreto.isPlaying
		) {
			this.passosConcreto.play(); // Reproduz o som dos passos
			this.caixaDialogo.setVisible(false);
			this.textoNpc.setVisible(false)
		} else if (
			this.tyler.body.velocity.x === 0 &&
			this.tyler.body.velocity.y === 0 &&
			this.passosConcreto.isPlaying
		) {
			this.passosConcreto.stop(); // Para o som dos passos se o jogador não estiver se movendo
		}

		//verifica se o tyler aproximou do rei
		const overlapping = this.physics.overlap(this.tyler, this.reiFesta);

		//Habilita a conversa do Tyler com o rei
		if (overlapping) {
			this.tecla_E.setVisible(true);

			// Verifica se a tecla "E" foi pressionada
			if (Phaser.Input.Keyboard.JustDown(this.controls.interacao)) {
				this.caixaDialogo.setVisible(true);
				this.textoNpc.setVisible(true);
				this.mostrarProximoDialogo()
			}

		} else {
			this.tecla_E.setVisible(false);
		}

		//Habilita os diálogos para quando o Tyler colidir com os NPC's
		this.physics.add.collider(this.tyler, this.lojaFesta, function () {
			this.caixaDialogo.setVisible(true);
			this.textoNpc.setVisible(true);
			this.mostrarProximoDialogoDonoLoja()
		}, null, this);

		this.physics.add.collider(this.tyler, this.gizmoFesta, function () {
			this.caixaDialogo.setVisible(true);
			this.textoNpc.setVisible(true);
			this.mostrarProximoDialogoGizmo()
		}, null, this);

		this.physics.add.collider(this.tyler, this.romeuFesta, function () {
			this.caixaDialogo.setVisible(true);
			this.textoNpc.setVisible(true);
			this.mostrarProximoDialogoRomeu()
		}, null, this);

		this.physics.add.collider(this.tyler, this.celesteFesta, function () {
			this.caixaDialogo.setVisible(true);
			this.textoNpc.setVisible(true);
			this.mostrarProximoDialogoCeleste()
		}, null, this);

		this.physics.add.collider(this.tyler, this.ayslaFesta, function () {
			this.caixaDialogo.setVisible(true);
			this.textoNpc.setVisible(true);
			this.mostrarProximoDialogoAysla()
		}, null, this);
	}

	transicaoParaCena(cena) {
		this.scene.start(cena); // Inicia a cena 1
		this.passosConcreto.stop();
		this.musicaFestival.stop();
	}
}
