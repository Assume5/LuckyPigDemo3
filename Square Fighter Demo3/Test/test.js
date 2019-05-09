//TEST1
// "devDependencies": {
//   "mocha": "^6.0.2"
// },
const assert = require('assert');
const test = require("../test/code");
console.log(test);
describe('speed',function(){
  it("should return admin input",function(){
      let result=test.TestSpeed(300);
      assert.equal(result,300);
  });
});
// describe('size',function(){
//   it("should return size+=0.02",function(){
//       let result=test.TestsizeNormal(1,1);
//       assert.deepEqual(result,[1.02, 1.02]);
//   });
//   it("should return size+=0.2",function(){
//     let result=test.TestsizeSuper(1,1);
//     assert.deepEqual(result,[1.2,1.2]);
//   });
// }); 
describe('score',function(){
  it('if player eat the normal food score should add 5',function(){
    let result=test.TestscoreNormal(0);
    assert.equal(result,5);
  });
  // it('if the player eats superFood should add5',function(){
  //   let result=test.TestscoreSuper(0);
  //   assert.equal(result,5);
  // });
});
describe('food',function(){
  it('if player eats food foods length should -1',function(){
    //assumes there is 10 food in place 0,1,2,3,4,5,6,7,8,9
    let result=test.TesteatFood([1,2,3,4,5,6,7,8,9,0],4);
    assert.equal(result,9);
  });
  // it('if player eats food foods length should-1',function(){
  //       //assumes there is 5 food in place 0,1,2,3,4
  //       let result=test.TesteatSuperFood([0,1,2,3,4],2);
  //       assert.equal(result,4);
  // });
});
describe('food',function(){
  it('should display food remain',function(){
    //assumes there is 10 food in place 0,1,2,3,4,5,6,7,8,9
    let result=test.TesteatNormalFoodRemain([1,2,3,4,5,6,7,8,9,0],5);
    assert.deepEqual(result,[1,2,3,4,6,7,8,9,0]);
  });
  // it('should display remain food location',function(){
  //       //assumes there is 5 food in place 0,1,2,3,4
  //       let result=test.TesteatSuperFoodRemain([0,1,2,3,4],3);
  //       assert.deepEqual(result,[0,1,2,4]);
  //     });
});
describe('A player enter',function(){
  it("if user join the room should display user connected",function(){
    let result=test.Testenter()
    assert.equal(result,"A user connected")
  })
});

//TEST2
  // "devDependencies": {
  //   "chai": "*",
  //   "mocha": "*"
  // },
//   'use strict'

// var expect = require('chai').expect
//   , server = require('../server')
//   , io = require('socket.io-client')
//   , ioOptions = { 
//       transports: ['websocket']
//     , forceNew: true
//     , reconnection: false
//   }
//   , sender
//   , receiver
//   , connect='A user connect'



// describe('Chat Events', function(){
//   beforeEach(function(done){
    
//     // start the io server
//     server.start()
//     // connect two io clients
//     sender = io('http://localhost:8081/', ioOptions)
//     receiver = io('http://localhost:8081/', ioOptions)
//     sender.emit('foodLocation',{x:Math.random()*800,y:Math.random()*600})
//     // finish beforeEach setup
//     done()
//   })
//   afterEach(function(done){
    
//     // disconnect io clients after each test
//     sender.disconnect()
//     receiver.disconnect()
//     done()
//   })
//   // describe('Food Events', function(){
//   //   it('When a user has connect.', function(){
//   //     answer='A user connect'
//   //     expect(answer).to.equal(connect);
//   //     done();
//   //   })
//   // })
// });

