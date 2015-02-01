var app = angular.module('ticTacToeApp', ['firebase']);

app.controller('ticTacToeCtrl', function($scope, $firebase){
	// firebase board stuff
	var boardRef = new Firebase('https://samstictactoe.firebaseio.com/board');
  var boardSync = $firebase(boardRef);
  $scope.square = boardSync.$asArray();

  $scope.square.$loaded(function(){
		if($scope.square.length == 0){
			for(var i = 0; i < 9; i++){
				$scope.square.$add({playerMove: ""});
			}
		}
		else{
			for(var i = 0; i < 9; i++){
				$scope.square[i].playerMove = "";
				$scope.square.$save(i);
			}
		}
	});


  // firebase turnNum stuff
  var countRef = new Firebase('https://samstictactoe.firebaseio.com/counter');
  var countSync = $firebase(countRef);
  $scope.counter = countSync.$asArray();

  $scope.counter.$loaded(function(){
		if($scope.counter.length == 0){
			$scope.counter.$add({turn: 0});
		}
		else if($scope.counter[0].turn < 0){
			$scope.counter[0].turn = 0;
			$scope.counter.$save(0);
		}
		else{
			$scope.counter[0].turn = 0;
			$scope.counter.$save(0);
		}
	});


  // firebase winMessage stuff
  var winRef = new Firebase('https://samstictactoe.firebaseio.com/winMessage');
  var winSync = $firebase(winRef);
  $scope.winMessage = winSync.$asArray();

  $scope.winMessage.$loaded(function(){
		if($scope.winMessage.length == 0){
			$scope.winMessage.$add({message: "Waiting on first move"});
		}
		else{
			$scope.winMessage[0].message = "Waiting on first move";
			$scope.winMessage.$save(0);
		}
	});

  // fire base player stuff
  var playerRef = new Firebase('https://samstictactoe.firebaseio.com/players');
  var playerSync = $firebase(playerRef);
  $scope.players = playerSync.$asArray();

	$scope.players.$loaded(function(){
		if($scope.players.length == 0){
			$scope.players.$add({playerOne: false, playerTwo: false, playerOneChosen: false, playerTwoChosen: false});
		}
		else{
			$scope.players[0].playerOne = false;
			$scope.players[0].playerTwo = false;
			$scope.players[0].playerOneChosen = false;
			$scope.players[0].playerTwoChosen = false;
			$scope.players.$save(0);
		}
	});

	var statsRef = new Firebase('https://samstictactoe.firebaseio.com/stats');
  var statsSync = $firebase(statsRef);
  $scope.stats = statsSync.$asArray();

  $scope.stats.$loaded(function(){
  	if($scope.stats.length == 0){
			$scope.stats.$add({totalGames: "Total Games: 0", p1Wins: "Wins: 0 (0.0%)", p1Losses: "Losses: 0 (0.0%)", p2Wins: "Wins: 0 (0.0%)", p2Losses: "Losses: 0 (0.0%)", ties: "Ties: 0 (0.0%)"});
		}
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

  var chatRef = new Firebase('https://samstictactoe.firebaseio.com/chat');
  var chatSync = $firebase(chatRef);
  $scope.chat = chatSync.$asArray();

  $scope.chatBox = function(){
    $scope.chat.$add({text: $scope.chatBoxInput});
    $scope.chatBoxInput = "";
  };


	var totalGames = 0;
	var p1Wins = 0;
	var p2Wins = 0;
	var ties = 0;


	$scope.makeMove = function(index){
		if($scope.counter[0].turn == 0){
			$scope.players[0].playerOne = true;
		}
		else if(($scope.counter[0].turn == 1) && ($scope.players[0].playerOne !== true)){
			$scope.players[0].playerTwo = true;
		}
		if(($scope.square[index].playerMove !== "X") && ($scope.square[index].playerMove !== "O") && ($scope.counter[0].turn >= 0)){
			if((($scope.counter[0].turn % 2) == 0) && ($scope.players[0].playerOne == true)){
				var symbol = "X";
				$scope.square[index].playerMove = symbol;
				$scope.square.$save($scope.square[index]);
				$scope.counter[0].turn++;
				$scope.counter.$save(0);
				$scope.winMessage[0].message = "Player Two\'s Turn";
				$scope.winMessage.$save(0);
				document.getElementById("sq" + index).className = "square chosen";
			}
			else if((($scope.counter[0].turn % 2) == 1) && ($scope.players[0].playerTwo == true)){
				var symbol = "O";
				$scope.square[index].playerMove = symbol;
				$scope.square.$save($scope.square[index]);
				$scope.counter[0].turn++;
				$scope.counter.$save(0);
				$scope.winMessage[0].message = "Player One\'s Turn";
				$scope.winMessage.$save(0);
				document.getElementById("sq" + index).className = "square chosen";
			}
			if($scope.counter[0].turn >= 5){
				winConditions(symbol);
			}
		}
	};


	function winConditions(player){
		if((($scope.square[0].playerMove == $scope.square[1].playerMove) && ($scope.square[0].playerMove == $scope.square[2].playerMove) && ($scope.square[0].playerMove !== "")) ||
			(($scope.square[3].playerMove == $scope.square[4].playerMove) && ($scope.square[3].playerMove == $scope.square[5].playerMove) && ($scope.square[3].playerMove !== "")) ||
			(($scope.square[6].playerMove == $scope.square[7].playerMove) && ($scope.square[6].playerMove == $scope.square[8].playerMove) && ($scope.square[6].playerMove !== "")) ||
			(($scope.square[0].playerMove == $scope.square[3].playerMove) && ($scope.square[0].playerMove == $scope.square[6].playerMove) && ($scope.square[0].playerMove !== "")) ||
			(($scope.square[1].playerMove == $scope.square[4].playerMove) && ($scope.square[1].playerMove == $scope.square[7].playerMove) && ($scope.square[1].playerMove !== "")) ||
			(($scope.square[2].playerMove == $scope.square[5].playerMove) && ($scope.square[2].playerMove == $scope.square[8].playerMove) && ($scope.square[2].playerMove !== "")) ||
			(($scope.square[0].playerMove == $scope.square[4].playerMove) && ($scope.square[0].playerMove == $scope.square[8].playerMove) && ($scope.square[0].playerMove !== "")) ||
			(($scope.square[2].playerMove == $scope.square[4].playerMove) && ($scope.square[2].playerMove == $scope.square[6].playerMove) && ($scope.square[2].playerMove !== ""))){
				displayWinner(player);
		}
		else if($scope.counter[0].turn == 9){
			$scope.winMessage[0].message = "Tie Game";
			$scope.winMessage.$save(0);
			$scope.counter[0].turn = -2;
			$scope.counter.$save(0);
			ties++;
			statsBoard();
		}
	};


	function displayWinner(player){
		if(player == "X"){
			$scope.winMessage[0].message = "Player One Wins";
			p1Wins++;
			statsBoard();
		}
		else if(player == "O"){
			$scope.winMessage[0].message = "Player Two Wins";
			p2Wins++;
			statsBoard();
		}
		$scope.winMessage.$save(0);
		$scope.counter[0].turn = -2;
		$scope.counter.$save(0);
	};

	$scope.mouseEnter = function(index){
		if(($scope.square[index].playerMove !== "X") && ($scope.square[index].playerMove !== "O") && ($scope.counter[0].turn >= 0)){
			if((($scope.counter[0].turn % 2) == 1) && ($scope.players[0].playerTwo == true)){
				document.getElementById("sq" + index).className = " square hover";
				$scope.square[index].playerMove = " O ";
			}
			else if((($scope.counter[0].turn % 2) == 0) && ($scope.players[0].playerOne == true)){
				document.getElementById("sq" + index).className = "square hover";
				$scope.square[index].playerMove = " X ";
			}
			else if($scope.counter[0].turn == 1){
				document.getElementById("sq" + index).className = "square hover";
				$scope.square[index].playerMove = " O ";
			}
			else if($scope.counter[0].turn == 0){
				document.getElementById("sq" + index).className = "square hover";
				$scope.square[index].playerMove = " X ";
			}
		}
	};
	$scope.mouseLeave = function(index){
		if(($scope.square[index].playerMove !== "X") && ($scope.square[index].playerMove !== "O")){
			document.getElementById("sq" + index).className = "square";
			$scope.square[index].playerMove = "";
		}
	};

	function statsBoard(){
		document.getElementById('gameStats').className = "animated fadeIn";
		totalGames = (p1Wins + p2Wins + ties);
		printTotalGames = "Total Games: " + totalGames;
		printP1Wins = "Wins: " + p1Wins + " (" + ((p1Wins / totalGames) * 100).toFixed(1) + "%)";
		printP1Losses = "Losses: " + p2Wins + " (" + ((p2Wins / totalGames) * 100).toFixed(1) + "%)";
		printP2Wins = "Wins: " + p2Wins + " (" + ((p2Wins / totalGames) * 100).toFixed(1) + "%)";
		printP2Losses = "Losses: " + p1Wins + " (" + ((p1Wins / totalGames) * 100).toFixed(1) + "%)";
		printTies = "Ties: " + ties + " (" + ((ties / totalGames) * 100).toFixed(1) + "%)";
		$scope.stats[0].totalGames = printTotalGames;
		$scope.stats[0].p1Wins = printP1Wins;
		$scope.stats[0].p1Losses = printP1Losses;
		$scope.stats[0].p2Wins = printP2Wins;
		$scope.stats[0].p2Losses = printP2Losses;
		$scope.stats[0].ties = printTies;
		$scope.stats.$save(0);
	}

	$scope.resetButton = function(){
		for(var i = 0; i < 9; i++){
			$scope.square[i].playerMove = "";
			$scope.square.$save(i);
		}
		$scope.counter[0].turn = 0;
		$scope.counter.$save(0);
		$scope.winMessage[0].message = "Waiting on first move";
		$scope.winMessage.$save(0);
		$scope.players[0].playerOne = false;
		$scope.players[0].playerTwo = true;
		$scope.players.$save(0);
	}

	$scope.restartButton = function(){
		$scope.resetButton();
		$scope.stats[0].totalGames = "Total Games: 0";
		$scope.stats[0].p1Wins = "Wins: 0 (0.0%)";
		$scope.stats[0].p1Losses = "Losses: 0 (0.0%)";
		$scope.stats[0].p2Wins = "Wins: 0 (0.0%)";
		$scope.stats[0].p2Losses = "Losses: 0 (0.0%)";
		$scope.stats[0].ties = "Ties: 0 (0.0%)";
		$scope.stats.$save(0);
	}

});