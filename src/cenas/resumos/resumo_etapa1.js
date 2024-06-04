export default class Resumo extends Phaser.Scene {
    constructor() {
        super({
            key: 'resumo_etapa1',
        });
    }

    // Carregando resumos e botao confirmar
    preload() {
        this.load.image('resumo1', './src/assets/resumos/resumo1pt.png');
        this.load.image('resumo1_en', './src/assets/resumos/resumo1en.png');
        this.load.image('confirmar', './src/assets/elementosJogo/confirmar.png');
        this.load.image('confirmar_en', './src/assets/elementosJogo/confirmar_en.png');
    }

    create() {
        // Variável para pegar o idioma
        const idioma = this.registry.get('idioma');

        const larguraTela = 1280;
        const alturaTela = 500;

        this.cameras.main.setBackgroundColor('#004aad');

        // Verifica o idioma e carrega a imagem correspondente
        let chaveImagem = 'resumo1'; // Valor padrão para português
        if (idioma === 'en') {
            chaveImagem = 'resumo1_en'; // Valor para inglês
        }

        // Verifica o idioma e carrega a imagem correspondente
        let chaveConfirmar = 'confirmar'; // Valor padrão para português
        if (idioma === 'en') {
            chaveConfirmar = 'confirmar_en'; // Valor para inglês
        }

        const imagem = this.add.image(larguraTela / 2, alturaTela - 120, chaveImagem).setScale(0.5);

        // Ajusta a posição vertical da imagem para centralizá-la verticalmente
        imagem.y -= imagem.displayHeight / 4;

        // Cria o botão "confirmar"
        const botaoConfirmar = this.add.image(larguraTela / 2, 580, chaveConfirmar).setScale(0.3).setInteractive();

        // Adiciona o manipulador de eventos ao botão
        botaoConfirmar.on('pointerdown', () => {
            // Substitua 'nomeDaCena' pelo nome da cena que você deseja iniciar
            this.scene.start('cena_castelo');
            this.registry.set('mudarCenaCastelo', 5)
        });
    }
}
