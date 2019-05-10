//set width and height variables for game

//create game object and initialize the canvas
var config = {
	type: Phaser.AUTO,
	backgroundColor:"#eee",		//set background color of canvas
  parent: 'LuckyPig',//group name
  width: 800,
	height: 600,
  physics: {
    default: 'arcade',
    arcade: {
      debug: false,
      gravity: { y: 0 }
    }
  },
  scene: {
    preload: preload,
    create: create,
    update: update
  } 
};
let speed=300 //player movement speed
const game = new Phaser.Game(config);
function preload() {
		//load asset
		this.load.image('player', 'asset/blue-square.png');
		this.load.image('food', 'asset/red-square.png');
		this.load.image('superFood', 'asset/black-square.png');
		this.load.image('goldenFood','asset/gold-square.png')	
		this.cursors = this.input.keyboard.createCursorKeys(); //let user control
		//this.physics.world.setBounds(0, 0, 6666, 6666);//World size
}
function create() {
	var self = this;
	this.socket = io();
	this.newPlayers=this.physics.add.group() //store newPlayers contains physics
	this.socket.on('register', function (players) {
	  Object.keys(players).forEach(function (id) { //loop get their keys
		if (players[id].socketId === self.socket.id) {
			registerPlayer(self, players[id]);//register a player
		}else{
			registerNewPlayer(self,players[id]);//register a new player
		}
	  });
	});
	this.socket.on('registerNewPlayer', function (info) {
    registerNewPlayer(self, info);//register a new player
  });
	this.socket.on('disconnect', function (sockID) {
    self.newPlayers.getChildren().forEach(function (players) {
      if (sockID === players.socketId) {
        players.destroy();//delete from newPlayers group
      }
    });
	});
  this.socket.on('positionUpdate', function (playerInfo) {
    self.newPlayers.getChildren().forEach(function (players) {
      if (playerInfo.socketId === players.socketId) {
				players.setPosition(playerInfo.x, playerInfo.y);//will update player movement
      }
    });
	});

	//set team score text
	this.blueScoreText = this.add.text(16, 16).setScrollFactor(0).setFontSize(25).setColor('#0000FF');;
	this.blackScoreText = this.add.text(16, 48).setScrollFactor(0).setFontSize(25).setColor('000000');;
	this.topPlayerText=this.add.text(500,16).setScrollFactor(0).setFontSize(15).setColor("000000")

	//update score
  this.socket.on('updateScore', function (Info) {
    self.blueScoreText.setText('Blue Team Score: ' + Info.scores.blue);
		self.blackScoreText.setText('Black Team Score: ' + Info.scores.black);
		self.topPlayerText.setText("Top Player: "+ Info.highScore.socketId+ "\n Score: "+Info.highScore.score)
	});
	//crate food location
	this.socket.on('foodLocation', function (foodLocation) {
    if (self.food) self.food.destroy(); //delete from food group
    self.food = self.physics.add.image(foodLocation.x, foodLocation.y, 'food'); //add sprite
    self.physics.add.overlap(self.player, self.food, function () { //if food are overlap by players
      //this.physics.world.colliders.destroy();
      this.socket.emit('foodCollected'); //call back function
      self.food.destroy();//delete from food group
    }, null, self);

	});
	}
	

function update() {	
	if(this.player){
		//movement 
		if (this.cursors.up.isDown) {
			this.player.setVelocityY(-speed);
		}
		else if (this.cursors.down.isDown){
			this.player.setVelocityY(speed);

		}
		else{
			this.player.setVelocityY(0);
		}
		if (this.cursors.left.isDown) {
			this.player.setVelocityX(-speed);
		}
		else if (this.cursors.right.isDown){
			this.player.setVelocityX(speed);

		}
		else{
			this.player.setVelocityX(0);
		}
    // update player movement
    let x = this.player.x;
    let y = this.player.y;
    if (this.player.oldData && (x !== this.player.oldData.x || y !== this.player.oldData.y)) {
      this.socket.emit('updatePosition', { //call back function update their position
        x: this.player.x,
        y: this.player.y,
      });
    }

    // save old position
    this.player.oldData = {
      x: this.player.x,
      y: this.player.y,
    };
	}
}
function registerPlayer(self, info) {
	self.player = self.physics.add.sprite(info.x, info.y, 'player')
	if(info.team ==='black') self.player.setTint(0xff0000);	//set player to black
	self.player.body.collideWorldBounds=true; //will not go over walls
	//self.cameras.main.startFollow(self.player); //cameras follow players only if there will be lot of user.

}
function registerNewPlayer(self, info) {
	const newPlayer=self.add.sprite(info.x, info.y, 'player'); //new player
	if(info.team ==='black') newPlayer.setTint(0xff0000);	 //set player to black
	newPlayer.socketId=info.socketId; //assign socketID
	self.newPlayers.add(newPlayer); //add into phaser group
}