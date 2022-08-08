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
	//i + 2, j - 2
	//i + 2, j + 2

	// überprüft ob die Koordinaten des Zielfeldes für den Springer legitim sind (noch auf dem Brett)
	// bekommt dann auch noch den check ob dort eine eigene figur ist
	function koordinatenLegitim(iTemp, jTemp) {
		if (iTemp >= 0 && jTemp >= 0 && iTemp <= 7 && jTemp <= 7) {
			if (weißAmZug) {
				return !['Q', 'P', 'R', 'N', 'B', 'K'].includes(
					brettState[i - 2][j - 1]
				)
			}

			if (!weißAmZug) {
			}
		} else {
			return false
		}
	}

	// Der Springer wurde von weiß gezogen:
	if (weißAmZug) {
		// testen, ob mögliche L-Zug Felder durch eigene Figuren belegt sind. Falls nicht, zu den möglichen Zügen adden
		// und ob die mögliche position nicht außerhalb des spielfeldes ist.
		// kann eleganteren ansatz geben, hinsichtlich rekursion und der funktion für das navigieren über felder - rewrite!
		// muss alles in funktion umgeschrieben werden!

		if (
			koordinatenLegitim(i - 2, j - 1) &&
			!['Q', 'P', 'R', 'N', 'B', 'K'].includes(brettState[i - 2][j - 1])
		) {
			zuege.push([i - 2, j - 1])
		}

		if (
			koordinatenLegitim(i - 2, j + 1) &&
			!['Q', 'P', 'R', 'N', 'B', 'K'].includes(brettState[i - 2][j + 1])
		) {
			zuege.push([i - 2, j + 1])
		}

		if (
			i - 1 >= 0 &&
			i - 1 <= 7 &&
			j - 2 >= 0 &&
			j - 2 <= 7 &&
			!['Q', 'P', 'R', 'N', 'B', 'K'].includes(brettState[i - 1][j - 2])
		) {
			zuege.push([i - 1, j - 2])
		}

		if (
			i - 1 >= 0 &&
			i - 1 <= 7 &&
			j + 2 >= 0 &&
			j + 2 <= 7 &&
			!['Q', 'P', 'R', 'N', 'B', 'K'].includes(brettState[i - 1][j + 2])
		) {
			zuege.push([i - 1, j + 2])
		}

		if (
			i + 1 >= 0 &&
			i + 1 <= 7 &&
			j - 2 >= 0 &&
			j - 2 <= 7 &&
			!['Q', 'P', 'R', 'N', 'B', 'K'].includes(brettState[i + 1][j - 2])
		) {
			zuege.push([i + 1, j - 2])
		}

		if (
			i + 1 >= 0 &&
			i + 1 <= 7 &&
			j + 2 >= 0 &&
			j + 2 <= 7 &&
			!['Q', 'P', 'R', 'N', 'B', 'K'].includes(brettState[i + 1][j + 2])
		) {
			zuege.push([i + 1, j + 2])
		}

		if (
			i + 2 >= 0 &&
			i + 2 <= 7 &&
			j - 2 >= 0 &&
			j - 2 <= 7 &&
			!['Q', 'P', 'R', 'N', 'B', 'K'].includes(brettState[i + 2][j - 2])
		) {
			zuege.push([i + 2, j - 2])
		}

		if (
			i + 2 >= 0 &&
			i + 2 <= 7 &&
			j + 2 >= 0 &&
			j + 2 <= 7 &&
			!['Q', 'P', 'R', 'N', 'B', 'K'].includes(brettState[i + 2][j + 2])
		) {
			zuege.push([i + 2, j + 2])
		}
	}

	// Der Springer wurde von schwarz gezogen
	if (!weißAmZug) {
	}

	return zuege
}
