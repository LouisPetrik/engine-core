// Alle benannt nach den englischen Begriffen, da so auch die Notation
// erfolgt.
class Pawn {
	// generiert ein array von möglichen zügen. Könnte auch true / false zurückgeben,
	// ob ein Zug legitim ist, da eine liste von möglichen zügen aber auch noch für die engine selbst nötig ist
	// bleibt es dabei

	/* Dabei wichtig ist z. B. dass gecheckt wird, ob der Pawn in der ausgangslage ist, also 
    ob die beiden züge nach vorne noch möglich sind - zum testen dafür einfach aktuelle position und wenn diese 
    bei weiß in höhe 2 und für schwarz in höhe 7 ist, ist der bauer in ausgangslage. 
    */
	static moeglicheZuege(ausgangsfeld, zielfeld) {
		const zuege = []

		return zuege
	}
}
