'use strict';
import {Chessground} from 'chessground';
var Chess = require("chess.js/chess");
var ai = require("./ai/negamax.js");
import './themes/chessground.css';
import './style.css';
var game = new Chess();
var game_history = [];
var current_move = -1;
var last_position = "";
var board = Chessground(document.getElementById('board'),{movable:{free: false, events: {after: onMove}}});
var orientation = 'white';
refresh(0);

function getColor() {
	return (game.turn() === 'w') ? 'white' : 'black';
}

function refresh(delay = 200){
	let gameover = game.game_over();
	
	//refresh movable color
	board.set({
		turnColor: getColor(),
		movable: { color: getColor() }
	});
	
	//refresh available moves
	if(!gameover){
		board.set({ movable: { dests: getDests() } });
	}
	
	//refresh history
	refreshHistory();
	
	//sync the game with the board
	setTimeout(function(){
		board.set({ fen: game.fen() });
		if(gameover) onGameover();
		else onNotGameover();
	}, delay);
}

function getPromoteTo(){
	let e = document.getElementById('promoteTo');
	return e.options[e.selectedIndex].value;
}

function onMove(src, dest, meta) {
	game.move({from: src, to: dest, promotion: getPromoteTo()});
	last_position = game.pgn();
	game_history = game.history();
	current_move = game_history.length-1;
	refresh(200);
}

setTimeout(aiMove,1000);
function aiMove(){
	let e = game.turn() == 'w'? document.getElementById('white') : document.getElementById('black');
	let player = e.options[e.selectedIndex].value;
	if(player === 'p') {
		setTimeout(aiMove,1000);
		return;
	}
	if(game.game_over()) {
		setTimeout(aiMove,1000);
		return;
	}
	if(player === 'c1'){
		ai.move(game,1,2,500);
	} else if(player === 'c2'){
		ai.move(game,1,4,2000);
	} else {
		ai.move(game,2,3,10000);
	}
	
	game_history = game.history();
	current_move = game_history.length-1;
	refresh(0);
	setTimeout(aiMove,500);
}

function getDests() {
	const dests = {};
	const moves = game.moves({verbose: true});
	for(let move of moves){
		const src = move.from;
		const dest = move.to;
		if(dests[src] === undefined) dests[src] = [];
		dests[src].push(dest);
	}
	return dests;
}

function refreshHistory(){
	let e = document.getElementById('history');
	e.innerHTML = "";
	let history = game_history;
	for(let i = 0; i < history.length; i++){
		if(i%2 === 0) e.innerHTML += (i/2+1) + ". ";
		if(current_move === i) e.innerHTML += "<b>" + history[i] + "</b> ";
		else e.innerHTML += history[i] + " ";
		if(i%2 !== 0) e.innerHTML += "<br/>";
	}
}

function onGameover(){
	document.getElementById('gameover-popup').style.visibility = "visible";
	let e = document.getElementById('gameover-message');
	if(game.in_checkmate()){
		let winner = game.turn() === 'b'? 'White' : 'Black';
		e.innerHTML = "Checkmate! " + winner + " wins.";
	} else if(game.in_stalemate()){
		e.innerHTML = "Stalemate!";
	} else if(game.in_threefold_repetition()){
		e.innerHTML = "Threefold repetition!";
	} else if(game.insufficient_material()){
		e.innerHTML = "Insufficient material!";
	} else if(game.in_draw()){
		e.innerHTML = "Draw!";
	}
}

function onNotGameover(){
	document.getElementById('gameover-popup').style.visibility = "hidden";
}

document.getElementById('flip').addEventListener("click",function(){
	orientation = orientation === 'white'? 'black' : 'white';
	board.set({ orientation: orientation });
});

document.getElementById('ai').addEventListener("click",function(){
	ai.move(game,0,5,1000);
	game_history = game.history();
	current_move = game_history.length-1;
	refresh(0);
});

document.getElementById('white').addEventListener("change",function(){
});

document.getElementById('black').value="c1";
document.getElementById('black').addEventListener("change",function(){
});

document.getElementById('undo').addEventListener("click",function(){
	document.getElementById('black').value="p";
	document.getElementById('white').value="p";
	game.undo();
	if(current_move > -1) current_move--;
	refresh(0);
});

document.getElementById('redo').addEventListener("click",function(){
	document.getElementById('black').value="p";
	document.getElementById('white').value="p";
	if(current_move < game_history.length - 1){
		if(game.move(game_history[current_move+1])){
			current_move++;
			refresh(0);
		}
	}
});

document.getElementById('reset').addEventListener("click",function(){
	document.getElementById('black').value="p";
	document.getElementById('white').value="p";
	game.reset();
	current_move = -1;
	refresh(0);
});

document.getElementById('end').addEventListener("click",function(){
	document.getElementById('black').value="p";
	document.getElementById('white').value="p";
	game.load_pgn(last_position);
	current_move = game_history.length-1;
	refresh(0);
});

document.getElementById('save').addEventListener("click",function(){
	document.getElementById('save-popup').style.visibility = "visible";
	document.getElementById('load-popup').style.visibility = "hidden";
	document.getElementById('pgn').innerHTML = game.pgn();
	document.getElementById('fen').value = game.fen();
});

document.getElementById('load').addEventListener("click",function(){
	document.getElementById('load-popup').style.visibility = "visible";
	document.getElementById('save-popup').style.visibility = "hidden";
	document.getElementById('load-pgn-field').value = "";
	document.getElementById('load-fen-field').value = "";
});

Array.from(document.getElementsByClassName('close-popup')).forEach(
	e => e.addEventListener("click",function(){
		Array.from(document.getElementsByClassName('popup')).forEach(e => e.style.visibility = "hidden");
	})
);

document.getElementById('pgn').addEventListener("click",function(){
	document.getElementById('pgn').select();
});

document.getElementById('fen').addEventListener("click",function(){
	document.getElementById('fen').select();
});

document.getElementById('load-pgn-btn').addEventListener("click",function(){
	document.getElementById('black').value="p";
	document.getElementById('white').value="p";
	let pgn = document.getElementById('load-pgn-field').value;
	let success = game.load_pgn(pgn);
	if(success){
		game_history = game.history();
		current_move = game_history.length-1;
		last_position = pgn;
		refresh(0);
	}
});

document.getElementById('load-fen-btn').addEventListener("click",function(){
	document.getElementById('black').value="p";
	document.getElementById('white').value="p";
	let fen = document.getElementById('load-fen-field').value;
	let success = game.load(fen);
	if(success){
		game_history = game.history();
		current_move = game_history.length-1;
		last_position = game.pgn();
		refresh(0);
	}
});