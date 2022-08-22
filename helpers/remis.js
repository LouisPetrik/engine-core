/**
 * Ermittet, ob eine Farbe keine legitimen Züge mehr hat, und daher die partie patt also ein remis ist.
 * @param brettState aktueller Zustand, auf dem basierend figuren der seite gesammelt werden, damit mögliche züge bestimmt werden können.
 * Eine überprüfung auf ein patt muss immer erst erfolgen, nachdem der zug letzte zug legitim war.
 * @param moeglicheAngriffe zum testen ob ein Zug illegitim ist, weil er eigenem König schach gibt
 * @param weißAmZug wie üblich
 * @return ob patt erzeugt wurde, true oder false.
 */
export function farbeStehtImPatt(
	brettState,
	moeglicheAngriffe,
	moeglicheAngriffeSchwarz,
	weißAmZug
) {
	// zu diesem Zeitpunkt hat weiß gerade einen legitimen zug gemacht, also wird überprüft, ob schwarz nun im patt steht.
	if (weißAmZug) {
		// alle figuren von schwarz finden.
	}
	return true
}
