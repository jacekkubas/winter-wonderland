import Phaser from 'phaser'
import BeforeLevel from './BeforeLevel'
import UiScene from './UiScene'
import EndScene from './EndScene'

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
	scene: [BeforeLevel, UiScene, EndScene],
}

const game = new Phaser.Game(config)
game.registry.set('level', 0);

export default game;
