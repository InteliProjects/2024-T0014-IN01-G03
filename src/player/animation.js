// AnimationManager.js
export default class AnimationManager {
	// Método estático para criar animações, recebe a cena como parâmetro
	static TylerNormalAnimacao(scene) {
		// Criação da animação 'descer'
		scene.anims.create({
			key: 'descer_tyler_normal', // Nome da animação
			frames: scene.anims.generateFrameNumbers('tyler_normal', {
				start: 0,
				end: 2,
			}), // Gera números de quadros
			frameRate: 10, // Taxa de quadros por segundo
			repeat: -1, // -1 para repetição infinita
		});

		// Criação da animação 'andar_esquerda'
		scene.anims.create({
			key: 'andar_esquerda_tyler_normal',
			frames: scene.anims.generateFrameNumbers('tyler_normal', {
				start: 3,
				end: 5,
			}),
			frameRate: 10,
			repeat: -1,
		});

		// Criação da animação 'andar_direita'
		scene.anims.create({
			key: 'andar_direita_tyler_normal',
			frames: scene.anims.generateFrameNumbers('tyler_normal', {
				start: 6,
				end: 8,
			}),
			frameRate: 10,
			repeat: -1,
		});

		// Criação da animação 'subir'
		scene.anims.create({
			key: 'subir_tyler_normal',
			frames: scene.anims.generateFrameNumbers('tyler_normal', {
				start: 9,
				end: 11,
			}),
			frameRate: 10,
			repeat: -1,
		});

		scene.anims.create({
			key: 'parar_tyler_normal',
			frames: scene.anims.generateFrameNumbers('tyler_normal', {
				start: 9,
				end: 9,
			}),
			frameRate: 10,
			repeat: -1,
		});
	}

	static TylerArmaduraAnimacao(scene) {
		// Criação da animação 'descer'
		scene.anims.create({
			key: 'descer_tyler_armor', // Nome da animação
			frames: scene.anims.generateFrameNumbers('tyler_armor', {
				start: 0,
				end: 2,
			}), // Gera números de quadros
			frameRate: 10, // Taxa de quadros por segundo
			repeat: -1, // -1 para repetição infinita
		});

		// Criação da animação 'andar_esquerda'
		scene.anims.create({
			key: 'andar_esquerda_tyler_armor',
			frames: scene.anims.generateFrameNumbers('tyler_armor', {
				start: 3,
				end: 5,
			}),
			frameRate: 10,
			repeat: -1,
		});

		// Criação da animação 'andar_direita'
		scene.anims.create({
			key: 'andar_direita_tyler_armor',
			frames: scene.anims.generateFrameNumbers('tyler_armor', {
				start: 6,
				end: 8,
			}),
			frameRate: 10,
			repeat: -1,
		});

		// Criação da animação 'subir'
		scene.anims.create({
			key: 'subir_tyler_armor',
			frames: scene.anims.generateFrameNumbers('tyler_armor', {
				start: 9,
				end: 11,
			}),
			frameRate: 10,
			repeat: -1,
		});

		scene.anims.create({
			key: 'parar_tyler_armor',
			frames: scene.anims.generateFrameNumbers('tyler_armor', {
				start: 9,
				end: 9,
			}),
			frameRate: 10,
			repeat: -1,
		});
	}
}
