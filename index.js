// Datei verwein

import { moeglicheZuegePawn, angegriffeneFelderPawn } from './figuren/Pawn'
import { moeglicheZuegeKnight } from './figuren/Knight'
import { moeglicheZuegeRook } from './figuren/Rook'
import {
	feldbezeichnungZuKoord,
	isArrayInArray,
	angriffeFinden,
} from './Util.js'

// Relevante werte für die partie: (muss final in eine klasse), aber bisher nur zum testen hier drinne
let weißAmZug = true
// wird beides erstmal als tupel der koordinaten / position im array gespeichert
let posWeißerKing = [7, 4]
let posSchwarzerKing = [0, 4]

let weißHatRochiert = false
let schwarzHatRochiert = false

// wann immer ein Bauer einen Doppelschritt aus der Grundstellung gemacht hat, kann hier seine Linie vermerkt werden
// (j-Koordinatenwert) Damit kann gecheckt werden, ob dieser Bauer durch En-passant geschlagen werden kann.
// muss noch aufgehoben werden, irgendwie - später. Wird auf null gesetzt, wenn nicht genutzt oder nicht aufgetreten
let enPassantBauer = null

// Die Nummer des aktuellen Halbzuges (fängt bei logischerweise bei 1 an)
let halbzugNummer = 1

// konvertiert mathematische koordinaten i,j bzw. x,y zu f1, g3, a7 etc.

// Das Brett, mit den aktuellen Positionen der Figuren
// wenn Uppercase Buchstabe, dann weiße Figur - wird sammt State, Koordinate und Figur an
// die entsprechende Methode in der Klasse der Figur übergeben
let brettState = [
	['k', 'r', '.', '.', '.', '.', '.', '.'],
	['.', 'r', '.', '.', '.', '.', '.', '.'],
	['.', '.', '.', '.', '.', '.', '.', '.'],
	['.', '.', '.', '.', '.', '.', '.', '.'],
	['.', '.', '.', '.', '.', '.', '.', '.'],
	['.', '.', '.', 'R', '.', '.', '.', '.'],
	['.', '.', 'R', 'K', '.', '.', '.', '.'],
	['.', '.', '.', '.', '.', '.', '.', '.'],
]

// Hier werden einzelne, angegriffene felder mit "a" markiert, für beide farben jeweils.
// Immer nach einem legitimen zug wird aktualisiert, und somit auch erkannt, ob der könig im schach steht
let angriffeWeiß = [
	['.', '.', '.', '.', '.', '.', '.', '.'],
	['.', '.', '.', '.', '.', '.', '.', '.'],
	['.', '.', '.', '.', '.', '.', '.', '.'],
	['.', '.', '.', '.', '.', '.', '.', '.'],
	['.', '.', '.', '.', '.', '.', '.', '.'],
	['.', '.', '.', '.', '.', '.', '.', '.'],
	['.', '.', '.', '.', '.', '.', '.', '.'],
	['.', '.', '.', '.', '.', '.', '.', '.'],
]

let angriffeSchwarz = [
	['.', '.', '.', '.', '.', '.', '.', '.'],
	['.', '.', '.', '.', '.', '.', '.', '.'],
	['.', '.', '.', '.', '.', '.', '.', '.'],
	['.', '.', '.', '.', '.', '.', '.', '.'],
	['.', '.', '.', '.', '.', '.', '.', '.'],
	['.', '.', '.', '.', '.', '.', '.', '.'],
	['.', '.', '.', '.', '.', '.', '.', '.'],
	['.', '.', '.', '.', '.', '.', '.', '.'],
]

let moeglicheZuegeRookMap = [
	['.', '.', '.', '.', '.', '.', '.', '.'],
	['.', '.', '.', '.', '.', '.', '.', '.'],
	['.', '.', '.', '.', '.', '.', '.', '.'],
	['.', '.', '.', '.', '.', '.', '.', '.'],
	['.', '.', '.', '.', '.', '.', '.', '.'],
	['.', '.', '.', '.', '.', '.', '.', '.'],
	['.', '.', '.', '.', '.', '.', '.', '.'],
	['.', '.', '.', '.', '.', '.', '.', '.'],
]
function brettAusgeben() {
	console.log('---------------')
	for (let i = 0; i < brettState.length; i++) {
		console.log(brettState[i].join(' '))
	}
	console.log('---------------')
	console.log('Position weißer König:', posWeißerKing)
	console.log('Position schwarzer König:', posSchwarzerKing)
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
			//console.log('Bauer auf das Zielfeld', iZielfeld, jZielfeld)
			moeglicheZuege = moeglicheZuegePawn(
				[iAusgangsfeld, jAusgangsfeld],
				brettState,
				weißAmZug,
				enPassantBauer
			)

			//console.log('Legitime Züge für diesen Bauern: ', moeglicheZuege)
			if (isArrayInArray(moeglicheZuege, [iZielfeld, jZielfeld])) {
				console.log('Zug ist legitim')

				// insofern der gezogene bauer genau ein feld hinter (j gleich, i + 1 für schwarz, i - 1 für weiß) dem en-passant schlagbaren bauern steht und sich
				// diagonal auf ihn zubewegt hat, muss es sich um en-passant schlagen handeln - der geschlagene bauer wird entfernt.

				if (enPassantBauer !== null) {
					if (weißAmZug) {
						if (
							iZielfeld === enPassantBauer[0] - 1 &&
							jZielfeld === enPassantBauer[1]
						) {
							console.log(
								'Wei hat Bauer auf',
								enPassantBauer[0],
								enPassantBauer[1],
								'en passant genommen'
							)
							brettState[enPassantBauer[0]][enPassantBauer[1]] = '.'
						}
					}

					if (!weißAmZug) {
						if (
							iZielfeld === enPassantBauer[0] + 1 &&
							jZielfeld === enPassantBauer[1]
						) {
							console.log(
								'Schwarz hat Bauern auf',
								enPassantBauer[0],
								enPassantBauer[1],
								'en passant genommen'
							)

							// entfernen des en-passant-geschlagenen bauerns:
							brettState[enPassantBauer[0]][enPassantBauer[1]] = '.'
						}
					}
				}
				// sobald der nächste zug legitim ist, verfällt der en-passant anspruch. Entweder er wurde genutzt durch den legitimen zug, oder er
				// verfällt wegen ungenutzt.
				enPassantBauer = null

				console.log('iZielfeld', iZielfeld)

				// hier einfach über den i-wert checken, ob bauer zwei aus grundstellung (also nun auf höhe 4 und vorher in 6 -> zwei schritte)
				if (weißAmZug && iZielfeld == 4 && iAusgangsfeld == 6) {
					console.log('Weißer Bauer Doppelschritt!')
					enPassantBauer = [iZielfeld, jZielfeld]
				}

				if (!weißAmZug && iZielfeld == 3 && iAusgangsfeld == 1) {
					console.log('Schwarzer Bauer Doppelschritt!')
					enPassantBauer = [iZielfeld, jZielfeld]
				}
			} else {
				//console.log('Bauern Zug NICHT legitim')
				if (!weißAmZug) {
					//console.log('Weil noch nicht für Schwarz :) ')
				}
			}
			break

		case 'K':
		case 'k':
			console.log('König wurde bewegt')

			if (weißAmZug) {
				posWeißerKing = [iZielfeld, jZielfeld]
			} else {
				posSchwarzerKing = [iZielfeld, jZielfeld]
			}
			break

		case 'Q':
		case 'q':
			console.log('Dame wurde bewegt')
			break

		case 'N':
		case 'n':
			console.log('Springer wurde bewegt')
			moeglicheZuege = moeglicheZuegeKnight(
				[iAusgangsfeld, jAusgangsfeld],
				brettState,
				weißAmZug
			)

			console.log('Mögliche Springer-Züge', moeglicheZuege)

			if (isArrayInArray(moeglicheZuege, [iZielfeld, jZielfeld])) {
				console.log('Zug ist legitim')
			}
			break

		case 'B':
		case 'b':
			console.log('Läufer wurde bewegt')

			break

		case 'R':
		case 'r':
			console.log('Turm wurde bewegt')
			moeglicheZuege = moeglicheZuegeRook(
				[iAusgangsfeld, jAusgangsfeld],
				brettState,
				weißAmZug
			)

			for (let x = 0; x < moeglicheZuege.length; x++) {
				let i = moeglicheZuege[x][0]
				let j = moeglicheZuege[x][1]

				moeglicheZuegeRookMap[i][j] = 'X'
			}

			console.log('Mögliche Züge des bewegten Rooks: ')
			for (let i = 0; i < moeglicheZuegeRookMap.length; i++) {
				console.log(moeglicheZuegeRookMap[i].join(' '))
			}

			break
	}

	// Figur auf dem Brett auf das Zielfeld bewegen - das Ausgangsfeld, was nun leer ist, wird durch einen "." markiert
	brettState[iAusgangsfeld][jAusgangsfeld] = '.'
	brettState[iZielfeld][jZielfeld] = figurZeichen

	// alle, durch beide farben angegriffenen felder: [0] für weiß, [1] für schwarz.
	let angegriffeneFelder = angriffeFinden(brettState, weißAmZug)

	// i und j sind reserviert für bezeichnung des koord-abschnitt
	// alle angriffe von weiß einzeichnen:
	for (let x = 0; x < angegriffeneFelder[0].length; x++) {
		let i = angegriffeneFelder[0][x][0]
		let j = angegriffeneFelder[0][x][1]

		angriffeWeiß[i][j] = 'A'
	}
	// alle angriffe von schwarz einzeichnen
	for (let x = 0; x < angegriffeneFelder[1].length; x++) {
		let i = angegriffeneFelder[1][x][0]
		let j = angegriffeneFelder[1][x][1]

		angriffeSchwarz[i][j] = 'A'
	}

	// testen, ob einer der beiden könige im schach steht:
	if (angriffeSchwarz[posWeißerKing[0]][posWeißerKing[1]] === 'A') {
		console.log('Weißer könig steht im schach!')
	}

	if (angriffeWeiß[posSchwarzerKing[0]][posSchwarzerKing[1]] === 'A') {
		console.log('Schwarzer könig steht im schach!')
	}

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
// Hier nach gibt es drei legitime Züge für Springer

zugMachen('h2-h4')

console.log('Angriffe von weiß:')
console.log('---------------')
for (let i = 0; i < angriffeWeiß.length; i++) {
	console.log(angriffeWeiß[i].join(' '))
}
console.log('---------------')

console.log('Angriffe von schwarz:')
console.log('---------------')
for (let i = 0; i < angriffeSchwarz.length; i++) {
	console.log(angriffeSchwarz[i].join(' '))
}
console.log('---------------')

brettAusgeben()
