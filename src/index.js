import niveau2 from './niveau2.js';
import niveau3 from './niveau3.js';
import niveau1 from './niveau1.js';
import Interface from './interface.js';
import credits from './credits.js';
import histoire from './histoire.js';
import histoire_2 from './histoire_2.js';
import menu from './menu.js';
import commande from './commande.js';
import fin from './fin.js';




var config = {
  type: Phaser.AUTO,
  width: window.innerWidth, 
  height: window.innerHeight, 
  physics: {
    default: "arcade", 
    arcade: {
      
      gravity: {
        y: 300 
      },
      debug: false,
    }
  },
  scene: [menu, niveau1, niveau2, niveau3, histoire, credits, histoire_2, Interface, commande, fin] 
};

var game = new Phaser.Game(config);
game.scene.start('niveau3');  



