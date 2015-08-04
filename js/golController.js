angular.module('golApp', ['golProvider'])
	.controller('GameOfLifeCntl', function(golFactory, $scope, $log, $timeout) {
	
	$scope.history = [];
	$scope.board = golFactory.board;
	$scope.height = golFactory.getNumOfRows();
    	$scope.width = golFactory.getNumOfCols();
    	$scope.newGame = function() {
        	$scope.history = [];
        	golFactory.newBoard($scope.height, $scope.width);
		$scope.board = golFactory.board;
    	};
    
    	$scope.next = function() {
        	$scope.history.push($scope.board);
        	$scope.board = golFactory.nextGen($scope.board);
    	};
	
	// State of 'auto-step' mode
    $scope.started = false;

    // One step
    var autoStep = function () {
        if($scope.started) {
            $scope.next();
        }
        $timeout(autoStep, 400);
    };
    autoStep();

    // start 'auto-step' mode
    $scope.autoplay = function() {
        $scope.started = true;
    };

    // stop 'auto-step' mode
    $scope.stop = function() {
        $scope.started = false;
    };
	
    $scope.step = function (index) {
        $scope.board = $scope.history[index];
        $scope.history = $scope.history.slice(0, index);
    };
})
