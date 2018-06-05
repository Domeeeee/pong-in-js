var canvas;
var contextCanvas; 
var ballX = 550; 
var ballY = 550;
var speedBallX = 10; 
var speedBallY = 5;

var player1Score = 0; 
var player2Score = 0; 
const WINNING_SCORE = 3; 

var showingWinScreen = false; 

var paddle1Y = 250; 
var paddle2Y = 250; 
const PADDLE_HEIGHT = 100;
const PADDLE_THICKNESS = 15; 

function calcMouse(evt){
	
	var rect = canvas.getBoundingClientRect(); 
	var root = document.documentElement; 
	var mouseX = evt.clientX - rect.left - root.scrollLeft; 
	var mouseY = evt.clientY - rect.top - root.scrollTop; 
	return {
		x: mouseX,
		y: mouseY
	}; 	
}


function handleMouseClick(evt) {

	if(showingWinScreen) {
		player1Score = 0; 	
		player2Score = 0; 
		showingWinScreen = false; 
	}



}



window.onload = function() {

	canvas = document.getElementById('gc');

	ctx = canvas.getContext("2d"); 

	var framesPerSecond = 50; 

	setInterval(function(){
		draw(); 
		move(); 
	}, 1000 / framesPerSecond);  


	canvas.addEventListener('mousedown', handleMouseClick); 


	canvas.addEventListener('mousemove', function(evt){

		var mousePos = calcMouse(evt); 
		paddle1Y = mousePos.y-(PADDLE_HEIGHT/2); 

	}); 
		
}


function ballReset() {

	if(player1Score >= WINNING_SCORE || player2Score >= WINNING_SCORE) {

		player1Score = 0; 
		player2Score = 0; 
		showingWinScreen = true; 

	}






	speedBallX = -speedBallX; 
	ballX = canvas.width / 2; 
	ballY = canvas.height / 2; 


}



function drawNet() {


	for(var i = 0; i < canvas.height; i += 40) {
		colorRect(canvas.width/2-1, i, 2, 20, 'white');  	
	}

}



function draw() {

	
	colorRect(0, 0, canvas.width, canvas.height, 'black'); 
 
	
	if(showingWinScreen) {

		ctx.fillStyle = '#fff'; 

		if(player1Score >= WINNING_SCORE) {
		
		ctx.fillText("Left Player Won!", 350, 200); 
	
		} else if(player2Score >= WINNING_SCORE) {

		ctx.fillText("Right Player Won!", 350, 200); 

		}


		ctx.fillText("Click to continue", 350, 500); 
		return; 
		
	}


	colorRect(0, paddle1Y, 15, PADDLE_HEIGHT, '#fff');  

	//right paddle 
	colorRect(canvas.width - PADDLE_THICKNESS, paddle2Y, 15, PADDLE_HEIGHT, '#fff');  

	//Ball
 
	colorCircle(ballX, ballY, 15, 15, 'white'); 

	ctx.fillText(player1Score, 100, 100); 
	ctx.fillText(player2Score, canvas.width - 100, 100); 
}


function computerMove() {

	var paddle2YCenter = paddle2Y + (PADDLE_HEIGHT / 2); 

	if(paddle2YCenter < ballY - 35) {
		paddle2Y += 6; 
	} else if(paddle2YCenter > ballY + 35) {
		paddle2Y -= 6; 
	}


}


function move() {

	drawNet(); 

	if(showingWinScreen == true) {
		return;  
	}


	computerMove(); 


	ballX = ballX + speedBallX; 
	ballY = ballY + speedBallY;

	

	if(ballX > canvas.width) {
		
		if(ballY > paddle2Y && 
		   ballY < paddle2Y + PADDLE_HEIGHT) {
			speedBallX = -speedBallX; 		
			
			var deltaY = ballY - (paddle1Y + PADDLE_HEIGHT / 2); 
			ballSpeedY = deltaY * 0.35; 

	
		} else {
		
		player1Score++; 
		ballReset(); 
		  
		}
 
	} else if(ballX < 0) {

		if(ballY > paddle1Y && 
		   ballY < paddle1Y + PADDLE_HEIGHT) {
			speedBallX = -speedBallX; 		

			var deltaY = ballY - (paddle2Y + PADDLE_HEIGHT / 2); 
			ballSpeedY = deltaY * 0.35; 

		} else {

		player2Score++; 
		ballReset(); 
		 
		}
	}


	if(ballY > canvas.height) {
		speedBallY = -speedBallY;
	} else if(ballY < 0) {
		speedBallY = -speedBallY;
	}


}




function colorRect(leftX, topY, width, height, drawColor) {

	ctx.fillStyle = drawColor; 
	ctx.fillRect(leftX, topY, width, height); 

}


function colorCircle(centerX, centerY, radius, drawColor) {

	ctx.fillStyle = drawColor; 
	ctx.beginPath(); 
	ctx.arc(centerX, centerY, 10, 0, Math.PI * 2, true ); 
	ctx.fill(); 
		

}






















