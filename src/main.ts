import Phaser from 'phaser'

import BeforeLevel from './BeforeLevel'
import Level1 from './Level1'
import Level2 from './Level2'
import UiScene from './UiScene'

window.level = 1;

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
	scene: [BeforeLevel, Level1, Level2, UiScene],
}

export default new Phaser.Game(config)
