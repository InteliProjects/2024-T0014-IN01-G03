// Controles.js
export default class Controls {
	// Construtor que recebe a cena e o jogador como parâmetros
	constructor(scene, player) {
		this.scene = scene;
		this.player = player;

		// Adiciona as teclas de seta para cima, baixo, direita e esquerda ao objeto "cursor"
		this.cursor = scene.input.keyboard.addKeys({
			up: Phaser.Input.Keyboard.KeyCodes.W,
			down: Phaser.Input.Keyboard.KeyCodes.S,
			right: Phaser.Input.Keyboard.KeyCodes.D,
			left: Phaser.Input.Keyboard.KeyCodes.A,
			upSeta: Phaser.Input.Keyboard.KeyCodes.UP,
			downSeta: Phaser.Input.Keyboard.KeyCodes.DOWN,
			rightSeta: Phaser.Input.Keyboard.KeyCodes.RIGHT,
			leftSeta: Phaser.Input.Keyboard.KeyCodes.LEFT,
		});

		//Adiciona a tecla E como a tecla de interação
		this.interacao = scene.input.keyboard.addKey(
			Phaser.Input.Keyboard.KeyCodes.E
		);
	}

	// Cria o joystick e as configurações
	create() {
		this.joyStick = this.scene.plugins
			.get('rexvirtualjoystickplugin')
			.add(this, {
				x: this.scene.cameras.main.width / 3 - 10,
				y: (this.scene.cameras.main.height / 3) * 2 - 10,
				radius: 50,
				base: this.scene.add.circle(0, 0, 30, 0x1133cc).setDepth(10), // Cor verde para a base
				thumb: this.scene.add.circle(0, 0, 20, 0x21ddde).setDepth(10), // Cor verde mais escura para o polegar
			});
		this.joyStick.setVisible(true);
	}

	// Cria o joystick e as configurações do cenario escritorio
	createUnico() {
		this.joyStick = this.scene.plugins
			.get('rexvirtualjoystickplugin')
			.add(this, {
				x: this.scene.cameras.main.width / 2.4 - 10,
				y: (this.scene.cameras.main.height / 3.2) * 2 - 50,
				radius: 30,
				base: this.scene.add.circle(0, 0, 20, 0x1133cc).setDepth(10), // Cor verde para a base
				thumb: this.scene.add.circle(0, 0, 10, 0x21ddde).setDepth(10), // Cor verde mais escura para o polegar
			});
		this.joyStick.setVisible(true);
	}

	// Método de atualização dos controles
	update() {
		// Chama o método de atualização do jogador, passando o objeto "cursor" como parâmetro
		this.player.update(this.cursor, this.joyStick);
	}

	updateUnico() {
		// Chama o método de atualização do jogador, passando o objeto "cursor" como parâmetro
		this.player.updateUnico(this.cursor, this.joyStick);
	}
}
