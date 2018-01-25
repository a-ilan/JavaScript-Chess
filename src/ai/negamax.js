const constants = require('./constants');

function move(game,depth,max_time,depth2,time2){
	//opening
	let move = get_opening_move(game);
	if(move){
		game.move(move);
		return;
	}
	
	//minimax, alpha-beta prunning, negamax
	const time_limit = (new Date).getTime() + max_time;
	best_move(game, (game)=> negamax(game,constants.MIN,constants.MAX,depth,time_limit,depth2,time2));
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

function best_move(game,evaluate_func){
	const moves = game.moves({verbose:true});
	order_moves(moves);
	let best_score = constants.MIN-1;
	let best_move = null;
	let turn = game.turn();
	
	for(let move of moves){
		game.move({from: move.from, to: move.to, promotion: move.promotion});
		let score = -evaluate_func(game);
		game.undo();
		
		if(score > best_score){
			best_score = score;
			best_move = move;
		}
	}
	
	game.move(best_move);
}

function negamax(game,alpha,beta,depth,time,depth2,time2){
	if(game.game_over()) return eval_gameover(game,depth);
	if(time < (new Date).getTime()) return quiesce(game,alpha,beta,depth2,time+time2);
	if ( depth == 0 ) return quiesce(game,alpha,beta,depth2,time+time2); //evaluate(game);
	
	let best_score = constants.MIN;
	const moves = game.moves({verbose: true});
	order_moves(moves);
	for(let move of moves){
		if(game.move({from: move.from, to: move.to, promotion: move.promotion}) == null) continue;
		const score = -negamax(game,-beta,-alpha,depth - 1,time,depth2,time2);
		game.undo();
		if(score >= beta) return score;
		if(score > best_score){
			best_score = score;
			if(score > alpha) alpha = score;
		}
	}
	return alpha;
}

function order_moves(moves){
	for(let i = 0; i < moves.length; i++){
		let type = moves[i].flags;
		let move_ordering = constants.move_ordering_score[type];
		switch(type){
		case 'b':
		case 'e':
		case 'k':
		case 'q':
			moves[i].score = move_ordering;
			break;
		case 'n':
			moves[i].score = move_ordering[moves[i].piece];
			break;
		case 'p':
			moves[i].score = move_ordering[moves[i].promotion];
			break;
		case 'c':
			moves[i].score = move_ordering[moves[i].piece][moves[i].captured];
			break;
		}
	}
	moves.sort(function(a,b){
		return b.score - a.score;
	});
}

function get_moves(game,amount){
	const moves = game.moves({legal:false});
}

//Quiescence Search
function quiesce(game,alpha,beta,depth,time){
	let stand_pat = evaluate(game);
	if(stand_pat >= beta) return beta;
	if(alpha < stand_pat) alpha = stand_pat;
	if(time < (new Date).getTime()) return stand_pat;
	if(depth == 0) return stand_pat;
	
	const moves = game.moves({ verbose: true }); //legal:false
	order_moves(moves);
	for(let move of moves){
		if(move.captured != undefined){ //if move is a capture
			if(game.move({from: move.from, to: move.to, promotion: move.promotion}) == null) continue;
			const score = -quiesce(game,-beta,-alpha,depth-1,time);
			game.undo();
			
			if( score >= beta ) return beta;
			if( score > alpha ) alpha = score;
		}
	}
	return alpha;
}

function eval_gameover(game,depth){
	if(game.in_checkmate()){
		return constants.MIN-depth; //if in checkmate
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
	
	//score relative to who's turn it is
	if(game.turn() == 'b') return -score;
	return score;
}