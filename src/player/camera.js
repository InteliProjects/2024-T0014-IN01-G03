// PlayerCamera.js

// Classe responsável por configurar e gerenciar a câmera do jogo.
export default class Camera {
	// Construtor que recebe a cena, o personagem e o mapa como parâmetros.
	constructor(scene, person, map) {
		this.scene = scene; // Referência à cena do jogo.
		this.person = person; // Referência ao personagem do jogo.
		this.map = map; // Referência ao mapa do jogo.

		// Chama o método para criar a câmera.
		this.createCamera();
	}

	// Método para criar a câmera principal do jogo.
	createCamera() {
		// Configura a câmera principal para seguir o personagem.
		this.camera = this.scene.cameras.main;
		this.camera.startFollow(this.person);

		// Define os limites da câmera com base nas dimensões do mapa.
		this.camera.setBounds(
			0,
			0,
			this.map.widthInPixels,
			this.map.heightInPixels
		);
	}

	// Método para criar um zoom específico na câmera.
	createZoom_1() {
		// Define um zoom específico na câmera.
		this.camera.setZoom(2, 2);
	}

	// Método para criar outro zoom específico na câmera.
	createZoom_2() {
		// Define outro zoom específico na câmera.
		this.camera.setZoom(3.7, 3.7);
	}

	// Método para criar um minimapa na cena do jogo.
	createMiniMap() {
		// Adiciona um minimapa à cena nas coordenadas
		this.minimap = this.scene.cameras
			.add(564, 315, 1200, 500)
			.setZoom(0.2)
			.setName('mini');
	}
}
