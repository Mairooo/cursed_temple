# Cursed Temple

Cursed Temple est un jeu d'action-aventure 2D de type platformer développé avec **Phaser 3**. Le joueur explore un temple maudit à travers plusieurs niveaux, affronte des ennemis et utilise des capacités spéciales pour progresser.

## Aperçu

- 3 niveaux jouables avec difficulté progressive
- Un combat de boss final
- Des cinématiques narratives entre les niveaux
- Un système de tutoriel intégré au premier niveau

## Contrôles

| Touche | Action |
|--------|--------|
| Flèches / ZQSD | Déplacement |
| Espace | Saut (double saut possible) |
| Maj (Shift) | Dash (cooldown 1s) |
| A | Rétrécissement (cooldown 2s) |
| E | Attaque / Tir |

## Mécaniques de jeu

- **Système de vie** : 5 cœurs, avec invincibilité temporaire après un coup
- **Dash** : Déplacement rapide avec un temps de recharge
- **Rétrécissement** : Permet de passer dans des espaces étroits
- **Tir** : Attaque à distance pour éliminer les ennemis
- **Leurre** : Capacité tactique pour distraire les ennemis

## Technologies

- [Phaser 3](https://phaser.io/) — Moteur de jeu HTML5
- [Parcel](https://parceljs.org/) — Bundler
- Babel — Transpilation JavaScript
- [Tiled](https://www.mapeditor.org/) — Éditeur de tilemaps

## Installation

```bash
npm install
```

## Lancement

```bash
npm start
```

Le serveur de développement s'ouvre automatiquement dans le navigateur.

## Build de production

```bash
npm run build
```

## Structure du projet

```
index.html          — Point d'entrée HTML
src/
  index.js          — Configuration Phaser et enregistrement des scènes
  menu.js           — Menu principal
  commande.js       — Écran des contrôles
  histoire.js       — Cinématique d'introduction
  niveau1.js        — Niveau 1 (tutoriel)
  niveau2.js        — Niveau 2
  histoire_2.js     — Cinématique intermédiaire
  niveau3.js        — Niveau 3 (boss)
  interface.js      — HUD (vie, paramètres)
  credits.js        — Écran des crédits
  fin.js            — Écran de fin
  mapv4/5/6.json    — Tilemaps des niveaux
  assets/           — Sprites, sons, musiques, tilesets
```
