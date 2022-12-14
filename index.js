// Datei verwein

import { moeglicheZuegePawn, angegriffeneFelderPawn } from './figuren/Pawn'
import { moeglicheZuegeKnight } from './figuren/Knight'
import { moeglicheZuegeRook } from './figuren/Rook'
import { moeglicheZuegeQueen } from './figuren/Queen'
import { moeglicheZuegeKing } from './figuren/King'
import {
  feldbezeichnungZuKoord,
  isArrayInArray,
  angriffeFinden,
  figurFinden,
} from './Util.js'
import { istMatt } from './helpers/check'
import { farbeStehtImPatt } from './helpers/remis'
import { rochadeMoeglich } from './helpers/castle'
import { moeglicheZuegeBishop } from './figuren/Bishop'

// Relevante werte für die partie: (muss final in eine klasse), aber bisher nur zum testen hier drinne
let weißAmZug = true
// wird beides erstmal als tupel der koordinaten / position im array gespeichert
let posWeißerKing = [7, 4]
let posSchwarzerKing = [0, 4]

let weißHatRochiert = false
let schwarzHatRochiert = false

// wird beides sofort auf false gesetzt wenn könig bewegt wurde, oder entsprechend auf false,
// wenn benötigter turm bewegt wurde.
// kann auf true sein, aber dennoch illegal, da in dieser datei nicht auf mögliche angriffe überprüft wird
let weißRochadeKurzMoeglich = true
let weißRochadeLangMoeglich = true

let schwarzRochadeKurzMoeglich = true
let schwarzRochadeLangMoeglich = true
// wird für die rochade und das überprüfen auf stalemate benötigt, damit nicht unnötig viele if-else eingeführt werden.
// wird am anfang der zugMachen funktion zurückgesetzt auf false.
let weißerKingImSchach = false
let schwarzerKingImSchach = false

// wann immer ein Bauer einen Doppelschritt aus der Grundstellung gemacht hat, kann hier seine Linie vermerkt werden
// (j-Koordinatenwert) Damit kann gecheckt werden, ob dieser Bauer durch En-passant geschlagen werden kann.
// muss noch aufgehoben werden, irgendwie - später. Wird auf null gesetzt, wenn nicht genutzt oder nicht aufgetreten
let enPassantBauer = null

// Die Nummer des aktuellen Halbzuges (fängt bei logischerweise bei 1 an)
let halbzugNummer = 1

// konvertiert mathematische koordinaten i,j bzw. x,y zu f1, g3, a7 etc.

// Das Brett, mit den aktuellen Positionen der Figuren
// wenn Uppercase Buchstabe, dann weiße Figur - wird sammt State, Koordinate und Figur an
// die entsprechende Methode in der Klasse der Figur übergeben
let brettState = [
  ['.', '.', '.', '.', '.', '.', '.', '.'],
  ['.', '.', '.', '.', '.', '.', '.', '.'],
  ['.', 'K', '.', '.', '.', '.', '.', '.'],
  ['.', '.', '.', '.', '.', 'Q', '.', '.'],
  ['.', '.', '.', '.', '.', '.', 'Q', '.'],
  ['.', '.', '.', '.', '.', '.', '.', '.'],
  ['.', '.', '.', '.', '.', '.', '.', 'b'],
  ['.', '.', '.', '.', '.', '.', '.', 'k'],
]
// Hier werden einzelne, angegriffene felder mit "a" markiert, für beide farben jeweils.
// Immer nach einem legitimen zug wird aktualisiert, und somit auch erkannt, ob der könig im schach steht
// Dieser Felder können noch kompakter mit array.fill() generiert werden.
let angriffeWeiß = [
  ['.', '.', '.', '.', '.', '.', '.', '.'],
  ['.', '.', '.', '.', '.', '.', '.', '.'],
  ['.', '.', '.', '.', '.', '.', '.', '.'],
  ['.', '.', '.', '.', '.', '.', '.', '.'],
  ['.', '.', '.', '.', '.', '.', '.', '.'],
  ['.', '.', '.', '.', '.', '.', '.', '.'],
  ['.', '.', '.', '.', '.', '.', '.', '.'],
  ['.', '.', '.', '.', '.', '.', '.', '.'],
]

let angriffeSchwarz = [
  ['.', '.', '.', '.', '.', '.', '.', '.'],
  ['.', '.', '.', '.', '.', '.', '.', '.'],
  ['.', '.', '.', '.', '.', '.', '.', '.'],
  ['.', '.', '.', '.', '.', '.', '.', '.'],
  ['.', '.', '.', '.', '.', '.', '.', '.'],
  ['.', '.', '.', '.', '.', '.', '.', '.'],
  ['.', '.', '.', '.', '.', '.', '.', '.'],
  ['.', '.', '.', '.', '.', '.', '.', '.'],
]

let moeglicheAngriffeSchwarz = [
  ['.', '.', '.', '.', '.', '.', '.', '.'],
  ['.', '.', '.', '.', '.', '.', '.', '.'],
  ['.', '.', '.', '.', '.', '.', '.', '.'],
  ['.', '.', '.', '.', '.', '.', '.', '.'],
  ['.', '.', '.', '.', '.', '.', '.', '.'],
  ['.', '.', '.', '.', '.', '.', '.', '.'],
  ['.', '.', '.', '.', '.', '.', '.', '.'],
  ['.', '.', '.', '.', '.', '.', '.', '.'],
]

let moeglicheAngriffeWeiß = [
  ['.', '.', '.', '.', '.', '.', '.', '.'],
  ['.', '.', '.', '.', '.', '.', '.', '.'],
  ['.', '.', '.', '.', '.', '.', '.', '.'],
  ['.', '.', '.', '.', '.', '.', '.', '.'],
  ['.', '.', '.', '.', '.', '.', '.', '.'],
  ['.', '.', '.', '.', '.', '.', '.', '.'],
  ['.', '.', '.', '.', '.', '.', '.', '.'],
  ['.', '.', '.', '.', '.', '.', '.', '.'],
]
function angriffeZuruecksetzen() {
  for (let i = 0; i < angriffeSchwarz.length; i++) {
    angriffeSchwarz[i].fill('.')
  }

  for (let i = 0; i < angriffeWeiß.length; i++) {
    angriffeWeiß[i].fill('.')
  }
}

function moeglicheAngriffeZuruecksetzen() {
  for (let i = 0; i < moeglicheAngriffeSchwarz.length; i++) {
    moeglicheAngriffeSchwarz[i].fill('.')
  }

  for (let i = 0; i < moeglicheAngriffeWeiß.length; i++) {
    moeglicheAngriffeWeiß[i].fill('.')
  }
}

function brettAusgeben() {
  console.log('letzter Stand:')
  console.log('---------------')
  for (let i = 0; i < brettState.length; i++) {
    console.log(brettState[i].join(' '))
  }
  console.log('---------------')
  console.log('Position weißer König:', posWeißerKing)
  console.log('Position schwarzer König:', posSchwarzerKing)
}

function moeglicheZuegeAusgeben(moeglicheZuege, figur) {
  // dient allgemein zur visualisierung von möglichen zuegen für alle gezogenen figuren
  let moeglicheZuegeFigur = [
    ['.', '.', '.', '.', '.', '.', '.', '.'],
    ['.', '.', '.', '.', '.', '.', '.', '.'],
    ['.', '.', '.', '.', '.', '.', '.', '.'],
    ['.', '.', '.', '.', '.', '.', '.', '.'],
    ['.', '.', '.', '.', '.', '.', '.', '.'],
    ['.', '.', '.', '.', '.', '.', '.', '.'],
    ['.', '.', '.', '.', '.', '.', '.', '.'],
    ['.', '.', '.', '.', '.', '.', '.', '.'],
  ]

  for (let x = 0; x < moeglicheZuege.length; x++) {
    let i = moeglicheZuege[x][0]
    let j = moeglicheZuege[x][1]

    moeglicheZuegeFigur[i][j] = 'X'
  }

  console.log('Mögliche Züge der Figur ' + figur)
  for (let i = 0; i < moeglicheZuegeFigur.length; i++) {
    console.log(moeglicheZuegeFigur[i].join(' '))
  }
}

// für alle arten der rochade  und die verwandelung von einem bauern zu einer höheren figur
function sonderzugMachen(zugNotation) {
  if (zugNotation === 'O-O' && weißAmZug) {
    if (
      weißRochadeKurzMoeglich &&
      rochadeMoeglich(
        'kurz',
        weißAmZug,
        angriffeWeiß,
        angriffeSchwarz,
        brettState
      )
    ) {
      // rochade auf dem brett ausführen und andere seite ist wieder am zug:
      brettState[7][4] = '.'
      brettState[7][6] = 'K'
      brettState[7][7] = '.'
      brettState[7][5] = 'R'

      weißAmZug = !weißAmZug
    } else {
      console.log('weiße kurze rochade nicht möglich ')
    }
  }

  if (zugNotation === 'O-O-O' && weißAmZug) {
    if (
      weißRochadeLangMoeglich &&
      rochadeMoeglich(
        'lang',
        weißAmZug,
        angriffeWeiß,
        angriffeSchwarz,
        brettState
      )
    ) {
      // rochade ausführen und andere seite wieder am zug:
      brettState[7][4] = '.'
      brettState[7][2] = 'K'

      brettState[7][0] = '.'
      brettState[7][3] = 'R'

      weißAmZug = !weißAmzug
    } else {
      console.log('weiße rochade, lang nicht möglich ')
    }
  }
}
// Überträgt einen Zug auf direkt auf den Brett-State, ohne zu überprüfen, ob der Zug legitim  ist
// zug notation muss in der koordinaten notation "e2-e4", also Ausgangsfeld-Zielfeld seien.
// gibt dann den veränderten brett-state zurück. Bisher nicht ausgegliedert, da direkt auf den brettState zugegriffen wird.
function zugMachen(zugNotation) {
  // ausgeben des aktuellen zuges
  if (halbzugNummer % 2 === 0) {
    console.log('Schwarz ist am Zug ')
  } else {
    console.log('Weiß ist am Zug')
  }

  // sollte vielleicht erst später inkrementiert werden, da hier zuerst abgefangen werden muss, wenn
  // feld ohne figur bewegt wird.
  halbzugNummer++

  // zurücksetzen, da nur eventuell im laufe der funktion auf true gesetzt werden muss
  weißerKingImSchach = false
  schwarzerKingImSchach = false

  // aktuelle position der beiden könige erfassen, damit ein schach gefunden werden kann
  posWeißerKing = figurFinden('K', brettState)
  posSchwarzerKing = figurFinden('k', brettState)

  console.log('Weißer König steht auf: ', posWeißerKing)
  console.log('Schwarzer König steht auf: ', posSchwarzerKing)

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

  // checken, ob der zug legitim ist: Dafür wird nur das Ausgangsfeld und das mögliche Zielfeld übergeben -
  // die Methode zum Checken generiert alle legitimen zielfelder
  // Hier Gabelung aller möglichen Figuren - König, Dame, Bauer, Springer, Läufer, Turm
  // Hier werden die möglichen Züge der gerade zu-bewegenden Figur aus der entsprechenden Methode geholt und
  // untersucht, ob der wunsch-zug legitim ist. Statt Figurenzeichen zu lower-case zu casten wird erstmal für beide Farben die möglichkeit gechecked und erhalten
  let moeglicheZuege = []

  switch (figurZeichen) {
    case 'P':
    case 'p':
      //console.log('Bauer auf das Zielfeld', iZielfeld, jZielfeld)
      moeglicheZuege = moeglicheZuegePawn(
        [iAusgangsfeld, jAusgangsfeld],
        brettState,
        weißAmZug,
        enPassantBauer
      )

      //console.log('Legitime Züge für diesen Bauern: ', moeglicheZuege)
      if (isArrayInArray(moeglicheZuege, [iZielfeld, jZielfeld])) {
        console.log('Zug ist legitim')

        // insofern der gezogene bauer genau ein feld hinter (j gleich, i + 1 für schwarz, i - 1 für weiß) dem en-passant schlagbaren bauern steht und sich
        // diagonal auf ihn zubewegt hat, muss es sich um en-passant schlagen handeln - der geschlagene bauer wird entfernt.

        if (enPassantBauer !== null) {
          if (weißAmZug) {
            if (
              iZielfeld === enPassantBauer[0] - 1 &&
              jZielfeld === enPassantBauer[1]
            ) {
              console.log(
                'Wei hat Bauer auf',
                enPassantBauer[0],
                enPassantBauer[1],
                'en passant genommen'
              )
              brettState[enPassantBauer[0]][enPassantBauer[1]] = '.'
            }
          }

          if (!weißAmZug) {
            if (
              iZielfeld === enPassantBauer[0] + 1 &&
              jZielfeld === enPassantBauer[1]
            ) {
              console.log(
                'Schwarz hat Bauern auf',
                enPassantBauer[0],
                enPassantBauer[1],
                'en passant genommen'
              )

              // entfernen des en-passant-geschlagenen bauerns:
              brettState[enPassantBauer[0]][enPassantBauer[1]] = '.'
            }
          }
        }
        // sobald der nächste zug legitim ist, verfällt der en-passant anspruch. Entweder er wurde genutzt durch den legitimen zug, oder er
        // verfällt wegen ungenutzt.
        enPassantBauer = null

        console.log('iZielfeld', iZielfeld)

        // hier einfach über den i-wert checken, ob bauer zwei aus grundstellung (also nun auf höhe 4 und vorher in 6 -> zwei schritte)
        if (weißAmZug && iZielfeld == 4 && iAusgangsfeld == 6) {
          console.log('Weißer Bauer Doppelschritt!')
          enPassantBauer = [iZielfeld, jZielfeld]
        }

        if (!weißAmZug && iZielfeld == 3 && iAusgangsfeld == 1) {
          console.log('Schwarzer Bauer Doppelschritt!')
          enPassantBauer = [iZielfeld, jZielfeld]
        }
      } else {
        //console.log('Bauern Zug NICHT legitim')
        if (!weißAmZug) {
          //console.log('Weil noch nicht für Schwarz :) ')
        }
      }
      break

    case 'K':
    case 'k':
      console.log('König wurde bewegt')

      moeglicheZuege = moeglicheZuegeKing(
        [iAusgangsfeld, jAusgangsfeld],
        brettState,
        weißAmZug,
        angriffeWeiß,
        angriffeSchwarz
      )

      moeglicheZuegeAusgeben(moeglicheZuege, 'König')
      // erst nach überprüfung, ob zug legitim
      if (weißAmZug) {
        weißRochadeKurzMoeglich = false
        weißRochadeLangMoeglich = false

        posWeißerKing = [iZielfeld, jZielfeld]
      } else {
        posSchwarzerKing = [iZielfeld, jZielfeld]
        schwarzRochadeKurzMoeglich = false
        schwarzHatRochiert = false
      }
      break

    case 'Q':
    case 'q':
      console.log('Dame wurde bewegt')
      moeglicheZuege = moeglicheZuegeQueen(
        [iAusgangsfeld, jAusgangsfeld],
        brettState,
        weißAmZug
      )

      moeglicheZuegeAusgeben(moeglicheZuege, 'dame')
      break

    case 'N':
    case 'n':
      console.log('Springer wurde bewegt')
      moeglicheZuege = moeglicheZuegeKnight(
        [iAusgangsfeld, jAusgangsfeld],
        brettState,
        weißAmZug
      )

      if (isArrayInArray(moeglicheZuege, [iZielfeld, jZielfeld])) {
        console.log('Zug ist legitim')
      }
      break

    case 'B':
    case 'b':
      console.log('Läufer wurde bewegt')
      moeglicheZuege = moeglicheZuegeBishop(
        [iAusgangsfeld, jAusgangsfeld],
        brettState,
        weißAmZug,
        angriffeWeiß,
        angriffeSchwarz
      )

      moeglicheZuegeAusgeben(moeglicheZuege, 'läufer')

      break

    case 'R':
    case 'r':
      console.log('Turm wurde bewegt')
      moeglicheZuege = moeglicheZuegeRook(
        [iAusgangsfeld, jAusgangsfeld],
        brettState,
        weißAmZug
      )

      moeglicheZuegeAusgeben(moeglicheZuege, 'Turm')

      // eigentlich muss hiervor noch überprüft werden ob der turm zu legitim war.
      if (iAusgangsfeld === 7 && jAusgangsfeld === 0) {
        weißRochadeLangMoeglich = false
      }

      if (iAusgangsfeld === 7 && jAusgangsfeld === 7) {
        weißRochadeKurzMoeglich = false
      }

      if (iAusgangsfeld === 0 && jAusgangsfeld === 0) {
        schwarzRochadeLangMoeglich = false
      }

      if (iAusgangsfeld === 0 && jAusgangsfeld === 7) {
        schwarzRochadeKurzMoeglich = false
      }

      break
  }

  // hier wird final überprüft, ob dieser Zug nicht den eigenen König in Schach setzen würde -
  // also wenn man versucht einer Fessellung zu entkommen, was aber nicht legitim ist.
  // dafür wird eine veränderte kopie des brettStates übergeben, auf dem der Zug schon ausgeführt ist:
  let testBrettState = brettState
  testBrettState[iAusgangsfeld][jAusgangsfeld] = '.'
  testBrettState[iZielfeld][jZielfeld] = figurZeichen

  // erstmal das array der möglichen angriffe zurücksetzen, damit alles frisch ist:
  moeglicheAngriffeZuruecksetzen()

  // dann werden die möglichen Angriffe generiert, basierend auf der brettState-Kopie die den
  // eventuell illegitimen zug enthält
  let moeglicheAngegriffeneFelder = angriffeFinden(testBrettState, weißAmZug)

  // alle angriffe von weiß einzeichen.
  for (let x = 0; x < moeglicheAngegriffeneFelder[0].length; x++) {
    let i = moeglicheAngegriffeneFelder[0][x][0]
    let j = moeglicheAngegriffeneFelder[0][x][1]

    moeglicheAngriffeWeiß[i][j] = 'A'
  }
  // alle angriffe von schwarz einzeichnen

  for (let x = 0; x < moeglicheAngegriffeneFelder[1].length; x++) {
    let i = moeglicheAngegriffeneFelder[1][x][0]
    let j = moeglicheAngegriffeneFelder[1][x][1]

    moeglicheAngriffeSchwarz[i][j] = 'A'
  }

  if (
    weißAmZug &&
    moeglicheAngriffeSchwarz[posWeißerKing[0]][posWeißerKing[1]] === 'A'
  ) {
    console.log(
      figurZeichen,
      'auf',
      iZielfeld,
      jZielfeld,
      'weißer Zug würde dem weißen König Schach geben! '
    )
  }

  if (
    !weißAmZug &&
    moeglicheAngriffeWeiß[posSchwarzerKing[0]][posSchwarzerKing[1]] === 'A'
  ) {
    console.log('Dieser schwarze Zug würde dem schwarzen König Schach geben!')
  }

  // Figur auf dem Brett auf das Zielfeld bewegen - das Ausgangsfeld, was nun leer ist, wird durch einen "." markiert
  // hier muss noch erfolgen, ob der Zug legitim ist und nicht Schach zulässt (weil er gepinnt ist)
  // Variable direkt im scope der funktion die bestimmt ob der zug legitim ist? Figur datei selbst aber auch dieser hier greifen darauf zu.
  brettState[iAusgangsfeld][jAusgangsfeld] = '.'
  brettState[iZielfeld][jZielfeld] = figurZeichen

  // alle, durch beide farben angegriffenen felder: [0] für weiß, [1] für schwarz.
  let angegriffeneFelder = angriffeFinden(brettState, weißAmZug)

  // erstmal das array sicherhaltshalber zurücksetzen
  angriffeZuruecksetzen()

  // i und j sind reserviert für bezeichnung des koord-abschnitt
  // alle angriffe von weiß einzeichnen:
  for (let x = 0; x < angegriffeneFelder[0].length; x++) {
    let i = angegriffeneFelder[0][x][0]
    let j = angegriffeneFelder[0][x][1]

    angriffeWeiß[i][j] = 'A'
  }
  // alle angriffe von schwarz einzeichnen

  for (let x = 0; x < angegriffeneFelder[1].length; x++) {
    let i = angegriffeneFelder[1][x][0]
    let j = angegriffeneFelder[1][x][1]

    angriffeSchwarz[i][j] = 'A'
  }

  // testen, ob einer der beiden könige im schach steht:
  if (angriffeSchwarz[posWeißerKing[0]][posWeißerKing[1]] === 'A') {
    weißerKingImSchach = true
    console.log('Weißer könig steht im schach!')

    // jetzt testen, ob es eventuell Matt ist:
    if (
      istMatt(
        brettState,
        'weiß',
        angriffeWeiß,
        angriffeSchwarz,
        posWeißerKing,
        enPassantBauer
      ).length === 0
    ) {
      console.log('Schachmatt, Schwarz gewinnt!')
    }
  }

  if (angriffeWeiß[posSchwarzerKing[0]][posSchwarzerKing[1]] === 'A') {
    schwarzerKingImSchach = true
    console.log('Schwarzer könig steht im schach!')
    console.log(
      'mögliche züge dagegen: ',
      istMatt(
        brettState,
        'schwarz',
        angriffeWeiß,
        angriffeSchwarz,
        posSchwarzerKing
      )
    )
    if (
      istMatt(
        brettState,
        'schwarz',
        angriffeWeiß,
        angriffeSchwarz,
        posSchwarzerKing
      ).length === 0
    ) {
      console.log('Schachmatt! Weiß gewinnt')
    }
  }

  // Auf stalemate überprüfen. nur in diesem fall kann es ein stalemate sein
  // An dieser stelle im Code ist schon klar, dass der Zug, für den die Funktion aufgerufen wurde, legitim ist.
  if (!weißerKingImSchach && !schwarzerKingImSchach) {
    // wenn weiß am zug war, und einen zug gemacht hat, wird überprüft, ob schwarz noch legitime züge hat.
    // hierzu können die möglichenAngriffe arrays übergeben werden, damit getestet werden kann, ob einer der verbleibenden züge
    // illegitim ist, da er den eigenen könig schach geben würde.

    console.log(
      'patt: ',
      farbeStehtImPatt(
        brettState,
        weißAmZug,
        angriffeWeiß,
        angriffeSchwarz,
        enPassantBauer,
        posWeißerKing,
        posSchwarzerKing
      )
    )
  }

  // nun ist wieder die andere Farbe am Zug
  weißAmZug = !weißAmZug

  return brettState
}

function spielen() {
  console.log('Macht den ersten Zug')
}

spielen()

zugMachen('f5-f3')
/* LOGIK FÜR SPIELABLAUF 
Weiß am Zug ,Schwarz etc. durch Überprüfung */
// Hier nach gibt es drei legitime Züge für Springer

console.log('Angriffe von weiß:')
console.log('---------------')
for (let i = 0; i < angriffeWeiß.length; i++) {
  console.log(angriffeWeiß[i].join(' '))
}
console.log('---------------')

console.log('Angriffe von schwarz:')
console.log('---------------')
for (let i = 0; i < angriffeSchwarz.length; i++) {
  console.log(angriffeSchwarz[i].join(' '))
}
console.log('---------------')

brettAusgeben()
