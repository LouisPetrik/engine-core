// Sammlung von Funktionen und Konstanten
import { angegriffeneFelderPawn } from './figuren/Pawn'
import {
	moeglicheZuegeKnight,
	angegriffeneFelderKnight,
} from './figuren/Knight'
import { angegriffeneFelderRook } from './figuren/Rook'
import { angegriffeneFelderBishop } from './figuren/Bishop'
import { angegriffeneFelderQueen } from './figuren/Queen'
import { angegriffeneFelderKing } from './figuren/King'

// Aus der Sicht von Weiß
// bekommt noch eine Funktion, die ermittelt welches Feld +1 links, rechts, oben, unten liegt
const koordinaten = [
	['a8', 'b8', 'c8', 'd8', 'e8', 'f8', 'g8', 'h8'],
	['a7', 'b7', 'c7', 'd7', 'e7', 'f7', 'g7', 'h7'],
	['a6', 'b6', 'c6', 'd6', 'e6', 'f6', 'g6', 'h6'],
	['a5', 'b5', 'c5', 'd5', 'e5', 'f5', 'g5', 'h5'],
	['a4', 'b4', 'c4', 'd4', 'e4', 'f4', 'g4', 'h4'],
	['a3', 'b3', 'c3', 'd3', 'e3', 'f3', 'g3', 'h3'],
	['a2', 'b2', 'c2', 'd2', 'e2', 'f2', 'g2', 'h2'],
	['a1', 'b1', 'c1', 'd1', 'e1', 'f1', 'g1', 'h1'],
]

export function isArrayInArray(arr, item) {
	const item_as_string = JSON.stringify(item)

	const contains = arr.some(function (ele) {
		return JSON.stringify(ele) === item_as_string
	})
	return contains
}

// gibt die array-koordinanten einer gefunden figur zurück. Genutzt z. B. um immer die aktuelle position der
// beiden könige zu haben, damit ein schach bewertet werden kann.
export function figurFinden(figurZeichen, brettState) {
	const row = brettState.findIndex((row) => row.includes(figurZeichen))
	const col = brettState[row].indexOf(figurZeichen)

	return [row, col]
}

// bekommt die schach-koordinate / Feldbezeichnung z. B. e3, a7 oder g4 übergeben und
// gibt diese als position im array zurück mit i,j.
export function feldbezeichnungZuKoord(feld) {
	const i = koordinaten.findIndex((i) => i.includes(feld))
	const j = koordinaten[i].indexOf(feld)

	return [i, j]
}

/**
 * Gibt alle Felder zurück, die durch alle Figuren einer Farbe angegriffen werden.
 * Könnte man noch komprimieren indem man für alle figuren checkt und insofern weiß,
 * @param {*} brettState Aktueller Zustand nach einem gültigen zug
 */
export function angriffeFinden(brettState, weißAmZug) {
	const angegriffeneFelderWeiß = []
	const angegriffeneFelderSchwarz = []
	for (let i = 0; i <= 7; i++) {
		for (let j = 0; j <= 7; j++) {
			let figur = brettState[i][j]
			let figurPos = [i, j]

			if (figur === 'P') {
				// da angegriffeneFelderPawn ein zweidimensionales array zurückgibt, wird jedes koordinaten-tupel
				// als element rausgeholt. Muss optimiert werden.
				for (
					let x = 0;
					x < angegriffeneFelderPawn(figurPos, 'weiß').length;
					x++
				) {
					angegriffeneFelderWeiß.push(
						angegriffeneFelderPawn(figurPos, 'weiß')[x]
					)
				}
			}
			if (figur === 'p') {
				for (
					let x = 0;
					x < angegriffeneFelderPawn(figurPos, 'schwarz').length;
					x++
				) {
					angegriffeneFelderSchwarz.push(
						angegriffeneFelderPawn(figurPos, 'schwarz')[x]
					)
				}
			}

			if (figur === 'N') {
				for (
					let x = 0;
					x < angegriffeneFelderKnight(figurPos).length;
					x++
				) {
					angegriffeneFelderWeiß.push(
						angegriffeneFelderKnight(figurPos)[x]
					)
				}
			}

			if (figur === 'n') {
				for (
					let x = 0;
					x < angegriffeneFelderKnight(figurPos).length;
					x++
				) {
					angegriffeneFelderSchwarz.push(
						angegriffeneFelderKnight(figurPos)[x]
					)
				}
			}

			if (figur === 'R') {
				for (
					let x = 0;
					x <
					angegriffeneFelderRook(figurPos, brettState, weißAmZug).length;
					x++
				) {
					angegriffeneFelderWeiß.push(
						angegriffeneFelderRook(figurPos, brettState, weißAmZug)[x]
					)
				}
			}

			if (figur === 'r') {
				for (
					let x = 0;
					x <
					angegriffeneFelderRook(figurPos, brettState, weißAmZug).length;
					x++
				) {
					angegriffeneFelderSchwarz.push(
						angegriffeneFelderRook(figurPos, brettState, weißAmZug)[x]
					)
				}
			}

			if (figur === 'B') {
				for (
					let x = 0;
					x <
					angegriffeneFelderBishop(figurPos, brettState, weißAmZug).length;
					x++
				) {
					angegriffeneFelderWeiß.push(
						angegriffeneFelderBishop(figurPos, brettState, weißAmZug)[x]
					)
				}
			}

			if (figur === 'b') {
				for (
					let x = 0;
					x <
					angegriffeneFelderBishop(figurPos, brettState, weißAmZug).length;
					x++
				) {
					angegriffeneFelderSchwarz.push(
						angegriffeneFelderBishop(figurPos, brettState)[x]
					)
				}
			}

			if (figur === 'q') {
				for (
					let x = 0;
					x <
					angegriffeneFelderQueen(figurPos, brettState, weißAmZug).length;
					x++
				) {
					angegriffeneFelderSchwarz.push(
						angegriffeneFelderQueen(figurPos, brettState)[x]
					)
				}
			}

			if (figur === 'Q') {
				for (
					let x = 0;
					x <
					angegriffeneFelderQueen(figurPos, brettState, weißAmZug).length;
					x++
				) {
					angegriffeneFelderWeiß.push(
						angegriffeneFelderQueen(figurPos, brettState)[x]
					)
				}
			}

			if (figur === 'K') {
				for (
					let x = 0;
					x <
					angegriffeneFelderKing(figurPos, brettState, weißAmZug).length;
					x++
				) {
					angegriffeneFelderWeiß.push(
						angegriffeneFelderKing(figurPos, brettState)[x]
					)
				}
			}

			if (figur === 'k') {
				for (
					let x = 0;
					x <
					angegriffeneFelderKing(figurPos, brettState, weißAmZug).length;
					x++
				) {
					angegriffeneFelderSchwarz.push(
						angegriffeneFelderKing(figurPos, brettState)[x]
					)
				}
			}
		}
	}

	return [angegriffeneFelderWeiß, angegriffeneFelderSchwarz]
}

// BISHER REDUNDANT
// Funktion, um das Feld auszugeben, welches das rechte, linke, obere, untere Feld von Ausgangsfeld ist:
// bewegung: "rechts", "links", "unten", "oben"
function ausgangsFeld(feld, bewegung) {
	// zunächst feld in dem koordinaten system finden:
	// könnte und sollte vielleicht eigene funktion sein
	const i = koordinaten.findIndex((i) => i.includes(feld))
	const j = koordinaten[i].indexOf(feld)

	// fälle abfangen, in denen es kein zielfeld gibt, weil das Ausgangsfeld am Rand ist.
	if (
		(bewegung === 'oben' && i === 0) ||
		(bewegung === 'unten' && i === 7) ||
		(bewegung === 'rechts' && j === 7) ||
		(bewegung === 'links' && j === 0)
	) {
		return null
	}
	// oben: i - 1, j = j, unten: i + 1, j = j, rechts: i = i, j + 1, links: i = i, j - 1
	// die i und j werte, analog wie zuvor, die das Ausgangsfeld beschreiben
	let iAusgangsFeld = 0
	let jAusgangsFeld = 0

	switch (bewegung) {
		case 'oben':
			iAusgangsFeld = i - 1
			jAusgangsFeld = j
			break
		case 'unten':
			iAusgangsFeld = i + 1
			jAusgangsFeld = j
			break
		case 'rechts':
			iAusgangsFeld = i
			jAusgangsFeld = j + 1
			break
		case 'links':
			iAusgangsFeld = i
			jAusgangsFeld = j - 1
			break
	}

	return koordinaten[iAusgangsFeld][jAusgangsFeld]
}
