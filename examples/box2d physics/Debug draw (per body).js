
var game = new Phaser.Game(800, 600, Phaser.CANVAS, 'phaser-example', { preload: preload, create: create, render: render });

function preload() {

	game.load.image('platform', 'assets/sprites/platform.png');
	game.load.image('block', 'assets/sprites/block.png');

}

var platformSprite;
var blockSprite;

function create() {
	
	game.stage.backgroundColor = '#124184';

	// Enable Box2D physics
	game.physics.startSystem(Phaser.Physics.BOX2D);
	game.physics.box2d.gravity.y = 500;
	
	// Static platform 
	platformSprite = game.add.sprite(400, 550, 'platform');
	game.physics.box2d.enable(platformSprite);
	platformSprite.body.static = true;

	// Dynamic box
	blockSprite = game.add.sprite(400, 200, 'block');
	game.physics.box2d.enable(blockSprite);
	blockSprite.body.angle = 30;
	
	game.add.text(5, 5, 'Debug draw can be done for bodies individually using custom colors.', { fill: '#ffffff', font: '14pt Arial' });
	game.add.text(5, 25, 'The shape color of the falling block here depends on vertical speed.', { fill: '#ffffff', font: '14pt Arial' });
}

function render() {
	
	// Default color is white
	game.debug.body(platformSprite);
	
	// Make falling block more red depending on vertical speed	
	var red = blockSprite.body.velocity.y * 0.5;
	red = Math.min(Math.max(red, 0), 255);
	var red = Math.floor(red);
	var blue = 255 - red;
	game.debug.body(blockSprite, 'rgb('+red+',0,'+blue+')');
	
}
