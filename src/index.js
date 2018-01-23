'use strict';
import {Chessground} from 'chessground';
import './themes/chessground.css';
var Chess = require("chess.js/chess");
var chess = new Chess();
var board = Chessground(document.getElementById('board'),{});
board.set({
	orientation: 'white',
	movable: {
		color: 'white',
		free: false,
		dests: getDests(),
		events: {
			after: onMove
		}
	},
	change: {
		move: onDrop
	}
});

function getColor() {
	return (chess.turn() === 'w') ? 'white' : 'black';
}

function getPromoteTo(){
	let e = document.getElementById('promoteTo');
	return e.options[e.selectedIndex].value;
}

function onMove(src, dest, meta) {
	chess.move({from: src, to: dest, promotion: getPromoteTo()});
	board.set({
		turnColor: getColor(),
		movable: {
			color: getColor(),
			dests: getDests()
		}
	});
	setTimeout(onDrop, 200);
}

function onDrop(role,dest){
	board.set({
		fen: chess.fen()
	});
}

//handle en passant capture and pawn promotion
function specialMove(src,dest){
	const flags = getFlags();
	//if(flags[src+dest] === 'e'){ //en passant} 
	if(flags[src+dest] === 'np' || flags[src+dest] === 'cp'){ 
		//pawn promotion
		console.log("pawn promotion");
	}
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

function getFlags() {
	const flags = {};
	const moves = chess.moves({verbose: true});
	for(let i = 0; i < moves.length; i++){
		const src = moves[i].from;
		const dest = moves[i].to;
		const flag = moves[i].flags;
		flags[src+dest] = flag;
	}
	return flags;
}
