// Alles für den Springer / Knight

export function moeglicheZuegeKnight(ausgangsfeldKoord, brettState, weißAmZug) {
	const zuege = []

	const i = ausgangsfeldKoord[0]
	const j = ausgangsfeldKoord[1]

	// kann sich auf folgende Arten bewegen:
	// Wird nur aufgehalten, wenn sich auf dem Feld eine eigene Figur bewegt
	// i - 2, j - 1
	//i - 2, j + 1
	//i - 1, j - 2
	//i - 1, j + 2
	//i + 1, j - 2
	//i + 1, j + 2
	//i + 2, j - 1
	//i + 2, j + 1

	// für schwarz kommt noch hinzu (gehen ebenfalls für weiß)
	// i + 2, j - 1
	// i + 2, j + 1

	// überprüft ob die Koordinaten des Zielfeldes für den Springer legitim sind (noch auf dem Brett)
	// bekommt dann auch noch den check ob dort eine eigene figur ist
	function zielfeldLegitim(iVariation, jVariation) {
		// ob koordinate überhaupt verfügbar ist auf dem brett
		if (
			iVariation >= 0 &&
			jVariation >= 0 &&
			iVariation <= 7 &&
			jVariation <= 7
		) {
			if (weißAmZug) {
				// insofern dort keine eigene Figur steht, wird true returned, damit ist das Zielfeld legitim
				return !['Q', 'P', 'R', 'N', 'B', 'K'].includes(
					brettState[iVariation][jVariation]
				)
			}

			if (!weißAmZug) {
				return !['q', 'p', 'r', 'n', 'b', 'k'].includes(
					brettState[iVariation][jVariation]
				)
			}
		} else {
			return false
		}
	}

	// Der Springer wurde von weiß gezogen:

	// testen, ob mögliche L-Zug Felder durch eigene Figuren belegt sind. Falls nicht, zu den möglichen Zügen adden
	// und ob die mögliche position nicht außerhalb des spielfeldes ist.
	// kann eleganteren ansatz geben, hinsichtlich rekursion und der funktion für das navigieren über felder - rewrite!
	// muss alles in funktion umgeschrieben werden!

	if (zielfeldLegitim(i - 2, j - 1)) {
		zuege.push([i - 2, j - 1])
	}

	if (zielfeldLegitim(i - 2, j + 1)) {
		zuege.push([i - 2, j + 1])
	}

	if (zielfeldLegitim(i - 1, j - 2)) {
		zuege.push([i - 1, j - 2])
	}

	if (zielfeldLegitim(i - 1, j + 2)) {
		zuege.push([i - 1, j + 2])
	}

	if (zielfeldLegitim(i + 1, j - 2)) {
		zuege.push([i + 1, j - 2])
	}

	if (zielfeldLegitim(i + 1, j + 2)) {
		zuege.push([i + 1, j + 2])
	}

	if (zielfeldLegitim(i + 2, j - 1)) {
		zuege.push([i + 2, j - 1])
	}

	if (zielfeldLegitim(i + 2, j + 1)) {
		zuege.push([i + 2, j + 1])
	}

	// i + 2, j - 1
	// i + 2, j + 1
	// die zusätzlichen für die beiden schwarzen springer:
	if (zielfeldLegitim(i + 2, j - 1)) {
		zuege.push([i + 2, j - 1])
	}

	if (zielfeldLegitim(i + 2, j + 1)) {
		zuege.push([i + 2, j + 1])
	}

	// Der Springer wurde von schwarz gezogen
	if (!weißAmZug) {
	}

	return zuege
}
