@echo off
chcp 65001 >nul
title FootieApp Launcher
echo ===============================
echo     FootieApp Launcher
echo ===============================
echo.

echo Checking Java version...
java -version 2>nul
if %errorlevel% neq 0 (
    echo ERROR: Java is not installed or not in PATH
    echo Please install Java from https://adoptium.net/
    pause
    exit /b 1
)

echo.
echo Starting FootieApp with compatibility flags...
echo.

java ^
--add-opens java.base/java.lang=ALL-UNNAMED ^
--add-opens java.base/java.util=ALL-UNNAMED ^
--add-opens java.base/java.net=ALL-UNNAMED ^
--add-opens java.base/sun.net.www.protocol.http=ALL-UNNAMED ^
--add-opens java.base/sun.net.www.protocol.https=ALL-UNNAMED ^
-Dspring.main.allow-circular-references=true ^
-Dspring.main.allow-bean-definition-overriding=true ^
-jar "footie.jar"

echo.
echo ===============================
echo Application has exited.
echo ===============================
pause