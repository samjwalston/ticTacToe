// Variables
var counter = 1;	// Move Counter
var turn = 0;	// Turn variable (0 equals player one and 1 equals player 2)
var p1Arr = [];
var p2Arr = [];

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

// Resets the board
function reset(){
	counter = 0;
	turn = 0;
	p1Arr = [];
	p2Arr = [];
	for(z = 1; z <= 9; ++z){
		resetColor = document.getElementById('sq' + z.toString());
		resetColor.style.color = "#be9b7b";
	}
	for(y = 1; y <= 9; ++y){
		resetValue = document.getElementById('sq' + y.toString());
		resetValue.value = "   ";
	}
  endGame("clear");
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
		if(((p1Arr.indexOf(1) >= 0) && (p1Arr.indexOf(2) >= 0) && (p1Arr.indexOf(3) >= 0)) ||
			((p1Arr.indexOf(4) >= 0) && (p1Arr.indexOf(5) >= 0) && (p1Arr.indexOf(6) >= 0)) ||
			((p1Arr.indexOf(7) >= 0) && (p1Arr.indexOf(8) >= 0) && (p1Arr.indexOf(9) >= 0)) ||
			((p1Arr.indexOf(2) >= 0) && (p1Arr.indexOf(5) >= 0) && (p1Arr.indexOf(8) >= 0)) ||
			((p1Arr.indexOf(3) >= 0) && (p1Arr.indexOf(6) >= 0) && (p1Arr.indexOf(9) >= 0)) ||
			((p1Arr.indexOf(1) >= 0) && (p1Arr.indexOf(4) >= 0) && (p1Arr.indexOf(7) >= 0)) ||
			((p1Arr.indexOf(1) >= 0) && (p1Arr.indexOf(5) >= 0) && (p1Arr.indexOf(9) >= 0)) ||
			((p1Arr.indexOf(3) >= 0) && (p1Arr.indexOf(5) >= 0) && (p1Arr.indexOf(7) >= 0))){
				// If any of the combinations is true changes the turn number to 2 so no more squares
				// 		can be changed. Then prints the winner message.
				turn = 2;
				endGame("p1Won");
		}
		else if(((p2Arr.indexOf(1) >= 0) && (p2Arr.indexOf(2) >= 0) && (p2Arr.indexOf(3) >= 0)) ||
			((p2Arr.indexOf(4) >= 0) && (p2Arr.indexOf(5) >= 0) && (p2Arr.indexOf(6) >= 0)) ||
			((p2Arr.indexOf(7) >= 0) && (p2Arr.indexOf(8) >= 0) && (p2Arr.indexOf(9) >= 0)) ||
			((p2Arr.indexOf(2) >= 0) && (p2Arr.indexOf(5) >= 0) && (p2Arr.indexOf(8) >= 0)) ||
			((p2Arr.indexOf(3) >= 0) && (p2Arr.indexOf(6) >= 0) && (p2Arr.indexOf(9) >= 0)) ||
			((p2Arr.indexOf(1) >= 0) && (p2Arr.indexOf(4) >= 0) && (p2Arr.indexOf(7) >= 0)) ||
			((p2Arr.indexOf(1) >= 0) && (p2Arr.indexOf(5) >= 0) && (p2Arr.indexOf(9) >= 0)) ||
			((p2Arr.indexOf(3) >= 0) && (p2Arr.indexOf(5) >= 0) && (p2Arr.indexOf(7) >= 0))){
				turn = 2;
				endGame("p2Won");
		}
		// Checks to see if the counter has reached 10 meaning the board is filled up and the game
		// 		is a tie.
		else if(counter == 10){
			endGame("tied");
		}
	}

	// Checks whether the turn is equal to 0 (Player 1)
	if(turn == 0){
		// Checks the see which value the 'number' variable is and that that square is blank
		for(i = 1; i <= 9; ++i){
			if((number == i) && (square.value == "   ")){
				// If those conditions are true then it sets the value of that square to the desired
				// 		value and styling. Then pushes that 'number' into that players array. Adds one to
				// 		the move 'counter' variable. Then switches the 'turn' variable to 1 (Player 2).
				square.value = " X ";
				square.style.color = "#854442";
				p1Arr.push(number);
				counter++;
				turn = 1;
			}
		}
		winConditions();
	}
	else if(turn == 1){
		for(x = 1; x <= 9; ++x){
			if((number == x) && (square.value == "   ")){
				square.value = " O ";
				p2Arr.push(number);
				counter++;
				turn = 0;
			}
		}
		winConditions();
	}
}