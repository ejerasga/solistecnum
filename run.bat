@echo off
title Solis Tectum Web App Server
cd /d "%~dp0"
echo ========================================================
echo   Solis Tectum Solar Installation - Web App Server
echo ========================================================
echo Starting Flask app on http://127.0.0.1:5000 ...
echo (Keep this terminal open while testing the website)
echo.
python app.py
if errorlevel 1 (
    echo.
    echo Python failed to start. Trying with full path...
    "C:\Users\Admin\AppData\Local\Programs\Python\Python310\python.exe" app.py
)
pause

