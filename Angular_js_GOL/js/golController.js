/*
 * Author : Deepika Malik
 * Date : 08/04/2015 
 * 
 * Module 'golApp' makes controller 'GameOfLifeCntl' available to html page.
 *
 */

angular.module('golApp', ['golProvider'])
	.controller('GameOfLifeCntl', function(golBoardFactory, $scope, $log, $timeout) {
	
	$scope.history = [];
	$scope.board = golBoardFactory.board;
	$scope.height = golBoardFactory.getNumOfRows();
	$scope.width = golBoardFactory.getNumOfCols();

    $scope.newGame = function() {
        $scope.history = [];
        golBoardFactory.newBoard($scope.height, $scope.width);
		$scope.board = golBoardFactory.board;
    };
    
    $scope.next = function() {
        $scope.history.push($scope.board);
        $scope.board = golBoardFactory.nextGen($scope.board);
    };
	
	// State of 'Autoplay' mode
    $scope.started = false;

    // 'Autoplay' step by step
    var autoStep = function () {
        if($scope.started) {
            $scope.next();
        }
        $timeout(autoStep, 400);
    };
    autoStep();

	// start 'Autoplay' mode
    $scope.autoplay = function() {
        $scope.started = true;
    };

	// stop 'Autoplay' mode
    $scope.stop = function() {
        $scope.started = false;
    };
	
    // Goto a specific step in history
    $scope.step = function (index) {
        $scope.board = $scope.history[index];
        $scope.history = $scope.history.slice(0, index);
    };
})
