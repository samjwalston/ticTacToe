var app = angular.module('ticTacToeApp', ['firebase']);

app.controller('ticTacToeCtrl', function($scope, $firebase){
	// Firebase Board Creation
	var boardRef = new Firebase('https://samstictactoe.firebaseio.com/board');
  var boardSync = $firebase(boardRef);
  $scope.square = boardSync.$asArray();

  // On page load it runs the game board function
  $scope.square.$loaded(function(){
  	// If the game board has not been created then it adds it to the database
		if($scope.square.length == 0){
			for(var i = 0; i < 9; i++){
				$scope.square.$add({playerMove: ""});
			}
		}
		// Otherwise it sets all the values back to default
		else{
			for(var i = 0; i < 9; i++){
				$scope.square[i].playerMove = "";
				$scope.square.$save(i);
			}
		}
	});


  // Firebase Turn Counter Creation
  var countRef = new Firebase('https://samstictactoe.firebaseio.com/counter');
  var countSync = $firebase(countRef);
  $scope.counter = countSync.$asArray();

  // On page load it runs the turn counter function
  $scope.counter.$loaded(function(){
  	// If the turn counter has not been created then it adds it to the database
		if($scope.counter.length == 0){
			$scope.counter.$add({turn: 0});
		}
		// If the game has ended then the turn counter is set to a negative number. This sets a negative turn number back to
		// default value
		else if($scope.counter[0].turn < 0){
			$scope.counter[0].turn = 0;
			$scope.counter.$save(0);
		}
		// Otherwise turn counter is set back to default
		else{
			$scope.counter[0].turn = 0;
			$scope.counter.$save(0);
		}
	});


  // Firebase Game Message Creation
  var winRef = new Firebase('https://samstictactoe.firebaseio.com/winMessage');
  var winSync = $firebase(winRef);
  $scope.winMessage = winSync.$asArray();

  // On page load it runs the game message function
  $scope.winMessage.$loaded(function(){
  	// If the game message has not been created then it adds it to the database
		if($scope.winMessage.length == 0){
			$scope.winMessage.$add({message: "Waiting on first move"});
		}
		// Otherwise it sets the value back to default
		else{
			$scope.winMessage[0].message = "Waiting on first move";
			$scope.winMessage.$save(0);
		}
	});

  // Firebase Player Variable Creation
  var playerRef = new Firebase('https://samstictactoe.firebaseio.com/players');
  var playerSync = $firebase(playerRef);
  $scope.players = playerSync.$asArray();

  // On page load it creates the player function
	$scope.players.$loaded(function(){
		// If the player choices have not been created then it adds it to the database
		if($scope.players.length == 0){
			$scope.players.$add({playerOne: false, playerTwo: false, playerOneChosen: false, playerTwoChosen: false});
		}
		// Otherwise it sets it back to the default values
		else{
			$scope.players[0].playerOne = false;
			$scope.players[0].playerTwo = false;
			$scope.players[0].playerOneChosen = false;
			$scope.players[0].playerTwoChosen = false;
			$scope.players.$save(0);
		}
	});

	// Firebase Stats Box Creation
	var statsRef = new Firebase('https://samstictactoe.firebaseio.com/stats');
  var statsSync = $firebase(statsRef);
  $scope.stats = statsSync.$asArray();

  // On page loads it creates the stats box
  $scope.stats.$loaded(function(){
  	// If the stats box has not been created then it adds it to the database
  	if($scope.stats.length == 0){
			$scope.stats.$add({totalGames: "Total Games: 0", p1Wins: "Wins: 0 (0.0%)", p1Losses: "Losses: 0 (0.0%)", p2Wins: "Wins: 0 (0.0%)", p2Losses: "Losses: 0 (0.0%)", ties: "Ties: 0 (0.0%)"});
		}
		// Otherwise it sets it back to the default values
		else{
			$scope.stats[0].totalGames = "Total Games: 0";
			$scope.stats[0].p1Wins = "Wins: 0 (0.0%)";
			$scope.stats[0].p1Losses = "Losses: 0 (0.0%)";
			$scope.stats[0].p2Wins = "Wins: 0 (0.0%)";
			$scope.stats[0].p2Losses = "Losses: 0 (0.0%)";
			$scope.stats[0].ties = "Ties: 0 (0.0%)";
			$scope.stats.$save(0);
		}
  });

  // Firebase Chat Box Creation
  var chatRef = new Firebase('https://samstictactoe.firebaseio.com/chat');
  var chatSync = $firebase(chatRef);
  $scope.chat = chatSync.$asArray();

  // On page load creates the chat box
  $scope.chatBox = function(){
  	// Adds new messages into the chat box
    $scope.chat.$add({text: $scope.chatBoxInput});
    $scope.chatBoxInput = "";
  };

  // Variables used for stats box
	var totalGames = 0;
	var p1Wins = 0;
	var p2Wins = 0;
	var ties = 0;

	// Main function that is called on square click
	$scope.makeMove = function(index){
		// If it is the first move of the game then that player is assigned playerOne
		if($scope.counter[0].turn == 0){
			$scope.players[0].playerOne = true;
		}
		// Then on the second move that player is assigned playerTwo
		else if(($scope.counter[0].turn == 1) && ($scope.players[0].playerOne !== true)){
			$scope.players[0].playerTwo = true;
		}
		// Checks to make sure that the square clicked has not already been chosen and turn counter is greater than 0 (Used to
		// make sure that if a game ends before the board is filled that no more squares can be chosen)
		if(($scope.square[index].playerMove !== "X") && ($scope.square[index].playerMove !== "O") && ($scope.counter[0].turn >= 0)){
			// Next if it is an even turn and the player clicking the square is playerOne then it allows an 'X' to be placed
			if((($scope.counter[0].turn % 2) == 0) && ($scope.players[0].playerOne == true)){
				// Sets the clicked sqaures value to 'X', increases the turn counter, changes the game message & changes the font
				// color of the chosen square
				var symbol = "X";
				$scope.square[index].playerMove = symbol;
				$scope.counter[0].turn++;
				$scope.winMessage[0].message = "Player Two\'s Turn";
				document.getElementById("sq" + index).className = "square chosen";
			}
			// Otherwise if it is an odd turn and the player clicking the square is playerTwo it allows an 'O' to be placed
			else if((($scope.counter[0].turn % 2) == 1) && ($scope.players[0].playerTwo == true)){
				// Sets the clicked sqaures value to 'O', increases the turn counter, changes the game message & changes the font
				// color of the chosen square
				var symbol = "O";
				$scope.square[index].playerMove = symbol;
				$scope.counter[0].turn++;
				$scope.winMessage[0].message = "Player One\'s Turn";
				document.getElementById("sq" + index).className = "square chosen";
			}
			// Saves all the changed values back to the database
			$scope.square.$save($scope.square[index]);
			$scope.counter.$save(0);
			$scope.winMessage.$save(0);
			// Then if the turn is greater than or equal to five it calls the winConditions function
			if($scope.counter[0].turn >= 5){
				// This is why I assigned a var as 'X' or 'O' so I could pass it through to the next function
				winConditions(symbol);
			}
		}
	};

	// Checks to see if anyone has met the win conditions
	function winConditions(player){
		// Checks all the winning combinations to see if they've been met by checking to see if three in a row are the same value
		// and that they're not blank
		if((($scope.square[0].playerMove == $scope.square[1].playerMove) && ($scope.square[0].playerMove == $scope.square[2].playerMove) && ($scope.square[0].playerMove !== "")) ||
			(($scope.square[3].playerMove == $scope.square[4].playerMove) && ($scope.square[3].playerMove == $scope.square[5].playerMove) && ($scope.square[3].playerMove !== "")) ||
			(($scope.square[6].playerMove == $scope.square[7].playerMove) && ($scope.square[6].playerMove == $scope.square[8].playerMove) && ($scope.square[6].playerMove !== "")) ||
			(($scope.square[0].playerMove == $scope.square[3].playerMove) && ($scope.square[0].playerMove == $scope.square[6].playerMove) && ($scope.square[0].playerMove !== "")) ||
			(($scope.square[1].playerMove == $scope.square[4].playerMove) && ($scope.square[1].playerMove == $scope.square[7].playerMove) && ($scope.square[1].playerMove !== "")) ||
			(($scope.square[2].playerMove == $scope.square[5].playerMove) && ($scope.square[2].playerMove == $scope.square[8].playerMove) && ($scope.square[2].playerMove !== "")) ||
			(($scope.square[0].playerMove == $scope.square[4].playerMove) && ($scope.square[0].playerMove == $scope.square[8].playerMove) && ($scope.square[0].playerMove !== "")) ||
			(($scope.square[2].playerMove == $scope.square[4].playerMove) && ($scope.square[2].playerMove == $scope.square[6].playerMove) && ($scope.square[2].playerMove !== ""))){
				// If any of those conditions are met then the displayWinner function is called
				displayWinner(player);
		}
		// If there are no winning combinations then it checks to see if the turn counter has reached nine and the game is tied
		else if($scope.counter[0].turn == 9){
			// Sets the game message accordingly and sets the turn counter to a negative number and saves those values to the
			// database
			$scope.winMessage[0].message = "Tie Game";
			$scope.winMessage.$save(0);
			$scope.counter[0].turn = -2;
			$scope.counter.$save(0);
			// Increases the ties count and calls the statsBoard function
			ties++;
			statsBoard();
		}
	};

	// Modifies the game mesage depending on who won
	function displayWinner(player){
		// Checks to see what the player variable is
		if(player == "X"){
			// If it is 'X' then playerOne wins and increases p1Wins and calls the statsBoard
			$scope.winMessage[0].message = "Player One Wins";
			p1Wins++;
			statsBoard();
		}
		else if(player == "O"){
			// If it is 'O' then playerTwo wins and increases p2Wins and calls the statsBoard
			$scope.winMessage[0].message = "Player Two Wins";
			p2Wins++;
			statsBoard();
		}
		// Sets the turn counter to a negative number and saves all the changed values to the database
		$scope.counter[0].turn = -2;
		$scope.counter.$save(0);
		$scope.winMessage.$save(0);
	};

	// Controls the text in the stats box
	function statsBoard(){
		totalGames = (p1Wins + p2Wins + ties);
		$scope.stats[0].totalGames = "Total Games: " + totalGames;
		// Adds the win or loss value and then finds the percentage of that value by dividing it by the total number of games
		// and then multiplying it by 100 (the .toFixed part assigns decimal places depending on the number inputted)
		$scope.stats[0].p1Wins = "Wins: " + p1Wins + " (" + ((p1Wins / totalGames) * 100).toFixed(1) + "%)";
		$scope.stats[0].p1Losses = "Losses: " + p2Wins + " (" + ((p2Wins / totalGames) * 100).toFixed(1) + "%)";
		$scope.stats[0].p2Wins = "Wins: " + p2Wins + " (" + ((p2Wins / totalGames) * 100).toFixed(1) + "%)";
		$scope.stats[0].p2Losses = "Losses: " + p1Wins + " (" + ((p1Wins / totalGames) * 100).toFixed(1) + "%)";
		$scope.stats[0].ties = "Ties: " + ties + " (" + ((ties / totalGames) * 100).toFixed(1) + "%)";
		$scope.stats.$save(0);
	}

	// Wipes the game board
	$scope.resetButton = function(){
		// Sets all the squares back to the default value
		for(var i = 0; i < 9; i++){
			$scope.square[i].playerMove = "";
			$scope.square.$save(i);
		}
		// Sets the turn counter back to default
		$scope.counter[0].turn = 0;
		$scope.counter.$save(0);
		// Sets the game message back to default
		$scope.winMessage[0].message = "Waiting on first move";
		$scope.winMessage.$save(0);
		// Sets the player choices back to default
		$scope.players[0].playerOne = false;
		$scope.players[0].playerTwo = true;
		$scope.players.$save(0);
	}

	// Wipes the game board and the stats box
	$scope.restartButton = function(){
		// Sets the stats box back to default
		$scope.stats[0].totalGames = "Total Games: 0";
		$scope.stats[0].p1Wins = "Wins: 0 (0.0%)";
		$scope.stats[0].p1Losses = "Losses: 0 (0.0%)";
		$scope.stats[0].p2Wins = "Wins: 0 (0.0%)";
		$scope.stats[0].p2Losses = "Losses: 0 (0.0%)";
		$scope.stats[0].ties = "Ties: 0 (0.0%)";
		$scope.stats.$save(0);
		// Calls the resetButton function to wipe the other info
		$scope.resetButton();
	}

	// Handles the ghosting effect I have on hover
	$scope.mouseEnter = function(index){
		// Checks to see if the hovered square is not equal to 'X' or 'O' and the turn counter is is greater than or equal to
		// zero meaning the game is active
		if(($scope.square[index].playerMove !== "X") && ($scope.square[index].playerMove !== "O") && ($scope.counter[0].turn >= 0)){
			// Next it checks to see if the turn number is even or odd and that it is the correct player's turn
			if((($scope.counter[0].turn % 2) == 1) && ($scope.players[0].playerOne !== true)){
				// Then changes the class of the hovered square to apply the hover effect
				document.getElementById("sq" + index).className = " square hover";
				$scope.square[index].playerMove = " O ";
			}
			else if((($scope.counter[0].turn % 2) == 0) && ($scope.players[0].playerTwo !== true)){
				document.getElementById("sq" + index).className = "square hover";
				$scope.square[index].playerMove = " X ";
			}
			else if($scope.counter[0].turn == 0){
				document.getElementById("sq" + index).className = "square hover";
				$scope.square[index].playerMove = " X ";
			}
		}
	};
	// Resets the hover effect
	$scope.mouseLeave = function(index){
		// Checks to make sure the square that is hovered does not have an 'X' or 'O' and then sets it back to default
		if(($scope.square[index].playerMove !== "X") && ($scope.square[index].playerMove !== "O")){
			document.getElementById("sq" + index).className = "square";
			$scope.square[index].playerMove = "";
		}
	};

});