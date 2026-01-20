@echo off
chcp 65001 >nul
title Benchmark Runner (GC Enabled)
setlocal
cd /d "%~dp0"

echo ==============================
echo Running benchmark with GC
echo ==============================

node --expose-gc run-benchmark.js
if errorlevel 1 goto :fail

echo.
echo Generating data.js...
node generate-data.js
if errorlevel 1 goto :fail

echo.
echo Opening report...
start "" "%cd%\index.html"

pause
exit /b 0

:fail
echo ❌ ERROR during execution
pause
exit /b 1
