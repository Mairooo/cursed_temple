export default class niveau1 extends Phaser.Scene {
    constructor() {
        super({ key: 'niveau1' });
        this.player = null;
        this.clavier = null;
        this.enemies = null;
        this.enemyMoveEvent = null;
        this.isShrunk = false;
        this.dashCooldown = false; 
        this.dashCooldownDuration = 1000;  
        this.shootCooldown = false; 
        this.shootCooldownDuration = 400;
        this.shrinkCooldownDuration = 2000;  
        this.canJump = true; 
        this.death_layer = null; 
        this.jumpCount = 0;
        this.isInvincible = false;
        this.invincibleDuration = 1000; 
        this.scarecrow = null;  // Variable to hold the scarecrow reference
        this.jumpSound = null;
        this.dashSound = null;
        this.shootSound = null;
        this.deathSound = null;
        this.walkSound = null;
        this.shrinkSound = null;
        this.musique_de_fond = null;
        this.shootSound = null;
    }
    

    preload() {
        this.load.audio('musique', 'src/assets/musique-tuto.mp3');   
        this.load.audio('dashson', 'src/assets/dash.mp3');   
        this.load.audio('deathson', 'src/assets/death.mp3');   
        this.load.audio('jumpson', 'src/assets/jump.mp3');   
        this.load.audio('portalson', 'src/assets/portal.mp3');  
        this.load.audio('shrinkson', 'src/assets/shrink.mp3');   
        this.load.audio('walkson', 'src/assets/walk.mp3');
        this.load.audio('shoot', 'src/assets/shoot.mp3');   


        this.load.image("main_background_verso", "src/assets/back1.png"); 
        this.load.spritesheet("img_perso", "src/assets/perso-course.png", {
            frameWidth: 128,
            frameHeight: 128,
        });
        this.load.spritesheet("portail", "src/assets/portail.png", {
            frameWidth: 128,
            frameHeight: 192,
        });
        this.load.spritesheet('tir1', 'src/assets/tir1.png', { frameWidth: 32, frameHeight: 32 });
        this.load.image('coeur', 'src/assets/Pt-vie.png'); 
        this.load.tilemapTiledJSON('map', 'src/mapv4.json');
        this.load.image('tiles', 'src/tileset_image.png');
        this.load.image('enemy1', 'src/assets/enemy1.png');
        this.load.image('epouventail', 'src/assets/epouventail.png');
        this.load.spritesheet('enemy1_marche', 'src/assets/enemy1-marche.png', {
            frameWidth: 128,
            frameHeight: 128, 
        });
        this.load.spritesheet("img_perso_idle", "src/assets/perso-idle.png", {
            frameWidth: 128,
            frameHeight: 128,
        });
        this.load.image('balle-enemy', 'src/assets/balle.png'); 
        this.load.spritesheet('img_perso_attack', 'src/assets/perso-attack.png', {
            frameWidth: 128,
            frameHeight: 128,
        });

        this.load.spritesheet('bulle-saut', 'src/assets/bulle-saut.png', {
            frameWidth: 468,
            frameHeight: 188,
        });
        this.load.spritesheet('bulle-attack', 'src/assets/bulle-attack.png', {
            frameWidth: 468,
            frameHeight: 188,
        });
        this.load.spritesheet('bulle-dash', 'src/assets/bulle-dash.png', {
            frameWidth: 468,
            frameHeight: 188,
        });
        this.load.spritesheet('bulle-taille', 'src/assets/bulle-taille.png', {
            frameWidth: 468,
            frameHeight: 188,
        });
        this.load.spritesheet('bulle-leurre', 'src/assets/bulle-leurre.png', {
            frameWidth: 468,
            frameHeight: 188,
        });
        this.load.spritesheet('enemy1-sang', 'src/assets/enemy1-sang.png', {
            frameWidth: 128,
            frameHeight: 128,
        });
    }
    
    create() {
        this.physics.world.gravity.y = 700; 
        this.background_image = this.add.image(900, 384, "main_background_verso").setScrollFactor(0);  
        const map = this.make.tilemap({ key: 'map' });
        const tileset = map.addTilesetImage('tileset_image', 'tiles');
        const calque_background2 = map.createLayer("calque_background_2", tileset);
        const calque_background1 = map.createLayer("calque_background", tileset);
        const calque = map.createLayer("calque_plateformes", tileset);
        this.tutorialBubble = this.add.sprite(600, 200, 'bulle-saut').setScale(0.7); // Ajuster l'échelle si nécessaire
        this.tutorialBubble = this.add.sprite(2400, 200, 'bulle-dash').setScale(0.7); // Ajuster l'échelle si nécessaire
        this.tutorialBubble = this.add.sprite(6000, 200, 'bulle-taille').setScale(0.7); // Ajuster l'échelle si nécessaire
        this.tutorialBubble = this.add.sprite(5250, 1500, 'bulle-attack').setScale(0.7); // Ajuster l'échelle si nécessaire
        this.tutorialBubble = this.add.sprite(4460, 1600, 'bulle-leurre').setScale(0.7); // Ajuster l'échelle si nécessaire

        this.player = this.physics.add.sprite(0, 0, "img_perso"); 
        this.physics.world.setBounds(0, 0, 6400, 3000);
        this.cameras.main.setBounds(0, 0, 6400, 3000);
        this.cameras.main.startFollow(this.player);
        this.cameras.main.setZoom(1);  


        this.musique_de_fond = this.sound.add('musique'); 
        this.jumpSound = this.sound.add('jumpson');
        this.dashSound = this.sound.add('dashson');
        this.deathSound = this.sound.add('deathson');
        this.walkSound = this.sound.add('walkson');
        this.shrinkSound = this.sound.add('shrinkson');
        this.shootSound = this.sound.add('shoot');


        this.musique_de_fond.play();  



        this.toucheDash = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SHIFT);
        this.toucheRéduction = this.input.keyboard.addKey('A');
        calque.setCollisionByProperty({ estSolide: true });
        this.physics.add.collider(this.player, calque);
        this.player.setCollideWorldBounds(true);
        this.player.setBounce(0.2);
        this.player.health = 5; 
        this.enemies = this.physics.add.group();
        this.enemy = this.enemies.create(700, 2500, "enemy1");
        this.enemy.health = 10; 
        console.log("Initial enemy health: ", this.enemy.health);
        this.enemy.setCollideWorldBounds(true);
        this.physics.add.collider(this.enemy, calque);
        
        this.deathLayerCreation(map);
        this.scarecrowKey = this.input.keyboard.addKey('E'); 

        this.endZone = this.physics.add.sprite(6145, 2830, 'portail'); // Zone de fin invisible
        this.endZone.setSize(100, 100); // Ajuster la taille de la zone de collision

        this.endZone.body.setAllowGravity(false); // La zone de fin ne subit pas la gravité
        this.endZone.setImmovable(true); // S'assurer qu'elle ne bouge pas lors des collisions

        this.physics.add.overlap(this.player, this.endZone, this.changeScene, null, this);

        this.createAnimations();

        this.enemyMoveEvent = this.time.addEvent({
            delay: 2000,
            callback: this.randomizeEnemyPosition,
            callbackScope: this,
            loop: true,
        });

        this.enemyShootEvent = this.time.addEvent({
            delay: 2000, 
            callback: this.shootBulletFromEnemy,
            callbackScope: this,
            loop: true,
        });
        
        
        const enemyPositions = [
            { x: 3200, y: 1664 },
            { x: 3864, y: 1664 },
            { x: 4608, y: 1664 },
            { x: 5248, y: 1664 },
        ];
    
        enemyPositions.forEach(pos => {
            const enemy = this.enemies.create(pos.x, pos.y, "enemy1");
            enemy.health = 4; // Correction ici
            enemy.setCollideWorldBounds(true);
            this.physics.add.collider(enemy, calque);
            
            
            
            this.time.addEvent({
                delay: 2000,
                callback: () => this.randomizeEnemyMovement(enemy),
                callbackScope: this,
                loop: true
            });
    
            this.time.addEvent({
                delay: 2000, 
                callback: () => this.shootBulletFromEnemy(enemy),
                callbackScope: this,
                loop: true
            });
        });

        this.scene.launch('Interface', { player: this.player });
        this.clavier = this.input.keyboard.createCursorKeys();
        this.boutonFeu = this.input.keyboard.addKey('Q');
        this.toucheSaut = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        this.bullets = this.physics.add.group();

        this.physics.add.overlap(this.bullets, this.enemies, this.hitEnemy, null, this);
 



    

        
    }


    createAnimations() {

        this.anims.create({
            key: 'shuriken_anim', // Nom de l'animation du shuriken
            frames: this.anims.generateFrameNumbers('tir1', { start: 0, end: 2 }), // Frames 0 à 2 (3 frames au total)
            frameRate: 15, // Vitesse de l'animation (ajuste selon tes besoins)
            repeat: -1 // Répéter l'animation en boucle
        });
        
        this.anims.create({
            key: 'anim_idle',
            frames: this.anims.generateFrameNumbers('img_perso_idle', { start: 0, end: 1 }),
            frameRate: 5,
            repeat: -1
        });

        this.anims.create({
            key: 'enemy_walk_right',
            frames: this.anims.generateFrameNumbers('enemy1_marche', { start: 0, end: 3 }),
            frameRate: 10,
            repeat: -1
        });

        this.anims.create({
            key: 'enemy_walk_left',
            frames: this.anims.generateFrameNumbers('enemy1_marche', { start: 0, end: 3 }),
            frameRate: 10,
            repeat: -1
        });

        this.anims.create({
            key: "anim_tourne_gauche",
            frames: [
                { key: "img_perso", frame: 0 },  
                { key: "img_perso", frame: 1 },
            ],
            frameRate: 10,
            repeat: -1
        });

        this.anims.create({
            key: "anim_tourne_droite",
            frames: [
                { key: "img_perso", frame: 2 },  
                { key: "img_perso", frame: 3 }   
            ],
            frameRate: 10,
            repeat: -1
        });

        this.anims.create({
            key: "anim_face",
            frames: [{ key: "img_perso", frame: 0 }],  
            frameRate: 20
        });
        this.anims.create({
            key: 'anim_attack',
            frames: this.anims.generateFrameNumbers('img_perso_attack', { start: 0, end: 3 }),
            frameRate: 20,  
            repeat: 0       
        });

    

        this.anims.create({
            key: 'enemy_death',
            frames: this.anims.generateFrameNumbers('enemy1-sang', { start: 0, end: 2 }), // Assuming 3 frames for the death animation
            frameRate: 10,
            repeat: 0 // Do not repeat the death animation
        });
    
        
    }

    randomizeEnemyMovement(enemy) {
        if (!enemy || !enemy.active) return;
    
        // Vérifier si l'épouvantail est présent
        let target = this.scarecrow && this.scarecrow.active ? this.scarecrow : this.player;
    
        // Poursuite du joueur ou de l'épouvantail
        const distanceToTarget = Phaser.Math.Distance.Between(enemy.x, enemy.y, target.x, target.y);
        
        if (this.scarecrow && this.scarecrow.active) {
            // Si l'épouvantail est présent, attirer l'ennemi plus fortement
            if (distanceToTarget < 300) { // Distance réduite pour plus d'attraction
                this.physics.moveToObject(enemy, target, 100); // Vitesse d'attraction augmentée
                enemy.anims.play('enemy_walk_right', true);
                enemy.flipX = target.x > enemy.x; // Retourner l'ennemi en fonction de la direction
            } else {
                // Mouvement aléatoire si l'épouvantail est trop loin
                const randomOffset = Phaser.Math.Between(50, 100); // Réduire l'offset pour un mouvement plus subtil
                const randomDirection = Phaser.Math.Between(0, 1) === 0 ? -1 : 1;
    
                enemy.setVelocityX(randomOffset * randomDirection);
                if (randomDirection === 1) {
                    enemy.anims.play('enemy_walk_right', true);
                    enemy.flipX = true;
                } else {
                    enemy.anims.play('enemy_walk_left', true);
                    enemy.flipX = false;
                }
            }
        } else {
            // Si l'épouvantail n'est pas présent, suivre le joueur
            if (distanceToTarget < 400) {
                this.physics.moveToObject(enemy, target, 100); // Ralentir la vitesse d'attraction pour le joueur
                enemy.anims.play('enemy_walk_right', true);
                enemy.flipX = target.x > enemy.x;
            } else {
                // Mouvement aléatoire
                const randomOffset = Phaser.Math.Between(50, 200);
                const randomDirection = Phaser.Math.Between(0, 1) === 0 ? -1 : 1;
    
                enemy.setVelocityX(randomOffset * randomDirection);
                if (randomDirection === 1) {
                    enemy.anims.play('enemy_walk_right', true);
                    enemy.flipX = true;
                } else {
                    enemy.anims.play('enemy_walk_left', true);
                    enemy.flipX = false;
                }
            }
        }
    }
    
    
    
    
    

    

    update() {
        if (Phaser.Input.Keyboard.JustDown(this.toucheRéduction) && !this.shrinkCooldown) {
            this.toggleShrink();
        }
        if (this.clavier.left.isDown) {
            this.player.setVelocityX(-400);
            this.player.anims.play('anim_tourne_gauche', true); 
            this.player.flipX = false; 
            this.walkSound.play();
        } else if (this.clavier.right.isDown) {
            this.player.setVelocityX(400);
            this.player.anims.play('anim_tourne_droite', true); 
            this.player.flipX = true; 
            this.walkSound.play();
        } else {
            this.player.setVelocityX(0);
            this.player.anims.play('anim_idle', true);  
        }
    
        if (this.toucheSaut.isDown && (this.player.body.blocked.down || this.jumpCount < 1)) {
            const jumpVelocity = this.isShrunk ? -200 : -330;  
            this.player.setVelocityY(jumpVelocity);
            this.jumpCount++;  
            this.jumpSound.play();
        }
    
        if (this.player.body.blocked.down) {
            this.jumpCount = 0;  
        }

        if (this.player.body.blocked.down) {
            this.canJump = true;  
        }
    
        if (Phaser.Input.Keyboard.JustDown(this.boutonFeu)) {
            this.shootBullet();
        }
        
        if (Phaser.Input.Keyboard.JustDown(this.toucheDash) && !this.dashing && !this.dashCooldown) {
            this.performDash();
        }
    
        if (Phaser.Input.Keyboard.JustDown(this.scarecrowKey)) {
            this.placeScarecrow();
        }
       
    }

    toggleShrink() {    
        // Avant de permettre l'agrandissement, vérifions l'espace au-dessus du joueur
        if (this.isShrunk) {
            // Créer un rayon pour vérifier l'espace disponible au-dessus du joueur avant de grandir
            const spaceAbove = this.player.body.height * 1.5; // Ajuster selon la taille nécessaire pour grandir
            const ray = this.physics.add.sprite(this.player.x, this.player.y - spaceAbove, null);
            ray.setSize(this.player.body.width, spaceAbove); // Créer un rayon vertical aussi large que le joueur
            ray.body.allowGravity = false;
    
            // Vérifier s'il y a un obstacle au-dessus du joueur
            const touching = this.physics.overlap(ray, this.calque); // Vérifier s'il touche une plateforme (calque)
    
            // Détruire le raycast temporaire
            ray.destroy();
    
            // Si le rayon touche une plateforme, ne pas permettre l'agrandissement
            if (touching) {
                console.log("Pas assez d'espace pour grandir!");
                return; // Arrêter ici si pas assez d'espace
            }
        }
    
        // Si on arrive ici, il y a suffisamment d'espace pour changer de taille
        this.player.setVelocityY(-200); // Animation pour sauter légèrement lors du changement de taille
    
        this.time.delayedCall(100, () => {
            if (this.isShrunk) {
                this.player.setSize(128, 128); // Revenir à la grande taille
                this.player.setScale(1); // Revenir à l'échelle normale
                this.isShrunk = false; // Réinitialiser l'état de rétrécissement
                this.player.setOffset(0, 0); // Ajuster le décalage du sprite
            } else {
                this.player.setSize(64, 64); // Réduire la taille
                this.player.setScale(0.5); // Ajuster l'échelle
                this.isShrunk = true; // Activer l'état de rétrécissement
                this.player.setOffset(32, 64); // Ajuster le décalage
            }
    
            // S'assurer que le joueur n'est pas sous le sol après changement
            this.player.y = Math.max(this.player.y, this.player.body.height / 2);
        });
    
        // Gérer le cooldown
        this.shrinkCooldown = true;
        this.time.delayedCall(this.shrinkCooldownDuration, () => {
            this.shrinkCooldown = false;
        });
    }
    
    
    
    shootBullet() {
        if (this.shootCooldown || this.isShrunk) return; 
    
        const coefDir = this.player.flipX ? 1 : -1; 
        this.bullet = this.bullets.create(this.player.x + (25 * coefDir), this.player.y - 4, 'tir1');
        this.bullet.anims.play('shuriken_anim'); // Joue l'animation du shuriken
        this.bullet.setCollideWorldBounds(true);
        this.bullet.setBounce(1);
        this.bullet.body.onWorldBounds = true;
        this.bullet.body.allowGravity = false;
        this.bullet.setVelocity(400 * coefDir, 0);
        this.bullet.damage = 2; // Dégâts du projectile
        this.shootSound.play();
        
        this.time.addEvent({
            delay: 2000, 
            callback: () => {
                if (this.bullet) {
                    this.bullet.destroy();
                }
            },
            callbackScope: this
        });
    
        // Détruire le shuriken s'il quitte les limites du monde
        this.bullet.body.world.on('worldbounds', (body) => {
            if (body.gameObject === this.bullet) {
                this.bullet.destroy();
            }
        });
    
        this.startShootCooldown();
    }
    
    
    changeScene() {
        this.scene.start("histoire"); 
        this.musique_de_fond.stop();
        this.walkSound.stop();  
        this.jumpSound.stop();
    }
    

    startShootCooldown() {
        this.shootCooldown = true; 

        this.time.delayedCall(this.shootCooldownDuration, () => {
            this.shootCooldown = false; 
        });
    }

    shootBulletFromEnemy(enemy) {
        if (!enemy || !enemy.active) return;
    
        const distanceToPlayer = Phaser.Math.Distance.Between(enemy.x, enemy.y, this.player.x, this.player.y);
        if (distanceToPlayer < 300) { 
            const bullet = this.physics.add.sprite(enemy.x, enemy.y, 'balle-enemy');
            bullet.setCollideWorldBounds(true);
            bullet.setBounce(1);
            bullet.body.allowGravity = false;
            const velocityDirection = enemy.body.velocity.x > 0 ? 1 : -1;
            bullet.setVelocity(300 * velocityDirection, 0);
    
            this.physics.add.overlap(bullet, this.player, this.hitPlayer, null, this);
    
            this.time.addEvent({
                delay: 2000,
                callback: () => bullet.destroy(),
                callbackScope: this
            });
        }
    }
    
    
    

    hitPlayer(bullet, player) {
        this.deathSound.play();
        if (this.isInvincible) return; // Ignorer si invincible

        bullet.destroy(); 
        player.health -= 1; 
        
        console.log("Player health: ", player.health); 

        if (player.health <= 0) {
            this.handlePlayerDeath(); 
        } else {
            // Activer l'invincibilité
            this.isInvincible = true;
            this.player.setTint(0xff0000); // Optionnel : tint rouge pour indiquer l'invincibilité

            this.time.delayedCall(this.invincibleDuration, () => {
                this.isInvincible = false;
                this.player.clearTint(); // Réinitialiser la couleur du joueur
            });
        }
    }
    




    placeScarecrow() {
        // Vérifier si un épouvantail existe déjà
        if (!this.scarecrow) {
            // Créer un épouvantail à la position actuelle du joueur
            this.scarecrow = this.physics.add.sprite(this.player.x, this.player.y, 'epouventail');
            this.scarecrow.setOrigin(0.5, 0.5); // Placer l'origine au centre-bas
            this.scarecrow.setCollideWorldBounds(true); // Empêcher de sortir des limites du monde
    
            // Désactiver la gravité initialement pour éviter qu'il ne tombe dans le vide
            this.scarecrow.body.setAllowGravity(false);
    

    
            // Détruire l'épouvantail après 15 secondes (éphémère)
            this.time.delayedCall(15000, () => {
                if (this.scarecrow) {
                    // Rendre l'épouvantail invisible
                    this.scarecrow.setVisible(false);
                    
                    // Détruire l'épouvantail après quelques secondes
                    this.time.delayedCall(2000, () => {
                        this.scarecrow.destroy();
                    });
                }
            }, null, this);
    
            console.log("Épouvantail placé à : ", this.scarecrow.x, this.scarecrow.y);
        } else {
            console.log("Un épouvantail est déjà placé.");
        }
    }
    
    resetGameVariables() {
        this.player.health = 5;  // Réinitialiser la santé à sa valeur de départ
        this.updateHearts();

        this.isShrunk = false;  // Réinitialiser l'état de rétrécissement
        this.shrinkCooldown = false;  // Réinitialiser le cooldown de rétrécissement
        this.dashCooldown = false;  // Réinitialiser le cooldown du dash
        this.dashing = false;  // Réinitialiser l'état de dash
        this.shootCooldown = false;  // Réinitialiser le cooldown de tir
        this.isInvincible = false; 
        this.jumpCount = 0; // Réinitialiser le nombre de sauts
    }

    handlePlayerDeath() {
        console.log("Player is dead!");
        this.deathSound.play();
        this.musique_de_fond.stop();
        this.walkSound.stop();  


        
        // Réinitialiser les variables de jeu
        this.resetGameVariables();
        
        // Arrêter l'interface si elle est en cours d'exécution
        if (this.scene.isActive('Interface')) {
            this.scene.stop('Interface'); // Remplacez 'InterfaceScene' par le nom réel de votre scène d'interface
        }
    
        // Attendre un court instant avant de redémarrer
        this.time.delayedCall(0, () => {
            this.scene.start("menu"); // Démarrer la scène du menu au lieu de redémarrer le niveau
        });
    }
    
    

    
    hitEnemy(bullet, enemy) {
        bullet.destroy();
        enemy.health -= this.bullet.damage;  
    
        console.log("Enemy health after hit: ", enemy.health); // Debug: Log health after hit
    
        if (enemy.health <= 0) {
            // Play the death animation
            enemy.anims.play('enemy_death'); 
    
            // Set a timer to destroy the enemy after the animation finishes
            this.time.delayedCall(300, () => { // Adjust the delay based on the length of your animation
                enemy.destroy();  
            });
    
            if (this.enemyMoveEvent) {
                this.enemyMoveEvent.remove(); 
            }
        }
    }
    

    performDash() {
        if (!this.dashing && !this.dashCooldown) {  
            this.dashing = true;  
            this.player.body.allowGravity = false;

            this.dashSound.play();

    
            // Activer l'invincibilité pendant le dash
            this.isInvincible = true;
    
            const dashSpeed = 2500;  
            const dashDuration = 300;  
    
            let dashVelocityX = this.player.flipX ? dashSpeed : -dashSpeed;
    
            this.player.setVelocity(dashVelocityX, 0);
    
            this.player.anims.play('anim_attack', true);
    
            this.addDashEffect();
    
            this.dashCooldown = true;  
    
            this.time.delayedCall(dashDuration, () => {
                this.player.setVelocity(0, 0);  
                this.player.body.allowGravity = true;  
                this.dashing = false;  
    
                // Désactiver l'invincibilité une fois le dash terminé
                this.isInvincible = false;
    
                this.time.delayedCall(this.dashCooldownDuration, () => {
                    this.dashCooldown = false; 
                });
            });
        }
    }
    
    
    
    addDashEffect() {
        const dashEffect = this.add.sprite(this.player.x, this.player.y, 'img_perso'); 
        dashEffect.alpha = 0.5;  
        dashEffect.setTint(0x999999);  
    
        
        this.tweens.add({
            targets: dashEffect,
            alpha: 0,
            duration: 200,  
            onComplete: () => {
                dashEffect.destroy();  
            }
        });
    }
    
    deathLayerCreation(map) {
        const deathLayer = map.getObjectLayer('death_layer'); 
        if (deathLayer) {
            deathLayer.objects.forEach(deathObject => {
                // Créer une zone de mort invisible
                const deathZone = this.physics.add.staticImage(deathObject.x + deathObject.width / 2, deathObject.y - deathObject.height / 2, null);
                deathZone.setSize(deathObject.width, deathObject.height); // Définir la taille de la zone
                deathZone.setOrigin(0.5, 1); // Ajuster l'origine
    
                // Assurer que la zone n'est pas visible
                deathZone.setVisible(false); // Rendre l'objet invisible
    
                // Gérer la superposition entre le joueur et la zone de mort
                this.physics.add.overlap(this.player, deathZone, this.onDeathLayer, null, this);
            });
        }
    }
    

    onDeathLayer(player) {
        // Toujours infliger des dégâts, même si le joueur est petit
        if (this.isInvincible) return; // Ignorer si invincible
    
        // Réduction de santé
        player.health -= 5;
        console.log("Player touched death layer. Remaining health: ", player.health);
    
        if (player.health <= 0) {
            console.log("Game Over!"); 
            // Au lieu de redémarrer la scène, rediriger vers le menu
            this.handlePlayerDeath(); // Utiliser la méthode handlePlayerDeath pour gérer la mort
        } else {
            // Activer l'invincibilité après avoir subi des dégâts
            this.isInvincible = true;
            this.player.setTint(0xff0000); // Optionnel : effet visuel pour indiquer l'invincibilité
    
            this.time.delayedCall(this.invincibleDuration, () => {
                this.isInvincible = false;
                this.player.clearTint(); // Réinitialiser la couleur du joueur
            });
        }
        this.deathSound.play();
    }
    
   

    
}
