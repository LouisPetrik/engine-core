import { diagonaleFelder } from '../helpers/diagonale'

/**
 *
 * @param {*} ausgangsfeldKoord
 * @param {*} brettState
 * @returns Bisher wohl 2-dimensionales array
 */
export function angegriffeneFelderBishop(
	ausgangsfeldKoord,
	brettState,
	weißAmZug
) {
	const felder = []

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
