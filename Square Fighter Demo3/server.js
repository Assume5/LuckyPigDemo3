const express = require('express');
// socket setup
const app = express();
const socket = require('socket.io')
let server = app.listen(8081, function(){
    console.log('listening on port 8081');
});
let io = socket(server)
let players = {}; //store players
//random food location
let food = {
  x: Math.random() * 800, 
  y: Math.random() * 600
};
//socres for black and blue team
let scores = {
  blue: 0,
  black: 0,
};
let highScore={
  socketId:socket.id,
  score:0
}
app.use(express.static(__dirname + '/Game'));

app.get('/', function (req, res) {
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', function (socket) {
  console.log(`${socket.id} is connected`);
// create player and add it to our players object
players[socket.id] = {
  //assign player into random positions
  x: 800*Math.random(),
  y: 600*Math.random(),
  socketId: socket.id, //player username (ID)
  team: (Math.floor(Math.random() * 2) == 0) ? 'black' : 'blue', //team
  score:0
};
// send the player to the newplayers
socket.emit('register', players);
// update all players of the newplayers

socket.broadcast.emit('registerNewPlayer', players[socket.id]);
    // emit food location to  player
  socket.emit('foodLocation', food);

    // emit the current scores
  socket.emit('updateScore', {scores,highScore});
// remove players when player disconnect
  socket.on('disconnect', function () {
  console.log(`${socket.id} is disconnect`);
  // remove player from player object
  delete players[socket.id];
  // emit a message to our player object to remove this player
  io.emit('disconnect', socket.id);
});

// Update player movement
socket.on('updatePosition', function (position) {
  //update data
  players[socket.id].x = position.x;
  players[socket.id].y = position.y;
  // emit a message to all players about the player that moved
  socket.broadcast.emit('positionUpdate', players[socket.id]);
});
socket.on('foodCollected', function () {
  // updateScore
  players[socket.id].score+=1
  if (players[socket.id].team === 'black') {
    scores.black += 5;
} else {
    scores.blue += 5;
}
//add new food location
  food.x = Math.random() * 800;
  food.y =  Math.random() * 600;
  highScore.socketId=players[Object.keys(players)[0]].socketId
  highScore.score=players[Object.keys(players)[0]].score
  let highScores=players[Object.keys(players)[0]].score
  for(let element in players){
    if(highScores<players[element].score){
      highScore.socketId=element
      highScore.score=players[element].score
    }
  }
  console.log(highScore)
  io.emit('foodLocation', food);//create new food
  io.emit('updateScore', {scores,highScore}); //update score
});
});
