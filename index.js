// Datei verwein

const Pawn = require('./figuren/Pawn.js')
import { feldbezeichnungZuKoord } from './Util.js'

// Relevante werte für die partie: (muss final in eine klasse), aber bisher nur zum testen hier drinne
let weißAmZug = true
let posWeißerKing = 'e1'
let posSchwarzerKing = 'e8'

let weißHatRochiert = false
let schwarzHatRochiert = false

// Die Nummer des aktuellen Halbzuges (fängt bei logischerweise bei 1 an)
let halbzugNummer = 1

// konvertiert mathematische koordinaten i,j bzw. x,y zu f1, g3, a7 etc.

// Das Brett, mit den aktuellen Positionen der Figuren
// wenn Uppercase Buchstabe, dann weiße Figur - wird sammt State, Koordinate und Figur an
// die entsprechende Methode in der Klasse der Figur übergeben
let brettState = [
  ['r', 'n', 'b', 'q', 'k', 'b', 'n', 'r'],
  ['p', 'p', 'p', 'p', 'p', 'p', 'p', 'p'],
  ['.', '.', '.', '.', '.', '.', '.', '.'],
  ['.', '.', '.', '.', '.', '.', '.', '.'],
  ['.', '.', '.', '.', '.', '.', '.', '.'],
  ['.', '.', '.', '.', '.', '.', '.', '.'],
  ['P', 'P', 'P', 'P', 'P', 'P', 'P', 'P'],
  ['R', 'N', 'B', 'Q', 'K', 'B', 'N', 'R'],
]

// Überträgt einen Zug auf direkt auf den Brett-State, ohne zu überprüfen, ob der Zug legitim  ist
// zug notation muss in der koordinaten notation "e2-e4", also Ausgangsfeld-Zielfeld seien.
// gibt dann den veränderten brett-state zurück
function zugMachen(zugNotation) {
  // ausgeben des aktuellen zuges
  if (halbzugNummer % 2 === 0) {
    console.log('Schwarz ist am Zug ')
  } else {
    console.log('Weiß ist am Zug')
  }

  halbzugNummer++

  // zugNotation slicen, damit aufgeteilt wird. Kann static gemacht werden,
  // da notation immer exakt 5 Zeichen lang ist.

  const ausgangsfeld = zugNotation.slice(0, 2)
  const zielfeld = zugNotation.slice(3)

  // Figur ermitteln, die auf dem Ausgangsfeld steht - dazu die Notation z. B. e2 in Koordinaten i,j übersetzen
  // notation zu koordinaten / position im array des ausgangsfeldes:
  // ohne destructoring, weil das nicht in c++ möglich
  const iAusgangsfeld = feldbezeichnungZuKoord(ausgangsfeld)[0]
  const jAusgangsfeld = feldbezeichnungZuKoord(ausgangsfeld)[1]

  const iZielfeld = feldbezeichnungZuKoord(zielfeld)[0]
  const jZielfeld = feldbezeichnungZuKoord(zielfeld)[1]

  // Figur auf dem Ausgangsfeld finden - P, p, N, n etc.
  const figurZeichen = brettState[iAusgangsfeld][jAusgangsfeld]

  console.log('Gezogene Figur ist:', figurZeichen)

  // checken, ob der zug legitim ist: Dafür wird nur das Ausgangsfeld und das mögliche Zielfeld übergeben -
  // die Methode zum Checken generiert alle legitimen zielfelder

  // Figur auf dem Brett auf das Zielfeld bewegen - das Ausgangsfeld, was nun leer ist, wird durch einen "." markiert
  brettState[iAusgangsfeld][jAusgangsfeld] = '.'
  brettState[iZielfeld][jZielfeld] = figurZeichen

  return brettState
}

//
zugMachen('e2-e4')
zugMachen('e7-e5')

zugMachen('g1-f3')
zugMachen('b8-c6')

zugMachen('f1-c4')
zugMachen('f8-c5')
// abschließend: ausgeben des aktuellen zustand des bretts:
console.log(brettState)
