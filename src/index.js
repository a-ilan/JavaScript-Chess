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
			after: setMove
		}
	}
});

function getColor() {
	return (chess.turn() === 'w') ? 'white' : 'black';
}

function setMove(src, dest) {
	specialMove(src,dest);
	chess.move({from: src, to: dest});
	board.set({
		turnColor: getColor(),
		movable: {
			color: getColor(),
			dests: getDests()
		}
	});
}

//handle en passant capture and pawn promotion
function specialMove(src,dest){
	const flags = getFlags();
	if(flags[src+dest] === 'e'){ 
		//en passant
		console.log("en passant");
	} else if(flags[src+dest] === 'np' || flags[src+dest] === 'cp'){ 
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


//import {module} from 'angular';
//ng-app="myApp" ng-controller="myCtrl"
/*var app = module('myApp', []);
app.controller('myCtrl', [ '$scope', function($scope) {

}]);*/