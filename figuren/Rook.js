// Zum testen, ob ein Feld noch auf dem Brett ist.
// Ist die selbe funktion wie in der Knight datei, daher muss noch zusammengefasst werden.
function feldAufBrett(iVariation, jVariation) {
  if (
    iVariation >= 0 &&
    jVariation >= 0 &&
    iVariation <= 7 &&
    jVariation <= 7
  ) {
    return true
  } else {
    return false
  }
}

/**
 * Gibt all die Felder aus, die der Rook bedroht. Linien in 4 Richtungen, bis zu einer eigenen
 * oder gegnerischen Figur (aber inklusive dieses Feld (Drohung / Deckung))
 * @param {*} ausgangsfeldKoord
 */
export function angegriffeneFelderRook(ausgangsfeldKoord, brettState) {
  const felder = []

  const i = ausgangsfeldKoord[0]
  const j = ausgangsfeldKoord[1]

  // von weiß aus nach oben:
  for (let iTemp = i; iTemp >= 0; iTemp--) {
    // eine Figur steht dort. Dann wird dieses Feld noch aufgenommen in die gedeckten / angegriffenen Felder
    // alles danach in der linie (weiter nach oben) entfällt aber

    felder.push([iTemp, j])
    if (brettState[iTemp][j] !== '.') {
      //felder.push([iTemp, j])
      break
    }
  }

  // von weiß aus nach unten:
  for (let iTemp = i; iTemp <= 7; iTemp++) {
    // eine Figur steht dort. Dann wird dieses Feld noch aufgenommen in die gedeckten / angegriffenen Felder
    // alles danach in der linie (weiter nach oben) entfällt aber
    if (brettState[iTemp][j] !== '.') {
      felder.push([iTemp, j])
      break
    }
    felder.push([iTemp, j])
  }

  // von weiß und schwarz aus nach links:
  for (let jTemp = j; jTemp >= 0; jTemp--) {
    // eine Figur steht dort. Dann wird dieses Feld noch aufgenommen in die gedeckten / angegriffenen Felder
    // alles danach in der linie (weiter nach oben) entfällt aber
    if (brettState[i][jTemp] !== '.') {
      felder.push([i, jTemp])
      break
    }
    felder.push([i, jTemp])
  }

  // von weiß und schwarz aus nach rechts:
  for (let jTemp = j; jTemp <= 7; jTemp++) {
    // eine Figur steht dort. Dann wird dieses Feld noch aufgenommen in die gedeckten / angegriffenen Felder
    // alles danach in der linie (weiter nach oben) entfällt aber
    if (brettState[i][jTemp] !== '.') {
      felder.push([i, jTemp])
      break
    }
    felder.push([i, jTemp])
  }

  return felder
}

/**
 * Gibt alle Felder aus, auf die der Rook ziehen kann. Linien in 4 Richtungen aber geblockt durch eigene figuren. Nicht geblockt
 * durch gegnerische Figuren (inklusive)
 * @param {*} ausgangsfeldKoord
 * @param {*} brettState
 */
export function moeglicheZuegeRook(ausgangsfeldKoord, brettState) {}
