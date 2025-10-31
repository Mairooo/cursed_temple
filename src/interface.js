export default class Interface extends Phaser.Scene {
    constructor() {
        super({ key: 'Interface' });
        this.player = null;
        this.hearts = [];
        this.settingsButton = null; // Ajouter une variable pour le bouton settings
    }

    init(data) {
        this.player = data.player;
    }

    preload() {
        this.load.image('coeur', 'src/assets/secure.png');
        this.load.image('teteperso', 'src/assets/tete-perso.png');
        this.load.image('settings', 'src/assets/settings.png'); // Charger l'image du bouton settings
    }

    create() {
        this.createHearts();
        this.createSettingsButton(); // Créer le bouton settings
        this.cameras.main.setScroll(0, 0);

        // Écouter l'événement 'resume' pour réactiver le bouton après avoir repris la scène
        this.events.on('resume', this.onResume, this);
    }

    createHearts() {
        for (let i = 0; i < 5; i++) {
            const tete = this.add.image(80 , 40, 'teteperso');
            const heart = this.add.image(150 + (i * 40), 40, 'coeur');
            heart.setScale(0.5);
            this.hearts.push(heart);
        }
    }

    createSettingsButton() {
        // Créer le bouton settings en haut à droite
        this.settingsButton = this.add.image(1400, 50, 'settings')
            .setOrigin(0.5) // Centrer l'image
            .setScale(0.5) // Ajuster la taille si nécessaire
            .setDepth(1); // Positionner au-dessus des autres éléments

        this.settingsButton.setInteractive(); // Rendre le bouton interactif

        // Ajouter un événement au clic sur le bouton
        this.settingsButton.on('pointerup', () => {
            this.scene.launch('commande', { previousScene: this.scene.key }); // Lancer la scène des commandes
            this.scene.pause(); // Mettre en pause la scène actuelle
        });
    }

    // Méthode pour réactiver le bouton lorsque la scène est reprise
    onResume() {
        this.settingsButton.setInteractive(); // Rendre le bouton interactif après reprise
    }

    update() {
        this.updateHearts();
    }

    updateHearts() {
        for (let i = 0; i < 5; i++) {
            if (i < this.player.health) {
                this.hearts[i].setVisible(true);
            } else {
                this.hearts[i].setVisible(false);
            }
        }
    }
}
