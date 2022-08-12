import { diagonaleFelder } from '../helpers/diagonale'
import { linieFelder } from '../helpers/linie'

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

	felder.push(
		...linieFelder(
			brettState,
			ausgangsfeldKoord,
			'oben',
			'angriff',
			weißAmZug
		),
		...linieFelder(
			brettState,
			ausgangsfeldKoord,
			'unten',
			'angriff',
			weißAmZug
		),
		...linieFelder(
			brettState,
			ausgangsfeldKoord,
			'links',
			'angriff',
			weißAmZug
		),
		...linieFelder(
			brettState,
			ausgangsfeldKoord,
			'rechts',
			'angriff',
			weißAmZug
		)
	)

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

	console.log('felder aus der queen.js:')
	console.log(felder)

	return felder
}

export function moeglicheZuegeQueen(ausgangsfeldKoord, brettState, weißAmZug) {
	const zuege = []

	felder.push(
		...linieFelder(brettState, ausgangsfeldKoord, 'oben', 'zuege', weißAmZug),
		...linieFelder(
			brettState,
			ausgangsfeldKoord,
			'unten',
			'zuege',
			weißAmZug
		),
		...linieFelder(
			brettState,
			ausgangsfeldKoord,
			'links',
			'zuege',
			weißAmZug
		),
		...linieFelder(
			brettState,
			ausgangsfeldKoord,
			'rechts',
			'zuege',
			weißAmZug
		)
	)

	felder.push(
		...diagonaleFelder(
			brettState,
			ausgangsfeldKoord,
			'oben-rechts',
			'zuege',
			weißAmZug
		),
		...diagonaleFelder(
			brettState,
			ausgangsfeldKoord,
			'oben-links',
			'zuege',
			weißAmZug
		),
		...diagonaleFelder(
			brettState,
			ausgangsfeldKoord,
			'unten-rechts',
			'zuege',
			weißAmZug
		),
		...diagonaleFelder(
			brettState,
			ausgangsfeldKoord,
			'unten-links',
			'zuege',
			weißAmZug
		)
	)
}
