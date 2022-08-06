// wird aktuell nicht eingebunden, stattdessen werden die konstanten
// direkt in der index.js verwendet - später aber eigene klasse

class Game {
	// so far, benötigen wir nichts im konstruktor

	static weißAmZug = true
	static posWeißerKing = 'e1'
	static posSchwarzerKing = 'e8'

	static weißHatRochiert = false
	static schwarzHatRochiert = false

	// Die Nummer des aktuellen Halbzuges (fängt bei logischerweise bei 1 an)
	static halbzugNummer = 1
}
