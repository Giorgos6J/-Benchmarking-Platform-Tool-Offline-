@echo off
chcp 65001 >nul
setlocal
cd /d "%~dp0"

REM Πάμε στο src (εκεί είναι τα benchmark/analysis/report)
cd /d "src"

REM Τρέξε benchmark (αν έχεις runner). Αν δεν έχεις, θα πρέπει να χρησιμοποιήσεις το δικό σου run-benchmark.js.
if exist "run-benchmark.js" (
  node run-benchmark.js
) else (
  echo ❌ Λείπει το src\run-benchmark.js
  pause
  exit /b 1
)

if errorlevel 1 (
  echo ❌ Benchmark failed
  pause
  exit /b 1
)

REM Φτιάξε report\data.js
if exist "generate-data.js" (
  node generate-data.js
) else (
  echo ❌ Λείπει το src\generate-data.js
  pause
  exit /b 1
)

if errorlevel 1 (
  echo ❌ generate-data failed
  pause
  exit /b 1
)

REM Άνοιξε report
if exist "report\index.html" (
  start "" "%cd%\report\index.html"
) else (
  echo ❌ Λείπει το src\report\index.html
  pause
  exit /b 1
)

pause
endlocal
