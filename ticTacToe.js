// Variables
var mode = 1;
var turn = 1;	// Move Counter
var player = 1;	// Turn variable (1 equals player one and 2 equals player two)
var playerChoices = [[],[]];
var p1Wins = 0;
var p2Wins = 0;
var ties = 0;


// Pre-Move hover effects
function mouseOver(number){
	hover = document.getElementById('sq' + number.toString());
	if((hover.innerHTML !== "X") && (hover.innerHTML !== "O")){
		if(player == 2){
			hover.innerHTML = " O ";
			hover.style.opacity = "0.5";
			hover.style.color = "#be9b7b";
		}
		else if(player == 1){
			hover.innerHTML = " X ";
			hover.style.opacity = "0.3";
			hover.style.color = "#854442";
		}
	}
};
function mouseOut(number){
	out = document.getElementById('sq' + number.toString());
	if((out.innerHTML !== "X") && (out.innerHTML !== "O")){
		out.innerHTML = "";
	}
};


// Creates the game board
function startGame(){
	createNavBar();
	createBoard = document.getElementById('board');
	createBoard.style.visibility = "visible";
	for(c = 1; c < 5; c++){
		lineStyle = document.getElementById('ln' + c.toString());
		if(c <= 2){
			lineStyle.className = "line animated fadeInRight";
		}
		else{
			lineStyle.className = "line animated fadeInUp";
		}
	}
	startGameMenu = document.getElementById('startMenu');
	startGameMenu.style.visibility = "hidden";
	startGameMenu.className = "";
}


// Creates the NavBar
function createNavBar(){
	navBar = document.getElementById('navbar');
	navBar.style.visibility = "visible";
	navBar.className = "animated fadeInDown";
}


// Creates the stats board
function createStatsBoard(){
	board = document.getElementById('gameStats');
	totalGames = (p1Wins + p2Wins + ties);
	printTotalGames = "Total Games: " + totalGames;
	printP1Wins = "Wins: " + p1Wins + " (" + ((p1Wins / totalGames) * 100).toFixed(1) + "%)";
	printP1Losses = "Losses: " + p2Wins + " (" + ((p2Wins / totalGames) * 100).toFixed(1) + "%)";
	printP2Wins = "Wins: " + p2Wins + " (" + ((p2Wins / totalGames) * 100).toFixed(1) + "%)";
	printP2Losses = "Losses: " + p1Wins + " (" + ((p1Wins / totalGames) * 100).toFixed(1) + "%)";
	printTies = "Ties: " + ties + " (" + ((ties / totalGames) * 100).toFixed(1) + "%)";
	document.getElementById('totalGames').innerHTML = printTotalGames;
	document.getElementById('p1Wins').innerHTML = printP1Wins;
	document.getElementById('p1Losses').innerHTML = printP1Losses;
	document.getElementById('p2Wins').innerHTML = printP2Wins;
	document.getElementById('p2Losses').innerHTML = printP2Losses;
	document.getElementById('totalTies').innerHTML = printTies;
	board.style.visibility = "visible";
	board.className = "animated fadeIn";
}


// End Games Messages
function endGame(ending){
	if(ending == "p1Won"){
		p1Win = "Player 1 Wins";
		document.getElementById('winner').innerHTML = p1Win;
	}
	else if(ending == "p2Won"){
		p2Win = "Player 2 Wins";
		document.getElementById('winner').innerHTML = p2Win;
	}
	else if(ending == "tied"){
		noWin = "It's a tie";
		document.getElementById('winner').innerHTML = noWin;
	}
	else if(ending == "clear"){
		eraseMessage = "";
		document.getElementById('winner').innerHTML = eraseMessage;
	}
}


// Resets the board but keeps game stats
function reset(){
	turn = 1;
	player = 1;
	playerChoices = [[],[]];
	for(z = 1; z <= 9; ++z){
		resetColor = document.getElementById('sq' + z.toString());
		resetColor.style.color = "#fff4e6";
	}
	for(y = 1; y <= 9; ++y){
		resetValue = document.getElementById('sq' + y.toString());
		resetValue.innerHTML = "";
	}
  endGame("clear");
}
// Resets the board and clears game stats
function restart(){
	reset();
	createBoard = document.getElementById('board');
	createBoard.style.visibility = "hidden";
	for(c = 1; c < 5; c++){
		lineStyle = document.getElementById('ln' + c.toString());
		lineStyle.className = "";
	}
	statsBox = document.getElementById('gameStats');
	statsBox.style.visibility = "hidden";
	statsBox.className = "";
	navBar = document.getElementById('navbar');
	navBar.style.visibility = "hidden";
	navBar.className = "";
	startMenu = document.getElementById('startMenu');
	startMenu.style.visibility = "visible";
	startMenu.className = "animated fadeIn";
	p1Wins = 0;
	p2Wins = 0;
	ties = 0;
}




// Main function that takes a value depending on which button is clicked and assigns it to
// 		to the 'number' variable
function userChoice(number){
	// Sets the variable 'square' to the current 'number'
	function sqValues(){
		square = document.getElementById('sq' + number.toString());
	};

	// Have to call the function so you can use that variable elsewhere
	sqValues();

	function winConditions(){
		// Checks all the win conditions for Players
		// Finds if the index number of the given value is greater than or equal to 0. Which
		// 		means that is in the array. (If the value was not in the array it would return -1).
		for(a = 0; a < 2; ++a){
			if(((playerChoices[a].indexOf(1) >= 0) && (playerChoices[a].indexOf(2) >= 0) && (playerChoices[a].indexOf(3) >= 0)) ||
				((playerChoices[a].indexOf(4) >= 0) && (playerChoices[a].indexOf(5) >= 0) && (playerChoices[a].indexOf(6) >= 0)) ||
				((playerChoices[a].indexOf(7) >= 0) && (playerChoices[a].indexOf(8) >= 0) && (playerChoices[a].indexOf(9) >= 0)) ||
				((playerChoices[a].indexOf(2) >= 0) && (playerChoices[a].indexOf(5) >= 0) && (playerChoices[a].indexOf(8) >= 0)) ||
				((playerChoices[a].indexOf(3) >= 0) && (playerChoices[a].indexOf(6) >= 0) && (playerChoices[a].indexOf(9) >= 0)) ||
				((playerChoices[a].indexOf(1) >= 0) && (playerChoices[a].indexOf(4) >= 0) && (playerChoices[a].indexOf(7) >= 0)) ||
				((playerChoices[a].indexOf(1) >= 0) && (playerChoices[a].indexOf(5) >= 0) && (playerChoices[a].indexOf(9) >= 0)) ||
				((playerChoices[a].indexOf(3) >= 0) && (playerChoices[a].indexOf(5) >= 0) && (playerChoices[a].indexOf(7) >= 0))){
					// If any of the combinations are true changes the player to 0 so no more squares
					// 		can be changed. Then prints the winner message.
					player = 0;
					if(a == 0){
						endGame("p1Won");
						p1Wins++;
						createStatsBoard();
					}
					else if(a == 1){
						endGame("p2Won");
						p2Wins++;
						createStatsBoard();
					}
					console.log(a);
			}
			// Checks to see if the counter has reached 10 meaning the board is filled up and the game
			// 		is a tie.
			else if(a == 0){
				if(((playerChoices[0].length + playerChoices[1].length) == 9)){
					player = 0;
					endGame("tied");
					ties++;
					createStatsBoard();
				}
			}
		}
	};

	// Checks whether the turn is equal to 0 (Player 1)
	if(player == 1){
		// Checks the see which value the 'number' variable is and that that square is blank
		for(i = 1; i <= 9; ++i){
			if((number == i) && (square.innerHTML !== "X") && (square.innerHTML !== "O")){
				// If those conditions are true then it sets the value of that square to the desired
				// 		value and styling. Then pushes that 'number' into that players array. Adds one to
				// 		the 'turn' counter variable. Then switches the 'turn' variable to 1 (Player 2).
				square.innerHTML = "X";
				square.style.opacity = "1";
				square.style.color = "#854442";
				playerChoices[0].push(number);
				turn++;
				player = 2;
			}
		}
		winConditions();
	}
	else if(player == 2){
		for(x = 1; x <= 9; ++x){
			if((number == x) && (square.innerHTML !== "X") && (square.innerHTML !== "O")){
				square.innerHTML = "O";
				square.style.opacity = "1";
				square.style.color = "#be9b7b";
				playerChoices[1].push(number);
				turn++;
				player = 1;
			}
		}
		winConditions();
	}
}