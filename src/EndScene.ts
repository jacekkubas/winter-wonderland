import Phaser from 'phaser'

export default class BeforeLevel extends Phaser.Scene {
	constructor() {
		super('end')
	}

	create() {
		// this.registry.set('level', this.registry.list.level + 1);
		
    this.add.text(400, 300, 'The End', {
			fontSize: '21px',
      color: '#000'
		})

	}
}
