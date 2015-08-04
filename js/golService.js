angular.module('golProvider', [])
	.factory('golFactory', function($log){
	
	function isOutOfBoundary(board, row, col){
		return row < 0 || row >= board.length || col < 0  || col >= board[row].length;
	};
	
	function createNewCell(board, row, col,isLive){
		return{
			'board': board,
			'isLive': isLive,
			'row': row,
			'col': col,
			'cssClass': isLive ? 'on' : 'off',
			'toggle': function(){
				this.isLive ? this.isLive = false : this.isLive =true;
				this.cssClass == 'on' ? this.cssClass = 'off' : this.cssClass = 'on';
				
			},
			'getNeighbours': function(){
				var n = 0;
				for(var r = row-1; r <= row+1; r++){
					for(var c = col-1; c <= col+1; c++){
						if(r==row && c==col){
							continue;
						}
						n += !isOutOfBoundary(this.board, r, c) && this.board[r][c].isLive ? 1 : 0;
					}
				}
				return n;
			}
		}
	};
	
	function createNewBoard (height, width){
		var board = [];
		for (var h = 0 ; h < height ; h++) {
			var row = [];
			for (var w = 0 ; w < width ; w++) {
				row.push(createNewCell(board, h, w, false));
			}
			board.push(row); 
		}
		return board;
	};

	function underPopulation(cell){
		return cell.isLive && cell.getNeighbours() < 2;
	}

	function overPopulation(cell){
		return cell.isLive && cell.getNeighbours() > 3;
	}

	function reproduction(cell){
		return !cell.isLive && cell.getNeighbours() == 3;
	}		

	function applyRules(cell){
	
		var isAlive = cell.isLive;
		if(underPopulation(cell) || overPopulation(cell) || reproduction(cell)){
			return !isAlive;
		}
		return isAlive;
	};

	return {
		'board': createNewBoard(10, 20),
		'getNumOfRows': function (board){
			return this.board.length;
		},
		'getNumOfCols': function(board){
			return this.board.length > 0 ? this.board[0].length : 0;
		},
		'newBoard': function (height, width){
			this.board = createNewBoard(height,width);
		},
		'nextGen': function(board){
			var nextGen = [];
			for (var r = 0 ; r < board.length ; r++) {
				    var newRow = [];
				for (var c = 0 ; c < board[r].length ; c++) {
					newRow.push(createNewCell(nextGen, r, c, applyRules(board[r][c])));
				}
				nextGen.push(newRow); 
			}
			return nextGen;
		}
	};
});
