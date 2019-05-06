//set width and height variables for game

//create game object and initialize the canvas
const width =1900;
const height = 950;
const game = new Phaser.Game(width, height, Phaser.AUTO, null, {preload: preload, create: create, update: update,render:render });//initialize some variables
let player; //plyaer
//food
let food;
let superFood;
let goldenFood;
let boolFood=false;
var socket;
let cursors;  //movement
let player
let speed = 300;
//score
let score = 0;
let scoreText;

//plaer size
let scaleXForPlayer=1;
let scaleYForPlayer=1;

let boost=400; //skill

//timer event
let timer;
let goldenTimer;
function preload() {
	//set background color of canvas
	game.stage.backgroundColor = '#eee';
	//load assetsred
	game.load.image('player', '../asset/blue-square.png');
	game.load.image('food', '../asset/red-square.png');
	game.load.image('superFood', '../asset/black-square.png');
	game.load.image('goldenFood','../asset/gold-square.png')

}
function create() {
	//world bounds size
	this.socket=io()
	const worldWidth=6666;
	const worldHight=6666;
	//start	
	game.physics.startSystem(Phaser.Physics.ARCADE,Phaser.Physics.P2JS);
	game.world.setBounds(0, 0,worldWidth, worldHight); //world bounds size


	//initialize keyboard arrows for the game controls
	cursors = game.input.keyboard.createCursorKeys();


	//add player in random place
	player = game.add.sprite(worldWidth*Math.random(), worldHight*Math.random(), 'player');


	//enable physics for the player body
	game.physics.enable(player, Phaser.Physics.ARCADE);


	//make the player stay in the woldBounds
	player.body.collideWorldBounds = true;


	//create food
    food = game.add.group();
     for (var i = 0 ; i < 1200 ; i++) {
         food.create(worldWidth*Math.random(),worldHight*Math.random(),'food');
	 }
		

	 //create super food
	 superFood=game.add.group();
	 for(var i=0;i<50;i++){
		 superFood.create(worldWidth*Math.random(),worldHight*Math.random(),'superFood');
	 }
	
	 //create golden food
	 goldenFood=game.add.group();
	 for(var i=0; i<10;i++){
		 goldenFood.create(worldWidth*Math.random(),worldHight*Math.random(),'goldenFood');
	 }

	//enable physics for the food
	game.physics.enable(food, Phaser.Physics.ARCADE);
	game.physics.enable(superFood, Phaser.Physics.ARCADE);
	game.physics.enable(goldenFood,Phaser.Physics.ARCADE);


	//place score text on the screen
	scoreText = game.add.text(5,3,score,{align: "center"});
	scoreText.fixedToCamera = true;
    scoreText.cameraOffset.setTo(5, 3);

	//camera follow player
	game.camera.follow(player);

    skills = this.input.keyboard.addKey(Phaser.KeyCode.SPACEBAR);

	//Increase player size
	timer = game.time.create(false);
    timer.loop(8000, updateSize, this);
	timer.start();
	
	// next stage ill let
	//need let score follow player's cerama(DONE)
	// player eat food size increase then if the player size > other size then player eat other (demo3)
	// player will grow after X sec base on their score(DONE)
	// a super food that will let user be increase size by 2X for 30sec(DONE) change to 15Sec , change back to 20sec
	// boost if player press spacebar speed will increase but the size will decrease. DONE
	//set a limit of player size DONE
}
function update() {
	//move the player up and down based on keyboard arrow
	if (cursors.up.isDown) {
		player.body.velocity.y = -speed;
		//makesure user size is grater than normal size
		if(boolFood===false && scaleXForPlayer>1.0 && scaleYForPlayer>1.0){
			if(skills.isDown){
				player.body.velocity.y = -boost;
				player.scale.setTo(scaleXForPlayer-=0.002,scaleYForPlayer-=0.002);
			}
	}
	//after 30sec user size will divide by 2 if user keep using skills the publisment will be after 30sec ////user will have smaller size than others.
	// However, user can use this 30sec to eat more player
	if(boolFood===true &&scaleXForPlayer>1.5 && scaleYForPlayer>1.5){
		if(skills.isDown){
			player.body.velocity.y = -boost;
			player.scale.setTo(scaleXForPlayer-=0.0017,scaleYForPlayer-=0.0017);
		}
	} 
}
	else if (cursors.down.isDown) {
		player.body.velocity.y = speed;
		if(boolFood===false && scaleXForPlayer>1.0 && scaleYForPlayer>1.0){
			if(skills.isDown){
				player.body.velocity.y = boost;
				player.scale.setTo(scaleXForPlayer-=0.002,scaleYForPlayer-=0.002);
			}
	}
	if(boolFood===true &&scaleXForPlayer>1.5 && scaleYForPlayer>1.5){
		if(skills.isDown){
			player.body.velocity.y = boost;
			player.scale.setTo(scaleXForPlayer-=0.0017,scaleYForPlayer-=0.0017);
		}
	} 
	}
	else {
		player.body.velocity.y = 0;
}
	//move the player right and left based on keyboard arrows
	if (cursors.left.isDown) {
		player.body.velocity.x = -speed;
		if(boolFood===false && scaleXForPlayer>1.0 && scaleYForPlayer>1.0){
			if(skills.isDown){
				player.body.velocity.x = -boost;
				player.scale.setTo(scaleXForPlayer-=0.002,scaleYForPlayer-=0.002);
			}
	}
	if(boolFood===true &&scaleXForPlayer>1.5 && scaleYForPlayer>1.5){
		if(skills.isDown){
			player.body.velocity.x = -boost;
			player.scale.setTo(scaleXForPlayer-=0.0017,scaleYForPlayer-=0.0017);
		}
	}
	}
	else if (cursors.right.isDown) {
		player.body.velocity.x = speed;
		if(boolFood===false && scaleXForPlayer>1.0 && scaleYForPlayer>1.0){
			if(skills.isDown){
				player.body.velocity.x = boost;
				player.scale.setTo(scaleXForPlayer-=0.002,scaleYForPlayer-=0.002);
			}
	}
	if(boolFood===true &&scaleXForPlayer>1.5 && scaleYForPlayer>1.5){
		if(skills.isDown){
			player.body.velocity.x = boost;
			player.scale.setTo(scaleXForPlayer-=0.0017,scaleYForPlayer-=0.0017);
		}
	} 
	}
	else {
		player.body.velocity.x = 0;
	}
	//call eatFood function when the player and a piece of food overlap
	game.physics.arcade.overlap(player, food, eatFood);
	game.physics.arcade.overlap(player,superFood,eatSuperFood);
	game.physics.arcade.overlap(player,goldenFood,eatGoldenFood);
}
//eatFood function
function eatFood(player, food) {
	//remove the piece of food
	food.kill();
	//update the score
	increaseScoreNormal();
	scoreText.text = score;
	//increase size if player eat foods
	player.scale.setTo(scaleXForPlayer+=0.02,scaleYForPlayer+=0.02);
}
function increaseScoreNormal(){
	return score++;
}
function eatSuperFood(player,superFood){
	//remove the piece of superfood
	superFood.kill(); //same as delete or pop()
	//update the score
	increaseScoreSuper();
	scoreText.text = score; 
	//increase size if player eat superfoods
	player.scale.setTo(scaleXForPlayer+=0.15,scaleYForPlayer+=0.15);
}
function increaseScoreSuper(){
	return score+=5;
}
function eatGoldenFood(player,goldenFood){
	//remove piece of golenFood
	goldenFood.kill();
	//let player size*2
	if(boolFood===false){
		boolFood=true;
		sizeX3();
	}
	//or add score=20
	else{
		score+=20;
		scoreText.text=score;
		player.scale.setTo(scaleXForPlayer+=0.4,scaleYForPlayer+=0.4);
	}
}

//goldenFood effect
function sizeX3(){
	player.scale.setTo(scaleXForPlayer*=2,scaleYForPlayer*=2);
	game.time.events.add(30000, setItBack, this); 
}
function setItBack(){
	//since the size is double, the publishment is size divide by 2
	player.scale.setTo(scaleXForPlayer=scaleXForPlayer/2,scaleYForPlayer=scaleYForPlayer/2);
	boolFood=false;
}

//updateSize by 8sec
function updateSize(){
	player.scale.setTo(scaleXForPlayer+=score*0.0009,scaleYForPlayer+=score*0.0009);
}
function render() {
	//set countdown for golden food
    game.debug.text("Time until event: " + game.time.events.duration, 5, 42);

}