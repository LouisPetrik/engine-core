import { moeglicheZuegeKing } from '../figuren/King'
import { moeglicheZuegeQueen } from '../figuren/Queen'
import { moeglicheZuegeBishop } from '../figuren/Bishop'
import { angriffeFinden, isArrayInArray } from '../Util'
import { moeglicheZuegeKnight } from '../figuren/Knight'
import { moeglicheZuegeRook } from '../figuren/Rook'
import { moeglicheZuegePawn } from '../figuren/Pawn'
// Eine Datei, die alle Funktionen enhalten soll, die schauen, welche Züge legitim sind nach einem Schach,
// oder ob es ein Schachmatt ist.

/**
 * Hilfsfunktion, die Züge einer übergebenen Figur zurückgibt, die das Schach
 * aufheben.
 * @param posFigur
 * @param zuegeFigur
 * @param brettState
 * @param posBetroffenerKing
 * @param schachGegen
 */
function hebtZugSchachAuf(
	posFigur,
	zuegeFigur,
	brettState,
	posBetroffenerKing,
	schachGegen
) {
	const aufhebendeZuege = []
	const iAktuell = posFigur[0]
	const jAktuell = posFigur[1]

	for (let i = 0; i < zuegeFigur.length; i++) {
		// den Zug der Figur auf den kopierten brett state bringen:
		// WICHTIG: Muss Kopie sein, keine Referenz, da brettState selbst nicht mutated werden darf
		// Daher wird zuerst leeres 8 mal 8 array erstellt und dann mit den werten aus brettState gefüllt.
		// Array.from(brettState) geht irgendwie nicht.
		const brettStateKopie = Array.from(Array(8), () =>
			new Array(8).fill(null)
		)

		for (let x = 0; x < 8; x++) {
			for (let y = 0; y < 8; y++) {
				brettStateKopie[x][y] = brettState[x][y]
			}
		}

		const figurZeichen = brettStateKopie[iAktuell][jAktuell]

		const iZielfeld = zuegeFigur[i][0]
		const jZielfeld = zuegeFigur[i][1]

		brettStateKopie[iAktuell][jAktuell] = '.'
		brettStateKopie[iZielfeld][jZielfeld] = figurZeichen

		const iPosKing = posBetroffenerKing[0]
		const jPosKing = posBetroffenerKing[1]

		if (schachGegen === 'schwarz') {
			// angriffe ist dreidimensionales array mit allen feldern, die angegriffen werden (nicht visuell mit As und . !)
			// für benutzung in Util.js nachschauen.
			const angriffeWeiß = angriffeFinden(brettStateKopie, false)[0]
			// wieso enhalten die angriffeWeiß das feld mit dem könig nicht?
			// Weil der ausgeführt zug noch nicht auf der brettstate kopie war.

			// insofern das Feld des Königs durch den möglichen Zug dann nicht mehr angegriffen wird
			if (!isArrayInArray(angriffeWeiß, posBetroffenerKing)) {
				aufhebendeZuege.push(zuegeFigur[i])
			}
		}
		if (schachGegen === 'weiß') {
			const angriffeSchwarz = angriffeFinden(brettStateKopie, true)[1]
			// wieso enhalten die angriffeWeiß das feld mit dem könig nicht?
			// Weil der ausgeführt zug noch nicht auf der brettstate kopie war.

			// insofern das Feld des Königs durch den möglichen Zug dann nicht mehr angegriffen wird
			if (!isArrayInArray(angriffeSchwarz, posBetroffenerKing)) {
				aufhebendeZuege.push(zuegeFigur[i])
			}
		}
	}

	return aufhebendeZuege
}
/**
 *
 * @param {*} brettState wie immer
 * @param {*} schachGegen Farbe, gegen die das Schachgebot ist "weiß" oder "schwarz"
 * @param {*} angriffeWeiß
 * @param {*} angriffeSchwarz
 * @param {*} posBetroffenerKing Position des Königs im Schach, damit von dort aus mögliche Züge generiert werden können
 * @param {*} enPassantBauer, bauer, der aktuell en passant genommen werden kann - wichtig für die bauern datei
 * @return {*} gibt array von Möglichen Zügen für die bedrohte Seite zurück. Insofern das Array leer ist, ist
 * es matt.
 */
export function istMatt(
	brettState,
	schachGegen,
	angriffeWeiß,
	angriffeSchwarz,
	posBetroffenerKing,
	enPassantBauer
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

	// hier ist die position des bishops noch normal, bevor sie fälschlicher weise verändert wird.
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
		// es gibt noch andere figuren, die die Seite im Schach hat.
	} else {
		/* jetzt für die verbleibenden figuren der seite über alle möglichen züge gehen, 
        und dann die möglichen brett-states über funktion für die bedrohungen übergeben. Wenn dann in einer dieser
        outcomes der könig nicht mehr im schach steht, wird er gepushed. 
        Muss noch massiv verkürzt / vereinfacht werden . Kann zu einer Funktion vereinfacht werden, die bei der moeglicheZuege basierend auf figur 
        // generiert wird. im fall von schachGegen schwarz oder weiß kann für weißAmZug einfach schachGegen ? "" : "" syntax genutzt werden. 
        */
		for (let i = 0; i < figuren.length; i++) {
			const figur = figuren[i][0]
			const position = figuren[i][1]
			switch (figur) {
				case 'Q':
				case 'q':
					if (schachGegen === 'schwarz') {
						const moeglicheZuege = moeglicheZuegeQueen(
							position,
							brettState,
							false
						)

						const aufhebendeZuege = hebtZugSchachAuf(
							position,
							moeglicheZuege,
							brettState,
							posBetroffenerKing,
							schachGegen
						)

						legitimeZuege.push(aufhebendeZuege)
						console.log(
							'Schwarze Queen kann Schach aufheben mit Zug: ',
							aufhebendeZuege
						)
					}
					if (schachGegen === 'weiß') {
						const moeglicheZuege = moeglicheZuegeQueen(
							position,
							brettState,
							true
						)

						const aufhebendeZuege = hebtZugSchachAuf(
							position,
							moeglicheZuege,
							brettState,
							posBetroffenerKing,
							schachGegen
						)

						legitimeZuege.push(aufhebendeZuege)

						console.log(
							'Weiße Queen kann Schach aufheben mit Zug: ',
							aufhebendeZuege
						)
					}

					break
				case 'B':
				case 'b':
					if (schachGegen === 'schwarz') {
						const moeglicheZuege = moeglicheZuegeBishop(
							position,
							brettState,
							false
						)

						const aufhebendeZuege = hebtZugSchachAuf(
							position,
							moeglicheZuege,
							brettState,
							posBetroffenerKing,
							schachGegen
						)

						legitimeZuege.push(aufhebendeZuege)

						console.log(
							'Schwarzer Bishop kann Schach aufheben mit Zug: ',
							aufhebendeZuege
						)
					}
					if (schachGegen === 'weiß') {
						const moeglicheZuege = moeglicheZuegeBishop(
							position,
							brettState,
							true
						)

						const aufhebendeZuege = hebtZugSchachAuf(
							position,
							moeglicheZuege,
							brettState,
							posBetroffenerKing,
							schachGegen
						)

						legitimeZuege.push(aufhebendeZuege)

						console.log(
							'Weißer Bishop kann Schach aufheben mit Zug: ',
							aufhebendeZuege
						)
					}

					break
				case 'N':
				case 'n':
					if (schachGegen === 'schwarz') {
						const moeglicheZuege = moeglicheZuegeKnight(
							position,
							brettState,
							false
						)

						const aufhebendeZuege = hebtZugSchachAuf(
							position,
							moeglicheZuege,
							brettState,
							posBetroffenerKing,
							schachGegen
						)

						legitimeZuege.push(aufhebendeZuege)

						console.log(
							'Schwarzer Knight kann Schach aufheben mit Zug: ',
							aufhebendeZuege
						)
					}
					if (schachGegen === 'weiß') {
						const moeglicheZuege = moeglicheZuegeKnight(
							position,
							brettState,
							true
						)

						const aufhebendeZuege = hebtZugSchachAuf(
							position,
							moeglicheZuege,
							brettState,
							posBetroffenerKing,
							schachGegen
						)

						legitimeZuege.push(aufhebendeZuege)

						console.log(
							'Weißer Knight kann Schach aufheben mit Zug: ',
							aufhebendeZuege
						)
					}
					break

				case 'R':
				case 'r':
					if (schachGegen === 'schwarz') {
						const moeglicheZuege = moeglicheZuegeRook(
							position,
							brettState,
							false
						)

						const aufhebendeZuege = hebtZugSchachAuf(
							position,
							moeglicheZuege,
							brettState,
							posBetroffenerKing,
							schachGegen
						)

						legitimeZuege.push(aufhebendeZuege)

						console.log(
							'Schwarzer Rook kann Schach aufheben mit Zug: ',
							aufhebendeZuege
						)
					}
					if (schachGegen === 'weiß') {
						const moeglicheZuege = moeglicheZuegeRook(
							position,
							brettState,
							true
						)

						const aufhebendeZuege = hebtZugSchachAuf(
							position,
							moeglicheZuege,
							brettState,
							posBetroffenerKing,
							schachGegen
						)

						legitimeZuege.push(aufhebendeZuege)

						console.log(
							'Weißer Rook kann Schach aufheben mit Zug: ',
							aufhebendeZuege
						)
					}

					break

				// die bauern sind ein sonderfall - es kann sein, dass ein bauer durch einen zug nach vorne einen angriff blocken kann,
				// oder durch diagonales schlagen einen angriff aufheben kann. Beides wird aber schon in der Pawn Datei mit den möglichen Zügen berücksichtigt
				case 'P':
				case 'p':
					if (schachGegen === 'schwarz') {
						const moeglicheZuege = moeglicheZuegePawn(
							position,
							brettState,
							false,
							enPassantBauer
						)

						const aufhebendeZuege = hebtZugSchachAuf(
							position,
							moeglicheZuege,
							brettState,
							posBetroffenerKing,
							schachGegen
						)

						legitimeZuege.push(aufhebendeZuege)

						console.log(
							'Schwarzer Pawn kann Schach aufheben mit Zug: ',
							aufhebendeZuege
						)
					}

					if (schachGegen === 'weiß') {
						const moeglicheZuege = moeglicheZuegePawn(
							position,
							brettState,
							true,
							enPassantBauer
						)

						const aufhebendeZuege = hebtZugSchachAuf(
							position,
							moeglicheZuege,
							brettState,
							posBetroffenerKing,
							schachGegen
						)

						legitimeZuege.push(aufhebendeZuege)

						console.log(
							'Schwarzer Pawn kann Schach aufheben mit Zug: ',
							aufhebendeZuege
						)
					}
			}
		}
	}

	return legitimeZuege
}
