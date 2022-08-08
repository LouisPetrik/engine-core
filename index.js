// Datei verwein

import { moeglicheZuegePawn } from './figuren/Pawn'
import { feldbezeichnungZuKoord } from './Util.js'

// Relevante werte für die partie: (muss final in eine klasse), aber bisher nur zum testen hier drinne
let weißAmZug = true
let posWeißerKing = 'e1'
let posSchwarzerKing = 'e8'

let weißHatRochiert = false
let schwarzHatRochiert = false

// Die Nummer des aktuellen Halbzuges (fängt bei logischerweise bei 1 an)
let halbzugNummer = 1

// konvertiert mathematische koordinaten i,j bzw. x,y zu f1, g3, a7 etc.

// Das Brett, mit den aktuellen Positionen der Figuren
// wenn Uppercase Buchstabe, dann weiße Figur - wird sammt State, Koordinate und Figur an
// die entsprechende Methode in der Klasse der Figur übergeben
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

function brettAusgeben() {
	console.log('---------------')
	for (let i = 0; i < brettState.length; i++) {
		console.log(brettState[i].join(' '))
	}
	console.log('---------------')
}

// Überträgt einen Zug auf direkt auf den Brett-State, ohne zu überprüfen, ob der Zug legitim  ist
// zug notation muss in der koordinaten notation "e2-e4", also Ausgangsfeld-Zielfeld seien.
// gibt dann den veränderten brett-state zurück. Bisher nicht ausgegliedert, da direkt auf den brettState zugegriffen wird.
function zugMachen(zugNotation) {
	// ausgeben des aktuellen zuges
	if (halbzugNummer % 2 === 0) {
		console.log('Schwarz ist am Zug ')
	} else {
		console.log('Weiß ist am Zug')
	}

	halbzugNummer++

	// zugNotation slicen, damit aufgeteilt wird. Kann static gemacht werden,
	// da notation immer exakt 5 Zeichen lang ist.

	const ausgangsfeld = zugNotation.slice(0, 2)
	const zielfeld = zugNotation.slice(3)

	// Figur ermitteln, die auf dem Ausgangsfeld steht - dazu die Notation z. B. e2 in Koordinaten i,j übersetzen
	// notation zu koordinaten / position im array des ausgangsfeldes:
	// ohne destructoring, weil das nicht in c++ möglich
	const iAusgangsfeld = feldbezeichnungZuKoord(ausgangsfeld)[0]
	const jAusgangsfeld = feldbezeichnungZuKoord(ausgangsfeld)[1]

	const iZielfeld = feldbezeichnungZuKoord(zielfeld)[0]
	const jZielfeld = feldbezeichnungZuKoord(zielfeld)[1]

	// Figur auf dem Ausgangsfeld finden - P, p, N, n etc.
	const figurZeichen = brettState[iAusgangsfeld][jAusgangsfeld]

	// checken, ob der zug legitim ist: Dafür wird nur das Ausgangsfeld und das mögliche Zielfeld übergeben -
	// die Methode zum Checken generiert alle legitimen zielfelder
	// Hier Gabelung aller möglichen Figuren - König, Dame, Bauer, Springer, Läufer, Turm
	// Hier werden die möglichen Züge der gerade zu-bewegenden Figur aus der entsprechenden Methode geholt und
	// untersucht, ob der wunsch-zug legitim ist. Statt Figurenzeichen zu lower-case zu casten wird erstmal für beide Farben die möglichkeit gechecked und erhalten
	let moeglicheZuege = []

	switch (figurZeichen) {
		case 'P':
		case 'p':
			console.log('Ein Bauer wurde bewegt')
			moeglicheZuege = moeglicheZuegePawn(
				[iAusgangsfeld, jAusgangsfeld],
				brettState,
				weißAmZug
			)
			break

		case 'K':
		case 'k':
			console.log('König wurde bewegt')
			break

		case 'Q':
		case 'q':
			console.log('Dame wurde bewegt')
			break

		case 'N':
		case 'n':
			console.log('Springer wurde bewegt')
			break

		case 'B':
		case 'b':
			console.log('Läufer wurde bewegt')
			break

		case 'R':
		case 'r':
			console.log('Turm wurde bewegt')
			break
	}

	// Figur auf dem Brett auf das Zielfeld bewegen - das Ausgangsfeld, was nun leer ist, wird durch einen "." markiert
	brettState[iAusgangsfeld][jAusgangsfeld] = '.'
	brettState[iZielfeld][jZielfeld] = figurZeichen

	// nun ist wieder die andere Farbe am Zug
	weißAmZug = !weißAmZug

	return brettState
}

function spielen() {
	console.log('Macht den ersten Zug')
}

spielen()

/* LOGIK FÜR SPIELABLAUF 
Weiß am Zug ,Schwarz etc. durch Überprüfung */

zugMachen('e2-e4')

/*
zugMachen('g1-f3')
zugMachen('b8-c6')

zugMachen('f1-c4')
zugMachen('f8-c5')
*/

brettAusgeben()
