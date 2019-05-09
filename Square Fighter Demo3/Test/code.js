// (function(){
// 	'testing';
// 	// function Testsize(sizeX,sizeY){
// 	// 	sizeX+=0.02
// 	// 	sizeY+=0.02
// 	// 	return([sizeX,sizeY]);
// 	// };
// 	// _.TestsizeSuper=function(sizeX,sizeY){
// 	// 	sizeX+=0.2
// 	// 	sizeY+=0.2
// 	// 	return([sizeX,sizeY]);
// 	// };
// 	// _.TestSpeed=function(speed){
// 	// 	return speed;
// 	// };
// 	_.TestscoreNormal=function(score){
// 		return score++;
// 	};
// 	_.TestscoreSuper=function(score){
// 		return score+=5
// 	};
// 	_.TesteatFood=function(foodArray){
// 		foodArray=foodArray.pop()
// 		return foodArray.length;
// 	};
// 	_.TesteatSuperFood=function(superFoodArray){
// 		superFoodArray=superFoodArray.pop()
// 		return superFoodArray.length;
// 	};
// }());
module.exports={
	TestSpeed:function(speed){
		return speed
	},
	// TestsizeNormal:function(sizeX,sizeY){		
	// 	sizeX+=0.02;
	// 	sizeY+=0.02;
	// 	return ([sizeX,sizeY])
	// },
	// TestsizeSuper:function(sizeX,sizeY){
	// 	sizeX+=0.2;
	// 	sizeY+=0.2;
	// 	return([sizeX,sizeY]);
	// },
	TestscoreNormal:function(score){
		return score+=5;
	},
	// TestscoreSuper:function(score){
	// 	return score+=5
	// },
	TesteatFood:function(foodArray,place){
		for( let i = 0; i < foodArray.length; i++){ 
			if ( foodArray[i] === place) {
			  foodArray.splice(i, 1); 
			}
		 }
		return foodArray.length;
	},
	// TesteatSuperFood:function(superFoodArray,place){
	// 	for( let i = 0; i < superFoodArray.length; i++){ 
	// 		if ( superFoodArray[i] === place) {
	// 			superFoodArray.splice(i, 1); 
	// 		}
	// 	 }
	// 	return superFoodArray.length;
	// },
	TesteatNormalFoodRemain:function(normal,place){
		for( let i = 0; i < normal.length; i++){ 
			if ( normal[i] === place) {
				normal.splice(i, 1); 
			}
		 }
		return normal;
	},
	Testenter:function(){
		return "A user connected"
	}
	// TesteatSuperFoodRemain:function(superfood,place){
	// 	for( let i = 0; i < superfood.length; i++){ 
	// 		if ( superfood[i] === place) {
	// 			superfood.splice(i, 1); 
	// 		}
	// 	 }
	// 	return superfood;
	// }
}