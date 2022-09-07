import { moeglicheZuegeKing } from '../figuren/King'
import { moeglicheZuegeKnight } from '../figuren/Knight'
import { moeglicheZuegeRook } from '../figuren/Rook'
import { moeglicheZuegeBishop } from '../figuren/Bishop'
import { moeglicheZuegeQueen } from '../figuren/Queen'
import { moeglicheZuegePawn } from '../figuren/Pawn'
import { angriffeFinden, isArrayInArray } from '../Util'

/**
 * Ermittet, ob eine Farbe keine legitimen Züge mehr hat, und daher die partie patt also ein remis ist.
 * Eine überprüfung auf ein patt muss immer erst erfolgen, nachdem der zug letzte zug legitim war. Daher ist kann nicht das moeglicheAngriffe
 * array genutzt werden, weil die gegenseite der seite, die am zug ist auf spiebare züge überprüft werden muss.
 * @param brettState aktueller Zustand, auf dem basierend figuren der seite gesammelt werden, damit mögliche züge bestimmt werden können.
 * @param weißAmZug wie üblich, allerdings wenn weißAmZug True ist, wird überprüft ob Schwarz im Patt steht und vice versa.
 * @param angriffeWeiß nötig für die moeglicheZuegeKing funktion
 * @param angriffeSchwarz wie zuvor
 * @param enPassantBauer nur für die Pawn-möglichen Züge
 * @param posWeißerking zur überprüfung ob das feld wo der könig steht angegriffen wird
 * @param posSchwarzer analog wie zuvor
 * @return ob patt erzeugt wurde, true oder false.
 */
export function farbeStehtImPatt(
  brettState,
  weißAmZug,
  angriffeWeiß,
  angriffeSchwarz,
  enPassantBauer,
  posWeißerKing,
  posSchwarzerKing
) {
  // by default true, sobald ein zug gefunden wurde, der legitim ist, wird auf false gesetzt
  let istPatt = true

  const schwarzeFiguren = ['k', 'q', 'p', 'r', 'b', 'n']
  const weißeFiguren = ['K', 'Q', 'P', 'R', 'B', 'N']

  // zu diesem Zeitpunkt hat weiß gerade einen legitimen zug gemacht, also wird überprüft, ob schwarz nun im patt steht.
  // da dafür die züge aus sicht von schwarz überprüft werden, wird immer bei den parametern weißAmZug auf false gesetzt

  // alle figuren von schwarz finden und bestimmmen, ob es in allen figuren noch legitime zügee gibt.
  for (let i = 0; i < 8; i++) {
    for (let j = 0; j < 8; j++) {
      if (
        (weißAmZug && schwarzeFiguren.includes(brettState[i][j])) ||
        (!weißAmZug && weißeFiguren.includes(brettState[i][j]))
      ) {
        const gefundeneFigur = brettState[i][j]
        const positionFigur = [i, j]

        // alle möglichen züge der figur, außer acht gelassen, ob dieser zug eigenem könig schach gibt
        let moeglicheZuege = []

        // abfangen, um welche Figur es sich handelt, und alle möglichen züge generieren,
        // die dann beurteilt werden, hinsichtlich der möglichen angriffe durch den möglichen zug

        switch (gefundeneFigur) {
          // eventuell redudndant, da hierhin schon abgefangen wird, dass der könig nicht ins schach laufen darf
          case 'K':
          case 'k':
            moeglicheZuege = moeglicheZuegeKing(
              positionFigur,
              brettState,
              !weißAmZug,
              angriffeWeiß,
              angriffeSchwarz
            )

            // sobald es einen zug für den King gibt, ist es kein patt
            if (moeglicheZuege.length >= 1) {
              istPatt = false
            }
            break
          case 'Q':
          case 'q':
            moeglicheZuege = moeglicheZuegeQueen(
              positionFigur,
              brettState,
              !weißAmZug
            )
            break
          case 'P':
          case 'p':
            moeglicheZuege = moeglicheZuegePawn(
              positionFigur,
              brettState,
              !weißAmZug,
              enPassantBauer
            )
            break
          case 'R':
          case 'r':
            moeglicheZuege = moeglicheZuegeRook(
              positionFigur,
              brettState,
              !weißAmZug
            )
            break
          case 'B':
          case 'b':
            moeglicheZuege = moeglicheZuegeBishop(
              positionFigur,
              brettState,
              !weißAmZug
            )
            break
          case 'N':
          case 'n':
            moeglicheZuege = moeglicheZuegeKnight(
              positionFigur,
              brettState,
              !weißAmZug
            )
            break
        }

        // für jeden einzelnen zug überprüfen, ob er könig in schach setzen würde:

        for (let x = 0; x < moeglicheZuege.length; x++) {
          let iZielfeld = moeglicheZuege[x][0]
          let jZielfeld = moeglicheZuege[x][1]

          // unabhängige kopie machen, auf die alle möglichen Züge alle figuren gebracht werden
          const testBrettState = Array.from(Array(8), () =>
            new Array(8).fill(null)
          )

          // alles in die kopie reinschreiben .
          for (let z = 0; z < 8; z++) {
            for (let y = 0; y < 8; y++) {
              testBrettState[z][y] = brettState[z][y]
            }
          }

          // den möglichen Zug der figur in den alternativen brettState übernehmen
          testBrettState[i][j] = '.'
          testBrettState[iZielfeld][jZielfeld] = gefundeneFigur

          // weißAmZug auf false an dieser Stelle ist vielleicht nicht richtig
          let moeglicheAngegriffeneFelder = angriffeFinden(
            testBrettState,
            !weißAmZug
          )

          /*
					console.log(
						'alle möglichen angriffe von schwarz:',
						moeglicheAngegriffeneFelder[1]
					)*/

          if (weißAmZug) {
            console.log('überprüfen, ob schwarz im patt steht')
            if (
              !isArrayInArray(moeglicheAngegriffeneFelder[0], [
                posSchwarzerKing[0],
                posSchwarzerKing[1],
              ])
            ) {
              istPatt = false
            }
          }

          if (!weißAmZug) {
            console.log('überprüfen, ob weiß im Patt steht')
            if (
              !isArrayInArray(moeglicheAngegriffeneFelder[1], [
                posWeißerKing[0],
                posWeißerKing[1],
              ])
            ) {
              istPatt = false
            }
          }
        }

        // alle angriffe von schwarz einzeichnen
      }
    }
  }

  return istPatt
}
