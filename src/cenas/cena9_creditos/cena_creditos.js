export default class Creditos extends Phaser.Scene {
	constructor() {
		super({
			key: 'creditos',
		});
	}

	// Carregando o video do creditos.mp4
	preload() {
		this.load.video('creditosVideo', './src/assets/elementosJogo/creditos.mp4', 'loadeddata', false, false);
	}

	create() {
		// Parando a musica da cena anterior
		const cenaCreditos = this.scene.get('resumo_etapa4').currentScene;
		if (cenaCreditos && cenaCreditos.musicaFundo) {
			cenaCreditos.musicaFundo.pause();
		}

		// Criando o video
		const video = this.add.video(0, 0, 'creditosVideo').setOrigin(0);
		video.play(true);
		video.setDisplaySize(this.scale.width, this.scale.height);

		// Estimativa da duração do vídeo em milissegundos
		const videoDuration = 21000; // Substitua por 10000 milissegundos se o vídeo tiver 10 segundos

		// Usa setTimeout para parar o vídeo após a duração estimada
		setTimeout(() => {
			video.stop();
			this.registry.set('mudarCenaEscritorio', 0);
			this.registry.set('mudarCenaExterior', 0);
			this.registry.set('mudarCenaCorredor', 0);
			this.registry.set('mudarCenaCastelo', 0);
			this.registry.set('mudarCenaEscriba', 1);
			this.registry.set('mudarCenaFesta', 0);
			this.scene.start('Tela');
		}, videoDuration);
	}

}
