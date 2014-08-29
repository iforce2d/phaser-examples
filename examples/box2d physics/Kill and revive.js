
var game = new Phaser.Game(800, 600, Phaser.CANVAS, 'phaser-example', { preload: preload, create: create, update: update, render: render });

function preload() {

    game.load.image('atari', 'assets/sprites/atari130xe.png');
    game.load.image('firstaid', 'assets/sprites/firstaid.png');
    
}

var sprite;
var littleBoxes = [];
var cursors;

function create() {

    game.stage.backgroundColor = '#124184';

    // Enable Box2D physics
    game.physics.startSystem(Phaser.Physics.BOX2D);
    game.physics.box2d.gravity.y = 400;
    
    // Add a sprite
    sprite = game.add.sprite(200, 200, 'atari');

    // Enable physics on the sprite. This creates a default rectangular body.
    game.physics.box2d.enable(sprite);
    //sprite.body.fixedRotation = true;
    sprite.body.gravityScale = 0;

    // Add some more sprites to show how the body is inactive when killed.
    for (var i = 0; i < 10; i++) {
	var ballSprite = game.add.sprite(Math.random() * 800, Math.random * -200, 'firstaid');
	game.physics.box2d.enable(ballSprite);
	littleBoxes.push(ballSprite);
    }
    
    game.add.text(5, 5, 'Use arrow keys move, click to kill and reset.', { fill: '#ffffff', font: '14pt Arial' });

    game.input.onDown.add(deathToggle, this);

    cursors = game.input.keyboard.createCursorKeys();

}

function deathToggle(pointer) {

    if (sprite.alive)
    {
        sprite.kill();
    }
    else
    {
        sprite.reset(pointer.x, pointer.y);
    }

}

function update() {

    sprite.body.setZeroVelocity();

    if (cursors.left.isDown)
    {
    	sprite.body.moveLeft(400);
    }
    else if (cursors.right.isDown)
    {
    	sprite.body.moveRight(400);
    }

    if (cursors.up.isDown)
    {
    	sprite.body.moveUp(400);
    }
    else if (cursors.down.isDown)
    {
    	sprite.body.moveDown(400);
    }

    // Drop little boxes from top again if they went off the screen
    for (var i = 0; i < littleBoxes.length; i++) {
	var box = littleBoxes[i];
	if ( box.body.y > 630 ) {
	    box.body.x = Math.random() * 800;
	    box.body.y = Math.random() * -200;
	    box.body.setZeroVelocity();
	}
    }
}

function render() {

    game.debug.box2dWorld();
    
}
