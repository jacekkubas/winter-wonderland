import Phaser from 'phaser'
import { sceneEvents } from './events/EventsCenter'

export default class GameUI extends Phaser.Scene {
	private count = 0;

	constructor() {
		super({ key: 'game-ui' })
	}

	create() {
		const stars = this.add.text(12, 20, this.count.toString(), {
			fontSize: '32px',
      color: '#000'
		})

		sceneEvents.on('star-collected', (newCount: number) => {
			stars.text = newCount.toString();
		}, this)
	}
}