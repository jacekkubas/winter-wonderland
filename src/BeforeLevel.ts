import Phaser from 'phaser'
import { sceneEvents } from './events/EventsCenter'

export default class BeforeLevel extends Phaser.Scene {
  private cursors!: Phaser.Types.Input.Keyboard.CursorKeys;

	constructor() {
		super('before-level')
	}

	create() {
    this.add.text(200, 300, ' press space to start level ' + window.level.toString(), {
			fontSize: '21px',
      color: '#000'
		})

    this.cursors = this.input.keyboard.createCursorKeys();
		sceneEvents.emit('star-reset');
	}

  update() {
		if (this.cursors.space.isDown) {
			this.scene.start(`level${window.level}`)
		}
	}
}
