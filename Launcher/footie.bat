@echo off
chcp 65001 >nul
title FootieApp Launcher
cd /d "%~dp0"
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

rem Default Settings
set BACKEND_PORT=8080
set SHOW_SQL=false

rem Read settings.txt
if exist settings.txt (
    for /f "usebackq tokens=1,2 delims==" %%i in ("settings.txt") do (
        set "key=%%i"
        set "val=%%j"
        if not "%%i"=="" (
            setlocal enabledelayedexpansion
            set "firstchar=!key:~0,1!"
            if not "!firstchar!"=="#" (
                endlocal
                call :parse_setting "%%i" "%%j"
            ) else (
                endlocal
            )
        )
    )
)

echo.
echo Starting FootieApp on port %BACKEND_PORT%...
echo.

rem Build JVM flags dynamically
set JVM_OPTS=-Dserver.port=%BACKEND_PORT% -Dreact-app.path=http://localhost:%FRONTEND_PORT% -Dspring.main.allow-circular-references=true -Dspring.main.allow-bean-definition-overriding=true -Dderby.stream.error.file=logs\derby.log -Dspring.jpa.show-sql=%SHOW_SQL%

java ^
--add-opens java.base/java.lang=ALL-UNNAMED ^
--add-opens java.base/java.util=ALL-UNNAMED ^
--add-opens java.base/java.net=ALL-UNNAMED ^
--add-opens java.base/sun.net.www.protocol.http=ALL-UNNAMED ^
--add-opens java.base/sun.net.www.protocol.https=ALL-UNNAMED ^
%JVM_OPTS% ^
-jar "footie.jar"

echo.
echo ===============================
echo Application has exited.
echo ===============================
pause
goto :eof

:parse_setting
set "k=%~1"
set "v=%~2"
rem trim whitespace
for /f "tokens=* delims= " %%a in ("%k%") do set "k=%%a"
for /f "tokens=* delims= " %%a in ("%v%") do set "v=%%a"
if "%k%"=="BACKEND_PORT" set "BACKEND_PORT=%v%"
if "%k%"=="SHOW_SQL" set "SHOW_SQL=%v%"
goto :eof