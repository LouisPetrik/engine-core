# engine-core

JavaScript draft für die Schach-Engine, wird später in C++ übersetzt.

Zum ausführen:

```bash
npm start
```

Anzahl der lines of code:

```bash
git ls-files | grep '\.js' | xargs wc -l
```

## Ablauf des codes beim spielen 

1. Weiß wird aufgefordert Zug zu machen 
2. Weiß macht einen Zug. 
3. Ausgangsfeld, Zielfeld und Figur selbst werden ermittelt
4. Mögliche Züge der Figur aus der Datei der Figur selbst werden ermittelt. (Berücksichtigt bisher nicht geben von Abzugsschach, was verboten sein muss)
5. Hier kann jetzt, wird aber noch nicht, überprüft ob der Zug legitim ist. 
6. Nach dem Switch, der die verschiedenen, gezogenen Figuren behandelt, wird der Zug dann auf dem Brett umgesetzt.
7. Dann wird ermittelt, welche Felder beide Seiten alle angreifen. 
8. Jetzt muss ermittelt werden, ob der König durch den Zug im Schach steht, und ob der nächste Zug legitim ist, weil er das Schach aufhebt. 
9. Andere Farbe wieder am Zug

Wie ermitteln ob König durch den eigenen Zug im schach steht?
Dafür einen brettState einführen, auf den Züge schon vor bestätigung der legitimität gebracht werden können und wenn der König dort im Schach steht, ist der Zug nicht legitim. n


## Wichtig fürs verständnis:

-  Angriffe werden ausgeben nachdem ein Zug gemacht wurde, enthalten also die aktualisierte position einer figur
-  Mögliche Züge werden ausgeben, bevor der Zug getan wurde. Bisher werden züge einfach ohne greifende überprüfung ausgeführt

## Übersicht der Klassen / Pakete:

-  In "figuren" soll für jede Figur eine Funktion kommen, die mögliche, legitime Züge berechnet. Einen state für jede einzelne figur, also z. B. die beiden Pferde ist nicht nötig, glaube ich.

## Todos:

-  Sonder-Züge müssen bei der eingabe eines zuges wie statt e2-e4 noch berücktsichtigt und erkannt werden - also z. B. kurze Rochade O-O
-  Unterstüzung für en-passant
-  En-passant möglichkeit muss auch in den bedrohten feldern erfasst werden.
-  Gesamten State auslagern in eine eigene Datei, also brettState, angriffeWeiß etc.
-  Pushen der verschiedenen Züge in
-  Was ist, wenn eine Figur ein Feld eigentlich deckt, aber dadurch dass sie gepinnt ist, kann sie effektiv dieses feld nicht decken? Es müsste einen test geben, ob jeder entsprechende zug dazu führt, dass der eigene könig im schach steht.
Wichtig dabei ist, dass es eine eigene Figur ist, die gezogen wird, die den eigenen König in Schach bringt. 
-  Abfangen der Möglichkeit, dass eine Figur gezogen werden soll, die nicht existiert.

## Fragestellungen:

-  Jede Figur muss wohl eine funktion bekommen, die angegriffene Felder ausgibt. Zb der knight kann nicht auf besetze felder springen, deckt diese ja aber. Der schachcomputer muss wissen können, dass z. B. schlagen eines bauerns durch den könig um schach zu entkommen nicht möglich ist, wenn dieser bauer durch ein pferd gedeckt / angegriffen wird.
-  Definitionsfrage: Greifen figuren die felder an, auf denen sie selbst stehen? (Gilt nur für B, R, K, Q)
   Vermutlich nicht, da die engine sonst nicht weiß, ob sie eine figur nehmen kann, die ungedeckt ist.
-  Ein Meta-objekt in der index.js die on-top alle metainformationen wie anzahl der züge speichert, damit das an alle figur-funktionen übergeben werden kann?
-  Eventuell muss als gültiger Zug einer Figur auch das feld belassen werden, auf dem sie steht, damit abgefangen werden kann, wenn die figur bei drag & drop auf dem ausgangsfeld losgelassen wird.
