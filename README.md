# repository för REST API
Detta repository innehåller kod för ett enklare REST API byggt med Express. APIet är byggt för att hantera tidigare arbetserfarenheter och det går att lägga till och ta bort erfarenheter.
Grundläggande funktionalitet för CRUD (Create, Read, Update, Delete) är implementerad.

## Länk
En liveversion av APIet finns tillgänglig på följande URL: [https://testserver.test/courses](https://miun.se) 

## Installation, databas
APIet använder en MySQL-databas.
Klona ner källkodsfilerna, kör kommando npm install för att installera nödvändiga npm-paket. Kör installations-skriptet install.js. 
Installations-skriptet skapar databastabeller enligt nedanstående:
|Tabell-namn|Fält  |
|--|--|
|experiences| **id** (int(11), **company** (varchar(80), **jobtitle** (varchar(80) **location** (varchar(80)  |


## Användning
Nedan finns beskrivet hur man nå APIet på olika vis:

|Metod  |Ändpunkt     |Beskrivning                                                                           |
|-------|-------------|--------------------------------------------------------------------------------------|
|GET    |/workexperience |Hämtar alla lagrade arbetserfarenheter.                                                      |                                    |
|POST   |/workexperience |Lagrar en ny erfarenhet. Kräver att erfarenhets-input skickas med.                         |
|PUT    |/workexperience/:ID |Uppdaterar en existerande erfarenhet med angivet ID. |
|DELETE |/workexperience/:ID |Raderar en erfarenhet med angivet ID.                                                       |

Ett kurs-objekt returneras/skickas som JSON med följande struktur:
```
{  "Id": "47",
   "company": "Glassföretaget",
   "jobtitle": "Glassförsäljare",
   "location": "Köping",
}
```
