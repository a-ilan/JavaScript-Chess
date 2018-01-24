'use strict';
import {Chessground} from 'chessground';
var Chess = require("chess.js/chess");
var ai = require("./ai/minimax.js");
import './themes/chessground.css';
import './style.css';
var game = new Chess();
var game_history = [];
var current_move = -1;
var board = Chessground(document.getElementById('board'),{});
var orientation = 'white';
board.set({
	orientation: orientation,
	movable: {
		color: 'white',
		free: false,
		dests: getDests(),
		events: {
			after: onMove
		}
	}
});

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
	}, delay);
}

function getPromoteTo(){
	let e = document.getElementById('promoteTo');
	return e.options[e.selectedIndex].value;
}

function onMove(src, dest, meta) {
	game.move({from: src, to: dest, promotion: getPromoteTo()});
	game_history = game.history();
	current_move = game_history.length-1;
	refresh(200);
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

document.getElementById('flip').addEventListener("click",function(){
	orientation = orientation === 'white'? 'black' : 'white';
	board.set({ orientation: orientation });
});

document.getElementById('ai').addEventListener("click",function(){
	ai(game,1);
	game_history = game.history();
	current_move = game_history.length-1;
	refresh(0);
});

document.getElementById('undo').addEventListener("click",function(){
	game.undo();
	if(current_move > -1) current_move--;
	refresh(0);
});

document.getElementById('redo').addEventListener("click",function(){
	if(current_move < game_history.length - 1){
		if(game.move(game_history[current_move+1])){
			current_move++;
			refresh(0);
		}
	}
});

document.getElementById('reset').addEventListener("click",function(){
	game.reset();
	current_move = -1;
	refresh(0);
});

document.getElementById('save').addEventListener("click",function(){
	document.getElementById('save-popup').style.visibility = "visible";
	document.getElementById('pgn').innerHTML = game.pgn();
	document.getElementById('fen').value = game.fen();
});

document.getElementById('close-save-popup').addEventListener("click",function(){
	document.getElementById('save-popup').style.visibility = "hidden";
	document.getElementById('gameover-popup').style.visibility = "hidden";
});

document.getElementById('close-gameover-popup').addEventListener("click",function(){
	document.getElementById('save-popup').style.visibility = "hidden";
	document.getElementById('gameover-popup').style.visibility = "hidden";
});

document.getElementById('pgn').addEventListener("click",function(){
	document.getElementById('pgn').select();
});

document.getElementById('fen').addEventListener("click",function(){
	document.getElementById('fen').select();
});