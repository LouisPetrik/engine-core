// Datei für das überprüfen und durchführen der rochade.
// O-O ist die kurze rochade, "kurz", O-O-O "lang"
import { isArrayInArray } from '../Util'

/**
 * Vor aufruf dieser funktion werden die groben ausschluss-faktoren wie bewegen des königs oder im schach stehen ausgeschlossen.
 * @param {*} typ ob es um die kurze oder lange rochade geht.
 * @param {*} weißAmZug wie immer
 * @param {*} angriffeWeiß wie immer, beides für testen ob könig bei rochade im schach stehen würde.
 * @param {*} angriffeSchwarz wie immer
 * @param {*} brettState wie immer
 */
export function rochadeMoeglich(
  typ,
  weißAmZug,
  angriffeWeiß,
  angriffeSchwarz,
  brettState
) {
  let moeglich = true
  // sollte jeweils noch umgeschrieben werden zu ODER anstatt UND überall.
  // weiß beabsichtigt kurz zu rochieren.
  if (typ === 'kurz' && weißAmZug) {
    // testen ob der turm auf h1 noch existiert und die felder dazwischen frei sind

    if (
      brettState[7][7] !== 'R' ||
      brettState[7][5] !== '.' ||
      brettState[7][6] !== '.'
    ) {
      moeglich = false
    }

    // insofern das der fall ist, kann es nur noch daran scheitern, dass die felder f1 und g1 durch schwarz bedroht werden:
    // wohl nicht so richtig, da angriffeSchwarz und angriffeWeiß 'A' als markierung eines angriffes enthält
    if (
      isArrayInArray(angriffeSchwarz, [7, 5]) ||
      isArrayInArray(angriffeSchwarz, [7, 6])
    ) {
      moeglich = false
    }
  }

  if (typ === 'lang' && weißAmZug) {
    // testen ob der turm auf a1 noch existiert und alle felder dazwischen frei sind
    if (
      brettState[7][0] !== 'R' ||
      brettState[7][1] !== '.' ||
      brettState[7][2] !== '.' ||
      brettState[7][3] !== '.'
    ) {
      moeglich = false
    }

    // testen, ob die felder über die der könig zieht, angegriffen sind:
    if (
      isArrayInArray(angriffeSchwarz, [7, 2]) ||
      isArrayInArray(angriffeSchwarz, [7, 3])
    ) {
      moeglich = false
    }
  }

  return moeglich
}
