// Alles für den Springer / Knight

export function moeglicheZuegePawn() {
	const i = 0
	const j = 0
	// kann sich auf folgende Arten bewegen:
	// Wird nur aufgehalten, wenn sich auf dem Feld eine eigene Figur bewegt
	i - 2, j - 1
	i - 2, j + 1
	i - 1, j - 2
	i - 1, j + 2
	i + 1, j - 2
	i + 1, j + 2
	i + 2, j - 2
	i + 2, j + 2

	// 8 in summe
}
