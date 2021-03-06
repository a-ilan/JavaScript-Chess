const constants = require('./constants');

let ai = {};
module.exports = ai;

function move(game,depth,depth2,max_time){
	//openings
	let position = game.fen();
	let opening_moves = constants.cahced_openings[position];
	if(opening_moves !== undefined){
		game.move(opening_moves[Math.floor(Math.random()*opening_moves.length)]);
		return;
	}
	
	//the cached scores
	let cached_scores = {};
	
	//minimax, alpha-beta prunning, negamax
	const time = (new Date).getTime() + max_time;
	let bestmove = best_move(game, time, (game)=> negamax(game,constants.MIN,constants.MAX,depth,depth2,cached_scores));
	game.move({from: bestmove.from, to: bestmove.to, promotion: bestmove.promotion});
}
ai.move = move;

function best_move(game, time, evaluate_func){
	const moves = game.moves({verbose:true});
	order_moves(moves);
	let best_score = constants.MIN-1;
	let best_moves = [];
	let turn = game.turn();
	
	let i = 0;
	for(i = 0; i < moves.length; i++){
		let move = moves[i];
		
		game.move({from: move.from, to: move.to, promotion: move.promotion});
		let score = -evaluate_func(game);
		game.undo();
		
		if(score > best_score){
			best_score = score;
			best_moves = [move];
		} else if(score === best_score){
			best_moves.push(move);
		}
		
		if(time < (new Date).getTime()) {
			break;
		}
	}
	
	console.log("ai: " + (i/moves.length*100) + "% " + i);
	return best_moves[Math.floor(Math.random()*best_moves.length)];
}

function negamax(game,alpha,beta,depth,depth2,cached_scores){
	if(game.game_over()) return eval_gameover(game,depth);
	if ( depth == 0 ) return quiesce(game,alpha,beta,depth2,cached_scores); //evaluate(game);
	
	let best_score = constants.MIN;
	const moves = game.moves({verbose: true});
	order_moves(moves);
	for(let move of moves){
		game.move({from: move.from, to: move.to, promotion: move.promotion});
		
		let position = game.fen();
		let score = cached_scores[position];
		if(score === undefined){
			score = -negamax(game,-beta,-alpha,depth-1,depth2,cached_scores);
			cached_scores[position] = score;
		}
		
		game.undo();
		if(score >= beta) {
			return score;
		}
		if(score > best_score){
			best_score = score;
			if(score > alpha) alpha = score;
		}
	}
	return alpha;
}

//Quiescence Search
function quiesce(game,alpha,beta,depth,cached_scores){
	let stand_pat = evaluate(game);
	if(stand_pat >= beta) return beta;
	if(alpha < stand_pat) alpha = stand_pat;
	if(depth == 0) return stand_pat;
	
	const moves = game.moves({ verbose: true }); //legal:false
	order_moves(moves);
	for(let move of moves){
		if(move.captured != undefined){ //if move is a capture
			game.move({from: move.from, to: move.to, promotion: move.promotion});
			
			let position = game.fen();
			let score = cached_scores[position];
			if(score === undefined){
				score = -quiesce(game,-beta,-alpha,depth-1,cached_scores);
				cached_scores[position] = score;
			}
			
			game.undo();
			
			if( score >= beta ) return beta;
			if( score > alpha ) alpha = score;
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
		case 'cp':
		case 'np':
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
ai.evaluate = evaluate;