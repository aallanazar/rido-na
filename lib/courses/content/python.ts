/**
 * Deep educational content for Python course.
 * 3 exemplary modules × 2 lessons each, 300+ words per lesson.
 * Trilingual: UZ / DE / EN
 */
import type { LocalizedString } from '@/lib/curriculum/types';

const ls = (uz: string, de: string, en: string): LocalizedString => ({ uz, de, en });

export type DeepLesson = {
    title: LocalizedString;
    theory: LocalizedString;
    practice: LocalizedString;
    steps: LocalizedString;
};

export type DeepModule = {
    moduleIndex: number;
    title: LocalizedString;
    lessons: [DeepLesson, DeepLesson];
};

export const pythonDeepContent: DeepModule[] = [
    /* ════════════════════════════════════════════════════════════════
       MODUL 1: Syntax & Variablen
       ════════════════════════════════════════════════════════════════ */
    {
        moduleIndex: 1,
        title: ls("Sintaksis va o'zgaruvchilar", 'Syntax & Variablen', 'Syntax & Variables'),
        lessons: [
            {
                title: ls("Python nima va uni o'rnatish", 'Was ist Python und Installation', 'What is Python and Installation'),
                theory: ls(
                    `Python — bu 1991-yilda Guido van Rossum tomonidan yaratilgan yuqori darajali dasturlash tili. Uning asosiy xususiyatlari: oddiy va o'qilishi oson sintaksis, kuchli standart kutubxona, va keng ko'lamli qo'llanilish sohasi — veb-dasturlash, sun'iy intellekt, ma'lumotlar tahlili, avtomatlashtirish va hokazo.

Python o'rnatish juda oddiy. python.org saytiga kiring va oxirgi versiyani yuklab oling. Windows uchun "Add Python to PATH" katagini belgilashni unutmang. macOS va Linuxda Python odatda oldindan o'rnatilgan bo'ladi, lekin yangi versiyaga yangilash tavsiya etiladi.

O'rnatishni tekshirish uchun terminalni oching va python --version buyrug'ini kiriting. Agar versiya raqami ko'rsatilsa — hammasi tayyor. Keyin birinchi dasturingizni yozing:

print("Salom, dunyo!")

Bu buyruq ekranga "Salom, dunyo!" matnini chiqaradi. print() — bu Pythoning eng asosiy funksiyalaridan biri bo'lib, u konsolga ma'lumot chiqarish uchun ishlatiladi.

Python interpretator tili, ya'ni kodni kompilyatsiya qilmasdan to'g'ridan-to'g'ri ishga tushirishingiz mumkin. Bu boshlang'ich dasturchilar uchun juda qulay, chunki natijani darhol ko'rishingiz mumkin. Python ikki rejimda ishlaydi: interaktiv rejim (REPL) va skript rejimi. Interaktiv rejimda terminaldagi >>> belgi orqali buyruqlarni bittadan kiritasiz. Skript rejimida esa .py faylga yozasiz va python fayl.py deb ishga tushirasiz.

Dasturlash muhiti sifatida VS Code, PyCharm yoki Jupyter Notebook tavsiya etiladi. VS Code eng universal variant bo'lib, Python extension o'rnatganingizdan so'ng kodni yozish, ishga tushirish va debug qilish mumkin.`,

                    `Python ist eine 1991 von Guido van Rossum entwickelte Hochsprache. Ihre Hauptmerkmale: einfache, lesbare Syntax, eine leistungsstarke Standardbibliothek und breite Anwendungsgebiete — Webentwicklung, KI, Datenanalyse, Automatisierung und mehr.

Die Installation ist unkompliziert. Besuchen Sie python.org und laden Sie die neueste Version herunter. Unter Windows aktivieren Sie unbedingt "Add Python to PATH". Auf macOS und Linux ist Python oft vorinstalliert, ein Update auf die aktuelle Version wird aber empfohlen.

Zur Überprüfung öffnen Sie ein Terminal und geben python --version ein. Wird eine Versionsnummer angezeigt, ist alles bereit. Schreiben Sie dann Ihr erstes Programm:

print("Hallo, Welt!")

Dieser Befehl gibt den Text "Hallo, Welt!" auf der Konsole aus. print() ist eine der grundlegendsten Funktionen in Python und wird zur Ausgabe von Informationen verwendet.

Python ist eine interpretierte Sprache — Code wird direkt ausgeführt, ohne Kompilierung. Das ist besonders für Anfänger praktisch, da Ergebnisse sofort sichtbar sind. Python arbeitet in zwei Modi: interaktiv (REPL, über die >>>-Eingabeaufforderung) und als Skript (Code in einer .py-Datei, ausgeführt mit python datei.py).

Als Entwicklungsumgebung empfehlen sich VS Code, PyCharm oder Jupyter Notebook. VS Code ist die universellste Variante — nach Installation der Python-Extension können Sie Code schreiben, ausführen und debuggen.`,

                    `Python is a high-level programming language created by Guido van Rossum in 1991. Its key features: simple, readable syntax, a powerful standard library, and wide applicability — web development, AI, data analysis, automation, and more.

Installation is straightforward. Visit python.org and download the latest version. On Windows, make sure to check "Add Python to PATH". On macOS and Linux, Python is usually pre-installed, but updating to the current version is recommended.

To verify, open a terminal and type python --version. If a version number appears, you're ready. Then write your first program:

print("Hello, World!")

This command outputs "Hello, World!" to the console. print() is one of Python's most fundamental functions, used to display information.

Python is an interpreted language — code runs directly without compilation. This is especially convenient for beginners, as results are immediately visible. Python operates in two modes: interactive (REPL, via the >>> prompt) and script mode (code in a .py file, run with python file.py).

For development, VS Code, PyCharm, or Jupyter Notebook are recommended. VS Code is the most universal option — after installing the Python extension, you can write, run, and debug code seamlessly.`
                ),
                practice: ls(
                    "1) Python o'rnating va terminalda python --version buyrug'ini tekshiring.\n2) Birinchi dasturingizni yozing: print(\"Salom!\") va ishga tushiring.\n3) Interaktiv rejimda 2 + 2, 10 * 5 hisoblang.\n4) .py fayl yarating va unda 3 ta print() buyrug'ini yozing.",
                    "1) Installieren Sie Python und prüfen Sie python --version im Terminal.\n2) Schreiben Sie Ihr erstes Programm: print(\"Hallo!\") und führen Sie es aus.\n3) Berechnen Sie im interaktiven Modus 2 + 2, 10 * 5.\n4) Erstellen Sie eine .py-Datei mit 3 print()-Befehlen.",
                    "1) Install Python and verify with python --version in the terminal.\n2) Write your first program: print(\"Hello!\") and run it.\n3) Calculate 2 + 2, 10 * 5 in interactive mode.\n4) Create a .py file with 3 print() statements."
                ),
                steps: ls(
                    "1) python.org dan Python yuklab oling.\n2) O'rnatish — PATH ga qo'shishni tanlang.\n3) Terminal: python --version\n4) Fayl yarating: salom.py\n5) Ichiga yozing: print(\"Salom!\")\n6) Ishga tushiring: python salom.py",
                    "1) Python von python.org herunterladen.\n2) Installation — PATH-Aktivierung auswählen.\n3) Terminal: python --version\n4) Datei erstellen: hallo.py\n5) Hineinschreiben: print(\"Hallo!\")\n6) Ausführen: python hallo.py",
                    "1) Download Python from python.org.\n2) Install — select Add to PATH.\n3) Terminal: python --version\n4) Create file: hello.py\n5) Write: print(\"Hello!\")\n6) Run: python hello.py"
                ),
            },
            {
                title: ls("O'zgaruvchilar va ma'lumot turlari", 'Variablen und Datentypen', 'Variables and Data Types'),
                theory: ls(
                    `O'zgaruvchi — bu ma'lumotni saqlash uchun nom berilgan joy. Pythonda o'zgaruvchi yaratish juda oddiy — uni e'lon qilish kerak emas, shunchaki qiymat berasiz:

ism = "Ali"
yosh = 20
baho = 4.5
talaba = True

Bu yerda ism — bu str (matn) turi, yosh — int (butun son), baho — float (o'nli son), va talaba — bool (mantiqiy qiymat: True yoki False).

Pythonning asosiy ma'lumot turlari:
• str — matn: "Salom", 'Python'
• int — butun son: 0, -5, 100
• float — o'nli son: 3.14, -0.5
• bool — mantiqiy: True, False
• None — bo'sh qiymat

O'zgaruvchi turini bilish uchun type() funksiyasidan foydalaning:
type(ism)   # <class 'str'>
type(yosh)  # <class 'int'>

O'zgaruvchi nomlarida qoidalar mavjud: harflar yoki _ bilan boshlanishi kerak, raqam bilan boshlanmaydi, bo'sh joy bo'lmasligi kerak, va Python kalit so'zlarini (if, for, while) ishlatmang.

Tip o'zgartirish (casting) ham muhim tushuncha:
son = int("42")     # matndan butun songa
matn = str(100)     # sondan matnga
onli = float("3.14") # matndan o'nli songa

F-string yordamida o'zgaruvchilarni matnga qo'shish qulay:
ism = "Ali"
print(f"Salom, {ism}! Sen {2024 - 2004} yoshdasan.")

Input funksiyasi foydalanuvchidan ma'lumot olish imkonini beradi:
ism = input("Ismingizni kiriting: ")
print(f"Salom, {ism}!")`,

                    `Eine Variable ist ein benannter Speicherplatz für Daten. In Python ist das Erstellen einer Variable denkbar einfach — keine Deklaration nötig, Sie weisen einfach einen Wert zu:

name = "Ali"
alter = 20
note = 4.5
student = True

Hier ist name vom Typ str (Text), alter ist int (Ganzzahl), note ist float (Dezimalzahl) und student ist bool (logischer Wert: True oder False).

Die grundlegenden Datentypen in Python:
• str — Text: "Hallo", 'Python'
• int — Ganzzahl: 0, -5, 100
• float — Dezimalzahl: 3.14, -0.5
• bool — Logisch: True, False
• None — Leerer Wert

Den Typ einer Variable ermitteln Sie mit type():
type(name)   # <class 'str'>
type(alter)  # <class 'int'>

Für Variablennamen gelten Regeln: Sie müssen mit einem Buchstaben oder _ beginnen, dürfen nicht mit einer Zahl starten, keine Leerzeichen enthalten und keine Python-Schlüsselwörter (if, for, while) verwenden.

Typumwandlung (Casting) ist ein wichtiges Konzept:
zahl = int("42")       # Text zu Ganzzahl
text = str(100)        # Zahl zu Text
dezimal = float("3.14") # Text zu Dezimalzahl

Mit F-Strings lassen sich Variablen elegant in Text einfügen:
name = "Ali"
print(f"Hallo, {name}! Du bist {2024 - 2004} Jahre alt.")

Die input()-Funktion ermöglicht Benutzereingaben:
name = input("Geben Sie Ihren Namen ein: ")
print(f"Hallo, {name}!")`,

                    `A variable is a named storage location for data. In Python, creating a variable is extremely simple — no declaration needed, just assign a value:

name = "Ali"
age = 20
grade = 4.5
is_student = True

Here, name is of type str (text), age is int (integer), grade is float (decimal), and is_student is bool (logical value: True or False).

Python's fundamental data types:
• str — text: "Hello", 'Python'
• int — integer: 0, -5, 100
• float — decimal: 3.14, -0.5
• bool — logical: True, False
• None — empty value

Check a variable's type with type():
type(name)   # <class 'str'>
type(age)    # <class 'int'>

Variable naming rules: must start with a letter or _, cannot start with a number, no spaces allowed, and don't use Python keywords (if, for, while).

Type casting is an important concept:
num = int("42")        # text to integer
text = str(100)        # number to text
decimal = float("3.14") # text to decimal

F-strings let you embed variables in text elegantly:
name = "Ali"
print(f"Hello, {name}! You are {2024 - 2004} years old.")

The input() function allows user input:
name = input("Enter your name: ")
print(f"Hello, {name}!")`
                ),
                practice: ls(
                    "1) 5 ta o'zgaruvchi yarating: ism, yosh, baho, talaba, manzil.\n2) type() bilan har birining turini tekshiring.\n3) input() bilan ismni so'rang va f-string bilan salomlang.\n4) \"25\" matnini butun songa aylantiring va 5 qo'shing.",
                    "1) Erstellen Sie 5 Variablen: name, alter, note, student, adresse.\n2) Prüfen Sie mit type() den Typ jeder Variable.\n3) Fragen Sie mit input() den Namen ab und begrüßen Sie mit F-String.\n4) Konvertieren Sie \"25\" in eine Ganzzahl und addieren Sie 5.",
                    "1) Create 5 variables: name, age, grade, student, address.\n2) Check each type with type().\n3) Ask for name with input() and greet with f-string.\n4) Convert \"25\" to integer and add 5."
                ),
                steps: ls(
                    "1) Yangi fayl: variables.py\n2) O'zgaruvchilar yarating va print() bilan chiqaring.\n3) type() bilan tekshiring.\n4) F-string bilan gaplar tuzing.\n5) input() qo'shing.\n6) Ishga tushiring va tekshiring.",
                    "1) Neue Datei: variables.py\n2) Variablen erstellen und mit print() ausgeben.\n3) Mit type() prüfen.\n4) Sätze mit F-Strings bilden.\n5) input() einbauen.\n6) Ausführen und testen.",
                    "1) New file: variables.py\n2) Create variables and output with print().\n3) Check with type().\n4) Build sentences with f-strings.\n5) Add input().\n6) Run and test."
                ),
            },
        ],
    },

    /* ════════════════════════════════════════════════════════════════
       MODUL 2: Shartlar va sikllar
       ════════════════════════════════════════════════════════════════ */
    {
        moduleIndex: 2,
        title: ls('Shartlar va sikllar', 'Bedingungen & Schleifen', 'Conditions & Loops'),
        lessons: [
            {
                title: ls("If-else shartlar", 'If-Else-Bedingungen', 'If-Else Conditions'),
                theory: ls(
                    `Shartli operatorlar dasturga qaror qilish imkonini beradi. if — agar shart bajarilsa kodni ishga tushiradi, else — aks holda boshqa kodni bajaradi, elif — qo'shimcha shartlarni tekshiradi.

Oddiy misol:
yosh = 18
if yosh >= 18:
    print("Siz kattalarsiz!")
else:
    print("Siz bolasiz.")

Bu yerda yosh >= 18 sharti tekshiriladi. Agar True bo'lsa — birinchi blok bajariladi, aks holda — else bloki.

Muhim: Pythonda bloklar indentatsiya (4 bo'sh joy) bilan belgilanadi. Bu boshqa tillardan farqli ravishda qavslar o'rniga ishlatiladi.

elif (else if) bir nechta shartni tekshirish uchun:
baho = 85
if baho >= 90:
    print("A'lo!")
elif baho >= 70:
    print("Yaxshi")
elif baho >= 50:
    print("Qoniqarli")
else:
    print("Qoniqarsiz")

Solishtirish operatorlari:
• == (teng)     • != (teng emas)
• > (katta)     • < (kichik)
• >= (katta-teng) • <= (kichik-teng)

Mantiqiy operatorlar shartlarni birlashtiradi:
• and — ikkalasi ham True bo'lishi kerak
• or — kamida bittasi True bo'lishi kerak
• not — qiymatni teskarisiga o'zgartiradi

Misol:
yosh = 25
talaba = True
if yosh >= 18 and talaba:
    print("Kattalar talabasi")

Ichma-ich (nested) shartlar ham mumkin, lekin ularni ortiq ishlatmang — kod murakkablashadi.

Ternary operator — bir qatorli shart:
natija = "O'tdi" if baho >= 50 else "Yiqildi"`,

                    `Bedingte Anweisungen ermöglichen Entscheidungen im Programm. if führt Code aus, wenn eine Bedingung erfüllt ist, else für den gegenteiligen Fall, elif für zusätzliche Prüfungen.

Einfaches Beispiel:
alter = 18
if alter >= 18:
    print("Sie sind erwachsen!")
else:
    print("Sie sind minderjährig.")

Hier wird alter >= 18 geprüft. Ist das Ergebnis True, wird der erste Block ausgeführt, andernfalls der else-Block.

Wichtig: In Python werden Blöcke durch Einrückung (4 Leerzeichen) definiert — statt Klammern wie in anderen Sprachen.

elif (else if) für mehrere Bedingungen:
note = 85
if note >= 90:
    print("Ausgezeichnet!")
elif note >= 70:
    print("Gut")
elif note >= 50:
    print("Befriedigend")
else:
    print("Nicht bestanden")

Vergleichsoperatoren:
• == (gleich)    • != (ungleich)
• > (größer)    • < (kleiner)
• >= (größer-gleich) • <= (kleiner-gleich)

Logische Operatoren kombinieren Bedingungen:
• and — beide müssen True sein
• or — mindestens eines muss True sein
• not — kehrt den Wert um

Beispiel:
alter = 25
student = True
if alter >= 18 and student:
    print("Erwachsener Student")

Verschachtelte Bedingungen sind möglich, aber sparsam verwenden — der Code wird sonst unübersichtlich.

Ternärer Operator — einzeilige Bedingung:
ergebnis = "Bestanden" if note >= 50 else "Durchgefallen"`,

                    `Conditional statements enable programs to make decisions. if executes code when a condition is met, else handles the alternative, elif checks additional conditions.

Simple example:
age = 18
if age >= 18:
    print("You are an adult!")
else:
    print("You are a minor.")

Here, age >= 18 is checked. If True, the first block runs; otherwise, the else block.

Important: In Python, blocks are defined by indentation (4 spaces) — instead of braces like other languages.

elif (else if) for multiple conditions:
grade = 85
if grade >= 90:
    print("Excellent!")
elif grade >= 70:
    print("Good")
elif grade >= 50:
    print("Satisfactory")
else:
    print("Failed")

Comparison operators:
• == (equal)     • != (not equal)
• > (greater)    • < (less)
• >= (greater-equal) • <= (less-equal)

Logical operators combine conditions:
• and — both must be True
• or — at least one must be True
• not — reverses the value

Example:
age = 25
is_student = True
if age >= 18 and is_student:
    print("Adult student")

Nested conditions are possible but use sparingly — code becomes complex.

Ternary operator — one-line condition:
result = "Passed" if grade >= 50 else "Failed"`
                ),
                practice: ls(
                    "1) Yosh so'rang va kattami-bolami aniqlang.\n2) Bahoni kiritib, A'lo/Yaxshi/Qoniqarli/Yiqildi chiqaring.\n3) and/or ishlatib 2 ta shartni birlashtiring.\n4) Ternary operator bilan juft/toq soni aniqlang.",
                    "1) Alter abfragen und erwachsen/minderjährig bestimmen.\n2) Note eingeben und Ausgezeichnet/Gut/Befriedigend/Durchgefallen ausgeben.\n3) Mit and/or 2 Bedingungen kombinieren.\n4) Gerade/ungerade Zahl per Ternär-Operator bestimmen.",
                    "1) Ask age and determine adult/minor.\n2) Enter grade and output Excellent/Good/Satisfactory/Failed.\n3) Combine 2 conditions with and/or.\n4) Determine even/odd with ternary operator."
                ),
                steps: ls(
                    "1) Yangi fayl: conditions.py\n2) input() bilan yosh so'rang.\n3) if/elif/else bilan tekshiring.\n4) Mantiqiy operatorlar qo'shing.\n5) Ternary operator sinab ko'ring.\n6) Turli qiymatlar bilan test qiling.",
                    "1) Neue Datei: conditions.py\n2) Mit input() Alter abfragen.\n3) Mit if/elif/else prüfen.\n4) Logische Operatoren ergänzen.\n5) Ternären Operator ausprobieren.\n6) Mit verschiedenen Werten testen.",
                    "1) New file: conditions.py\n2) Ask age with input().\n3) Check with if/elif/else.\n4) Add logical operators.\n5) Try ternary operator.\n6) Test with different values."
                ),
            },
            {
                title: ls("For va while sikllar", 'For- und While-Schleifen', 'For and While Loops'),
                theory: ls(
                    `Sikllar (loops) bir xil kodni qayta-qayta bajarish uchun ishlatiladi. Pythonda ikki asosiy sikl turi bor: for va while.

FOR sikli — ma'lum ketma-ketlik bo'ylab takrorlaydi:
for i in range(5):
    print(i)  # 0, 1, 2, 3, 4

range(5) — 0 dan 4 gacha raqamlar hosil qiladi. range(2, 10) — 2 dan 9 gacha. range(0, 20, 2) — 0, 2, 4, ..., 18 (qadam 2).

Ro'yxat bo'ylab yurish:
mevalar = ["olma", "banan", "anor"]
for meva in mevalar:
    print(f"Menga {meva} yoqadi")

WHILE sikli — shart True ekan takrorlanadi:
son = 1
while son <= 5:
    print(son)
    son += 1  # son = son + 1

Diqqat: while siklida shartni yangilashni unutmang, aks holda cheksiz sikl hosil bo'ladi!

break va continue:
• break — siklni to'xtatadi
• continue — joriy takrorni o'tkazib, keyingisiga o'tadi

for i in range(10):
    if i == 5:
        break    # 5 da to'xtaydi
    if i % 2 == 0:
        continue # juft raqamlarni o'tkazadi
    print(i)     # 1, 3

Ichma-ich sikllar — sikl ichida sikl:
for i in range(3):
    for j in range(3):
        print(f"({i},{j})", end=" ")
    print()  # yangi qator

enumerate() — indeks va qiymatni birga olish:
for idx, meva in enumerate(mevalar):
    print(f"{idx}: {meva}")

Amaliy maslahat: ko'p hollarda for sikli while dan xavfsizroq, chunki uning tugash sharti aniq. while — faqat shart bo'yicha boshqarish kerak bo'lganda ishlating.`,

                    `Schleifen (Loops) dienen dazu, Code wiederholt auszuführen. Python kennt zwei Hauptarten: for und while.

FOR-Schleife — iteriert über eine Sequenz:
for i in range(5):
    print(i)  # 0, 1, 2, 3, 4

range(5) erzeugt Zahlen von 0 bis 4. range(2, 10) — von 2 bis 9. range(0, 20, 2) — 0, 2, 4, ..., 18 (Schritt 2).

Über eine Liste iterieren:
fruechte = ["Apfel", "Banane", "Granatapfel"]
for frucht in fruechte:
    print(f"Ich mag {frucht}")

WHILE-Schleife — läuft, solange Bedingung True ist:
zahl = 1
while zahl <= 5:
    print(zahl)
    zahl += 1

Achtung: Vergessen Sie nicht, die Bedingung zu aktualisieren, sonst entsteht eine Endlosschleife!

break und continue:
• break — beendet die Schleife
• continue — überspringt aktuellen Durchlauf

for i in range(10):
    if i == 5:
        break     # stoppt bei 5
    if i % 2 == 0:
        continue  # überspringt gerade Zahlen
    print(i)      # 1, 3

Verschachtelte Schleifen — Schleife in Schleife:
for i in range(3):
    for j in range(3):
        print(f"({i},{j})", end=" ")
    print()

enumerate() — Index und Wert gemeinsam:
for idx, frucht in enumerate(fruechte):
    print(f"{idx}: {frucht}")

Praxistipp: In den meisten Fällen ist for sicherer als while, da die Abbruchbedingung klar definiert ist. while nur nutzen, wenn eine bedingungsbasierte Steuerung nötig ist.`,

                    `Loops allow executing code repeatedly. Python has two main types: for and while.

FOR loop — iterates over a sequence:
for i in range(5):
    print(i)  # 0, 1, 2, 3, 4

range(5) generates numbers 0 to 4. range(2, 10) — 2 to 9. range(0, 20, 2) — 0, 2, 4, ..., 18 (step 2).

Iterating over a list:
fruits = ["apple", "banana", "pomegranate"]
for fruit in fruits:
    print(f"I like {fruit}")

WHILE loop — runs while condition is True:
num = 1
while num <= 5:
    print(num)
    num += 1

Warning: Don't forget to update the condition, or you'll create an infinite loop!

break and continue:
• break — exits the loop
• continue — skips current iteration

for i in range(10):
    if i == 5:
        break     # stops at 5
    if i % 2 == 0:
        continue  # skips even numbers
    print(i)      # 1, 3

Nested loops — loop inside loop:
for i in range(3):
    for j in range(3):
        print(f"({i},{j})", end=" ")
    print()

enumerate() — get index and value together:
for idx, fruit in enumerate(fruits):
    print(f"{idx}: {fruit}")

Practical tip: for is usually safer than while because the termination condition is clear. Use while only when condition-based control is necessary.`
                ),
                practice: ls(
                    "1) 1 dan 20 gacha juft raqamlarni chiqaring.\n2) Ro'yxat bo'ylab for sikli bilan yuring.\n3) while bilan foydalanuvchidan 'exit' kiritilguncha so'rov yozing.\n4) enumerate bilan indeksli ro'yxatni chiqaring.",
                    "1) Geben Sie gerade Zahlen von 1 bis 20 aus.\n2) Iterieren Sie mit for über eine Liste.\n3) Mit while eine Eingabeaufforderung bis 'exit' bauen.\n4) Mit enumerate eine indexierte Liste ausgeben.",
                    "1) Print even numbers from 1 to 20.\n2) Iterate over a list with for.\n3) Build a while loop asking input until 'exit'.\n4) Print indexed list with enumerate."
                ),
                steps: ls(
                    "1) loops.py fayl yarating.\n2) range() bilan for sikl yozing.\n3) Ro'yxat bo'ylab for loop.\n4) while siklini qo'shing.\n5) break/continue qo'shing.\n6) enumerate() sinab ko'ring.",
                    "1) Datei loops.py erstellen.\n2) for-Schleife mit range() schreiben.\n3) for-Schleife über eine Liste.\n4) while-Schleife ergänzen.\n5) break/continue einbauen.\n6) enumerate() ausprobieren.",
                    "1) Create loops.py file.\n2) Write for loop with range().\n3) for loop over a list.\n4) Add while loop.\n5) Add break/continue.\n6) Try enumerate()."
                ),
            },
        ],
    },

    /* ════════════════════════════════════════════════════════════════
       MODUL 3: Funksiyalar
       ════════════════════════════════════════════════════════════════ */
    {
        moduleIndex: 3,
        title: ls('Funksiyalar', 'Funktionen', 'Functions'),
        lessons: [
            {
                title: ls("Funksiya yaratish va chaqirish", 'Funktionen erstellen und aufrufen', 'Creating and Calling Functions'),
                theory: ls(
                    `Funksiya — bu qayta ishlatiladigan kod bloki. U kodni tartibga soladi, takrorlanishni kamaytiradi va dasturni tushunarli qiladi.

Funksiya yaratish:
def salomlash(ism):
    print(f"Salom, {ism}!")

salomlash("Ali")    # Salom, Ali!
salomlash("Vali")   # Salom, Vali!

def kalit so'zi funksiyani e'lon qiladi. salomlash — funksiya nomi. ism — parametr (funksiyaga kiritilgan qiymat). Funksiya tanasi indentatsiya bilan yoziladi.

Return — natija qaytarish:
def yigindi(a, b):
    return a + b

natija = yigindi(3, 5)
print(natija)  # 8

return qiymati bo'lmagan funksiya None qaytaradi.

Default parametrlar:
def salomlash(ism, til="uz"):
    if til == "uz":
        print(f"Salom, {ism}!")
    elif til == "de":
        print(f"Hallo, {ism}!")

salomlash("Ali")           # Salom, Ali!
salomlash("Ali", til="de") # Hallo, Ali!

*args va **kwargs — noma'lum miqdordagi argumentlar:
def jami(*sonlar):
    return sum(sonlar)

print(jami(1, 2, 3))      # 6
print(jami(10, 20, 30, 40)) # 100

def malumot(**kwargs):
    for kalit, qiymat in kwargs.items():
        print(f"{kalit}: {qiymat}")

malumot(ism="Ali", yosh=20)

Lambda — bir qatorli anonim funksiya:
kvadrat = lambda x: x ** 2
print(kvadrat(5))  # 25

Amaliy maslahat: funksiyalar bitta vazifani bajarishi kerak (Single Responsibility). Agar funksiya 20 qatordan uzun bo'lsa — uni kichikroq funksiyalarga bo'ling.`,

                    `Eine Funktion ist ein wiederverwendbarer Codeblock. Sie organisiert Code, reduziert Wiederholungen und macht Programme verständlicher.

Funktion erstellen:
def begruessen(name):
    print(f"Hallo, {name}!")

begruessen("Ali")   # Hallo, Ali!
begruessen("Vali")  # Hallo, Vali!

def deklariert die Funktion. begruessen ist der Name. name ist der Parameter. Der Funktionskörper wird eingerückt.

Return — Wert zurückgeben:
def summe(a, b):
    return a + b

ergebnis = summe(3, 5)
print(ergebnis)  # 8

Funktionen ohne return geben None zurück.

Standardparameter:
def begruessen(name, sprache="de"):
    if sprache == "de":
        print(f"Hallo, {name}!")
    elif sprache == "uz":
        print(f"Salom, {name}!")

begruessen("Ali")               # Hallo, Ali!
begruessen("Ali", sprache="uz") # Salom, Ali!

*args und **kwargs — beliebig viele Argumente:
def gesamt(*zahlen):
    return sum(zahlen)

print(gesamt(1, 2, 3))        # 6
print(gesamt(10, 20, 30, 40)) # 100

def info(**kwargs):
    for key, wert in kwargs.items():
        print(f"{key}: {wert}")

info(name="Ali", alter=20)

Lambda — einzeilige anonyme Funktion:
quadrat = lambda x: x ** 2
print(quadrat(5))  # 25

Praxistipp: Funktionen sollten eine Aufgabe erfüllen (Single Responsibility). Ist eine Funktion länger als 20 Zeilen, teilen Sie sie in kleinere Funktionen auf.`,

                    `A function is a reusable block of code. It organizes code, reduces repetition, and makes programs more readable.

Creating a function:
def greet(name):
    print(f"Hello, {name}!")

greet("Ali")   # Hello, Ali!
greet("Vali")  # Hello, Vali!

def declares the function. greet is the name. name is the parameter. The function body is indented.

Return — returning a value:
def add(a, b):
    return a + b

result = add(3, 5)
print(result)  # 8

Functions without return give None.

Default parameters:
def greet(name, lang="en"):
    if lang == "en":
        print(f"Hello, {name}!")
    elif lang == "de":
        print(f"Hallo, {name}!")

greet("Ali")            # Hello, Ali!
greet("Ali", lang="de") # Hallo, Ali!

*args and **kwargs — variable number of arguments:
def total(*numbers):
    return sum(numbers)

print(total(1, 2, 3))        # 6
print(total(10, 20, 30, 40)) # 100

def info(**kwargs):
    for key, value in kwargs.items():
        print(f"{key}: {value}")

info(name="Ali", age=20)

Lambda — one-line anonymous function:
square = lambda x: x ** 2
print(square(5))  # 25

Practical tip: Functions should do one thing (Single Responsibility). If a function is longer than 20 lines, split it into smaller functions.`
                ),
                practice: ls(
                    "1) salomlash(ism) funksiyasi yozing.\n2) yigindi(a, b) funksiyasi yozing va qaytgan qiymatni chiqaring.\n3) Default parametrli funksiya yarating.\n4) *args bilan ixtiyoriy sonlar yig'indisini hisoblang.\n5) Lambda funksiya bilan ro'yxatni tartiblang.",
                    "1) begruessen(name) Funktion schreiben.\n2) summe(a, b) Funktion schreiben und Rückgabewert ausgeben.\n3) Funktion mit Standardparameter erstellen.\n4) Mit *args die Summe beliebig vieler Zahlen berechnen.\n5) Mit Lambda eine Liste sortieren.",
                    "1) Write a greet(name) function.\n2) Write add(a, b) and print the return value.\n3) Create a function with default parameter.\n4) Use *args to sum any number of values.\n5) Sort a list using lambda."
                ),
                steps: ls(
                    "1) functions.py yarating.\n2) def bilan birinchi funksiya yozing.\n3) return qo'shing.\n4) Default parametr sinang.\n5) *args va **kwargs qo'shing.\n6) Lambda sinab ko'ring.",
                    "1) functions.py erstellen.\n2) Erste Funktion mit def schreiben.\n3) return ergänzen.\n4) Standardparameter testen.\n5) *args und **kwargs ergänzen.\n6) Lambda ausprobieren.",
                    "1) Create functions.py.\n2) Write first function with def.\n3) Add return.\n4) Test default parameters.\n5) Add *args and **kwargs.\n6) Try lambda."
                ),
            },
            {
                title: ls("Scope va modullar", 'Scope und Module', 'Scope and Modules'),
                theory: ls(
                    `Scope (ko'rinish sohasi) — o'zgaruvchiga qayerdan kirish mumkinligini belgilaydi. Pythonda ikki asosiy scope bor: local (mahalliy) va global.

Local scope — funksiya ichida yaratilgan o'zgaruvchilar faqat shu funksiya ichida mavjud:
def salomlash():
    xabar = "Salom!"  # local
    print(xabar)

salomlash()
# print(xabar)  # Xato! xabar funksiya tashqarisida mavjud emas

Global scope — funksiya tashqarisida yaratilgan o'zgaruvchilar:
nom = "Python"  # global

def korsatish():
    print(nom)  # global o'zgaruvchini o'qish mumkin

Agar funksiya ichida global o'zgaruvchini o'zgartirmoqchi bo'lsangiz, global kalit so'zini ishlating:
hisoblagich = 0

def oshirish():
    global hisoblagich
    hisoblagich += 1

Modullar — kodni alohida fayllarga bo'lish. Bu katta dasturlarda tartibni saqlaydi.

Modul yaratish (utils.py):
def salomlash(ism):
    return f"Salom, {ism}!"

PI = 3.14159

Modulni import qilish (main.py):
import utils
print(utils.salomlash("Ali"))
print(utils.PI)

Tanlab import:
from utils import salomlash
salomlash("Ali")

Standart kutubxona modullari:
import math
print(math.sqrt(16))  # 4.0

import random
print(random.randint(1, 100))  # tasodifiy son

import datetime
print(datetime.datetime.now())

pip bilan tashqi paketlar o'rnatish:
pip install requests
pip install numpy

Amaliy maslahat: har bitta fayl — bitta modul. Funksiyalarni tegishli modullarga joylashtiring. main.py fayldan boshqa modullarni import qiling. Bu Professional Python kodining asosi.`,

                    `Scope (Gültigkeitsbereich) bestimmt, wo auf eine Variable zugegriffen werden kann. Python kennt zwei Hauptbereiche: local und global.

Local Scope — innerhalb einer Funktion erstellte Variablen existieren nur dort:
def begruessen():
    nachricht = "Hallo!"  # local
    print(nachricht)

begruessen()
# print(nachricht)  # Fehler! Außerhalb nicht verfügbar

Global Scope — Variablen außerhalb von Funktionen:
name = "Python"  # global

def anzeigen():
    print(name)  # globale Variable lesen möglich

Um eine globale Variable innerhalb einer Funktion zu ändern, verwenden Sie das Schlüsselwort global:
zaehler = 0

def erhoehen():
    global zaehler
    zaehler += 1

Module — Code in separate Dateien aufteilen. Das erhält die Ordnung in größeren Programmen.

Modul erstellen (utils.py):
def begruessen(name):
    return f"Hallo, {name}!"

PI = 3.14159

Modul importieren (main.py):
import utils
print(utils.begruessen("Ali"))
print(utils.PI)

Selektiver Import:
from utils import begruessen
begruessen("Ali")

Standardbibliothek:
import math
print(math.sqrt(16))  # 4.0

import random
print(random.randint(1, 100))

import datetime
print(datetime.datetime.now())

Externe Pakete mit pip:
pip install requests
pip install numpy

Praxistipp: Jede Datei ist ein Modul. Funktionen in passende Module einordnen. Aus main.py andere Module importieren. Das ist die Grundlage professionellen Python-Codes.`,

                    `Scope determines where a variable can be accessed. Python has two main scopes: local and global.

Local scope — variables created inside a function exist only there:
def greet():
    message = "Hello!"  # local
    print(message)

greet()
# print(message)  # Error! Not available outside

Global scope — variables outside functions:
name = "Python"  # global

def show():
    print(name)  # reading global variable is fine

To modify a global variable inside a function, use the global keyword:
counter = 0

def increment():
    global counter
    counter += 1

Modules — splitting code into separate files. This maintains order in larger programs.

Creating a module (utils.py):
def greet(name):
    return f"Hello, {name}!"

PI = 3.14159

Importing a module (main.py):
import utils
print(utils.greet("Ali"))
print(utils.PI)

Selective import:
from utils import greet
greet("Ali")

Standard library:
import math
print(math.sqrt(16))  # 4.0

import random
print(random.randint(1, 100))

import datetime
print(datetime.datetime.now())

External packages with pip:
pip install requests
pip install numpy

Practical tip: Every file is a module. Organize functions into appropriate modules. Import other modules from main.py. This is the foundation of professional Python code.`
                ),
                practice: ls(
                    "1) Local va global scope ni namoyish qiluvchi kod yozing.\n2) utils.py moduli yarating va main.py dan import qiling.\n3) math va random modullaridan foydalaning.\n4) pip install requests bilan so'rov yuboring.",
                    "1) Code schreiben, der Local und Global Scope demonstriert.\n2) utils.py-Modul erstellen und aus main.py importieren.\n3) Die Module math und random verwenden.\n4) Mit pip install requests eine Anfrage senden.",
                    "1) Write code demonstrating local and global scope.\n2) Create utils.py module and import from main.py.\n3) Use math and random modules.\n4) Send a request with pip install requests."
                ),
                steps: ls(
                    "1) scope.py yarating va local/global misol yozing.\n2) utils.py yarating va ichiga funksiya qo'shing.\n3) main.py dan import qiling.\n4) math.sqrt() va random.randint() sinang.\n5) from ... import ... sinab ko'ring.\n6) pip install requests qiling va test qiling.",
                    "1) scope.py erstellen und Local/Global-Beispiel schreiben.\n2) utils.py erstellen und Funktion einfügen.\n3) Aus main.py importieren.\n4) math.sqrt() und random.randint() testen.\n5) from ... import ... ausprobieren.\n6) pip install requests und testen.",
                    "1) Create scope.py and write local/global example.\n2) Create utils.py and add a function.\n3) Import from main.py.\n4) Test math.sqrt() and random.randint().\n5) Try from ... import ...\n6) pip install requests and test."
                ),
            },
        ],
    },
];
