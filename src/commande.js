export default class commande extends Phaser.Scene {
  constructor() {
    super({ key: "commande" });
  }

  init(data) {
    this.previousScene = data.previousScene || null; // Récupérer la scène précédente
  }

  preload() {
    this.load.image("menu_commande", 'src/menu-commande.png'); // Chargement de l'image de fond
    this.load.image("imageBoutonRetour", 'src/bouton-retour.png'); // Chargement du bouton retour
  }

  create() {
    // Ajustement du fond à la taille de l'écran 1480x900
    this.add
      .image(0, 0, "menu_commande")
      .setOrigin(0) // Coin supérieur gauche
      .setDisplaySize(1480, 900) // Adapter la taille de l'image de fond à l'écran
      .setDepth(0);

    var bouton_retour = this.add.image(700, 750, "imageBoutonRetour")
      .setDepth(1)
      .setScale(0.5); // Réduire la taille du bouton

    // Rendre le bouton interactif
    bouton_retour.setInteractive();

    // Ajouter un événement au clic sur le bouton retour
    bouton_retour.on("pointerup", () => {
      if (this.previousScene) {
        this.scene.resume(this.previousScene); // Reprendre la scène précédente
      }
      this.scene.stop(); // Arrêter la scène des commandes
    });
  }
}
