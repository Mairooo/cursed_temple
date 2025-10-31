export default class histoire extends Phaser.Scene {
    constructor() {
      super({ key: "histoire" });
      this.musique_histoire = null;
    }

    preload() {
      this.load.audio('musique_histoire', 'src/assets/musique-histoire.mp3');   
      this.load.image("menu_histoire", 'src/histoire.png'); 
      this.load.image("imageBoutonSuivant", 'src/bouton-suivant.png');
    }

    create() {
        this.musique_histoire = this.sound.add('musique_histoire'); 
        this.add.image(0, 0, "menu_histoire").setOrigin(0).setDisplaySize(1450, 850).setDepth(0);
        this.musique_histoire.play();  

        var bouton_suivant = this.add.image(700, 760, "imageBoutonSuivant").setDepth(1) // Centré
        .setScale(0.6); // Réduire la taille du bouton

        bouton_suivant.setInteractive();

        bouton_suivant.on("pointerup", () => {
            this.scene.start("niveau2");  
            this.musique_histoire.stop();  

        });
    }
}
