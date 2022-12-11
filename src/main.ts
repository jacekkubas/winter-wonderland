import Phaser from 'phaser'

import BeforeLevel from './BeforeLevel'
import UiScene from './UiScene'

// window.level = 1;

const config: Phaser.Types.Core.GameConfig = {
	type: Phaser.AUTO,
	parent: 'app',
	width: 800,
	height: 600,
	backgroundColor: '#5ea0d9',
	physics: {
		default: 'arcade',
		arcade: {
			gravity: { y: 500 },
			// debug: true
		},
	},
	scene: [BeforeLevel, UiScene],
}

const game = new Phaser.Game(config)

game.registry.set('level', 0);

export default game;
