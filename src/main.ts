import Phaser from 'phaser'

import HelloWorldScene from './HelloWorldScene'
import UiScene from './UiScene'

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
	scene: [HelloWorldScene, UiScene],
}

export default new Phaser.Game(config)
