/**
 * Kann sowohl alle Felder in allen diagnolen ausgeben, die die figur deckt (dame und läufer)
 * oder alle felder, auf die die figur ziehen kann (geblockt von eigenen figuren aber schlagen möglich )
 * @param {*} brettState
 * @param {*} richtung entweder "oben" "unten" "rechts" "links" aus der sicht von weiß.
 * @param {*} modus entweder "angriff" oder "zuege" wobei züge alle möglichen zielfelder der figur ausgibt.
 * @param {*} weißAmZug selbsterklärend
 * @returns
 */
export function linieFelder(
  brettState,
  ausgangsfeldKoord,
  richtung,
  modus,
  weißAmZug
) {
  // rook auf 6, 2
  const felderAufLinie = []

  const i = ausgangsfeldKoord[0]
  const j = ausgangsfeldKoord[1]

  // true insofern auf eine eigene figur in der diagnale gestoßen wird. Sobald das der fall ist,
  // werden die felder dahinter (mit den weiteren durchläufen nicht aufgenommen. )
  let geblockt = false

  for (let x = 1; x <= 7; x++) {
    if (!geblockt) {
      // rook auf 0, 1 macht noch probleme.
      let iTemp = i
      let jTemp = j

      // Richtung immer von weiß ausgehend
      if (richtung === 'oben' && i - x >= 0) {
        iTemp = i - x
      }

      if (richtung === 'unten' && i + x <= 7) {
        iTemp = i + x
      }

      if (richtung === 'links' && j - x >= 0) {
        jTemp = j - x
      }

      if (richtung === 'rechts' && j + x <= 7) {
        jTemp = j + x
      }

      // der standpunkt der figur selbst zählt nicht als angegriffen durch sich selbst:
      // Genausowenig kann eine figur als legitimen zug auf das feld ziehen, auf dem sie bereits steht
      // -> wenn das eigene feld durchgegangen wird (else-case) wird der rest der schleife geskipped
      // hier ist wichtig, dass es ein logisches ODER ist, da sich bei bewegungen über linien i oder j nicht verändern.
      if (iTemp != i || jTemp != j) {
        felderAufLinie.push([iTemp, jTemp])
      } else {
        break
      }

      if (modus === 'angriff') {
        // wenn eine eigene oder gegnerische Figur gefunden wird, wird dieses Feld noch
        // aufgenommen, da es angegriffen / gedeckt wird.
        if (brettState[iTemp][jTemp] !== '.') {
          felderAufLinie.push([iTemp, jTemp])
          break
        }
      }

      if (modus === 'zuege') {
        // insofern eine gegnerische figur gefunden wird, ist das feld noch ziehbar.
        // Wenn es eine eigene figur ist, wird der weg dadurch geblockt und das feld selbst nicht aufgenommen.
        if (
          weißAmZug &&
          ['q', 'k', 'r', 'n', 'b', 'p'].includes(brettState[iTemp][jTemp])
        ) {
          felderAufLinie.push([iTemp, jTemp])
        }
        // auf eigene figur gestoßen, feld wird nicht aufgenommen und loop abgebrochen
        if (
          weißAmZug &&
          ['Q', 'K', 'R', 'N', 'B', 'P'].includes(brettState[iTemp][jTemp])
        ) {
          geblockt = true
          break
        }

        if (
          !weißAmZug &&
          ['Q', 'K', 'R', 'N', 'B', 'P'].includes(brettState[iTemp][jTemp])
        ) {
          felderAufLinie.push([iTemp, jTemp])
        }
        // auf eigene figur gestoßen, feld wird nicht aufgenommen und loop abgebrochen
        if (
          !weißAmZug &&
          ['q', 'k', 'r', 'n', 'b', 'p'].includes(brettState[iTemp][jTemp])
        ) {
          geblockt = true
          break
        }
      }

      // kann vielleicht noch hinsichtlich der anzahl der durchläufe optimiert werden.
      /*
			if (iTemp === 0 || iTemp === 7 || jTemp === 0 || jTemp === 7) {
				break
			}*/
    }
  }

  return felderAufLinie
}
