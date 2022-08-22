// Datei für das überprüfen und durchführen der rochade.
// O-O ist die kurze rochade, "kurz", O-O-O "lang"
import { isArrayInArray } from '../Util'

/**
 * Vor aufruf dieser funktion werden die groben ausschluss-faktoren wie bewegen des königs oder im schach stehen ausgeschlossen.
 * @param {*} typ ob es um die kurze oder lange rochade geht.
 * @param {*} weißAmZug wie immer
 * @param {*} angriffeWeiß wie immer, beides für testen ob könig bei rochade im schach stehen würde.
 * @param {*} angriffeSchwarz wie immer
 */
export function rochadeMoeglich(typ, weißAmZug, angriffeWeiß, angriffeSchwarz) {
	// weiß beabsichtigt kurz zu rochieren.
	if (typ === 'kurz' && weißAmZug) {
		// testen ob der turm auf h1 noch existiert und die felder dazwischen frei sind
		if (
			brettState[7][7] === 'R' &&
			brettState[7][5] === '.' &&
			brettState[7][6] === '.'
		) {
			// insofern das der fall ist, kann es nur noch daran scheitern, dass die felder f1 und g1 durch schwarz bedroht werden:
			if (
				isArrayInArray(angriffeSchwarz, [7, 5]) ||
				isArrayInArray(angriffeSchwarz, [7, 6])
			) {
			}
		}
	}
}
