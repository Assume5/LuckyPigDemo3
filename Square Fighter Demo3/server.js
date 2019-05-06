const express = require('express');
// socket setup
const app = express();
const socket = require('socket.io')
let server = app.listen(8081, function(){
    console.log('listening on port 8081,');
});
let io = socket(server)
io.on('connection', function(socket){
  console.log(`${socket.id} is connected`);
});

let players = {}; //store players
//random food location
let food = {
  x: Math.random() * 800, 
  y: Math.random() * 600
};
//socres for black and blue team
let scores = {
  blue: 0,
  black: 0
};
app.use(express.static(__dirname + '/Game'));

app.get('/', function (req, res) {
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', function (socket) {
  console.log(socket.id + ' has connected');
// create player and add it to our players object
players[socket.id] = {
  x: 800*Math.random(),
  y: 600*Math.random(),
  socketId: socket.id,
  team: (Math.floor(Math.random() * 2) == 0) ? 'black' : 'blue' //team 
};
// send the player to the newplayers
socket.emit('register', players);
// update all players of the newplayers

socket.broadcast.emit('registerNewPlayer', players[socket.id]);
    // event food location to  player
  socket.emit('foodLocation', food);

    // event the current scores
    socket.emit('updateScore', scores);

// remove players when player disconnect
socket.on('disconnect', function () {
  console.log(socket.id+' has disconnected');
  // remove player from player object
  delete players[socket.id];
  // emit a message to our player object to remove this player
  io.emit('disconnect', socket.id);
});

// Update player movement
socket.on('UpdateMovement', function (movement) {
  //update data
  players[socket.id].x = movement.x;
  players[socket.id].y = movement.y;
  // emit a message to all players about the player that moved
  socket.broadcast.emit('UpdateMoves', players[socket.id]);
});

socket.on('foodCollected', function () {
  var date = new Date().toISOString();
  console.log(date); //event time

  // updateScore
  if (players[socket.id].team === 'black') {
    scores.black += 5;
} else {
    scores.blue += 5;
}
//add new food location
  food.x = Math.random() * 700;
  food.y =  Math.random() * 500;
  io.emit('foodLocation', food);
  io.emit('updateScore', scores);
});
});
