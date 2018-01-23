'use strict';
import {Chessground} from 'chessground';
import './themes/chessground.css';
import './style.css';
var Chess = require("chess.js/chess");
var chess = new Chess();
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
	return (chess.turn() === 'w') ? 'white' : 'black';
}

function refresh1(){
	board.set({
		turnColor: getColor(),
		movable: {
			color: getColor(),
			dests: getDests()
		}
	});
	refreshHistory();
}

function refresh2(){
	board.set({ fen: chess.fen() });
}

function getPromoteTo(){
	let e = document.getElementById('promoteTo');
	return e.options[e.selectedIndex].value;
}

function onMove(src, dest, meta) {
	chess.move({from: src, to: dest, promotion: getPromoteTo()});
	refresh1();
	setTimeout(refresh2, 200);
}

function getDests() {
	const dests = {};
	const moves = chess.moves({verbose: true});
	for(let i = 0; i < moves.length; i++){
		const src = moves[i].from;
		const dest = moves[i].to;
		if(dests[src] === undefined) dests[src] = [];
		dests[src].push(dest);
	}
	return dests;
}

function refreshHistory(){
	let e = document.getElementById('history');
	e.innerHTML = "";
	let history = chess.history();
	for(let i = 0; i < history.length; i++){
		if(i%2 === 0) e.innerHTML += (i/2+1) + ". ";
		e.innerHTML += history[i] + " ";
		if(i%2 !== 0) e.innerHTML += "<br/>";
	}
}

document.getElementById('flip').addEventListener("click",function(){
	orientation = orientation === 'white'? 'black' : 'white';
	board.set({ orientation: orientation });
});

document.getElementById('undo').addEventListener("click",function(){
	chess.undo();
	refresh1();
	refresh2();
});

document.getElementById('reset').addEventListener("click",function(){
	chess.reset();
	refresh1();
	refresh2();
});

document.getElementById('save').addEventListener("click",function(){
	let white = document.getElementById('white').options[document.getElementById('white').selectedIndex].text;
	let black = document.getElementById('black').options[document.getElementById('black').selectedIndex].text;
	chess.header('White', white, 'Black', black);
	document.getElementById('save-popup').style.visibility = "visible";
	document.getElementById('pgn').innerHTML = chess.pgn();
	document.getElementById('fen').value = chess.fen();
});

document.getElementById('close-popup').addEventListener("click",function(){
	document.getElementById('save-popup').style.visibility = "hidden";
});

document.getElementById('pgn').addEventListener("click",function(){
	document.getElementById('pgn').select();
});

document.getElementById('fen').addEventListener("click",function(){
	document.getElementById('fen').select();
});