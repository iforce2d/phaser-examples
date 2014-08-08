var game = new Phaser.Game(800, 600, Phaser.AUTO, 'phaser-example', { preload: preload, create: create, update:update });

function preload() {
    game.load.image('car', 'assets/sprites/car.png');
    game.load.image('tinycar', 'assets/sprites/tinycar.png');
}

var leader;
var followers;
var cursors;

function create() {
    
    game.stage.backgroundColor = '#124184';
    
    // Enable Box2D physics
    game.physics.startSystem(Phaser.Physics.BOX2D);
    
    // Add a sprite to be the leader controlled by user
    leader = game.add.sprite(400, 300, 'car');
    game.physics.box2d.enable(leader);
    leader.body.linearDamping = 0.5;
    
    // Add some sprites to follow the leader
    followers = game.add.group();
    for (var i = 0; i < 10; i++) {
        var follower = followers.create(game.rnd.integerInRange(0, 800), game.rnd.integerInRange(0, 600), 'tinycar');
        game.physics.box2d.enable(follower);
        follower.body.linearDamping = 0.5;
    }
    
    cursors = game.input.keyboard.createCursorKeys();
    
    game.add.text(5, 5, 'Use arrow keys to move.', { fill: '#ffffff', font: '14pt Arial' });
};

function update() {
    followers.forEachAlive(moveBullets,this);  //make followers accelerate to leader

    if (cursors.left.isDown) {leader.body.rotateLeft(200);}   //leader movement
    else if (cursors.right.isDown){leader.body.rotateRight(200);}
    else {leader.body.setZeroRotation();}
    if (cursors.up.isDown){leader.body.thrust(150);}
    else if (cursors.down.isDown){leader.body.reverse(150);}    
};


function moveBullets (follower) { 
     accelerateToObject(follower,leader,5);  //start accelerateToObject on every follower
}

function accelerateToObject(follower, leader, speed) {
    if (typeof speed === 'undefined') { speed = 1; }
    
    // Find direction to target
    var dx = leader.x - follower.x;
    var dy = leader.y - follower.y;
    
    // Set angle from direction
    var angle = Math.atan2(dy, dx);
    follower.body.rotation = angle + game.math.degToRad(90);
    
    // Apply a force toward target
    dx *= 0.0001 * speed;
    dy *= 0.0001 * speed;
    follower.body.applyForce( -dx, -dy );
}
