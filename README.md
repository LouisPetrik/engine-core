# engine-core

JavaScript draft für die Schach-Engine, wird später in C++ übersetzt.

Zum ausführen: npm start

Übersicht der Klassen / Pakete:

-  In "figuren" soll für jede Figur eine Funktion kommen, die mögliche, legitime Züge berechnet. Einen state für jede einzelne figur, also z. B. die beiden Pferde ist nicht nötig, glaube ich.

Todos:
Sonder-Züge müssen bei der eingabe eines zuges wie statt e2-e4 noch berücktsichtigt und erkannt werden - also z. B. kurze Rochade O-O

Fragestellungen:

-  Ein Meta-objekt in der index.js die on-top alle metainformationen wie anzahl der züge speichert, damit das an alle figur-funktionen übergeben werden kann?
