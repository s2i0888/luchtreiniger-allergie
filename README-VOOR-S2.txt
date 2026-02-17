============================================
LUCHTREINIGER ALLERGIE - SITE STARTEN
============================================

OPTIE 1: EENKLIK START (aanbevolen)
------------------------------------
1. Open Verkenner
2. Ga naar: C:\Users\Administrator\.openclaw\workspace\luchtreiniger-allergie
3. Dubbelklik op: check-site.bat
4. Site opent op: http://localhost:1316/

OPTIE 2: POWER SHELL
--------------------
1. Open PowerShell als Administrator
2. Voer uit:
   cd "C:\Users\Administrator\.openclaw\workspace\luchtreiniger-allergie"
   .\quick-start.ps1

OPTIE 3: HANDMATIG
------------------
1. Open PowerShell
2. Voer uit:
   cd "C:\Users\Administrator\.openclaw\workspace\luchtreiniger-allergie"
   C:\Hugo\bin\hugo.exe server --buildDrafts --port 1316

============================================
WAT TE TESTEN
============================================

1. Premium Comparison Table:
   http://localhost:1316/test-comparison/

2. Main Site:
   http://localhost:1316/

3. Features om te checken:
   - ✅ Best Value badge (pulse animation)
   - ✅ Gradient buttons met shimmer
   - ✅ CADR progress bars
   - ✅ Sticky headers (scroll om te testen)
   - ✅ Mobile responsive

============================================
TROUBLESHOOTING
============================================

PROBLEEM: "hugo command not found"
OPLOSSING: Gebruik check-site.bat of voer uit:
   C:\Hugo\bin\hugo.exe server --port 1316

PROBLEEM: Port 1316 in gebruik
OPLOSSING: Verander poort:
   C:\Hugo\bin\hugo.exe server --port 1317

PROBLEEM: Site laadt niet
OPLOSSING: Check of Hugo draait:
   http://localhost:1316/ (moet Hugo logo tonen)

============================================
SNELLE COMMANDOS
============================================

# Start site
check-site.bat

# Build voor productie
C:\Hugo\bin\hugo.exe --minify

# Clean build
Remove-Item public -Recurse -Force
C:\Hugo\bin\hugo.exe

============================================
CONTACT
============================================
Joey staat klaar voor Authority Table review
zodra je de site kunt zien!