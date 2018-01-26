
let constants = {};
module.exports = constants;

constants.material_score = {'p':10, 'b':30, 'n':30, 'r':50, 'q': 90, 'k': 900};
constants.position_score_table = {
	k: [
		[-3,-4,-4,-5,-5,-4,-4,-3],
		[-3,-4,-4,-5,-5,-4,-4,-3],
		[-3,-4,-4,-5,-5,-4,-4,-3],
		[-3,-4,-4,-5,-5,-4,-4,-3],
		[-2,-3,-3,-4,-4,-3,-3,-2],
		[-1,-2,-2,-2,-2,-2,-2,-1],
		[2,2,0,0,0,0,2,2],
		[2,3,1,0,0,1,3,2]
	],
	q: [
		[-2.0,-1.0,-1.0,-0.5,-0.5,-1.0,-1.0,-2.0],
		[-1.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0,-1.0],
		[-1.0, 0.0, 0.5, 0.5, 0.5, 0.5, 0.0,-1.0],
		[-0.5, 0.0, 0.5, 0.5, 0.5, 0.5, 0.0,-0.5],
		[ 0.0, 0.0, 0.5, 0.5, 0.5, 0.5, 0.0, 0.0],
		[-1.0, 0.5, 0.5, 0.5, 0.5, 0.5, 0.0,-1.0],
		[-1.0, 0.0, 0.5, 0.0, 0.0, 0.0, 0.0,-1.0],
		[-2.0,-1.0,-1.0,-0.5,-0.5,-1.0,-1.0,-2.0]
	],
	r: [
		[ 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0],
		[ 0.5, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 0.5],
		[-0.5, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0,-0.5],
		[-0.5, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0,-0.5],
		[-0.5, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0,-0.5],
		[-0.5, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0,-0.5],
		[-0.5, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0,-0.5],
		[-0.5,-0.5, 0.0, 0.5, 0.5, 0.0,-0.5,-0.5]
	],
	b: [
		[-2.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-2.0],
		[-1.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0,-1.0],
		[-1.0, 0.0, 0.5, 1.0, 1.0, 0.5, 0.0,-1.0],
		[-1.0, 0.5, 0.5, 1.0, 1.0, 0.5, 0.5,-1.0],
		[-1.0, 0.0, 1.0, 1.0, 1.0, 1.0, 0.0,-1.0],
		[-1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0,-1.0],
		[-1.0, 0.5, 0.0, 0.0, 0.0, 0.0, 0.5,-1.0],
		[-2.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-2.0]
	],
	n: [
		[-5.0,-4.0,-3.0,-3.0,-3.0,-3.0,-4.0,-5.0],
		[-4.0,-2.0, 0.0, 0.0, 0.0, 0.0,-2.0,-4.0],
		[-3.0, 0.0, 1.0, 1.5, 1.5, 1.0, 0.0,-3.0],
		[-3.0, 0.5, 1.5, 2.0, 2.0, 1.5, 0.5,-3.0],
		[-3.0, 0.0, 1.5, 2.0, 2.0, 1.5, 0.0,-3.0],
		[-3.0, 0.5, 1.0, 1.5, 1.5, 1.0, 0.5,-3.0],
		[-4.0,-2.0, 0.0, 0.5, 0.5, 0.0,-2.0,-4.0],
		[-5.0,-4.0,-3.0,-3.0,-3.0,-3.0,-4.0,-5.0]
	],
	p: [
		[ 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0],
		[ 5.0, 5.0, 5.0, 5.0, 5.0, 5.0, 5.0, 5.0],
		[ 1.0, 1.0, 2.0, 3.0, 3.0, 2.0, 1.0, 1.0],
		[ 0.5, 0.5, 1.0, 2.5, 2.5, 1.0, 0.5, 0.5],
		[ 0.0, 0.0, 0.0, 2.0, 2.0, 0.0, 0.0, 0.0],
		[ 0.5,-0.5,-1.0, 0.0, 0.0,-1.0,-0.5, 0.5],
		[ 0.5, 1.0, 1.0,-2.0,-2.0, 1.0, 1.0, 0.5],
		[ 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0]
	]
};

constants.cahced_openings = {
	"rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1": ['e4','d4','Nf3','c4'],
	
	"rnbqkbnr/pppppppp/8/8/4P3/8/PPPP1PPP/RNBQKBNR b KQkq e3 0 1": ['c5','e5','e6'],
	"rnbqkbnr/pppppppp/8/8/3P4/8/PPP1PPPP/RNBQKBNR b KQkq d3 0 1": ['Nf6','d5','e6'],
	"rnbqkbnr/pppppppp/8/8/8/5N2/PPPPPPPP/RNBQKB1R b KQkq - 1 1":['Nf6','d5','c5'],
	"rnbqkbnr/pppppppp/8/8/2P5/8/PP1PPPPP/RNBQKBNR b KQkq c3 0 1":['Nf6','e6'],
	
	"rnbqkbnr/pp1ppppp/8/2p5/4P3/8/PPPP1PPP/RNBQKBNR w KQkq c6 0 2":['Nf3','Nc3'],
	
	//e4 c5 Nf3 d6 d4 cxd4 Nxd4
	"rnbqkbnr/pp1ppppp/8/2p5/4P3/5N2/PPPP1PPP/RNBQKB1R b KQkq - 1 2":['d6'],
	"rnbqkbnr/pp2pppp/3p4/2p5/4P3/5N2/PPPP1PPP/RNBQKB1R w KQkq - 0 3":['d4'],
	"rnbqkbnr/pp2pppp/3p4/2p5/3PP3/5N2/PPP2PPP/RNBQKB1R b KQkq d3 0 3":['cxd4'],
	"rnbqkbnr/pp2pppp/3p4/8/3pP3/5N2/PPP2PPP/RNBQKB1R w KQkq - 0 4":['Nxd4'],
	
	//e4 c5 Nc3 Nc6 Nf3 e6 d4
	"rnbqkbnr/pp1ppppp/8/2p5/4P3/2N5/PPPP1PPP/R1BQKBNR b KQkq - 1 2":["Nc6"],
	"r1bqkbnr/pp1ppppp/2n5/2p5/4P3/2N5/PPPP1PPP/R1BQKBNR w KQkq - 2 3":["Nf3"],
	"r1bqkbnr/pp1ppppp/2n5/2p5/4P3/2N2N2/PPPP1PPP/R1BQKB1R b KQkq - 3 3":["e6"],
	"r1bqkbnr/pp1p1ppp/2n1p3/2p5/4P3/2N2N2/PPPP1PPP/R1BQKB1R w KQkq - 0 4":["d4"],
	
	//e4 e5 Nf3 Nc6 Bb5 Ba4
	"rnbqkbnr/pppp1ppp/8/4p3/4P3/8/PPPP1PPP/RNBQKBNR w KQkq e6 0 2":['Nf3'],
	"rnbqkbnr/pppp1ppp/8/4p3/4P3/5N2/PPPP1PPP/RNBQKB1R b KQkq - 1 2":['Nc6'],
	"r1bqkbnr/pppp1ppp/2n5/4p3/4P3/5N2/PPPP1PPP/RNBQKB1R w KQkq - 2 3":['Bb5','c4'],
	
	//e4 e6 d4 d5 Nc3 Bb4 e5
	"rnbqkbnr/pppp1ppp/4p3/8/4P3/8/PPPP1PPP/RNBQKBNR w KQkq - 0 2":["d4"],
	"rnbqkbnr/pppp1ppp/4p3/8/3PP3/8/PPP2PPP/RNBQKBNR b KQkq d3 0 2":["d5"],
	"rnbqkbnr/ppp2ppp/4p3/3p4/3PP3/8/PPP2PPP/RNBQKBNR w KQkq d6 0 3":["Nc3"],
	"rnbqkbnr/ppp2ppp/4p3/3p4/3PP3/2N5/PPP2PPP/R1BQKBNR b KQkq - 1 3":["Bb4"],
	"rnbqk1nr/ppp2ppp/4p3/3p4/1b1PP3/2N5/PPP2PPP/R1BQKBNR w KQkq - 2 4":["e5"],
	
	//d4 Nf6 c4 e6 Nf3 d5
	"rnbqkb1r/pppppppp/5n2/8/3P4/8/PPP1PPPP/RNBQKBNR w KQkq - 1 2":["c4"],
	"rnbqkb1r/pppppppp/5n2/8/2PP4/8/PP2PPPP/RNBQKBNR b KQkq c3 0 2":["e6"],
	"rnbqkb1r/pppp1ppp/4pn2/8/2PP4/8/PP2PPPP/RNBQKBNR w KQkq - 0 3":["Nf3"],
	"rnbqkb1r/pppp1ppp/4pn2/8/2PP4/5N2/PP2PPPP/RNBQKB1R b KQkq - 1 3":["d5"],
	
	//d4 d5 c4 c6 Nf3
	"rnbqkbnr/ppp1pppp/8/3p4/3P4/8/PPP1PPPP/RNBQKBNR w KQkq d6 0 2":["c4"],
	"rnbqkbnr/ppp1pppp/8/3p4/2PP4/8/PP2PPPP/RNBQKBNR b KQkq c3 0 2":["c6"],
	"rnbqkbnr/pp2pppp/2p5/3p4/2PP4/8/PP2PPPP/RNBQKBNR w KQkq - 0 3":["Nf3"],
	
	//d4 e6 e4 d5 Nc3
	"rnbqkbnr/pppp1ppp/4p3/8/3P4/8/PPP1PPPP/RNBQKBNR w KQkq - 0 2":["e4"],
	"rnbqkbnr/pppp1ppp/4p3/8/3PP3/8/PPP2PPP/RNBQKBNR b KQkq e3 0 2":["d5"],
	"rnbqkbnr/ppp2ppp/4p3/3p4/3PP3/8/PPP2PPP/RNBQKBNR w KQkq d6 0 3":["Nc3"],
	
	//Nf3 Nf6 d4 g6 c4 Bg7 Nc3
	"rnbqkb1r/pppppppp/5n2/8/8/5N2/PPPPPPPP/RNBQKB1R w KQkq - 2 2":["d4"],
	"rnbqkb1r/pppppppp/5n2/8/3P4/5N2/PPP1PPPP/RNBQKB1R b KQkq d3 0 2":["g6","d5"],
	"rnbqkb1r/pppppp1p/5np1/8/3P4/5N2/PPP1PPPP/RNBQKB1R w KQkq - 0 3":["c4"],
	"rnbqkb1r/pppppp1p/5np1/8/2PP4/5N2/PP2PPPP/RNBQKB1R b KQkq c3 0 3":["Bg7"],
	"rnbqk2r/ppppppbp/5np1/8/2PP4/5N2/PP2PPPP/RNBQKB1R w KQkq - 1 4":["Nc3"],
	
	//Nf3 d5 d4 Nf6 c4 c6 Nc3
	"rnbqkbnr/ppp1pppp/8/3p4/8/5N2/PPPPPPPP/RNBQKB1R w KQkq d6 0 2":["d4"],
	"rnbqkbnr/ppp1pppp/8/3p4/3P4/5N2/PPP1PPPP/RNBQKB1R b KQkq d3 0 2":["Nf6"],
	"rnbqkb1r/ppp1pppp/5n2/3p4/3P4/5N2/PPP1PPPP/RNBQKB1R w KQkq - 1 3":["c4"],
	"rrnbqkb1r/ppp1pppp/5n2/3p4/2PP4/5N2/PP2PPPP/RNBQKB1R b KQkq c3 0 3":["c6"],
	"rnbqkb1r/pp2pppp/2p2n2/3p4/2PP4/5N2/PP2PPPP/RNBQKB1R w KQkq - 0 4":["Nc3"],
	
	//Nf3 c5 e4
	"rnbqkbnr/pp1ppppp/8/2p5/8/5N2/PPPPPPPP/RNBQKB1R w KQkq c6 0 2":["e4"],
	
	//c4 Nf6 d4 e6 Nf3 d5
	"rnbqkb1r/pppppppp/5n2/8/2P5/8/PP1PPPPP/RNBQKBNR w KQkq - 1 2":["d4"],
	"rnbqkb1r/pppppppp/5n2/8/2PP4/8/PP2PPPP/RNBQKBNR b KQkq d3 0 2":["e6"],
	"rnbqkb1r/pppp1ppp/4pn2/8/2PP4/8/PP2PPPP/RNBQKBNR w KQkq - 0 3":["Nf3"],
	"rnbqkb1r/pppp1ppp/4pn2/8/2PP4/5N2/PP2PPPP/RNBQKB1R b KQkq - 1 3":["d5"],
	
	//c4 e6 d4 Nf6
	"rnbqkbnr/pppp1ppp/4p3/8/2P5/8/PP1PPPPP/RNBQKBNR w KQkq - 0 2":["d4"],
	"rnbqkbnr/pppp1ppp/4p3/8/2PP4/8/PP2PPPP/RNBQKBNR b KQkq d3 0 2":["Nf6"]
};

constants.move_ordering_score = {
	n: { // non capture
		p: 3,
		b: 3,
		n: 3,
		r: 2,
		q: 2,
		k: 0
	},
	b: 4, //pawn push 2 squares
	e: 9, //en passant
	k: 10, //castling
	q: 10,
	np: { //promote
		q: 40,
		r: -1,
		b: -2,
		n: -2
	},
	cp: { //promote
		q: 40,
		r: -1,
		b: -2,
		n: -2
	},
	c: { //capture
		p: { //pawn capture
			p: 9,
			b: 20, //pawn capture bishop
			n: 20,
			r: 30,
			q: 40,
			k: 50
		},
		b: {
			p: 8,
			b: 19,
			n: 19,
			r: 29,
			q: 39,
			k: 49
		},
		n: {
			p: 8,
			b: 18,
			n: 18,
			r: 28,
			q: 38,
			k: 48
		},
		r: {
			p: 7,
			b: 17,
			n: 17,
			r: 27,
			q: 37,
			k: 47
		}, 
		q: {
			p: 6,
			b: 14,
			n: 15,
			r: 16,
			q: 36,
			k: 46
		},
		k: {
			p: 5,
			b: 13,
			n: 14,
			r: 15,
			q: 35,
			k: 45
		}, 
	}
}

constants.MAX = 9999;
constants.MIN = -9999;