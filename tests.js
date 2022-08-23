// In dieser Datei nur folgen von Zügen, um zu testen ob alles funktioniert:

// Italienische Partie

// erster zug der partie:
zugMachen('e2-e4')
zugMachen('e7-e5')

zugMachen('g1-f3')
zugMachen('b8-c6')
zugMachen('f1-c4')

// Kings Gambit
zugMachen('e2-e4')
zugMachen('e7-e5')

zugMachen('f2-f4')

// Einfaches Schach durch weißen Springer:
zugMachen('b1-c3')
zugMachen('d7-d5')
zugMachen('c3-d5')
zugMachen('e7-e5')
zugMachen('d5-f6')

// Bongcloud Attack mit weiß, zum testen ob notieren der könig position geht
zugMachen('e2-e4')
zugMachen('e7-e5')
zugMachen('e1-e2')

// Testen des en-passant:
zugMachen('e2-e4')
zugMachen('c7-c5')
zugMachen('e4-e5')
zugMachen('d7-d5')
zugMachen('e5-d6')

// anderer enpassant test für weiß:
zugMachen('e2-e4')
zugMachen('c7-c5')
zugMachen('e4-e5')
zugMachen('d7-d5')
zugMachen('e5-d6')

// schnelles schach durch weiße dame
zugMachen('e2-e4')
zugMachen('f7-f6')
zugMachen('d1-h5')

// schäfer matt
zugMachen('e2-e4')
zugMachen('e7-e5')
zugMachen('d1-h5')
zugMachen('b8-c6')
zugMachen('f1-c4')
zugMachen('d7-d6')
zugMachen('h5-f7')

// matt-falle gegen die dutch defense
zugMachen('d2-d4')
zugMachen('f7-f5')
zugMachen('c1-g5')
zugMachen('h7-h6')
zugMachen('g5-h4')
zugMachen('g7-g5')
zugMachen('h4-g3')
zugMachen('f5-f4')
zugMachen('e2-e3')
zugMachen('f4-g3')
zugMachen('d1-h5')

// eröffnungssequenz, in der weiß direkt kurz rochieren kann und wird
zugMachen('e2-e4')
zugMachen('e7-e5')
zugMachen('g1-f3')
zugMachen('b8-c6')
zugMachen('f1-c4')
zugMachen('f8-c5')
zugMachen('O-O')

// schwarz stellt weiß stalemate: Wichtig ist, dass weiß immer den ersten zug machen muss!
let brettState = [
	['.', '.', '.', '.', '.', '.', '.', '.'],
	['.', '.', '.', '.', '.', '.', '.', '.'],
	['.', 'k', '.', '.', '.', '.', '.', '.'],
	['.', '.', '.', '.', '.', 'q', '.', '.'],
	['.', '.', '.', '.', '.', '.', 'q', '.'],
	['.', '.', '.', '.', '.', '.', 'B', '.'],
	['.', '.', '.', '.', '.', '.', '.', '.'],
	['.', '.', '.', '.', '.', '.', '.', 'K'],
]
zugMachen('g3-h2')
zugMachen('f5-h5')

// stalemate / patt:
let brettState = [
	['.', '.', '.', '.', '.', '.', '.', '.'],
	['.', '.', '.', '.', '.', '.', '.', '.'],
	['.', 'K', '.', '.', '.', '.', '.', '.'],
	['.', '.', '.', '.', '.', 'Q', '.', '.'],
	['.', '.', '.', '.', '.', '.', 'Q', '.'],
	['.', '.', '.', '.', '.', '.', '.', '.'],
	['.', '.', '.', '.', '.', '.', '.', 'b'],
	['.', '.', '.', '.', '.', '.', '.', 'k'],
]
zugMachen('f5-h5')

// ganz knapp kein stalemate:
let brettState = [
	['.', '.', '.', '.', '.', '.', '.', '.'],
	['.', '.', '.', '.', '.', '.', '.', '.'],
	['.', 'K', '.', '.', '.', '.', '.', '.'],
	['.', '.', '.', '.', '.', 'Q', '.', '.'],
	['.', '.', '.', '.', '.', '.', '.', '.'],
	['.', '.', '.', '.', '.', '.', '.', '.'],
	['.', '.', '.', '.', '.', '.', '.', 'b'],
	['.', '.', '.', '.', '.', '.', '.', 'k'],
]
zugMachen('f5-h5')

// bauern-endspiel-matt
let brettState = [
	['.', 'k', '.', '.', '.', '.', '.', '.'],
	['.', '.', '.', '.', '.', '.', '.', '.'],
	['.', '.', 'P', '.', 'h', '.', '.', '.'],
	['.', '.', '.', '.', '.', '.', '.', '.'],
	['.', '.', '.', '.', '.', '.', 'B', '.'],
	['.', '.', '.', '.', '.', 'B', '.', '.'],
	['.', '.', '.', '.', '.', '.', '.', '.'],
	['R', '.', 'R', '.', '.', '.', 'K', '.'],
]
zugMachen('c6-c7')

// Pinn des Bishops:
// weiß ist dran und versucht e3-c4 zu spielen, was natürlich nicht erlaubt ist.
let brettState = [
	['.', '.', '.', '.', '.', '.', '.', '.'],
	['.', '.', '.', '.', '.', '.', '.', '.'],
	['.', '.', '.', '.', 'h', '.', '.', '.'],
	['.', '.', '.', '.', '.', '.', '.', '.'],
	['.', '.', '.', '.', '.', '.', '.', '.'],
	['.', '.', '.', '.', 'B', '.', '.', '.'],
	['.', '.', '.', '.', '.', '.', '.', '.'],
	['.', '.', '.', '.', 'K', '.', '.', '.'],
]

// alternative stellung: Rook endgame

let brettState = [
	['k', 'r', '.', '.', '.', '.', '.', '.'],
	['.', 'r', '.', '.', '.', '.', '.', '.'],
	['.', '.', '.', '.', '.', '.', '.', '.'],
	['.', '.', '.', '.', '.', '.', '.', '.'],
	['.', '.', '.', '.', '.', '.', '.', '.'],
	['.', '.', '.', 'R', '.', '.', '.', '.'],
	['.', '.', 'R', 'K', '.', '.', '.', '.'],
	['.', '', '.', '.', '.', '.', '.', '.'],
]

// in dieser stellung gibt es einen bug:
// läufer auf 6, 2 aber deckt aus irgndeinem grund 6, 4
let brettState = [
	['.', '.', '.', '.', '.', '.', '.', '.'],
	['.', '.', '.', '.', '.', '.', '.', '.'],
	['.', '.', '.', '.', '.', '.', '.', '.'],
	['.', '.', '.', '.', '.', '.', '.', '.'],
	['.', '.', '.', '.', 'K', '.', '.', '.'],
	['.', '.', '.', '.', '.', '.', '.', '.'],
	['.', '.', 'B', '.', '.', '.', '.', '.'],
	['.', '.', '.', '.', '.', '.', '.', '.'],
]

// originales brettstate:
let brettState = [
	['r', 'n', 'b', 'q', 'k', 'b', 'n', 'r'],
	['p', 'p', 'p', 'p', 'p', 'p', 'p', 'p'],
	['.', '.', '.', '.', '.', '.', '.', '.'],
	['.', '.', '.', '.', '.', '.', '.', '.'],
	['.', '.', '.', '.', '.', '.', '.', '.'],
	['.', '.', '.', '.', '.', '.', '.', '.'],
	['P', 'P', 'P', 'P', 'P', 'P', 'P', 'P'],
	['R', 'N', 'B', 'Q', 'K', 'B', 'N', 'R'],
]

// Eindeutiges schachmatt: Weiß am Zug: (R nach e1 ist Matt)
let brettState = [
	['.', '.', '.', '.', '.', '.', '.', 'K'],
	['.', '.', '.', '.', '.', '.', '.', '.'],
	['.', '.', '.', '.', '.', '.', '.', '.'],
	['.', '.', '.', '.', '.', '.', '.', '.'],
	['.', '.', '.', '.', '.', '.', '.', '.'],
	['.', '.', '.', '.', 'R', '.', '.', '.'],
	['.', '.', '.', 'R', '.', '.', '.', '.'],
	['k', '.', '.', '.', '.', '.', '.', '.'],
]

// Matt in 2: Nach Re1 muss bd1 kommen, dann schlagne auf d1 und vorbei
let brettState = [
	['.', '.', '.', '.', '.', '.', '.', '.'],
	['.', '.', '.', '.', '.', '.', '.', '.'],
	['.', '.', '.', '.', '.', '.', '.', '.'],
	['.', '.', '.', '.', '.', '.', '.', 'K'],
	['.', '.', '.', '.', '.', '.', '.', '.'],
	['.', '.', '.', '.', 'R', '.', '.', '.'],
	['.', '.', 'b', 'R', '.', '.', '.', '.'],
	['k', '.', '.', '.', '.', '.', '.', '.'],
]

// weißer rook kann nur noch durch einen zug matt verhindern
let brettState = [
	['.', '.', '.', '.', '.', '.', '.', '.'],
	['.', '.', '.', '.', '.', '.', '.', '.'],
	['.', '.', '.', '.', '.', '.', '.', '.'],
	['.', '.', '.', '.', '.', '.', '.', 'k'],
	['.', '.', '.', '.', '.', '.', '.', '.'],
	['.', '.', '.', '.', 'r', '.', '.', '.'],
	['.', '.', 'R', 'r', '.', '.', '.', '.'],
	['K', '.', '.', '.', '.', '.', '.', '.'],
]

let brettState = [
	['k', '.', '.', '.', '.', '.', '.', '.'],
	['.', 'P', 'r', '.', '.', '.', '.', '.'],
	['.', '.', '.', '.', '.', '.', '.', '.'],
	['.', '.', '.', '.', '.', '.', '.', '.'],
	['.', '.', '.', '.', '.', '.', '.', '.'],
	['.', '.', '.', '.', '.', '.', '.', '.'],
	['.', '.', '.', '.', '.', '.', '.', '.'],
	['.', '.', '.', '.', '.', '.', '.', '.'],
]
