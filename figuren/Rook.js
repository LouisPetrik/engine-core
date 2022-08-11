// Zum testen, ob ein Feld noch auf dem Brett ist.
// Ist die selbe funktion wie in der Knight datei, daher muss noch zusammengefasst werden.
function feldAufBrett(iVariation, jVariation) {
	if (
		iVariation >= 0 &&
		jVariation >= 0 &&
		iVariation <= 7 &&
		jVariation <= 7
	) {
		return true
	} else {
		return false
	}
}

/**
 * Gibt all die Felder aus, die der Rook bedroht. Linien in 4 Richtungen, bis zu einer eigenen
 * oder gegnerischen Figur (aber inklusive dieses Feld (Drohung / Deckung))
 * @param {*} ausgangsfeldKoord
 * @return zweidimensionales Array, also liste von tupeln.
 */
export function angegriffeneFelderRook(ausgangsfeldKoord, brettState) {
	const felder = []

	const i = ausgangsfeldKoord[0]
	const j = ausgangsfeldKoord[1]

	// von weiß aus nach oben:

	for (let iTemp = i - 1; iTemp >= 0; iTemp--) {
		// eine Figur steht dort. Dann wird dieses Feld noch aufgenommen in die gedeckten / angegriffenen Felder
		// alles danach in der linie (weiter nach oben) entfällt aber

		felder.push([iTemp, j])
		if (brettState[iTemp][j] !== '.') {
			felder.push([iTemp, j])
			//felder.push([iTemp, j])
			break
		}
	}

	// von weiß aus nach unten:
	for (let iTemp = i + 1; iTemp <= 7; iTemp++) {
		// eine Figur steht dort. Dann wird dieses Feld noch aufgenommen in die gedeckten / angegriffenen Felder
		// alles danach in der linie (weiter nach oben) entfällt aber

		felder.push([iTemp, j])
		if (brettState[iTemp][j] !== '.') {
			felder.push([iTemp, j])
			//felder.push([iTemp, j])
			break
		}
	}

	// von weiß und schwarz aus nach links:
	for (let jTemp = j - 1; jTemp >= 0; jTemp--) {
		// eine Figur steht dort. Dann wird dieses Feld noch aufgenommen in die gedeckten / angegriffenen Felder
		// alles danach in der linie (weiter nach oben) entfällt aber
		felder.push([i, jTemp])
		if (brettState[i][jTemp] !== '.') {
			felder.push([i, jTemp])
			break
		}
	}

	// von weiß und schwarz aus nach rechts:
	for (let jTemp = j + 1; jTemp <= 7; jTemp++) {
		// eine Figur steht dort. Dann wird dieses Feld noch aufgenommen in die gedeckten / angegriffenen Felder
		// alles danach in der linie (weiter nach oben) entfällt aber
		felder.push([i, jTemp])
		if (brettState[i][jTemp] !== '.') {
			felder.push([i, jTemp])
			break
		}
	}

	return felder
}

/**
 * EIne funktion zur Überprüfung aller möglichen Felder, auf die der Rook ziehen kann.
 * Falls true, kann der Zug in der zuege-liste in der moeglicheZuegeRook funktion aufgenommen werden.
 * Nur zum Testen ob der Rook dahin ziehen kann, nicht ob der Rook dort deckt / angreift!
 */
function moeglicherZugValide(iVariation, jVariation, brettState, weißAmZug) {}
/**
 * Gibt alle Felder aus, auf die der Rook ziehen kann. Linien in 4 Richtungen aber geblockt durch eigene figuren. Nicht geblockt
 * durch gegnerische Figuren (inklusive)
 * @param {*} ausgangsfeldKoord
 * @param {*} brettState
 */
export function moeglicheZuegeRook(ausgangsfeldKoord, brettState, weißAmZug) {
	const zuege = []

	const i = ausgangsfeldKoord[0]
	const j = ausgangsfeldKoord[1]

	for (let iTemp = i - 1; iTemp >= 0; iTemp--) {
		// eine Figur steht dort. Dann wird dieses Feld noch aufgenommen in die gedeckten / angegriffenen Felder
		// alles danach in der linie (weiter nach oben) entfällt aber

		// Wenn Weiß am Zug ist, kann der Rook auf Felder ziehen, auf denen schwarze figuren stehen -
		// wird aber geblockt durch eigene Figuren
		// SObald es funktioniert muss das alles in eine Funktion ausgelagert werden.

		if (weißAmZug) {
			if (['Q', 'K', 'P', 'R', 'B', 'N'].includes(brettState[iTemp][j])) {
				break
			} else {
				zuege.push([iTemp, j])
			}

			if (['q', 'k', 'p', 'r', 'b', 'n'].includes(brettState[iTemp][j])) {
				zuege.push([iTemp, j])
				break
			}
		}
		if (!weißAmZug) {
			if (['q', 'k', 'p', 'r', 'b', 'n'].includes(brettState[iTemp][j])) {
				break
			} else {
				zuege.push([iTemp, j])
			}

			if (['Q', 'K', 'P', 'R', 'B', 'N'].includes(brettState[iTemp][j])) {
				zuege.push([iTemp, j])
				break
			}
		}
	}

	// von weiß aus nach unten:
	for (let iTemp = i + 1; iTemp <= 7; iTemp++) {
		// eine Figur steht dort. Dann wird dieses Feld noch aufgenommen in die gedeckten / angegriffenen Felder
		// alles danach in der linie (weiter nach oben) entfällt aber

		if (weißAmZug) {
			if (['Q', 'K', 'P', 'R', 'B', 'N'].includes(brettState[iTemp][j])) {
				break
			} else {
				zuege.push([iTemp, j])
			}

			if (['q', 'k', 'p', 'r', 'b', 'n'].includes(brettState[iTemp][j])) {
				zuege.push([iTemp, j])
				break
			}
		}
		if (!weißAmZug) {
			if (['q', 'k', 'p', 'r', 'b', 'n'].includes(brettState[iTemp][j])) {
				break
			} else {
				zuege.push([iTemp, j])
			}

			if (['Q', 'K', 'P', 'R', 'B', 'N'].includes(brettState[iTemp][j])) {
				zuege.push([iTemp, j])
				break
			}
		}
	}

	// von weiß und schwarz aus nach links:
	for (let jTemp = j - 1; jTemp >= 0; jTemp--) {
		if (weißAmZug) {
			if (['Q', 'K', 'P', 'R', 'B', 'N'].includes(brettState[i][jTemp])) {
				break
			} else {
				zuege.push([i, jTemp])
			}

			if (['q', 'k', 'p', 'r', 'b', 'n'].includes(brettState[i][jTemp])) {
				zuege.push([i, jTemp])
				break
			}
		}
		if (!weißAmZug) {
			if (['q', 'k', 'p', 'r', 'b', 'n'].includes(brettState[i][jTemp])) {
				break
			} else {
				zuege.push([i, jTemp])
			}

			if (['Q', 'K', 'P', 'R', 'B', 'N'].includes(brettState[i][jTemp])) {
				zuege.push([i, jTemp])
				break
			}
		}
	}

	// von weiß und schwarz aus nach rechts:
	for (let jTemp = j + 1; jTemp <= 7; jTemp++) {
		if (weißAmZug) {
			if (['Q', 'K', 'P', 'R', 'B', 'N'].includes(brettState[i][jTemp])) {
				break
			} else {
				zuege.push([i, jTemp])
			}

			if (['q', 'k', 'p', 'r', 'b', 'n'].includes(brettState[i][jTemp])) {
				zuege.push([i, jTemp])
				break
			}
		}
		if (!weißAmZug) {
			if (['q', 'k', 'p', 'r', 'b', 'n'].includes(brettState[i][jTemp])) {
				break
			} else {
				zuege.push([i, jTemp])
			}

			if (['Q', 'K', 'P', 'R', 'B', 'N'].includes(brettState[i][jTemp])) {
				zuege.push([i, jTemp])
				break
			}
		}
	}

	return zuege
}
