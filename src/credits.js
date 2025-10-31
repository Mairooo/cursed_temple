export default class credits extends Phaser.Scene {
    constructor() {
      super({ key: "credits" });
    }

    preload() {
      this.load.image("menu_credits", 'src/credits.png'); 
      this.load.image("imageBoutonSuivant", 'src/bouton-suivant.png');
    }

    create() {
        this.add.image(0, 0, "menu_credits").setOrigin(0).setDisplaySize(1450, 850).setDepth(0);

        var bouton_suivant = this.add.image(700, 760, "imageBoutonSuivant").setDepth(1) // Centré
        .setScale(0.6); // Réduire la taille du bouton

        bouton_suivant.setInteractive();

        bouton_suivant.on("pointerup", () => {
            this.scene.start("menu");  
        });
    }
}
