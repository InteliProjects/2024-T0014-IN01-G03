// Importa os módulos necessários
import Animacao from '../../player/animation.js'; // Importa um módulo de gerenciamento de animações
import Player from '../../player/player.js'; // Importa a classe Player
import Camera from '../../player/camera.js'; // Importa a classe Camera
import Controls from '../../player/controles.js'; // Importa a classe Controls
import Texto from '../../player/texto.js'; // Importa o módulo de texto
import dialogs from '../../player/dialogos.js'; //Importando os diálogos do jogo

//Inicia a classe Scene3, ou a cena da sala do rei
export default class Scene3 extends Phaser.Scene {
	constructor() {
		super({
			key: 'cena_castelo',
		});

		// Criando variáveis para controlar a fala
		this.textoEmAndamento = false;
		this.falasRei = 0;
		this.falasRei2 = 0;
		this.falasRei3 = 0;
		this.falasRei4 = 0;
		this.falasRei5 = 0;
		this.falasRei6 = 0;
		this.falasRei7 = 0;
		this.falasRei8 = 0;
		this.falasRei9 = 0;
		this.falasGuarda = 0;
		this.falasAviso = 0;
	}

	//Carrega os arquivos necessários
	preload() {
		this.load.tilemapTiledJSON(
			'map_castle',
			'./src/assets/mapas/castelo/sala_rei.json'
		);
		this.load.image('tile_castelo', './src/assets/mapas/castelo/salarei.png');
		this.load.image('caixaDialogo', './src/assets/caixaDialogo.png');
		this.load.spritesheet(
			'rei',
			'./src/assets/sprites_personagens/assets_rei/rei.png',
			{ frameWidth: 32, frameHeight: 32 }
		);
		this.load.image('tecla_e', './src/assets/tecla_e_pixel.png');
		this.load.image('etapa1', './src/assets/elementosJogo/etapa1.png');
		this.load.spritesheet(
			'npcGuarda',
			'./src/assets/sprites_personagens/assets_npc2/npccastelo2.png',
			{ frameWidth: 32, frameHeight: 32 }
		);
	}

	//Cria os arquivos necessários
	create() {
		//Som do piano
		this.som_piano = this.sound.add('somPiano', { loop: false });
		this.somRelogio = this.sound.add('somRelogio', { loop: false });


		// Pegando o valor das variáveis globais
		const idioma = this.registry.get('idioma');
		const mudarCena = this.registry.get('mudarCenaCastelo');
		//O som de passos é iniciado
		this.passosConcreto = this.sound
			.add('passosConcreto', { loop: true });


		// Trasição de fade in para quando a cena iniciar
		this.cameras.main.fadeIn(1000, 0, 0, 0);
		//Chama as funções que criam o mapa e o personagem
		this.criarMapa();
		this.criarPersonagem();
		this.criarQuadrado()
		//Implementa a caixa de diálogo e a deixa invisivel
		this.caixaDialogo = this.add
			.image(this.tyler.x, this.tyler.y + 40, 'caixaDialogo')
			.setScale(0.88)
			.setVisible(false);

		this.caixaDialogo2 = this.add
			.image(this.tyler.x, this.tyler.y + 40, 'caixaDialogo')
			.setScale(0.4)
			.setVisible(false);

		this.caixaDialogo3 = this.add
			.image(this.tyler.x, this.tyler.y + 40, 'caixaDialogo')
			.setScale(0.4)
			.setVisible(false);
		//Chama as funções que criam os controles e o npc
		this.controls.create();
		this.criarNpc();

		//Imagem para mostrar as etapas
		this.etapa = this.add
			.sprite(155, 325, 'etapas')
			.setOrigin(0.5, 0.5)
			.setVisible(true)
			.setScale(0.15);
		//Tecla de sinalização do rei
		this.tecla_sinalizcao = this.add
			.sprite(this.rei.x, this.rei.y + 40, 'tecla_sinalizacao')
			.setOrigin(0.5, 0.5)
			.setVisible(true)
			.setFlipY(true)
			.setScale(2);

		//Imagem da seta para mostrar a sinalizacao
		this.seta = this.add
			.sprite(670, 445, 'seta_sinalizacao')
			.setOrigin(0.5, 0.5)
			.setVisible(false)
			.setScale(3)
			.setDepth(-1);

		// Configurando o texto de entrada e o texto da etapa
		const text = this.add.text(18, 350, dialogs[idioma]['texto_boasvindas_castelo'], {
			fontSize: '23px',
			fill: '#ffffff',
			resolution: 4,
		}).setAlpha(0);

		const textFalarRei = this.add.text(18, 345, dialogs[idioma]['faleComRei'], {
			fontSize: '23px',
			fill: '#ffffff'
		}).setAlpha(0);

		const textEtapa = this.add.text(18, 310, dialogs[idioma]['texto_etapa1'], {
			fontSize: '16px',
			fill: '#ffffff',
			fontStyle: 'bold',
			resolution: 4,
		}).setAlpha(0);

		const textEtapa2 = this.add.text(18, 310, dialogs[idioma]['texto_etapa2'], {
			fontSize: '16px',
			fill: '#ffffff',
			fontStyle: 'bold',
			resolution: 4,
		}).setAlpha(0);

		const textEtapa3 = this.add.text(18, 310, dialogs[idioma]['texto_etapa3'], {
			fontSize: '16px',
			fill: '#ffffff',
			fontStyle: 'bold',
			resolution: 4,
		}).setAlpha(0);

		const textEtapa4 = this.add.text(18, 310, dialogs[idioma]['texto_etapa4'], {
			fontSize: '16px',
			fill: '#ffffff',
			fontStyle: 'bold',
			resolution: 4,
		}).setAlpha(0);

		const textEtapa6 = this.add.text(18, 310, dialogs[idioma]['texto_etapa5'], {
			fontSize: '16px',
			fill: '#ffffff',
			fontStyle: 'bold',
			resolution: 4,
		}).setAlpha(0);


		// Criando o botão de interação 
		this.tecla_E = this.add
			.sprite(this.tyler.x, this.tyler.y - 40, 'tecla_e')
			.setOrigin(0.5, 0.5)
			.setVisible(false)
			.setScale(2)
			.setInteractive();

		// Configurando a interação do botão
		this.tecla_E.on('pointerup', () => {
			//Habilita a função de overlap do Tyler e rei
			const overlapping = this.physics.overlap(this.tyler, this.rei);

			//Verifica se o Tyler está passando por cima do rei
			if (overlapping) {
				this.tecla_E.setVisible(true);
				//Controla as falas que serão exibidas a depender de quantas vezes a cena foi exibida
				if (mudarCena === 0 || mudarCena === 1) {
					// Verifica se a tecla "E" foi pressionada
					this.caixaDialogo.setVisible(true);
					this.textoRei.setVisible(true)
					//As falas passam uma a uma
					this.mostrarProximoDialogo();
				} else if (mudarCena === 2) {
					//verifica se a tecla E foi apertada
					this.caixaDialogo.setVisible(true);
					this.textoRei.setVisible(true)
					//as falas das falas2 são exibidas uma a uma
					this.mostrarProximoDialogo2()
				}

				else if (mudarCena === 3) {
					//verifica se a tecla E foi apertada
					this.caixaDialogo.setVisible(true);
					this.textoRei.setVisible(true)
					//as falas das falas2 são exibidas uma a uma
					this.mostrarProximoDialogo3()
				}

				else if (mudarCena === 4) {
					//verifica se a tecla E foi apertada
					this.caixaDialogo.setVisible(true);
					this.textoRei.setVisible(true)
					//as falas das falas2 são exibidas uma a uma
					this.mostrarProximoDialogo4()
				}

				else if (mudarCena === 5) {
					//verifica se a tecla E foi apertada
					this.caixaDialogo.setVisible(true);
					this.textoRei.setVisible(true)
					//as falas das falas2 são exibidas uma a uma
					this.mostrarProximoDialogo5()
				}

				else if (mudarCena === 6) {
					//verifica se a tecla E foi apertada
					this.caixaDialogo.setVisible(true);
					this.textoRei.setVisible(true)
					//as falas das falas2 são exibidas uma a uma
					this.mostrarProximoDialogo6()
				}

				else if (mudarCena === 7) {
					//verifica se a tecla E foi apertada
					this.caixaDialogo.setVisible(true);
					this.textoRei.setVisible(true)
					//as falas das falas2 são exibidas uma a uma
					this.mostrarProximoDialogo7()
				}

				else if (mudarCena === 8) {
					//verifica se a tecla E foi apertada
					this.caixaDialogo.setVisible(true);
					this.textoRei.setVisible(true)
					//as falas das falas2 são exibidas uma a uma
					this.mostrarProximoDialogo8()
				}

				else if (mudarCena === 9) {
					//verifica se a tecla E foi apertada
					this.caixaDialogo.setVisible(true);
					this.textoRei.setVisible(true)
					//as falas das falas2 são exibidas uma a uma
					this.mostrarProximoDialogo9()
				}
			}
		});

		// Verificando se o mudarCena for igual a 0 e mostrando os textos
		if (mudarCena === 0) {
			// Fazendo o texto aparecer (fade in) e depois desaparecer (fade out)
			this.tweens.add({
				targets: textEtapa,
				alpha: 1,
				ease: 'Linear', // Tipo de transição
				duration: 4000, // Duração do fade in
				hold: 2000, // Quanto tempo o texto fica visível antes do fade out
				yoyo: true, // Faz o efeito reverter após completar (realiza o fade out)
				repeat: 0 // Quantas vezes o efeito deve se repetir (-1 para infinito)
			});

			// Fazendo o texto aparecer (fade in) e depois desaparecer (fade out)
			this.tweens.add({
				targets: text,
				alpha: 1,
				ease: 'Linear', // Tipo de transição
				duration: 4000, // Duração do fade in
				hold: 2000, // Quanto tempo o texto fica visível antes do fade out
				yoyo: true, // Faz o efeito reverter após completar (realiza o fade out)
				repeat: 0 // Quantas vezes o efeito deve se repetir (-1 para infinito)
			});

			this.time.delayedCall(4000, () => {
				this.tweens.add({
					targets: this.etapa,
					alpha: 0,
					duration: 4000, // Duração da transição de fade out
					onComplete: () => {
						this.etapa.setVisible(false); // Oculta a imagem após o fade out
					}
				});
			});
		}

		else if (mudarCena === 3) {
			this.tweens.add({
				targets: textFalarRei,
				alpha: 1,
				ease: 'Linear', // Tipo de transição
				duration: 2000, // Duração do fade in
				hold: 2000, // Quanto tempo o texto fica visível antes do fade out
				yoyo: true, // Faz o efeito reverter após completar (realiza o fade out)
				repeat: 0 // Quantas vezes o efeito deve se repetir (-1 para infinito)
			});

			this.etapa.setVisible(false);
		}



		// Verificando se o mudarCena for igual a 0 e mostrando os textos
		else if (mudarCena === 5) {
			// Fazendo o texto aparecer (fade in) e depois desaparecer (fade out)
			this.tweens.add({
				targets: textEtapa2,
				alpha: 1,
				ease: 'Linear', // Tipo de transição
				duration: 2000, // Duração do fade in
				hold: 2000, // Quanto tempo o texto fica visível antes do fade out
				yoyo: true, // Faz o efeito reverter após completar (realiza o fade out)
				repeat: 0 // Quantas vezes o efeito deve se repetir (-1 para infinito)
			});

			this.tweens.add({
				targets: textFalarRei,
				alpha: 1,
				ease: 'Linear', // Tipo de transição
				duration: 2000, // Duração do fade in
				hold: 2000, // Quanto tempo o texto fica visível antes do fade out
				yoyo: true, // Faz o efeito reverter após completar (realiza o fade out)
				repeat: 0 // Quantas vezes o efeito deve se repetir (-1 para infinito)
			});

			this.time.delayedCall(4000, () => {
				this.tweens.add({
					targets: this.etapa,
					alpha: 0,
					duration: 2000, // Duração da transição de fade out
					onComplete: () => {
						this.etapa.setVisible(false); // Oculta a imagem após o fade out
					}
				});
			});
		}
		// Verificando se o mudarCena for igual a 0 e mostrando os textos
		else if (mudarCena === 6) {
			// Fazendo o texto aparecer (fade in) e depois desaparecer (fade out)
			this.tweens.add({
				targets: textEtapa3,
				alpha: 1,
				ease: 'Linear', // Tipo de transição
				duration: 2000, // Duração do fade in
				hold: 2000, // Quanto tempo o texto fica visível antes do fade out
				yoyo: true, // Faz o efeito reverter após completar (realiza o fade out)
				repeat: 0 // Quantas vezes o efeito deve se repetir (-1 para infinito)
			});

			this.tweens.add({
				targets: textFalarRei,
				alpha: 1,
				ease: 'Linear', // Tipo de transição
				duration: 2000, // Duração do fade in
				hold: 2000, // Quanto tempo o texto fica visível antes do fade out
				yoyo: true, // Faz o efeito reverter após completar (realiza o fade out)
				repeat: 0 // Quantas vezes o efeito deve se repetir (-1 para infinito)
			});

			this.time.delayedCall(4000, () => {
				this.tweens.add({
					targets: this.etapa,
					alpha: 0,
					duration: 2000, // Duração da transição de fade out
					onComplete: () => {
						this.etapa.setVisible(false); // Oculta a imagem após o fade out
					}
				});
			});
		}
		// Verificando se o mudarCena for igual a 0 e mostrando os textos
		else if (mudarCena === 8) {
			// Fazendo o texto aparecer (fade in) e depois desaparecer (fade out)
			this.tweens.add({
				targets: textEtapa4,
				alpha: 1,
				ease: 'Linear', // Tipo de transição
				duration: 2000, // Duração do fade in
				hold: 2000, // Quanto tempo o texto fica visível antes do fade out
				yoyo: true, // Faz o efeito reverter após completar (realiza o fade out)
				repeat: 0 // Quantas vezes o efeito deve se repetir (-1 para infinito)
			});

			this.tweens.add({
				targets: textFalarRei,
				alpha: 1,
				ease: 'Linear', // Tipo de transição
				duration: 2000, // Duração do fade in
				hold: 2000, // Quanto tempo o texto fica visível antes do fade out
				yoyo: true, // Faz o efeito reverter após completar (realiza o fade out)
				repeat: 0 // Quantas vezes o efeito deve se repetir (-1 para infinito)
			});

			this.time.delayedCall(4000, () => {
				this.tweens.add({
					targets: this.etapa,
					alpha: 0,
					duration: 2000, // Duração da transição de fade out
					onComplete: () => {
						this.etapa.setVisible(false); // Oculta a imagem após o fade out
					}
				});
			});
		}
		// Verificando se o mudarCena for igual a 0 e mostrando os textos
		else if (mudarCena === 9) {
			// Fazendo o texto aparecer (fade in) e depois desaparecer (fade out)
			this.tweens.add({
				targets: textEtapa6,
				alpha: 1,
				ease: 'Linear', // Tipo de transição
				duration: 2000, // Duração do fade in
				hold: 2000, // Quanto tempo o texto fica visível antes do fade out
				yoyo: true, // Faz o efeito reverter após completar (realiza o fade out)
				repeat: 0 // Quantas vezes o efeito deve se repetir (-1 para infinito)
			});

			this.tweens.add({
				targets: textFalarRei,
				alpha: 1,
				ease: 'Linear', // Tipo de transição
				duration: 2000, // Duração do fade in
				hold: 2000, // Quanto tempo o texto fica visível antes do fade out
				yoyo: true, // Faz o efeito reverter após completar (realiza o fade out)
				repeat: 0 // Quantas vezes o efeito deve se repetir (-1 para infinito)
			});


			this.time.delayedCall(4000, () => {
				this.tweens.add({
					targets: this.etapa,
					alpha: 0,
					duration: 2000, // Duração da transição de fade out
					onComplete: () => {
						this.etapa.setVisible(false); // Oculta a imagem após o fade out
					}
				});
			});
		}
		else {
			this.etapa.setVisible(false)
		}


	}

	//Cria o mapa
	criarMapa() {
		// Criando os assets do mapa
		this.map = this.make.tilemap({ key: 'map_castle' });
		this.tilesetCast = this.map.addTilesetImage('salarei', 'tile_castelo');

		// Criando as camadas
		this.ground = this.map.createLayer('ground', this.tilesetCast, 0, 0);
		this.piano = this.map.createLayer('piano', this.tilesetCast, 0, 0);
		this.passar = this.map.createLayer('passar_fase', this.tilesetCast, 0, 0);
		this.voltar = this.map.createLayer('voltar_fase', this.tilesetCast, 0, 0);

		// Ativando a colisão e informando que essa camada irá ficar abaixo das outras
		this.ground.setCollisionByProperty({ collider: true });
		this.piano.setCollisionByProperty({ collider: true })
		this.ground.setDepth(-1)
	}

	// Métodos para fazer o diálogo funcionar
	mostrarProximoDialogo() {
		const idioma = this.registry.get('idioma'); // Obtenha o idioma selecionado

		const falas = dialogs[idioma]['dialogo_cena_castelo']; // Carregue as falas de acordo com o idioma
		if (!this.textoEmAndamento && this.falasRei < falas.length) {
			Texto.textoDialogo(this, falas[this.falasRei], this.textoRei);
			this.falasRei++;
		}
		else if (this.falasRei === falas.length) {
			this.seta.setVisible(true)
		}
	}

	mostrarProximoDialogo2() {
		const idioma = this.registry.get('idioma'); // Obtenha o idioma selecionado
		const falas = dialogs[idioma]['dialogo_cena_castelo2']; // Carregue as falas de acordo com o idioma

		if (!this.textoEmAndamento && this.falasRei2 < falas.length) {
			Texto.textoDialogo(this, falas[this.falasRei2], this.textoRei);
			this.falasRei2++;
		} else if (this.falasRei2 === falas.length) {
			this.fazerTransicaoDiaSeguinte(3); // Chama a função para fazer a transição para o próximo dia	
			this.falasRei2++;
		}
	}

	mostrarProximoDialogo3() {
		const idioma = this.registry.get('idioma'); // Obtenha o idioma selecionado
		const falas = dialogs[idioma]['dialogo_cena_castelo3']; // Carregue as falas de acordo com o idioma

		if (!this.textoEmAndamento && this.falasRei3 < falas.length) {
			Texto.textoDialogo(this, falas[this.falasRei3], this.textoRei);
			this.falasRei3++;
		} else if (this.falasRei3 === falas.length) {


		}
	}

	mostrarProximoDialogo4() {
		const idioma = this.registry.get('idioma'); // Obtenha o idioma selecionado
		const falas = dialogs[idioma]['dialogo_cena_castelo4']; // Carregue as falas de acordo com o idioma

		if (!this.textoEmAndamento && this.falasRei4 < falas.length) {
			Texto.textoDialogo(this, falas[this.falasRei4], this.textoRei);
			this.falasRei4++;
		} else if (this.falasRei4 === falas.length) {
			this.scene.start('resumo_etapa1')
			this.falasRei4++;
		}
	}

	mostrarProximoDialogo5() {
		const idioma = this.registry.get('idioma'); // Obtenha o idioma selecionado
		const falas = dialogs[idioma]['dialogo_cena_castelo6']; // Carregue as falas de acordo com o idioma

		if (!this.textoEmAndamento && this.falasRei5 < falas.length) {
			Texto.textoDialogo(this, falas[this.falasRei5], this.textoRei);
			this.falasRei5++;
		} else if (this.falasRei5 === falas.length) {
			this.scene.start('resumo_etapa2')
			this.falasRei5++;
		}
	}

	mostrarProximoDialogo6() {
		const idioma = this.registry.get('idioma'); // Obtenha o idioma selecionado
		const falas = dialogs[idioma]['dialogo_cena_castelo7']; // Carregue as falas de acordo com o idioma

		if (!this.textoEmAndamento && this.falasRei6 < falas.length) {
			Texto.textoDialogo(this, falas[this.falasRei6], this.textoRei);
			this.falasRei6++;
		} else if (this.falasRei6 === falas.length) {
			this.fazerTransicaoDiaSeguinte();
			this.scene.start('minigame3');
			this.falasRei6++;
		}
	}

	mostrarProximoDialogo7() {
		const idioma = this.registry.get('idioma'); // Obtenha o idioma selecionado
		const falas = dialogs[idioma]['dialogo_cena_castelo8']; // Carregue as falas de acordo com o idioma

		if (!this.textoEmAndamento && this.falasRei7 < falas.length) {
			Texto.textoDialogo(this, falas[this.falasRei7], this.textoRei);
			this.falasRei7++;
		} else if (this.falasRei7 === falas.length) {
			this.scene.start('resumo_etapa3')
			this.falasRei7++;
		}
	}

	mostrarProximoDialogo8() {
		const idioma = this.registry.get('idioma'); // Obtenha o idioma selecionado
		const falas = dialogs[idioma]['dialogo_cena_castelo9']; // Carregue as falas de acordo com o idioma

		if (!this.textoEmAndamento && this.falasRei8 < falas.length) {
			Texto.textoDialogo(this, falas[this.falasRei8], this.textoRei);
			this.falasRei8++;
		} else if (this.falasRei8 === falas.length) {
			//this.fazerTransicaoDiaSeguinte(9);
			this.scene.start('cena_festa');
			this.falasRei8++;
		}
	}

	mostrarProximoDialogo9() {
		const idioma = this.registry.get('idioma'); // Obtenha o idioma selecionado
		const falas = dialogs[idioma]['dialogo_cena_castelo10']; // Carregue as falas de acordo com o idioma

		if (!this.textoEmAndamento && this.falasRei9 < falas.length) {
			Texto.textoDialogo(this, falas[this.falasRei9], this.textoRei);
			this.falasRei9++;
		} else if (this.falasRei9 === falas.length) {
			this.fazerTransicaoDiaSeguinte(0);
			this.scene.start('resumo_etapa5')
			this.falasRei9++;
		}
	}

	fazerTransicaoDiaSeguinte(valor) {
		// Escurece a tela
		this.cameras.main.fadeOut(1000, 0, 0, 0, (camera, progress) => {
			if (progress === 1) {
				this.somRelogio.play();
				// Após o desvanecimento completo, mostra o texto "1 dia depois"
				let textoDiaDepois = this.add.text(300, 300, '1 dia depois', {
					fontFamily: 'Arial',
					fontSize: '32px',
					color: '#FFFFFF',
					resolution: 4,
				}).setOrigin(0.5);

				// Configura o tempo para remover o texto e restaurar a visão da cena após 2 segundos
				this.time.delayedCall(1500, () => {
					// Remove o texto
					textoDiaDepois.destroy();
					this.scene.restart();
					this.registry.set('mudarCenaCastelo', valor)
					// Restaura a visão da cena
					this.cameras.main.fadeIn(1000, 0, 0, 0);
				});
			}
		});
	}

	//Cria os personagens
	criarPersonagem() {
		const mudarCena = this.registry.get('mudarCenaCastelo');
		// Encontra o ponto de spawn do jogador no mapa
		const spawnPoint = this.map.findObject(
			'player',
			(objects) => objects.name === 'spawning point player'
		);

		const spawnPointVolta = this.map.findObject(
			'voltar',
			(objects) => objects.name === 'spawning point voltar'
		);

		const spawnPointOutra = this.map.findObject(
			'outra',
			(objects) => objects.name === 'spawning point outra'
		);

		const spawnPointSegunda = this.map.findObject(
			'segunda',
			(objects) => objects.name === 'spawning point segunda'
		);

		//define os diferentes spawns se a cena estiver acontecendo pela primeira vez ou não
		if (mudarCena === 0) {
			this.tyler = new Player(
				this,
				spawnPoint.x,
				spawnPoint.y,
				'tyler_armor',
				1.2
			); // Criação do jogador em uma posição específica
			this.controls = new Controls(this, this.tyler); // Criação dos controles associados ao jogador
		}

		if (mudarCena === 1) {
			this.tyler = new Player(
				this,
				spawnPointVolta.x,
				spawnPointVolta.y,
				'tyler_armor',
				1.2
			); // Criação do jogador em outra posição
			this.controls = new Controls(this, this.tyler); // Criação dos controles associados ao jogador
		}
		if (mudarCena === 2) {
			this.registry.set('mudarCenaEscriba', 2);
			this.tyler = new Player(
				this,
				spawnPointOutra.x,
				spawnPointOutra.y,
				'tyler_armor',
				1.2
			); // Criação do jogador em outra posição
			this.controls = new Controls(this, this.tyler); // Criação dos controles associados ao jogador
		}

		if (mudarCena === 3) {
			this.tyler = new Player(
				this,
				spawnPoint.x,
				spawnPoint.y,
				'tyler_armor',
				1.2
			); // Criação do jogador em uma posição específica
			this.controls = new Controls(this, this.tyler); // Criação dos controles associados ao jogador
		}

		if (mudarCena === 4) {
			this.tyler = new Player(
				this,
				spawnPointVolta.x,
				spawnPointVolta.y,
				'tyler_armor',
				1.2
			); // Criação do jogador em uma posição específica
			this.controls = new Controls(this, this.tyler); // Criação dos controles associados ao jogador
		}

		if (mudarCena === 5) {
			this.tyler = new Player(
				this,
				spawnPoint.x,
				spawnPoint.y,
				'tyler_armor',
				1.2
			); // Criação do jogador em uma posição específica
			this.controls = new Controls(this, this.tyler); // Criação dos controles associados ao jogador
		}

		if (mudarCena === 6) {
			this.tyler = new Player(
				this,
				spawnPoint.x,
				spawnPoint.y,
				'tyler_armor',
				1.2
			); // Criação do jogador em uma posição específica
			this.controls = new Controls(this, this.tyler); // Criação dos controles associados ao jogador
		}

		if (mudarCena === 7) {
			this.tyler = new Player(
				this,
				spawnPointSegunda.x,
				spawnPointSegunda.y,
				'tyler_armor',
				1.2
			); // Criação do jogador em uma posição específica
			this.controls = new Controls(this, this.tyler); // Criação dos controles associados ao jogador
		}

		if (mudarCena === 8) {
			this.tyler = new Player(
				this,
				spawnPoint.x,
				spawnPoint.y,
				'tyler_armor',
				1.2
			); // Criação do jogador em uma posição específica
			this.controls = new Controls(this, this.tyler); // Criação dos controles associados ao jogador
		}

		if (mudarCena === 9) {
			this.tyler = new Player(
				this,
				spawnPoint.x,
				spawnPoint.y,
				'tyler_armor',
				1.2
			); // Criação do jogador em uma posição específica
			this.controls = new Controls(this, this.tyler); // Criação dos controles associados ao jogador
		}


		// Cria o jogador, câmera e controles
		this.camera = new Camera(this, this.tyler, this.map);
		this.camera.createZoom_1();

		// Adiciona colisor entre o jogador e o chão
		this.physics.add.collider(this.tyler, this.ground);
		this.physics.add.collider(this.tyler, this.piano);

		// Cria as animações utilizand  o o Animacao
		Animacao.TylerArmaduraAnimacao(this);

		this.tyler.setOffset(5, -1);
	}

	//Criando um retangulo invisivel para tampar a entrada em momentos especificos
	criarQuadrado() {
		const mudarCena = this.registry.get('mudarCenaCastelo');
		if (mudarCena != 0 && mudarCena != 1) {
			this.quadradoInvisivel = this.physics.add.sprite(50, 450, 'quadradoInvisivel');
			this.quadradoInvisivel.setVisible(false); // Torne o quadrado invisível
			this.quadradoInvisivel.setSize(30, 50); // Defina o tamanho do quadrado
			this.quadradoInvisivel.setImmovable(true); // Torne o quadrado imóvel
		}

		this.textoAviso = this.add
			.text(this.tyler.x - 20, this.tyler.y + 60, '', {
				fontFamily: 'Arial',
				fontSize: 10,
				color: 'black',
				resolution: 4,
			})
			.setOrigin(0.5).setDepth(10);


		this.physics.add.collider(this.tyler, this.quadradoInvisivel, function () {
			const idioma = this.registry.get('idioma'); // Obtenha o idioma selecionado
			const falas = dialogs[idioma]['dialogo_quadrado_invisivel']; // Carregue as falas de acordo com o idioma
			this.caixaDialogo3.setVisible(true); // Mostra o texto quando a colisão ocorre
			this.textoAviso.setVisible(true);
			if (!this.textoEmAndamento && this.falasAviso < falas.length) {
				Texto.textoDialogo(this, falas[this.falasAviso], this.textoAviso);
				this.falasAviso++;
			} else if (this.falasAviso === falas.length) {
				this.falasAviso = 0;
			}
		}, null, this);

	}

	//Criando Npc rei e guarda
	criarNpc() {
		const mudarCena = this.registry.get('mudarCenaCastelo');

		// Configuração inicial do NPC
		const spawnPointNpc = this.map.findObject(
			'rei',
			(objects) => objects.name === 'spawning point rei'
		);

		if (mudarCena != 0 && mudarCena != 1 && mudarCena != 2 && mudarCena != 3 && mudarCena != 4) {
			const spawnPointGuarda = this.map.findObject(
				'guarda',
				(objects) => objects.name === 'spawning point guarda'
			);

			this.guardinha = this.physics.add
				.sprite(spawnPointGuarda.x, spawnPointGuarda.y, 'npcGuarda', 4)
				.setScale(1.2).setDepth(-1).setSize(50, 70).setImmovable();
		}

		// Criação do NPC Rei
		this.rei = this.physics.add
			.sprite(spawnPointNpc.x, spawnPointNpc.y, 'rei')
			.setScale(1.2).setDepth(-1).setSize(50, 70);

		// Configuração do texto associado ao NPC Rei
		this.textoRei = this.add
			.text(this.tyler.x + 80, this.tyler.y + 80, '', {
				fontFamily: 'Arial',
				fontSize: 10,
				color: 'black',
				resolution: 4,
			})
			.setOrigin(0.5);

		// Configuração do texto associado ao NPC Vanessa
		this.textoGuarda = this.add
			.text(this.tyler.x - 20, this.tyler.y + 60, '', {
				fontFamily: 'Arial',
				fontSize: 10,
				color: 'black',
				resolution: 4,
			})
			.setOrigin(0.5);

		this.physics.add.collider(this.tyler, this.guardinha, function () {
			const idioma = this.registry.get('idioma'); // Obtenha o idioma selecionado
			const falas = dialogs[idioma]['dialogo_guarda_rei']; // Carregue as falas de acordo com o idioma
			this.caixaDialogo2.setVisible(true); // Mostra o texto quando a colisão ocorre
			this.textoGuarda.setVisible(true);
			if (!this.textoEmAndamento && this.falasGuarda < falas.length) {
				Texto.textoDialogo(this, falas[this.falasGuarda], this.textoGuarda);
				this.falasGuarda++;
			} else if (this.falasGuarda === falas.length) {
				this.falasGuarda = 0;
			}
		}, null, this);

	}

	update() {
		// Pegando o valor da variável global
		const mudarCena = this.registry.get('mudarCenaCastelo');

		//os controles são atualizados
		this.controls.update();
		//os icones acompanham o Tyler
		this.tecla_E.setPosition(this.tyler.x, this.tyler.y - 40);
		this.caixaDialogo.setPosition(this.tyler.x, this.tyler.y + 110);
		this.caixaDialogo2.setPosition(this.tyler.x - 20, this.tyler.y + 60);
		this.textoGuarda.setPosition(this.tyler.x - 20, this.tyler.y + 60);
		this.caixaDialogo3.setPosition(this.tyler.x + 20, this.tyler.y + 60);
		this.textoAviso.setPosition(this.tyler.x + 20, this.tyler.y + 60);
		this.textoRei.setPosition(this.tyler.x, this.tyler.y + 110);
		//verifica se a velocidade do tyler é maior q 0 ou não
		if (
			(this.tyler.body.velocity.x !== 0 || this.tyler.body.velocity.y !== 0) &&
			!this.passosConcreto.isPlaying
		) {
			this.passosConcreto.play(); // Reproduz o som dos passos
			this.caixaDialogo.setVisible(false);
			this.textoRei.setVisible(false)
		} else if (
			this.tyler.body.velocity.x === 0 &&
			this.tyler.body.velocity.y === 0 &&
			this.passosConcreto.isPlaying
		) {
			this.passosConcreto.stop(); // Para o som dos passos se o jogador não estiver se movendo
		}

		//Habilita a função de overlap do Tyler e rei
		const overlapping = this.physics.overlap(this.tyler, this.rei);

		//Verifica se o Tyler está passando por cima do rei
		if (overlapping) {
			this.tecla_E.setVisible(true);
			this.tecla_sinalizcao.setVisible(false)
			//Controla as falas que serão exibidas a depender de quantas vezes a cena foi exibida
			if (mudarCena === 0 || mudarCena === 1) {
				// Verifica se a tecla "E" foi pressionada
				if (Phaser.Input.Keyboard.JustDown(this.controls.interacao)) {
					this.caixaDialogo.setVisible(true);
					this.textoRei.setVisible(true)
					//As falas passam uma a uma
					this.mostrarProximoDialogo();
				}
			} else if (mudarCena === 2) {
				//verifica se a tecla E foi apertada
				if (Phaser.Input.Keyboard.JustDown(this.controls.interacao)) {
					this.caixaDialogo.setVisible(true);
					this.textoRei.setVisible(true)
					//as falas das falas2 são exibidas uma a uma
					this.mostrarProximoDialogo2()
				}
			}

			else if (mudarCena === 3) {
				//verifica se a tecla E foi apertada
				if (Phaser.Input.Keyboard.JustDown(this.controls.interacao)) {
					this.caixaDialogo.setVisible(true);
					this.textoRei.setVisible(true)
					//as falas das falas2 são exibidas uma a uma
					this.mostrarProximoDialogo3()
				}
			}

			else if (mudarCena === 4) {
				//verifica se a tecla E foi apertada
				if (Phaser.Input.Keyboard.JustDown(this.controls.interacao)) {
					this.caixaDialogo.setVisible(true);
					this.textoRei.setVisible(true)
					//as falas das falas2 são exibidas uma a uma
					this.mostrarProximoDialogo4()
				}
			}

			else if (mudarCena === 5) {
				//verifica se a tecla E foi apertada
				if (Phaser.Input.Keyboard.JustDown(this.controls.interacao)) {
					this.caixaDialogo.setVisible(true);
					this.textoRei.setVisible(true)
					//as falas das falas2 são exibidas uma a uma
					this.mostrarProximoDialogo5()
				}
			}

			else if (mudarCena === 6) {
				//verifica se a tecla E foi apertada
				if (Phaser.Input.Keyboard.JustDown(this.controls.interacao)) {
					this.caixaDialogo.setVisible(true);
					this.textoRei.setVisible(true)
					//as falas das falas2 são exibidas uma a uma
					this.mostrarProximoDialogo6()
				}
			}

			else if (mudarCena === 7) {
				//verifica se a tecla E foi apertada
				if (Phaser.Input.Keyboard.JustDown(this.controls.interacao)) {
					this.caixaDialogo.setVisible(true);
					this.textoRei.setVisible(true)
					//as falas das falas2 são exibidas uma a uma
					this.mostrarProximoDialogo7()
				}
			}

			else if (mudarCena === 8) {
				//verifica se a tecla E foi apertada
				if (Phaser.Input.Keyboard.JustDown(this.controls.interacao)) {
					this.caixaDialogo.setVisible(true);
					this.textoRei.setVisible(true)
					//as falas das falas2 são exibidas uma a uma
					this.mostrarProximoDialogo8()
				}
			}

			else if (mudarCena === 9) {
				//verifica se a tecla E foi apertada
				if (Phaser.Input.Keyboard.JustDown(this.controls.interacao)) {
					this.caixaDialogo.setVisible(true);
					this.textoRei.setVisible(true)
					//as falas das falas2 são exibidas uma a uma
					this.mostrarProximoDialogo9()
				}
			}
		} else {
			//Icone da tecla E fica invisivel
			this.tecla_E.setVisible(false);
		}

		//Verifica as posições do Tyler para realizar as mudanças de cena
		if (this.passar.hasTileAtWorldXY(this.tyler.body.x, this.tyler.body.y)) {
			this.transicaoParaCena('cena_escriba');
			this.registry.set('mudarCenaCastelo', 1);
		}

		if (this.voltar.hasTileAtWorldXY(this.tyler.body.x, this.tyler.body.y)) {
			this.transicaoParaCena('cena_corredor');
			this.registry.set('mudarCenaCastelo', 0);
		}

		if (
			this.piano.hasTileAtWorldXY(this.tyler.body.x, this.tyler.body.y)
		) {
			this.tecla_E.setVisible(true);

			// Verifica se a tecla "E" foi pressionada
			if (Phaser.Input.Keyboard.JustDown(this.controls.interacao)) {
				this.som_piano.play();
			}
		}

		// Condicao para sumir com o dialogo do guarda
		if (this.caixaDialogo2.visible) {
			let distance = Phaser.Math.Distance.Between(this.tyler.x, this.tyler.y, this.guardinha.x, this.guardinha.y);
			if (distance > 50) { // Ajuste o valor conforme necessário
				this.caixaDialogo2.setVisible(false);
				this.textoGuarda.setVisible(false);
			}
		}

		// Condicao para sumir com o dialogo do retangulo invisivel
		if (this.caixaDialogo3.visible) {
			let distance2 = Phaser.Math.Distance.Between(this.tyler.x, this.tyler.y, this.quadradoInvisivel.x, this.quadradoInvisivel.y);
			if (distance2 > 50) { // Ajuste o valor conforme necessário
				this.caixaDialogo3.setVisible(false);
				this.textoAviso.setVisible(false);
			}
		}
	}

	//função que muda a cena e cancela o áudio que estava passando
	transicaoParaCena(cena) {
		this.scene.start(cena); // Inicia a cena 1
		this.passosConcreto.stop();
	}
}