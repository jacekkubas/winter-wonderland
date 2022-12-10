import Phaser from 'phaser'
import { sceneEvents } from './events/EventsCenter'

export default class HelloWorldScene extends Phaser.Scene {
	private player!: Phaser.Physics.Arcade.Sprite;
	private cursors!: Phaser.Types.Input.Keyboard.CursorKeys;
	private ground!: Phaser.Tilemaps.TilemapLayer;
	private stars!: Phaser.Tilemaps.TilemapLayer;
	private snowmans!: Phaser.Tilemaps.TilemapLayer;
	private count = 0;
	private speed = 200;
	private numb = false;

	constructor() {
		super('hello-world')
	}

	preload() {
		this.load.tilemapTiledJSON('map', '/tiled/level1.json');
		this.load.image('tileset', '/tiled/tileset.png');
		this.load.image('player', '/tiled/player.png');
		this.load.image('snowman', '/tiled/snowman.png');
	}

	create() {
		this.scene.run('game-ui')

		const map:Phaser.Tilemaps.Tilemap = this.make.tilemap({ key: 'map' });
		const tileset:Phaser.Tilemaps.Tileset = map.addTilesetImage('tileset');
		this.physics.world.bounds.width = map.widthInPixels;
    this.physics.world.bounds.height = map.heightInPixels;
		
		this.ground = map.createLayer('Ground', tileset, 0, 0);
		this.stars = map.createLayer('coins', tileset, 0, 0);
		this.snowmans = map.createLayer('snowmans', tileset, 0, 0);

		this.ground.setCollisionByProperty({ collide: true });
		this.snowmans.setCollisionByProperty({ collide: true });
		
		this.player = this.physics.add.sprite(20, 500, 'player');
		this.player.body.setSize(this.player.width * 0.5, this.player.height * 0.8)
		this.player.setCollideWorldBounds();

		this.physics.add.collider(this.player, this.ground);

		this.stars.setTileIndexCallback(5, (_a: Phaser.Physics.Arcade.Sprite, tile: Phaser.Tilemaps.Tile) => {
			this.collectStar(this.stars, tile);
		}, this);

		const snowmans = this.snowmans.createFromTiles(8, [], {key: 'snowman'});
		snowmans.forEach(obj => {
			obj.setOrigin(0, 0);
			this.physics.add.existing(obj);
			this.physics.add.collider(obj, this.ground);
			this.physics.add.overlap(this.player, obj, () => {
				let dir = -1;
				if (this.player.body.touching.left) dir = 1;
			
				this.numb = true;
				this.player.setTint(0x00e0ff);
				this.player.body.velocity.x = 0;
				this.player.body.velocity.y = 0;
				this.player.body.x += (25 * dir);

				setTimeout(() => {
					this.numb = false;
					this.player.setTint(0xffffff);
				}, 500)
			});
			
			setInterval(() => {
				const random = Math.random() * (300 - 200) + 200;
				obj.body.velocity.y = random * -1;
			}, 2000);
		})

		this.physics.add.overlap(this.player, this.stars);
		

		this.cursors = this.input.keyboard.createCursorKeys();
		this.cameras.main.setBounds(0, 0, map.widthInPixels, map.heightInPixels);
    this.cameras.main.startFollow(this.player, false);
	}

	collectStar (starLayer:Phaser.Tilemaps.TilemapLayer, tile: Phaser.Tilemaps.Tile) {
		starLayer.removeTileAt(tile.x, tile.y); // remove the tile/coin
		this.count = this.count + 1;

		sceneEvents.emit('star-collected', this.count);

		return false;
	}

	update() {
		if (this.numb) return;

		if (this.cursors.left.isDown) {
			// this.player.body.x -= 5;
			this.player.setVelocityX(-this.speed)
		} else if (this.cursors.right.isDown) {
			// this.player.body.x += 5;
			this.player.setVelocityX(this.speed)
		} else {
			this.player.setVelocityX(0)
		}
		
		if (this.cursors.up.isDown) {
			if (this.player.body.blocked.down) {
				this.player.body.velocity.y = -280;
			}
		}
	}
}
