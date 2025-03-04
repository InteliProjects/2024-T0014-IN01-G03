export default class Resumo2 extends Phaser.Scene {
	constructor() {
		super({
			key: 'resumo_etapa2',
		});
	}

	// Carregando resumos e botao confirmar
	preload() {
		this.load.image('resumo2', './src/assets/resumos/resumo2pt.png');
		this.load.image('resumo2_en', './src/assets/resumos/resumo2en.png');
		this.load.image('confirmar', './src/assets/elementosJogo/confirmar.png');
		this.load.image('confirmar_en', './src/assets/elementosJogo/confirmar_en.png');

	}

	create() {
		// Variável para pegar o idioma
		const idioma = this.registry.get('idioma');

		//tamanho da foto
		const larguraTela = 1280;
		const alturaTela = 300;

		this.cameras.main.setBackgroundColor('#004aad'); //cor de fundo 

		// Verifica o idioma e carrega a imagem correspondente
		let chaveImagem = 'resumo2'; // Valor padrão para português
		if (idioma === 'en') {
			chaveImagem = 'resumo2_en'; // Valor para inglês
		}

		// Verifica o idioma e carrega a imagem correspondente
		let chaveConfirmar = 'confirmar'; // Valor padrão para português
		if (idioma === 'en') {
			chaveConfirmar = 'confirmar_en'; // Valor para inglês
		}

		const imagem = this.add.image(larguraTela / 2, alturaTela + 100, chaveImagem).setScale(0.5);

		// Ajusta a posição vertical da imagem para centralizá-la verticalmente
		imagem.y -= imagem.displayHeight / 4;

		// Cria o botão "confirmar"
		const botaoConfirmar = this.add.image(larguraTela / 2, 540, chaveConfirmar).setScale(0.3).setInteractive();

		//adiciona o manipulador de eventos ao botão
		botaoConfirmar.on('pointerdown', () => {
			// Substitua 'nomeDaCena' pelo nome da cena que você deseja iniciar
			this.scene.start('cena_castelo');
			this.registry.set('mudarCenaCastelo', 6)
		});


	}
}
