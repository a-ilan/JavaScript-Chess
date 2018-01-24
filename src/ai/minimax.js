const constants = require('./constants');

function move(game,depth){
	let move = get_opening_move(game);
	if(move){
		game.move(move);
		return;
	}
	
	//random_move(game);
	//best_move(game,(game) => Math.random()*100);
	//best_move(game, evaluate);
	//best_move(game, (game)=> minimax(game,depth));
	best_move(game, (game)=> alphaBeta(game,constants.MIN,constants.MAX,depth));
}
module.exports = move;


function get_opening_move(game){
	let history = game.history();
	if(history.length > 4) return null;
	let opening_move = constants.openings;
	for(let move of history){
		opening_move = opening_move[move];
		if(opening_move == undefined) return null;
	}
	return opening_move.value;
}

function alphaBeta(game, alpha, beta, depth ) {
	if(game.game_over()) return eval_gameover(game);
	if ( depth == 0 ) return evaluate(game);
	const moves = game.moves();
	if(game.turn() === 'w') { // max
		for (let move of moves) {
			game.move(move);
			const score = alphaBeta(game, alpha, beta, depth - 1 );
			game.undo();
			if( score >= beta ) return beta; // fail hard beta-cutoff
			if( score > alpha ) alpha = score; // alpha acts like max in MiniMax
		}
		return alpha;
	} else { //min
		for (let move of moves) {
			game.move(move);
			score = alphaBeta(game, alpha, beta, depth - 1 );
			game.undo();
			if( score <= alpha ) return alpha; // fail hard alpha-cutoff
			if( score < beta ) beta = score; // beta acts like min in MiniMax
		}
		return beta;
	}
}

function minimax(game, depth) {
	if (depth === 0) return evaluate(game);
	const moves = game.moves();
	if (game.turn() === 'w') { //max
		let bestMove = constants.MIN;
		for (let move of moves) {
			game.move(move);
			bestMove = Math.max(bestMove, minimax(game, depth - 1));
			game.undo();
		}
		return bestMove;
	} else { // min
		var bestMove = constants.MAX;
		for (let move of moves) {
			game.move(move);
			bestMove = Math.min(bestMove, minimax(game, depth - 1));
			game.undo();
		}
		return bestMove;
	}
}

function best_move(game,evaluate_func){
	const moves = game.moves();
	let best_score = constants.MIN-1;
	let best_move = null;
	let turn = game.turn();
	
	for(let move of moves){
		game.move(move);
		let score;
		if(turn == 'w')
			score = evaluate_func(game);
		else
			score = -evaluate_func(game);
		game.undo();
		
		if(score > best_score){
			best_score = score;
			best_move = move;
		}
	}
	
	game.move(best_move);
}

function eval_gameover(game){
	if(game.in_checkmate()){
		if(game.turn() === 'w') return constants.MIN; // if white in checkmate
		else return constants.MAX; //if black in checkmate
	} else { //game in a draw
		return -evaluate(game); //if winning, then draw is bad
	}
}

function evaluate(game){
	//material score
	let score = 0;
	for(let sq of game.SQUARES){
		const piece = game.get(sq);
		if(piece){
			if(piece.color == 'w')
				score += constants.material_score[piece.type];
			else
				score -= constants.material_score[piece.type];
		}
	}
	
	//piece position score
	for(let sq of game.SQUARES){
		const piece = game.get(sq);
		if(piece){
			let file = sq[0].charCodeAt(0)-'a'.charCodeAt(0);
			let rank = 8-sq[1];
			if(piece.color == 'w'){
				score += constants.position_score_table[piece.type][rank][file];
			} else {
				rank = 7 - rank;
				score -= constants.position_score_table[piece.type][rank][file];
			}
		}
	}
	
	return score;
}

function random_move(game){
	const moves = game.moves();
	const move = moves[Math.floor(moves.length*Math.random())];
	game.move(move);
}