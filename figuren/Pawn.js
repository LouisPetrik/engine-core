import { feldbezeichnungZuKoord } from '../Util.js'

// Alle benannt nach den englischen Begriffen, da so auch die Notation
// erfolgt.

/* generiert ein array von möglichen zügen. Könnte auch true / false zurückgeben also
ob ein Zug legitim ist, da eine liste von möglichen zügen aber auch noch für die engine selbst nötig ist
bleibt es dabei */

/* Dabei wichtig ist z. B. dass gecheckt wird, ob der Pawn in der ausgangslage ist, also 
ob die beiden züge nach vorne noch möglich sind - zum testen dafür einfach aktuelle position und wenn diese 
bei weiß in höhe 2 und für schwarz in höhe 7 ist, ist der bauer in ausgangslage. */

/**
 *
 * @param {*} ausgangsfeldKoord Tupel-Array aus i und j Wert der Koordinate, also im brettState
 * @param {*} brettState Aktueller Zustand des Brettes als exakt das "brettState" aus index.js
 * @param {*} weißAmZug wie in index.js. Wichtig, damit nicht die eigenen Figuren geschlagen werden
 * @param {*} enPassantBauer enthält die Koordinaten eines Bauers, der im nächsten Zug durch en-passant geschlagen werden kann.
 * @returns zuege
 */
export function moeglicheZuegePawn(
	ausgangsfeldKoord,
	brettState,
	weißAmZug,
	enPassantBauer
) {
	const zuege = []

	// testen, ob direkt vor dem bauer eine figur schlägt -> nicht ein feld und auch keine zwei züge möglich
	// Für weiß und schwarz muss das unterschiedlich behandelt werden. Weiß: i-1, Schwarz: i+1
	// Dafür handeln wir einen möglichen schwarzen und einen möglichen weißen Zug unabhängig

	const i = ausgangsfeldKoord[0]
	const j = ausgangsfeldKoord[1]

	// Der Bauer wurde von weiß gezogen:
	if (weißAmZug) {
		if (brettState[i - 1][j] == '.') {
			//console.log('Feld direkt vor Bauer ist frei')
			// wird erstmals als i und j koordinate im array in den möglichen zügen gespeichert (ausgangsfeld)
			zuege.push([i - 1, j])

			// insofern 1 vor dem bauern frei ist, testen, ob zwei nach vorne aus grundstellung möglich ist:
			// Dafür muss Bauer in Grundlinie (für weiß, i = 6 sein)
			// hier habe ich den bug gefunden, dass i - 2 immer überprüft wird, auch wenn der Bauer auf höhe 0 steht, also negative
			// i-werte entstehen. Muss abgefangen werden in dem i === 6 zuerst überprüft wird:
			if (i === 6) {
				if (brettState[i - 2][j] == '.') {
					//console.log('Doppelschritt aus Grundlinie möglich ')
					zuege.push([i - 2, j])
				} else {
					// direkt vor dem bauern in der grundlinie steht eine figur
				}
			}
		}

		// testen, ob weiß nach oben-rechts schlagen kann
		if (['q', 'p', 'r', 'n', 'b'].includes(brettState[i - 1][j + 1])) {
			console.log(
				'gegnerische, schlagbare Figur steht oben-rechts von weißem Bauern'
			)
			zuege.push([i - 1, j + 1])
		}

		// testen, ob weiß nach oben-links schlagen kann
		if (['q', 'p', 'r', 'n', 'b'].includes(brettState[i - 1][j - 1])) {
			console.log(
				'gegnerische, schlagbare Figur steht oben-links von weißem Bauern'
			)
			zuege.push([i - 1, j - 1])
		}

		// testen, ob en-passant möglich ist: Wenn bauer neben weißem bauern steht, und der en-passant bauer aus der index.js ist.

		if (enPassantBauer !== null) {
			// en passant nach rechts:
			if (
				['p'].includes(brettState[i][j + 1]) &&
				enPassantBauer[0] == i &&
				enPassantBauer[1] == j + 1
			) {
				console.log(
					'Für weiß: En passant schlageng mit ziel',
					i - 1,
					j + 1,
					'möglich'
				)
				zuege.push([i - 1, j + 1])
			}

			// en passant nach links
			if (
				['p'].includes(brettState[i][j - 1]) &&
				enPassantBauer[0] == i &&
				enPassantBauer[1] == j - 1
			) {
				console.log(
					'Für weiß: En passant schlageng mit ziel',
					i - 1,
					j - 1,
					'möglich'
				)
				zuege.push([i - 1, j - 1])
			}
		}
	}

	// Der Bauer wurde von schwarz gezogen
	if (!weißAmZug) {
		if (brettState[i + 1][j] == '.') {
			//console.log('Feld direkt vor Bauer ist frei')
			// wird erstmals als i und j koordinate im array in den möglichen zügen gespeichert (ausgangsfeld)
			zuege.push([i + 1, j])

			// insofern 1 vor dem bauern frei ist, testen, ob zwei nach vorne aus grundstellung möglich ist:
			// Dafür muss Bauer in Grundlinie (für weiß, i = 6 sein)
			if (brettState[i + 2][j] == '.' && i == 1) {
				//console.log('Doppelschritt aus Grundlinie möglich ')
				zuege.push([i + 2, j])
			} else {
				//console.log('Doppelschritt für weißen Bauern nicht möglich')
			}
		} else {
			//console.log('direkt vor weißem Bauer steht eine Figur')
		}

		// testen, ob schwarz nach unten-rechts schlagen kann
		if (['Q', 'P', 'R', 'N', 'B'].includes(brettState[i + 1][j + 1])) {
			console.log(
				'gegnerische, schlagbare Figur steht unten-rechts von schwarzen Bauern'
			)
			zuege.push([i + 1, j + 1])
		}

		// testen, ob schwarz nach unten-links schlagen kann
		if (['Q', 'P', 'R', 'N', 'B'].includes(brettState[i + 1][j - 1])) {
			console.log(
				'gegnerische, schlagbare Figur steht unten-links von schwarzem Bauern'
			)
			zuege.push([i + 1, j - 1])
		}

		// testen, ob en passant schlagen möglich ist

		if (enPassantBauer !== null) {
			// en passant nach rechts:

			if (
				['P'].includes(brettState[i][j + 1]) &&
				enPassantBauer[0] == i &&
				enPassantBauer[1] == j + 1
			) {
				zuege.push([i + 1, j + 1])
				console.log(
					'Für schwarz: En passant schlagen mit ziel',
					i + 1,
					',',
					j + 1,
					'möglich'
				)
			}

			// en passant nach links
			if (
				['P'].includes(brettState[i][j - 1]) &&
				enPassantBauer[0] == i &&
				enPassantBauer[1] == j - 1
			) {
				zuege.push([i + 1, j - 1])
				console.log(
					'Für schwarz: En passant schlagen mit ziel',
					i + 1,
					',',
					j - 1,
					'möglich'
				)
			}
		}
	}

	return zuege
}

// Alle Figuren bis auf die Bauern greifen auch die Felder an, auf die sie ziehen können - die Bauern
// greifen nur oben links und rechts von sich an.
// @brettState bisher redundant, da alle felder, nicht nur unbesetzte gezählt werdenb
export function angegriffeneFelderPawn(ausgangsfeldKoord, farbe) {
	// felder hat selbes format wie zuege in der funktion zuvor.
	// für weiß i - 1, j + 1 und i - 1, j - 1. Alle Felder, die angegriffen werden könnten, zählen - auch wenn eine eigene oder
	// gegnerische Figur auf diesem feld steht (akuter angriff / deckung einer figur)
	// Hier müsste theoretisch auch noch
	const felder = []

	const i = ausgangsfeldKoord[0]
	const j = ausgangsfeldKoord[1]

	// kann man noch zusammenfassen.

	if (farbe === 'weiß') {
		if (i - 1 >= 0 && j - 1 >= 0) {
			felder.push([i - 1, j - 1])
		}

		if (i - 1 >= 0 && j + 1 <= 7) {
			felder.push([i - 1, j + 1])
		}
	}

	if (farbe === 'schwarz') {
		if (i + 1 <= 7 && j - 1 >= 0) {
			felder.push([i + 1, j - 1])
		}

		if (i + 1 <= 7 && j + 1 <= 7) {
			felder.push([i + 1, j + 1])
		}
	}

	return felder
}
