/**
 * Alle Züge, auf die ein Bishop ziehen kann. Wichtig: Gegnerische figuren kann er schlagen, eigene figuren blocken
 * natürlich
 * @param {*} ausgangsfeldKoord
 * @param {*} brettState
 * @param {*} weißAmZug
 */
export function moeglicheZuegeBishop(ausgangsfeldKoord, brettState, weißAmZug) {
	const zuege = []

	const i = ausgangsfeldKoord[0]
	const j = ausgangsfeldKoord[1]

	// von weiß aus gesehen, nach oben rechts
	for (let iTemp = i - 1; iTemp >= 0; iTemp--) {
		// differenz von iTemp und i ist der Wert zu J, da dieser sich auf bewegt.
	}
}

/**
 *
 * @param {*} ausgangsfeldKoord
 * @param {*} brettState
 * @returns Bisher wohl 2-dimensionales array
 */
export function angegriffeneFelderBishop(ausgangsfeldKoord, brettState) {
	const felder = []

	const i = ausgangsfeldKoord[0]
	const j = ausgangsfeldKoord[1]

	// alle bishops sind bisher hinsichtlich des j-abschnittes verschoben...
	function diagonaleAngriff(brettState, richtung) {
		const felderAufDiagonale = []

		for (let x = 1; x <= 7; x++) {
			// schwarzer bishop oben rechts: 0, 7. Diagonale unten links
			// anderes beispiel: schwarzer bishop 2, 0
			let iTemp = i
			let jTemp = j

			// Richtung immer von weiß ausgehend
			if (richtung === 'oben-rechts' && i - x >= 0 && j + x <= 7) {
				iTemp = i - x
				jTemp = j + x
			}

			if (richtung === 'oben-links' && i - x >= 0 && j - x >= 0) {
				iTemp = i - x
				jTemp = j - x
			}

			if (richtung === 'unten-rechts' && i + x <= 7 && j + x <= 7) {
				iTemp = i + x
				jTemp = j + x
			}

			if (richtung === 'unten-links' && i + x <= 7 && j - x >= 0) {
				iTemp = i + x
				jTemp = j - x
			}
			// sobald irgendwo ein Rand erreicht ist
			// Hier ist etwas falsch
			felderAufDiagonale.push([iTemp, jTemp])
			if (iTemp === 0 || iTemp === 7 || jTemp === 0 || jTemp === 7) {
				break
			}

			// wenn eine eigene oder gegnerische Figur gefunden wird, wird dieses Feld noch
			// aufgenommen, da es angegriffen / gedeckt wird.
			if (brettState[iTemp][jTemp] !== '.') {
				felderAufDiagonale.push([i, jTemp])
				break
			}
		}

		return felderAufDiagonale
	}
	// von weiß aus gesehen nach oben rechts

	// jetzt über alle diagonalen gehen und die einzelnen felder zusammenführen:
	// dafür spread operator, da diagnoaleAngriff bereits einen zweidimensionales array zurückgibt.
	felder.push(
		...diagonaleAngriff(brettState, 'oben-rechts'),
		...diagonaleAngriff(brettState, 'oben-links'),
		...diagonaleAngriff(brettState, 'unten-rechts'),
		...diagonaleAngriff(brettState, 'unten-links')
	)

	console.log('Felder aus Bishop.js:')
	console.log(felder)
	return felder
}
