import { moeglicheZuegeKing } from '../figuren/King'

// Eine Datei, die alle Funktionen enhalten soll, die schauen, welche Züge legitim sind nach einem Schach,
// oder ob es ein Schachmatt ist.

/**
 *
 * @param {*} brettState wie immer
 * @param {*} schachGegen Farbe, gegen die das Schachgebot ist "weiß" oder "schwarz"
 * @param {*} angriffeWeiß
 * @param {*} angriffeSchwarz
 * @param {*} posBetroffenerKing Position des Königs im Schach, damit von dort aus mögliche Züge generiert werden können
 * @return {*} gibt array von Möglichen Zügen für die bedrohte Seite zurück. Insofern das Array leer ist, ist
 * es matt.
 */
export function istMatt(
	brettState,
	schachGegen,
	angriffeWeiß,
	angriffeSchwarz,
	posBetroffenerKing
) {
	const legitimeZuege = []

	/* insofern es für die Farbe, gegen die das Schach ist, keine anderen Figuren gibt,
    wird direkt geschaut, ob der König nur noch in bedrohte Felder ziehen darf - dann ist es Matt. 
    Liste der Figuren wird am ehsten von der Struktur: [["r", [0, 2]], ["r", [7, 3]], ["p", [1, 4]]]
    */
	// Liste der Figuren der durch Schach betroffenen Seite. Format wie oben erwähnt. Wenn nur König, ist liste leer
	const figuren = []
	// über alle figuren der Seite im Schach gehen:
	for (let i = 0; i < 8; i++) {
		for (let j = 0; j < 8; j++) {
			if (
				schachGegen === 'weiß' &&
				['Q', 'R', 'N', 'B', 'P'].includes(brettState[i][j])
			) {
				const figurZeichen = brettState[i][j]

				figuren.push([figurZeichen, [i, j]])
			}

			if (
				schachGegen === 'schwarz' &&
				['q', 'r', 'n', 'b', 'p'].includes(brettState[i][j])
			) {
				const figurZeichen = brettState[i][j]

				figuren.push([figurZeichen, [i, j]])
			}
		}
	}

	console.log(schachGegen, 'hat folgende figuren:', figuren)

	// nur noch der könig. Alle möglichen Züge für ihn generieren. Dann für alle Testen, ob sie noch im angegriffenen
	// bereich liegen. Selbst wenn der König eine Figur dafür schlagen muss, ist das einbezogen:
	if (figuren.length === 0) {
		if (schachGegen === 'schwarz') {
			// schwarz am Zug

			const moeglicheZuege = moeglicheZuegeKing(
				posBetroffenerKing,
				brettState,
				false,
				angriffeWeiß,
				angriffeSchwarz
			)
			// muss noch unmgeschrieben werden, soll nur abfangen, dass arrays wie [ [] ] als rückgabe entstehen.
			if (moeglicheZuege.length > 0) {
				legitimeZuege.push(moeglicheZuege)
			}
		}
		if (schachGegen === 'weiß') {
			// weiß am Zug
			const moeglicheZuege = moeglicheZuegeKing(
				posBetroffenerKing,
				brettState,
				true,
				angriffeWeiß,
				angriffeSchwarz
			)
			if (moeglicheZuege.length > 0) {
				legitimeZuege.push(moeglicheZuege)
			}
		}
	}

	/* 
    Insofern er andere Figuren hat, werden für diese FIguren alle möglichen Züge getestet 
    (blocken und Schlagen der Schach-gebenden Figur inklusive). 
    Jeder zug wird auf eine Kopie von brettState übertragen und dann wird über diese Kopie alles an bedrohungen ausgegebn. Insofern 
    der König, der eben im Schach war, dann nicht mehr im Schach ist, ist der Zug legitim. Sollte auch ein Doppelschach erkennen. 

    */

	return legitimeZuege
}
