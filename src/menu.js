export default class menu extends Phaser.Scene {
    constructor() {
        super({ key: "menu" });
    }
  
    preload() {
        this.load.image("menu_fond", 'src/menu.png');
        this.load.image("imageBoutonPlay", 'src/bouton-jouer.png');
        this.load.image("imageBoutonCommande", 'src/bouton-commandes.png');
        this.load.image("imageBoutonCredits", 'src/bouton-crédits.png');
    }
  
    create() {
        this.add.image(0, 0, "menu_fond").setOrigin(0).setDisplaySize(1480, 900).setDepth(0);
  
        // Position initiale hors écran (à gauche)
        var bouton_play = this.add.image(-300, 425, "imageBoutonPlay").setDepth(1);
        var bouton_commande = this.add.image(-300, 570, "imageBoutonCommande").setDepth(1);
        var bouton_credits = this.add.image(-300, 720, "imageBoutonCredits").setDepth(1);
  
        // Rendre les boutons interactifs
        bouton_play.setInteractive();
        bouton_commande.setInteractive();
        bouton_credits.setInteractive();
  
        // Fonction d'animation avec délai pour faire entrer les boutons
        const dashInFromLeft = (button, targetX, delay) => {
            this.tweens.add({
                targets: button,
                x: targetX,  // Position cible
                ease: 'Power3',  // Effet smooth
                duration: 800,  // Durée de l'animation en ms
                delay: delay,  // Délai pour l'effet décalé
            });
        };

        // Appel de l'animation pour chaque bouton avec un délai progressif
        dashInFromLeft(bouton_play, 700, 0);          // Sans délai
        dashInFromLeft(bouton_commande, 650, 200);    // Décalage de 200ms
        dashInFromLeft(bouton_credits, 600, 400);     // Décalage de 400ms

        // Animation d'interaction avec un effet zoom (sur survol ou clic)
        const dashAnimation = (button) => {
            this.tweens.add({
                targets: button,
                scaleX: 1.1, // Légère augmentation de l'échelle
                scaleY: 1.1,
                duration: 100,
                yoyo: true, // Retour à la taille d'origine
                repeat: 0
            });
        };
  
        // Actions sur clic et survol pour chaque bouton
        bouton_play.on("pointerup", () => {
            dashAnimation(bouton_play); // Animation sur clic
            this.scene.start("niveau1"); // Démarrer la scène niveau1
        });
  
        bouton_play.on("pointerover", () => {
            dashAnimation(bouton_play); // Animation sur survol
        });
  
        bouton_commande.on("pointerup", () => {
            dashAnimation(bouton_commande); // Animation sur clic
            this.scene.launch("commande", { previousScene: this.scene.key });
            this.scene.pause();  // Pause la scène actuelle
        });
  
        bouton_commande.on("pointerover", () => {
            dashAnimation(bouton_commande); // Animation sur survol
        });
  
        bouton_credits.on("pointerup", () => {
            dashAnimation(bouton_credits); // Animation sur clic
            this.scene.start("credits"); // Démarrer la scène niveau1
        });
  
        bouton_credits.on("pointerover", () => {
            dashAnimation(bouton_credits); // Animation sur survol
        });
  
        // Reprendre la scène du menu lorsqu'on revient des commandes
        this.events.on('resume', () => {
            bouton_play.setInteractive();
            bouton_commande.setInteractive();
            bouton_credits.setInteractive();
        });
    }
}
