export default class fin extends Phaser.Scene {
    constructor() {
      super({ key: "fin" });
      this.musique_histoire = null;
    }

    preload() {
      this.load.video("menu_fin", 'src/credits.mp4'); 
      this.load.image("imageBoutonSuivant", 'src/bouton-suivant.png');
    }

    create() {
        this.musique_histoire = this.sound.add('musique_fin'); 
        this.add.image(0, 0, "menu_fin").setOrigin(0).setDisplaySize(1450, 850).setDepth(0);
        this.musique_histoire.play();  

        var bouton_suivant = this.add.image(700, 760, "imageBoutonSuivant").setDepth(1) // Centré
        .setScale(0.6); // Réduire la taille du bouton

        bouton_suivant.setInteractive();

        bouton_suivant.on("pointerup", () => {
            this.scene.stop("niveau1");
            this.scene.stop("niveau2");
            this.scene.start("niveau3"); 
            this.musique_histoire.stop();

        });
    }
}
