//Game Constants & Variables
let inputDir = {x:0,y:0};
const foodSound = new Audio('eat.mp3');
const GameOverSound = new Audio('GameOver.mp3');
const moveSound = new Audio('move.mp3');
const BgSound=new Audio('music.mp3');
let speed = 5;
let score = 0;
let lastPaintTime =0;
let snakeArr = [{x:13, y:15}]
food={x:6 , y:10};

//Game Functions
function main(ctime)
{
	window.requestAnimationFrame(main);
	if((ctime - lastPaintTime)/1000 < 1/speed)
	{
		return;
	}
	lastPaintTime = ctime;
	gameEngine();
}

function isCollide(sarr)
{
	// If snake bump into itself
	for(let i =1; i< snakeArr.length; i++)
	{
		if(snakeArr[i].x === snakeArr[0].x && snakeArr[i].y=== snakeArr[0].y)
		{
			return true;
		}
	}
	//if snake bump into wall 
		if(snakeArr[0].x >=18 || snakeArr[0].x<=0 || snakeArr[0].y >=18 || snakeArr[0].y<=0)
			return true;
}

function gameEngine()
{
	//part 1: Updating the snake array & Food
	if(isCollide(snakeArr)){
		GameOverSound.play();
		BgSound.pause();
		inputDir={x:0 , y:0};
		alert("Game Over. Press any Key to restart");
		snakeArr=[{x:13, y:15}];
		BgSound.play();
		score =0;
	}

	//If you have eaten the food, increment the score and regenerate the food
	if(snakeArr[0].y === food.y && snakeArr[0].x === food.x){
		foodSound.play();
		score+=1;
		if(score>hiscoreval)
		{
			hiscoreval = score;
			localStorage.setItem("High score",JSON.stringify(hiscoreval));
			hiscoreBox.innerHTML = "High score: " +hiscoreval;
			
		}
		scoreBox.innerHTML= "Score: "+score;
		snakeArr.unshift({x:snakeArr[0].x + inputDir.x, y:snakeArr[0].y + inputDir.y})
		let a=2;
		let b= 16;
		food = {x:Math.round(a +(b-a)*Math.random()), y:Math.round(a +(b-a)*Math.random())}
	}

	//Moving the snake
	for(let i= snakeArr.length-2; i>=0; i--)
	{
		snakeArr[i+1] = {...snakeArr[i]};
	}

	snakeArr[0].x += inputDir.x;
	snakeArr[0].y += inputDir.y;

    

	//part 2: 
	//Display the snake 
	board.innerHTML = "";
	snakeArr.forEach((e, index)=>{
		snakeElement = document.createElement('div');
		snakeElement.style.gridRowStart = e.y;
		snakeElement.style.gridColumnStart = e.x;
		
		if(index === 0)
		{
			snakeElement.classList.add('head');
		}
		else
		{
			snakeElement.classList.add('snake');
		}
		board.appendChild(snakeElement);
	});

	//Display the food
	foodElement = document.createElement('div');
	foodElement.style.gridRowStart = food.y;
	foodElement.style.gridColumnStart = food.x;
	foodElement.classList.add('food')
	board.appendChild(foodElement);
}

//main logic
BgSound.play();
let hiscore = localStorage.getItem("hiscore");
if(hiscore === null)
{
	hiscoreval=0;
	localStorage.setItem("High score",JSON.stringify(hiscoreval))
}
else
{
	hiscoreval = JSON.parse(hiscore);
	hiscoreBox.innerHTML = "High score: " +hiscore;
}
window.requestAnimationFrame(main);
window.addEventListener('keydown', e=>{
	inputDir ={x:0, y:1} //Start the game
	moveSound.play();
	switch(e.key){
	 case "ArrowUp" :
	 	console.log("ArrowUp");
	 	inputDir.x= 0;
	 	inputDir.y= -1;
	 	break;
	 case "ArrowDown" :
	 	console.log("ArrowDown");
	 	inputDir.x= 0;
	 	inputDir.y= 1;
	 	break;
	 case "ArrowRight" :
	 	console.log("ArrowRight");
	 	inputDir.x= 1;
	 	inputDir.y= 0;
	 	break;
	 case "ArrowLeft" :
	 	console.log("ArrowLeft");
	 	inputDir.x= -1;
	 	inputDir.y= 0;
	 	break;
	 default:
	 	break;
	}
})