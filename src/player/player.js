// Player.js

// Classe representando o jogador do jogo.
export default class Player extends Phaser.Physics.Arcade.Sprite {
	// Construtor que recebe a cena, as coordenadas (x, y), a textura e o tamanho como parâmetros.
	constructor(scene, x, y, texture, tamanho) {
		// Chama o construtor da classe pai (Phaser.Physics.Arcade.Sprite).
		super(scene, x, y, texture);

		// Adiciona o jogador à cena e configura a física.
		scene.add.existing(this);
		scene.physics.add.existing(this);

		// Define a escala do jogador.
		this.setScale(tamanho);
		this.body.setSize(23, 10, false);
		this.body.setOffset(5, 20);


		// Salva o tipo de sprite para uso posterior.
		this.tipoSprite = texture;
	}

	// Método de atualização do jogador, recebe o objeto "cursors" como parâmetro.
	update(cursors, joyStick) {
		// Zera a velocidade do jogador para evitar movimentos indesejados.
		this.body.setVelocity(0);

		// Verifica as teclas pressionadas e define a velocidade do jogador.
		if (cursors.right.isDown || cursors.rightSeta.isDown) {
			joyStick.setVisible(false);
			this.body.setVelocityX(200);
		} else if (cursors.left.isDown || cursors.leftSeta.isDown) {
			joyStick.setVisible(false);
			this.body.setVelocityX(-200);
		} else if (cursors.down.isDown || cursors.downSeta.isDown) {
			joyStick.setVisible(false);
			this.body.setVelocityY(200);
		} else if (cursors.up.isDown || cursors.upSeta.isDown) {
			joyStick.setVisible(false);
			this.body.setVelocityY(-200);
		}

		// Verifica a entrada do joystick virtual e define a velocidade do jogador.
		if (joyStick.right) {
			this.body.setVelocityX(200);
		} else if (joyStick.left) {
			this.body.setVelocityX(-200);
		} else if (joyStick.down) {
			this.body.setVelocityY(200);
		} else if (joyStick.up) {
			this.body.setVelocityY(-200);
		}

		// Verifica a direção do movimento e reproduz a animação correspondente.
		if (this.body.velocity.x !== 0 || this.body.velocity.y !== 0) {
			if (this.body.velocity.y < 0) {
				this.anims.play('subir_' + this.tipoSprite, true);
			} else if (this.body.velocity.y > 0) {
				this.anims.play('descer_' + this.tipoSprite, true);
			} else if (this.body.velocity.x < 0) {
				this.anims.play('andar_esquerda_' + this.tipoSprite, true);
			} else if (this.body.velocity.x > 0) {
				this.anims.play('andar_direita_' + this.tipoSprite, true);
			}
		} else {
			// Se o jogador não estiver se movendo, para a animação.
			this.anims.stop();
		}
	}

	// Método de atualização alternativo do jogador, recebe o objeto "cursors" como parâmetro.
	// Cria a movimentação exclusivamente para a cena escritorio
	// Este método ajusta a velocidade do jogador para movimentos mais lentos.
	updateUnico(cursors, joyStick) {
		// Zera a velocidade do jogador para evitar movimentos indesejados.
		this.body.setVelocity(0);

		// Verifica as teclas pressionadas e define a velocidade do jogador.
		if (cursors.right.isDown || cursors.rightSeta.isDown) {
			joyStick.setVisible(false);
			this.body.setVelocityX(100);
		} else if (cursors.left.isDown || cursors.leftSeta.isDown) {
			joyStick.setVisible(false);

			this.body.setVelocityX(-100);
		} else if (cursors.down.isDown || cursors.downSeta.isDown) {
			joyStick.setVisible(false);
			this.body.setVelocityY(100);
		} else if (cursors.up.isDown || cursors.upSeta.isDown) {
			joyStick.setVisible(false);
			this.body.setVelocityY(-100);
		}

		// Verifica a entrada do joystick virtual e define a velocidade do jogador.
		if (joyStick.right) {
			this.body.setVelocityX(100);
		} else if (joyStick.left) {
			this.body.setVelocityX(-100);
		} else if (joyStick.down) {
			this.body.setVelocityY(100);
		} else if (joyStick.up) {
			this.body.setVelocityY(-100);
		}

		// Verifica a direção do movimento e reproduz a animação correspondente.
		if (this.body.velocity.x !== 0 || this.body.velocity.y !== 0) {
			if (this.body.velocity.y < 0) {
				this.anims.play('subir_' + this.tipoSprite, true);
			} else if (this.body.velocity.y > 0) {
				this.anims.play('descer_' + this.tipoSprite, true);
			} else if (this.body.velocity.x < 0) {
				this.anims.play('andar_esquerda_' + this.tipoSprite, true);
			} else if (this.body.velocity.x > 0) {
				this.anims.play('andar_direita_' + this.tipoSprite, true);
			}
		} else {
			// Se o jogador não estiver se movendo, para a animação.
			this.anims.stop();
		}
	}
}
