
var game = new Phaser.Game(800, 600, Phaser.CANVAS, 'phaser-example', { preload: preload, create: create, update: update, render: render });

function preload() {

	game.load.image('arrow', 'assets/sprites/xenon2_ship.png');

}

var sprite;
var bmd;

function create() {

	game.stage.backgroundColor = '#124184';

	// Enable Box2D physics
	game.physics.startSystem(Phaser.Physics.BOX2D);
	game.physics.box2d.gravity.y = 400;
	game.physics.box2d.restitution = 0.8;

	// Bitmap to draw trail dots on
	bmd = game.add.bitmapData(800, 600);
	bmd.context.fillStyle = '#ffffff';
	var bg = game.add.sprite(0, 0, bmd);

	// Add sprite
	sprite = game.add.sprite(32, 450, 'arrow');
	game.physics.box2d.enable(sprite);
	sprite.body.fixedRotation = true;

	game.add.text(5, 5, 'Click to the left / right of the ship.', { fill: '#ffffff', font: '14pt Arial' });

	game.input.onDown.add(launch, this);

}

function launch() {

	if (game.input.x < sprite.x)
	{
		sprite.body.velocity.x = -100;
		sprite.body.velocity.y = -200;
	}
	else
	{
		sprite.body.velocity.x = 100;
		sprite.body.velocity.y = -200;
	}

}

function update() {

	bmd.context.fillStyle = '#ffff00';
	bmd.context.fillRect(sprite.x, sprite.y, 2, 2);

}

function render() {
}
