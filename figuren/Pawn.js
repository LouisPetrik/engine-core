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
 * @returns zuege
 */
export function moeglicheZuegePawn(ausgangsfeldKoord, brettState, weißAmZug) {
	const zuege = ['']

	// testen, ob direkt vor dem bauer eine figur schlägt -> nicht ein feld und auch keine zwei züge möglich
	// Für weiß und schwarz muss das unterschiedlich behandelt werden. Weiß: i-1, Schwarz: i+1
	// Dafür handeln wir einen möglichen schwarzen und einen möglichen weißen Zug unabhängig

	const i = ausgangsfeldKoord[0]
	const j = ausgangsfeldKoord[1]

	// Der Bauer wurde von weiß gezogen:
	if (weißAmZug) {
		if (brettState[i - 1][j] == '.') {
			console.log('Feld direkt vor Bauer ist frei')
			// wird erstmals als i und j koordinate im array in den möglichen zügen gespeichert (ausgangsfeld)
			zuege.push([i - 1, j])

			// insofern 1 vor dem bauern frei ist, testen, ob zwei nach vorne aus grundstellung möglich ist:
			// Dafür muss Bauer in Grundlinie (für weiß, i = 6 sein)
			if (brettState[i - 2][j] == '.' && i == 6) {
				console.log('Doppelschritt aus Grundlinie möglich ')
				zuege.push([i - 2][j])
			} else {
				console.log('Doppelschritt für weißen Bauern nicht möglich')
			}
		} else {
			console.log('direkt vor weißem Bauer steht eine Figur')
		}
	}

	// Der Bauer wurde von schwarz gezogen
	if (!weißAmZug) {
	}

	return zuege
}
