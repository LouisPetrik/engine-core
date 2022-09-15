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

Anzahl der lines von jeder art: 

git ls-files | xargs cat | wc -l

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

## Neuer ansatz für feststellen ob stalemate / patt

Am ende der funktion für die einen auszuführenden zug werden alle legitimen züge für die andere seite generiert.
Eigentlich muss hier nicht in die tiefe iteriert werden, es reicht, wenn ein einziger legimtimer zug gefunden werden kann - dann ist
es definitiv kein patt. Wenn allerdings alles berücksichtigt wurde, und kein legimtimer zug gefunden werden kann, ist es ein patt.
Bedingung ist, dass der letzte zug die gegenseite nicht ins schach gestellt hat. In diesem fall bedeuten fehlende legimtime züge schachmatt.
Insofern man das eh am ende der zugMachen funktion macht, kann man hier auch gleich auf ungenügendes material überprüfen.

## Ansatz für das durchführen der Rochade

-  Insofern King bewegt wurde, ist rochade recht sofort verloren
-  Wenn turm von a1 bewegt wurde, ist für weiß möglichkeit O-O-O weg
-  wenn turm von h1 bewegt wurde, ist für weiß möglichkeit für O-O weg
-  analog für schwarz, kurz weg wenn h8 und lang a1
-  wenn nach den oberen kriterien alles legitim ist, darf nichts zwischen den beiden figuren stehen. (
   für weißes o-o-o muss b1 c1 und d1 frei von eigenen und gegnerischen figuren sein. c1 und d1 dürfen nicht angegriffen sein.
   Für weißes o-o dürfen die felder f1 und g1 nicht bedroht sein.
-  und natürlich müssen die benötigten türme noch existieren, da sie ja auch ohne eigene bewegung geschlagen werden können.
-  der könig der rochieren will, darf selbst auch nicht im schach stehen. So dass die rochade nicht als entkommen genutzt werden kann.
-  Oder eigene funktion dafür machen?

### Durchführen der Rochade insofern möglich

Methode zugMachen wird ausgeführt und bekommt einfach O-O oder O-O-O übergeben - je nachdem welche seite gerade am zug ist, für die wird rochade ausgeführt. Position von könig und turm wird einfach vertauscht - das kann direkt am anfang erfolgen. Es muss vermutlich mit if-else unterschieden werden ob es sich um sonderzug oder normalen zug handelt.

## Ansatz für die verwandelung von einem bauern zu einem anderen piece

In der notation wird einfach der bauer zu der gegnerischen grundlinie bewegt z. B. e7-e8
Dann wird erkannt, dass der bauer sich dort befindet, und es wird die abfrage gemacht, zu welcher figur promoted werden soll.
Da es in seltenen fällen wirklich sinn ergibt, nicht zu einer Dame zu promoten sondern zu läufer, springer oder turm, sollte es diese abfrage wirklich geben. Für während der entwicklung könnten wir es aber bei auto-promote zu dame belassen.

## Wichtig fürs verständnis:

-  Angriffe werden ausgeben nachdem ein Zug gemacht wurde, enthalten also die aktualisierte position einer figur
-  Mögliche Züge werden ausgeben, bevor der Zug getan wurde. Bisher werden züge einfach ohne greifende überprüfung ausgeführt

## Übersicht der Klassen / Pakete:

-  In "figuren" soll für jede Figur eine Funktion kommen, die mögliche, legitime Züge berechnet. Einen state für jede einzelne figur, also z. B. die beiden Pferde ist nicht nötig, glaube ich.

## Todos:

-  Durchgreifendes checken ob zug legitim ist, damit wie z. B. jetzt nicht durch einen illegitimen turm-zug das rochade recht verloren geht,
   obwohl der turm zug natürlich nicht ausgeführt wird.
-  Die beiden rochade-möglichkeiten und bauern-verwandlung muss berücksichtigt werden.
-  En-passant möglichkeit muss auch in den bedrohten feldern erfasst werden. (müsste erledigt sein)
-  Gesamten State auslagern in eine eigene Datei, also brettState, angriffeWeiß etc.
-  Was ist, wenn eine Figur ein Feld eigentlich deckt, aber dadurch dass sie gepinnt ist, kann sie effektiv dieses feld nicht decken? Es müsste einen test geben, ob jeder entsprechende zug dazu führt, dass der eigene könig im schach steht.
   Wichtig dabei ist, dass es eine eigene Figur ist, die gezogen wird, die den eigenen König in Schach bringt. Eine Figur kann an den König nur durch Läufer, Turm und Dame gepinnt werden - also muss eine Diagonale oder Linie der Bedrohung vorliegen. Wenn der eigene König auf dieser Linie ist, ohne, dass eine andere Figur dazwischen ist, darf die Figur nicht wegziehen. Anderer Ansatz wäre, dass so wie bisher überprüft wird, ob eine der König in Schach steht, und insofern dies bei einem eigenen Zug geschieht, ist der Zug ungültig - die änderungen können direkt auf brettState übernommen werden, aber sobald das auftritt, wird prevBrettState genutzt, um den brettState wieder herzustellen.

3. Idee: Einen State für die ANgriffe namens möglicheAngriffe - dieser wird viel früher überprüft, ob es ein Schachgebot gibt. Diesen Ansatz wähle ich erstmal.

-  Abfangen der Möglichkeit, dass eine Figur gezogen werden soll, die nicht existiert.

## Fragestellungen:

-  Jede Figur muss wohl eine funktion bekommen, die angegriffene Felder ausgibt. Zb der knight kann nicht auf besetze felder springen, deckt diese ja aber. Der schachcomputer muss wissen können, dass z. B. schlagen eines bauerns durch den könig um schach zu entkommen nicht möglich ist, wenn dieser bauer durch ein pferd gedeckt / angegriffen wird.
-  Definitionsfrage: Greifen figuren die felder an, auf denen sie selbst stehen? (Gilt nur für B, R, K, Q)
   Vermutlich nicht, da die engine sonst nicht weiß, ob sie eine figur nehmen kann, die ungedeckt ist.
-  Ein Meta-objekt in der index.js die on-top alle metainformationen wie anzahl der züge speichert, damit das an alle figur-funktionen übergeben werden kann?
-  Eventuell muss als gültiger Zug einer Figur auch das feld belassen werden, auf dem sie steht, damit abgefangen werden kann, wenn die figur bei drag & drop auf dem ausgangsfeld losgelassen wird.
