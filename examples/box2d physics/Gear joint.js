
var game = new Phaser.Game(800, 600, Phaser.CANVAS, 'phaser-example', { preload: preload, create: create, update: update, render: render });

function preload() {

	game.load.image('a', 'assets/sprites/a.png');
	game.load.image('b', 'assets/sprites/b.png');

}

var codeCaption;
var bodyAs = [];

function create() {
	
	game.stage.backgroundColor = '#124184';

	// Enable Box2D physics
	game.physics.startSystem(Phaser.Physics.BOX2D);
	game.physics.box2d.debugDraw.joints = true;
	game.physics.box2d.gravity.y = 500;

	var revoluteJoint1;
	var revoluteJoint2;
	var revoluteJoint3;
	var revoluteJoint4;
	var revoluteJoint5;
	var prismaticJoint;
	
	// First revolute joint
	{
		// Static box
		var spriteA = game.add.sprite(200, 200, 'a');
		game.physics.box2d.enable(spriteA);
		spriteA.body.static = true;
		
		// Dynamic box
		var spriteB = game.add.sprite(200, 200, 'b');
		game.physics.box2d.enable(spriteB);
		
		// bodyA, bodyB, ax, ay, bx, by, motorSpeed, motorTorque, motorEnabled, lowerLimit, upperLimit, limitEnabled
		revoluteJoint1 = game.physics.box2d.revoluteJoint(spriteA, spriteB);
		
		bodyAs.push(spriteA.body);
	}
	
	// Second revolute joint
	{
		// Static box
		var spriteA = game.add.sprite(200, 400, 'a');
		game.physics.box2d.enable(spriteA);
		spriteA.body.static = true;
		
		// Dynamic box
		var spriteB = game.add.sprite(200, 400, 'b');
		game.physics.box2d.enable(spriteB);
		
		// bodyA, bodyB, ax, ay, bx, by, motorSpeed, motorTorque, motorEnabled, lowerLimit, upperLimit, limitEnabled
		revoluteJoint2 = game.physics.box2d.revoluteJoint(spriteA, spriteB);		
	}
	
	// First gear joint
	{
		// joint1, joint2, ratio
		game.physics.box2d.gearJoint(revoluteJoint1, revoluteJoint2, 1);
	}

	////////////////////////////////////////////////////

	// Third revolute joint
	{
		// Static box
		var spriteA = game.add.sprite(400, 200, 'a');
		game.physics.box2d.enable(spriteA);
		spriteA.body.static = true;
		
		// Dynamic box
		var spriteB = game.add.sprite(400, 200, 'b');
		game.physics.box2d.enable(spriteB);
		
		// bodyA, bodyB, ax, ay, bx, by, motorSpeed, motorTorque, motorEnabled, lowerLimit, upperLimit, limitEnabled
		revoluteJoint3 = game.physics.box2d.revoluteJoint(spriteA, spriteB);
		
		bodyAs.push(spriteA.body);
	}
	
	// Fourth revolute joint
	{
		// Static box
		var spriteA = game.add.sprite(400, 400, 'a');
		game.physics.box2d.enable(spriteA);
		spriteA.body.static = true;
		
		// Dynamic box
		var spriteB = game.add.sprite(400, 400, 'b');
		game.physics.box2d.enable(spriteB);
		
		// bodyA, bodyB, ax, ay, bx, by, motorSpeed, motorTorque, motorEnabled, lowerLimit, upperLimit, limitEnabled
		revoluteJoint4 = game.physics.box2d.revoluteJoint(spriteA, spriteB);
	}
	
	// Second gear joint
	{
		// joint1, joint2, ratio
		game.physics.box2d.gearJoint(revoluteJoint3, revoluteJoint4, -3);
	}
	
	////////////////////////////////////////////////////
	
	// Prismatic joint
	{
		// Static box
		var spriteA = game.add.sprite(600, 200, 'a');
		game.physics.box2d.enable(spriteA);
		spriteA.body.static = true;
		
		// Dynamic box
		var spriteB = game.add.sprite(600, 200, 'b');
		game.physics.box2d.enable(spriteB);
		
		// bodyA, bodyB, axisX, axisY, ax, ay, bx, by, motorSpeed, motorForce, motorEnabled, lowerLimit, upperLimit, limitEnabled
		prismaticJoint = game.physics.box2d.prismaticJoint(spriteA, spriteB, 1, 0, 0, 0, 0, 0, 0, 0, false);
		
		bodyAs.push(spriteA.body);
	}
	
	// Fifth revolute joint
	{
		// Static box
		var spriteA = game.add.sprite(600, 400, 'a');
		game.physics.box2d.enable(spriteA);
		spriteA.body.static = true;
		
		// Dynamic box
		var spriteB = game.add.sprite(600, 400, 'b');
		game.physics.box2d.enable(spriteB);
		
		// bodyA, bodyB, ax, ay, bx, by, motorSpeed, motorTorque, motorEnabled, lowerLimit, upperLimit, limitEnabled
		revoluteJoint5 = game.physics.box2d.revoluteJoint(spriteA, spriteB);
	}
	
	// Third gear joint
	{
		// joint1, joint2, ratio
		game.physics.box2d.gearJoint(prismaticJoint, revoluteJoint5, 0.5);
	}

	// Set up handlers for mouse events
	game.input.onDown.add(mouseDragStart, this);
	game.input.addMoveCallback(mouseDragMove, this);
	game.input.onUp.add(mouseDragEnd, this);
	
	game.add.text(5, 5, 'Gear joint. Click to start.', { fill: '#ffffff', font: '14pt Arial' });
	game.add.text(5, 25, 'Mouse over the upper bodyA to see the code used to create the joint.', { fill: '#ffffff', font: '14pt Arial' });
	codeCaption = game.add.text(5, 50, 'Parameters: bodyA, bodyB, ax, ay, bx, by, gax, gay, gbx, gby, ratio, lengthA, lengthB', { fill: '#dddddd', font: '10pt Arial' });
	codeCaption = game.add.text(5, 65, '', { fill: '#ccffcc', font: '14pt Arial' });
	
	// Start paused so user can see how the joints start out
	game.paused = true;
	game.input.onDown.add(function(){game.paused = false;}, this);
}

function mouseDragStart() { game.physics.box2d.mouseDragStart(game.input.mousePointer); }
function mouseDragMove() {  game.physics.box2d.mouseDragMove(game.input.mousePointer); }
function mouseDragEnd() {   game.physics.box2d.mouseDragEnd(); }

function update() {
	
	if ( bodyAs[0].containsPoint(game.input.mousePointer) ) {
		codeCaption.text = 'game.physics.box2d.gearJoint(revoluteJoint1, revoluteJoint2, 1)';
	}
	else if ( bodyAs[1].containsPoint(game.input.mousePointer) ) {
		codeCaption.text = 'game.physics.box2d.gearJoint(revoluteJoint3, revoluteJoint4, -3)';
	}
	else if ( bodyAs[2].containsPoint(game.input.mousePointer) ) {
		codeCaption.text = 'game.physics.box2d.gearJoint(prismaticJoint, revoluteJoint5, 0.5)';
	}
	else {
		codeCaption.text = '';
	}
	
}

function render() {
	
	// update will not be called while paused, but we want to change the caption on mouse-over
	if ( game.paused ) {
		update();
	}
	
	game.debug.box2dWorld();
	
}