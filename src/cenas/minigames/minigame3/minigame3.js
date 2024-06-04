// Importa os módulos necessários
import Animacao from '../../../player/animation.js'; // Importa um módulo de gerenciamento de animações
import Player from '../../../player/player.js'; // Importa a classe Player
import Camera from '../../../player/camera.js'; // Importa a classe Camera
import Controls from '../../../player/controles.js'; // Importa a classe Controls
import Texto from '../../../player/texto.js'; // Importa o módulo de texto
import dialogs from '../../../player/dialogos.js'; // Importa a classe dialogs
import pergunt from '../minigame1/perguntas.js'; // Importa a classe pergunt

//Inicia a classe Scene3, ou a cena da sala do rei
export default class Minigame3 extends Phaser.Scene {
	constructor() {
		super({
			key: 'minigame3'
		});
		//Define se o texto está em andamento antes de começar o próximo
		this.textoEmAndamento = false;
		//Define a posição do dialogo na lista de falas para controlar quando cada uma aparecerá
		this.posicaoFala = 0
		this.interacaoExecutada = false;
	}

	//Carrega os arquivos necessários
	preload() {
		//carrega o mapa do Tiled
		this.load.tilemapTiledJSON(
			'map_castle_minigame3',
			'./src/assets/mapas/castelo/sala_rei_minigame3.JSON'
		);
		//carrega o png do castelo
		this.load.image('tile_castelo', './src/assets/mapas/castelo/salarei.png');
		//carrega a caixa diálogo
		this.load.image('caixaDialogo', './src/assets/caixaDialogo.png');
		//carrega o sprite do rei
		this.load.spritesheet(
			'rei',
			'./src/assets/sprites_personagens/assets_rei/rei.png',
			{ frameWidth: 32, frameHeight: 32 }
		);

		//carrega o sprite do Gizmo
		this.load.spritesheet(
			'gizmoPersonagem',
			'./src/assets/sprites_personagens/Gizmo.png',
			{ frameWidth: 32, frameHeight: 32 }
		);

		//carrega o sprite da Aysla
		this.load.spritesheet(
			'ayslaPersonagem',
			'./src/assets/sprites_personagens/aysla.png',
			{ frameWidth: 32, frameHeight: 32 }
		);

		//carrega o sprite do mago
		this.load.spritesheet(
			'mago',
			'./src/assets/sprites_personagens/mago.png',
			{ frameWidth: 32, frameHeight: 32 }
		);

		//carrega o sprite da elfa
		this.load.spritesheet(
			'elfa',
			'./src/assets/sprites_personagens/elfa.png',
			{ frameWidth: 32, frameHeight: 32 }
		);

		//carrega a imagem de interação da letra E
		this.load.image('tecla_e', './src/assets/tecla_e_pixel.png');
		//carrega os botões de aceitar ou negociar
		this.load.image('botaoAceitar', './src/assets/elementosJogo/botaoAceitar.png'); // Carrega a imagem do botão de aceitar
		this.load.image('botaoNegociar', './src/assets/elementosJogo/botaoNegociar.png'); // Carrega a imagem do botão de recusar
	}

	//Cria os arquivos necessários
	create() {
		//O som de passos é iniciado
		const idioma = this.registry.get('idioma');
		this.passosConcreto = this.sound
			.add('passosConcreto', { loop: true });
		// Trasição de fade in para quando a cena iniciar
		this.cameras.main.fadeIn(1000, 0, 0, 0);
		//Chama as funções que criam o mapa e o personagem
		this.criarMapa();
		this.criarPersonagem();
		//Chama as funções que criam os controles e o npc
		this.criarNpc();
		//Tecla de sinalização do rei
		this.tecla_sinalizcao = this.add
			.sprite(this.rei.x, this.rei.y - 50, 'tecla_sinalizacao')
			.setOrigin(0.5, 0.5)
			.setVisible(true)
			.setScale(2);
		//botões
		this.botaoAceitar = this.add.image(380, 570, 'botaoAceitar').setScale(0.3).setVisible(false);
		this.botaoNegociar = this.add.image(510, 570, 'botaoNegociar').setScale(0.3).setVisible(false);
		//Implementa a caixa de diálogo e a deixa invisivel
		this.caixaDialogo = this.add
			.image(this.tyler.x, this.tyler.y + 40, 'caixaDialogo')
			.setScale(0.6)
			.setVisible(false);

		//implementa a variável que imprime o texto
		this.textoNovo = this.add
			.text(this.tyler.x + 80, this.tyler.y + 80, '', {
				fontFamily: 'Arial',
				fontSize: 10,
				color: 'black',
				resolution: 4
			})
			.setOrigin(0.5);

		//Define a palavra aceitar para o botão, isso mudará a depender do idioma escolhido
		this.dialogoAceitar = this.add.text(
			345, 560,
			pergunt[idioma]['aceitar'],
			{ fontFamily: 'Arial', fontSize: 16, color: 'black', fontStyle: 'bold', align: 'center', resolution: 4 }
		)
		//dialogoAceitar se torna invisível		
		this.dialogoAceitar.setVisible(false)

		//Define a palavra negociar para o botão, isso mudará a depender do idioma escolhido
		this.dialogoNegociar = this.add.text(
			467, 560,
			pergunt[idioma]['negociar'],
			{ fontFamily: 'Arial', fontSize: 16, color: 'black', fontStyle: 'bold', align: 'center', resolution: 4 }
		)

		this.avisoE = this.add.text(
			358, 530,
			pergunt[idioma]['avisoE'],
			{ fontFamily: 'Arial', fontSize: 16, color: 'black', fontStyle: 'bold', align: 'center', resolution: 4 }
		)
		//dialogoNegociar se torna invisível	
		this.dialogoNegociar.setVisible(false)
		this.avisoE.setVisible(true)


		//Adicione o icone da tecla E e a deixa invisível
		this.tecla_E = this.add
			.sprite(this.tyler.x, this.tyler.y - 40, 'tecla_e')
			.setOrigin(0.5, 0.5)
			.setVisible(true)
			.setScale(2)
			.setInteractive();
	}

	//função responsável por mostrar o diálogo na tela
	mostrarProximoDialogo() {
		const idioma = this.registry.get('idioma'); // Obtenha o idioma selecionado

		const falas = dialogs[idioma]['dialogo_minigame3']; // Carregue as falas de acordo com o idioma
		if (!this.textoEmAndamento && this.posicaoFala < falas.length) { //se o texto estiver em andamento e o número da variável dialogos for menor que o tamanho da lista de falas, ele faz isso:
			Texto.textoDialogo(this, falas[this.posicaoFala], this.textoNovo); //imprime o texto
		}
	}


	//Cria o mapa
	criarMapa() {
		this.map = this.make.tilemap({ key: 'map_castle_minigame3' });
		this.tilesetCast = this.map.addTilesetImage('salarei', 'tile_castelo');

		this.ground = this.map.createLayer('ground', this.tilesetCast, 0, 0);
		this.passar = this.map.createLayer('passar_fase', this.tilesetCast, 0, 0);
		this.voltar = this.map.createLayer('voltar_fase', this.tilesetCast, 0, 0);

		this.ground.setCollisionByProperty({ collider: true });
	}

	//Cria os personagens
	criarPersonagem() {

		const spawnPointMinigame = this.map.findObject(
			'spawnMinigame',
			(objects) => objects.name === 'spawning point outra'
		);

		this.tyler = new Player(
			this,
			spawnPointMinigame.x,
			spawnPointMinigame.y,
			'tyler_armor',
			1.2
		); // Criação do jogador em outra posição
		this.controls = new Controls(this, this.tyler); // Criação dos controles associados ao jogador
		// Cria o jogador, câmera e controles

		this.camera = new Camera(this, this.tyler, this.map);
		this.camera.createZoom_1();

		// Adiciona colisor entre o jogador e o chão
		this.physics.add.collider(this.tyler, this.ground);

		// Cria as animações utilizand  o o Animacao
		Animacao.TylerArmaduraAnimacao(this);
	}
	criarNpc() {
		// Configuração inicial dos NPC's
		const spawnPointNpc = this.map.findObject(
			'rei',
			(objects) => objects.name === 'spawning point rei'
		);

		const spawnpointAysla = this.map.findObject(
			'aysla',
			(objects) => objects.name === 'spawnpointAysla'
		);

		const spawnpointMago = this.map.findObject(
			'mago',
			(objects) => objects.name === 'spawnpointMago'
		);

		const spawnpointElfa = this.map.findObject(
			'Elfa',
			(objects) => objects.name === 'spawnpointElfa'
		);

		const spawnpointGizmo = this.map.findObject(
			'gizmo',
			(objects) => objects.name === 'spawnpointGizmo'
		);


		//Cria os NPC's imóveis
		this.rei = this.physics.add
			.sprite(spawnPointNpc.x, spawnPointNpc.y, 'rei')
			.setScale(1.2);

		this.gizmoPersonagem = this.physics.add
			.sprite(spawnpointGizmo.x, spawnpointGizmo.y, 'gizmoPersonagem')
			.setScale(1.2);

		this.ayslaPersonagem = this.physics.add
			.sprite(spawnpointAysla.x, spawnpointAysla.y, 'ayslaPersonagem')
			.setScale(1.2);

		this.mago = this.physics.add
			.sprite(spawnpointMago.x, spawnpointMago.y, 'mago')
			.setScale(1.2);

		this.elfa = this.physics.add
			.sprite(spawnpointElfa.x, spawnpointElfa.y, 'elfa')
			.setScale(1.2);
	}

	//funçôes que controla os dialogos de todos os personagens
	dialogoRei() {
		//Torna a caixaDialogo visível
		this.caixaDialogo.setVisible(true).setScale(0.4)
		//define a posição da caixaDialogo e do texto
		this.caixaDialogo.setPosition(this.rei.x, this.rei.y + 50);
		this.textoNovo.setPosition(this.rei.x, this.rei.y + 50);
		//chama a função que vai mostrar o diálogo
		this.mostrarProximoDialogo()
	}
	//mesma explicação para as funções abaixo

	dialogoTyler() {
		this.caixaDialogo.setVisible(true).setScale(0.5)
		this.caixaDialogo.setPosition(this.tyler.x, this.tyler.y + 40);
		this.textoNovo.setPosition(this.tyler.x, this.tyler.y + 40);
		this.mostrarProximoDialogo()
	}
	dialogoTodos() {
		this.caixaDialogo.setPosition(this.elfa.x, this.elfa.y + 40).setScale(0.3)
		this.textoNovo.setPosition(this.elfa.x, this.elfa.y + 40)
		this.mostrarProximoDialogo()

	}
	dialogoGizmo(passoFrente) {
		//determina a posição em que o Gizmo fala pela primeira vez para ele dar um passo a frente
		if (this.posicaoFala === 8) {
			//movimenta o Gizmo de acordo com o parametro passado
			this.gizmoPersonagem.x += passoFrente
		}
		//essa mesma explicação vale para as funções abaixo

		this.caixaDialogo.setPosition(this.gizmoPersonagem.x, this.gizmoPersonagem.y + 40).setScale(0.3).setVisible(true)
		this.textoNovo.setPosition(this.gizmoPersonagem.x, this.gizmoPersonagem.y + 38)
		this.mostrarProximoDialogo()

	}

	dialogoAysla(passoFrente) {
		if (this.posicaoFala === 15) {
			this.ayslaPersonagem.x += passoFrente
		}
		this.caixaDialogo.setPosition(this.ayslaPersonagem.x, this.ayslaPersonagem.y + 40).setScale(0.3)
		this.textoNovo.setPosition(this.ayslaPersonagem.x, this.ayslaPersonagem.y + 40)
		this.mostrarProximoDialogo()
	}
	dialogoMago(passoFrente) {
		if (this.posicaoFala === 31) {
			this.mago.x += passoFrente
		}
		this.caixaDialogo.setPosition(this.mago.x, this.mago.y + 40).setScale(0.3)
		this.textoNovo.setPosition(this.mago.x, this.mago.y + 40)
		this.mostrarProximoDialogo()
	}

	dialogoElfa(passoFrente) {
		if (this.posicaoFala === 38) {
			this.elfa.x += passoFrente
		}
		this.caixaDialogo.setPosition(this.elfa.x, this.elfa.y + 30).setScale(0.3)
		this.textoNovo.setPosition(this.elfa.x, this.elfa.y + 30)
		this.mostrarProximoDialogo()
	}

	negociar(verificaPosicao) {
		//define os assets usados como visíveis
		this.caixaDialogo.setVisible(true)
		this.dialogoNegociar.setVisible(true)
		this.dialogoAceitar.setVisible(true)
		this.botaoAceitar.setVisible(true).setInteractive()
		this.botaoNegociar.setVisible(true).setInteractive()
		//se o botão de aceitar for clicado:
		this.botaoAceitar.on('pointerdown', () => {
			//verifica se a posição do dialogo é a mesma passada pelo parâmetro para não acrescer o posicaoFala mais de uma vez
			if (this.posicaoFala === verificaPosicao) {
				//torna os assets de volta para invisiveis e soma um a poiscaoDialogo
				this.botaoAceitar.setVisible(false)
				this.botaoNegociar.setVisible(false)
				this.dialogoAceitar.setVisible(false)
				this.dialogoNegociar.setVisible(false)
				this.posicaoFala += 1

				/*verifica se a negociação é de um determinado personagem, se for, quando o personagem apertar aceitar, 
				o dialogo pula para o acordo final desse personagem*/
				//Aysla
				if (verificaPosicao === 16 || verificaPosicao === 20 || verificaPosicao === 24) {
					this.posicaoFala = 29
				}
				//Romeo
				if (verificaPosicao === 32) {
					this.posicaoFala = 36
				}
				//Celeste
				if (this.posicaoFala === 39) {
					this.posicaoFala = 52
				}
				//Celeste
				if (verificaPosicao === 47) {
					this.posicaoFala = 51
				}
				this.dialogoTyler()
			}
		});
		//se o botão negociar for pressionado
		this.botaoNegociar.on('pointerdown', () => {
			//verifica se a posição do dialogo é a mesma passada pelo parâmetro para não acrescer o posicaoFala mais de uma vez
			if (this.posicaoFala === verificaPosicao) {
				//torna os assets de volta para invisiveis
				this.botaoAceitar.setVisible(false)
				this.botaoNegociar.setVisible(false)
				this.dialogoAceitar.setVisible(false)
				this.dialogoNegociar.setVisible(false)
				//posicaoFala soma 2, assim, ele vai para o diálogo depois do próximo
				this.posicaoFala += 2
				//define se a recusa já aconteceu várias vezes, havendo intervenção do rei
				if (this.posicaoFala === 49) {
					this.dialogoRei()
					this.dialogoAceitar.setVisible(true)
				}
				//se a recusa ainda não aconteceu várias vezes, o Tyler responde
				else {
					this.dialogoTyler()
				}
				this.posicaoFala += 1
			}
		});
	}
	//define todas as posições de diálogos que o Tyler se comunica
	numerosTyler = [2, 4, 6, 7, 13, 14, 17, 18, 21, 22, 25, 26, 28, 29, 30, 34, 36, 37, 41, 45, 48, 51, 52];
	//define todas as posições onde o player pode negociar
	numerosNegociar = [9, 16, 20, 24, 32, 39, 43, 47]

	//Função que controla os diálogos através dos cliques do E
	executarInteracao() {
		console.log(this.posicaoFala); // Debug para verificar a posição atual antes de qualquer ação

		if (this.posicaoFala < 2) {
			this.dialogoRei()
			this.posicaoFala++
		}

		//verifica se o diálogo é de todos e o exibe quando o jogador apertar 'E'
		else if (this.posicaoFala === 3 || this.posicaoFala === 5) {
			this.dialogoTodos()
			this.posicaoFala++
		}

		//verifica se o diálogo é do Gizmo e o exibe quando o jogador apertar 'E'
		else if (this.posicaoFala === 8 || this.posicaoFala === 12) {
			//o -50 é passado como parâmetro e serve para o personagem dar um passo a frente
			this.dialogoGizmo(-50)
			this.posicaoFala++
		}
		//verifica se a posicaoFala está dentro de numerosTyler e exibe o diálogo do Tyler quando o jogador apertar 'E'
		else if (this.numerosTyler.includes(this.posicaoFala)) {
			this.dialogoTyler()
			this.posicaoFala++
		}
		//verifica se o diálogo é da Aysla e o exibe quando o jogador apertar 'E'
		else if (this.posicaoFala === 15 || this.posicaoFala === 19 || this.posicaoFala === 23 || this.posicaoFala === 27) {
			this.dialogoAysla(-50)
			this.posicaoFala++
		}
		//verifica se o diálogo é do mago e o exibe quando o jogador apertar 'E'
		else if (this.posicaoFala === 31 || this.posicaoFala === 35) {
			this.dialogoMago(-50)
			this.posicaoFala++
		}

		//verifica se o diálogo é da elfa e o exibe quando o jogador apertar 'E'
		else if (this.posicaoFala === 38 || this.posicaoFala === 42 || this.posicaoFala === 46) {
			this.dialogoElfa(-50)
			this.posicaoFala++
		}
	}

	update() {
		//ações que serão tomadas quando o E for pressionado ou clicado
		/* Algumas delas não são chamadas na função do clique pois elas precisam de ação imediata, ou seja, o 
		diálogo aparece logo após alguma negociação, sem a necessidade de apertar E novamente */

		if (this.posicaoFala === 53) {
			this.posicaoFala++
		}

		if (this.posicaoFala === 54) {
			//muda para a próxima cena
			if (Phaser.Input.Keyboard.JustDown(this.controls.interacao)) {
				this.fazerTransicaoDiaSeguinte()
				this.posicaoFala = 55
			}
		}

		if (this.posicaoFala === 54) {
			this.tecla_E.on('pointerdown', () => {
				//muda para a próxima cena
				this.posicaoFala = 55
				this.fazerTransicaoDiaSeguinte()
				console.log(this.posicaoFala)
			});
		}

		//controla os cliques do E e chama a função que exibe os diálogos
		this.tecla_E.on('pointerdown', () => {
			if (!this.interacaoExecutada) {  // Verifica se a interação já foi executada
				this.executarInteracao();
				this.interacaoExecutada = true;  // Atualiza a variável de controle
			}
		});
		this.interacaoExecutada = false;

		if (this.posicaoFala === 10) {
			this.dialogoTyler()
			this.posicaoFala = 14
		}
		//Posições que o Tyler fala duas vezes seguidas, então o diálogo é acrescido em um sem passar por outras condições
		else if (this.posicaoFala === 29 || this.posicaoFala === 36) {
			this.posicaoFala++
		}

		//verifica se a posicao do diálogo é igual a alguma posição referente às negociações
		else if (this.numerosNegociar.includes(this.posicaoFala)) {
			//a posição é passada como parâmetro
			this.negociar(this.posicaoFala)
		}

		//verifica se o acordo com a elfa foi firmado, se sim, pula para a posição que finaliza o diálogo
		else if (this.posicaoFala === 40 || this.posicaoFala === 44 || this.posicaoFala === 51) {
			this.posicaoFala = 52
			//muda para a próxima cena
		}

		//verifica se o Tyler atingiu o limite de cliques em "negociar", se sim, o rei interver
		else if (this.posicaoFala === 49) {
			this.dialogoRei()
			this.posicaoFala++
		}
		//cria um único botão de aceitar para o jogador não conseguir recusar
		else if (this.posicaoFala === 50) {
			//deixa os assets necessários visíveis
			this.caixaDialogo.setVisible(true)
			this.botaoAceitar.setVisible(true)
			this.botaoAceitar.setInteractive();
			this.botaoAceitar.on('pointerdown', () => {
				//deixa os assets necessários invisíveis
				this.botaoAceitar.setVisible(false)
				this.botaoNegociar.setVisible(false)
				this.dialogoAceitar.setVisible(false)
				//posicaoFala recebe a última posição da negociação
				this.posicaoFala = 51
			});
		}

		//verifica se o texto não está em andamento
		if (this.posicaoFala < 2) {
			if (Phaser.Input.Keyboard.JustDown(this.controls.interacao)) {
				this.dialogoRei()
				this.posicaoFala++
			}
		}

		//verifica se o diálogo é de todos e o exibe quando o jogador apertar 'E'
		if (this.posicaoFala === 3 || this.posicaoFala === 5) {
			if (Phaser.Input.Keyboard.JustDown(this.controls.interacao)) {
				this.dialogoTodos()
				this.posicaoFala++
			}
		}

		//verifica se o diálogo é do Gizmo e o exibe quando o jogador apertar 'E'
		if (this.posicaoFala === 8 || this.posicaoFala === 12) {
			if (Phaser.Input.Keyboard.JustDown(this.controls.interacao)) {
				//o -50 é passado como parâmetro e serve para o personagem dar um passo a frente
				this.dialogoGizmo(-50)
				this.posicaoFala++
			}
		}
		//verifica se a posicaoFala está dentro de numerosTyler e exibe o diálogo do Tyler quando o jogador apertar 'E'
		if (this.numerosTyler.includes(this.posicaoFala)) {
			if (Phaser.Input.Keyboard.JustDown(this.controls.interacao)) {
				this.dialogoTyler()
				this.posicaoFala++
			}
		}
		//verifica se o diálogo é da Aysla e o exibe quando o jogador apertar 'E'
		if (this.posicaoFala === 15 || this.posicaoFala === 19 || this.posicaoFala === 23 || this.posicaoFala === 27) {
			if (Phaser.Input.Keyboard.JustDown(this.controls.interacao)) {
				this.dialogoAysla(-50)
				this.posicaoFala++
			}
		}
		//verifica se o diálogo é do mago e o exibe quando o jogador apertar 'E'
		if (this.posicaoFala === 31 || this.posicaoFala === 35) {
			if (Phaser.Input.Keyboard.JustDown(this.controls.interacao)) {
				this.dialogoMago(-50)
				this.posicaoFala++
			}
		}
		/*verifica se a posição do dialogo é igual a 10 (tyler aceita a proposta do Gizmo), se sim, 
		automaticamente a posicaoFala recebe 14 (finalização do diálogo com o Gizmo), para garantir a fluidez dos diálogos*/
		if (this.posicaoFala === 10) {
			this.dialogoTyler()
			this.posicaoFala = 14
		}
		//Posições que o Tyler fala duas vezes seguidas, então o diálogo é acrescido em um sem passar por outras condições
		if (this.posicaoFala === 29 || this.posicaoFala === 36) {
			this.posicaoFala++
		}

		//verifica se o diálogo é da elfa e o exibe quando o jogador apertar 'E'
		if (this.posicaoFala === 38 || this.posicaoFala === 42 || this.posicaoFala === 46) {
			if (Phaser.Input.Keyboard.JustDown(this.controls.interacao)) {
				this.dialogoElfa(-50)
				this.posicaoFala++
			}
		}

		//verifica se a posicao do diálogo é igual a alguma posição referente às negociações
		if (this.numerosNegociar.includes(this.posicaoFala)) {
			//a posição é passada como parâmetro
			this.negociar(this.posicaoFala)
		}

		//verifica se o acordo com a elfa foi firmado, se sim, pula para a posição que finaliza o diálogo
		if (this.posicaoFala === 40 || this.posicaoFala === 44 || this.posicaoFala === 51) {
			this.posicaoFala = 52
		}

		//verifica se o Tyler atingiu o limite de cliques em "negociar", se sim, o rei interver
		if (this.posicaoFala === 49) {
			if (Phaser.Input.Keyboard.JustDown(this.controls.interacao)) {
				this.dialogoRei()
				this.posicaoFala++
			}
		}
		//cria um único botão de aceitar para o jogador não conseguir recusar
		if (this.posicaoFala === 50) {
			//deixa os assets necessários visíveis
			this.caixaDialogo.setVisible(true)
			this.botaoAceitar.setVisible(true)
			this.botaoAceitar.setInteractive();
			this.botaoAceitar.on('pointerdown', () => {
				//deixa os assets necessários invisíveis
				this.botaoAceitar.setVisible(false)
				this.botaoNegociar.setVisible(false)
				this.dialogoAceitar.setVisible(false)
				//posicaoFala recebe a última posição da negociação
				this.posicaoFala = 51
			});
		}

		//os icones acompanham o Tyler
		this.tecla_E.setPosition(this.tyler.x, this.tyler.y - 40);
		//verifica se a velocidade do tyler é maior q 0 ou não
		if (
			(this.tyler.body.velocity.x !== 0 || this.tyler.body.velocity.y !== 0) &&
			!this.passosConcreto.isPlaying
		) {
			this.passosConcreto.play(); // Reproduz o som dos passos
		} else if (
			this.tyler.body.velocity.x === 0 &&
			this.tyler.body.velocity.y === 0 &&
			this.passosConcreto.isPlaying
		) {
			this.passosConcreto.stop(); // Para o som dos passos se o jogador não estiver se movendo
		}

		// Fade out
		this.tweens.add({
			targets: this.avisoE.main,
			alpha: 0,
			duration: 1000,
			ease: 'Linear',
			onComplete: () => {
				// Espera 2 segundos antes de desvanecer
				this.time.delayedCall(2000, () => {
					// Fade in
					this.tweens.add({
						targets: this.avisoE,
						alpha: 1,
						duration: 1000,
						ease: 'Linear'
					});
				}, [], this);
			}
		});

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
					this.registry.set('mudarCenaCastelo', 7);
					this.scene.start('cena_castelo')
					// Restaura a visão da cena
					this.cameras.main.fadeIn(1000, 0, 0, 0);
				});
			}
		});
	}

	//função que muda a cena e cancela o áudio que estava passando
	transitionToScene2(cena) {
		this.scene.start(cena); // Inicia a cena 1
		this.passosConcreto.stop();
	}
}