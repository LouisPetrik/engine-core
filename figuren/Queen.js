import { diagonaleFelder } from '../helpers/diagonale'

/**
 * Sehr analog zur Datei des Bishops teilweise
 * @param {*} ausgangsfeldKoord
 * @param {*} brettState
 * @returns Bisher wohl 2-dimensionales array
 */
export function angegriffeneFelderQueen(
	ausgangsfeldKoord,
	brettState,
	weißAmZug
) {
	const felder = []

	// all die felder auf den linien

	// all die felder auf den diagonalen
	felder.push(
		...diagonaleFelder(
			brettState,
			ausgangsfeldKoord,
			'oben-rechts',
			'angriff',
			weißAmZug
		),
		...diagonaleFelder(
			brettState,
			ausgangsfeldKoord,
			'oben-links',
			'angriff',
			weißAmZug
		),
		...diagonaleFelder(
			brettState,
			ausgangsfeldKoord,
			'unten-rechts',
			'angriff',
			weißAmZug
		),
		...diagonaleFelder(
			brettState,
			ausgangsfeldKoord,
			'unten-links',
			'angriff',
			weißAmZug
		)
	)

	return felder
}
