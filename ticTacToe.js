var app = angular.module('ticTacToeApp', ['firebase']);


app.controller('ticTacToeCtrl', function($scope, $firebase){
	// var boardRef = new Firebase('https://samstictactoe.firebaseio.com/board');
 //  var boardSync = $firebase(boardRef);
 //  // download the data into a local object
 //  $scope.board = boardSync.$asArray();

 //  $scope.board.$loaded(function(){
	// 	if($scope.board.length == 0){ //if board doesn't exist in current instance, generates it
	// 		for(var i = 0; i < 9; i++){
	// 			$scope.board.$add({playerMove: ""});
	// 		}
	// 	}
	// 	else{							//if board exists, clears out all x's
	// 		for(var i = 0; i < 9; i++){
	// 			$scope.board[i].playerMove = "";
	// 			$scope.board.$save(i);
	// 		}
	// 	}
	// });

	$scope.board = [["", "", ""], ["", "", ""], ["", "", ""]];
	$scope.lines = ["", "", "", ""];
	$scope.turnNum = 0;
	$scope.winMessage = "";

	function displayWinner(player){
		if(player == "X"){
			$scope.winMessage = "Player 1 Wins";
			$scope.turnNum = -1;
		}
		else if(player == "O"){
			$scope.winMessage = "Player 2 Wins";
			$scope.turnNum = -1;
		}
	};
	function winConditions(player){
		for(var i = 0; i < 3; i++){
			if($scope.board[i][0] == $scope.board[i][1] && $scope.board[i][0] == $scope.board[i][2] && $scope.board[i][0] != ""){
				displayWinner(player);
			}
			else if($scope.board[0][i] == $scope.board[1][i] && $scope.board[0][i] == $scope.board[2][i] && $scope.board[0][i] != ""){
				displayWinner(player);
			}
		}
		if($scope.board[0][0] == $scope.board[1][1] && $scope.board[0][0] == $scope.board[2][2] && $scope.board[0][0] != ""){
			displayWinner(player);
		}
		else if($scope.board[0][2] == $scope.board[1][1] && $scope.board[0][2] == $scope.board[2][0] && $scope.board[0][2] != ""){
			displayWinner(player);
		}
		else if($scope.turnNum == 9){
			$scope.winMessage = ("Tie Game");
			$scope.turnNum = -1;
		}
	};
	$scope.makeMove = function(row, col){
		if(($scope.board[row][col] == "") && ($scope.turnNum >= 0)){
			// give the var 'symbol' the value of X or O depending on whether the turn is even or odd
			var symbol = ($scope.turnNum % 2) == 0 ? "X" : "O";
			$scope.board[row][col] = symbol;
			$scope.turnNum++;
			winConditions(symbol);
		}
	};
});