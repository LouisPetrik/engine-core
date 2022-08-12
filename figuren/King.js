/**
 * Greift fix alle 8 Felder um sich herum an.
 * @param {*} ausgangsfeldKoord
 * @param {*} brettState
 * @param {*} weißAmZug
 */
export function angegriffeneFelderKing(
	ausgangsfeldKoord,
	brettState,
	weißAmZug
) {
	const felder = []

	const i = ausgangsfeldKoord[0]
	const j = ausgangsfeldKoord[1]

	function koordAufBrett(iVariation, jVariation) {
		if (
			iVariation < 0 ||
			iVariation > 7 ||
			jVariation < 0 ||
			jVariation > 7
		) {
			return false
		} else {
			return true
		}
	}

	if (koordAufBrett(i - 1, j)) {
		felder.push([i - 1, j])
	}

	if (koordAufBrett(i - 1, j + 1)) {
		felder.push([i - 1, j + 1])
	}

	if (koordAufBrett(i, j + 1)) {
		felder.push([i, j + 1])
	}

	if (koordAufBrett(i + 1, j + 1)) {
		felder.push([i + 1, j + 1])
	}

	if (koordAufBrett(i + 1, j)) {
		felder.push([i + 1, j])
	}

	if (koordAufBrett(i + 1, j - 1)) {
		felder.push([i + 1, j - 1])
	}

	if (koordAufBrett(i, j - 1)) {
		felder.push([i, j - 1])
	}
	if (koordAufBrett(i - 1, j - 1)) {
		felder.push([i - 1, j - 1])
	}

	return felder
}

/**
 * Gibt alle möglichen Felder aus, auf die der King ziehen kann - muss auf dem Brett liegen.
 * Feld darf nicht durch eigene Figur geblockt sein. Wenn zielfeld durch gegnerische Figur besetzt, darf nur geschlagen
 * werden, wenn dieses feld nicht durch einen angriff gedeckt ist, und sich der könig somit im schach befinden würde.
 * @param {*} ausgangsfeldKoord
 * @param {*} brettState
 * @param {*} weißAmZug
 * @param {*} angriffeWeiß
 * @param {*} angriffeSchwarz
 */
export function moeglicheZuegeKing(
	ausgangsfeldKoord,
	brettState,
	weißAmZug,
	angriffeWeiß,
	angriffeSchwarz
) {
	const zuege = []

	const i = ausgangsfeldKoord[0]
	const j = ausgangsfeldKoord[1]

	function zielfeldLegitim(iVariation, jVariation) {
		if (
			iVariation < 0 ||
			iVariation > 7 ||
			jVariation < 0 ||
			jVariation > 7
		) {
			return false
		} else {
			// jetzt noch prüfen, ob das Feld blockiert ist oder dort geschlagen werden kann.
			// bzw. ob der könig danach im schach steht - sollte das später erst gecheckt werden?

			// insofern weiß ziehen will auf ein feld mit einer weißen figur, analog für schwarz
			if (
				(weißAmZug &&
					['Q', 'R', 'N', 'B', 'P'].includes(
						brettState[(iVariation, jVariation)]
					)) ||
				(!weißAmZug &&
					['q', 'r', 'n', 'b', 'p'].includes(
						brettState[(iVariation, jVariation)]
					))
			) {
				console.log('König durch eigene figur geblockt ')
				return false
			}

			// insofern das feld durch eine gegnerische figur gedeckt ist
			if (
				(weißAmZug && angriffeSchwarz[iVariation][jVariation] === 'A') ||
				(!weißAmZug && angriffeWeiß[iVariation][jVariation] === 'A')
			) {
				return false
			}
		}

		return true
	}

	if (zielfeldLegitim(i - 1, j)) {
		zuege.push([i - 1, j])
	}

	if (zielfeldLegitim(i - 1, j + 1)) {
		zuege.push([i - 1, j + 1])
	}

	if (zielfeldLegitim(i, j + 1)) {
		zuege.push([i, j + 1])
	}

	if (zielfeldLegitim(i + 1, j + 1)) {
		zuege.push([i + 1, j + 1])
	}

	if (zielfeldLegitim(i + 1, j)) {
		zuege.push([i + 1, j])
	}

	if (zielfeldLegitim(i + 1, j - 1)) {
		zuege.push([i + 1, j - 1])
	}

	if (zielfeldLegitim(i, j - 1)) {
		zuege.push([i, j - 1])
	}
	if (zielfeldLegitim(i - 1, j - 1)) {
		zuege.push([i - 1, j - 1])
	}

	return zuege
}
