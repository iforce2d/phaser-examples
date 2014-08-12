
var game = new Phaser.Game(800, 600, Phaser.CANVAS, 'phaser-example', { preload: preload, create: create });

function preload() {

	game.load.image('platform', 'assets/sprites/platform.png');
	game.load.image('block', 'assets/sprites/block.png');
	game.load.spritesheet('ship', 'assets/sprites/humstar.png', 32, 32);

}

function create() {
	
	game.stage.backgroundColor = '#124184';

	// Enable Box2D physics
	game.physics.startSystem(Phaser.Physics.BOX2D);
	game.physics.box2d.setBoundsToWorld();
	game.physics.box2d.gravity.y = 500;

	// Static platform 
	var platformSprite = game.add.sprite(400, 550, 'platform');
	game.physics.box2d.enable(platformSprite);
	platformSprite.body.static = true;

	// Dynamic boxes
	for (var i = 0; i < 5; i++) {
		var blockSprite = game.add.sprite(150 + i * 125, 300 - i * 50, 'block');
		game.physics.box2d.enable(blockSprite);
		blockSprite.body.angle = 30;
	}

	// Dynamic circle
    ship = game.add.sprite(400, 100, 'ship');
    ship.scale.set(3);
    ship.smoothed = false;
    ship.animations.add('fly', [0,1,2,3,4,5], 10, true);
    ship.play('fly');
    game.physics.box2d.enable(ship, false);
    ship.body.setCircle(42);
	
	// Set up handlers for mouse events
	game.input.onDown.add(mouseDragStart, this);
	game.input.addMoveCallback(mouseDragMove, this);
	game.input.onUp.add(mouseDragEnd, this);
	
	game.add.text(5, 5, 'Drag the objects with the mouse.', { fill: '#ffffff', font: '14pt Arial' });
}

function mouseDragStart() {
	
    game.physics.box2d.mouseDragStart(game.input.mousePointer);
    
}

function mouseDragMove() {
	
    game.physics.box2d.mouseDragMove(game.input.mousePointer);
    
}

function mouseDragEnd() {
	
    game.physics.box2d.mouseDragEnd();
    
}
