
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
  it('if player eat the normal food score should add 1',function(){
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
