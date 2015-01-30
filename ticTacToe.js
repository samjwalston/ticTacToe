var app = angular.module('ticTacToeApp', ['firebase']);


app.controller('ticTacToeCtrl', function($scope, $firebase){
	// firebase board stuff
	var boardRef = new Firebase('https://samstictactoe.firebaseio.com/board');
  var boardSync = $firebase(boardRef);
  $scope.square = boardSync.$asArray();

  // firebase turnNum stuff
  var countRef = new Firebase('https://samstictactoe.firebaseio.com/counter');
  var countSync = $firebase(countRef);
  $scope.counter = countSync.$asArray();

  // firebase winMessage stuff
  var winRef = new Firebase('https://samstictactoe.firebaseio.com/winMessage');
  var winSync = $firebase(winRef);
  $scope.winMessage = winSync.$asArray();

  var playerRef = new Firebase('https://samstictactoe.firebaseio.com/players');
  var playerSync = $firebase(playerRef);
  $scope.players = playerSync.$asArray();

  // Credits to Wendy for help with the firebase functionality
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
	$scope.winMessage.$loaded(function(){
		if($scope.winMessage.length == 0){
			$scope.winMessage.$add({message: ""});
		}
		else{
			$scope.winMessage[0].message = "";
			$scope.winMessage.$save(0);
		}
	});
	$scope.players.$loaded(function(){
		if($scope.players.length == 0){
			$scope.players.$add({playerOne: false, playerTwo: true});
		}
		else{
			$scope.players[0].playerOne = false;
			$scope.players[0].playerTwo = true;
			$scope.players.$save(0);
		}
	})
	$scope.lines = ["", "", "", ""];

	function displayWinner(player){
		if(player == "X"){
			$scope.winMessage[0].message = "Player 1 Wins";
			$scope.winMessage.$save(0);
		}
		else if(player == "O"){
			$scope.winMessage[0].message = "Player 2 Wins";
		}
		$scope.winMessage.$save(0);
		$scope.counter[0].turn = -2;
		$scope.counter.$save(0);
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
		}
	};
	$scope.makeMove = function(index){
		if(($scope.square[0].playerMove == "") && ($scope.square[1].playerMove == "") && ($scope.square[2].playerMove == "") &&
			($scope.square[3].playerMove == "") && ($scope.square[4].playerMove == "") && ($scope.square[5].playerMove == "") &&
			($scope.square[6].playerMove == "") && ($scope.square[7].playerMove == "") && ($scope.square[8].playerMove == "")){
			$scope.players[0].playerOne = true;
			$scope.players[0].playerTwo = false;
		}
		console.log($scope.players[0].playerOne);
		console.log($scope.players[0].playerTwo);
		if(($scope.square[index].playerMove == "") && ($scope.counter[0].turn >= 0)){
			if((($scope.counter[0].turn % 2) == 0) && ($scope.players[0].playerOne == true)){
				var symbol = "X";
				$scope.square[index].playerMove = symbol;
				$scope.square.$save($scope.square[index]);
				$scope.counter[0].turn++;
				$scope.counter.$save(0);
			}
			else if((($scope.counter[0].turn % 2) == 1) && ($scope.players[0].playerTwo == true)){
				var symbol = "O";
				$scope.square[index].playerMove = symbol;
				$scope.square.$save($scope.square[index]);
				$scope.counter[0].turn++;
				$scope.counter.$save(0);
			}
			winConditions(symbol);
		}
	};
});