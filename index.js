// Aus der Sicht von Weiß
// bekommt noch eine Funktion, die ermittelt welches Feld +1 links, rechts, oben, unten liegt
const koordinaten = [
	['a8', 'b8', 'c8', 'd8', 'e8', 'f8', 'g8', 'h8'],
	['a7', 'b7', 'c7', 'd7', 'e7', 'f7', 'g7', 'h7'],
	['a6', 'b6', 'c6', 'd6', 'e6', 'f6', 'g6', 'h6'],
	['a5', 'b5', 'c5', 'd5', 'e5', 'f5', 'g5', 'h5'],
	['a4', 'b4', 'c4', 'd4', 'e4', 'f4', 'g4', 'h4'],
	['a3', 'b3', 'c3', 'd3', 'e3', 'f3', 'g3', 'h3'],
	['a2', 'b2', 'c2', 'd2', 'e2', 'f2', 'g2', 'h2'],
	['a1', 'b1', 'c1', 'd1', 'e1', 'f1', 'g1', 'h1'],
]

// konvertiert mathematische koordinaten i,j bzw. x,y zu f1, g3, a7 etc.

// Funktion, um das Feld auszugeben, welches das rechte, linke, obere, untere Feld von Ausgangsfeld ist:
// bewegung: "rechts", "links", "unten", "oben"
function ausgangsFeld(feld, bewegung) {
	// zunächst feld in dem koordinaten system finden:
	// könnte und sollte vielleicht eigene funktion sein
	const i = koordinaten.findIndex((i) => i.includes(feld))
	const j = koordinaten[i].indexOf(feld)

	console.log('i:', i, 'j:', j)
	// i ist position im ersten array, j position im zweiten
	console.log(koordinaten[i][j])

	// fälle abfangen, in denen es kein zielfeld gibt, weil das Ausgangsfeld am Rand ist.
	if (
		(bewegung === 'oben' && i === 0) ||
		(bewegung === 'unten' && i === 7) ||
		(bewegung === 'rechts' && j === 7) ||
		(bewegung === 'links' && j === 0)
	) {
		return null
	}
	// oben: i - 1, j = j, unten: i + 1, j = j, rechts: i = i, j + 1, links: i = i, j - 1
	// die i und j werte, analog wie zuvor, die das Ausgangsfeld beschreiben
	let iAusgangsFeld = 0
	let jAusgangsFeld = 0

	switch (bewegung) {
		case 'oben':
			iAusgangsFeld = i - 1
			jAusgangsFeld = j
			break
		case 'unten':
			iAusgangsFeld = i + 1
			jAusgangsFeld = j
			break
		case 'rechts':
			iAusgangsFeld = i
			jAusgangsFeld = j + 1
			break
		case 'links':
			iAusgangsFeld = i
			jAusgangsFeld = j - 1
			break
	}

	console.log('iAusgang:', iAusgangsFeld, 'jAusgang:', jAusgangsFeld)
	console.log(koordinaten[iAusgangsFeld][jAusgangsFeld])
}

ausgangsFeld('b8', 'rechts')

// Das Brett, mit den aktuellen Positionen der Figuren
// wenn Uppercase Buchstabe, dann weiße Figur - wird sammt State, Koordinate und Figur an
// die entsprechende Methode in der Klasse der Figur übergeben
const brettState = [
	['r', 'n', 'b', 'q', 'k', 'b', 'n', 'r'],
	['p', 'p', 'p', 'p', 'p', 'p', 'p', 'p'],
	['.', '.', '.', '.', '.', '.', '.', '.'],
	['.', '.', '.', '.', '.', '.', '.', '.'],
	['.', '.', '.', '.', '.', '.', '.', '.'],
	['.', '.', '.', '.', '.', '.', '.', '.'],
	['P', 'P', 'P', 'P', 'P', 'P', 'P', 'P'],
	['R', 'N', 'B', 'Q', 'K', 'B', 'N', 'R'],
]
