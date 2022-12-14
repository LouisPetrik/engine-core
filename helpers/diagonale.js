/**
 * Kann sowohl alle Felder in allen diagnolen ausgeben, die die figur deckt (dame und läufer)
 * oder alle felder, auf die die figur ziehen kann (geblockt von eigenen figuren aber schlagen möglich )
 * @param {*} brettState
 * @param {*} richtung
 * @param {*} modus entweder "angriff" oder "zuege" wobei züge alle möglichen zielfelder der figur ausgibt.
 * @param {*} weißAmZug selbsterklärend
 * @returns
 */
export function diagonaleFelder(
	brettState,
	ausgangsfeldKoord,
	richtung,
	modus,
	weißAmZug
) {
	const felderAufDiagonale = []

	const i = ausgangsfeldKoord[0]
	const j = ausgangsfeldKoord[1]

	// true insofern auf eine eigene figur in der diagnale gestoßen wird. Sobald das der fall ist,
	// werden die felder dahinter (mit den weiteren durchläufen nicht aufgenommen. )
	let geblockt = false

	for (let x = 1; x <= 7; x++) {
		if (!geblockt) {
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

			if (modus === 'angriff') {
				// wenn eine eigene oder gegnerische Figur gefunden wird, wird dieses Feld noch
				// aufgenommen, da es angegriffen / gedeckt wird.
				if (brettState[iTemp][jTemp] !== '.') {
					felderAufDiagonale.push([iTemp, jTemp])
					break
				}
			}

			if (modus === 'zuege') {
				// insofern eine gegnerische figur gefunden wird, ist das feld noch ziehbar.
				// Wenn es eine eigene figur ist, wird der weg dadurch geblockt und das feld selbst nicht aufgenommen.
				if (
					weißAmZug &&
					['q', 'k', 'r', 'n', 'b', 'p'].includes(brettState[iTemp][jTemp])
				) {
					felderAufDiagonale.push([iTemp, jTemp])
				}
				// auf eigene figur gestoßen, feld wird nicht aufgenommen und loop abgebrochen
				if (
					weißAmZug &&
					['Q', 'K', 'R', 'N', 'B', 'P'].includes(brettState[iTemp][jTemp])
				) {
					geblockt = true
					break
				}

				if (
					!weißAmZug &&
					['Q', 'K', 'R', 'N', 'B', 'P'].includes(brettState[iTemp][jTemp])
				) {
					felderAufDiagonale.push([iTemp, jTemp])
				}
				// auf eigene figur gestoßen, feld wird nicht aufgenommen und loop abgebrochen
				if (
					!weißAmZug &&
					['q', 'k', 'r', 'n', 'b', 'p'].includes(brettState[iTemp][jTemp])
				) {
					geblockt = true
					break
				}
			}

			// der standpunkt der figur selbst zählt nicht als angegriffen durch sich selbst:
			if (iTemp != i && jTemp != j) {
				felderAufDiagonale.push([iTemp, jTemp])
			}

			// kann vielleicht noch hinsichtlich der anzahl der durchläufe optimiert werden.
			if (iTemp === 0 || iTemp === 7 || jTemp === 0 || jTemp === 7) {
				break
			}
		}
	}

	return felderAufDiagonale
}
