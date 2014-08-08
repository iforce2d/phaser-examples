
var game = new Phaser.Game(800, 600, Phaser.CANVAS, 'phaser-example', { preload: preload, create: create, update: update });

function preload() {

    game.load.image('atari', 'assets/sprites/atari130xe.png');

}

var sprite;
var cursors;

function create() {

    game.stage.backgroundColor = '#124184';

    //	Enable p2 physics
    game.physics.startSystem(Phaser.Physics.BOX2D);

    //  Add a sprite
    sprite = game.add.sprite(200, 200, 'atari');

    //  Enable if for physics. This creates a default rectangular body.
    game.physics.box2d.enable(sprite);

    //  Modify a few body properties
    sprite.body.fixedRotation = true;

    game.add.text(5, 5, 'Use arrow keys to move.', { fill: '#ffffff', font: '14pt Arial' });

    cursors = game.input.keyboard.createCursorKeys();

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

}
